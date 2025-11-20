// Import font setup FIRST - this must run before PDFKit is imported
import './pdfkit-setup';
import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

interface PrescriptionPDFData {
  prescription: any; // Prescription document with populated patient
  doctorName?: string;
  doctorCredentials?: string;
  clinicName?: string;
  clinicAddress?: string;
  clinicPhone?: string;
  clinicEmail?: string;
}

export function generatePrescriptionPDF(data: PrescriptionPDFData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Font path is already set by pdfkit-setup.ts which runs before PDFKit is imported
      // This ensures PDFKit can find fonts at module initialization time
      
      // Create PDF document
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        bufferPages: true,
        autoFirstPage: true,
      });

      const buffers: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => {
        buffers.push(chunk);
      });
      
      doc.on('end', () => {
        try {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        } catch (error) {
          reject(error);
        }
      });
      
      doc.on('error', (error: Error) => {
        reject(error);
      });

      const {
        prescription,
        doctorName = 'Dr. [Doctor Name]',
        doctorCredentials = 'MBBS, MD',
        clinicName = '[Clinic Name]',
        clinicAddress = '[Clinic Address]',
        clinicPhone = '[Phone]',
        clinicEmail = '[Email]',
      } = data;

      // Extract patient data - handle both populated object and plain object
      let patient: any = {};
      if (prescription.patientId) {
        if (typeof prescription.patientId === 'object' && !Array.isArray(prescription.patientId)) {
          patient = prescription.patientId;
        } else {
          throw new Error('Patient data is not properly populated');
        }
      }
      
      // Validate required data
      if (!prescription.prescriptionNumber) {
        throw new Error('Prescription number is missing');
      }
      
      if (!prescription.medications || prescription.medications.length === 0) {
        throw new Error('Prescription must have at least one medication');
      }
      
      if (!prescription.prescriptionDate) {
        throw new Error('Prescription date is missing');
      }

      // Header
      doc.fontSize(20).font('Helvetica-Bold').text(clinicName, { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(10).font('Helvetica').text(clinicAddress, { align: 'center' });
      doc.text(`Phone: ${clinicPhone} | Email: ${clinicEmail}`, { align: 'center' });
      doc.moveDown();

      // Prescription Title
      doc.fontSize(16).font('Helvetica-Bold').text('PRESCRIPTION', { align: 'center' });
      doc.moveDown();

      // Prescription Number and Date
      doc.fontSize(10).font('Helvetica');
      doc.text(`Prescription No: ${prescription.prescriptionNumber}`, { continued: false });
      doc.text(
        `Date: ${new Date(prescription.prescriptionDate).toLocaleDateString('en-GB')}`,
        { align: 'right', continued: false }
      );
      doc.moveDown();

      // Doctor Information
      doc.font('Helvetica-Bold').text(`Prescribed By: ${prescription.prescribedBy || doctorName}`);
      if (doctorCredentials) {
        doc.font('Helvetica').fontSize(9).text(`Credentials: ${doctorCredentials}`);
      }
      doc.moveDown();

      // Patient Information
      doc.fontSize(12).font('Helvetica-Bold').text('Patient Information:');
      doc.fontSize(10).font('Helvetica');
      doc.text(`Name: ${patient?.name || 'N/A'}`);
      if (patient?.phone) {
        doc.text(`Phone: ${patient.phone}`);
      }
      if (patient?.email) {
        doc.text(`Email: ${patient.email}`);
      }
      if (patient?.dateOfBirth) {
        const age = Math.floor(
          (new Date().getTime() - new Date(patient.dateOfBirth).getTime()) /
            (365.25 * 24 * 60 * 60 * 1000)
        );
        doc.text(`Age: ${age} years`);
      }
      if (patient?.gender) {
        doc.text(`Gender: ${patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}`);
      }
      if (patient?.bloodGroup) {
        doc.text(`Blood Group: ${patient.bloodGroup}`);
      }
      doc.moveDown();

      // Medications Section
      doc.fontSize(12).font('Helvetica-Bold').text('Medications:');
      doc.moveDown(0.5);

      if (prescription.medications && prescription.medications.length > 0) {
        const tableTop = doc.y;
        const itemHeight = 60;
        const startX = 50;
        const col1Width = 120;
        const col2Width = 80;
        const col3Width = 80;
        const col4Width = 80;

        // Table Header
        doc.fontSize(10).font('Helvetica-Bold');
        doc.text('Medication', startX, tableTop);
        doc.text('Dosage', startX + col1Width, tableTop);
        doc.text('Frequency', startX + col1Width + col2Width, tableTop);
        doc.text('Duration', startX + col1Width + col2Width + col3Width, tableTop);

        // Draw line under header
        doc.moveTo(startX, tableTop + 15).lineTo(550, tableTop + 15).stroke();

        // Table Rows
        doc.font('Helvetica').fontSize(9);
        prescription.medications.forEach((med: any, index: number) => {
          const y = tableTop + 20 + index * itemHeight;

          // Medication name
          doc.text(med.name, startX, y, { width: col1Width - 10 });
          
          // Dosage
          doc.text(med.dosage || 'N/A', startX + col1Width, y, { width: col2Width - 10 });
          
          // Frequency
          doc.text(med.frequency || 'N/A', startX + col1Width + col2Width, y, {
            width: col3Width - 10,
          });
          
          // Duration
          doc.text(med.duration || 'N/A', startX + col1Width + col2Width + col3Width, y, {
            width: col4Width - 10,
          });

          // Instructions for this medication
          if (med.instructions) {
            doc.fontSize(8).font('Helvetica-Oblique');
            doc.text(`Note: ${med.instructions}`, startX + 10, y + 15, {
              width: 480,
              continued: false,
            });
            doc.font('Helvetica').fontSize(9);
          }

          // Draw line between rows
          if (index < prescription.medications.length - 1) {
            doc
              .moveTo(startX, y + itemHeight - 10)
              .lineTo(550, y + itemHeight - 10)
              .stroke();
          }
        });

        doc.y = tableTop + 25 + prescription.medications.length * itemHeight;
        doc.moveDown();
      }

      // Additional Instructions
      if (prescription.additionalInstructions) {
        doc.fontSize(12).font('Helvetica-Bold').text('Additional Instructions:');
        doc.fontSize(10).font('Helvetica').text(prescription.additionalInstructions);
        doc.moveDown();
      }

      // Notes
      if (prescription.notes) {
        doc.fontSize(12).font('Helvetica-Bold').text('Notes:');
        doc.fontSize(10).font('Helvetica').text(prescription.notes);
        doc.moveDown();
      }

      // Prescription Status
      if (prescription.status) {
        doc.fontSize(10).font('Helvetica-Bold');
        doc.text(`Status: ${prescription.status.toUpperCase()}`, {
          align: 'right',
        });
      }

      if (prescription.refillable) {
        doc.fontSize(10).font('Helvetica');
        doc.text('Refillable: Yes', { align: 'right' });
      }

      if (prescription.expiryDate) {
        doc.fontSize(10).font('Helvetica');
        doc.text(
          `Valid Until: ${new Date(prescription.expiryDate).toLocaleDateString('en-GB')}`,
          { align: 'right' }
        );
      }

      if (prescription.renewalCount > 0) {
        doc.fontSize(10).font('Helvetica');
        doc.text(`Renewals: ${prescription.renewalCount}`, { align: 'right' });
      }

      doc.moveDown(3);

      // Signature Area
      doc.fontSize(10).font('Helvetica');
      doc.text('Doctor\'s Signature:', 50);
      doc.moveDown(2);
      doc.moveTo(50, doc.y).lineTo(200, doc.y).stroke();
      doc.text(prescription.prescribedBy || doctorName, 50, doc.y - 15);

      // Footer
      const pageHeight = doc.page.height;
      const pageWidth = doc.page.width;
      doc.fontSize(8).font('Helvetica').text(
        'This is a computer-generated prescription. Original signature required for validity.',
        pageWidth / 2 - 150,
        pageHeight - 50,
        { width: 300, align: 'center' }
      );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

