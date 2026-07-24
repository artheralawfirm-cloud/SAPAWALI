const fs = require('fs');

const file = 'src/utils/signaturesAndStamps.ts';
let code = fs.readFileSync(file, 'utf8');

const newWaliSig = `export function generateDynamicWaliSignature(namaWali: string, isPengampuan: boolean): string {
  let hash = 0;
  const nameToHash = (namaWali || 'Wali').replace(/[^a-zA-Z]/g, '');
  for (let i = 0; i < nameToHash.length; i++) {
    hash = nameToHash.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const prng = () => {
    hash = Math.sin(hash) * 10000;
    return hash - Math.floor(hash);
  };
  
  const width = 150;
  const height = 60;
  
  let path = \`M \${10 + prng()*10} \${30 + prng()*20} \`;
  
  for(let i=0; i<4; i++) {
      const cp1x = 20 + i*30 + prng()*20;
      const cp1y = prng() * 10;
      const cp2x = 30 + i*30 + prng()*20;
      const cp2y = 50 + prng() * 10;
      const x = 40 + i*30 + prng()*10;
      const y = 30 + prng()*20;
      path += \`C \${cp1x} \${cp1y}, \${cp2x} \${cp2y}, \${x} \${y} \`;
  }
  
  const svg = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \${width} \${height}" width="\${width}" height="\${height}">
      <path d="\${path}" fill="none" stroke="#000044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <text x="75" y="45" font-family="cursive" font-style="italic" font-size="16" fill="#000044" opacity="0.4" text-anchor="middle" transform="rotate(-5 75 45)">\${namaWali.substring(0, 15)}</text>
  </svg>\`;
  
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}`;

code = code.replace(/export function generateDynamicWaliSignature\([\s\S]*?<\/svg>\`;\s*return `data:image\/svg\+xml;utf8,\$\{encodeURIComponent\(svg\)\}`;\s*}/, newWaliSig);

fs.writeFileSync(file, code, 'utf8');
console.log('patched generateDynamicWaliSignature');
