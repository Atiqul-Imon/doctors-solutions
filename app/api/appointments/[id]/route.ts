import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Appointment from '@/lib/models/Appointment';
import { withAuth } from '@/lib/auth/middleware';
import { ApiResponse } from '@/types';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();

      const appointment = await Appointment.findById(id)
        .populate('patientId')
        .lean();

      if (!appointment) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Appointment not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json<ApiResponse>({
        success: true,
        data: appointment,
      });
    } catch (error: any) {
      console.error('Get appointment error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to fetch appointment',
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
  const { id } = await context.params;
  
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();

      const body = await req.json();
      const { status, notes, reason } = body;

      const updateData: any = {};

      if (status) {
        updateData.status = status;
        if (status === 'confirmed') {
          updateData.confirmedAt = new Date();
        } else if (status === 'cancelled') {
          updateData.cancelledAt = new Date();
        }
      }

      if (notes !== undefined) updateData.notes = notes;
      if (reason) updateData.reason = reason;

      const appointment = await Appointment.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).populate('patientId', 'name email phone');

      if (!appointment) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Appointment not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json<ApiResponse>({
        success: true,
        data: appointment,
        message: 'Appointment updated successfully',
      });
    } catch (error: any) {
      console.error('Update appointment error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to update appointment',
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
  const { id } = await context.params;
  
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();

      const appointment = await Appointment.findByIdAndDelete(id);

      if (!appointment) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Appointment not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json<ApiResponse>({
        success: true,
        message: 'Appointment deleted successfully',
      });
    } catch (error: any) {
      console.error('Delete appointment error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to delete appointment',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

