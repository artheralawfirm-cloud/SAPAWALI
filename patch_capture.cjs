const fs = require('fs');

// Patch App.tsx
let appCode = fs.readFileSync('src/App.tsx', 'utf8');
appCode = appCode.replace(
  "import html2canvas from 'html2canvas';",
  "import html2canvas from 'html2canvas';\nimport { captureFullElement } from './utils/screenshotUtils';"
);

const oldCapture = `      const canvas = await html2canvas(phoneRef.current, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: config.isDarkMode ? '#0b141a' : '#efeae2',
        logging: false,
        scrollY: -window.scrollY,
        height: phoneRef.current.scrollHeight,
        windowHeight: phoneRef.current.scrollHeight,
        onclone: (clonedDoc) => sanitizeOklchInDoc(clonedDoc)
      });`;

const newCapture = `      const canvas = await captureFullElement(phoneRef.current, config.isDarkMode);`;

appCode = appCode.replace(oldCapture, newCapture);
fs.writeFileSync('src/App.tsx', appCode, 'utf8');

// Patch BatchExportModal.tsx
let batchCode = fs.readFileSync('src/components/BatchExportModal.tsx', 'utf8');
batchCode = batchCode.replace(
  "import html2canvas from 'html2canvas';",
  "import html2canvas from 'html2canvas';\nimport { captureFullElement } from '../utils/screenshotUtils';"
);

const oldBatchCapture = `            const canvas = await html2canvas(phoneRef.current, {
              scale: 1, // Reduced scale for performance and memory to prevent crashes
              useCORS: true,
              allowTaint: true,
              backgroundColor: isDark ? '#0b141a' : '#efeae2',
              logging: false,
              scrollY: -window.scrollY,
              height: phoneRef.current.scrollHeight,
              windowHeight: phoneRef.current.scrollHeight,
              onclone: (clonedDoc) => sanitizeOklchInDoc(clonedDoc)
            });`;

const newBatchCapture = `            const canvas = await captureFullElement(phoneRef.current, isDark);`;

batchCode = batchCode.replace(oldBatchCapture, newBatchCapture);
fs.writeFileSync('src/components/BatchExportModal.tsx', batchCode, 'utf8');

console.log('patched to use robust capture');
