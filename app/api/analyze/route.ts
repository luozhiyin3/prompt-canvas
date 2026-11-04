import { NextRequest, NextResponse } from 'next/server';
import { analyzePrompt } from '@/lib/api-clients';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input, language = 'zh' } = body;

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid input: expected non-empty string' },
        { status: 400 }
      );
    }

    // 限制输入长度
    if (input.length > 1000) {
      return NextResponse.json(
        { success: false, error: 'Input too long: maximum 1000 characters' },
        { status: 400 }
      );
    }

    const result = await analyzePrompt(input);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Analyze API error:', error);
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
    endpoints: ['/api/analyze'],
    methods: ['POST'],
  });
}
