import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Schedule from '@/lib/models/Schedule';
import Appointment from '@/lib/models/Appointment';
import { ApiResponse } from '@/types';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
    const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1).toString());

    // Get all days in the month
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();

    // Get all recurring schedules
    const recurringSchedules = await Schedule.find({
      isRecurring: true,
      isAvailable: true,
    }).lean();

    // Get date-specific schedules for this month
    const dateSpecificSchedules = await Schedule.find({
      isRecurring: false,
      dateSpecific: {
        $gte: firstDay,
        $lte: lastDay,
      },
    }).lean();

    // Get all appointments for this month
    const appointments = await Appointment.find({
      date: {
        $gte: firstDay,
        $lte: lastDay,
      },
      status: { $in: ['pending', 'confirmed'] },
    })
      .select('date time')
      .lean();

    // Build availability map
    const availabilityMap: Record<string, { available: boolean; count: number; slots: string[] }> = {};

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month - 1, day);
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayOfWeek = currentDate.getDay();

      // Skip past dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (currentDate < today) {
        availabilityMap[dateStr] = { available: false, count: 0, slots: [] };
        continue;
      }

      // Check for date-specific schedule
      const dateSpecific = dateSpecificSchedules.find(s => {
        const scheduleDate = new Date(s.dateSpecific!);
        return scheduleDate.toDateString() === currentDate.toDateString();
      });

      // Get recurring schedule for this day of week
      const recurring = recurringSchedules.find(s => s.dayOfWeek === dayOfWeek);

      const schedule = dateSpecific || recurring;

      if (!schedule || !schedule.isAvailable) {
        availabilityMap[dateStr] = { available: false, count: 0, slots: [] };
        continue;
      }

      // Generate time slots for this day
      const [startHour, startMin] = schedule.startTime.split(':').map(Number);
      const [endHour, endMin] = schedule.endTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      const slotDuration = schedule.timeSlots && schedule.timeSlots.length > 0 
        ? schedule.timeSlots[0] 
        : 30;

      const allSlots: string[] = [];
      for (let minutes = startMinutes; minutes < endMinutes; minutes += slotDuration) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const timeSlot = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        allSlots.push(timeSlot);
      }

      // Get booked appointments for this date
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(currentDate);
      endOfDay.setHours(23, 59, 59, 999);

      const bookedForDay = appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate >= startOfDay && aptDate <= endOfDay;
      });

      const bookedTimes = new Set(bookedForDay.map(apt => apt.time));
      const availableSlots = allSlots.filter(slot => !bookedTimes.has(slot));

      availabilityMap[dateStr] = {
        available: availableSlots.length > 0,
        count: availableSlots.length,
        slots: availableSlots,
      };
    }

    const response = NextResponse.json<ApiResponse>({
      success: true,
      data: {
        year,
        month,
        availability: availabilityMap,
      },
    });

    // Cache for 5 minutes (availability changes frequently)
    response.headers.set('Cache-Control', 'private, max-age=300, stale-while-revalidate=60');
    
    return response;
  } catch (error: any) {
    console.error('Get month availability error:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to get month availability',
      },
      { status: 500 }
    );
  }
}
