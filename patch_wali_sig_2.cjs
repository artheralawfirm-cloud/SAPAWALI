const fs = require('fs');

const file = 'src/utils/signaturesAndStamps.ts';
let code = fs.readFileSync(file, 'utf8');

// Find the function and replace it entirely
const sigStart = code.indexOf('export function generateDynamicWaliSignature');
if (sigStart !== -1) {
    // find the end of the function (since it ends the file, or look for the next export)
    const nextExport = code.indexOf('export ', sigStart + 10);
    const end = nextExport !== -1 ? nextExport : code.length;
    
    const newWaliSig = `export function generateDynamicWaliSignature(namaWali: string, isPengampuan: boolean): string {
  // Use ultra-lightweight text signature to avoid PDF bloat
  const name = namaWali ? namaWali.substring(0, 15) : 'Wali';
  const svg = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 60" width="150" height="60">
      <text x="75" y="35" font-family="cursive, sans-serif" font-style="italic" font-size="24" fill="#000044" opacity="0.6" text-anchor="middle">\${name}</text>
  </svg>\`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
`;
    
    code = code.substring(0, sigStart) + newWaliSig + (nextExport !== -1 ? code.substring(nextExport) : '');
    fs.writeFileSync(file, code, 'utf8');
    console.log('patched generateDynamicWaliSignature successfully');
}
