import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Prescription from '@/lib/models/Prescription';
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

      const prescription = await Prescription.findById(id)
        .populate('patientId', 'name email phone dateOfBirth gender bloodGroup address')
        .lean();

      if (!prescription) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Prescription not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json<ApiResponse>({
        success: true,
        data: prescription,
      });
    } catch (error: any) {
      console.error('Get prescription error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to fetch prescription',
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
      const { status, notes, additionalInstructions } = body;

      const updateData: any = {};

      if (status) {
        updateData.status = status;
      }

      if (notes !== undefined) updateData.notes = notes;
      if (additionalInstructions !== undefined) updateData.additionalInstructions = additionalInstructions;

      const prescription = await Prescription.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      )
        .populate('patientId', 'name email phone')
        .lean();

      if (!prescription) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Prescription not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json<ApiResponse>({
        success: true,
        data: prescription,
        message: 'Prescription updated successfully',
      });
    } catch (error: any) {
      console.error('Update prescription error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to update prescription',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();
      const { id } = await context.params;

      const prescription = await Prescription.findByIdAndUpdate(
        id,
        { $set: { status: 'cancelled' } },
        { new: true }
      );

      if (!prescription) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Prescription not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json<ApiResponse>({
        success: true,
        message: 'Prescription cancelled successfully',
      });
    } catch (error: any) {
      console.error('Delete prescription error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to cancel prescription',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

