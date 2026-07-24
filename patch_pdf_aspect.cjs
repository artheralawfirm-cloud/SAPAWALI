const fs = require('fs');

let code = fs.readFileSync('src/utils/legalDocumentPdfExporter.ts', 'utf8');

const search = `    // Standard A4 dimensions
    const pdfWidth = 210;
    const pdfHeight = 297;

    pdfDoc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');`;
    
const replace = `    // Proportional A4 dimensions to prevent vertical squishing
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

if (code.includes('pdfDoc.addImage(imgData')) {
    // wait the search string might not match exactly due to formatting
    // Let's use regex
    code = code.replace(/const pdfWidth = 210;\s*const pdfHeight = 297;\s*pdfDoc\.addImage\(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST'\);/g, replace);
    fs.writeFileSync('src/utils/legalDocumentPdfExporter.ts', code, 'utf8');
    console.log('patched pdf exporter aspect ratio');
}
