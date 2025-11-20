import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Patient from '@/lib/models/Patient';
import { withAuth } from '@/lib/auth/middleware';
import { ApiResponse } from '@/types';

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();
      const { id } = await context.params;
      const searchParams = req.nextUrl.searchParams;
      const field = searchParams.get('field');
      const itemIndex = searchParams.get('itemIndex');

      if (!field || itemIndex === null) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Field and itemIndex are required',
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
      if (!Array.isArray(fieldArray) || !fieldArray[parseInt(itemIndex)]) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Item not found',
          },
          { status: 404 }
        );
      }

      fieldArray.splice(parseInt(itemIndex), 1);
      patient.set(field, fieldArray);
      await patient.save();

      return NextResponse.json<ApiResponse>({
        success: true,
        data: patient,
        message: 'Item deleted successfully',
      });
    } catch (error: any) {
      console.error('Delete item error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to delete item',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

