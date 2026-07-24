const fs = require('fs');
let code = fs.readFileSync('src/components/OfficialDocumentTemplates.tsx', 'utf8');

const oldStr = `<div className="transform scale-[0.85] origin-top">
            <PhonePreview
              config={{`;

const newStr = `<div className="w-full flex justify-center pb-8">
            <PhonePreview
              className="!w-[380px] origin-top"
              config={{`;

code = code.replace(oldStr, newStr);

fs.writeFileSync('src/components/OfficialDocumentTemplates.tsx', code, 'utf8');
console.log('patched doc1');
