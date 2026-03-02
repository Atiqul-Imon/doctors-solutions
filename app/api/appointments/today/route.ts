import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Appointment from '@/lib/models/Appointment';
import { verifyToken } from '@/lib/auth/jwt';
import { ApiResponse } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    await connectDB();

    // Get today's date range (start and end of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Fetch today's appointments with patient details
    const appointments = await Appointment.find({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    })
      .populate('patientId', 'name email phone dateOfBirth gender')
      .sort({ time: 1 }) // Sort by time ascending
      .lean();

    // Format the response
    const formattedAppointments = appointments.map((apt: any) => ({
      _id: apt._id.toString(),
      time: apt.time,
      date: apt.date,
      status: apt.status,
      reason: apt.reason,
      patient: apt.patientId
        ? {
            id: apt.patientId._id.toString(),
            name: apt.patientId.name,
            email: apt.patientId.email,
            phone: apt.patientId.phone,
            age: apt.patientId.dateOfBirth
              ? Math.floor(
                  (Date.now() - new Date(apt.patientId.dateOfBirth).getTime()) /
                    (365.25 * 24 * 60 * 60 * 1000)
                )
              : null,
            gender: apt.patientId.gender,
          }
        : null,
    }));

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: {
          appointments: formattedAppointments,
          total: formattedAppointments.length,
          date: today.toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching today\'s appointments:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to fetch today\'s appointments',
      },
      { status: 500 }
    );
  }
}
