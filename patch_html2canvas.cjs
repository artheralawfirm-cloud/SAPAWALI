const fs = require('fs');

let code = fs.readFileSync('src/components/BatchExportModal.tsx', 'utf8');

const search = `            const canvas = await html2canvas(phoneRef.current, {
              scale: 1, // Reduced scale for performance and memory to prevent crashes
              useCORS: true,
              allowTaint: true,
              backgroundColor: isDark ? '#0b141a' : '#efeae2',
              logging: false,`;
              
const replace = `            const canvas = await html2canvas(phoneRef.current, {
              scale: 1, // Reduced scale for performance and memory to prevent crashes
              useCORS: true,
              allowTaint: true,
              backgroundColor: isDark ? '#0b141a' : '#efeae2',
              logging: false,
              scrollY: -window.scrollY,
              height: phoneRef.current.scrollHeight,
              windowHeight: phoneRef.current.scrollHeight,`;

if (code.includes(search)) {
    code = code.replace(search, replace);
    fs.writeFileSync('src/components/BatchExportModal.tsx', code, 'utf8');
    console.log('patched html2canvas scroll issue');
} else {
    console.log('could not find search string in BatchExportModal.tsx');
}
