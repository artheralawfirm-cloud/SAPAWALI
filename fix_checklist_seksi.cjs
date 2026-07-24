const fs = require('fs');

let ui = fs.readFileSync('src/components/OfficialDocumentTemplates.tsx', 'utf8');

const seksiLogic = "{record.seksi ? (record.seksi.toLowerCase().includes('1') || record.seksi.toLowerCase().includes('i') ? 'I' : 'II') : 'II'}";

ui = ui.replace(
  /<tr><td className="w-32 py-0\.5">Kepala Seksi<\/td><td className="w-2 py-0\.5">\:<\/td><td className="py-0\.5">Budiyanto, S\.H\.<\/td><\/tr>/g,
  `<tr><td className="w-40 py-0.5">Kepala Seksi HP Wilayah \${${seksiLogic}}</td><td className="w-2 py-0.5">:</td><td className="py-0.5">Budiyanto, S.H.</td></tr>`
);

ui = ui.replace(
  /<p className="font-semibold">Kepala Seksi HP Wilayah II<\/p>/g,
  `<p className="font-semibold">Kepala Seksi HP Wilayah {${seksiLogic}}</p>`
);

// Also replace the other td widths to w-40 to match
ui = ui.replace(/<td className="w-32 py-0\.5">Kepala\/JFKK Madya\*<\/td>/g, '<td className="w-40 py-0.5">Kepala/JFKK Madya*</td>');
ui = ui.replace(/<td className="w-32 py-0\.5">JFKK Muda<\/td>/g, '<td className="w-40 py-0.5">JFKK Muda</td>');
ui = ui.replace(/<td className="w-32 py-0\.5">JFKK Pertama<\/td>/g, '<td className="w-40 py-0.5">JFKK Pertama</td>');

fs.writeFileSync('src/components/OfficialDocumentTemplates.tsx', ui, 'utf8');
console.log('Fixed Checklist Seksi');
