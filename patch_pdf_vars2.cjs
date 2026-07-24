const fs = require('fs');
let code = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');

const replacement = `export function addScreenshotPageToPdf(
  pdfDoc: jsPDF,
  canvas: HTMLCanvasElement,
  record: SapaWaliRecord,
  isFirstPage: boolean = false
): void {
  const pdfWidth = 210; // Standard A4 width in mm
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
  }

  // 1. Render Top Header Title (CAPSLOCK, Arial/Helvetica Size 12 Bold, Centered)
  pdfDoc.setFont('helvetica', 'bold');
  pdfDoc.setFontSize(12);
  pdfDoc.setTextColor(0, 0, 0);
  const maxTextWidth = 180; // mm max width for centered text wrapping
  const titleLines = pdfDoc.splitTextToSize(titleText, maxTextWidth);
  const lineHeight = 5; // mm per line for size 12 font
  pdfDoc.text(titleLines, pdfWidth / 2, topMargin, { align: 'center' });

  // 2. Calculate Screenshot Image Position & Dimensions
  const titleBlockHeight2 = titleLines.length * lineHeight;
  const imageStartY = topMargin + titleBlockHeight2 + 5; // 5mm gap below title
  
  // We no longer scale down, we already made the page tall enough!

  // Center horizontally on A4
  const imgX = (pdfWidth - imgWidth) / 2;
  const imgY = imageStartY;

  // 3. Add High Quality JPEG Image to PDF
  const imgData = canvas.toDataURL('image/jpeg', 0.90);
  pdfDoc.addImage(imgData, 'JPEG', imgX, imgY, imgWidth, imgHeight, undefined, 'FAST');
}`;

// find the function and replace it
const startIndex = code.indexOf('export function addScreenshotPageToPdf(');
code = code.substring(0, startIndex) + replacement;

fs.writeFileSync('src/utils/pdfGenerator.ts', code, 'utf8');
