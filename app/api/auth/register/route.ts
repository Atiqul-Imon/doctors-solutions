import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth/jwt';
import { ApiResponse } from '@/types';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password, role = 'patient' } = body;

    if (!email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Email and password are required',
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Password must be at least 6 characters',
        },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'User with this email already exists',
        },
        { status: 400 }
      );
    }

    const user = new User({
      email: email.toLowerCase(),
      password,
      role,
    });

    await user.save();

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
        message: 'User registered successfully',
      },
      { status: 201 }
    );

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to register user',
      },
      { status: 500 }
    );
  }
}

