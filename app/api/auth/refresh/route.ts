import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import { verifyRefreshToken, generateAccessToken } from '@/lib/auth/jwt';
import { ApiResponse } from '@/types';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const refreshToken = req.cookies.get('refreshToken')?.value || req.headers.get('authorization')?.replace('Bearer ', '');

    if (!refreshToken) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Refresh token is required',
        },
        { status: 401 }
      );
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'User not found',
        },
        { status: 401 }
      );
    }

    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role as 'admin' | 'patient',
    };

    const newAccessToken = generateAccessToken(tokenPayload);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: {
          accessToken: newAccessToken,
        },
        message: 'Token refreshed successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Token refresh error:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to refresh token',
      },
      { status: 401 }
    );
  }
}

