import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Patient from '@/lib/models/Patient';
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

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json<ApiResponse>(
        {
          success: true,
          data: { patients: [] },
        },
        { status: 200 }
      );
    }

    const searchQuery = query.trim();

    // Search by name, phone, or email
    const patients = await Patient.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { phone: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
      ],
    })
      .select('name email phone dateOfBirth gender bloodGroup')
      .limit(10)
      .sort({ name: 1 })
      .lean();

    const formattedPatients = patients.map((patient: any) => ({
      id: patient._id.toString(),
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      age: patient.dateOfBirth
        ? Math.floor(
            (Date.now() - new Date(patient.dateOfBirth).getTime()) /
              (365.25 * 24 * 60 * 60 * 1000)
          )
        : null,
      gender: patient.gender,
      bloodGroup: patient.bloodGroup,
    }));

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: {
          patients: formattedPatients,
          total: formattedPatients.length,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error searching patients:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to search patients',
      },
      { status: 500 }
    );
  }
}
