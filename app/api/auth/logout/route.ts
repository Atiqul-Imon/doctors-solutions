import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: 'Logout successful',
      },
      { status: 200 }
    );

    response.cookies.delete('refreshToken');

    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to logout',
      },
      { status: 500 }
    );
  }
}

