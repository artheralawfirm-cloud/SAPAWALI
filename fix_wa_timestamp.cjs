const fs = require('fs');

let ui = fs.readFileSync('src/components/PhonePreview.tsx', 'utf8');

// Change timestamp to float-right to look like native WA
ui = ui.replace(
  /<div className=\{`flex items-center justify-end gap-1 mt-1 text-\[11px\] \$\{isDark \? 'text-\[#8696a0\]' : 'text-gray-500'\} select-none`\}>/g,
  '<div className={`float-right ml-3 mt-1.5 flex items-center justify-end gap-1 text-[10px] ${isDark ? \'text-white/60\' : \'text-gray-500\'} select-none`}>'
);

fs.writeFileSync('src/components/PhonePreview.tsx', ui, 'utf8');
console.log('Fixed WhatsApp timestamp');
