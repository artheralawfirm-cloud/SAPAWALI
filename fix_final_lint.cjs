const fs = require('fs');

// Fix docxExporter.ts
let docx = fs.readFileSync('src/utils/docxExporter.ts', 'utf8');

docx = docx.replace(/new Paragraph\(\{\s*text:\s*([^,]+),\s*alignment:\s*([^,]+),\s*size:\s*(\d+)\s*\}\)/g, 
  'new Paragraph({ alignment: $2, children: [new TextRun({ text: $1, size: $3 })] })');
// Also if there's any stray sizes
docx = docx.replace(/size:\s*\d+,?/g, (match) => {
    // We only want to remove size: 22, from IParagraphOptions. Let's just do it manually.
    return match;
});
// Let's replace specifically lines 125, 135, 136 manually to be safe
docx = docx.replace(
    'new Paragraph({ text: `${content.subjekRoleCapital},`, alignment: AlignmentType.CENTER, size: 22 })',
    'new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${content.subjekRoleCapital},`, size: 22 })] })'
);
docx = docx.replace(
    'new Paragraph({ text: `Mengetahui,`, alignment: AlignmentType.CENTER, size: 22 })',
    'new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Mengetahui,`, size: 22 })] })'
);
docx = docx.replace(
    'new Paragraph({ text: `${content.petugasJabatan},`, alignment: AlignmentType.CENTER, size: 22 })',
    'new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${content.petugasJabatan},`, size: 22 })] })'
);

fs.writeFileSync('src/utils/docxExporter.ts', docx, 'utf8');

// Fix getNumberOfPages
let legalPdf = fs.readFileSync('src/utils/legalDocumentPdfExporter.ts', 'utf8');
legalPdf = legalPdf.replace(/\(pdfDoc as any\)\.getPageCount\(\)/g, '(pdfDoc as any).internal.getNumberOfPages()');
legalPdf = legalPdf.replace(/\(pdfDoc as any\)\.getPages\(\)/g, '(pdfDoc as any).internal.pages');
fs.writeFileSync('src/utils/legalDocumentPdfExporter.ts', legalPdf, 'utf8');

let pdfGen = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');
pdfGen = pdfGen.replace(/\(pdfDoc as any\)\.getPageCount\(\)/g, '(pdfDoc as any).internal.getNumberOfPages()');
pdfGen = pdfGen.replace(/\(pdfDoc as any\)\.getPages\(\)/g, '(pdfDoc as any).internal.pages');
fs.writeFileSync('src/utils/pdfGenerator.ts', pdfGen, 'utf8');

console.log('patched final errors');
