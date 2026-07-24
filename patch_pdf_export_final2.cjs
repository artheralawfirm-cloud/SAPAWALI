const fs = require('fs');
let code = fs.readFileSync('src/utils/legalDocumentPdfExporter.ts', 'utf8');

const regex = /if\s*\(i\s*>\s*0\)\s*\{\s*pdfDoc\.addPage\('a4',\s*'portrait'\);\s*\}.*?pdfDoc\.addImage\(imgData,\s*'JPEG',\s*xOffset,\s*0,\s*finalWidth,\s*finalHeight,\s*undefined,\s*'FAST'\);/s;

const replace = `const pdfWidth = 210;
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

code = code.replace(regex, replace);
fs.writeFileSync('src/utils/legalDocumentPdfExporter.ts', code, 'utf8');
console.log('patched generateLegalDocumentsPdf with regex');
