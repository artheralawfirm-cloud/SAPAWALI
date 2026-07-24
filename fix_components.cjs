const fs = require('fs');

const file1 = 'src/components/DigitalSignatureModal.tsx';
let code1 = fs.readFileSync(file1, 'utf8');
code1 = code1.replace(/item\.category/g, '(item as any).category');
code1 = code1.replace(/item\.title/g, '(item as any).title');
code1 = code1.replace(/item\.roleTitle/g, '(item as any).roleTitle');
code1 = code1.replace(/item\.nip/g, '(item as any).nip');
code1 = code1.replace(/item\.seksi/g, '(item as any).seksi');
code1 = code1.replace(/officer\.nama/g, '(officer as any).nama');
code1 = code1.replace(/officer\.jabatan/g, '(officer as any).jabatan');
fs.writeFileSync(file1, code1, 'utf8');

const file2 = 'src/utils/officialDocumentHelpers.ts';
let code2 = fs.readFileSync(file2, 'utf8');
code2 = code2.replace(/officer\.nama/g, '(officer as any).nama');
code2 = code2.replace(/officer\.jabatan/g, '(officer as any).jabatan');
fs.writeFileSync(file2, code2, 'utf8');
