import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Prescription from '@/lib/models/Prescription';
import { withAuth } from '@/lib/auth/middleware';
import { generatePrescriptionPDF } from '@/lib/services/prescriptionPdf';
import { ApiResponse } from '@/types';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();
      const { id } = await context.params;

      const prescription = await Prescription.findById(id)
        .populate('patientId', 'name email phone dateOfBirth gender bloodGroup address')
        .lean();

      if (!prescription) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Prescription not found',
          },
          { status: 404 }
        );
      }

      // Ensure patientId is populated (should be an object, not just an ID)
      if (!prescription.patientId || typeof prescription.patientId !== 'object') {
        console.error('Patient not populated for prescription:', id);
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Patient information not available for this prescription',
          },
          { status: 400 }
        );
      }

      // Validate prescription has required data
      if (!prescription.prescriptionNumber) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Prescription number is missing',
          },
          { status: 400 }
        );
      }

      if (!prescription.medications || prescription.medications.length === 0) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Prescription has no medications',
          },
          { status: 400 }
        );
      }

      // Generate PDF
      const pdfBuffer = await generatePrescriptionPDF({
        prescription,
      });

      if (!pdfBuffer || pdfBuffer.length === 0) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Failed to generate PDF buffer',
          },
          { status: 500 }
        );
      }

      // Convert Buffer to Uint8Array for Next.js Response
      const pdfArray = new Uint8Array(pdfBuffer);

      // Return PDF as response
      return new NextResponse(pdfArray, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="prescription-${prescription.prescriptionNumber}.pdf"`,
        },
      });
    } catch (error: any) {
      console.error('Print prescription error:', error);
      console.error('Error stack:', error.stack);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to generate prescription PDF',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

