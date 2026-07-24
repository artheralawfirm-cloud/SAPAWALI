/**
 * Helper to fix Tailwind CSS v4 modern color function errors (oklch, oklab, lab, lch, color) in html2canvas.
 * html2canvas throws "Attempting to parse an unsupported color function"
 * when reading Tailwind CSS v4 variables or computed styles in stylesheets.
 */

function parseOklabArgs(content: string): { r: number; g: number; b: number; a: number } | null {
  try {
    // Strip nested var/calc text if any, leaving raw numbers
    const cleaned = content.replace(/var\([^)]+\)/gi, '0').replace(/calc\([^)]+\)/gi, '0');
    const normalized = cleaned.replace(/,/g, ' ').replace(/\//g, ' ').trim();
    const parts = normalized.split(/\s+/).filter(Boolean);
    if (parts.length < 3) return null;

    let l = parseFloat(parts[0]);
    if (parts[0].endsWith('%')) l /= 100;

    let a = parseFloat(parts[1]);
    if (parts[1].endsWith('%')) a /= 100;

    let b = parseFloat(parts[2]);
    if (parts[2].endsWith('%')) b /= 100;

    let alpha = 1;
    if (parts.length >= 4) {
      alpha = parseFloat(parts[3]);
      if (parts[3].endsWith('%')) alpha /= 100;
    }

    if (isNaN(l) || isNaN(a) || isNaN(b)) return null;

    const l_ = Math.pow(l + 0.3963377774 * a + 0.2158037573 * b, 3);
    const m_ = Math.pow(l - 0.1055613458 * a - 0.0638541728 * b, 3);
    const s_ = Math.pow(l - 0.0894841775 * a - 1.2914855480 * b, 3);

    const r_lin = +4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_;
    const g_lin = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_;
    const b_lin = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_;

    const transfer = (val: number) => {
      if (val <= 0.0031308) return 12.92 * val;
      return 1.055 * Math.pow(val, 1 / 2.4) - 0.055;
    };

    const r = Math.min(255, Math.max(0, Math.round(transfer(r_lin) * 255)));
    const g = Math.min(255, Math.max(0, Math.round(transfer(g_lin) * 255)));
    const bComp = Math.min(255, Math.max(0, Math.round(transfer(b_lin) * 255)));
    const aComp = isNaN(alpha) ? 1 : Math.min(1, Math.max(0, alpha));

    return { r, g, b: bComp, a: aComp };
  } catch {
    return null;
  }
}

function parseOklchArgs(content: string): { r: number; g: number; b: number; a: number } | null {
  try {
    const cleaned = content.replace(/var\([^)]+\)/gi, '0').replace(/calc\([^)]+\)/gi, '0');
    const normalized = cleaned.replace(/,/g, ' ').replace(/\//g, ' ').trim();
    const parts = normalized.split(/\s+/).filter(Boolean);
    if (parts.length < 3) return null;

    let l = parseFloat(parts[0]);
    if (parts[0].endsWith('%')) l /= 100;

    let c = parseFloat(parts[1]);
    if (parts[1].endsWith('%')) c /= 100;

    let h = parseFloat(parts[2]);
    if (parts[2].endsWith('rad')) h = (parseFloat(parts[2]) * 180) / Math.PI;

    let alpha = 1;
    if (parts.length >= 4) {
      alpha = parseFloat(parts[3]);
      if (parts[3].endsWith('%')) alpha /= 100;
    }

    if (isNaN(l) || isNaN(c) || isNaN(h)) return null;

    const hRad = (h * Math.PI) / 180;
    const a = c * Math.cos(hRad);
    const b = c * Math.sin(hRad);

    return parseOklabArgs(`${l} ${a} ${b} ${alpha}`);
  } catch {
    return null;
  }
}

/**
 * Replaces function calls with balanced parentheses matching.
 * e.g. "oklab(var(--foo) 0.1 0.2)" or "oklab(0.5 0.1 0.2 / 0.5)"
 */
function replaceColorFunction(cssText: string, funcName: string): string {
  const prefix = funcName.toLowerCase() + '(';
  let lowerCss = cssText.toLowerCase();
  let idx = 0;

  while (idx < cssText.length) {
    const startPos = lowerCss.indexOf(prefix, idx);
    if (startPos === -1) break;

    // Balance parenthesis
    let depth = 1;
    let endPos = startPos + prefix.length;
    while (endPos < cssText.length && depth > 0) {
      if (cssText[endPos] === '(') depth++;
      else if (cssText[endPos] === ')') depth--;
      endPos++;
    }

    if (depth === 0) {
      const innerContent = cssText.substring(startPos + prefix.length, endPos - 1);
      let replacement = 'rgb(120, 120, 120)';

      const fnNameLower = funcName.toLowerCase();
      if (fnNameLower === 'oklab') {
        const rgb = parseOklabArgs(innerContent);
        if (rgb) {
          replacement =
            rgb.a < 1
              ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a.toFixed(3)})`
              : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }
      } else if (fnNameLower === 'oklch') {
        const rgb = parseOklchArgs(innerContent);
        if (rgb) {
          replacement =
            rgb.a < 1
              ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a.toFixed(3)})`
              : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }
      } else if (fnNameLower === 'light-dark') {
        const firstVal = innerContent.split(',')[0] || '';
        replacement = replaceModernColorFunctions(firstVal.trim()) || 'rgb(255, 255, 255)';
      }

      cssText = cssText.substring(0, startPos) + replacement + cssText.substring(endPos);
      lowerCss = cssText.toLowerCase();
      idx = startPos + replacement.length;
    } else {
      break;
    }
  }

  return cssText;
}

export function replaceModernColorFunctions(cssText: string): string {
  if (!cssText) return '';

  let result = cssText;

  // 1. Balanced parenthesis replacements
  const funcs = ['oklab', 'oklch', 'light-dark', 'lab', 'lch', 'color', 'hwb'];
  funcs.forEach((fn) => {
    result = replaceColorFunction(result, fn);
  });

  // 2. Fallback regexes for any single line or multiline leftovers
  result = result.replace(/oklab\s*\([^)]*\)/gi, 'rgb(120, 120, 120)');
  result = result.replace(/oklch\s*\([^)]*\)/gi, 'rgb(120, 120, 120)');
  result = result.replace(/lab\s*\([^)]*\)/gi, 'rgb(120, 120, 120)');
  result = result.replace(/lch\s*\([^)]*\)/gi, 'rgb(120, 120, 120)');
  result = result.replace(/color\s*\([^)]*\)/gi, 'rgb(120, 120, 120)');
  result = result.replace(/hwb\s*\([^)]*\)/gi, 'rgb(120, 120, 120)');

  // 3. Absolute safety net - remove the identifier keywords
  result = result.replace(/oklab\b/gi, 'rgb');
  result = result.replace(/oklch\b/gi, 'rgb');

  return result;
}

export function sanitizeDocumentStyles(doc: Document = document): void {
  try {
    const styleElements = Array.from(doc.querySelectorAll('style'));
    styleElements.forEach((styleTag) => {
      const cssText = styleTag.textContent || '';
      if (/(?:oklab|oklch|lab|lch|color|hwb|light-dark)\s*\(/i.test(cssText) || /oklab|oklch/i.test(cssText)) {
        styleTag.textContent = replaceModernColorFunctions(cssText);
      }
    });

    const styledElements = Array.from(doc.querySelectorAll<HTMLElement>('[style]'));
    styledElements.forEach((el) => {
      const styleAttr = el.getAttribute('style');
      if (styleAttr && /(?:oklab|oklch|lab|lch|color|hwb|light-dark)\s*\(/i.test(styleAttr)) {
        el.setAttribute('style', replaceModernColorFunctions(styleAttr));
      }
    });
  } catch (e) {
    console.warn('Error sanitizing document styles:', e);
  }
}

export function sanitizeOklchInDoc(clonedDoc: Document): void {
  try {
    // 1. Clear adoptedStyleSheets if present to prevent html2canvas parsing modern CSS functions in adopted sheets
    if ('adoptedStyleSheets' in clonedDoc) {
      try {
        (clonedDoc as any).adoptedStyleSheets = [];
      } catch {}
    }
    if (clonedDoc.defaultView && 'adoptedStyleSheets' in clonedDoc.defaultView.document) {
      try {
        (clonedDoc.defaultView.document as any).adoptedStyleSheets = [];
      } catch {}
    }

    // 2. Sanitize all <style> elements directly in clonedDoc in-place
    const styleElements = Array.from(clonedDoc.querySelectorAll('style'));
    styleElements.forEach((style) => {
      if (style.textContent && /(?:oklab|oklch|lab|lch|color|hwb|light-dark)/i.test(style.textContent)) {
        style.textContent = replaceModernColorFunctions(style.textContent);
      }
    });

    // 3. Process <link rel="stylesheet"> elements in clonedDoc
    const linkElements = Array.from(clonedDoc.querySelectorAll('link[rel="stylesheet"]'));
    linkElements.forEach((link) => {
      try {
        const sheet = (link as HTMLLinkElement).sheet as CSSStyleSheet | null;
        if (sheet && sheet.cssRules) {
          let cssText = '';
          for (let i = 0; i < sheet.cssRules.length; i++) {
            cssText += sheet.cssRules[i].cssText + '\n';
          }
          if (cssText) {
            const newStyle = clonedDoc.createElement('style');
            newStyle.setAttribute('type', 'text/css');
            newStyle.textContent = replaceModernColorFunctions(cssText);
            if (link.parentNode) {
              link.parentNode.replaceChild(newStyle, link);
            }
          }
        }
      } catch {
        // Ignore cross-origin rules
      }
    });

    // 4. Sanitize inline styles on all elements in clonedDoc
    const styledElements = Array.from(clonedDoc.querySelectorAll<HTMLElement>('[style]'));
    styledElements.forEach((el) => {
      const styleAttr = el.getAttribute('style');
      if (styleAttr && /(?:oklab|oklch|lab|lch|color|hwb|light-dark)\s*\(/i.test(styleAttr)) {
        el.setAttribute('style', replaceModernColorFunctions(styleAttr));
      }
    });

    // 5. Strip phone outer bezel/frame, rounded corners, and shadow for crisp rectangular screenshot
    const chatFrame = clonedDoc.getElementById('whatsapp-chat-frame');
    if (chatFrame) {
      chatFrame.style.borderRadius = '0px';
      chatFrame.style.border = 'none';
      chatFrame.style.boxShadow = 'none';
      chatFrame.style.margin = '0px';
      chatFrame.style.outline = 'none';
    }
  } catch (e) {
    console.warn('Error in sanitizeOklchInDoc:', e);
  }
}





