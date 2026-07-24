const fs = require('fs');
let code = fs.readFileSync('src/data/sapaWaliData.ts', 'utf8');

const regex = /export function getRecordWorkdayDates\([\s\S]*?return \{[\s\S]*?date2: singleDate\s*\};\s*\}/;

const newCode = `export function getRecordWorkdayDates(record: SapaWaliRecord): { date1: string; date2: string } {
  const d = new Date("2026-04-01T00:00:00Z");
  // add (record.no - 1) days
  d.setDate(d.getDate() + (record.no - 1));
  const monthMap: { [key: number]: string } = {
    3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep'
  };
  const m = monthMap[d.getMonth()];
  const singleDate = \`\${m} \${d.getDate()}, 2026\`;

  return {
    date1: singleDate,
    date2: singleDate
  };
}`;

if (code.match(regex)) {
    code = code.replace(regex, newCode);
    fs.writeFileSync('src/data/sapaWaliData.ts', code, 'utf8');
    console.log('patched getRecordWorkdayDates');
} else {
    console.log('failed to match getRecordWorkdayDates');
}
