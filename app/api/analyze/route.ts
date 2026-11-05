import { NextRequest, NextResponse } from 'next/server';
import { PRESET_OPTIONS } from '@/config/presets';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

const ANALYSIS_SCHEMA = {
  type: "OBJECT",
  properties: {
    identifiedSubject: {
      type: "STRING",
      description: "Translated and refined English core subject of the prompt."
    },
    missingDimensions: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "List of dimension category strings missing from input (shot_type, art_style, lighting, color_mood, composition, clothing)."
    },
    recommendedOptionIds: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "List of 3-6 preset IDs matching the context from the provided catalog."
    }
  },
  required: ["identifiedSubject", "missingDimensions", "recommendedOptionIds"]
};

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
2. 'missingDimensions': Array of categories not explicitly defined in the prompt. Available categories: ['shot_type', 'art_style', 'lighting', 'color_mood', 'composition', 'clothing'].
3. 'recommendedOptionIds': 3 to 6 preset IDs from the following list that best fit the prompt mood: [${availableIds}].`;

    // 默认优先调用 Gemini 官方 API
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // 降级到本地分析
      const localResult = {
        identifiedSubject: input.trim() || 'a person',
        missingDimensions: ['shot_type', 'art_style', 'lighting', 'color_mood', 'composition'],
        recommendedOptionIds: []
      };
      return NextResponse.json(localResult);
    }

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Input: "${input}"` }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: ANALYSIS_SCHEMA
        }
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Gemini API Error:', errText);
      // 降级到本地分析
      const localResult = {
        identifiedSubject: input.trim() || 'a person',
        missingDimensions: ['shot_type', 'art_style', 'lighting', 'color_mood', 'composition'],
        recommendedOptionIds: []
      };
      return NextResponse.json(localResult);
    }

    const json = await res.json();
    const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsedData = JSON.parse(rawText || '{}');

    return NextResponse.json(parsedData);
  } catch (err: any) {
    console.error('Analyze API Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
