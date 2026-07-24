const fs = require('fs');

// Fix LegalReportsPageView
let uiCode = fs.readFileSync('src/components/LegalReportsPageView.tsx', 'utf8');
uiCode = uiCode.replace(
  'const blob = await generateDocxForRecord(currentRecord, selectedRecordIndex, canvasDataUrl, selectedOfficer);',
  'const blob = await generateDocxForRecord(currentRecord, selectedRecordIndex, canvasDataUrl, null);'
);
fs.writeFileSync('src/components/LegalReportsPageView.tsx', uiCode, 'utf8');

// Fix docxExporter.ts
let docxCode = fs.readFileSync('src/utils/docxExporter.ts', 'utf8');

// Fix ImageRun data
docxCode = docxCode.replace(
    'data: screenshotBuffer,',
    'data: screenshotBuffer as any,'
);
docxCode = docxCode.replace(
    'transformation: { width: 400, height: 700 }',
    'transformation: { width: 400, height: 700 } as any'
);

// Fix dateInfo.hari -> hariStr, tanggal -> tanggalTerbilang (or use fullDateFormatted)
docxCode = docxCode.replace(
    '${content.dateInfo.hari} tanggal ${content.dateInfo.tanggal} bulan ${content.dateInfo.bulan} tahun ${content.dateInfo.tahun}',
    '${content.dateInfo.hariStr} tanggal ${content.dateInfo.tanggalTerbilang} bulan ${content.dateInfo.bulanStr} tahun ${content.dateInfo.tahunTerbilang}'
);

docxCode = docxCode.replace(
    '(${content.dateInfo.formattedDate})',
    '(${content.dateInfo.fullDateFormatted})'
);

// Remove size: 22 from new Paragraph({ text: ..., size: 22 })
// In docx 8+, Paragraph options don't have 'size' property, it belongs to TextRun or styles.
// I'll replace new Paragraph({ text: \`...\`, size: 22 }) with new Paragraph({ children: [new TextRun({ text: \`...\`, size: 22 })] })

docxCode = docxCode.replace(/new Paragraph\(\{\s*text:\s*([^,]+),\s*size:\s*(\d+)\s*\}\)/g, 
  'new Paragraph({ children: [new TextRun({ text: $1, size: $2 })] })');

docxCode = docxCode.replace(/new Paragraph\(\{\s*text:\s*([^,]+),\s*bold:\s*true,\s*size:\s*(\d+)\s*\}\)/g, 
  'new Paragraph({ children: [new TextRun({ text: $1, bold: true, size: $2 })] })');

// What about alignment in those?
docxCode = docxCode.replace(/new Paragraph\(\{\s*text:\s*([^,]+),\s*alignment:\s*([^,]+),\s*size:\s*(\d+)\s*\}\)/g, 
  'new Paragraph({ alignment: $2, children: [new TextRun({ text: $1, size: $3 })] })');

docxCode = docxCode.replace(/new Paragraph\(\{\s*text:\s*([^,]+),\s*alignment:\s*([^,]+),\s*bold:\s*true,\s*size:\s*(\d+)\s*\}\)/g, 
  'new Paragraph({ alignment: $2, children: [new TextRun({ text: $1, bold: true, size: $3 })] })');

fs.writeFileSync('src/utils/docxExporter.ts', docxCode, 'utf8');

console.log('patched docx errors');
