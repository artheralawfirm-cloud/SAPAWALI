function generateSignatureSvg(name, seed) {
    const width = 150;
    const height = 60;
    
    // Seeded random
    function random() {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }
    
    let path = `M ${10 + random()*10} ${30 + random()*20} `;
    
    // Draw some loops
    for(let i=0; i<4; i++) {
        const cp1x = 20 + i*30 + random()*20;
        const cp1y = random() * 10;
        const cp2x = 30 + i*30 + random()*20;
        const cp2y = 50 + random() * 10;
        const x = 40 + i*30 + random()*10;
        const y = 30 + random()*20;
        path += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y} `;
    }
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <path d="${path}" fill="none" stroke="#000044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <text x="75" y="45" font-family="cursive" font-style="italic" font-size="16" fill="#000044" opacity="0.5" text-anchor="middle" transform="rotate(-5 75 45)">${name}</text>
    </svg>`;
    
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
console.log(generateSignatureSvg("Budi", 1));
