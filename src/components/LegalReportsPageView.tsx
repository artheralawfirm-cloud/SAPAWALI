import { captureFullElement } from '../utils/screenshotUtils';
import { generateDocxForRecord } from '../utils/docxExporter';
import { saveAs } from 'file-saver';
import React, { useState, useRef, useEffect } from 'react';
import { getFullSapaWaliDataset } from '../data/sapaWaliData';
import { SapaWaliRecord } from '../types';
import {
  Document1ScreenshotView,
  Document2BeritaAcaraView,
  Document3SOPChecklistView,
  Document4KartuKendaliView,
  DocumentSetContainer,
  OfficialReportCoverView,
  OfficialReportTableOfContentsView
} from './OfficialDocumentTemplates';
import { generateLegalDocumentsPdf, downloadBlob } from '../utils/legalDocumentPdfExporter';
import { DigitalSignatureModal } from './DigitalSignatureModal';
import {
  FileText,
  Download,
  Layers,
  CheckCircle2,
  Loader2,
  Sparkles,
  UserCheck,
  Calendar,
  ShieldCheck,
  Printer,
  Zap,
  XCircle,
  BookOpen,
  Bookmark,
  PenTool,
  Pause,
  Play,
  Wifi,
  WifiOff,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

export const LegalReportsPageView: React.FC = () => {
  const dataset = getFullSapaWaliDataset();

  const [selectedRecordIndex, setSelectedRecordIndex] = useState<number>(0);
  const [activeDocTab, setActiveDocTab] = useState<'all' | 'cover' | 'toc' | 'doc1' | 'doc2' | 'doc3' | 'doc4'>('all');

  // Digital Signature State
  const [customWaliSignature, setCustomWaliSignature] = useState<string | null>(null);
  const [customBhpSignature, setCustomBhpSignature] = useState<string | null>(null);
  const [customStamp, setCustomStamp] = useState<string | null>(null);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState<boolean>(false);

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [pauseReason, setPauseReason] = useState<'USER' | 'KENDALA_JARINGAN' | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [printMode, setPrintMode] = useState<'single' | 'batch'>('batch');

  const [exportProgress, setExportProgress] = useState<{ current: number; total: number; statusText: string }>({
    current: 0,
    total: 0,
    statusText: ''
  });

  const hiddenExportContainerRef = useRef<HTMLDivElement>(null);
  const isCancelledRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);

  const currentRecord: SapaWaliRecord = dataset[selectedRecordIndex] || dataset[0];

  // Network connection monitor
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      if (isExporting) {
        isPausedRef.current = true;
        setIsPaused(true);
        setPauseReason('KENDALA_JARINGAN');
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isExporting]);

  // Browser reload/navigation protection during active PDF export
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isExporting && !isCancelledRef.current) {
        e.preventDefault();
        e.returnValue = 'Proses pembuatan PDF sedang berjalan di latar belakang. Jika Anda keluar atau memuat ulang halaman, ekspor dapat dilanjutkan.';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isExporting]);

  // Auto-resume PDF export session if page was refreshed during process
  useEffect(() => {
    const savedSessionStr = localStorage.getItem('SAPA_WALI_ACTIVE_PDF_EXPORT');
    if (savedSessionStr) {
      try {
        const session = JSON.parse(savedSessionStr);
        // If saved within the last 15 minutes and was exporting
        if (session && session.isExporting && (Date.now() - session.timestamp < 15 * 60 * 1000)) {
          console.log('Mendeteksi sesi ekspor PDF yang belum selesai dari sebelumnya. Melanjutkan otomatis...');
          setTimeout(() => {
            if (session.type === 'batch') {
              handleExportBatchAllPdf();
            } else {
              handleExportSingleRecordPdf();
            }
          }, 600);
        } else {
          localStorage.removeItem('SAPA_WALI_ACTIVE_PDF_EXPORT');
        }
      } catch (err) {
        localStorage.removeItem('SAPA_WALI_ACTIVE_PDF_EXPORT');
      }
    }
  }, []);

  // Trigger print window reliably with fallback iframe
  const triggerPrintWindow = (title: string) => {
    const origTitle = document.title;
    document.title = title;

    try {
      window.focus();
      window.print();
    } catch (e) {
      console.warn('Direct window.print() failed, trying iframe print...', e);
      const printContainer = hiddenExportContainerRef.current;
      if (printContainer) {
        let frame = document.getElementById('sapa_wali_print_frame') as HTMLIFrameElement;
        if (!frame) {
          frame = document.createElement('iframe');
          frame.id = 'sapa_wali_print_frame';
          frame.style.position = 'fixed';
          frame.style.right = '0';
          frame.style.bottom = '0';
          frame.style.width = '0px';
          frame.style.height = '0px';
          frame.style.border = '0';
          document.body.appendChild(frame);
        }

        const doc = frame.contentWindow?.document || frame.contentDocument;
        if (doc) {
          const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
            .map(el => el.outerHTML)
            .join('\\n');
            
          doc.open();
          doc.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>${title}</title>
                ${styles}
                <style>
                  @page { size: A4 portrait; margin: 0; }
                  body { margin: 0; padding: 0; background: white; color: black; font-family: sans-serif; }
                  .page-break-after { page-break-after: always !important; break-after: page !important; }
                  .a4-document-page { width: 210mm !important; min-height: 297mm !important; max-height: 297mm !important; box-sizing: border-box; padding: 15mm 18mm; page-break-after: always !important; break-after: page !important; page-break-inside: avoid !important; overflow: hidden !important; }
                </style>
              </head>
              <body>
                <div style="width: 210mm; margin: 0 auto;">
                  ${printContainer.innerHTML}
                </div>
                <script>
                  window.onload = function() {
                    setTimeout(function() {
                      window.focus();
                      window.print();
                    }, 50);
                  };
                </script>
              </body>
            </html>
          `);
          doc.close();
        }
      }
    } finally {
      setTimeout(() => {
        document.title = origTitle;
      }, 1500);
    }
  };

  // 1. Instant Print / Save PDF via Browser Print Stream (All 109 Records - 547 Pages)
  const handlePrintInstantAllPdf = () => {
    setPrintMode('batch');
    setTimeout(() => {
      triggerPrintWindow('LAPORAN_LEMBAR_MONITORING_SAPA_WALI_109DATA_547HALAMAN');
    }, 150);
  };

  // 1b. Instant Print Active Record (4 Documents)

  const handleDownloadDocx = async () => {
    if (isExporting || !hiddenExportContainerRef.current) return;
    setIsExporting(true);
    setExportProgress({ current: 0, total: 1, statusText: "Menyusun Dokumen MS Word..." });
    try {
      // Find the screenshot canvas inside the hidden container
      const container = hiddenExportContainerRef.current;
      const phoneEl = container.querySelector(`.single-export-node-${selectedRecordIndex} .origin-top`);
      
      let canvasDataUrl = "";
      if (phoneEl) {
          setExportProgress({ current: 0, total: 1, statusText: "Mengambil gambar chat..." });
          const canvas = await captureFullElement(phoneEl as HTMLElement, true);
          canvasDataUrl = canvas.toDataURL('image/jpeg', 0.90);
      }
      
      setExportProgress({ current: 0, total: 1, statusText: "Menyimpan ke MS Word (.docx)..." });
      const blob = await generateDocxForRecord(currentRecord, selectedRecordIndex, canvasDataUrl, null);
      const safeName = currentRecord.namaWali.replace(/[^a-zA-Z0-9_-]/g, '_');
      saveAs(blob, `BERITA_ACARA_${safeName}.docx`);
    } catch (err) {
      console.error(err);
      alert("Gagal membuat file DOCX.");
    } finally {
      setIsExporting(false);
      setExportProgress(null);
    }
  };

  const handlePrintInstantSinglePdf = () => {
    setPrintMode('single');
    setTimeout(() => {
      const safeName = currentRecord.namaWali.replace(/[^a-zA-Z0-9_-]/g, '_');
      triggerPrintWindow(`BERKAS_SAPA_WALI_4in1_${selectedRecordIndex + 1}_${safeName}`);
    }, 150);
  };

  // Pause PDF generation
  const handlePauseExport = (reason: 'USER' | 'KENDALA_JARINGAN' = 'USER') => {
    isPausedRef.current = true;
    setIsPaused(true);
    setPauseReason(reason);
  };

  // Resume PDF generation
  const handleResumeExport = () => {
    isPausedRef.current = false;
    setIsPaused(false);
    setPauseReason(null);
  };

  // Cancel PDF generation explicitly
  const handleCancelExport = () => {
    isCancelledRef.current = true;
    isPausedRef.current = false;
    setIsPaused(false);
    setPauseReason(null);
    setIsExporting(false);
    localStorage.removeItem('SAPA_WALI_ACTIVE_PDF_EXPORT');
  };

  // 2. Single Record Export (4 Documents in 1 PDF)
  const handleExportSingleRecordPdf = async () => {
    if (isExporting || !hiddenExportContainerRef.current) return;
    setIsExporting(true);
    setIsPaused(false);
    setPauseReason(null);
    isCancelledRef.current = false;
    isPausedRef.current = false;

    // Save initial session state
    localStorage.setItem('SAPA_WALI_ACTIVE_PDF_EXPORT', JSON.stringify({
      isExporting: true,
      type: 'single',
      selectedRecordIndex,
      current: 1,
      total: 4,
      timestamp: Date.now()
    }));

    try {
      const container = hiddenExportContainerRef.current;
      const docElements = Array.from(container.querySelectorAll<HTMLElement>(`.single-export-node-${selectedRecordIndex}`)) as HTMLElement[];

      if (docElements.length === 0) {
        throw new Error('Elemen dokumen tidak ditemukan.');
      }

      const safeName = currentRecord.namaWali.replace(/[^a-zA-Z0-9_-]/g, '_');
      const fileName = `BERKAS_SAPA_WALI_4in1_${selectedRecordIndex + 1}_${safeName}.pdf`;

      const result = await generateLegalDocumentsPdf(
        docElements,
        fileName,
        {
          startIndex: 0,
          onProgress: (current, total, statusText) => {
            const status = `Memproses ${currentRecord.namaWali} (${current}/${total}) - ${statusText}`;
            setExportProgress({ current, total, statusText: status });

            localStorage.setItem('SAPA_WALI_ACTIVE_PDF_EXPORT', JSON.stringify({
              isExporting: true,
              type: 'single',
              selectedRecordIndex,
              current,
              total,
              statusText: status,
              timestamp: Date.now()
            }));
          },
          isCancelled: () => isCancelledRef.current,
          isPaused: () => isPausedRef.current,
          onPauseStateChange: (paused, reason) => {
            isPausedRef.current = paused;
            setIsPaused(paused);
            if (paused && reason === 'KENDALA_JARINGAN') {
              setPauseReason('KENDALA_JARINGAN');
            }
          }
        }
      );

      downloadBlob(result.blob, fileName);
    } catch (err) {
      if ((err as Error)?.message === 'CANCELLED_BY_USER') {
        console.log('Ekspor PDF dibatalkan oleh pengguna.');
      } else {
        console.error('Error generating single record PDF:', err);
        alert('Gagal membuat PDF. Silakan coba lagi.');
      }
    } finally {
      setIsExporting(false);
      setIsPaused(false);
      setPauseReason(null);
      localStorage.removeItem('SAPA_WALI_ACTIVE_PDF_EXPORT');
    }
  };

  // 3. Canvas Batch Export (All 109 Records x 4 Documents = 545 Pages + Cover & TOC = 547 Pages)
  const handleExportBatchAllPdf = async () => {
    if (isExporting || !hiddenExportContainerRef.current) return;
    setIsExporting(true);
    setIsPaused(false);
    setPauseReason(null);
    isCancelledRef.current = false;
    isPausedRef.current = false;

    // Save initial batch session state
    localStorage.setItem('SAPA_WALI_ACTIVE_PDF_EXPORT', JSON.stringify({
      isExporting: true,
      type: 'batch',
      current: 1,
      total: 547,
      timestamp: Date.now()
    }));

    try {
      const container = hiddenExportContainerRef.current;
      const allDocElements = Array.from(container.querySelectorAll<HTMLElement>('.batch-export-node')) as HTMLElement[];

      if (allDocElements.length === 0) {
        throw new Error('Elemen batch dokumen tidak ditemukan.');
      }

      const fileName = `LAPORAN_LEMBAR_MONITORING_SAPA_WALI_109DATA_547HALAMAN.pdf`;

      const result = await generateLegalDocumentsPdf(
        allDocElements,
        fileName,
        {
          startIndex: 0,
          onProgress: (current, total, statusText) => {
            const recordNum = Math.ceil((current - 2) / 4);
            const recordData = dataset[recordNum - 1];
            const recordName = recordData ? recordData.namaWali : 'Cover/TOC';
            const status = `Batch Data #${recordNum > 0 ? recordNum : 'Utama'} (${recordName}) - ${statusText}`;
            
            setExportProgress({
              current,
              total,
              statusText: status
            });

            localStorage.setItem('SAPA_WALI_ACTIVE_PDF_EXPORT', JSON.stringify({
              isExporting: true,
              type: 'batch',
              current,
              total,
              statusText: status,
              timestamp: Date.now()
            }));
          },
          isCancelled: () => isCancelledRef.current,
          isPaused: () => isPausedRef.current,
          onPauseStateChange: (paused, reason) => {
            isPausedRef.current = paused;
            setIsPaused(paused);
            if (paused && reason === 'KENDALA_JARINGAN') {
              setPauseReason('KENDALA_JARINGAN');
            }
          }
        }
      );

      downloadBlob(result.blob, fileName);
    } catch (err) {
      if ((err as Error)?.message === 'CANCELLED_BY_USER') {
        console.log('Ekspor PDF Batch dibatalkan oleh pengguna.');
      } else {
        console.error('Error generating batch PDF:', err);
        alert('Gagal membuat Batch PDF: ' + (err as Error).message);
      }
    } finally {
      setIsExporting(false);
      setIsPaused(false);
      setPauseReason(null);
      localStorage.removeItem('SAPA_WALI_ACTIVE_PDF_EXPORT');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none pb-12">
      {/* Top Banner Header */}
      <div className="bg-slate-800/90 border-b border-slate-700/80 px-6 py-5 shadow-lg backdrop-blur-md no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-white tracking-wide">
                  Laporan &amp; Berkas Otomatis Legal (109 Data Monitoring x 4 Berkas)
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Total 547 Halaman A4
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-0.5">
                Dengan Cover Utama &amp; Daftar Isi Otomatis Tesis • Font Arial Standards • Signature Wali/Pengampu &amp; BHP Medan
              </p>
            </div>
          </div>

          {/* Action Export Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Digital Signature System Button */}
            <button
              onClick={() => setIsSignatureModalOpen(true)}
              className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs transition-all shadow-md cursor-pointer"
              title="Atur Tanda Tangan Digital Wali/Pengampu dan BHP (Kanvas Coretan / Unggah / Database)"
            >
              <PenTool className="w-4 h-4 text-amber-400" />
              <span>Tanda Tangan Digital</span>
              {(customWaliSignature || customBhpSignature) && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>

            {/* Primary Instant Print/Save PDF Button (All 109 Records - 547 Pages) */}
            <button
              onClick={handlePrintInstantAllPdf}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
              title="Cetak atau simpan 109 data sekaligus dalam bentuk PDF instan (547 Halaman) tanpa membebankan memori browser"
            >
              <Zap className="w-4 h-4 fill-current text-yellow-300" />
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF Instan (547 Hal)</span>
            </button>

            {/* Instant Print Active Record Button (4 Pages) */}
            <button
              onClick={handlePrintInstantSinglePdf}
              className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs transition-all shadow-md cursor-pointer border border-teal-500/30"
              title="Cetak / Simpan PDF instan khusus untuk data aktif ini (4 halaman)"
            >
              <Printer className="w-4 h-4 text-teal-200" />
              <span>Cetak PDF Instan (Data Ini - 4 Hal)</span>
            </button>

            
            {/* Word DOCX Download */}
            <button
              onClick={handleDownloadDocx}
              disabled={isExporting}
              className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md cursor-pointer border border-blue-500/30 disabled:opacity-50"
              title="Unduh sebagai file MS Word (.docx) agar mudah diedit"
            >
              <FileText className="w-4 h-4 text-blue-200" />
              <span>Unduh DOCX (Word)</span>
            </button>

            {/* Single Record Export Canvas Button */}
            <button
              onClick={handleExportSingleRecordPdf}
              disabled={isExporting}
              className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium text-xs transition-all shadow-md disabled:opacity-50 cursor-pointer"
              title="Unduh 4 berkas data ini sebagai PDF via Canvas High Res"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>Ekspor Canvas (Data Ini)</span>
            </button>

            {/* Canvas Batch PDF Download Button */}
            <button
              onClick={handleExportBatchAllPdf}
              disabled={isExporting}
              className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all shadow-md disabled:opacity-50 cursor-pointer"
              title="Unduh seluruh 109 data sebagai PDF Canvas Batch"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Layers className="w-4 h-4" />}
              <span>Unduh Canvas Batch</span>
            </button>
          </div>
        </div>
      </div>

      {/* Export Progress Overlay Modal */}
      {isExporting && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 no-print font-sans">
          <div className="bg-slate-900 border border-slate-700/90 rounded-2xl p-6 max-w-lg w-full shadow-2xl text-center space-y-5 relative overflow-hidden">
            
            {/* Top Status Badge */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>EKSPOR BERKAS SAPA WALI</span>
              </span>

              <div className="flex items-center space-x-1.5">
                {isOnline ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-emerald-400" />
                    <span>Jaringan Stabil</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1 animate-pulse">
                    <WifiOff className="w-3 h-3 text-rose-400" />
                    <span>Jaringan Terputus</span>
                  </span>
                )}
              </div>
            </div>

            {/* Main Icon Indicator */}
            <div className="relative flex justify-center items-center">
              {isPaused ? (
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 shadow-lg">
                  {pauseReason === 'KENDALA_JARINGAN' ? (
                    <AlertTriangle className="w-8 h-8 text-amber-400 animate-bounce" />
                  ) : (
                    <Pause className="w-8 h-8 text-amber-400" />
                  )}
                </div>
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 animate-pulse shadow-lg">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                {isPaused ? (
                  pauseReason === 'KENDALA_JARINGAN' ? (
                    <span className="text-amber-300">Download Terjeda (Kendala Jaringan)</span>
                  ) : (
                    <span className="text-amber-300">Download Terjeda Oleh Pengguna</span>
                  )
                ) : (
                  <span>Sedang Mengompres PDF Legal...</span>
                )}
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-medium">{exportProgress.statusText}</p>
            </div>

            {/* Network / Pause Notice Banner */}
            {isPaused && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-left space-y-1">
                <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {pauseReason === 'KENDALA_JARINGAN'
                      ? 'Koneksi jaringan terputus atau tidak stabil'
                      : 'Proses dihentikan sementara'}
                  </span>
                </div>
                <p className="text-[11px] text-amber-200/80 leading-relaxed pl-6">
                  {pauseReason === 'KENDALA_JARINGAN'
                    ? 'Proses ekspor otomatis dijeda agar tidak merusak dokumen. Klik "Lanjutkan Download" saat jaringan Anda sudah kembali stabil.'
                    : 'Proses dapat dilanjutkan kapan saja tanpa mengulang dari awal.'}
                </p>
              </div>
            )}

            {/* Progress Bar */}
            {exportProgress.total > 0 && (
              <div className="space-y-1.5">
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700/80 p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isPaused ? 'bg-amber-400' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${(exportProgress.current / exportProgress.total) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>Halaman {exportProgress.current} dari {exportProgress.total}</span>
                  <span>{Math.round((exportProgress.current / exportProgress.total) * 100)}% Selesai</span>
                </div>
              </div>
            )}

            {/* Controls: Pause, Resume, Cancel */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              {isPaused ? (
                <button
                  onClick={handleResumeExport}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer border border-emerald-400/40"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Lanjutkan Download</span>
                </button>
              ) : (
                <button
                  onClick={() => handlePauseExport('USER')}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-amber-600/90 hover:bg-amber-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer border border-amber-500/40"
                >
                  <Pause className="w-4 h-4" />
                  <span>Jeda Download</span>
                </button>
              )}

              <button
                onClick={handleCancelExport}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 font-bold text-xs transition-all flex items-center justify-center space-x-2 border border-slate-700 hover:border-rose-500/40 cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Batal Ekspor</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
        {/* Left Sidebar: Data Selector & Info */}
        <div className="lg:col-span-4 space-y-4">
          {/* Record Selector Card */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Pilih Data Perwalian ({dataset.length})</span>
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                #{selectedRecordIndex + 1}
              </span>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1 custom-scrollbar">
              {(dataset || []).map((item, idx) => {
                const isSelected = idx === selectedRecordIndex;
                const isPengampuan = item.jenisWewenang && item.jenisWewenang.toLowerCase().includes('pengampuan');

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedRecordIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl transition-all border ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/50 text-white shadow-md'
                        : 'bg-slate-900/50 border-slate-700/60 text-slate-300 hover:bg-slate-700/40 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-sm line-clamp-1">{item.namaWali}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isPengampuan
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {isPengampuan ? 'Pengampuan' : 'Perwalian'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 mt-1 space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-slate-500 font-medium">Subjek:</span>
                        <span className="text-slate-200 font-medium truncate">{item.namaAnak}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{item.tanggalForm}</span>
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Selection Details Summary */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Detail Ringkasan Berkas</span>
            </h3>

            <div className="text-xs space-y-2 text-slate-300">
              <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-700/50 space-y-1">
                <div className="text-slate-400">Nama Wali / Pengampu:</div>
                <div className="font-bold text-white text-sm">{currentRecord.namaWali}</div>
              </div>

              <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-700/50 space-y-1">
                <div className="text-slate-400">Anak / Orang Terampu:</div>
                <div className="font-semibold text-emerald-300">{currentRecord.namaAnak}</div>
              </div>

              <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-700/50 space-y-1">
                <div className="text-slate-400">Alamat &amp; Keterangan:</div>
                <div className="text-slate-300 leading-snug">{currentRecord.alamat}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Area: Document Tabs & Live Document Canvas Preview */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          {/* Document Type Selector Bar */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-2.5 shadow-lg flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Tampilkan 4 Dokumen', icon: Layers },
              { id: 'cover', label: 'Halaman Cover Utama', icon: BookOpen },
              { id: 'toc', label: 'Daftar Isi (Hal. 2)', icon: Bookmark },
              { id: 'doc1', label: '1. Screenshot E-Form', icon: FileText },
              { id: 'doc2', label: '2. Berita Acara (BA)', icon: FileText },
              { id: 'doc3', label: '3. Checklist SOP', icon: CheckCircle2 },
              { id: 'doc4', label: '4. Kartu Kendali', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeDocTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDocTab(tab.id as any)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Document Preview Container */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-8 flex justify-center items-start overflow-x-auto shadow-inner min-h-[800px]">
            <div className="transform scale-[0.88] md:scale-100 origin-top transition-transform">
              {activeDocTab === 'all' && (
                <DocumentSetContainer
                  record={currentRecord}
                  recordIndex={selectedRecordIndex}
                  customWaliSignature={customWaliSignature}
                  customBhpSignature={customBhpSignature}
                />
              )}
              {activeDocTab === 'cover' && (
                <OfficialReportCoverView />
              )}
              {activeDocTab === 'toc' && (
                <OfficialReportTableOfContentsView />
              )}
              {activeDocTab === 'doc1' && (
                <Document1ScreenshotView record={currentRecord} recordIndex={selectedRecordIndex} />
              )}
              {activeDocTab === 'doc2' && (
                <Document2BeritaAcaraView
                  record={currentRecord}
                  recordIndex={selectedRecordIndex}
                  customWaliSignature={customWaliSignature}
                  customBhpSignature={customBhpSignature}
                />
              )}
              {activeDocTab === 'doc3' && (
                <Document3SOPChecklistView
                  record={currentRecord}
                  recordIndex={selectedRecordIndex}
                  customBhpSignature={customBhpSignature}
                />
              )}
              {activeDocTab === 'doc4' && (
                <Document4KartuKendaliView
                  record={currentRecord}
                  recordIndex={selectedRecordIndex}
                  customBhpSignature={customBhpSignature}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Digital Signature Management Modal */}
      <DigitalSignatureModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        namaWali={currentRecord.namaWali}
        isPengampuan={currentRecord.jenisWewenang === 'Pengampuan'}
        customWaliSignature={customWaliSignature}
        customBhpSignature={customBhpSignature}
        customStamp={customStamp}
        onSaveSignatures={(waliSig, bhpSig, stampSig) => {
          setCustomWaliSignature(waliSig);
          setCustomBhpSignature(bhpSig);
          if (stampSig !== undefined) setCustomStamp(stampSig);
        }}
      />

      {/* Printable Container (positioned off-screen for html2canvas rendering, and visible during window.print) */}
      <div
        className="print-only-container absolute -left-[9999px] top-0 w-[210mm] pointer-events-none z-[-1000] print:block print:absolute print:left-0 print:top-0 print:w-[210mm] print:pointer-events-auto print:z-50 print:bg-white print:text-black"
        ref={hiddenExportContainerRef}
      >
        {/* Cover Page (Hide in single record print mode) */}
        {printMode !== 'single' && (
          <div className="batch-export-node page-break-after">
            <OfficialReportCoverView />
          </div>
        )}

        {/* Table of Contents Page (Hide in single record print mode) */}
        {printMode !== 'single' && (
          <div className="batch-export-node page-break-after">
            <OfficialReportTableOfContentsView />
          </div>
        )}

        {/* 109 Records x 4 Documents */}
        {(dataset || []).map((rec, rIdx) => {
          if (printMode === 'single' && rIdx !== selectedRecordIndex) {
            return null;
          }
          return (
            <div key={rIdx} className="space-y-0">
              <div className={`batch-export-node single-export-node-${rIdx} page-break-after`}>
                <Document1ScreenshotView record={rec} recordIndex={rIdx} />
              </div>
              <div className={`batch-export-node single-export-node-${rIdx} page-break-after`}>
                <Document2BeritaAcaraView
                  record={rec}
                  recordIndex={rIdx}
                  customWaliSignature={customWaliSignature}
                  customBhpSignature={customBhpSignature}
                  customStamp={customStamp}
                />
              </div>
              <div className={`batch-export-node single-export-node-${rIdx} page-break-after`}>
                <Document3SOPChecklistView
                  record={rec}
                  recordIndex={rIdx}
                  customBhpSignature={customBhpSignature}
                  customStamp={customStamp}
                />
              </div>
              <div className={`batch-export-node single-export-node-${rIdx} page-break-after`}>
                <Document4KartuKendaliView
                  record={rec}
                  recordIndex={rIdx}
                  customBhpSignature={customBhpSignature}
                  customStamp={customStamp}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

