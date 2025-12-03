import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Prescription from '@/lib/models/Prescription';
import Patient from '@/lib/models/Patient';
import { withAuth } from '@/lib/auth/middleware';
import { ApiResponse } from '@/types';

export async function GET(req: NextRequest) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();

      const searchParams = req.nextUrl.searchParams;
      const patientId = searchParams.get('patientId');
      const status = searchParams.get('status');
      const date = searchParams.get('date');
      const page = parseInt(searchParams.get('page') || '1');
      // Enforce maximum limit to prevent excessive data fetching and memory issues
      const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);

      const filter: any = {};

      if (patientId) {
        filter.patientId = patientId;
      }

      if (status) {
        filter.status = status;
      }

      if (date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        filter.prescriptionDate = { $gte: startOfDay, $lte: endOfDay };
      }

      const skip = (page - 1) * limit;

      // Use projection to only fetch needed fields
      const prescriptions = await Prescription.find(filter)
        .select('prescriptionNumber patientId prescribedBy prescriptionDate medications status refillable expiryDate createdAt')
        .populate('patientId', 'name email phone')
        .sort({ prescriptionDate: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      // Use estimatedDocumentCount for faster count when no filter
      const total = Object.keys(filter).length === 0
        ? await Prescription.estimatedDocumentCount()
        : await Prescription.countDocuments(filter);

      const response = NextResponse.json<ApiResponse>({
        success: true,
        data: {
          prescriptions,
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
      console.error('Get prescriptions error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to fetch prescriptions',
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
        patientId,
        visitNoteId,
        prescribedBy,
        prescriptionDate,
        medications,
        additionalInstructions,
        refillable,
        expiryDate,
        notes,
      } = body;

      if (!patientId || !prescribedBy || !medications || medications.length === 0) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Patient ID, prescribed by, and at least one medication are required',
          },
          { status: 400 }
        );
      }

      // Verify patient exists - use lean() since we only need existence check
      const patient = await Patient.findById(patientId).lean();
      if (!patient) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Patient not found',
          },
          { status: 404 }
        );
      }

      // Create prescription
      const prescription = new Prescription({
        patientId,
        visitNoteId,
        prescribedBy,
        prescriptionDate: prescriptionDate ? new Date(prescriptionDate) : new Date(),
        medications,
        additionalInstructions,
        refillable: refillable || false,
        expiryDate: expiryDate ? new Date(expiryDate) : undefined,
        notes,
        status: 'active',
      });

      // Populate before saving to avoid unnecessary re-fetch
      await prescription.populate('patientId', 'name email phone');
      await prescription.save();

      // Sync medications to patient's medications array if needed
      // Do this in parallel with returning response to improve performance
      if (medications && medications.length > 0) {
        const medicationsToAdd = medications.map((med: any) => ({
          name: med.name,
          dosage: med.dosage,
          frequency: med.frequency,
          startDate: prescription.prescriptionDate,
          endDate: expiryDate ? new Date(expiryDate) : undefined,
          prescribedBy: prescribedBy,
          notes: med.instructions || additionalInstructions || '',
        }));

        // Use updateOne for better performance (no document fetch)
        Patient.updateOne(
          { _id: patientId },
          { $push: { medications: { $each: medicationsToAdd } } }
        ).catch((error) => {
          // Log error but don't fail prescription creation
          console.error('Failed to sync medications to patient:', error);
        });
      }

      // Use populated prescription directly - avoid unnecessary re-fetch
      const populatedPrescription = prescription.toObject();

      return NextResponse.json<ApiResponse>(
        {
          success: true,
          data: populatedPrescription,
          message: 'Prescription created successfully',
        },
        { status: 201 }
      );
    } catch (error: any) {
      console.error('Create prescription error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to create prescription',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

