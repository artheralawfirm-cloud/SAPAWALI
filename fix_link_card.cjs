const fs = require('fs');

let ui = fs.readFileSync('src/components/PhonePreview.tsx', 'utf8');

// Remove the URL line completely
ui = ui.replace(
  /<span className="text-\[13px\] text-\[#8696a0\] dark:text-emerald-300 font-medium flex items-center gap-1 mt-0\.5 line-clamp-1 whitespace-normal leading-tight uppercase tracking-wider">\s*<span>🔗<\/span> \{msg\.linkUrl \|\| 'bit\.ly'\}\s*<\/span>/g,
  ''
);

// In the link title, uppercase the text if we want it to look exactly like the screenshot?
// Actually the screenshot title is: SAPA WALI - Monitoring Perwalian & Pengampuan
// My code: {msg.linkTitle || 'SAPA WALI - Monitoring Perwalia...'}
// Let's remove the truncation from default so it matches "SAPA WALI - Monitoring Perwalian & Pengampuan"
ui = ui.replace(
  /\{msg\.linkTitle \|\| 'SAPA WALI - Monitoring Perwalia\.\.\.'\}/g,
  "{msg.linkTitle || 'SAPA WALI - Monitoring Perwalian & Pengampuan'}"
);

fs.writeFileSync('src/components/PhonePreview.tsx', ui, 'utf8');
console.log('Fixed Link Card');
