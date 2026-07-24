const fs = require('fs');
let code = fs.readFileSync('src/components/PhonePreview.tsx', 'utf8');

// Change parent from h-fit to h-auto
code = code.replace(/h-fit min-h-\[600px\]/g, 'h-auto min-h-[600px]');

// Change child from flex-auto to grow shrink-0
code = code.replace(/className=\{\`flex-auto \$\{bgCanvas\}/g, 'className={`grow shrink-0 ${bgCanvas}');

fs.writeFileSync('src/components/PhonePreview.tsx', code, 'utf8');
console.log('patched phone height');
