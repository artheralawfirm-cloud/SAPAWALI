import { SapaWaliRecord } from '../types';
import { getRecordFormDateIndonesian } from '../data/sapaWaliData';
import { getAssignedOfficerForRecord, OfficialOfficer } from './signaturesAndStamps';

/**
 * Determines whether a guardian (wali/pengampu) should be addressed as "Bapak" or "Ibu"
 * based on relationship terms and Indonesian naming conventions.
 */
export function getWaliHonorific(record: SapaWaliRecord): 'Bapak' | 'Ibu' {
  const name = (record.namaWali || '').toLowerCase();
  const hub = (record.hubungan || '').toLowerCase();

  // Explicit male keywords in full name
  const maleKeywords = [
    'sabaruddin', 'muhammad', 'muhamad', 'm.', 'm ', 'syahrial', 'hendra', 'agus',
    'herman', 'irwan', 'budi', 'budy', 'ahmad', 'amir', 'andi', 'anton', 'aris', 'bambang',
    'deni', 'dedy', 'dwi', 'eko', 'edy', 'fajar', 'firman', 'gunawan', 'harto',
    'haryono', 'indra', 'joko', 'lukman', 'lukmanul', 'ridwan', 'rizal', 'rudi', 'rusli',
    'slamet', 'sugeng', 'supri', 'wahyu', 'wawan', 'yudi', 'yusuf', 'zulkifli',
    'aji', 'alamsyah', 'abdul', 'ali', 'amiruddin', 'anwar', 'arifin', 'azhar',
    'darmawan', 'effendi', 'faisal', 'fauzi', 'hamzah', 'hasan', 'hidayat', 'husin',
    'ibrahim', 'ismail', 'kamal', 'khairul', 'mansyur', 'marzuki', 'mustafa',
    'nasution', 'nurdin', 'rahman', 'ramli', 'saiful', 'saleh', 'samsul', 'syafruddin',
    'syaful', 'syamsuddin', 'taufik', 'usman', 'zainal', 'zainuddin', 'pirman', 'demsar',
    'japet', 'ilham', 'junaidi', 'jauhari', 'hariawan', 'ismanto', 'taufiqurrahman',
    'hendriyanto', 'rizki', 'albertus', 'togap', 'frans', 'djamin', 'ronaldo',
    'iwan', 'sarmedi', 'urip', 'hassan', 'sophian', 'alam'
  ];

  // 1. If name contains 'binti' -> Female ('Ibu')
  if (name.includes('binti')) {
    return 'Ibu';
  }

  // 2. If name contains 'bin' or ' h ' or ' h.' or explicit male keyword -> Male ('Bapak')
  if (/\bbin\b/i.test(name) || name.startsWith('h ') || name.startsWith('h.') || name.startsWith('dr ') || name.startsWith('dr.')) {
    return 'Bapak';
  }

  for (const kw of maleKeywords) {
    if (name.includes(kw)) {
      return 'Bapak';
    }
  }

  // 3. Explicit male relationship terms
  if (
    hub.includes('ayah') ||
    hub.includes('bapak') ||
    hub.includes('suami') ||
    hub.includes('paman') ||
    hub.includes('kakek') ||
    hub.includes('abang') ||
    hub.includes('laki')
  ) {
    return 'Bapak';
  }

  // 4. Explicit female relationship terms
  if (
    hub.includes('ibu') ||
    hub.includes('istri') ||
    hub.includes('bibi') ||
    hub.includes('tante') ||
    hub.includes('nenek') ||
    hub.includes('perempuan') ||
    hub.includes('saudari')
  ) {
    return 'Ibu';
  }

  // Default to Ibu if no male indicators found
  return 'Ibu';
}

/**
 * Converts numbers (1-31) to Indonesian word strings (e.g., 3 -> Tiga, 25 -> Dua Puluh Lima)
 */
export function numberToIndonesianWords(num: number): string {
  const units = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'];
  if (num < 12) return units[num];
  if (num < 20) return units[num - 10] + ' Belas';
  if (num < 100) {
    const tens = Math.floor(num / 10);
    const remainder = num % 10;
    return units[tens] + ' Puluh' + (remainder > 0 ? ' ' + units[remainder] : '');
  }
  return num.toString();
}

/**
 * Parses a date string like "3 Maret 2026" or "2026-03-03" into formal Indonesian spelled-out day/date words for Berita Acara.
 */
export function parseDateToBAWords(dateStr: string): {
  hariStr: string;
  tanggalTerbilang: string;
  bulanStr: string;
  tahunTerbilang: string;
  fullDateFormatted: string;
} {
  // Default values
  let hariStr = 'Selasa';
  let dayNum = 3;
  let bulanStr = 'Maret';
  let yearNum = 2026;

  if (dateStr) {
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length >= 3) {
      dayNum = parseInt(parts[0], 10) || 3;
      bulanStr = parts[1] || 'Maret';
      yearNum = parseInt(parts[2], 10) || 2026;
    }
  }

  // Determine Day Name
  const monthsMap: { [key: string]: number } = {
    januari: 0, februari: 1, maret: 2, april: 3, mei: 4, juni: 5,
    juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11
  };
  const mIndex = monthsMap[bulanStr.toLowerCase()] ?? 2;
  const dObj = new Date(yearNum, mIndex, dayNum);
  const daysArr = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'];
  if (!isNaN(dObj.getDay())) {
    hariStr = daysArr[dObj.getDay()];
  }

  const tanggalTerbilang = numberToIndonesianWords(dayNum);
  const tahunTerbilang = 'Dua Ribu Dua Puluh ' + numberToIndonesianWords(yearNum - 2020);
  const fullDateFormatted = `${dayNum} ${bulanStr} ${yearNum}`;

  return {
    hariStr,
    tanggalTerbilang,
    bulanStr,
    tahunTerbilang,
    fullDateFormatted
  };
}

/**
 * Generates unique Official Registration Number for Berita Acara
 */
export function generateBANumber(recordIndex: number): string {
  const baseNo = 410 + recordIndex;
  return `W2.AHU.AHU.1.AH.06.02-${baseNo}`;
}

/**
 * Formats data for Berita Acara (BA) Monitoring
 */
export function getBAMonitoringContent(record: SapaWaliRecord, recordIndex: number, overrideOfficer?: OfficialOfficer | null) {
  const isPengampuan = record.jenisWewenang && record.jenisWewenang.toLowerCase().includes('pengampuan');
  const formDate = record.tanggalForm || getRecordFormDateIndonesian(record);
  const dateInfo = parseDateToBAWords(formDate);

  const title = isPengampuan ? 'BERITA ACARA MONITORING PENGAMPU' : 'BERITA ACARA MONITORING WALI';
  const nomorBA = generateBANumber(recordIndex);

  const sapaanWali = getWaliHonorific(record);
  const subjekHak = isPengampuan ? 'orang dalam pengampuan' : 'anak yang belum dewasa';
  const subjekRole = isPengampuan ? 'pengampu' : 'wali';
  const subjekRoleCapital = isPengampuan ? 'Pengampu' : 'Wali';
  const objekNama = isPengampuan ? (record.namaAnak || 'Orang Terampu') : record.namaAnak;

  // Resolve assigned officer from CSV jfkk data or override
  const officer = overrideOfficer || getAssignedOfficerForRecord(record);

  // Age logic
  const ageStr = record.umurAnak ? `${record.umurAnak} tahun` : '13 tahun';
  const pekerjaanStr = record.pekerjaan || 'Wiraswasta';

  return {
    isPengampuan,
    title,
    nomorBA,
    dateInfo,
    sapaanWali,
    subjekRole,
    subjekRoleCapital,
    subjekHak,
    objekNama,
    ageStr,
    pekerjaanStr,
    alamat: record.alamat || 'Jalan Listrik No. 10 Medan',
    petugasNama: (officer as any).nama,
    petugasJabatan: (officer as any).jabatan,
    petugasNip: officer.nip,
    petugasSignatureSvg: officer.signatureSvg,
    officer,
    keteranganLengkap: record.hasilMonitoring || record.ringkasanPerwalian || 'Pengawasan berjalan dengan baik dan lancar.',
    tindakLanjut: record.tindakLanjut || 'Bahwa berdasarkan hasil monitoring, tidak ditemukan adanya indikasi penyalahgunaan kewenangan ataupun tindakan yang dapat merugikan hak maupun kepentingan subjek hukum.'
  };
}

