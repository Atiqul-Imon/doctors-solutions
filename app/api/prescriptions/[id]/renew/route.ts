import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Prescription from '@/lib/models/Prescription';
import { withAuth } from '@/lib/auth/middleware';
import { ApiResponse } from '@/types';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return withAuth(async (req: NextRequest) => {
    try {
      await connectDB();
      const { id } = await context.params;
      const body = await req.json();
      const { expiryDate, notes } = body;

      const prescription = await Prescription.findById(id);

      if (!prescription) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Prescription not found',
          },
          { status: 404 }
        );
      }

      if (prescription.status === 'cancelled') {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            error: 'Cannot renew a cancelled prescription',
          },
          { status: 400 }
        );
      }

      // Increment renewal count
      prescription.renewalCount = (prescription.renewalCount || 0) + 1;
      
      // Update expiry date if provided
      if (expiryDate) {
        prescription.expiryDate = new Date(expiryDate);
      }

      // Add notes if provided
      if (notes) {
        prescription.notes = (prescription.notes || '') + '\n' + `Renewal ${prescription.renewalCount}: ${notes}`;
      }

      prescription.status = 'active';
      
      // Populate before saving - more efficient than separate query after save
      await prescription.populate('patientId', 'name email phone');
      await prescription.save();
      
      // Convert to object for response - avoid unnecessary re-fetch
      const renewedPrescription = prescription.toObject();

      return NextResponse.json<ApiResponse>({
        success: true,
        data: renewedPrescription,
        message: 'Prescription renewed successfully',
      });
    } catch (error: any) {
      console.error('Renew prescription error:', error);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message || 'Failed to renew prescription',
        },
        { status: 500 }
      );
    }
  }, ['admin'])(req);
}

