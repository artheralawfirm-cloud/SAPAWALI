const fs = require('fs');

let legalPdf = fs.readFileSync('src/utils/legalDocumentPdfExporter.ts', 'utf8');
legalPdf = legalPdf.replace(/pdfDoc\.internal\.getNumberOfPages\(\)/g, '(pdfDoc.internal as any).getNumberOfPages()');
legalPdf = legalPdf.replace(/pdfDoc\.internal\.pages/g, '(pdfDoc.internal as any).pages');
fs.writeFileSync('src/utils/legalDocumentPdfExporter.ts', legalPdf, 'utf8');

let pdfGen = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');
pdfGen = pdfGen.replace(/pdfDoc\.internal\.getNumberOfPages\(\)/g, '(pdfDoc.internal as any).getNumberOfPages()');
pdfGen = pdfGen.replace(/pdfDoc\.internal\.pages/g, '(pdfDoc.internal as any).pages');
fs.writeFileSync('src/utils/pdfGenerator.ts', pdfGen, 'utf8');

console.log('patched jspdf 2');
