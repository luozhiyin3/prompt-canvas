import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const falKey = process.env.FAL_KEY;
    if (!falKey) {
      // 返回模拟图片 URL 用于开发测试
      return NextResponse.json({
        imageUrl: 'https://picsum.photos/seed/' + encodeURIComponent(prompt.substring(0, 20)) + '/1024/576',
        warning: 'FAL_KEY not configured, using placeholder image'
      });
    }

    const res = await fetch('https://queue.fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${falKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        image_size: 'landscape_16_9',
        num_inference_steps: 4,
        enable_safety_checker: true
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Fal.ai API Error:', errorText);
      return NextResponse.json({ error: `Image API failed: ${errorText}` }, { status: 502 });
    }

    const data = await res.json();
    const imageUrl = data.images?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image URL in response' }, { status: 500 });
    }

    return NextResponse.json({ imageUrl });
  } catch (err: any) {
    console.error('Generate API Error:', err);
    return NextResponse.json({ error: err.message || 'Generation failed' }, { status: 500 });
  }
}
