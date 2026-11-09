import { GenerationCanvasState, TargetTool, PresetOption, DimensionCategory } from '@/types/prompt';

// 各工具的质量前缀
const TOOL_PREFIX: Record<TargetTool, string> = {
  stablediffusion: 'masterpiece, best quality, ultra-detailed, ',
  midjourney: '',
  flux: '',
};

// 各工具的后缀参数
const TOOL_SUFFIX: Record<TargetTool, string> = {
  stablediffusion: '',
  midjourney: ' --v 6.1 --style raw',
  flux: '',
};

// 从选中选项提取 prompt tokens
function extractTokens(selectedOptions: Record<DimensionCategory, PresetOption | null>): string[] {
  return Object.values(selectedOptions)
    .filter((opt): opt is PresetOption => opt !== null)
    .map(opt => opt.promptToken);
}

// 组装最终提示词
export function buildFinalPrompt(state: GenerationCanvasState): string {
  const tokens = extractTokens(state.selectedOptions);
  const parts = [state.customSubject, ...tokens].filter(Boolean);
  const baseDescription = parts.join(', ');

  const prefix = TOOL_PREFIX[state.targetTool];
  const suffix = TOOL_SUFFIX[state.targetTool];

  return `${prefix}${baseDescription}${suffix}`;
}

// 生成 Negative Prompt (仅 SD 需要)
export function buildNegativePrompt(state: GenerationCanvasState): string {
  if (state.targetTool !== 'stablediffusion') {
    return '';
  }

  return 'lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry';
}

// 生成 MJ 的尺寸参数
export function buildMJAspectRatio(width: number = 16, height: number = 9): string {
  return `--ar ${width}:${height}`;
}

// 根据工具类型格式化输出
export function formatPromptForTool(state: GenerationCanvasState): {
  prompt: string;
  negativePrompt?: string;
  parameters?: Record<string, string>;
} {
  const prompt = buildFinalPrompt(state);
  const result: { prompt: string; negativePrompt?: string; parameters?: Record<string, string> } = { prompt };

  switch (state.targetTool) {
    case 'stablediffusion':
      result.negativePrompt = buildNegativePrompt(state);
      break;
    case 'midjourney':
      result.parameters = {
        aspectRatio: '--ar 16:9',
        version: '--v 6.1',
        style: '--style raw',
      };
      break;
    case 'flux':
      // Flux 使用纯自然语言，无额外参数
      break;
  }

  return result;
}

// 解析用户输入，提取可能的主体描述
export function extractSubjectFromInput(input: string): string {
  // 简单的实现：返回输入的前50个字符作为主体
  // 实际应该由 LLM 分析层处理
  const trimmed = input.trim();
  if (trimmed.length <= 50) {
    return trimmed;
  }
  return trimmed.substring(0, 50) + '...';
}

// 将中文维度标签映射到英文 prompt tokens
export const DIMENSION_KEYWORDS: Record<DimensionCategory, string[]> = {
  shot_type: ['景别', '镜头', '远景', '近景', '特写', 'shot', 'close-up', 'wide'],
  art_style: ['风格', '画风', '赛博', '动漫', '写实', 'style', 'anime', 'realistic'],
  lighting: ['光', '光影', '照明', 'light', 'lighting', 'sunlight', 'neon'],
  color_mood: ['色彩', '颜色', '色调', 'color', 'tone', 'palette'],
  composition: ['构图', '视角', '俯拍', '仰拍', 'composition', 'angle', 'view'],
  clothing: ['服饰', '衣服', '穿着', '服装', 'cloth', 'wear', 'dress', 'suit'],
  mood: ['情绪', '氛围', '感觉', 'mood', 'atmosphere', 'vibe'],
  technique: ['技法', '笔触', '画法', 'technique', 'brushstroke', 'impasto'],
  perspective: ['透视', 'perspective', 'vanishing', 'fisheye'],
  texture: ['材质', '纹理', '质感', 'texture', 'grain', 'surface'],
  subject: ['主体', '人物', '风景', '建筑', 'subject', 'portrait', 'landscape'],
  environment: ['环境', '场景', '背景', 'environment', 'scene', 'background'],
};

// 检测输入中可能已包含的维度
export function detectExistingDimensions(input: string): DimensionCategory[] {
  const lowerInput = input.toLowerCase();
  const existing: DimensionCategory[] = [];

  for (const [dimension, keywords] of Object.entries(DIMENSION_KEYWORDS)) {
    const hasDimension = keywords.some(kw => lowerInput.includes(kw.toLowerCase()));
    if (hasDimension) {
      existing.push(dimension as DimensionCategory);
    }
  }

  return existing;
}

// 获取缺失的维度
export function getMissingDimensions(input: string): DimensionCategory[] {
  const allDimensions: DimensionCategory[] = [
    'shot_type', 'art_style', 'lighting', 'color_mood',
    'composition', 'clothing', 'mood', 'technique',
    'perspective', 'texture', 'subject', 'environment',
  ];
  const existing = detectExistingDimensions(input);
  return allDimensions.filter(dim => !existing.includes(dim));
}
