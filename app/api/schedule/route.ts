import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Schedule from '@/lib/models/Schedule';
import { withAuth } from '@/lib/auth/middleware';
import { ApiResponse } from '@/types';

export async function GET(req: NextRequest) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();

      const searchParams = req.nextUrl.searchParams;
      const dayOfWeek = searchParams.get('dayOfWeek');
      const isRecurring = searchParams.get('isRecurring') !== 'false';

      const filter: any = {};

      if (dayOfWeek !== null) {
        filter.dayOfWeek = parseInt(dayOfWeek);
      }

      filter.isRecurring = isRecurring === true;

      const schedules = await Schedule.find(filter).sort({ dayOfWeek: 1, startTime: 1 }).lean();

      return NextResponse.json<ApiResponse>({
        success: true,
        data: schedules,
      });
    } catch (error: any) {
      console.error('Get schedule error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to fetch schedule',
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
      const {
        dayOfWeek,
        startTime,
        endTime,
        isAvailable,
        timeSlots,
        dateSpecific,
        isRecurring,
      } = body;

      if (!startTime || !endTime) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Start time and end time are required',
          },
          { status: 400 }
        );
      }

      if (isRecurring && dayOfWeek === undefined) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Day of week is required for recurring schedule',
          },
          { status: 400 }
        );
      }

      if (!isRecurring && !dateSpecific) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Date specific is required for non-recurring schedule',
          },
          { status: 400 }
        );
      }

      // Check if schedule already exists
      const existingFilter: any = {
        isRecurring,
      };

      if (isRecurring) {
        existingFilter.dayOfWeek = dayOfWeek;
      } else {
        const date = new Date(dateSpecific);
        date.setHours(0, 0, 0, 0);
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        existingFilter.dateSpecific = { $gte: date, $lt: nextDate };
      }

      let schedule = await Schedule.findOne(existingFilter);

      if (schedule) {
        // Update existing schedule
        schedule.startTime = startTime;
        schedule.endTime = endTime;
        schedule.isAvailable = isAvailable !== undefined ? isAvailable : true;
        schedule.timeSlots = timeSlots || [30];
        if (!isRecurring) {
          schedule.dateSpecific = new Date(dateSpecific);
        }
        await schedule.save();
      } else {
        // Create new schedule
        const scheduleData: any = {
          startTime,
          endTime,
          isAvailable: isAvailable !== undefined ? isAvailable : true,
          timeSlots: timeSlots || [30],
          isRecurring: isRecurring !== undefined ? isRecurring : true,
        };

        if (isRecurring) {
          scheduleData.dayOfWeek = dayOfWeek;
        } else {
          scheduleData.dateSpecific = new Date(dateSpecific);
        }

        schedule = new Schedule(scheduleData);
        await schedule.save();
      }

      return NextResponse.json<ApiResponse>(
        {
          success: true,
          data: schedule,
          message: 'Schedule saved successfully',
        },
        { status: 201 }
      );
    } catch (error: any) {
      console.error('Create/Update schedule error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to save schedule',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

