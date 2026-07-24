const fs = require('fs');
let code = fs.readFileSync('src/utils/legalDocumentPdfExporter.ts', 'utf8');

const search = `    if (i > 0) {
      pdfDoc.addPage('a4', 'portrait');
    }

    // Standard A4 dimensions
    
    // Proportional A4 dimensions to prevent vertical squishing
    const pdfWidth = 210;
    let finalWidth = pdfWidth;
    let finalHeight = (canvas.height * finalWidth) / canvas.width;
    
    let xOffset = 0;
    
    // If it's too tall, scale it down to fit the A4 page height
    if (finalHeight > 297) {
      finalHeight = 297;
      finalWidth = (canvas.width * finalHeight) / canvas.height;
      xOffset = (pdfWidth - finalWidth) / 2; // Center horizontally
    }

    pdfDoc.addImage(imgData, 'JPEG', xOffset, 0, finalWidth, finalHeight, undefined, 'FAST');`;

const replace = `    const pdfWidth = 210;
    let finalHeight = (canvas.height * pdfWidth) / canvas.width;
    const pageHeight = Math.max(297, finalHeight);

    if (i > 0) {
      pdfDoc.addPage([210, pageHeight], 'portrait');
    } else {
      if (pdfDoc.internal.getNumberOfPages() === 1) {
          pdfDoc.deletePage(1);
          pdfDoc.addPage([210, pageHeight], 'portrait');
      }
    }

    pdfDoc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, finalHeight, undefined, 'FAST');`;

code = code.replace(search, replace);
fs.writeFileSync('src/utils/legalDocumentPdfExporter.ts', code, 'utf8');
console.log('patched generateLegalDocumentsPdf');
