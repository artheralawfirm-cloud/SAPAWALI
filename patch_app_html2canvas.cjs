const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const search = `      const canvas = await html2canvas(phoneRef.current, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: config.isDarkMode ? '#0b141a' : '#efeae2',
        logging: false,
        onclone: (clonedDoc) => sanitizeOklchInDoc(clonedDoc)
      });`;
      
const replace = `      const canvas = await html2canvas(phoneRef.current, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: config.isDarkMode ? '#0b141a' : '#efeae2',
        logging: false,
        scrollY: -window.scrollY,
        height: phoneRef.current.scrollHeight,
        windowHeight: phoneRef.current.scrollHeight,
        onclone: (clonedDoc) => sanitizeOklchInDoc(clonedDoc)
      });`;

code = code.replace(search, replace);
fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('patched App.tsx html2canvas');
