const fs = require('fs');

let legalPdf = fs.readFileSync('src/utils/legalDocumentPdfExporter.ts', 'utf8');
legalPdf = legalPdf.replace(/pdfDoc\.getNumberOfPages\(\)/g, '(pdfDoc as any).internal.getNumberOfPages()');
legalPdf = legalPdf.replace(/pdfDoc\.getPages\(\)/g, '(pdfDoc as any).internal.pages');
fs.writeFileSync('src/utils/legalDocumentPdfExporter.ts', legalPdf, 'utf8');

let pdfGen = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');
pdfGen = pdfGen.replace(/pdfDoc\.getNumberOfPages\(\)/g, '(pdfDoc as any).internal.getNumberOfPages()');
pdfGen = pdfGen.replace(/pdfDoc\.getPages\(\)/g, '(pdfDoc as any).internal.pages');
fs.writeFileSync('src/utils/pdfGenerator.ts', pdfGen, 'utf8');

console.log('patched jspdf');
