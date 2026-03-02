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

    // Use lean() and select only time field for better performance
    const bookedAppointments = await Appointment.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['pending', 'confirmed'] },
    })
      .select('time')
      .lean();

    const bookedTimes = new Set(bookedAppointments.map((apt) => apt.time));

    // Generate available time slots with detailed info
    const slots: Array<{ time: string; available: boolean; booked: number; capacity: number }> = [];
    const [startHour, startMin] = schedule.startTime.split(':').map(Number);
    const [endHour, endMin] = schedule.endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const slotDuration = schedule.timeSlots && schedule.timeSlots.length > 0 
      ? schedule.timeSlots[0] 
      : 30; // Default 30 minutes
    
    // Set capacity per slot (default 3 appointments per slot)
    const capacityPerSlot = 3;

    // Get all appointments for each time slot
    const appointmentsByTime = await Appointment.aggregate([
      {
        $match: {
          date: { $gte: startOfDay, $lte: endOfDay },
          status: { $in: ['pending', 'confirmed'] },
        }
      },
      {
        $group: {
          _id: '$time',
          count: { $sum: 1 }
        }
      }
    ]);

    const bookedCountMap = new Map(
      appointmentsByTime.map(item => [item._id, item.count])
    );

    for (let minutes = startMinutes; minutes < endMinutes; minutes += slotDuration) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const timeSlot = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;

      const booked = bookedCountMap.get(timeSlot) || 0;
      const available = booked < capacityPerSlot;

      slots.push({
        time: timeSlot,
        available,
        booked,
        capacity: capacityPerSlot,
      });
    }

    const response = NextResponse.json<ApiResponse>({
      success: true,
      data: { 
        slots,
        date,
        slotDuration,
      },
    });

    // Add caching headers (10 minutes cache for available slots - they change frequently)
    response.headers.set('Cache-Control', 'private, max-age=600, stale-while-revalidate=300');
    
    return response;
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

