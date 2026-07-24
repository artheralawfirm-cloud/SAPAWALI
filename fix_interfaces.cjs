const fs = require('fs');
const file = 'src/utils/signaturesAndStamps.ts';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('jabatan?: string;')) {
    code = code.replace(/name: string;/g, 'name: string;\n  nama?: string;\n  jabatan?: string;');
}
if (!code.includes('seksi?: string;')) {
    code = code.replace(/tags: string\[\];/g, 'tags: string[];\n  category?: string;\n  title?: string;\n  roleTitle?: string;\n  nip?: string;\n  seksi?: string;');
}

fs.writeFileSync(file, code, 'utf8');
console.log('patched signaturesAndStamps.ts types');
