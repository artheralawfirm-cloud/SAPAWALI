const fs = require('fs');
let ui = fs.readFileSync('src/components/OfficialDocumentTemplates.tsx', 'utf8');

const parseJfkk = `
  const jfkkList = record.jfkk ? record.jfkk.split(',').map(s => s.trim()) : [];
  const madyaName = jfkkList[0] || '.........................................................';
  const mudaName = jfkkList[1] || '.........................................................';
  const pertamaName = jfkkList[2] || '.........................................................';
`;

// Insert parseJfkk inside OfficialReportTableOfContentsView?
// No, it's inside OfficialReportTableOfContentsView, wait, no, the component is OfficialReportTableOfContentsView, wait! 
// Ah, Document 3 is `OfficialSopChecklistView` or `OfficialReportTableOfContentsView`?
// Let's check where the table is.
