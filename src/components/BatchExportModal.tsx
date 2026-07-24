import React, { useState, useRef } from 'react';
import { X, FolderArchive, FileText, CheckCircle2, AlertCircle, Play, StopCircle, RefreshCw } from 'lucide-react';
import { SapaWaliRecord, ChatConfig } from '../types';
import { createOfficialSapaWaliMessages, getRecordBattery, getRecordTopBarTime } from '../data/sapaWaliData';
import html2canvas from 'html2canvas';
import { captureFullElement } from '../utils/screenshotUtils';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { sanitizeOklchInDoc, sanitizeDocumentStyles } from '../utils/html2canvasFix';
import { addScreenshotPageToPdf } from '../utils/pdfGenerator';

interface BatchExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: SapaWaliRecord[];
  phoneRef: React.RefObject<HTMLDivElement | null>;
  currentConfig: ChatConfig;
  onChangeConfig: (cfg: ChatConfig) => void;
}

export const BatchExportModal: React.FC<BatchExportModalProps> = ({
  isOpen,
  onClose,
  dataset,
  phoneRef,
  currentConfig,
  onChangeConfig,
}) => {
  const [exportType, setExportType] = useState<'zip_png' | 'pdf_multi'>('zip_png');
  const [exportTheme, setExportTheme] = useState<'current' | 'dark' | 'light'>('current');
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(dataset.length);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentProcessingName, setCurrentProcessingName] = useState('');
  const [shouldStop, setShouldStop] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const stopRef = useRef(false);

  if (!isOpen) return null;

  const handleStartBatch = async () => {
    setIsProcessing(true);
    setProgress(0);
    setIsDone(false);
    setShouldStop(false);
    stopRef.current = false;

    // Clean main document stylesheets once before starting the batch process
    sanitizeDocumentStyles(document);

    const start = Math.max(1, Math.min(startIndex, dataset.length)) - 1;
    const end = Math.min(dataset.length, Math.max(startIndex, endIndex));
    const itemsToExport = dataset.slice(start, end);

    const zip = exportType === 'zip_png' ? new JSZip() : null;
    let pdfDoc: jsPDF | null = null;

    try {
      for (let i = 0; i < itemsToExport.length; i++) {
        if (stopRef.current) break;

        const record = itemsToExport[i];
        const recordNum = start + i + 1;
        setCurrentProcessingName(`Memproses Data #${recordNum} (${i + 1}/${itemsToExport.length}) - ${record.namaWali}`);

        // Construct config for this record
        const isDark = exportTheme === 'dark' ? true : exportTheme === 'light' ? false : currentConfig.isDarkMode;
        const recordMessages = createOfficialSapaWaliMessages(record);

        const tempConfig: ChatConfig = {
          ...currentConfig,
          contactName: `(Wali) ${record.namaWali}`,
          phoneNumber: record.noHp,
          isDarkMode: isDark,
          batteryLevel: getRecordBattery(record),
          timeTopBar: getRecordTopBarTime(record),
          messages: recordMessages
        };

        // Dynamically update view
        onChangeConfig(tempConfig);

        // Allow DOM to re-render properly
        await new Promise((r) => setTimeout(r, 180));

        if (phoneRef.current) {
          try {
            const canvas = await captureFullElement(phoneRef.current, isDark);

            if (exportType === 'zip_png' && zip) {
              const imgData = canvas.toDataURL('image/png');
              const base64Data = imgData.replace(/^data:image\/png;base64,/, '');
              const safeName = record.namaWali.replace(/[^a-zA-Z0-9_-]/g, '_');
              zip.file(`SAPA_WALI_${recordNum}_${safeName}.png`, base64Data, { base64: true });
            } else if (exportType === 'pdf_multi') {
              if (!pdfDoc) {
                pdfDoc = new jsPDF({
                  orientation: 'portrait',
                  unit: 'mm',
                  format: 'a4'
                });
                addScreenshotPageToPdf(pdfDoc, canvas, record, true);
              } else {
                addScreenshotPageToPdf(pdfDoc, canvas, record, false);
              }
            }
          } catch (itemErr) {
            console.error(`Error rendering item #${recordNum}:`, itemErr);
          }
        }

        const pct = Math.round(((i + 1) / itemsToExport.length) * 100);
        setProgress(pct);
      }

      if (!stopRef.current) {
        if (exportType === 'zip_png' && zip) {
          setCurrentProcessingName('Membuat berkas ZIP batch...');
          const blob = await zip.generateAsync({ type: 'blob' }, (metadata) => {
            if (metadata.percent) {
              setCurrentProcessingName(`Membuat berkas ZIP... ${Math.round(metadata.percent)}%`);
            }
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `SAPA_WALI_BATCH_BHP_MEDAN_${start + 1}_sd_${end}.zip`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 3000);
        } else if (exportType === 'pdf_multi' && pdfDoc) {
          setCurrentProcessingName('Menyimpan file PDF multi-halaman...');
          const pdfBlob = pdfDoc.output('blob');
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          link.href = pdfUrl;
          link.download = `SAPA_WALI_BATCH_BHP_MEDAN_${start + 1}_sd_${end}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(pdfUrl), 3000);
        }
        setIsDone(true);
      }
    } catch (err) {
      console.error('Batch export error:', err);
      alert('Terjadi kesalahan saat batch export: ' + (err as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative space-y-5 text-slate-800 dark:text-slate-100 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FolderArchive className="w-6 h-6 text-emerald-600" />
            <div>
              <h3 className="font-extrabold text-lg leading-tight text-slate-900 dark:text-white">
                Ekspor Massal Batch ({dataset.length} Data)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                SAPA WALI - Balai Harta Peninggalan Medan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Options */}
        {!isProcessing && !isDone && (
          <div className="space-y-4 text-xs">
            {/* Export Format */}
            <div className="space-y-2">
              <label className="font-bold text-slate-600 dark:text-slate-300 block uppercase tracking-wider">
                Pilih Format Hasil Ekspor:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setExportType('zip_png')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                    exportType === 'zip_png'
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500'
                      : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  <FolderArchive className="w-6 h-6 text-emerald-600" />
                  <span className="font-black text-xs">Paket ZIP Gambar PNG</span>
                  <span className="text-[10px] text-slate-500">
                    1 File PNG 3x Ultra Sharp per kontak
                  </span>
                </button>

                <button
                  onClick={() => setExportType('pdf_multi')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                    exportType === 'pdf_multi'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 ring-2 ring-indigo-500'
                      : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  <FileText className="w-6 h-6 text-indigo-600" />
                  <span className="font-black text-xs">1 File PDF (109 SS Berurutan)</span>
                  <span className="text-[10px] text-slate-500">
                    Berurutan dari awal sampai akhir, 109 screenshot
                  </span>
                </button>
              </div>
            </div>

            {/* Mode Tema Chat */}
            <div className="space-y-2">
              <label className="font-bold text-slate-600 dark:text-slate-300 block uppercase tracking-wider">
                Tema Chat WhatsApp Batch:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setExportTheme('current')}
                  className={`p-2 rounded-lg border font-semibold text-center ${
                    exportTheme === 'current'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
                >
                  Sesuai Layar
                </button>
                <button
                  onClick={() => setExportTheme('light')}
                  className={`p-2 rounded-lg border font-semibold text-center ${
                    exportTheme === 'light'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
                >
                  Mode Terang (Light)
                </button>
                <button
                  onClick={() => setExportTheme('dark')}
                  className={`p-2 rounded-lg border font-semibold text-center ${
                    exportTheme === 'dark'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
                >
                  Mode Gelap (Dark)
                </button>
              </div>
            </div>

            {/* Range selection */}
            <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="font-bold text-slate-600 dark:text-slate-300 block uppercase tracking-wider">
                Jangkauan Data yang Diekspor:
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <span className="text-[10px] text-slate-400 block mb-1 font-semibold">Dari Data Ke-</span>
                  <input
                    type="number"
                    min="1"
                    max={dataset.length}
                    value={startIndex}
                    onChange={(e) => setStartIndex(Number(e.target.value))}
                    className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-extrabold text-center"
                  />
                </div>
                <span className="font-bold text-slate-400 pt-4">s/d</span>
                <div className="flex-1">
                  <span className="text-[10px] text-slate-400 block mb-1 font-semibold">Sampai Data Ke-</span>
                  <input
                    type="number"
                    min="1"
                    max={dataset.length}
                    value={endIndex}
                    onChange={(e) => setEndIndex(Number(e.target.value))}
                    className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-extrabold text-center"
                  />
                </div>
              </div>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold text-center">
                Total item diekspor: {Math.max(0, endIndex - startIndex + 1)} data
              </p>
            </div>
          </div>
        )}

        {/* Progress Bar View */}
        {isProcessing && (
          <div className="space-y-4 py-4 text-center">
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div>
              <h4 className="font-black text-lg text-emerald-600 dark:text-emerald-400">
                Memproses Ekspor Batch... ({progress}%)
              </h4>
              <p className="text-xs text-slate-500 font-medium mt-1 truncate px-4">
                {currentProcessingName}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-300 dark:border-slate-700">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <button
              onClick={() => {
                stopRef.current = true;
                setShouldStop(true);
              }}
              className="py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <StopCircle className="w-4 h-4" /> Batalkan Proses
            </button>
          </div>
        )}

        {/* Completion Success View */}
        {isDone && (
          <div className="space-y-4 py-4 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <div>
              <h4 className="font-black text-xl text-slate-900 dark:text-white">
                Ekspor Batch Selesai!
              </h4>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Berkas telah berhasil diunduh secara otomatis ke komputer/perangkat Anda.
              </p>
            </div>
            <button
              onClick={() => setIsDone(false)}
              className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 mx-auto"
            >
              <RefreshCw className="w-4 h-4" /> Ekspor Lagi
            </button>
          </div>
        )}

        {/* Footer Actions */}
        {!isProcessing && !isDone && (
          <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold"
            >
              Tutup
            </button>
            <button
              onClick={handleStartBatch}
              className="flex-2 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-md"
            >
              <Play className="w-4 h-4 fill-current" />
              Mulai Ekspor Batch Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
