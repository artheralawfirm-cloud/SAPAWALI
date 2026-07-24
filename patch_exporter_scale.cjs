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
    
    // We want the PDF page to be as tall as the screenshot requires, so it doesn't squish.
    const pageHeight = Math.max(297, finalHeight);

    if (i > 0) {
      pdfDoc.addPage([210, pageHeight], 'portrait');
    } else {
      // For the first page, we can resize it if it's the only page so far
      if (pdfDoc.internal.getNumberOfPages() === 1) {
          // hack to resize first page
          pdfDoc.deletePage(1);
          pdfDoc.addPage([210, pageHeight], 'portrait');
      }
    }

    // Draw the image taking the full width and full required height
    pdfDoc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, finalHeight, undefined, 'FAST');`;

if (code.includes('if (finalHeight > 297) {')) {
    code = code.replace(search, replace);
    fs.writeFileSync('src/utils/legalDocumentPdfExporter.ts', code, 'utf8');
    console.log('patched pdf exporter to use dynamic page heights');
} else {
    console.log('could not find block');
}
