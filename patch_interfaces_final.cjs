const fs = require('fs');
let code = fs.readFileSync('src/utils/signaturesAndStamps.ts', 'utf8');

const regexOfficial = /export interface OfficialOfficer {[\s\S]*?signatureSvg: string;\s*}/;
const newOfficial = `export interface OfficialOfficer {
  id: string;
  name: string;
  nama?: string;
  jabatan?: string;
  nip: string;
  role: string;
  title: string;
  signatureSvg: string;
}`;

const regexVector = /export interface VectorSignatureItem {[\s\S]*?tags: string\[\];\s*}/;
const newVector = `export interface VectorSignatureItem {
  id: string;
  name: string;
  svgDataUrl: string;
  tags: string[];
  category?: string;
  title?: string;
  roleTitle?: string;
  nip?: string;
  seksi?: string;
}`;

code = code.replace(regexOfficial, newOfficial);
code = code.replace(regexVector, newVector);
fs.writeFileSync('src/utils/signaturesAndStamps.ts', code, 'utf8');
console.log('patched both interfaces');
