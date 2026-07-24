const fs = require('fs');
let code = fs.readFileSync('src/components/PhonePreview.tsx', 'utf8');

// Remove overflow-hidden from message body text container
code = code.replace(
    'className="whitespace-pre-wrap break-words text-[9.5px] leading-snug tracking-normal overflow-hidden max-w-full"',
    'className="whitespace-pre-wrap break-words text-[9.5px] leading-snug tracking-normal max-w-full"'
);

// Remove overflow-hidden from bubble container
code = code.replace(
    /className=\{\`relative rounded-xl p-1\.5 px-2 shadow-xs overflow-hidden max-w-full/g,
    'className={`relative rounded-xl p-1.5 px-2 shadow-xs overflow-visible max-w-full'
);

// Remove overflow-hidden from link card header
code = code.replace(
    /border border-black\/10 flex gap-1 items-center overflow-hidden max-w-full/g,
    'border border-black/10 flex gap-1 items-center overflow-visible max-w-full'
);

// Remove overflow-hidden from link metadata flex container
code = code.replace(
    /className="flex flex-col min-w-0 flex-1 overflow-hidden"/g,
    'className="flex flex-col min-w-0 flex-1 overflow-visible"'
);

// Remove truncate from link strings and add break-words
code = code.replace(
    /className="text-\[8\.5px\] font-bold text-white dark:text-white truncate leading-tight"/g,
    'className="text-[8.5px] font-bold text-white dark:text-white leading-tight break-words whitespace-normal"'
);

code = code.replace(
    /className="text-\[8px\] text-emerald-200 dark:text-emerald-100\/80 truncate mt-0\.5"/g,
    'className="text-[8px] text-emerald-200 dark:text-emerald-100/80 mt-0.5 break-words whitespace-normal"'
);

code = code.replace(
    /className="text-\[8px\] text-emerald-300 dark:text-emerald-300 font-medium flex items-center gap-1 mt-0\.5 truncate"/g,
    'className="text-[8px] text-emerald-300 dark:text-emerald-300 font-medium flex items-center gap-1 mt-0.5 break-words whitespace-normal"'
);

fs.writeFileSync('src/components/PhonePreview.tsx', code, 'utf8');
console.log('PhonePreview patched');
