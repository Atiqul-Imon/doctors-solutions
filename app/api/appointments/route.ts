import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Appointment from '@/lib/models/Appointment';
import Patient from '@/lib/models/Patient';
import { ApiResponse } from '@/types';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    const page = parseInt(searchParams.get('page') || '1');
    // Enforce maximum limit to prevent excessive data fetching and memory issues
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);

    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      filter.date = { $gte: startOfDay, $lte: endOfDay };
    }

    const skip = (page - 1) * limit;

    // Use projection to only fetch needed fields
    const appointments = await Appointment.find(filter)
      .select('patientId date time duration status reason notes createdAt')
      .populate('patientId', 'name email phone')
      .sort({ date: 1, time: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Use estimatedDocumentCount for faster count when no filter
    const total = Object.keys(filter).length === 0
      ? await Appointment.estimatedDocumentCount()
      : await Appointment.countDocuments(filter);

    const response = NextResponse.json<ApiResponse>({
      success: true,
      data: {
        appointments,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });

    // Add caching headers for GET requests (5 minutes cache)
    response.headers.set('Cache-Control', 'private, max-age=300, stale-while-revalidate=600');
    
    return response;
  } catch (error: any) {
    console.error('Get appointments error:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to fetch appointments',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, phone, date, time, reason, notes } = body;

    if (!name || !phone || !date || !time || !reason) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Name, phone, date, time, and reason are required',
        },
        { status: 400 }
      );
    }

    // Find existing patient - patients must be created manually by admin
    // Find by phone first (required), then by email if provided
    let patient;
    if (email) {
      patient = await Patient.findOne({
        $or: [
          { phone },
          { email: email.toLowerCase() }
        ]
      });
    } else {
      patient = await Patient.findOne({ phone });
    }
    
    if (!patient) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Patient not found. Please contact the clinic to register as a patient first.',
        },
        { status: 404 }
      );
    }

    // Verify patient information matches
    if (patient.name.toLowerCase() !== name.toLowerCase()) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Patient name does not match our records. Please contact the clinic.',
        },
        { status: 400 }
      );
    }

    // Check for conflicting appointments
    // Fix: Don't mutate appointmentDate - create new dates for the query
    const appointmentDate = new Date(date);
    const startOfDay = new Date(appointmentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const conflictingAppointment = await Appointment.findOne({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      time,
      status: { $in: ['pending', 'confirmed'] },
    }).lean();

    if (conflictingAppointment) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'This time slot is already booked',
        },
        { status: 400 }
      );
    }

    // Create appointment
    const appointment = new Appointment({
      patientId: patient._id,
      date: appointmentDate,
      time,
      duration: 30, // Default 30 minutes
      status: 'pending',
      reason,
      notes: notes || '',
    });

    // Populate before saving to avoid unnecessary re-fetch
    await appointment.populate('patientId', 'name email phone');
    await appointment.save();
    
    // Use populated appointment directly - avoid unnecessary re-fetch
    const populatedAppointment = appointment.toObject();

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: populatedAppointment,
        message: 'Appointment booked successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create appointment error:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to book appointment',
      },
      { status: 500 }
    );
  }
}

