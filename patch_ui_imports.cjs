const fs = require('fs');

let uiCode = fs.readFileSync('src/components/LegalReportsPageView.tsx', 'utf8');

if (!uiCode.includes("import { captureFullElement }")) {
    uiCode = uiCode.replace(
        "import { generateDocxForRecord } from '../utils/docxExporter';",
        "import { captureFullElement } from '../utils/screenshotUtils';\nimport { generateDocxForRecord } from '../utils/docxExporter';"
    );
}

fs.writeFileSync('src/components/LegalReportsPageView.tsx', uiCode, 'utf8');
console.log('patched UI imports');
