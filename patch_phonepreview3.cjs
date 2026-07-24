const fs = require('fs');
let code = fs.readFileSync('src/components/PhonePreview.tsx', 'utf8');

// Fix the flex container for the contact info header to ensure it wraps correctly
code = code.replace(
    'className="flex items-center gap-1 min-w-0"',
    'className="flex items-center gap-1 min-w-0 flex-1"'
);

// Ensure the title wraps but has a max height or just wraps properly
// If we use flex-1 min-w-0, the text will wrap if it's long.

fs.writeFileSync('src/components/PhonePreview.tsx', code, 'utf8');
console.log('patched PhonePreview flex container');
