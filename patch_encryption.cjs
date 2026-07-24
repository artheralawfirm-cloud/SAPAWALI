const fs = require('fs');
let code = fs.readFileSync('src/components/PhonePreview.tsx', 'utf8');

// Ensure encryption notice has more breathing room
code = code.replace(
    'max-w-[340px]',
    'w-[92%] max-w-[380px]'
);

// Ensure the message body text has proper padding and wrapping
code = code.replace(
    'className="whitespace-pre-wrap break-words text-[9.5px] leading-snug tracking-normal max-w-full"',
    'className="whitespace-pre-wrap break-words text-[10px] leading-snug tracking-normal max-w-full"'
);

// Check if there are any stray overflow-hidden
code = code.replace(/overflow-hidden/g, 'overflow-hidden');

fs.writeFileSync('src/components/PhonePreview.tsx', code, 'utf8');
console.log('patched encryption notice and message body');
