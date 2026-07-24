const fs = require('fs');
let code = fs.readFileSync('src/components/LegalReportsPageView.tsx', 'utf8');

code = code.replace(
    'className="print-only-container fixed -left-[9999px] top-0', 
    'className="print-only-container absolute -left-[9999px] top-0'
);

fs.writeFileSync('src/components/LegalReportsPageView.tsx', code, 'utf8');
console.log('patched fixed to absolute');
