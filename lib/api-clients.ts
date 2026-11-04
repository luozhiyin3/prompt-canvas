import { AnalysisResult, DimensionCategory } from '@/types/prompt';
import { getMissingDimensions, detectExistingDimensions } from './prompt-adapter';

// LLM 客户端配置
const LLM_PROVIDER = process.env.NEXT_PUBLIC_LLM_PROVIDER || 'gemini';

// Gemini API 配置
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash-exp';

// DeepSeek API 配置
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_BASE_URL = 'https://api.deepseek.com/v1';
const DEEPSEEK_MODEL = 'deepseek-chat';

// 分析提示词的 System Prompt
const ANALYZE_SYSTEM_PROMPT = `你是一个专业的AI绘画提示词分析助手。你的任务是：
1. 分析用户输入的绘画描述
2. 提取出核心主体（翻译为英文）
3. 识别已包含的维度属性
4. 判断缺失的维度类别

你需要返回严格的JSON格式，包含以下字段：
- identifiedSubject: 提取并翻译的主体描述（英文）
- existingAttributes: 已识别的属性键值对
- missingDimensions: 缺失的维度数组，可选值为: shot_type, art_style, lighting, color_mood, composition, clothing
- recommendedOptionIds: 根据语境推荐的选项ID列表`;

// 调用 Gemini API
async function callGeminiAPI(input: string): Promise<AnalysisResult> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: input }] }],
        systemInstruction: { parts: [{ text: ANALYZE_SYSTEM_PROMPT }] },
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json',
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${error}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!content) {
    throw new Error('Empty response from Gemini');
  }

  return JSON.parse(content);
}

// 调用 DeepSeek API
async function callDeepSeekAPI(input: string): Promise<AnalysisResult> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY is not configured');
  }

  const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: 'system', content: ANALYZE_SYSTEM_PROMPT },
        { role: 'user', content: input },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DeepSeek API error: ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('Empty response from DeepSeek');
  }

  return JSON.parse(content);
}

// 本地分析（无需 API，用于开发/降级）
function localAnalyze(input: string): AnalysisResult {
  const existingDimensions = detectExistingDimensions(input);
  const missingDimensions = getMissingDimensions(input);

  // 简单的主体提取
  const subject = input.trim() || 'a person';

  return {
    identifiedSubject: subject,
    existingAttributes: existingDimensions.reduce((acc, dim) => {
      acc[dim] = 'detected';
      return acc;
    }, {} as Record<string, string>),
    missingDimensions,
    recommendedOptionIds: [],
  };
}

// 主分析函数
export async function analyzePrompt(input: string): Promise<AnalysisResult> {
  // 开发模式或无 API Key 时使用本地分析
  if (process.env.NODE_ENV === 'development' && !GEMINI_API_KEY && !DEEPSEEK_API_KEY) {
    return localAnalyze(input);
  }

  try {
    if (LLM_PROVIDER === 'gemini' && GEMINI_API_KEY) {
      return await callGeminiAPI(input);
    } else if (LLM_PROVIDER === 'deepseek' && DEEPSEEK_API_KEY) {
      return await callDeepSeekAPI(input);
    } else {
      // 降级到本地分析
      return localAnalyze(input);
    }
  } catch (error) {
    console.error('LLM analysis failed, falling back to local:', error);
    return localAnalyze(input);
  }
}

// ==================== 生图 API 客户端 ====================

// Fal.ai 配置
const FAL_API_KEY = process.env.FAL_API_KEY;
const FAL_MODEL = 'fal-ai/flux/schnell';

// 调用 Fal.ai 生图
export async function generateImageWithFal(prompt: string): Promise<string> {
  if (!FAL_API_KEY) {
    throw new Error('FAL_API_KEY is not configured');
  }

  // 提交生图任务
  const submitResponse = await fetch(`https://queue.fal.run/${FAL_MODEL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Key ${FAL_API_KEY}`,
    },
    body: JSON.stringify({
      prompt,
      image_size: 'landscape_16_9',
      num_images: 1,
    }),
  });

  if (!submitResponse.ok) {
    const error = await submitResponse.text();
    throw new Error(`Fal.ai submit error: ${error}`);
  }

  const submitData = await submitResponse.json();
  const requestId = submitData.request_id;

  // 轮询获取结果
  let resultResponse;
  for (let i = 0; i < 30; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    resultResponse = await fetch(`https://queue.fal.run/${FAL_MODEL}/requests/${requestId}/status`, {
      headers: { Authorization: `Key ${FAL_API_KEY}` },
    });

    const resultData = await resultResponse.json();

    if (resultData.status === 'COMPLETED') {
      // 获取最终结果
      const finalResponse = await fetch(`https://queue.fal.run/${FAL_MODEL}/requests/${requestId}`, {
        headers: { Authorization: `Key ${FAL_API_KEY}` },
      });
      const finalData = await finalResponse.json();
      return finalData.images?.[0]?.url || finalData.output?.images?.[0]?.url;
    }

    if (resultData.status === 'FAILED') {
      throw new Error('Image generation failed');
    }
  }

  throw new Error('Image generation timeout');
}

// 调用 SiliconFlow 生图（国内备选）
export async function generateImageWithSiliconFlow(prompt: string): Promise<string> {
  const SILICONFLOW_API_KEY = process.env.SILICONFLOW_API_KEY;

  if (!SILICONFLOW_API_KEY) {
    throw new Error('SILICONFLOW_API_KEY is not configured');
  }

  const response = await fetch('https://api.siliconflow.cn/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SILICONFLOW_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'stabilityai/stable-diffusion-3-5-large',
      prompt,
      image_size: '1024x576',
      num_inference_steps: 20,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`SiliconFlow API error: ${error}`);
  }

  const data = await response.json();
  return data.images?.[0]?.url;
}

// 主生图函数
export async function generateImage(prompt: string): Promise<string> {
  const provider = process.env.IMAGE_PROVIDER || 'fal';

  if (provider === 'fal' && FAL_API_KEY) {
    return generateImageWithFal(prompt);
  } else if (provider === 'siliconflow') {
    return generateImageWithSiliconFlow(prompt);
  }

  throw new Error('No image generation provider configured');
}
