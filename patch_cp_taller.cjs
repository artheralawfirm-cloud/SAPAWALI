const fs = require('fs');
let code = fs.readFileSync('src/components/ControlPanel.tsx', 'utf8');

// Replace Nama Kontak Header input
const oldContactName = `            <input
              type="text"
              value={config.contactName}
              onChange={(e) => onChangeConfig({ ...config, contactName: e.target.value })}
              className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
            />`;

const newContactName = `            <textarea
              rows={4}
              value={config.contactName}
              onChange={(e) => onChangeConfig({ ...config, contactName: e.target.value })}
              className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-medium resize-y"
            />`;

code = code.replace(oldContactName, newContactName);

// Let's make message textarea 24 rows for incoming
code = code.replace(
  `rows={msg.type === 'incoming' && msg.hasLinkCard ? 14 : 5}`,
  `rows={msg.type === 'incoming' && msg.hasLinkCard ? 24 : 10}`
);

// Let's make Link Title 8 rows, subtitle 6 rows, url 6 rows
code = code.replace(
  `rows={4}\n                    value={msg.linkTitle || ''}`,
  `rows={8}\n                    value={msg.linkTitle || ''}`
);
code = code.replace(
  `rows={3}\n                    value={msg.linkSubtitle || ''}`,
  `rows={6}\n                    value={msg.linkSubtitle || ''}`
);
code = code.replace(
  `rows={3}\n                    value={msg.linkUrl || ''}`,
  `rows={6}\n                    value={msg.linkUrl || ''}`
);

fs.writeFileSync('src/components/ControlPanel.tsx', code, 'utf8');
console.log('patched CP to be much taller');
