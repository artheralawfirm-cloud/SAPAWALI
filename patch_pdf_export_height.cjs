const fs = require('fs');
let code = fs.readFileSync('src/utils/legalDocumentPdfExporter.ts', 'utf8');

const search = `    const canvas = await html2canvas(el, {
      scale: 1.5, // High speed crisp A4 rendering
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (clonedDoc) => sanitizeOklchInDoc(clonedDoc)
    });`;

const replace = `    const canvas = await html2canvas(el, {
      scale: 1.5, // High speed crisp A4 rendering
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowHeight: el.scrollHeight,
      height: el.scrollHeight,
      onclone: (clonedDoc) => sanitizeOklchInDoc(clonedDoc)
    });`;

if (code.includes('scale: 1.5,')) {
    code = code.replace(search, replace);
    fs.writeFileSync('src/utils/legalDocumentPdfExporter.ts', code, 'utf8');
    console.log('patched html2canvas in exporter');
}
