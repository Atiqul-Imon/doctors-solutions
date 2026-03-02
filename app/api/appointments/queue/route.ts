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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's appointments with patient info
    const appointments = await Appointment.find({
      appointmentDate: {
        $gte: today,
        $lt: tomorrow,
      },
      status: { $nin: ['cancelled', 'completed'] },
    })
      .populate('patientId', 'name phone email dateOfBirth bloodGroup')
      .sort({ appointmentTime: 1 })
      .lean();

    // Categorize appointments by queue status
    const queue = {
      waiting: appointments.filter((apt: any) => 
        apt.status === 'confirmed' && !apt.arrivedAt
      ),
      arrived: appointments.filter((apt: any) => 
        apt.arrivedAt && !apt.consultationStartedAt
      ),
      inConsultation: appointments.filter((apt: any) => 
        apt.consultationStartedAt && !apt.consultationEndedAt
      ),
      completed: appointments.filter((apt: any) => 
        apt.consultationEndedAt
      ),
      pending: appointments.filter((apt: any) => 
        apt.status === 'pending'
      ),
    };

    // Calculate wait times for arrived patients
    const now = new Date();
    queue.arrived = queue.arrived.map((apt: any) => ({
      ...apt,
      waitTime: apt.arrivedAt 
        ? Math.floor((now.getTime() - new Date(apt.arrivedAt).getTime()) / (1000 * 60))
        : 0,
    }));

    queue.inConsultation = queue.inConsultation.map((apt: any) => ({
      ...apt,
      consultationDuration: apt.consultationStartedAt
        ? Math.floor((now.getTime() - new Date(apt.consultationStartedAt).getTime()) / (1000 * 60))
        : 0,
    }));

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: queue,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching queue:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to fetch queue',
      },
      { status: 500 }
    );
  }
}

// Update appointment status (mark as arrived, start consultation, etc.)
export async function PATCH(req: NextRequest) {
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

    const { appointmentId, action, queuePosition } = await req.json();

    if (!appointmentId || !action) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    await connectDB();

    let updateData: any = {};
    const now = new Date();

    switch (action) {
      case 'mark_arrived':
        updateData = { arrivedAt: now, status: 'confirmed' };
        break;
      case 'start_consultation':
        updateData = { consultationStartedAt: now };
        break;
      case 'end_consultation':
        updateData = { consultationEndedAt: now, status: 'completed' };
        break;
      case 'reorder':
        // Update queue position (for drag-and-drop)
        updateData = { queuePosition: queuePosition };
        break;
      case 'skip':
        // Move to end of queue
        const maxPosition = await Appointment.find({
          appointmentDate: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        }).countDocuments();
        updateData = { queuePosition: maxPosition + 1 };
        break;
      default:
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Invalid action',
          },
          { status: 400 }
        );
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updateData,
      { new: true }
    ).populate('patientId', 'name phone email');

    if (!appointment) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Appointment not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: appointment,
        message: `Appointment ${action.replace('_', ' ')} successfully`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating queue:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to update queue',
      },
      { status: 500 }
    );
  }
}
