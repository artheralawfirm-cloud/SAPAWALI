const fs = require('fs');
let code = fs.readFileSync('src/components/OfficialDocumentTemplates.tsx', 'utf8');

// Revert mix-blend-multiply, keep it z-20 relative
code = code.replace(/mix-blend-multiply/g, '');

fs.writeFileSync('src/components/OfficialDocumentTemplates.tsx', code, 'utf8');
console.log('patched z-index');
