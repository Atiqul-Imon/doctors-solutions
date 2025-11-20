import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Patient from '@/lib/models/Patient';
import { withAuth } from '@/lib/auth/middleware';
import { ApiResponse } from '@/types';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();
      const { id } = await context.params;
      const body = await req.json();
      const { field, data } = body;

      if (!field || !data) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Field and data are required',
          },
          { status: 400 }
        );
      }

      const validFields = [
        'medicalHistory',
        'allergies',
        'medications',
        'vitalSigns',
        'labResults',
        'visitNotes',
        'familyHistory',
      ];

      if (!validFields.includes(field)) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Invalid field name',
          },
          { status: 400 }
        );
      }

      const patient = await Patient.findByIdAndUpdate(
        id,
        { $push: { [field]: data } },
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
        message: 'Item added successfully',
      });
    } catch (error: any) {
      console.error('Add item error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to add item',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

