const fs = require('fs');
let code = fs.readFileSync('src/components/PhonePreview.tsx', 'utf8');

// 1. Fix the contact name truncation
code = code.replace(
    'className="text-[14.5px] font-semibold tracking-tight truncate leading-tight text-white"',
    'className="text-[14.5px] font-semibold tracking-tight leading-tight text-white whitespace-pre-wrap break-words"'
);

// 2. Fix the online status text wrapping if needed
// The online status text might also need wrapping.
code = code.replace(
    '<span className={statusText}>{config.onlineStatus || \'online\'}</span>',
    '<span className={`${statusText} whitespace-pre-wrap break-words`}>{config.onlineStatus || \'online\'}</span>'
);

// 3. Let's make the link strings wrap without restriction, and remove any fixed heights
// Link Title
code = code.replace(
    'className="text-[8.5px] font-bold text-white dark:text-white leading-tight break-words whitespace-normal"',
    'className="text-[10px] font-bold text-white dark:text-white leading-snug break-words whitespace-pre-wrap"'
);

// Link Subtitle
code = code.replace(
    'className="text-[8px] text-emerald-200 dark:text-emerald-100/80 mt-0.5 break-words whitespace-normal"',
    'className="text-[9px] text-emerald-200 dark:text-emerald-100/80 mt-0.5 break-words whitespace-pre-wrap leading-tight"'
);

// Link URL
code = code.replace(
    'className="text-[8px] text-emerald-300 dark:text-emerald-300 font-medium flex items-center gap-1 mt-0.5 break-words whitespace-normal"',
    'className="text-[9px] text-emerald-300 dark:text-emerald-300 font-medium flex items-center gap-1 mt-0.5 break-words whitespace-pre-wrap leading-tight"'
);

// Fix AHU Logo height to fit any content or keep it fixed but align top
code = code.replace(
    'className="w-10 h-10 bg-[#002845] rounded-md flex flex-col items-center justify-center shrink-0 border border-amber-400/50 shadow-xs p-1"',
    'className="w-12 h-12 bg-[#002845] rounded-md flex flex-col items-center justify-center shrink-0 border border-amber-400/50 shadow-xs p-1"'
);

// Fix link card header padding and alignment
code = code.replace(
    'border border-black/10 flex gap-1 items-center overflow-visible max-w-full',
    'border border-black/10 flex gap-2 items-start overflow-visible max-w-full'
);

// Fix encryption notice text wrapping
code = code.replace(
    '<span className="font-bold underline cursor-pointer">Learn more</span>',
    ' <span className="font-bold underline cursor-pointer whitespace-nowrap">Learn more</span>'
);

// Remove max-w-[83%] from message bubble to give it more space
code = code.replace(
    'className="relative max-w-[83%] flex items-start gap-1"',
    'className="relative max-w-[90%] flex items-start gap-1"'
);

fs.writeFileSync('src/components/PhonePreview.tsx', code, 'utf8');
console.log('patched PhonePreview layout');
