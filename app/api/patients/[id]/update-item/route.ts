import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Patient from '@/lib/models/Patient';
import { withAuth } from '@/lib/auth/middleware';
import { ApiResponse } from '@/types';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();
      const { id } = await context.params;
      const body = await req.json();
      const { field, itemIndex, data } = body;

      if (!field || itemIndex === undefined || !data) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Field, itemIndex, and data are required',
          },
          { status: 400 }
        );
      }

      const patient = await Patient.findById(id);
      if (!patient) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Patient not found',
          },
          { status: 404 }
        );
      }

      const fieldArray = patient.get(field);
      if (!Array.isArray(fieldArray) || !fieldArray[itemIndex]) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Item not found',
          },
          { status: 404 }
        );
      }

      fieldArray[itemIndex] = { ...fieldArray[itemIndex].toObject(), ...data };
      patient.set(field, fieldArray);
      await patient.save();

      return NextResponse.json<ApiResponse>({
        success: true,
        data: patient,
        message: 'Item updated successfully',
      });
    } catch (error: any) {
      console.error('Update item error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to update item',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

