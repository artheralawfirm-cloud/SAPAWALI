const fs = require('fs');
let code = fs.readFileSync('src/utils/pdfGenerator.ts', 'utf8');

code = code.replace(/const titleText = getPdfPageHeaderTitle\(record\);/g, (match, offset, str) => {
    // Only replace the second occurrence
    if (offset > 1000) {
        return `// titleText already declared`;
    }
    return match;
});

code = code.replace(/const topMargin = 16;/g, (match, offset, str) => {
    if (offset > 1000) {
        return `// topMargin already declared`;
    }
    return match;
});

fs.writeFileSync('src/utils/pdfGenerator.ts', code, 'utf8');
console.log('patched declarations');
