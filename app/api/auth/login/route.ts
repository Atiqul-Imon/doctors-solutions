import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth/jwt';
import { ApiResponse } from '@/types';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Email and password are required',
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role as 'admin' | 'patient',
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        data: {
          user: {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
          },
          accessToken,
          refreshToken,
        },
        message: 'Login successful',
      },
      { status: 200 }
    );

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to login',
      },
      { status: 500 }
    );
  }
}

