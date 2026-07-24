const fs = require('fs');
let content = fs.readFileSync('src/utils/signaturesAndStamps.ts', 'utf8');

const replacement = `/**
 * Generate a dynamic signature SVG based on the guardian's name.
 */
export function generateDynamicWaliSignature(namaWali: string, isPengampuan: boolean): string {
  let hash = 0;
  const nameToHash = (namaWali || 'Wali').replace(/[^a-zA-Z]/g, '');
  for (let i = 0; i < nameToHash.length; i++) {
    hash = nameToHash.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use a predictable pseudo-random function
  const prng = () => {
    hash = Math.sin(hash) * 10000;
    return hash - Math.floor(hash);
  };

  // Create a pseudo-random continuous path mimicking a signature
  let path = 'M 20 50 ';
  let x = 20;
  let y = 50;

  const numLoops = Math.min(Math.max(nameToHash.length, 5), 15);
  
  for (let i = 0; i < numLoops; i++) {
    const dx = 10 + prng() * 25;
    const dy = (prng() - 0.5) * 60;
    
    // Control points for cubic bezier
    const cx1 = x + dx * 0.3 + (prng() - 0.5) * 20;
    const cy1 = y - 40 * prng(); // go up
    const cx2 = x + dx * 0.7 + (prng() - 0.5) * 20;
    const cy2 = y + dy + 40 * prng(); // go down
    
    x += dx;
    y += dy;
    
    // keep y within bounds
    if (y < 20) y = 20 + prng() * 10;
    if (y > 80) y = 80 - prng() * 10;
    
    path += \`C \${cx1.toFixed(1)} \${cy1.toFixed(1)}, \${cx2.toFixed(1)} \${cy2.toFixed(1)}, \${x.toFixed(1)} \${y.toFixed(1)} \`;
  }
  
  const svg = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="200" height="50">
    <path d="\${path}" fill="none" stroke="#000080" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>\`;
  
  return \`data:image/svg+xml;utf8,\${encodeURIComponent(svg)}\`;
}
`;

const startIndex = content.indexOf('/**\n * Generate a dynamic signature SVG');
if (startIndex !== -1) {
  content = content.substring(0, startIndex) + replacement;
  fs.writeFileSync('src/utils/signaturesAndStamps.ts', content, 'utf8');
  console.log('Replaced successfully');
} else {
  console.log('Not found');
}
