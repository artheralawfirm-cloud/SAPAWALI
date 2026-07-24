const fs = require('fs');
let ui = fs.readFileSync('src/components/OfficialDocumentTemplates.tsx', 'utf8');

// Replace the hardcoded JFKK names in the table with dotted lines
ui = ui.replace(
  /<td className="py-0\.5">\{content\.petugasNama\}<\/td>/g,
  '<td className="py-0.5">.........................................................</td>'
);
ui = ui.replace(
  /<td className="py-0\.5">Siti Roslina, S\.H\.<\/td>/g,
  '<td className="py-0.5">.........................................................</td>'
);
ui = ui.replace(
  /<td className="py-0\.5">Shela Natasha, S\.H\.<\/td>/g,
  '<td className="py-0.5">.........................................................</td>'
);

// For the signatures, let's keep the names or make them dotted?
// Actually, let's make them dotted too to match the template, EXCEPT Kepala Seksi and Kepala BHP.
// Wait, if I make them dotted, there's no dynamic signature for the officer...
// The prompt says "Sesuai data wali dan siapa jfkk dan seksinya agar format pun lebih sesuai"
// This means we SHOULD put the names based on the selected officer or jfkk string!
