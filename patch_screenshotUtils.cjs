const fs = require('fs');
let code = fs.readFileSync('src/utils/screenshotUtils.ts', 'utf8');

const replacement = `  // Strip problematic classes from the root clone
  clone.className = clone.className.replace(/overflow-hidden/g, 'overflow-visible');
  clone.className = clone.className.replace(/max-h-[^\s]+/g, '');
  clone.className = clone.className.replace(/h-fit/g, 'h-auto');
  clone.className = clone.className.replace(/min-h-[^\s]+/g, '');
  clone.style.borderRadius = '0';
  clone.style.overflow = 'visible';`;

code = code.replace("// clone.style.borderRadius = '0';", replacement);
fs.writeFileSync('src/utils/screenshotUtils.ts', code, 'utf8');
console.log('patched screenshotUtils');
