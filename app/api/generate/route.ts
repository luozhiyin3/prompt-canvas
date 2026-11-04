import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/api-clients';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, tool = 'flux' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid prompt: expected non-empty string' },
        { status: 400 }
      );
    }

    // 限制 prompt 长度
    if (prompt.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Prompt too long: maximum 2000 characters' },
        { status: 400 }
      );
    }

    const imageUrl = await generateImage(prompt);

    return NextResponse.json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET 请求返回 API 状态
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoints: ['/api/generate'],
    methods: ['POST'],
  });
}
