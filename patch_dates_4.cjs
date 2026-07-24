const fs = require('fs');
let code = fs.readFileSync('src/data/sapaWaliData.ts', 'utf8');

const regex = /const sorted = result\.sort\([\s\S]*?return sorted;/;
const newCode = `const sorted = result.sort((a, b) => a.no - b.no);
  
  sorted.forEach((rec, idx) => {
    rec.no = idx + 1;
  });
  
  return sorted;`;

if (code.match(regex)) {
    code = code.replace(regex, newCode);
    fs.writeFileSync('src/data/sapaWaliData.ts', code, 'utf8');
    console.log('patched sorting in getFullSapaWaliDataset');
} else {
    console.log('failed to match sorting in getFullSapaWaliDataset');
}
