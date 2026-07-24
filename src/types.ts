export type JenisWewenang = 'Perwalian' | 'Pengampuan';

export interface SapaWaliRecord {
  id: number;
  no: number;
  nik: string;
  namaWali: string;
  tanggalPermohonan: string;
  nomorPenetapan: string;
  tanggalPenetapan: string;
  namaPengadilan: string;
  provinsi: string;
  kotaKab: string;
  hubungan: string;
  alamat: string;
  noHp: string;
  namaAnak: string;
  tanggalLahirAnak: string;
  tanggalBerakhirPengawasan: string;
  riwayatPerwalian: string;
  seksi: string;
  jfkk: string;
  lokasiBerkas: string;
  status: string;
  jenisWewenang: JenisWewenang;
  tanggalForm?: string;
  noPenetapan?: string;
  customMessage?: string;
  umurAnak?: number;
  umurWali?: number;
  jenisKelaminAnak?: string;
  pekerjaan?: string;
  noHpWali?: string;
  hasilMonitoring?: string;
  ringkasanPerwalian?: string;
  tindakLanjut?: string;
  tipePesan?: 'text' | 'form';
}

export interface ChatMessage {
  id: string;
  type: 'date_header' | 'encryption_notice' | 'incoming' | 'outgoing';
  text?: string;
  time?: string;
  status?: 'sent' | 'delivered' | 'read';
  hasLinkCard?: boolean;
  linkTitle?: string;
  linkSubtitle?: string;
  linkUrl?: string;
}

export interface ChatConfig {
  contactName: string;
  phoneNumber: string;
  onlineStatus: string; // e.g. "Online", "ketik...", "Terakhir dilihat hari ini 09:42"
  avatarUrl?: string;
  isDarkMode: boolean;
  useAndroidFrame: boolean;
  batteryLevel: number;
  timeTopBar: string;
  messages: ChatMessage[];
}
