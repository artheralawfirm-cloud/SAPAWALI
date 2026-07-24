const fs = require('fs');

let ui = fs.readFileSync('src/components/PhonePreview.tsx', 'utf8');

// Header
ui = ui.replace('text-[14.5px]', 'text-[16px]');
ui = ui.replace('text-[9.5px]', 'text-[13px]'); // status text and pill text
ui = ui.replace('text-[9.5px]', 'text-[12px]'); // might be multiple, I'll use regex

// Let's use regex for specific replacements
ui = ui.replace(/statusText = 'text-\[#8696a0\] text-\[9\.5px\]/g, "statusText = 'text-[#8696a0] text-[13px]");
ui = ui.replace(/pillBg = isDark \? 'bg-\[#182229\] text-\[#8696a0\]' : 'bg-\[#ffffff\] text-\[#54656f\] shadow-xs border border-black\/5';/g, 
  "pillBg = isDark ? 'bg-[#182229] text-[#8696a0]' : 'bg-[#ffffff] text-[#54656f] shadow-xs border border-black/5';");
ui = ui.replace(/text-\[9\.5px\]/g, "text-[12px]");

// Message text
ui = ui.replace(/text-\[10px\]/g, "text-[14.5px]");

// Link card title
ui = ui.replace(/text-\[10px\] font-bold/g, "text-[14.5px] font-bold");

// Link card description and domain (was 9px)
ui = ui.replace(/text-\[9px\]/g, "text-[13px]");

// Link card domain emoji sizing
ui = ui.replace(/text-\[13px\] text-\[#8696a0\] dark:text-emerald-300 font-medium flex items-center gap-1 mt-0\.5 line-clamp-1 whitespace-normal leading-tight uppercase tracking-wider/g, 
  "text-[12px] text-[#8696a0] dark:text-emerald-300 font-medium flex items-center gap-1 mt-0.5 line-clamp-1 whitespace-normal leading-tight uppercase tracking-wider");

// Top bar
ui = ui.replace(/text-\[12px\]/g, "text-[13px]");
ui = ui.replace(/text-\[8\.5px\]/g, "text-[11px]"); // mostly timestamps and 5G

// Timestamps inside bubbles
ui = ui.replace(/text-\[11px\]/g, "text-[11px]");

// Input bar Message text
ui = ui.replace(/text-\[13\.5px\]/g, "text-[15px]");

// Adjust lock icon size
ui = ui.replace(/<Lock className="w-3\.5 h-3\.5/g, '<Lock className="w-4 h-4');

// Adjust Checkmarks
ui = ui.replace(/w-3\.5 h-3\.5 inline/g, "w-4 h-4 inline");

// Adjust AHU Box text
ui = ui.replace(/text-\[8px\]/g, "text-[10px]");
ui = ui.replace(/text-\[5\.5px\]/g, "text-[7px]");

fs.writeFileSync('src/components/PhonePreview.tsx', ui, 'utf8');
console.log('Fixed WhatsApp font sizes');
