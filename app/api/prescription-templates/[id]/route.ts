import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import PrescriptionTemplate from '@/lib/models/PrescriptionTemplate';
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

      const template = await PrescriptionTemplate.findById(id).lean();

      if (!template) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Prescription template not found',
          },
          { status: 404 }
        );
      }

      // Increment usage count
      await PrescriptionTemplate.findByIdAndUpdate(id, {
        $inc: { usageCount: 1 },
      });

      return NextResponse.json<ApiResponse>({
        success: true,
        data: template,
      });
    } catch (error: any) {
      console.error('Get prescription template error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to fetch prescription template',
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
      const { name, description, medications, defaultInstructions, category } = body;

      const updateData: any = {};

      if (name) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (medications) updateData.medications = medications;
      if (defaultInstructions !== undefined) updateData.defaultInstructions = defaultInstructions;
      if (category) updateData.category = category;

      const template = await PrescriptionTemplate.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).lean();

      if (!template) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Prescription template not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json<ApiResponse>({
        success: true,
        data: template,
        message: 'Prescription template updated successfully',
      });
    } catch (error: any) {
      console.error('Update prescription template error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to update prescription template',
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

      const template = await PrescriptionTemplate.findByIdAndDelete(id);

      if (!template) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Prescription template not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json<ApiResponse>({
        success: true,
        message: 'Prescription template deleted successfully',
      });
    } catch (error: any) {
      console.error('Delete prescription template error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to delete prescription template',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

