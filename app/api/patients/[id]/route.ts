import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Patient from '@/lib/models/Patient';
import { withAuth } from '@/lib/auth/middleware';
import { ApiResponse } from '@/types';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();
      const { id } = await context.params;

      const patient = await Patient.findById(id).lean();

      if (!patient) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Patient not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json<ApiResponse>({
        success: true,
        data: patient,
      });
    } catch (error: any) {
      console.error('Get patient error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to fetch patient',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();
      const { id } = await context.params;

      const body = await req.json();

      const patient = await Patient.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true, runValidators: true }
      );

      if (!patient) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Patient not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json<ApiResponse>({
        success: true,
        data: patient,
        message: 'Patient updated successfully',
      });
    } catch (error: any) {
      console.error('Update patient error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to update patient',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

