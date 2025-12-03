// Import font setup FIRST - this must run before PDFKit is imported
import './pdfkit-setup';
import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

interface PrescriptionPDFData {
  prescription: any; // Prescription document with populated patient
  doctorSettings?: any; // Doctor settings from database
  doctorName?: string;
  doctorCredentials?: string;
  clinicName?: string;
  clinicAddress?: string;
  clinicPhone?: string;
  clinicEmail?: string;
}

// Helper function to register Kalpurush font
function registerKalpurushFont(doc: any): string {
  const fontPaths = [
    path.join(process.cwd(), 'public', 'fonts', 'kalpurush', 'Kalpurush.ttf'),
    path.join(process.cwd(), 'public', 'fonts', 'kalpurush', 'kalpurush.ttf'),
    path.join(process.cwd(), 'fonts', 'kalpurush', 'Kalpurush.ttf'),
  ];

  for (const fontPath of fontPaths) {
    if (fs.existsSync(fontPath)) {
      try {
        doc.registerFont('Kalpurush', fontPath);
        doc.registerFont('Kalpurush-Bold', fontPath);
        return 'Kalpurush';
      } catch (error) {
        console.warn('Failed to register Kalpurush font:', error);
      }
    }
  }

  // Fallback to Helvetica if Kalpurush not found
  console.warn('Kalpurush font not found, using Helvetica as fallback');
  return 'Helvetica';
}

export function generatePrescriptionPDF(data: PrescriptionPDFData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Create PDF document
      const doc = new PDFDocument({
        size: 'A4',
        margin: 0, // No margins for full-page design
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
        doctorSettings,
      } = data;

      // Register Kalpurush font for Bengali text
      const bengaliFont = registerKalpurushFont(doc);
      const englishFont = 'Helvetica'; // Use Helvetica for English text

      // Extract patient data
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

      // Get settings with defaults
      const settings = doctorSettings || {};
      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;
      const margin = 30;
      const contentWidth = pageWidth - (margin * 2);

      // Background - Very subtle light gray (almost white)
      doc.rect(0, 0, pageWidth, pageHeight)
        .fillColor('#fafafa')
        .fill();

      // Draw very subtle grid lines (lighter and less frequent)
      doc.strokeColor('#f0f0f0', 0.5);
      doc.lineWidth(0.5);
      for (let i = 0; i < pageHeight; i += 25) {
        doc.moveTo(0, i).lineTo(pageWidth, i).stroke();
      }
      for (let i = 0; i < pageWidth; i += 25) {
        doc.moveTo(i, 0).lineTo(i, pageHeight).stroke();
      }

      // Reset stroke color and line width for text
      doc.strokeColor('black');
      doc.lineWidth(1);
      doc.fillColor('black'); // Ensure text color is black

      // ========== HEADER SECTION ==========
      const headerTop = margin;
      const headerHeight = 120;

      // Left Section - Doctor Information
      const leftX = margin;
      const leftWidth = contentWidth * 0.4;
      
      // Ensure black fill color for text
      doc.fillColor('black', 1);
      doc.fontSize(12).font(`${bengaliFont}-Bold`);
      doc.text(settings.doctorName || 'ডা: [ডাক্তারের নাম]', leftX, headerTop + 5, {
        width: leftWidth,
      });

      // Qualifications
      if (settings.qualifications && settings.qualifications.length > 0) {
        doc.fillColor('black', 1);
        doc.fontSize(9).font(bengaliFont);
        const qualText = settings.qualifications.join(', ');
        doc.text(qualText, leftX, doc.y + 3, { width: leftWidth });
      }

      // Specialization
      if (settings.specialization) {
        doc.fillColor('black', 1);
        doc.fontSize(9).font(bengaliFont);
        doc.text(settings.specialization, leftX, doc.y + 2, { width: leftWidth });
      }

      // Hospital Affiliation
      if (settings.hospitalAffiliation) {
        doc.fillColor('black', 1);
        doc.fontSize(8).font(bengaliFont);
        doc.text(settings.hospitalAffiliation, leftX, doc.y + 2, { width: leftWidth });
      }

      // Right Section - Specialties and Consultation Hours
      const rightX = margin + contentWidth * 0.6;
      const rightWidth = contentWidth * 0.4;

      if (settings.specialties && settings.specialties.length > 0) {
        doc.fillColor('black', 1);
        doc.fontSize(9).font(`${bengaliFont}-Bold`);
        doc.text(settings.specialties.join(', '), rightX, headerTop + 5, {
          width: rightWidth,
        });
      }

      if (settings.consultationHours) {
        doc.fillColor('black', 1);
        doc.fontSize(8).font(bengaliFont);
        doc.text(settings.consultationHours, rightX, doc.y + 3, { width: rightWidth });
      }

      // Center - Logo and Hospital Name
      const centerX = pageWidth / 2;
      const logoY = headerTop + 10;

      // Logo Circle (Red Crescent)
      if (settings.logoText) {
        doc.circle(centerX, logoY + 15, 15)
          .fillColor('#dc2626')
          .fill();
        doc.fontSize(10).font(`${englishFont}-Bold`)
          .fillColor('white')
          .text(settings.logoText, centerX - 8, logoY + 10);
      }

      // Tagline
      if (settings.tagline) {
        doc.fontSize(7).font(bengaliFont)
          .fillColor('#0066CC', 1)
          .text(settings.tagline, centerX - 30, logoY + 35, { width: 60, align: 'center' });
      }

      // Hospital Name
      if (settings.hospitalName) {
        doc.fontSize(8).font(bengaliFont)
          .fillColor('#0066CC', 1)
          .text(settings.hospitalName, centerX - 50, logoY + 45, { width: 100, align: 'center' });
      }

      // Watermark (if enabled)
      if (settings.showWatermark && settings.watermarkText) {
        doc.fontSize(80).font(`${englishFont}-Bold`)
          .fillColor('#e0e0e0', 0.15)
          .text(settings.watermarkText || settings.logoText || 'JPH', 
            centerX - 40, pageHeight / 2 - 40, 
            { width: 80, align: 'center' });
      }

      // Horizontal line after header
      doc.moveTo(margin, headerTop + headerHeight)
        .lineTo(pageWidth - margin, headerTop + headerHeight)
        .stroke();

      // ========== PATIENT INFORMATION SECTION ==========
      const patientSectionTop = headerTop + headerHeight + 15;
      
      // Left: Patient Name
      doc.fillColor('black', 1);
      doc.fontSize(10).font(`${bengaliFont}-Bold`);
      doc.text('রোগীর নাম:', margin, patientSectionTop);
      doc.font(bengaliFont)
        .fillColor('black', 1)
        .text(patient?.name || '_________________', margin + 60, patientSectionTop);

      // Right: Age and Date
      const rightStartY = patientSectionTop;
      doc.fillColor('black', 1);
      doc.fontSize(10).font(`${bengaliFont}-Bold`);
      doc.text('বয়স:', pageWidth - margin - 150, rightStartY);
      
      const age = patient?.dateOfBirth 
        ? Math.floor((new Date().getTime() - new Date(patient.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
        : null;
      doc.font(bengaliFont)
        .fillColor('black', 1)
        .text(age ? `${age} বছর` : '_____', pageWidth - margin - 100, rightStartY);

      doc.fillColor('black', 1);
      doc.font(`${bengaliFont}-Bold`)
        .text('তারিখ:', pageWidth - margin - 150, rightStartY + 15);
      const prescriptionDate = new Date(prescription.prescriptionDate);
      const dateStr = prescriptionDate.toLocaleDateString('bn-BD', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      doc.font(bengaliFont)
        .fillColor('black', 1)
        .text(dateStr, pageWidth - margin - 100, rightStartY + 15);

      // Rx Symbol
      doc.fillColor('black', 1);
      doc.fontSize(24).font(`${englishFont}-Bold`)
        .text('Rx', margin + 20, patientSectionTop + 30);

      // ========== MEDICATIONS SECTION ==========
      const medSectionTop = patientSectionTop + 60;
      const medStartX = margin + 10;
      const medWidth = contentWidth - 20;

      // Medications Table
      if (prescription.medications && prescription.medications.length > 0) {
        let currentY = medSectionTop;
        const rowHeight = 25;
        const col1Width = medWidth * 0.35; // Medication name
        const col2Width = medWidth * 0.15; // Dosage
        const col3Width = medWidth * 0.15; // Frequency
        const col4Width = medWidth * 0.15; // Duration
        const col5Width = medWidth * 0.20; // Meal timing

        prescription.medications.forEach((med: any, index: number) => {
          const y = currentY + (index * rowHeight);

          // Medication name (use appropriate font - Bengali or English)
          const medNameFont = /[\u0980-\u09FF]/.test(med.name) ? bengaliFont : englishFont;
          doc.fillColor('black', 1);
          doc.fontSize(9).font(`${medNameFont}-Bold`)
            .text(med.name || '', medStartX, y, { width: col1Width - 5 });

          // Dosage
          const dosageFont = /[\u0980-\u09FF]/.test(med.dosage || '') ? bengaliFont : englishFont;
          doc.fillColor('black', 1);
          doc.fontSize(8).font(dosageFont)
            .text(med.dosage || '', medStartX + col1Width, y, { width: col2Width - 5 });

          // Frequency
          const freqFont = /[\u0980-\u09FF]/.test(med.frequency || '') ? bengaliFont : englishFont;
          doc.fillColor('black', 1);
          doc.fontSize(8).font(freqFont)
            .text(med.frequency || '', medStartX + col1Width + col2Width, y, { width: col3Width - 5 });

          // Duration
          const durationFont = /[\u0980-\u09FF]/.test(med.duration || '') ? bengaliFont : englishFont;
          doc.fillColor('black', 1);
          doc.fontSize(8).font(durationFont)
            .text(med.duration || '', medStartX + col1Width + col2Width + col3Width, y, { width: col4Width - 5 });

          // Meal Timing (always Bengali)
          const mealTimingText = med.mealTiming === 'before' 
            ? 'খাওয়ার আগে' 
            : med.mealTiming === 'during' 
            ? 'খাওয়ার মধ্যে' 
            : med.mealTiming === 'after' 
            ? 'খাওয়ার পরে' 
            : '';
          doc.fillColor('black', 1);
          doc.fontSize(8).font(bengaliFont)
            .text(mealTimingText, medStartX + col1Width + col2Width + col3Width + col4Width, y, { width: col5Width - 5 });

          // Instructions (if any)
          if (med.instructions) {
            const instFont = /[\u0980-\u09FF]/.test(med.instructions) ? bengaliFont : englishFont;
            doc.fontSize(7).font(`${instFont}-Oblique`)
              .fillColor('#666666', 1)
              .text(`(${med.instructions})`, medStartX, y + 12, { width: medWidth });
            doc.fillColor('black', 1);
          }
        });
      }

      // Additional Instructions
      if (prescription.additionalInstructions) {
        const instY = medSectionTop + (prescription.medications.length * 25) + 20;
        doc.fillColor('black', 1);
        doc.fontSize(9).font(`${bengaliFont}-Bold`)
          .text('বিশেষ নির্দেশনা:', margin, instY);
        const addInstFont = /[\u0980-\u09FF]/.test(prescription.additionalInstructions) ? bengaliFont : englishFont;
        doc.fillColor('black', 1);
        doc.fontSize(8).font(addInstFont)
          .text(prescription.additionalInstructions, margin, instY + 12, { width: contentWidth });
      }

      // ========== FOOTER SECTION ==========
      const footerTop = pageHeight - 100;
      const footerHeight = 100;

      // Blue background for footer
      doc.rect(0, footerTop, pageWidth, footerHeight)
        .fillColor('#0066CC')
        .fill();

      // Follow-up Instructions
      doc.fillColor('white', 1);
      doc.fontSize(8).font(`${bengaliFont}-Bold`);
      
      if (settings.followUpInstructions) {
        doc.text('--- ' + settings.followUpInstructions, margin, footerTop + 10);
      }

      if (settings.nextVisitInstructions) {
        doc.fillColor('white', 1);
        doc.fontSize(7).font(bengaliFont)
          .text(settings.nextVisitInstructions, margin, footerTop + 25);
      }

      // Chamber Details
      const chamberY = footerTop + 45;
      doc.fillColor('white', 1);
      doc.fontSize(8).font(`${bengaliFont}-Bold`);
      
      if (settings.chamberName) {
        doc.text('চেম্বার : ' + settings.chamberName, margin, chamberY);
      }

      if (settings.chamberAddress) {
        doc.fillColor('white', 1);
        doc.fontSize(7).font(bengaliFont)
          .text(settings.chamberAddress, margin, chamberY + 12, { width: contentWidth });
      }

      // Contact for advance serial
      if (settings.chamberPhone && settings.chamberPhone.length > 0) {
        const phoneText = 'অগ্রিম সিরিয়ালের জন্য: ' + settings.chamberPhone.join(', ');
        doc.fillColor('white', 1);
        doc.fontSize(7).font(bengaliFont)
          .text(phoneText, margin, chamberY + 30, { width: contentWidth });
      }

      // Signature line
      const signatureY = footerTop - 30;
      doc.fillColor('black', 1);
      doc.fontSize(8).font(bengaliFont)
        .text('ডাক্তারের স্বাক্ষর:', margin, signatureY);
      doc.moveTo(margin + 80, signatureY + 10)
        .lineTo(margin + 200, signatureY + 10)
        .stroke();
      doc.fillColor('black', 1);
      doc.fontSize(7)
        .text(settings.doctorName || prescription.prescribedBy || 'ডা: [নাম]', margin + 80, signatureY + 5);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
