const fs = require('fs');
let code = fs.readFileSync('src/components/ControlPanel.tsx', 'utf8');

// Change Contact Name to textarea
code = code.replace(
  `            <input
              type="text"
              value={config.contactName}
              onChange={(e) => onChangeConfig({ ...config, contactName: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />`,
  `            <textarea
              rows={3}
              value={config.contactName}
              onChange={(e) => onChangeConfig({ ...config, contactName: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 resize-y"
            />`
);

// Increase textarea rows for message text
code = code.replace(
  `              <textarea
                rows={msg.type === 'incoming' && msg.hasLinkCard ? 6 : 2}`,
  `              <textarea
                rows={msg.type === 'incoming' && msg.hasLinkCard ? 14 : 5}`
);

// Add fields for link details
const addLinkFields = `
              {msg.hasLinkCard && (
                <div className="mt-3 space-y-2 border-t border-slate-200 dark:border-slate-700 pt-2">
                  <label className="block text-xs font-semibold text-slate-500">Link Title (Kartu Link)</label>
                  <textarea
                    rows={4}
                    value={msg.linkTitle || ''}
                    onChange={(e) => handleMessageChange(msg.id, 'linkTitle', e.target.value)}
                    className="w-full p-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded focus:ring-1 focus:ring-emerald-500 font-sans"
                  />
                  <label className="block text-xs font-semibold text-slate-500">Link Subtitle</label>
                  <textarea
                    rows={3}
                    value={msg.linkSubtitle || ''}
                    onChange={(e) => handleMessageChange(msg.id, 'linkSubtitle', e.target.value)}
                    className="w-full p-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded focus:ring-1 focus:ring-emerald-500 font-sans"
                  />
                  <label className="block text-xs font-semibold text-slate-500">Link URL</label>
                  <textarea
                    rows={3}
                    value={msg.linkUrl || ''}
                    onChange={(e) => handleMessageChange(msg.id, 'linkUrl', e.target.value)}
                    className="w-full p-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded focus:ring-1 focus:ring-emerald-500 font-sans"
                  />
                </div>
              )}
`;

// Insert after the message text textarea
const insertTarget = `                className="w-full p-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded focus:ring-1 focus:ring-emerald-500 font-sans"
              />`;
              
code = code.replace(insertTarget, insertTarget + addLinkFields);

fs.writeFileSync('src/components/ControlPanel.tsx', code, 'utf8');
console.log('patched control panel');
