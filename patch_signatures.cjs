const fs = require('fs');

const file = 'src/utils/signaturesAndStamps.ts';
let code = fs.readFileSync(file, 'utf8');

const generateSigCode = `
export function generateSignatureSvg(name: string, seed: number): string {
    const width = 150;
    const height = 60;
    
    function random() {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }
    
    let path = \`M \${10 + random()*10} \${30 + random()*20} \`;
    
    for(let i=0; i<4; i++) {
        const cp1x = 20 + i*30 + random()*20;
        const cp1y = random() * 10;
        const cp2x = 30 + i*30 + random()*20;
        const cp2y = 50 + random() * 10;
        const x = 40 + i*30 + random()*10;
        const y = 30 + random()*20;
        path += \`C \${cp1x} \${cp1y}, \${cp2x} \${cp2y}, \${x} \${y} \`;
    }
    
    const svg = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \${width} \${height}" width="\${width}" height="\${height}">
        <path d="\${path}" fill="none" stroke="#000044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <text x="75" y="45" font-family="cursive" font-style="italic" font-size="16" fill="#000044" opacity="0.4" text-anchor="middle" transform="rotate(-5 75 45)">\${name.substring(0, 15)}</text>
    </svg>\`;
    
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
`;

if (!code.includes('generateSignatureSvg')) {
    code = code.replace("export const LOGO_KEMENKUMHAM_SVG", generateSigCode + "\nexport const LOGO_KEMENKUMHAM_SVG");
}

code = code.replace(/export const SIGNATURE_SYAFRIADI_SVG = '[^']*';/, "export const SIGNATURE_SYAFRIADI_SVG = generateSignatureSvg('Syafriadi', 101);");
code = code.replace(/export const SIGNATURE_SYUHADA_SVG = '[^']*';/, "export const SIGNATURE_SYUHADA_SVG = generateSignatureSvg('Syuhada', 102);");
code = code.replace(/export const SIGNATURE_SHELA_NATASHA_SVG = '[^']*';/, "export const SIGNATURE_SHELA_NATASHA_SVG = generateSignatureSvg('Shela', 103);");
code = code.replace(/export const SIGNATURE_BUDIYANTO_SVG = '[^']*';/, "export const SIGNATURE_BUDIYANTO_SVG = generateSignatureSvg('Budiyanto', 104);");
code = code.replace(/export const SIGNATURE_ELSINTHA_SVG = '[^']*';/, "export const SIGNATURE_ELSINTHA_SVG = generateSignatureSvg('Elsintha', 105);");
code = code.replace(/export const SIGNATURE_SITI_ROSLINA_SVG = '[^']*';/, "export const SIGNATURE_SITI_ROSLINA_SVG = generateSignatureSvg('Siti Roslina', 106);");
code = code.replace(/export const SIGNATURE_TAUFIK_SVG = '[^']*';/, "export const SIGNATURE_TAUFIK_SVG = generateSignatureSvg('Taufik', 107);");

fs.writeFileSync(file, code, 'utf8');
console.log('patched signatures');
