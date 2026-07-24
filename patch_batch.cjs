const fs = require('fs');
let code = fs.readFileSync('src/components/BatchExportModal.tsx', 'utf8');
code = code.replace(/scale:\s*2, \/\/ Crisp scale 2/, 'scale: 1, // Reduced scale for performance and memory to prevent crashes');
fs.writeFileSync('src/components/BatchExportModal.tsx', code, 'utf8');
console.log('patched batch export scale');
