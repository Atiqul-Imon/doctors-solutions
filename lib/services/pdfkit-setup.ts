import path from 'path';
import fs from 'fs';

// Set PDFKit font path before any PDFKit imports
// This must run before PDFKit is imported to ensure fonts are found
export function setupPDFKitFonts() {
  const possiblePaths = [
    path.join(process.cwd(), 'public', 'fonts', 'pdfkit'),
    path.join(process.cwd(), 'node_modules', 'pdfkit', 'js', 'data'),
    path.join(__dirname, '..', '..', 'node_modules', 'pdfkit', 'js', 'data'),
  ];
  
  let fontPath: string | null = null;
  for (const possiblePath of possiblePaths) {
    try {
      const helveticaPath = path.join(possiblePath, 'Helvetica.afm');
      if (fs.existsSync(possiblePath) && fs.existsSync(helveticaPath)) {
        fontPath = possiblePath;
        break;
      }
    } catch (e) {
      // Continue to next path
    }
  }
  
  if (!fontPath) {
    fontPath = path.join(process.cwd(), 'public', 'fonts', 'pdfkit');
  }
  
  // Set environment variable - PDFKit checks this at module load time
  process.env.PDFKIT_FONTPATH = fontPath;
  
  return fontPath;
}

// Call setup immediately when this module loads
setupPDFKitFonts();

