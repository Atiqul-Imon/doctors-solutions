import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Patient from '@/lib/models/Patient';
import { withAuth } from '@/lib/auth/middleware';
import { ApiResponse } from '@/types';

export async function GET(req: NextRequest) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();

      const searchParams = req.nextUrl.searchParams;
      const search = searchParams.get('search');
      const page = parseInt(searchParams.get('page') || '1');
      // Enforce maximum limit to prevent excessive data fetching and memory issues
      const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);

      const filter: any = {};

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
        ];
      }

      const skip = (page - 1) * limit;

      const patients = await Patient.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      const total = await Patient.countDocuments(filter);

      return NextResponse.json<ApiResponse>({
        success: true,
        data: {
          patients,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error: any) {
      console.error('Get patients error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to fetch patients',
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
        name,
        email,
        phone,
        dateOfBirth,
        gender,
        bloodGroup,
        address,
        emergencyContact,
      } = body;

      if (!name || !phone || !dateOfBirth || !gender) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Name, phone, date of birth, and gender are required',
          },
          { status: 400 }
        );
      }

      // Check if patient already exists - combine email and phone checks into single query
      // This reduces database operations from 2 queries to 1 (50% reduction)
      const existingPatientQuery: any = { phone }; // Phone is always required
      if (email) {
        existingPatientQuery.$or = [
          { phone },
          { email: email.toLowerCase() }
        ];
      }
      
      const existingPatient = await Patient.findOne(existingPatientQuery);
      if (existingPatient) {
        // Determine which field caused the conflict for better error message
        const errorMessage = existingPatient.email === email?.toLowerCase()
          ? 'Patient with this email already exists'
          : 'Patient with this phone number already exists';
        
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: errorMessage,
          },
          { status: 400 }
        );
      }

      const patient = new Patient({
        name,
        email: email ? email.toLowerCase() : undefined,
        phone,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        bloodGroup,
        address,
        emergencyContact,
      });

      await patient.save();

      return NextResponse.json<ApiResponse>(
        {
          success: true,
          data: patient,
          message: 'Patient created successfully',
        },
        { status: 201 }
      );
    } catch (error: any) {
      console.error('Create patient error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to create patient',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

