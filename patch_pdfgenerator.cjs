const fs = require('fs');

let code = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');

const search = `  const pdfWidth = 210; // Standard A4 width in mm
  const pdfHeight = 297; // Standard A4 height in mm

  if (!isFirstPage) {
    pdfDoc.addPage('a4', 'portrait');
  }`;
  
const replace = `  const pdfWidth = 210; // Standard A4 width in mm
  let imgWidth = 140; // slightly wider
  let imgHeight = (canvas.height / canvas.width) * imgWidth;
  
  const titleText = getPdfPageHeaderTitle(record);
  // Estimate title lines (rough estimate based on 180mm width)
  const estimatedTitleLines = 3;
  const titleBlockHeight = estimatedTitleLines * 5;
  const topMargin = 16;
  const bottomMargin = 16;
  
  const totalRequiredHeight = topMargin + titleBlockHeight + 5 + imgHeight + bottomMargin;
  const pdfHeight = Math.max(297, totalRequiredHeight); // dynamic height!

  if (!isFirstPage) {
    pdfDoc.addPage([pdfWidth, pdfHeight], 'portrait');
  } else {
     if (pdfDoc.internal.getNumberOfPages() === 1) {
         pdfDoc.deletePage(1);
         pdfDoc.addPage([pdfWidth, pdfHeight], 'portrait');
     }
  }`;

const search2 = `  const titleBlockHeight = titleLines.length * lineHeight;
  const imageStartY = topMargin + titleBlockHeight + 5; // 5mm gap below title
  const bottomMargin = 16; // mm
  const maxAvailableHeight = pdfHeight - imageStartY - bottomMargin;

  // Target image width on A4 page: 130mm centered gives neat ~40mm side margins
  let imgWidth = 130;
  let imgHeight = (canvas.height / canvas.width) * imgWidth;

  // Scale down if height exceeds available printable area
  if (imgHeight > maxAvailableHeight) {
    imgHeight = maxAvailableHeight;
    imgWidth = (canvas.width / canvas.height) * imgHeight;
  }`;
  
const replace2 = `  const titleBlockHeight2 = titleLines.length * lineHeight;
  const imageStartY = topMargin + titleBlockHeight2 + 5; // 5mm gap below title
  
  // We no longer scale down, we already made the page tall enough!`;

code = code.replace(search, replace).replace(search2, replace2);

fs.writeFileSync('src/utils/pdfGenerator.ts', code, 'utf8');
console.log('patched pdfGenerator.ts for dynamic heights');
