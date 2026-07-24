const fs = require('fs');
let code = fs.readFileSync('src/components/PhonePreview.tsx', 'utf8');

// Replace flex-1 with flex-grow
code = code.replace(/<div className=\{\`flex-1 \$\{bgCanvas\}/g, '<div className={`flex-auto ${bgCanvas}');

fs.writeFileSync('src/components/PhonePreview.tsx', code, 'utf8');
console.log('patched PhonePreview flex height');
