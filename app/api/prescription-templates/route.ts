import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import PrescriptionTemplate from '@/lib/models/PrescriptionTemplate';
import { withAuth } from '@/lib/auth/middleware';
import { ApiResponse } from '@/types';

export async function GET(req: NextRequest) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();

      const searchParams = req.nextUrl.searchParams;
      const category = searchParams.get('category');
      const search = searchParams.get('search');

      const filter: any = {};

      if (category) {
        filter.category = category;
      }

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      const templates = await PrescriptionTemplate.find(filter)
        .sort({ usageCount: -1, name: 1 })
        .lean();

      return NextResponse.json<ApiResponse>({
        success: true,
        data: templates,
      });
    } catch (error: any) {
      console.error('Get prescription templates error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to fetch prescription templates',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

export async function POST(req: NextRequest) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();

      const body = await req.json();
      const { name, description, medications, defaultInstructions, category, createdBy } = body;

      if (!name || !medications || medications.length === 0 || !createdBy) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Name, medications, and created by are required',
          },
          { status: 400 }
        );
      }

      const template = new PrescriptionTemplate({
        name,
        description,
        medications,
        defaultInstructions,
        category: category || 'general',
        createdBy,
        usageCount: 0,
      });

      await template.save();

      return NextResponse.json<ApiResponse>(
        {
          success: true,
          data: template,
          message: 'Prescription template created successfully',
        },
        { status: 201 }
      );
    } catch (error: any) {
      console.error('Create prescription template error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to create prescription template',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

