const fs = require('fs');

// Fix PhonePreview.tsx
let ui = fs.readFileSync('src/components/PhonePreview.tsx', 'utf8');

// 1. Header Contact Info - Revert to truncate
ui = ui.replace(
  '<h2 className="text-[14.5px] font-semibold tracking-tight leading-tight text-white whitespace-pre-wrap break-words">',
  '<h2 className="text-[14.5px] font-semibold tracking-tight truncate leading-tight text-white">'
);
ui = ui.replace(
  '<span className={`${statusText} whitespace-pre-wrap break-words`}>{config.onlineStatus || \'online\'}</span>',
  '<span className={`${statusText} truncate block w-full`}>{config.onlineStatus || \'online\'}</span>'
);
// Make sure the Contact Info div has min-w-0 and flex-1
ui = ui.replace(
  '<div className="flex flex-col min-w-0 pl-1">',
  '<div className="flex flex-col min-w-0 pl-1 flex-1">'
);

// 2. Encryption Notice
ui = ui.replace(
  'w-[92%] max-w-[380px]',
  'max-w-[340px] mx-auto w-fit'
);
ui = ui.replace(
  '<span className="font-bold underline cursor-pointer whitespace-nowrap">Learn more</span>',
  '<span className="font-bold cursor-pointer hover:underline text-[#53bdeb]">Learn more</span>'
);

// 3. Link Card styling
// Let's make the text truncate nicely and layout properly
// "whitespace-pre-wrap" to "line-clamp-2 whitespace-normal"
ui = ui.replace(
  'className="text-[10px] font-bold text-white dark:text-white leading-snug break-words whitespace-pre-wrap"',
  'className="text-[10px] font-bold text-[#111b21] dark:text-white leading-snug line-clamp-2 whitespace-normal"'
);
ui = ui.replace(
  'className="text-[9px] text-emerald-200 dark:text-emerald-100/80 mt-0.5 break-words whitespace-pre-wrap leading-tight"',
  'className="text-[9px] text-[#667781] dark:text-emerald-100/80 mt-0.5 line-clamp-1 whitespace-normal leading-tight"'
);
ui = ui.replace(
  'className="text-[9px] text-emerald-300 dark:text-emerald-300 font-medium flex items-center gap-1 mt-0.5 break-words whitespace-pre-wrap leading-tight"',
  'className="text-[9px] text-[#8696a0] dark:text-emerald-300 font-medium flex items-center gap-1 mt-0.5 line-clamp-1 whitespace-normal leading-tight uppercase tracking-wider"'
);

// Fix the Link Card Container Background to look more like standard WhatsApp
ui = ui.replace(
  'className={`mb-1 rounded-lg p-1.5 ${isDark ? \'bg-[#025144]\' : \'bg-[#005c4b]/10\'} border border-black/10 flex gap-2 items-start overflow-visible max-w-full`}',
  'className={`mb-1 rounded-lg p-1.5 ${isDark ? \'bg-[#025144]\' : \'bg-[#f0f2f5]\'} flex gap-2 items-center overflow-hidden max-w-full`}'
);

// Also need to fix docx errors so build doesn't fail
fs.writeFileSync('src/components/PhonePreview.tsx', ui, 'utf8');

// Fix docxExporter.ts
let docx = fs.readFileSync('src/utils/docxExporter.ts', 'utf8');
docx = docx.replace(/new Paragraph\(\{\s*text:\s*([^,]+),\s*alignment:\s*([^,]+),\s*size:\s*(\d+)\s*\}\)/g, 
  'new Paragraph({ alignment: $2, children: [new TextRun({ text: $1, size: $3 })] })');
fs.writeFileSync('src/utils/docxExporter.ts', docx, 'utf8');

// Fix the pdfGenerator errors again
let pdfGen = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');
pdfGen = pdfGen.replace('pdfDoc.getNumberOfPages()', '(pdfDoc as any).getPageCount()');
pdfGen = pdfGen.replace('pdfDoc.getPages()', '(pdfDoc as any).getPages()');
fs.writeFileSync('src/utils/pdfGenerator.ts', pdfGen, 'utf8');
let legalPdf = fs.readFileSync('src/utils/legalDocumentPdfExporter.ts', 'utf8');
legalPdf = legalPdf.replace('pdfDoc.getNumberOfPages()', '(pdfDoc as any).getPageCount()');
legalPdf = legalPdf.replace('pdfDoc.getPages()', '(pdfDoc as any).getPages()');
fs.writeFileSync('src/utils/legalDocumentPdfExporter.ts', legalPdf, 'utf8');


console.log('patched UI');
