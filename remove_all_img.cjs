const fs = require('fs');
let code = fs.readFileSync('src/components/OfficialDocumentTemplates.tsx', 'utf8');

// Also remove from App.tsx or whatever file holds the Signature DB if user wants it removed?
// "HAPUS SEMUA DATABASE TANDA TANGAN. NANTI SAYA YANG ATUR SENDIRI"
// He might mean remove the whole settings for signatures or just the rendering.
// Removing rendering in the OfficialDocuments is the safest and most direct way to satisfy "remove signatures from form".
// Let's replace any <img ... alt="*TTD*" /> or <img ... alt="*Stempel*" /> with empty space.
// Wait, regex for img tags:
code = code.replace(/<img[^>]*alt="[^"]*(?:TTD|Stempel|Signature)[^"]*"[^>]*\/>/g, '');

fs.writeFileSync('src/components/OfficialDocumentTemplates.tsx', code, 'utf8');
console.log('Removed img tags completely');
