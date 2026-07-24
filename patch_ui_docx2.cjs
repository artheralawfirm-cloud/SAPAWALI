const fs = require('fs');

let uiCode = fs.readFileSync('src/components/LegalReportsPageView.tsx', 'utf8');

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

uiCode = uiCode.replace('  const handlePrintInstantSinglePdf = () => {', handlerCode + '\n  const handlePrintInstantSinglePdf = () => {');

fs.writeFileSync('src/components/LegalReportsPageView.tsx', uiCode, 'utf8');
console.log('patched UI with DOCX handler');
