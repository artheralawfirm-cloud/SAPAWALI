import React, { useState, useRef } from 'react';
import { getFullSapaWaliDataset, createOfficialSapaWaliMessages, getRecordBattery, getRecordTopBarTime, getRecordOnlineStatus } from './data/sapaWaliData';
import { SapaWaliRecord, ChatConfig } from './types';
import { PhonePreview } from './components/PhonePreview';
import { ControlPanel } from './components/ControlPanel';
import { BatchExportModal } from './components/BatchExportModal';
import { LegalReportsPageView } from './components/LegalReportsPageView';
import { MessageSquare, ShieldCheck, Download, Sparkles, Sun, Moon, FileText, Layers } from 'lucide-react';
import html2canvas from 'html2canvas';
import { captureFullElement } from './utils/screenshotUtils';
import jsPDF from 'jspdf';
import { sanitizeOklchInDoc, sanitizeDocumentStyles } from './utils/html2canvasFix';
import { addScreenshotPageToPdf } from './utils/pdfGenerator';

export default function App() {
  const dataset = getFullSapaWaliDataset();
  const [activeMainTab, setActiveMainTab] = useState<'whatsapp' | 'legal_reports'>('legal_reports');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [appDarkMode, setAppDarkMode] = useState<boolean>(true);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState<boolean>(false);

  const phoneRef = useRef<HTMLDivElement>(null);

  const currentRecord = dataset[currentIndex] || dataset[0];

  // Chat Configuration State
  const [config, setConfig] = useState<ChatConfig>(() => ({
    contactName: `(Wali) ${currentRecord.namaWali}`,
    phoneNumber: currentRecord.noHp,
    onlineStatus: getRecordOnlineStatus(currentRecord),
    isDarkMode: true, // Default dark mode chat frame
    useAndroidFrame: true,
    batteryLevel: getRecordBattery(currentRecord),
    timeTopBar: getRecordTopBarTime(currentRecord),
    messages: createOfficialSapaWaliMessages(currentRecord)
  }));

  // Update config when record selection changes
  const handleSelectRecord = (index: number) => {
    setCurrentIndex(index);
    const rec = dataset[index];
    if (rec) {
      setConfig((prev) => ({
        ...prev,
        contactName: `(Wali) ${rec.namaWali}`,
        phoneNumber: rec.noHp,
        onlineStatus: getRecordOnlineStatus(rec),
        batteryLevel: getRecordBattery(rec),
        timeTopBar: getRecordTopBarTime(rec),
        messages: createOfficialSapaWaliMessages(rec)
      }));
    }
  };

  // Single PNG Download
  const handleSinglePngDownload = async () => {
    if (!phoneRef.current) return;
    try {
      sanitizeDocumentStyles(document);
      const canvas = await html2canvas(phoneRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: config.isDarkMode ? '#0b141a' : '#efeae2',
        logging: false,
        onclone: (clonedDoc) => sanitizeOklchInDoc(clonedDoc)
      });

      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      const safeName = currentRecord.namaWali.replace(/[^a-zA-Z0-9_-]/g, '_');
      a.href = url;
      a.download = `SAPA_WALI_${currentRecord.no}_${safeName}.png`;
      a.click();
    } catch (err) {
      console.error('PNG Download error:', err);
      alert('Gagal mengunduh gambar PNG: ' + (err as Error).message);
    }
  };

  // Single PDF Download
  const handleSinglePdfDownload = async () => {
    if (!phoneRef.current) return;
    try {
      sanitizeDocumentStyles(document);
      const canvas = await captureFullElement(phoneRef.current, config.isDarkMode);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      addScreenshotPageToPdf(pdf, canvas, currentRecord, true);

      const safeName = currentRecord.namaWali.replace(/[^a-zA-Z0-9_-]/g, '_');
      
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `SAPA_WALI_${currentRecord.no}_${safeName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (err) {
      console.error('PDF Download error:', err);
      alert('Gagal mengunduh PDF: ' + (err as Error).message);
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${appDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'}`}>
      
      {/* Top Application Navigation Bar */}
      <header className={`sticky top-0 z-30 border-b backdrop-blur-md ${appDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'} px-4 py-3 transition-colors no-print`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-800 rounded-xl flex items-center justify-center text-white font-black shadow-md border border-amber-300/40">
              <ShieldCheck className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight leading-none text-emerald-600 dark:text-emerald-400">
                  SAPA WALI
                </h1>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  BHP MEDAN
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                Sistem Pelaporan & Generasi Berkas Otomatis E-Monitoring Perwalian
              </p>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setActiveMainTab('legal_reports')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'legal_reports'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Laporan Berkas Legal (4-in-1 PDF)</span>
            </button>

            <button
              onClick={() => setActiveMainTab('whatsapp')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMainTab === 'whatsapp'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Generator Chat WhatsApp</span>
            </button>
          </div>

          {/* App Theme Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAppDarkMode(!appDarkMode)}
              className={`p-2 rounded-xl border transition-all ${
                appDarkMode
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Toggle App Theme"
            >
              {appDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Conditional View Rendering */}
      {activeMainTab === 'legal_reports' ? (
        <LegalReportsPageView />
      ) : (
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            
            {/* Left Column: Interactive Customization & Control Panel */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <ControlPanel
                dataset={dataset}
                currentIndex={currentIndex}
                onSelectRecord={handleSelectRecord}
                config={config}
                onChangeConfig={setConfig}
                onSinglePngDownload={handleSinglePngDownload}
                onSinglePdfDownload={handleSinglePdfDownload}
                onOpenBatchModal={() => setIsBatchModalOpen(true)}
              />
            </div>

            {/* Right Column: Live Phone Screen Preview Frame */}
            <div className="w-full lg:w-1/2 flex flex-col items-center sticky top-20">
              <div className="mb-3 flex items-center justify-between w-full max-w-[410px]">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  Pratinjau Layar HP WhatsApp
                </span>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-200 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                  Skala 3x Ultra Sharp
                </span>
              </div>

              {/* The WhatsApp Phone Canvas */}
              <PhonePreview ref={phoneRef} config={config} />

              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium text-center mt-3 max-w-sm">
                💡 Hasil tangkapan layar PNG 3x Ultra Sharp jernih dan dapat langsung digunakan untuk bukti pelaporan administrasi E-Monitoring SAPA WALI.
              </p>
            </div>

          </div>
        </main>
      )}

      {/* Footer Info */}
      <footer className={`mt-12 border-t py-6 text-center text-xs font-semibold ${appDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'} no-print`}>
        <p>Balai Harta Peninggalan (BHP) Medan — Kementerian Hukum RI</p>
        <p className="text-[10px] opacity-70 mt-1">Layanan SAPA WALI (Monitoring & Evaluasi Perwalian / Pengampuan)</p>
      </footer>

      {/* Batch Export Modal */}
      <BatchExportModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        dataset={dataset}
        phoneRef={phoneRef}
        currentConfig={config}
        onChangeConfig={setConfig}
      />
    </div>
  );
}
