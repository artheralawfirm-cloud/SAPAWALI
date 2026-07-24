const fs = require('fs');

let ui = fs.readFileSync('src/components/OfficialDocumentTemplates.tsx', 'utf8');

// Remove NIP from template 1 (BA)
ui = ui.replace(/<p className="text-\[9pt\] font-medium text-slate-800">NIP\. 197205081998031001<\/p>/g, '');
ui = ui.replace(/<p className="text-\[9\.5pt\] font-medium text-slate-800">NIP\. \{content\.petugasNip\}<\/p>/g, '');
ui = ui.replace(/<p className="text-\[10pt\] font-medium text-slate-800">NIP\. \{content\.petugasNip\}<\/p>/g, '');
ui = ui.replace(/<p className="font-bold underline text-\[10\.5pt\] tracking-wide">\{content\.petugasNama\}<\/p>/g, '<p className="font-bold underline text-[10.5pt] tracking-wide mb-2">{content.petugasNama}</p>');
ui = ui.replace(/<p className="font-bold underline text-\[11pt\] tracking-wide">\{content\.petugasNama\}<\/p>/g, '<p className="font-bold underline text-[11pt] tracking-wide mb-2">{content.petugasNama}</p>');

fs.writeFileSync('src/components/OfficialDocumentTemplates.tsx', ui, 'utf8');
console.log('Removed NIPs');
