import html2canvas from 'html2canvas';

export async function captureFullElement(element: HTMLElement, isDarkMode: boolean): Promise<HTMLCanvasElement> {
  // Clone the element
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Set styles to ensure it renders fully without clipping
  clone.style.position = 'absolute';
  clone.style.top = '-9999px';
  clone.style.left = '0';
  clone.style.width = element.offsetWidth + 'px';
  clone.style.height = 'auto'; // allow it to expand
  clone.style.transform = 'none';
  clone.style.maxHeight = 'none';
  clone.style.overflow = 'visible';
  
  // Remove rounded corners or anything that might clip in html2canvas if needed
    // Strip problematic classes from the root clone
  clone.className = clone.className.replace(/overflow-hidden/g, 'overflow-visible');
  clone.className = clone.className.replace(/max-h-[^s]+/g, '');
  clone.className = clone.className.replace(/h-fit/g, 'h-auto');
  clone.className = clone.className.replace(/min-h-[^s]+/g, '');
  clone.style.borderRadius = '0';
  clone.style.overflow = 'visible';
  
  // Append to body
  document.body.appendChild(clone);
  
  // Wait a tick for styles to apply
  await new Promise(r => setTimeout(r, 100));
  
  try {
    const canvas = await html2canvas(clone, {
      scale: 1.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: isDarkMode ? '#0b141a' : '#efeae2',
      logging: false,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight
    });
    return canvas;
  } finally {
    document.body.removeChild(clone);
  }
}
