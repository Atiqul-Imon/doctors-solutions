import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import DoctorSettings from '@/lib/models/DoctorSettings';
import { withAuth } from '@/lib/auth/middleware';
import { ApiResponse } from '@/types';

// GET - Fetch doctor settings
export async function GET(req: NextRequest) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();

      // Get or create default settings
      let settings = await DoctorSettings.findOne();

      if (!settings) {
        // Create default settings
        settings = new DoctorSettings({
          doctorName: 'ডা: [ডাক্তারের নাম]',
          qualifications: ['এম.বি.বি.এস'],
          specialization: '',
          specialties: ['মেডিসিন'],
          hospitalName: '[হাসপাতালের নাম]',
          hospitalAddress: '',
          chamberName: '[চেম্বারের নাম]',
          chamberAddress: '',
          chamberPhone: ['০১৭০০-০০০০০০'],
          consultationHours: '',
          logoText: '',
          tagline: 'সেবাই পরম ধর্ম',
          showWatermark: true,
          followUpInstructions: 'দিন/সপ্তাহ/মাস পর আসবেন।',
          nextVisitInstructions: 'পরবর্তী সাক্ষাতের সময়- ব্যবস্থাপত্র ও রিপোর্ট সাথে আনবেন।',
        });
        await settings.save();
      }

      return NextResponse.json<ApiResponse>({
        success: true,
        data: settings,
      });
    } catch (error: any) {
      console.error('Get doctor settings error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to fetch doctor settings',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

// PUT - Update doctor settings
export async function PUT(req: NextRequest) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();
      const body = await req.json();

      // Get existing settings or create new
      let settings = await DoctorSettings.findOne();

      if (!settings) {
        settings = new DoctorSettings(body);
      } else {
        Object.assign(settings, body);
      }

      await settings.save();

      return NextResponse.json<ApiResponse>({
        success: true,
        data: settings,
        message: 'Doctor settings updated successfully',
      });
    } catch (error: any) {
      console.error('Update doctor settings error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to update doctor settings',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

