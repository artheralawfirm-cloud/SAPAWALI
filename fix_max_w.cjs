const fs = require('fs');
let ui = fs.readFileSync('src/components/PhonePreview.tsx', 'utf8');

ui = ui.replace('tracking-normal max-w-[85%]', 'tracking-normal max-w-full');
ui = ui.replace('min-h-[600px] max-w-[85%]', 'min-h-[600px] max-w-full');
ui = ui.replace('overflow-hidden max-w-[85%]', 'overflow-hidden max-w-full');

fs.writeFileSync('src/components/PhonePreview.tsx', ui, 'utf8');
