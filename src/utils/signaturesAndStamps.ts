
export function generateSignatureSvg(name: string, seed: number): string {
    const width = 150;
    const height = 60;
    
    function random() {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }
    
    let path = `M ${10 + random()*10} ${30 + random()*20} `;
    
    for(let i=0; i<4; i++) {
        const cp1x = 20 + i*30 + random()*20;
        const cp1y = random() * 10;
        const cp2x = 30 + i*30 + random()*20;
        const cp2y = 50 + random() * 10;
        const x = 40 + i*30 + random()*10;
        const y = 30 + random()*20;
        path += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y} `;
    }
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <path d="${path}" fill="none" stroke="#000044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <text x="75" y="45" font-family="cursive" font-style="italic" font-size="16" fill="#000044" opacity="0.4" text-anchor="middle" transform="rotate(-5 75 45)">${name.substring(0, 15)}</text>
    </svg>`;
    
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

export const LOGO_KEMENKUMHAM_SVG = 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Logo_of_the_Ministry_of_Law_and_Human_Rights_of_the_Republic_of_Indonesia.svg';

export const STAMP_BHP_MEDAN_SVG = 'data:image/svg+xml;utf8,<svg></svg>';
export const STAMP_KEPALA_BHP_SVG = 'data:image/svg+xml;utf8,<svg></svg>';
export const SIGNATURE_SYAFRIADI_SVG = generateSignatureSvg('Syafriadi', 101);
export const SIGNATURE_SYAFRIADI_STAMP_SVG = 'data:image/svg+xml;utf8,<svg></svg>';
export const SIGNATURE_ELSINTHA_SVG = generateSignatureSvg('Elsintha', 105);
export const SIGNATURE_SITI_ROSLINA_SVG = generateSignatureSvg('Siti Roslina', 106);
export const SIGNATURE_TAUFIK_SVG = generateSignatureSvg('Taufik', 107);
export const SIGNATURE_BUDIYANTO_SVG = generateSignatureSvg('Budiyanto', 104);
export const SIGNATURE_SHELA_NATASHA_SVG = generateSignatureSvg('Shela', 103);
export const SIGNATURE_SYUHADA_SVG = generateSignatureSvg('Syuhada', 102);
export const SIGNATURE_WALI_SVG = 'data:image/svg+xml;utf8,<svg></svg>';
export const SIGNATURE_PENGAMPU_SVG = 'data:image/svg+xml;utf8,<svg></svg>';
export const SIGNATURE_OFFICER_1_SVG = 'data:image/svg+xml;utf8,<svg></svg>';
export const SIGNATURE_OFFICER_2_SVG = 'data:image/svg+xml;utf8,<svg></svg>';
export const SIGNATURE_ABSTRACT_4_SVG = 'data:image/svg+xml;utf8,<svg></svg>';
export const SIGNATURE_ABSTRACT_5_SVG = 'data:image/svg+xml;utf8,<svg></svg>';

export interface OfficialOfficer {
  id: string;
  name: string;
  nama?: string;
  jabatan?: string;
  nip: string;
  role: string;
  title: string;
  signatureSvg: string;
}

export const OFFICIAL_BHP_OFFICERS: OfficialOfficer[] = [
  { id: 'syafriadi', name: 'Syafriadi, S.H., M.H.', nip: '19700101 199503 1 001', role: 'Kepala BHP Medan', title: 'Ketua BHP', signatureSvg: SIGNATURE_SYAFRIADI_SVG },
  { id: 'syuhada', name: 'Syuhada, S.H.', nip: '19800101 200503 1 001', role: 'Anggota Pengawas', title: 'Anggota', signatureSvg: SIGNATURE_SYUHADA_SVG },
  { id: 'shela_natasha', name: 'Shela Natasha, S.H.', nip: '19900101 201503 2 001', role: 'Anggota Pengawas', title: 'Anggota', signatureSvg: SIGNATURE_SHELA_NATASHA_SVG },
  { id: 'budiyanto', name: 'Budiyanto, S.H.', nip: '19850101 201003 1 001', role: 'Anggota Pengawas', title: 'Anggota', signatureSvg: SIGNATURE_BUDIYANTO_SVG },
  { id: 'elsintha', name: 'Elsintha, S.H.', nip: '19920101 201703 2 001', role: 'Anggota Pengawas', title: 'Anggota', signatureSvg: SIGNATURE_ELSINTHA_SVG },
  { id: 'siti_roslina', name: 'Siti Roslina, S.H.', nip: '19880101 201303 2 001', role: 'Anggota Pengawas', title: 'Anggota', signatureSvg: SIGNATURE_SITI_ROSLINA_SVG },
  { id: 'taufik', name: 'Taufik, S.H.', nip: '19820101 200703 1 001', role: 'Anggota Pengawas', title: 'Anggota', signatureSvg: SIGNATURE_TAUFIK_SVG },
];

export interface VectorSignatureItem {
  id: string;
  name: string;
  svgDataUrl: string;
  tags: string[];
  category?: string;
  title?: string;
  roleTitle?: string;
  nip?: string;
  seksi?: string;
}

export const VECTOR_SIGNATURE_DATABASE: VectorSignatureItem[] = [];

export function getSavedCustomSignature(targetId: string): string | null {
  try {
    const saved = localStorage.getItem('sapa_wali_signatures');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed[targetId] || null;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

export function generateColoredVectorSvg(dataUrl: string, hexColor: string): string {
  if (!dataUrl || !dataUrl.startsWith('data:image/svg+xml')) return dataUrl;
  try {
    const decoded = decodeURIComponent(dataUrl.replace('data:image/svg+xml;utf8,', ''));
    const recolored = decoded
      .replace(/stroke="#[0-9a-fA-F]{3,6}"/g, `stroke="\${hexColor}"`)
      .replace(/fill="#[0-9a-fA-F]{3,6}"/g, `fill="\${hexColor}"`);
    return `data:image/svg+xml;utf8,\${encodeURIComponent(recolored)}`;
  } catch (e) {
    return dataUrl;
  }
}

export function generateDynamicWaliSignature(namaWali: string, isPengampuan: boolean): string {
  // Use ultra-lightweight text signature to avoid PDF bloat
  const name = namaWali ? namaWali.substring(0, 15) : 'Wali';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 60" width="150" height="60">
      <text x="75" y="35" font-family="cursive, sans-serif" font-style="italic" font-size="24" fill="#000044" opacity="0.6" text-anchor="middle">${name}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
export function getAssignedOfficerForRecord(record: any): OfficialOfficer {
  return OFFICIAL_BHP_OFFICERS.find(o => o.id === 'syuhada') || OFFICIAL_BHP_OFFICERS[0];
}
