const fs = require('fs');

let uiCode = fs.readFileSync('src/components/LegalReportsPageView.tsx', 'utf8');

uiCode = uiCode.replace(
    "import { captureFullElement } from '../utils/screenshotUtils';",
    "import { captureFullElement } from '../utils/screenshotUtils';\nimport { generateDocxForRecord } from '../utils/docxExporter';\nimport { saveAs } from 'file-saver';"
);

// Fallback if not found:
if (!uiCode.includes("import { generateDocxForRecord }")) {
    uiCode = uiCode.replace(
        "import React",
        "import { generateDocxForRecord } from '../utils/docxExporter';\nimport { saveAs } from 'file-saver';\nimport React"
    );
}

// Add the handler
const handlerCode = `
  const handleDownloadDocx = async () => {
    if (isExporting || !hiddenExportContainerRef.current) return;
    setIsExporting(true);
    setExportProgress({ current: 0, total: 1, statusText: "Menyusun Dokumen MS Word..." });
    try {
      // Find the screenshot canvas inside the hidden container
      const container = hiddenExportContainerRef.current;
      const phoneEl = container.querySelector(\`.single-export-node-\${selectedRecordIndex} .origin-top\`);
      
      let canvasDataUrl = "";
      if (phoneEl) {
          setExportProgress({ current: 0, total: 1, statusText: "Mengambil gambar chat..." });
          const canvas = await captureFullElement(phoneEl as HTMLElement, true);
          canvasDataUrl = canvas.toDataURL('image/jpeg', 0.90);
      }
      
      setExportProgress({ current: 0, total: 1, statusText: "Menyimpan ke MS Word (.docx)..." });
      const blob = await generateDocxForRecord(currentRecord, selectedRecordIndex, canvasDataUrl, selectedOfficer);
      const safeName = currentRecord.namaWali.replace(/[^a-zA-Z0-9_-]/g, '_');
      saveAs(blob, \`BERITA_ACARA_\${safeName}.docx\`);
    } catch (err) {
      console.error(err);
      alert("Gagal membuat file DOCX.");
    } finally {
      setIsExporting(false);
      setExportProgress(null);
    }
  };
`;

uiCode = uiCode.replace('const handlePrintInstantSinglePdf = async () => {', handlerCode + '\n  const handlePrintInstantSinglePdf = async () => {');

// Add the button
const buttonHtml = `
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
`;

uiCode = uiCode.replace('{/* Single Record Export Canvas Button */}', buttonHtml + '\n            {/* Single Record Export Canvas Button */}');

// FileText is already imported from lucide-react according to the previous grep

fs.writeFileSync('src/components/LegalReportsPageView.tsx', uiCode, 'utf8');
console.log('patched UI with DOCX');
