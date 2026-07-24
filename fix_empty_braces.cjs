const fs = require('fs');
let code = fs.readFileSync('src/components/OfficialDocumentTemplates.tsx', 'utf8');

// The remove_all_img.cjs left behind empty JSX expressions like:
// {stampSrc && (
//   <div className="h-20"></div> // Wait, the previous script removed the img, but maybe the <div> was around it?
// )}
// Let's replace any empty `{stampSrc && (\s*)}` with nothing.
code = code.replace(/\{stampSrc && \(\s*\)\}/g, '');

// Also let's check for any remaining <img that we wanted to remove
// The user wanted to remove all signatures. I removed alt="*TTD*" and alt="*Stempel*".
// Let's also remove `Tanda Tangan BHP Medan` if there are any.
code = code.replace(/<img[^>]*alt="[^"]*Tanda Tangan[^"]*"[^>]*\/>/g, '');

fs.writeFileSync('src/components/OfficialDocumentTemplates.tsx', code, 'utf8');
console.log('Fixed empty braces and Tanda Tangan imgs');
