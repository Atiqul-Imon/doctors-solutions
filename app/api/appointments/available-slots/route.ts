import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Schedule from '@/lib/models/Schedule';
import Appointment from '@/lib/models/Appointment';
import { ApiResponse } from '@/types';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Date parameter is required',
        },
        { status: 400 }
      );
    }

    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();

    // Get recurring schedule for this day of week
    const recurringSchedule = await Schedule.findOne({
      dayOfWeek,
      isRecurring: true,
      isAvailable: true,
    }).lean();

    // Get date-specific schedule (for holidays or special dates)
    // Fix: Don't mutate selectedDate - create new dates for the query
    const startOfSelectedDate = new Date(selectedDate);
    startOfSelectedDate.setHours(0, 0, 0, 0);
    const endOfSelectedDate = new Date(selectedDate);
    endOfSelectedDate.setHours(23, 59, 59, 999);
    
    const dateSpecificSchedule = await Schedule.findOne({
      dateSpecific: {
        $gte: startOfSelectedDate,
        $lt: endOfSelectedDate,
      },
      isRecurring: false,
    }).lean();

    const schedule = dateSpecificSchedule || recurringSchedule;

    if (!schedule || !schedule.isAvailable) {
      return NextResponse.json<ApiResponse>({
        success: true,
        data: { slots: [] },
      });
    }

    // Get booked appointments for this date
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const bookedAppointments = await Appointment.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['pending', 'confirmed'] },
    }).select('time');

    const bookedTimes = new Set(bookedAppointments.map((apt) => apt.time));

    // Generate available time slots
    const slots: string[] = [];
    const [startHour, startMin] = schedule.startTime.split(':').map(Number);
    const [endHour, endMin] = schedule.endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const slotDuration = schedule.timeSlots && schedule.timeSlots.length > 0 
      ? schedule.timeSlots[0] 
      : 30; // Default 30 minutes

    for (let minutes = startMinutes; minutes < endMinutes; minutes += slotDuration) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const timeSlot = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;

      if (!bookedTimes.has(timeSlot)) {
        slots.push(timeSlot);
      }
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: { slots },
    });
  } catch (error: any) {
    console.error('Get available slots error:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to get available slots',
      },
      { status: 500 }
    );
  }
}

