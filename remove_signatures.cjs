const fs = require('fs');

let code = fs.readFileSync('src/components/OfficialDocumentTemplates.tsx', 'utf8');

// We can replace the img tags for signatures with empty divs
// Examples:
// <div className="h-12 flex items-center justify-center my-0.5">
//    <img src={waliSigSrc} alt="TTD Wali" className="h-10 w-auto object-contain z-20 relative " />
// </div>
// Let's replace the whole div that contains the img with just <div className="h-16"></div>

code = code.replace(/<div className="[^"]*h-12[^"]*">\s*<img[^>]*TTD[^>]*>\s*<\/div>/g, '<div className="h-16"></div>');
code = code.replace(/<div className="[^"]*h-16[^"]*">\s*<img[^>]*TTD[^>]*>\s*<\/div>/g, '<div className="h-20"></div>');
code = code.replace(/<div className="[^"]*h-16[^"]*">\s*<img[^>]*Stempel[^>]*>\s*<\/div>/g, '<div className="h-20"></div>');
code = code.replace(/<div className="[^"]*h-12[^"]*">\s*<img[^>]*Stempel[^>]*>\s*<\/div>/g, '<div className="h-20"></div>');

fs.writeFileSync('src/components/OfficialDocumentTemplates.tsx', code, 'utf8');
console.log('Removed all signature images');
