const fs = require('fs');
let code = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');

code = code.replace(/\/\/ titleText already declared/g, `const titleText = getPdfPageHeaderTitle(record);`);
code = code.replace(/\/\/ topMargin already declared/g, `const topMargin = 16;`);
// But then it will declare it twice.
// Let's just fix it completely using regex.
fs.writeFileSync('src/utils/pdfGenerator.ts', code, 'utf8');
