import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // 优先调用硅基流动 API
    const siliconFlowKey = process.env.SILICONFLOW_API_KEY;
    if (!siliconFlowKey) {
      // 返回模拟图片 URL 用于开发测试
      return NextResponse.json({
        imageUrl: 'https://picsum.photos/seed/' + encodeURIComponent(prompt.substring(0, 20)) + '/1024/576',
        warning: 'SILICONFLOW_API_KEY not configured, using placeholder image'
      });
    }

    const res = await fetch('https://api.siliconflow.cn/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${siliconFlowKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'black-forest-labs/FLUX.1-schnell',
        prompt: prompt,
        image_size: '1024x576',
        num_inference_steps: 4,
        batch_size: 1
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('SiliconFlow API Error:', {
        status: res.status,
        statusText: res.statusText,
        error: errorText,
        prompt: prompt.substring(0, 100)
      });
      return NextResponse.json({ 
        error: `Image API failed: ${res.status} ${errorText.substring(0, 200)}` 
      }, { status: 502 });
    }

    const data = await res.json();
    const imageUrl = data.data?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image URL in response' }, { status: 500 });
    }

    return NextResponse.json({ imageUrl });
  } catch (err: any) {
    console.error('Generate API Error:', err);
    return NextResponse.json({ error: err.message || 'Generation failed' }, { status: 500 });
  }
}
