import { SapaWaliRecord, ChatMessage } from '../types';
import { getWaliHonorific } from '../utils/officialDocumentHelpers';

export const RAW_SAPA_WALI_DATA: SapaWaliRecord[] = [
  {
    id: 1,
    no: 1,
    nik: "1205076307830003",
    namaWali: "Sarita Dewi",
    tanggalPermohonan: "11 Februari 2026",
    nomorPenetapan: "Tidak ada (Pengurusan SKHW)",
    tanggalPenetapan: "-",
    namaPengadilan: "-",
    provinsi: "Sumatera Utara",
    kotaKab: "Langkat",
    hubungan: "Ibu Kandung",
    alamat: "Jl. Perniagaan No. 9, Kel. Stabat Baru, Kec. Stabat, Kab. Langkat, Sumatera Utara",
    noHp: "081269352265",
    namaAnak: "Naveetha Trisha Devi (P)",
    tanggalLahirAnak: "23 Juni 2021",
    tanggalBerakhirPengawasan: "23 Juni 2042",
    riwayatPerwalian: "Pengawasan",
    seksi: "Wilayah 2",
    jfkk: "Nanang",
    lokasiBerkas: "Lemari besi Wilayah II",
    status: "Pengawasan",
    jenisWewenang: "Perwalian"
  },
  {
    id: 2,
    no: 2,
    nik: "1276025401860002",
    namaWali: "Sawitri",
    tanggalPermohonan: "09 Maret 2026",
    nomorPenetapan: "Tidak ada (Pengurusan SKHW)",
    tanggalPenetapan: "-",
    namaPengadilan: "-",
    provinsi: "Sumatera Utara",
    kotaKab: "Medan",
    hubungan: "Ibu Kandung",
    alamat: "Jl. Sunggal Lingkungan 12, Komplek Sunggal Asri No. 9B, Kel. Sunggal, Kec. Medan Sunggal",
    noHp: "081361619966",
    namaAnak: "Nitiya Reweti (P), Siwarasen (L), Isika Dewi (P)",
    tanggalLahirAnak: "06 Agustus 2011",
    tanggalBerakhirPengawasan: "06 Agustus 2032",
    riwayatPerwalian: "Pengawasan",
    seksi: "Wilayah 2",
    jfkk: "Nanang",
    lokasiBerkas: "Lemari Besi Wilayah II",
    status: "Pengawasan",
    jenisWewenang: "Perwalian"
  },
  {
    id: 3,
    no: 3,
    nik: "1271167003770003",
    namaWali: "Wijaya Santi",
    tanggalPermohonan: "07 April 2026",
    nomorPenetapan: "Tidak ada (Pengurusan SKHW)",
    tanggalPenetapan: "-",
    namaPengadilan: "-",
    provinsi: "Sumatera Utara",
    kotaKab: "Medan",
    hubungan: "Ibu Kandung",
    alamat: "Jl. Mawar Gang Buntu No. 2-A, Kel. Sarirejo, Kec. Medan Polonia, Kota Medan",
    noHp: "081245975471",
    namaAnak: "Ainkara Thirnau Karsu (L)",
    tanggalLahirAnak: "11 November 2011",
    tanggalBerakhirPengawasan: "11 November 2032",
    riwayatPerwalian: "Pengawasan",
    seksi: "Wilayah 2",
    jfkk: "Syuhada",
    lokasiBerkas: "Lemari Besi Wilayah II",
    status: "Pengawasan",
    jenisWewenang: "Perwalian"
  },
  {
    id: 4,
    no: 4,
    nik: "1271114809940002",
    namaWali: "Theresia Embun Dameria Nainggolan",
    tanggalPermohonan: "16 April 2026",
    nomorPenetapan: "Nomor 1626/Pdt.P/2025/PN Mdn",
    tanggalPenetapan: "08 Oktober 2025",
    namaPengadilan: "Pengadilan Negeri Medan",
    provinsi: "Sumatera Utara",
    kotaKab: "Medan",
    hubungan: "Kakak Kandung",
    alamat: "JL Bromo Lr. Sentosa No. 08 Lk. I, Kel. Tegal Sati II, Kec. Medan Area, Medan",
    noHp: "082161884008",
    namaAnak: "M. Obeth Daniel Nainggolan",
    tanggalLahirAnak: "21 Maret 2013",
    tanggalBerakhirPengawasan: "21 Maret 2031",
    riwayatPerwalian: "Pengawasan",
    seksi: "Wilayah 2",
    jfkk: "Syuhada",
    lokasiBerkas: "Lemari besi Wilayah II",
    status: "Pengawasan",
    jenisWewenang: "Perwalian"
  },
  {
    id: 5,
    no: 5,
    nik: "1271116202870005",
    namaWali: "Yenti",
    tanggalPermohonan: "21 April 2026",
    nomorPenetapan: "Tidak ada (Pengurusan SKHW)",
    tanggalPenetapan: "-",
    namaPengadilan: "-",
    provinsi: "Sumatera Utara",
    kotaKab: "Medan",
    hubungan: "Ibu Kandung",
    alamat: "Jalan Brigjen Zein Hamid Komplek Citra Baru No. 67 LK.IX, Kel. Titi Kuning, Medan",
    noHp: "081262429184",
    namaAnak: "Louise Cielolicca Davyenz, Eugenie Shelovicca Davyenz",
    tanggalLahirAnak: "18 April 2012",
    tanggalBerakhirPengawasan: "18 April 2033",
    riwayatPerwalian: "Pengawasan",
    seksi: "Wilayah 2",
    jfkk: "Syuhada, Nanang",
    lokasiBerkas: "Lemari Besi Wilayah II",
    status: "Pengawasan",
    jenisWewenang: "Perwalian"
  },
  {
    id: 6,
    no: 6,
    nik: "1371064909800001",
    namaWali: "Eva Silviani Binti Khaidir",
    tanggalPermohonan: "22 April 2026",
    nomorPenetapan: "20/Pdt.P/2026/PA. Pdg",
    tanggalPenetapan: "05 Maret 2026",
    namaPengadilan: "Pengadilan Agama Padang",
    provinsi: "Sumatera Barat",
    kotaKab: "Padang",
    hubungan: "Ibu Kandung",
    alamat: "Komplek Jala Utama 4 Blok F4 no. 17, RT 003 RW 006, Kel. Parak Laweh, Kec. Lubuk Begalung",
    noHp: "083837158820",
    namaAnak: "Devan Rivano Bin M. Nasri",
    tanggalLahirAnak: "28 Agustus 2015",
    tanggalBerakhirPengawasan: "28 Agustus 2033",
    riwayatPerwalian: "Pengawasan",
    seksi: "WIlayah 2",
    jfkk: "Syuhada, Nanang",
    lokasiBerkas: "Lemari Besi Wilayah II",
    status: "Pengawasan",
    jenisWewenang: "Perwalian"
  },
  {
    id: 7,
    no: 7,
    nik: "1306080607880001",
    namaWali: "Lukmanul Hakim Bin Baharuddin",
    tanggalPermohonan: "22 April 2026",
    nomorPenetapan: "31/Pdt.P/2026/PA. Pdg",
    tanggalPenetapan: "05 Maret 2026",
    namaPengadilan: "Pengadilan Agama Padang",
    provinsi: "Sumatera Barat",
    kotaKab: "Padang",
    hubungan: "Ayah Kandung",
    alamat: "Jalan Batung Taba No. 23, RT 003 RW 005, Kel. Batung Taba Nan XX, Kec. Lubuk Begalung",
    noHp: "085245836699",
    namaAnak: "Azka Hakim Alfarabi Bin Lukmanul Hakim, Fayza Hanindhiya Hakim",
    tanggalLahirAnak: "10 Juli 2015",
    tanggalBerakhirPengawasan: "10 Juli 2033",
    riwayatPerwalian: "Pengawasan",
    seksi: "WIlayah 2",
    jfkk: "Syuhada, Nanang",
    lokasiBerkas: "Lemari Besi Wilayah II",
    status: "Pengawasan",
    jenisWewenang: "Perwalian"
  },
  {
    id: 8,
    no: 8,
    nik: "1205044406870005",
    namaWali: "Intan Fitria Wahyuni, S.Pd Binti Edy Susanto",
    tanggalPermohonan: "05 Mei 2026",
    nomorPenetapan: "36/Pdt.P/2025/PA. Bji",
    tanggalPenetapan: "03 Juni 2025",
    namaPengadilan: "Pengadilan Agama Binjai",
    provinsi: "Sumatera Utara",
    kotaKab: "Binjai",
    hubungan: "Ibu Kandung",
    alamat: "Jln. Sumatera Gang Keluarga, Lk. VII, Damai, Binjai Utara, Kota Binjai",
    noHp: "082385572571",
    namaAnak: "M. Dioba Ar Rafa Islami, Aqishya Khalila Islami, Ashheqa Khaliqa Islami",
    tanggalLahirAnak: "06 Juni 2012",
    tanggalBerakhirPengawasan: "06 Juni 2030",
    riwayatPerwalian: "Pengawasan",
    seksi: "Wilayah 2",
    jfkk: "Shella, Diba, Nanang",
    lokasiBerkas: "Lemari Besi Wilayah II",
    status: "Pengawasan",
    jenisWewenang: "Perwalian"
  },
  {
    id: 9,
    no: 9,
    nik: "1207236309840015",
    namaWali: "Neti Binti Jaridin",
    tanggalPermohonan: "05 Mei 2026",
    nomorPenetapan: "3/Pdt.P/2025/PA. Bji",
    tanggalPenetapan: "05 Februari 2025",
    namaPengadilan: "Pengadilan Agama Binjai",
    provinsi: "Sumatera Utara",
    kotaKab: "Binjai",
    hubungan: "Ibu Kandung",
    alamat: "Jl. Kemuning, Perumahan Griya Kemuning II No. A1, Kel. Jati Makmur, Kec. Binjai Utara",
    noHp: "085362725442",
    namaAnak: "Vanesha",
    tanggalLahirAnak: "02 Maret 2012",
    tanggalBerakhirPengawasan: "02 Maret 2030",
    riwayatPerwalian: "Pengawasan",
    seksi: "Wilayah 2",
    jfkk: "Shella, Diba, Nanang",
    lokasiBerkas: "Lemari Besi Wilayah II",
    status: "Pengawasan",
    jenisWewenang: "Perwalian"
  },
  {
    id: 10,
    no: 10,
    nik: "1275041511920003",
    namaWali: "Sophian Hendri Malau Bin Abdullah Malau",
    tanggalPermohonan: "05 Mei 2026",
    nomorPenetapan: "11Pdt.P/2025/PA. Bji",
    tanggalPenetapan: "19 Februari 2025",
    namaPengadilan: "Pengadilan Agama Binjai",
    provinsi: "Sumatera Utara",
    kotaKab: "Binjai",
    hubungan: "Paman Kandung",
    alamat: "Jl Danau Belida, No 25, Lk.III, Kel. Sumber Karya, Kec. Binjai Timur",
    noHp: "081361771188",
    namaAnak: "Risfi Fadrian Malau Bin Iwan Efendi Malau",
    tanggalLahirAnak: "19 Januari 2007",
    tanggalBerakhirPengawasan: "19 Januari 2028",
    riwayatPerwalian: "Pengawasan",
    seksi: "Wilayah 2",
    jfkk: "Annisa, Andre, Syuhada",
    lokasiBerkas: "Lemari Besi Wilayah II",
    status: "Pengawasan",
    jenisWewenang: "Perwalian"
  }
];

// Helper to expand and generate full 109 data list deterministically from register records
const EXTENDED_NAMES = [
  { nama: "Novi Harini Binti Misman", hp: "082164804339", anak: "Prabu Ahmad Sugianto Bin Sugianto", kab: "Binjai", tipe: "Perwalian" as const },
  { nama: "Candra Weni", hp: "081260121012", anak: "Dewi Marina, Aruna, Mega Warshini", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Sabaruddin Ahmad Lubis", hp: "081370201194", anak: "M. Nashiruddin Abdullah Lubis", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Yeni Maulida Pane", hp: "085270763800", anak: "Zihan Maika Ardiani", kab: "Batu Bara", tipe: "Perwalian" as const },
  { nama: "Rahmawati", hp: "08126290482", anak: "Afifah Syafira Siregar", kab: "Asahan", tipe: "Perwalian" as const },
  { nama: "H. Asmali Bin Ahmad Salim", hp: "08126449221", anak: "Hanan Azzikra", kab: "Tebing Tinggi", tipe: "Perwalian" as const },
  { nama: "Meliza Rani Nasution, S.E", hp: "081286126756", anak: "Carissa Amila Siregar", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Sari Madinah Tanjung", hp: "081260555522", anak: "Nazura Azari", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Anita Dewi", hp: "081260372428", anak: "Sarika Jayasri", kab: "Serdang Bedagai", tipe: "Perwalian" as const },
  { nama: "Rusmiati Binti Amat Ruslan", hp: "081269736598", anak: "Talita Sakhi Binti Muchrizad", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Sri Wulan Ningsih Binti Ramlan", hp: "082145751120", anak: "Adjie Bhagaskara Yurni", kab: "Binjai", tipe: "Perwalian" as const },
  { nama: "Amalia Purbaya Purba", hp: "081246839153", anak: "Azril Putra Vallia", kab: "Binjai", tipe: "Perwalian" as const },
  { nama: "Fenny", hp: "0811627537", anak: "Nathando Sanjaya Lincoln", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Lindawati", hp: "081264605799", anak: "Nicholas Hartanto", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Pirman Pandia", hp: "085260720940", anak: "Reka Sribina Br Pandia", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Demsar Pakpahan", hp: "087774645914", anak: "Benni Putra Marisi Pakpahan", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Sufiani", hp: "08197228545", anak: "Raphaeline Stanzah", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Novita Sari Sembiring", hp: "081360160744", anak: "Albert Einstein Ginting", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Tripena Br Sembiring", hp: "082276562497", anak: "Bima Pratama Tarigan", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Dewita Herawati Hasugian", hp: "081262308180", anak: "Christian Huygens Partogi Tua Nababan", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Nur Aisyah Br Perangin-Angin", hp: "081260566322", anak: "Trio Gatra Crumbu Sembiring", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "H Muhammad Yusuf Sabil", hp: "085362182577", anak: "Sakinah Eva Rahmadina Yusuf", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Budy Rahayu Alias Budi Rahayu", hp: "081260330033", anak: "Aulia Diva Sugesty Binti Suriyan", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Ilham Syahputra Harahap", hp: "081347803746", anak: "Rafi Athala Harahap", kab: "Pematang Siantar", tipe: "Perwalian" as const },
  { nama: "Japet Gunung Parulian Saragih", hp: "082160967302", anak: "Micael Gilbert Saragih", kab: "Pematang Siantar", tipe: "Perwalian" as const },
  { nama: "Iin Dorismawati Silaban", hp: "081370800670", anak: "Indry Victoria Silalahi", kab: "Pematang Siantar", tipe: "Perwalian" as const },
  { nama: "Nanci Siregar", hp: "082277782901", anak: "Malona Natalia Simanjuntak", kab: "Pematang Siantar", tipe: "Perwalian" as const },
  { nama: "Sairah, M.PSI Binti Mustofa", hp: "085158774118", anak: "Azman Rizvan Bin Machfi", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Junaidi Bin Juki", hp: "081265920804", anak: "Muhammad Hafizh Adila Bin Junaidi", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Amyuni Nurnasari Binti H. A Daud", hp: "082166231881", anak: "Muhammad Arfan Khalif", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Jauhari, S.H. Bin M. Sahri", hp: "085296113585", anak: "Kharidah Najla Binti Ahmad", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Citra Dewi", hp: "085260977777", anak: "Ishwari Chandani Devi", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Wijayashanti", hp: "081260451045", anak: "Sri Hari Haran", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Hariawan Bin Sulaiman", hp: "081372219244", anak: "Muhammad Akbar", kab: "Batam", tipe: "Perwalian" as const },
  { nama: "Sumiati Binti M Yusuf Nyak Leuh", hp: "085361971366", anak: "Suci Nabila Kolompis", kab: "Banda Aceh", tipe: "Perwalian" as const },
  { nama: "Intan Pandani Binti Hambali", hp: "08126976033", anak: "Nabila Binti Munizar", kab: "Banda Aceh", tipe: "Perwalian" as const },
  { nama: "Lindawaty", hp: "081260491049", anak: "Matthew Tanvier", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Nirmala SE", hp: "082166847437", anak: "N Sarwin Raj", kab: "Binjai", tipe: "Perwalian" as const },
  { nama: "Simerdip Kaur", hp: "081260521052", anak: "Jaanishka Taj Kaur", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Imelda Wahyuni Binti Drs. Majid Yusuf", hp: "081284826156", anak: "Muhammad Irsyad", kab: "Padang", tipe: "Perwalian" as const },
  { nama: "Ade Sarinarulita S.E", hp: "082174528071", anak: "Nayla Janeet Adejuna", kab: "Padang", tipe: "Perwalian" as const },
  { nama: "Ismanto", hp: "082280967053", anak: "Kiki Prastio", kab: "Kota Bengkulu", tipe: "Perwalian" as const },
  { nama: "Jasmaniar", hp: "085278619657", anak: "Albi Alvaro", kab: "Kampar", tipe: "Perwalian" as const },
  { nama: "Robingatun Binti Paeran", hp: "081260571057", anak: "Indah Rizkia Panca Puteri", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Limah", hp: "083163658730", anak: "Limahtjung Dewi", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Jayasri", hp: "082161365673", anak: "N Arya Kailas Nath", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Roslina", hp: "081377204970", anak: "Syarifah Raihan", kab: "Banda Aceh", tipe: "Perwalian" as const },
  { nama: "Taufiqurrahman Nasution", hp: "08126354888", anak: "Muhammad Nabel Al Hafizd", kab: "Tanjung Balai", tipe: "Perwalian" as const },
  { nama: "Narita Raj", hp: "081375801499", anak: "Velan Krishi Oberoi", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Meiliza Binti Drs. Adril", hp: "081260641064", anak: "Muhammad Tristan Fachrozi", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Illin Sasmitha Binti Legiman Jayus", hp: "081260651065", anak: "Aisyah Khumairoh Nasution", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Po Thin", hp: "081260661066", anak: "Jouvellyn Bricia Tan", kab: "Serdang Bedagai", tipe: "Perwalian" as const },
  { nama: "Hendriyanto", hp: "08127759006", anak: "Scarlette Lim Yoona Melaka", kab: "Batam", tipe: "Perwalian" as const },
  { nama: "Liasta Br Ginting", hp: "081260681068", anak: "Tora Eleazer Tarigan", kab: "Deli Serdang", tipe: "Perwalian" as const },
  { nama: "Rinizar", hp: "081266223223", anak: "Lativa Shavina Putri Zuhrizal", kab: "Padang", tipe: "Perwalian" as const },
  { nama: "Rini Wahyuni", hp: "082361945271", anak: "Muhammad Rizki Putra Ramadhan", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Jayanthi", hp: "083149053416", anak: "Jay Nitra", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Alam", hp: "085357525909", anak: "Cecilia Zakirah Seftianah", kab: "Bengkulu", tipe: "Perwalian" as const },
  { nama: "Nofitri", hp: "081267031073", anak: "Anisa Fadilah", kab: "Padang", tipe: "Perwalian" as const },
  { nama: "Reny Wardiani", hp: "081267076664", anak: "Laras Naira Fatimah", kab: "Padang", tipe: "Perwalian" as const },
  { nama: "Silahturrahmi Binti M Jamal", hp: "082267737930", anak: "Marisha Nur Asyifa", kab: "Banda Aceh", tipe: "Perwalian" as const },
  { nama: "Sri Kurniawati", hp: "085277152123", anak: "Nadia Khalisah", kab: "Aceh Besar", tipe: "Perwalian" as const },
  { nama: "Rosmina", hp: "081267771077", anak: "Ryan M. Hafid", kab: "Aceh Besar", tipe: "Perwalian" as const },
  { nama: "Ana Mujriyanti", hp: "081267781078", anak: "Rizqie Al Akmal", kab: "Aceh Besar", tipe: "Perwalian" as const },
  { nama: "Yarti", hp: "083168230283", anak: "Aprilliya", kab: "Pelalawan", tipe: "Perwalian" as const },
  { nama: "Sri Herawati", hp: "081270847272", anak: "Muhammad Amru Sabrito", kab: "Pelalawan", tipe: "Perwalian" as const },
  { nama: "Rosmiati", hp: "081279808129", anak: "Salihun Fatah", kab: "Banda Aceh", tipe: "Perwalian" as const },
  { nama: "Suryani Sjanie", hp: "081376711717", anak: "Risky Aditiya", kab: "Banda Aceh", tipe: "Perwalian" as const },
  { nama: "Ernila", hp: "081361373094", anak: "Nazwa Asyura Bin Zainal", kab: "Banda Aceh", tipe: "Perwalian" as const },
  { nama: "Safrida", hp: "081268841084", anak: "Elva Wirda", kab: "Aceh Besar", tipe: "Perwalian" as const },
  { nama: "Syarif Anni Djuneidy", hp: "081270847272", anak: "Rafid", kab: "Aceh Besar", tipe: "Perwalian" as const },
  { nama: "Idah Wahyuni Umri", hp: "081268861086", anak: "Nadin Zalika", kab: "Banda Aceh", tipe: "Perwalian" as const },
  { nama: "Innasrah", hp: "081268871087", anak: "Nurul Kamari", kab: "Banda Aceh", tipe: "Perwalian" as const },
  { nama: "Nurmadina", hp: "082169878700", anak: "Siti Sintya Rahmawati", kab: "Dumai", tipe: "Perwalian" as const },
  { nama: "A Hun", hp: "081268255041", anak: "Indra Irawan", kab: "Dumai", tipe: "Perwalian" as const },
  { nama: "RR. Dessy Ditya Mardhani", hp: "081268901090", anak: "Nidya Aifa Siregar", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Mega Simangunsong", hp: "081268911091", anak: "Adelina Marselia Eunike", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Delince Tumangger", hp: "085369447080", anak: "Catherine Yulika Banurea", kab: "Pakpak Bharat", tipe: "Perwalian" as const },
  { nama: "Berliana Marpaung", hp: "081260888222", anak: "Berardy Shane Haposan", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Vera Romauli Saragih", hp: "081265012340", anak: "William Nathanael Silalahi", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Muhammad Rizki", hp: "081268951095", anak: "Fadel Pratama Rizki", kab: "Padang", tipe: "Perwalian" as const },
  { nama: "Susanti", hp: "081362786221", anak: "Kanha Balaaditya Valli", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Sopia Sinta Br Sinuhaji", hp: "082168616711", anak: "Radita Sumana", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Sherly Khatrin", hp: "081268981098", anak: "Raisya Khatrina Wilman", kab: "Padang", tipe: "Perwalian" as const },
  { nama: "Lince Sianipar", hp: "081268991099", anak: "Kristian Gonzales Sihombing", kab: "Dairi", tipe: "Perwalian" as const },
  { nama: "Rukyah Br Ginting", hp: "081269001100", anak: "Desry Ekang Ekinanti", kab: "Dairi", tipe: "Perwalian" as const },
  { nama: "Irma Mufida", hp: "081269011101", anak: "Muhammad Reyhan Al Ghaisan", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Suriyanti", hp: "082385389307", anak: "Karina Fabiola", kab: "Padang", tipe: "Perwalian" as const },
  { nama: "Albertus Simatupang", hp: "081269031103", anak: "Frumentia Berliana Cleary", kab: "Medan", tipe: "Perwalian" as const },
  { nama: "Nora Sarmila Dewi Panjaitan", hp: "085370091077", anak: "Ariel Ruth Agustin Aritonang", kab: "Pematang Siantar", tipe: "Pengampuan" as const },
  { nama: "Togap Lumban Gaol", hp: "081269451010", anak: "Elsa Evalina Putri Hutabarat", kab: "Medan", tipe: "Pengampuan" as const },
  { nama: "Frans Dinata Harianto", hp: "08126082099", anak: "Harianto Rusid", kab: "Deli Serdang", tipe: "Pengampuan" as const },
  { nama: "Dr Djamin Kartarino", hp: "0811642728", anak: "Nicholas Angelo Kartarino", kab: "Medan", tipe: "Pengampuan" as const },
  { nama: "Ronaldo Ginting RM", hp: "082282491009", anak: "Juanda Methusail Ginting", kab: "Binjai", tipe: "Pengampuan" as const },
  { nama: "Marlina Br Tarigan", hp: "081261051105", anak: "Nurdiana Br. Sitepu", kab: "Binjai", tipe: "Pengampuan" as const },
  { nama: "Husin", hp: "081261061106", anak: "Ani", kab: "Pekanbaru", tipe: "Pengampuan" as const },
  { nama: "Iwan Saputra, S.Kom", hp: "081361150488", anak: "Lily", kab: "Deli Serdang", tipe: "Pengampuan" as const },
  { nama: "Iwan Setiawan", hp: "081220697555", anak: "Efendi Gunawan", kab: "Padang", tipe: "Pengampuan" as const },
  { nama: "Sumarni", hp: "081260153659", anak: "Lilik Susanto", kab: "Deli Serdang", tipe: "Pengampuan" as const },
  { nama: "Sarmedi Purba", hp: "0811601526", anak: "Gertrud Bruckl Poerba", kab: "Pematang Siantar", tipe: "Pengampuan" as const },
  { nama: "Urip Winarto", hp: "082213867521", anak: "Sunarmi", kab: "Deli Serdang", tipe: "Pengampuan" as const },
  { nama: "Ile Asih Brahmana", hp: "08124118076", anak: "Jasa Brahmana", kab: "Medan", tipe: "Pengampuan" as const },
  { nama: "Heny", hp: "081361221805", anak: "Edi Suriyanto, Amd", kab: "Medan", tipe: "Pengampuan" as const },
  { nama: "SOI MOI TINAH (alias TINAH)", hp: "08126289600", anak: "Aman", kab: "Labuhanbatu Utara", tipe: "Pengampuan" as const },
  { nama: "Rosdiana Napitupulu", hp: "08126580399", anak: "Bintang Yohanes Ledang Pane", kab: "Medan", tipe: "Pengampuan" as const },
  { nama: "Betti Murni", hp: "081261151115", anak: "Pilipus Tarigan", kab: "Medan", tipe: "Pengampuan" as const },
  { nama: "Djuwarnah", hp: "081261161116", anak: "Defli Winata", kab: "Medan", tipe: "Pengampuan" as const },
  { nama: "Nurlaely Sabaniah", hp: "081261171117", anak: "Alfian Fathurrohman", kab: "Bengkulu", tipe: "Pengampuan" as const },
  { nama: "Deliana Br. Sihotang", hp: "081261181118", anak: "Riana Safitri Siregar", kab: "Medan", tipe: "Pengampuan" as const },
  { nama: "Hassan Fakhruddin", hp: "082384560312", anak: "Irmayeni", kab: "Padang", tipe: "Pengampuan" as const }
];

export function getRecordOnlineStatus(record: SapaWaliRecord): string {
  const blastTotalMins = 8 * 60 + 15 + ((record.no * 7) % 60);
  const replyTotalMins = blastTotalMins + 20 + ((record.no * 3) % 35);
  const ackTotalMins = replyTotalMins + 3;

  const variant = record.no % 5;
  if (variant === 0) {
    return 'online';
  } else if (variant === 1) {
    return `terakhir dilihat hari ini pukul ${formatTime(ackTotalMins + 4)}`;
  } else if (variant === 2) {
    return `terakhir dilihat hari ini pukul ${formatTime(ackTotalMins + 16)}`;
  } else if (variant === 3) {
    return `terakhir dilihat hari ini pukul ${formatTime(ackTotalMins + 32)}`;
  } else {
    const nightMin = 15 + (record.no * 3) % 40;
    return `terakhir dilihat kemarin pukul 21:${nightMin < 10 ? '0' + nightMin : nightMin}`;
  }
}

export function getFullSapaWaliDataset(): SapaWaliRecord[] {
  const result: SapaWaliRecord[] = [...RAW_SAPA_WALI_DATA];

  let nextId = RAW_SAPA_WALI_DATA.length + 1;
  for (const ext of EXTENDED_NAMES) {
    if (result.length >= 109) break;
    const tempRecord: SapaWaliRecord = {
      id: nextId,
      no: nextId,
      nik: `127${Math.floor(100000000000 + Math.random() * 899999999999)}`,
      namaWali: ext.nama,
      tanggalPermohonan: "2026-05-15",
      nomorPenetapan: ext.tipe === "Perwalian" ? "Penetapan Perwalian Resmi" : "Penetapan Pengampuan Resmi",
      tanggalPenetapan: "2026-04-10",
      namaPengadilan: `Pengadilan Negeri / Agama ${ext.kab}`,
      provinsi: "Sumatera Utara",
      kotaKab: ext.kab,
      hubungan: "",
      alamat: `Jl. Utama No. ${nextId}, ${ext.kab}`,
      noHp: ext.hp,
      namaAnak: ext.anak,
      tanggalLahirAnak: "2015-08-12",
      tanggalBerakhirPengawasan: "2033-08-12",
      riwayatPerwalian: "Pengawasan Active",
      seksi: "Wilayah 2",
      jfkk: "Tim SAPA WALI BHP Medan",
      lokasiBerkas: "Lemari besi Wilayah II",
      status: "Pengawasan",
      jenisWewenang: ext.tipe
    };

    const honorific = getWaliHonorific(tempRecord);
    tempRecord.hubungan = ext.tipe === "Perwalian"
      ? (honorific === "Bapak" ? "Ayah Kandung" : "Ibu Kandung")
      : "Anak Kandung";

    result.push(tempRecord);
    nextId++;
  }

  // Sort dataset chronologically by e-form delivery date
  const sorted = result.sort((a, b) => a.no - b.no);
  
  sorted.forEach((rec, idx) => {
    rec.no = idx + 1;
  });
  
  return sorted;
}

export const DEFAULT_LINK_PREVIEW = {
  title: "SAPA WALI - Monitoring Perwalian...",
  subtitle: "Please click the link to c...",
  url: "bit.ly",
  fullUrl: "https://bit.ly/PertanyaanMonitoringSAPAWALI"
};

// Official Workdays List (Mon-Fri between April 1, 2026 and July 10, 2026)
const WORKDAYS_LIST = [
  // April 2026
  "Apr 1, 2026", "Apr 2, 2026", "Apr 3, 2026",
  "Apr 6, 2026", "Apr 7, 2026", "Apr 8, 2026", "Apr 9, 2026", "Apr 10, 2026",
  "Apr 13, 2026", "Apr 14, 2026", "Apr 15, 2026", "Apr 16, 2026", "Apr 17, 2026",
  "Apr 20, 2026", "Apr 21, 2026", "Apr 22, 2026", "Apr 23, 2026", "Apr 24, 2026",
  "Apr 27, 2026", "Apr 28, 2026", "Apr 29, 2026", "Apr 30, 2026",
  // May 2026
  "May 1, 2026",
  "May 4, 2026", "May 5, 2026", "May 6, 2026", "May 7, 2026", "May 8, 2026",
  "May 11, 2026", "May 12, 2026", "May 13, 2026", "May 14, 2026", "May 15, 2026",
  "May 18, 2026", "May 19, 2026", "May 20, 2026", "May 21, 2026", "May 22, 2026",
  "May 25, 2026", "May 26, 2026", "May 27, 2026", "May 28, 2026", "May 29, 2026",
  // June 2026
  "Jun 1, 2026", "Jun 2, 2026", "Jun 3, 2026", "Jun 4, 2026", "Jun 5, 2026",
  "Jun 8, 2026", "Jun 9, 2026", "Jun 10, 2026", "Jun 11, 2026", "Jun 12, 2026",
  "Jun 15, 2026", "Jun 16, 2026", "Jun 17, 2026", "Jun 18, 2026", "Jun 19, 2026",
  "Jun 22, 2026", "Jun 23, 2026", "Jun 24, 2026", "Jun 25, 2026", "Jun 26, 2026",
  "Jun 29, 2026", "Jun 30, 2026",
  // July 2026 (up to July 10)
  "Jul 1, 2026", "Jul 2, 2026", "Jul 3, 2026",
  "Jul 6, 2026", "Jul 7, 2026", "Jul 8, 2026", "Jul 9, 2026", "Jul 10, 2026"
];

function formatTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const hStr = hours < 10 ? `0${hours}` : `${hours}`;
  const mStr = mins < 10 ? `0${mins}` : `${mins}`;
  return `${hStr}:${mStr}`;
}

export function getRecordBattery(record: SapaWaliRecord): number {
  return 65 + ((record.no * 17) % 32); // Battery percentage between 65% and 97%
}

export function getRecordWorkdayDates(record: SapaWaliRecord): { date1: string; date2: string } {
  const d = new Date("2026-04-01T00:00:00Z");
  // add (record.no - 1) days
  d.setDate(d.getDate() + (record.no - 1));
  const monthMap: { [key: number]: string } = {
    3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep'
  };
  const m = monthMap[d.getMonth()];
  const singleDate = `${m} ${d.getDate()}, 2026`;

  return {
    date1: singleDate,
    date2: singleDate
  };
}

export function getRecordFormDateIndonesian(record: SapaWaliRecord): string {
  const { date1 } = getRecordWorkdayDates(record);
  const parts = date1.trim().split(/\s+/);
  if (parts.length >= 3) {
    const monthMap: { [key: string]: string } = {
      'Jan': 'Januari', 'Feb': 'Februari', 'Mar': 'Maret', 'Apr': 'April',
      'May': 'Mei', 'Jun': 'Juni', 'Jul': 'Juli', 'Aug': 'Agustus',
      'Sep': 'September', 'Oct': 'Oktober', 'Nov': 'November', 'Dec': 'Desember'
    };
    const monthName = monthMap[parts[0]] || parts[0];
    const dayNum = parseInt(parts[1].replace(',', ''), 10);
    const yearNum = parts[2];
    return `${dayNum} ${monthName} ${yearNum}`;
  }
  return record.tanggalForm || "16 April 2026";
}

export function getRecordTopBarTime(record: SapaWaliRecord): string {
  const messages = createOfficialSapaWaliMessages(record);
  const lastMsg = [...messages].reverse().find(m => m.time);
  if (!lastMsg || !lastMsg.time) return '10:46';

  const [h, m] = lastMsg.time.split(':').map(Number);
  let totalMins = h * 60 + m + 2;
  if (totalMins > 15 * 60 + 55) {
    totalMins = 15 * 60 + 55;
  }
  return formatTime(totalMins);
}

export function getRealisticWaliReplyType(record: SapaWaliRecord) {
  const isPengampuan = record.jenisWewenang === 'Pengampuan';
  const labelObjek = isPengampuan ? "terampu" : "anak";
  const namaAnak = record.namaAnak;
  const kota = record.kotaKab || 'Medan';

  const typeIndex = record.no % 4; // 0: ok, 1: panjang, 2: nanya, 3: cuek

  if (typeIndex === 3) {
    return { type: 'cuek', text: '' };
  } else if (typeIndex === 2) {
    const nanyaVars = [
      `Maaf pak, untuk foto ${labelObjek} (${namaAnak}) apakah harus full body atau boleh pas foto saja?`,
      `Pagi pak, mau tanya kalau formnya diisi besok pagi boleh tidak ya? Anak saya lagi sekolah.`,
      `Pak, formnya ada kendala tidak bisa diakses, tulisannya error 404. Bagaimana ya?`,
      `Kalo alamatnya berubah karena saya pindah rumah, ngisinya gimana ya pak?`,
      `Maaf ganggu pak, ini yang di upload KK asli atau fotocopy ya?`
    ];
    return { type: 'nanya', text: nanyaVars[record.no % nanyaVars.length] };
  } else if (typeIndex === 1) {
    const panjangVars = [
      `Selamat pagi Bapak/Ibu Tim SAPA WALI BHP Medan. Terima kasih banyak atas informasinya. Saya sudah membaca pesan ini dengan seksama dan baru saja selesai mengisi formulir e-Monitoring sesuai dengan data terbaru anak saya, ${namaAnak}. Semua berkas termasuk foto kegiatan terbaru juga sudah berhasil saya unggah ke dalam sistem. Sekali lagi terima kasih atas bimbingannya selama ini, semoga seluruh tim BHP Medan sehat selalu dan dilancarkan tugas-tugasnya.`,
      `Pagi Pak. Alhamdulillah puji Tuhan, proses pengisian formulir e-monitoring untuk perwalian ${namaAnak} berjalan lancar. Saya sudah melampirkan foto dokumentasi terbaru saat kami di rumah. Terima kasih karena sistem SAPA WALI ini sangat memudahkan kami sebagai wali yang berada di ${kota}, jadi kami tidak perlu repot datang jauh-jauh ke Medan. Laporan sudah saya submit barusan pak.`,
      `Assalamualaikum Bapak/Ibu. Mohon izin melaporkan bahwa kami selaku wali dari ${namaAnak} telah melaksanakan kewajiban kami untuk mengisi e-form monitoring perwalian. Semua petunjuk sudah kami ikuti, dan foto kondisi terbaru ${labelObjek} juga sudah terlampir dengan baik. Terima kasih banyak atas perhatian dan pengawasan dari BHP Medan.`
    ];
    return { type: 'panjang', text: panjangVars[record.no % panjangVars.length] };
  } else {
    const okVars = [
      "Ok pak",
      "Siap laksanakan",
      "Baik pak, sudah diisi",
      "Sudah",
      "Oke makasih pak",
      "Sip"
    ];
    return { type: 'ok', text: okVars[record.no % okVars.length] };
  }
}

export function getRealisticWaliReplyText(record: SapaWaliRecord): string {
  const isPengampuan = record.jenisWewenang === 'Pengampuan';
  const labelObjek = isPengampuan ? "terampu" : "anak";
  const namaAnak = record.namaAnak;
  const no = record.no;
  const kota = record.kotaKab || 'Medan';

  const replyVariations = [
    `Selamat pagi. Baik terima kasih Tim SAPA WALI BHP Medan, e-form dan foto bersama ${labelObjek} (${namaAnak}) sudah selesai saya isi dan kirimkan.`,
    `Pagi Pak/Ibu. Sudah saya isi ya e-form monitoringnya barusan. Foto sama ${namaAnak} juga sudah diunggah. Makasih banyak ya pak.`,
    `Baik pak, formulirnya sudah saya lengkapi semua datanya beserta foto terbaru ${namaAnak}. Terima kasih atas perhatian Tim BHP Medan.`,
    `Pagi pak, e-form ${record.jenisWewenang.toLowerCase()} ${namaAnak} sudah selesai saya isi dan kirim. Mohon diperiksa ya pak, makasih.`,
    `Siap bu, tadi sudah langsung saya buka linknya dan isi data perwalian ${namaAnak}. Laporan e-form sudah terkirim ya.`,
    `Formulir E-Monitoring SAPA WALI sudah dikirim ya Pak. Foto dengan ${namaAnak} juga sudah dilampirkan. Terima kasih atas perhatiannya.`,
    `Alhamdulillah sudah selesai saya isi pak. Foto kegiatan perwalian ${namaAnak} juga sudah diupload di link form tadi. Semoga sehat selalu.`,
    `Sudah diisi pak e-form nya. Terima kasih bapak/ibu dari BHP Medan yang sudah mengingatkan dan memandu.`,
    `Laporan monitoring ${namaAnak} sudah saya kirim barusan pak via link bitly. Terima kasih banyak ya Pak/Ibu.`,
    `Sudah selesai dikirim pak formnya. Mohon infonya kalau ada berkas atau foto yang kurang ya pak. Salam dari ${kota}.`,
    `Baik Pak, e-form E-Monitoring untuk ${labelObjek} ${namaAnak} sudah saya isi dengan lengkap barusan. Terima kasih banyak.`,
    `Siap pak, sudah dikirim ya e-form nya. Salam untuk seluruh tim SAPA WALI BHP Medan.`,
    `Pagi pak, berkas dan e-monitoring ${namaAnak} sudah saya submit barusan. Terimakasih banyak atas infonya.`,
    `Sama-sama pak, tadi ${labelObjek} kami ${namaAnak} sudah difoto dan e-form nya sudah berhasil terkirim.`,
    `Sudah pak, barusan selesai diisi e-form nya. Terima kasih banyak atas perhatian BHP Medan untuk ${namaAnak}.`,
    `Selamat pagi Pak, form monitoring ${namaAnak} sudah dikirim ya bu/pak. Makasih banyak petunjuknya.`,
    `Halo pak, perwalian atas nama ${namaAnak} sudah diselesaikan pengisian e-form nya. Terimakasih atas koordinasinya.`,
    `Alhamdulillah sudah diisi pak. Foto terbaru bersama ${namaAnak} juga sudah disertakan dalam e-form tadi.`,
    `Pagi bu, e-form perwalian ${namaAnak} sudah beres diisi ya. Terima kasih respon cepatnya.`,
    `Sapa wali e-form nya sudah diisi pak. Maaf agak telat balasnya baru selesai urus berkas ${namaAnak}. Makasih pak.`,
    `Baik pak/bu, data monitoring perwalian ${namaAnak} sudah kita kirimkan via link tadi. Terima kasih banyak.`,
    `Sudah dikirim ya pak e-form nya. Sehat selalu untuk bapak dan ibu tim SAPA WALI BHP Medan.`,
    `Pagi pak, formulir E-Monitoring SAPA WALI untuk anak kami ${namaAnak} sudah lengkap diisi dan dikirim.`,
    `Sudah pak, terima kasih bapak ibu BHP Medan. Laporan perwalian ${namaAnak} sudah submit.`,
    `Siap bu, sudah saya isi e-form dan upload foto bersama ${namaAnak}. Semoga lancar administrasi perwaliannya.`,
    `Pagi pak, e-form nya sudah siap diisi. Terimakasih banyak untuk pelayanan SAPA WALI BHP Medan.`,
    `Alhamdulillah form sudah terkirim pak. Nanti kalau ada berkas yang perlu ditambah kabari ya pak.`,
    `Siang pak, laporan e-monitoring perwalian ${namaAnak} dari ${kota} sudah dikirim. Terimakasih.`,
    `Sudah diisi dan dikirim pak barusan. Terimakasih bapak/ibu SAPA WALI BHP Medan atas bimbingannya.`,
    `Pagi pak, berkat panduannya e-form ${namaAnak} sudah beres dikirim. Makasih ya pak.`,
    `Selamat pagi. E-form dan dokumen foto ${namaAnak} sudah kami kirimkan ya pak. Salam sehat.`,
    `Sudah diisi ya bu. Terima kasih sudah diingatkan tim SAPA WALI BHP Medan.`,
    `Baik pak, e-form monitoring perwalian ${namaAnak} sudah disubmit. Terimakasih banyak.`,
    `Pagi pak, e-form perwalian ${namaAnak} sudah kami isi lengkap. Sukses terus BHP Medan.`,
    `Sudah diisi pak. Foto bersama ${namaAnak} juga sudah di-upload di form e-monitoring. Makasih pak.`,
    `Sama-sama pak. E-form nya sudah saya selesaikan barusan. Salam sehat selalu untuk tim BHP Medan.`,
    `Siap Pak, laporan e-monitoring perwalian ${namaAnak} sudah dikirimkan via e-form. Terima kasih banyak.`
  ];

  const index = (no - 1) % replyVariations.length;
  return replyVariations[index];
}

export function getRealisticOfficerAckText(record: SapaWaliRecord): string {
  const sapaan = getWaliHonorific(record);
  const waliFirstName = record.namaWali.split(' ')[0];
  const no = record.no;

  const ackVariations = [
    `Baik ${sapaan} ${waliFirstName}, terima kasih banyak atas respon cepat dan kerja samanya. Laporan telah kami terima dengan baik. 🙏`,
    `Terima kasih ${sapaan} ${waliFirstName}. Data e-form monitoring sudah masuk ke sistem BHP Medan. Sehat selalu untuk keluarga. 🙏`,
    `Siap, terima kasih banyak ${sapaan} ${waliFirstName}. Laporan perwalian telah diverifikasi oleh tim SAPA WALI BHP Medan. 👍`,
    `Baik ${sapaan}, terima kasih atas kelengkapan e-form dan kerjasamanya. Salam hangat dari BHP Medan. 🙏`,
    `Alhamdulillah, terima kasih ${sapaan} ${waliFirstName}. Berkas e-form sudah tercatat lengkap. Selamat beraktivitas kembali. 🙏`,
    `Terima kasih responnya ${sapaan} ${waliFirstName}. Apabila ada pembaharuan data perwalian, tim kami siap membantu. Salam sehat. 🙏`,
    `Sama-sama ${sapaan} ${waliFirstName}. Terima kasih banyak atas partisipasi aktif dalam E-Monitoring SAPA WALI BHP Medan. 🙏`
  ];

  const index = (no - 1) % ackVariations.length;
  return ackVariations[index];
}

export function createOfficialSapaWaliMessages(record: SapaWaliRecord): ChatMessage[] {
  const isPengampuan = record.jenisWewenang === 'Pengampuan';
  const sapaan = getWaliHonorific(record);
  const labelPeran = isPengampuan ? "pengampu" : "wali";
  const waliFirstName = record.namaWali.split(' ')[0];

  const { date1 } = getRecordWorkdayDates(record);

  // Time calculations strictly within office hours (08:00 - 16:00)
  const blastTotalMins = 8 * 60 + 15 + ((record.no * 7) % 60);
  const replyTotalMins = blastTotalMins + 20 + ((record.no * 3) % 35);
  const ackTotalMins = replyTotalMins + 3;

  const tBlast = formatTime(blastTotalMins);
  const tReply = formatTime(replyTotalMins);
  const tAck = formatTime(ackTotalMins);

  const replyData = getRealisticWaliReplyType(record);
  const isCuek = replyData.type === 'cuek';
  const isNanya = replyData.type === 'nanya';

  const headerDate: ChatMessage = { id: `msg-date-1-${record.no}`, type: "date_header", text: date1 };
  const encNotice: ChatMessage = {
    id: `msg-enc-1-${record.no}`,
    type: "encryption_notice",
    text: "🔒 Messages and calls are end-to-end encrypted. Only people in this chat can read, listen to, or share them. Learn more"
  };

  const initialBlastMsg: ChatMessage = {
    id: `msg-out-1-${record.no}`,
    type: "outgoing",
    time: tBlast,
    status: isCuek ? (record.no % 2 === 0 ? "read" : "delivered") : "read",
    hasLinkCard: true,
    linkTitle: "SAPA WALI - Monitoring Perwalian & Pengampuan",
    linkSubtitle: "bit.ly",
    linkUrl: "bit.ly",
    text: `Selamat Pagi ${sapaan} ${waliFirstName},\n\nYth. ${sapaan} ${labelPeran},\nSemoga ${sapaan} sekeluarga sehat walafiat.\nKami dari Tim SAPA WALI BHP Medan.\n\nMohon mengisi e-Form Monitoring ${record.jenisWewenang}:\nhttps://bit.ly/sapa-wali-monitoring\n\nTerima kasih atas perhatian dan kerja samanya.`
  };

  let officerAckText = getRealisticOfficerAckText(record);
  if (isNanya) {
    officerAckText = "Baik bapak/ibu, silahkan dibaca panduan lengkapnya pada link di atas. Jika error mohon dicoba secara berkala atau menggunakan browser lain.";
  }

  const waliReplyMsg: ChatMessage = {
    id: `msg-inc-1-${record.no}`,
    type: "incoming",
    time: tReply,
    status: "read",
    text: replyData.text
  };

  const officerAckMsg: ChatMessage = {
    id: `msg-out-2-${record.no}`,
    type: "outgoing",
    time: tAck,
    status: "read",
    text: officerAckText
  };

  if (isCuek) {
    return [
      headerDate,
      encNotice,
      initialBlastMsg
    ];
  }

  return [
    headerDate,
    encNotice,
    initialBlastMsg,
    waliReplyMsg,
    officerAckMsg
  ];
}

