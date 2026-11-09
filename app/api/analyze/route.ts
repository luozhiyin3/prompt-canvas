import { NextRequest, NextResponse } from 'next/server';
import { PRESET_OPTIONS } from '@/config/presets';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();
    if (!input || typeof input !== 'string') {
      return NextResponse.json({ error: 'Invalid input text' }, { status: 400 });
    }

    const availableIds = PRESET_OPTIONS.map(o => o.id).join(', ');
    const systemPrompt = `You are an AI Image Prompt Architect.
Analyze the user's rough input and extract:
1. 'identifiedSubject': Clean English prompt phrase describing the core subject.
2. 'missingDimensions': Array of categories not explicitly defined in the prompt. Available categories: ['shot_type', 'art_style', 'lighting', 'color_mood', 'composition', 'clothing', 'mood', 'technique', 'perspective', 'texture', 'subject', 'environment'].
3. 'recommendedOptionIds': 3 to 6 preset IDs from the following list that best fit the prompt mood: [${availableIds}].`;

    // 优先调用 DeepSeek API (OpenAI 兼容格式)
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      // 降级到本地分析
      const localResult = {
        identifiedSubject: input.trim() || 'a person',
        missingDimensions: ['shot_type', 'art_style', 'lighting', 'color_mood', 'composition', 'clothing', 'mood', 'technique', 'perspective', 'texture', 'subject', 'environment'],
        recommendedOptionIds: []
      };
      return NextResponse.json(localResult);
    }

    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: input }
        ],
        response_format: { type: 'json_object' }
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('DeepSeek API Error:', errText);
      // 降级到本地分析
      const localResult = {
        identifiedSubject: input.trim() || 'a person',
        missingDimensions: ['shot_type', 'art_style', 'lighting', 'color_mood', 'composition', 'clothing', 'mood', 'technique', 'perspective', 'texture', 'subject', 'environment'],
        recommendedOptionIds: []
      };
      return NextResponse.json(localResult);
    }

    const json = await res.json();
    const rawText = json.choices?.[0]?.message?.content;
    const parsedData = JSON.parse(rawText || '{}');

    const validCategories = ['shot_type', 'art_style', 'lighting', 'color_mood', 'composition', 'clothing', 'mood', 'technique', 'perspective', 'texture', 'subject', 'environment'];
    const validIds = new Set(PRESET_OPTIONS.map(o => o.id));

    const result = {
      identifiedSubject: typeof parsedData.identifiedSubject === 'string' ? parsedData.identifiedSubject : (input.trim() || 'a person'),
      missingDimensions: Array.isArray(parsedData.missingDimensions)
        ? parsedData.missingDimensions.filter((d: string) => validCategories.includes(d))
        : validCategories,
      recommendedOptionIds: Array.isArray(parsedData.recommendedOptionIds)
        ? parsedData.recommendedOptionIds.filter((id: string) => validIds.has(id))
        : [],
    };

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    console.error('Analyze API Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
