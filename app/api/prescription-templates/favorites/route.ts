import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import PrescriptionTemplate from '@/lib/models/PrescriptionTemplate';
import { verifyToken } from '@/lib/auth/jwt';
import { ApiResponse } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    await connectDB();

    // Get top 5 most-used templates
    const templates = await PrescriptionTemplate.find()
      .sort({ usageCount: -1 })
      .limit(5)
      .lean();

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: templates,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching favorite templates:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to fetch favorite templates',
      },
      { status: 500 }
    );
  }
}
