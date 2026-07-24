import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SapaWaliRecord } from '../types';
import { sanitizeOklchInDoc, sanitizeDocumentStyles } from './html2canvasFix';

export interface PdfExportOptions {
  startIndex?: number;
  existingPdfDoc?: jsPDF | null;
  onProgress?: (current: number, total: number, statusText: string) => void;
  isCancelled?: () => boolean;
  isPaused?: () => boolean;
  onPauseStateChange?: (paused: boolean, reason?: string) => void;
}

export interface PdfExportResult {
  pdfDoc: jsPDF;
  blob: Blob;
  completedPages: number;
}

/**
 * Renders an array of DOM element nodes sequentially to a single A4 jsPDF document with Pause & Resume support.
 */
export async function generateLegalDocumentsPdf(
  elements: HTMLElement[],
  fileName: string,
  options: PdfExportOptions = {}
): Promise<PdfExportResult> {
  const {
    startIndex = 0,
    existingPdfDoc = null,
    onProgress,
    isCancelled,
    isPaused,
    onPauseStateChange
  } = options;

  const pdfDoc = existingPdfDoc || new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Clean stylesheets once before capturing
  sanitizeDocumentStyles(document);

  const total = elements.length;

  for (let i = startIndex; i < total; i++) {
    // 1. Check if user cancelled
    if (isCancelled && isCancelled()) {
      throw new Error('CANCELLED_BY_USER');
    }

    // 2. Network issue auto-detection
    if (typeof navigator !== 'undefined' && 'onLine' in navigator && !navigator.onLine) {
      if (onPauseStateChange) {
        onPauseStateChange(true, 'KENDALA_JARINGAN');
      }
    }

    // 3. Pause loop: wait until unpaused or cancelled
    while (isPaused && isPaused()) {
      if (isCancelled && isCancelled()) {
        throw new Error('CANCELLED_BY_USER');
      }
      if (onProgress) {
        onProgress(
          i + 1,
          total,
          `Download Terjeda pada Halaman ${i + 1} dari ${total}. Menunggu koneksi / klik 'Lanjutkan'...`
        );
      }
      await new Promise((r) => setTimeout(r, 400));
    }

    const el = elements[i];
    if (onProgress) {
      onProgress(i + 1, total, `Mengompres & Menyiapkan Halaman ${i + 1} dari ${total}...`);
    }

    // Capture DOM element using html2canvas
    const canvas = await html2canvas(el, {
      scale: 1.5, // High speed crisp A4 rendering
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowHeight: el.scrollHeight,
      height: el.scrollHeight,
      onclone: (clonedDoc) => sanitizeOklchInDoc(clonedDoc)
    });

    // Re-check cancellation / pause after canvas rendering
    if (isCancelled && isCancelled()) {
      throw new Error('CANCELLED_BY_USER');
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.82);

    const pdfWidth = 210;
    let finalHeight = (canvas.height * pdfWidth) / canvas.width;
    const pageHeight = Math.max(297, finalHeight);

    if (i > 0) {
      pdfDoc.addPage([210, pageHeight], 'portrait');
    } else {
      if ((pdfDoc.internal as any).getNumberOfPages() === 1) {
          pdfDoc.deletePage(1);
          pdfDoc.addPage([210, pageHeight], 'portrait');
      }
    }

    pdfDoc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, finalHeight, undefined, 'FAST');

    // Express async yield every 4 pages to prevent freezing without adding unnecessary delay
    if (i % 4 === 0) {
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  const blob = pdfDoc.output('blob');
  return {
    pdfDoc,
    blob,
    completedPages: total
  };
}

/**
 * Triggers browser download for a Blob
 */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

