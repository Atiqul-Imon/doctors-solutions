import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Patient from '@/lib/models/Patient';
import { verifyToken } from '@/lib/auth/jwt';
import { ApiResponse } from '@/types';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
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

    const patient = await Patient.findById(id)
      .populate('visitNotes')
      .populate('prescriptions')
      .lean();

    if (!patient) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Patient not found',
        },
        { status: 404 }
      );
    }

    // Generate HTML for PDF
    const html = generatePatientSummaryHTML(patient);

    // Return HTML (can be converted to PDF on client-side using print or a library)
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `inline; filename="patient-${patient._id}-summary.html"`,
      },
    });
  } catch (error: any) {
    console.error('Error exporting patient data:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || 'Failed to export patient data',
      },
      { status: 500 }
    );
  }
}

function generatePatientSummaryHTML(patient: any): string {
  const calculateAge = (dob: string) => {
    if (!dob) return 'N/A';
    const age = Math.floor(
      (Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    );
    return `${age} years`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Patient Summary - ${patient.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 40px; max-width: 1200px; margin: 0 auto; }
    h1 { color: #2563eb; margin-bottom: 10px; font-size: 32px; }
    h2 { color: #1e40af; margin-top: 30px; margin-bottom: 15px; font-size: 24px; border-bottom: 2px solid #2563eb; padding-bottom: 5px; }
    h3 { color: #374151; margin-top: 20px; margin-bottom: 10px; font-size: 18px; }
    .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
    .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px; }
    .info-item { padding: 10px; background: #f3f4f6; border-radius: 5px; }
    .info-label { font-weight: bold; color: #6b7280; font-size: 14px; }
    .info-value { color: #111827; font-size: 16px; margin-top: 5px; }
    .alert-box { background: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; border-radius: 5px; }
    .alert-title { font-weight: bold; color: #991b1b; font-size: 18px; margin-bottom: 10px; }
    .medication { background: #f0fdf4; border-left: 4px solid #16a34a; padding: 15px; margin: 10px 0; border-radius: 5px; }
    .visit { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 10px 0; border-radius: 5px; }
    .vitals { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 10px 0; }
    .vital-card { background: #fff; border: 1px solid #e5e7eb; padding: 10px; border-radius: 5px; text-align: center; }
    .vital-label { font-size: 12px; color: #6b7280; }
    .vital-value { font-size: 20px; font-weight: bold; color: #111827; margin-top: 5px; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f3f4f6; font-weight: bold; color: #374151; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
    @media print {
      body { padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Patient Medical Summary</h1>
    <p style="color: #6b7280; font-size: 14px;">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>

  <h2>Patient Information</h2>
  <div class="info-grid">
    <div class="info-item">
      <div class="info-label">Full Name</div>
      <div class="info-value">${patient.name}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Age</div>
      <div class="info-value">${calculateAge(patient.dateOfBirth)}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Gender</div>
      <div class="info-value">${patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : 'Not specified'}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Blood Group</div>
      <div class="info-value">${patient.bloodGroup || 'Not recorded'}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Phone</div>
      <div class="info-value">${patient.phone}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Email</div>
      <div class="info-value">${patient.email || 'Not provided'}</div>
    </div>
  </div>

  ${patient.allergies && patient.allergies.length > 0 ? `
  <div class="alert-box">
    <div class="alert-title">⚠️ ALLERGIES - CRITICAL INFORMATION</div>
    ${patient.allergies.map((allergy: any) => `
      <div style="margin-top: 10px;">
        <strong>${allergy.allergen}</strong> (${allergy.severity || 'Unknown severity'})
        <br>Reaction: ${allergy.reaction}
        ${allergy.notes ? `<br><em>${allergy.notes}</em>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${patient.medications && patient.medications.length > 0 ? `
  <h2>Current Medications</h2>
  ${patient.medications.map((med: any) => `
    <div class="medication">
      <h3>${med.name}</h3>
      <p><strong>Dosage:</strong> ${med.dosage} | <strong>Frequency:</strong> ${med.frequency}</p>
      ${med.startDate ? `<p><strong>Started:</strong> ${formatDate(med.startDate)}</p>` : ''}
      ${med.notes ? `<p><em>${med.notes}</em></p>` : ''}
    </div>
  `).join('')}
  ` : '<h2>Current Medications</h2><p>No current medications recorded.</p>'}

  ${patient.visitNotes && patient.visitNotes.length > 0 ? `
  <h2>Recent Visit History</h2>
  ${patient.visitNotes.slice(0, 5).map((visit: any) => `
    <div class="visit">
      <h3>${formatDate(visit.visitDate)}</h3>
      <p><strong>Chief Complaint:</strong> ${visit.chiefComplaint}</p>
      <p><strong>Diagnosis:</strong> ${visit.diagnosis}</p>
      <p><strong>Treatment:</strong> ${visit.treatment}</p>
      ${visit.followUpDate ? `<p><strong>Follow-up:</strong> ${formatDate(visit.followUpDate)}</p>` : ''}
    </div>
  `).join('')}
  ` : ''}

  ${patient.vitalSigns && patient.vitalSigns.length > 0 ? `
  <h2>Latest Vital Signs</h2>
  <div class="vitals">
    ${patient.vitalSigns[0].bloodPressure ? `
    <div class="vital-card">
      <div class="vital-label">Blood Pressure</div>
      <div class="vital-value">${patient.vitalSigns[0].bloodPressure}</div>
    </div>
    ` : ''}
    ${patient.vitalSigns[0].heartRate ? `
    <div class="vital-card">
      <div class="vital-label">Heart Rate</div>
      <div class="vital-value">${patient.vitalSigns[0].heartRate} bpm</div>
    </div>
    ` : ''}
    ${patient.vitalSigns[0].temperature ? `
    <div class="vital-card">
      <div class="vital-label">Temperature</div>
      <div class="vital-value">${patient.vitalSigns[0].temperature}°F</div>
    </div>
    ` : ''}
    ${patient.vitalSigns[0].weight ? `
    <div class="vital-card">
      <div class="vital-label">Weight</div>
      <div class="vital-value">${patient.vitalSigns[0].weight} kg</div>
    </div>
    ` : ''}
  </div>
  ` : ''}

  <div class="footer">
    <p>This is a confidential medical document. Please handle with care.</p>
    <p>Doctor Portfolio System | Patient ID: ${patient._id}</p>
  </div>

  <script>
    // Auto-print when opened
    window.onload = function() {
      setTimeout(() => {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
  `.trim();
}
