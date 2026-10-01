// Generator slide paparan Kepala BHP Medan: RDP Komisi XIII DPR RI, RUU Profesi Kurator.
// Seluruh kalimat diambil dari dokumen Bahan Masukan BHP Medan (1 Oktober 2026).
// Jalankan: NODE_PATH=<folder node_modules> node build_slides.cjs
// Butuh: pptxgenjs, react, react-dom, react-icons, sharp.
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");

const NAVY = "14284B";
const GOLD = "E0A526";
const DARKGOLD = "8A6100";
const INK = "1A1A1A";
const SOFT = "EEF2F8";
const PAPER_BG = "E6ECF5";
const WHITE = "FFFFFF";
const MUTED = "4A5568";
const FONT = "Arial";
const W = 13.333;

async function icon(Comp, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Comp, { color: "#" + color, size: String(size) })
  );
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// "teks **tebal** teks" -> runs pptxgenjs; bagian bertanda ** ditebalkan dan berwarna navy.
function rich(str, base = {}) {
  return str.split("**").map((t, i) => ({
    text: t,
    options: i % 2 ? { ...base, bold: true, color: NAVY } : { ...base },
  })).filter((r) => r.text.length);
}

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in
pres.title = "Bahan Masukan BHP Medan: RUU tentang Profesi Kurator";
pres.author = "Balai Harta Peninggalan Medan";

let slideNo = 0;
function newSlide(bg) {
  const s = pres.addSlide();
  slideNo++;
  if (bg) s.background = { color: bg };
  return s;
}

function text(slide, t, opts) {
  slide.addText(t, { fontFace: FONT, color: INK, isTextBox: true, valign: "top", ...opts });
}

function badge(slide, num, y = 0.45) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y, w: 1.05, h: 1.05, fill: { color: NAVY }, line: { color: NAVY }, rectRadius: 0.15,
  });
  text(slide, num, {
    x: 0.6, y, w: 1.05, h: 1.05, fontSize: num.length > 2 ? 22 : 40, bold: true,
    color: GOLD, align: "center", valign: "middle", margin: 0,
  });
}

// Judul slide konten: lencana nomor masukan (opsional) + judul besar.
function header(slide, title, num) {
  let x = 0.6;
  if (num) { badge(slide, num); x = 1.95; }
  text(slide, title, {
    x, y: 0.45, w: W - x - 0.6, h: 1.05, fontSize: 34, bold: true, color: NAVY,
    valign: "middle", margin: 0,
  });
}

function footer(slide) {
  text(slide, "BHP Medan · RDP Komisi XIII DPR RI · RUU tentang Profesi Kurator", {
    x: 0.6, y: 6.98, w: 9, h: 0.35, fontSize: 14, color: MUTED, margin: 0, valign: "middle",
  });
  text(slide, String(slideNo), {
    x: W - 1.6, y: 6.98, w: 1.0, h: 0.35, fontSize: 14, color: MUTED, align: "right",
    margin: 0, valign: "middle",
  });
}

function card(slide, x, y, w, h, fill = SOFT, line) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, fill: { color: fill }, rectRadius: 0.12, line: { color: line || fill, width: 1 },
  });
}

function numDot(slide, n, x, y, d = 0.6, size = 22) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: NAVY }, line: { color: NAVY } });
  text(slide, String(n), {
    x, y, w: d, h: d, fontSize: size, bold: true, color: WHITE, align: "center",
    valign: "middle", margin: 0,
  });
}

// ---------------------------------------------------------------------------
// Kartu usulan rumusan pasal. Baris:
//   ["pasal", "Pasal …"]        judul pasal, rata tengah
//   ["head", "KETENTUAN PIDANA"] judul bagian, rata tengah
//   ["para", "teks"]            paragraf tanpa nomor ayat
//   ["ayat", "(1)", "teks"]     ayat dengan indentasi gantung
//   ["sub", "a.", "teks"]       huruf/angka di bawah ayat
//   ["note", "teks"]            usulan penjelasan (miring)
// Kartu yang panjang otomatis dipecah ke slide lanjutan pada batas baris.
// ---------------------------------------------------------------------------
const PF = 21;              // ukuran huruf teks pasal
const LINE_H = 0.36;        // tinggi satu baris pada 22 pt (inci)
const ROW_PAD = 0.12;       // ruang antar baris tabel
const BUDGET = 4.75;        // tinggi area tabel dalam kartu
const CPL = { ayat: 70, para: 70, sub: 66, note: 80, pasal: 999, head: 999 };

function rowHeight(r) {
  const t = r[r.length - 1].replace(/\*\*/g, "");
  const lines = t.split("\n").reduce((n, seg) => n + Math.max(1, Math.ceil(seg.length / CPL[r[0]])), 0);
  return lines * LINE_H + ROW_PAD;
}

function tableRow(r) {
  const base = { fontFace: FONT, fontSize: PF, color: INK, valign: "top" };
  const run = { fontFace: FONT, fontSize: PF, color: INK };
  const [type] = r;
  if (type === "pasal" || type === "head") {
    return [{ text: r[1], options: { ...base, bold: true, color: NAVY, align: "center", colspan: 3 } }];
  }
  if (type === "note") {
    return [{ text: rich("Usulan penjelasan: " + r[1], { fontFace: FONT, fontSize: 20, color: "2D3748", italic: true }), options: { ...base, fontSize: 20, color: "2D3748", colspan: 3, fill: { color: "F3F6FA" } } }];
  }
  if (type === "para") {
    return [{ text: "", options: base }, { text: rich(r[1], run), options: { ...base, colspan: 2 } }];
  }
  if (type === "ayat") {
    return [{ text: r[1], options: { ...base, bold: true, color: NAVY } }, { text: rich(r[2], run), options: { ...base, colspan: 2 } }];
  }
  // sub
  return [{ text: "", options: base }, { text: r[1], options: { ...base, color: NAVY, bold: true } }, { text: rich(r[2], run), options: base }];
}

function paginate(rows) {
  const pages = [[]];
  let h = 0;
  rows.forEach((r, i) => {
    const rh = rowHeight(r);
    const next = rows[i + 1];
    // judul pasal jangan tertinggal sendirian di bawah halaman
    const need = r[0] === "pasal" || r[0] === "head" ? rh + (next ? rowHeight(next) : 0) : rh;
    // sisa kecil di akhir kartu tetap di halaman yang sama agar tidak ada halaman yatim
    const rest = rows.slice(i).reduce((n, x) => n + rowHeight(x), 0);
    const orphanOk = rest <= 0.9 && h + rest <= BUDGET + 0.3;
    if (h + need > BUDGET && !orphanOk && pages[pages.length - 1].length) { pages.push([]); h = 0; }
    pages[pages.length - 1].push(r);
    h += rh;
  });
  return pages;
}

function pasalSlides(num, title, rows, notes) {
  const pages = paginate(rows);
  pages.forEach((page, pi) => {
    const s = newSlide(PAPER_BG);
    badge(s, num);
    text(s, "USULAN RUMUSAN PASAL" + (pages.length > 1 ? `  (${pi + 1}/${pages.length})` : ""), {
      x: 1.95, y: 0.42, w: 10.8, h: 0.42, fontSize: 18, bold: true, color: DARKGOLD, margin: 0, valign: "middle", charSpacing: 2,
    });
    text(s, title, {
      x: 1.95, y: 0.84, w: 10.8, h: 0.66, fontSize: 30, bold: true, color: NAVY, margin: 0, valign: "middle",
    });
    card(s, 0.6, 1.7, 12.13, 5.15, WHITE, "B8C4D8");
    const est = page.reduce((n, r) => n + rowHeight(r), 0);
    s.addTable(page.map(tableRow), {
      x: 0.85, y: 1.85, w: 11.63, h: est, colW: [0.8, 0.65, 10.18],
      rowH: page.map(rowHeight),
      border: { type: "none" }, margin: [3, 4, 5, 4],
    });
    footer(s);
    if (notes) s.addNotes(notes);
  });
}

(async () => {
  const I = {
    gov: await icon(fa.FaLandmark, NAVY),
    gavel: await icon(fa.FaGavel, NAVY),
    shield: await icon(fa.FaShieldAlt, NAVY),
    folder: await icon(fa.FaFolderOpen, NAVY),
    balance: await icon(fa.FaBalanceScale, NAVY),
    users: await icon(fa.FaUsers, NAVY),
    db: await icon(fa.FaDatabase, NAVY),
    coins: await icon(fa.FaCoins, NAVY),
    globe: await icon(fa.FaGlobeAsia, NAVY),
    comment: await icon(fa.FaCommentDots, NAVY),
    search: await icon(fa.FaSearch, NAVY),
    file: await icon(fa.FaFileSignature, NAVY),
    book: await icon(fa.FaBookOpen, NAVY),
    check: await icon(fa.FaCheckCircle, GOLD),
    arrow: await icon(fa.FaArrowRight, NAVY),
    quote: await icon(fa.FaQuoteLeft, GOLD),
  };

  // ======================= DATA USULAN RUMUSAN PASAL =======================
  const P = {};
  P.ku = [
    ["pasal", "Pasal 1"],
    ["para", "Dalam Undang-Undang ini yang dimaksud dengan:"],
    ["sub", "1.", "**Kurator** adalah Kurator Negara atau Kurator Swasta yang diangkat oleh Pengadilan untuk melakukan pengurusan dan/atau pemberesan harta Debitor Pailit di bawah pengawasan Hakim Pengawas."],
    ["sub", "2.", "**Kurator Negara** adalah Balai Harta Peninggalan yang melaksanakan tugas Kurator melalui pejabat Kurator Keperdataan."],
    ["sub", "3.", "**Kurator Swasta** adalah orang perseorangan yang memenuhi persyaratan dan terdaftar pada Kementerian untuk melaksanakan tugas Kurator."],
    ["sub", "7.", "**Kurator Keperdataan** adalah pegawai negeri sipil yang diberi tugas, tanggung jawab, dan wewenang secara penuh oleh pejabat yang berwenang untuk melaksanakan tugas Kurator dan Pengurus pada Balai Harta Peninggalan."],
    ["sub", "8.", "**Tim Kurator Keperdataan** adalah tim yang dibentuk oleh Kepala Balai Harta Peninggalan untuk menangani perkara kepailitan dan/atau penundaan kewajiban pembayaran utang."],
    ["para", "Pasal 1 juga mendefinisikan Pengurus, Pengurus Swasta, Balai Harta Peninggalan, Organisasi Profesi, Majelis Pengawas Kurator, Majelis Kehormatan Kurator, Kementerian, dan Menteri."],
  ];
  P.m1 = [
    ["pasal", "Pasal …"],
    ["ayat", "(1)", "Kurator terdiri atas: a. **Kurator Negara**; dan b. **Kurator Swasta**."],
    ["ayat", "(2)", "Pengurus terdiri atas: a. **Balai Harta Peninggalan**; dan b. **Pengurus Swasta**."],
    ["ayat", "(3)", "Dalam hal Debitor atau Kreditor yang mengajukan permohonan penundaan kewajiban pembayaran utang tidak mengajukan usul pengangkatan Pengurus, atau Pengurus yang diusulkan tidak memenuhi persyaratan, **Balai Harta Peninggalan diangkat selaku Pengurus** sepanjang masih memiliki Tim Kurator Keperdataan yang belum mencapai batas jumlah perkara sebagaimana dimaksud dalam Pasal …."],
    ["ayat", "(4)", "Dalam hal seluruh Tim Kurator Keperdataan pada Balai Harta Peninggalan telah mencapai batas jumlah perkara, **Pengadilan mengangkat Pengurus Swasta**."],
    ["ayat", "(5)", "Tugas Kurator Negara dan tugas Balai Harta Peninggalan selaku Pengurus dilaksanakan oleh pejabat Kurator Keperdataan."],
    ["ayat", "(6)", "Ketentuan mengenai tugas, wewenang, kewajiban, dan tanggung jawab Pengurus berlaku bagi Balai Harta Peninggalan yang diangkat selaku Pengurus."],
    ["note", "Ayat (3) **mengisi kekosongan pengaturan** mengenai pengurus yang ditunjuk oleh undang-undang dalam penundaan kewajiban pembayaran utang, dengan pola yang sama seperti pengangkatan Balai Harta Peninggalan selaku Kurator dalam kepailitan. Yang dimaksud dengan “tidak memenuhi persyaratan” antara lain tidak independen, memiliki benturan kepentingan, atau telah mencapai batas jumlah perkara."],
  ];
  P.m2 = [
    ["pasal", "Pasal …"],
    ["ayat", "(1)", "Kurator Swasta dan Pengurus Swasta tidak sedang menangani perkara kepailitan dan/atau penundaan kewajiban pembayaran utang lebih dari **3 (tiga) perkara**."],
    ["ayat", "(2)", "Batas jumlah perkara sebagaimana dimaksud pada ayat (1) **berlaku juga bagi Balai Harta Peninggalan** dan **dihitung untuk setiap Tim Kurator Keperdataan**."],
    ["ayat", "(3)", "Tim Kurator Keperdataan sebagaimana dimaksud pada ayat (2) terdiri atas 3 (tiga) orang pejabat Kurator Keperdataan."],
    ["ayat", "(4)", "Perkara penundaan kewajiban pembayaran utang yang ditangani Balai Harta Peninggalan selaku Pengurus diperhitungkan dalam batas jumlah perkara sebagaimana dimaksud pada ayat (2)."],
    ["ayat", "(5)", "Perkara penundaan kewajiban pembayaran utang yang berakhir dengan pernyataan pailit dan tetap ditangani Balai Harta Peninggalan selaku Kurator **dihitung sebagai 1 (satu) perkara**."],
    ["ayat", "(6)", "Dalam hal seluruh Tim Kurator Keperdataan telah mencapai batas jumlah perkara, Kepala Balai Harta Peninggalan memberitahukan secara tertulis kepada Pengadilan agar Pengadilan mengangkat Kurator atau Pengurus lain."],
    ["ayat", "(7)", "Ketentuan lebih lanjut mengenai pembentukan dan penugasan Tim Kurator Keperdataan diatur dengan Peraturan Menteri."],
    ["note", "Batas jumlah perkara bagi Balai Harta Peninggalan dihitung per tim karena Pengadilan mengangkat Balai Harta Peninggalan sebagai lembaga dan pekerjaan dilaksanakan secara tim. Dengan demikian, **kapasitas Balai Harta Peninggalan sama dengan jumlah Tim Kurator Keperdataan dikalikan 3 (tiga) perkara**."],
  ];
  P.peralihan = [
    ["head", "BAB …\nKETENTUAN PERALIHAN"],
    ["pasal", "Pasal …"],
    ["ayat", "(1)", "Pada saat Undang-Undang ini mulai berlaku, perkara kepailitan dan/atau penundaan kewajiban pembayaran utang yang sedang ditangani Balai Harta Peninggalan **tetap dilaksanakan oleh Balai Harta Peninggalan**."],
    ["ayat", "(2)", "Dalam hal jumlah perkara sebagaimana dimaksud pada ayat (1) melebihi batas jumlah perkara sebagaimana dimaksud dalam Pasal …, Balai Harta Peninggalan wajib mengalihkan kelebihan perkara **paling lama 6 (enam) bulan** terhitung sejak Undang-Undang ini diundangkan."],
    ["ayat", "(3)", "Pengalihan kelebihan perkara sebagaimana dimaksud pada ayat (2) dilakukan dengan cara:"],
    ["sub", "a.", "menugaskan Tim Kurator Keperdataan lain pada Balai Harta Peninggalan yang sama; dan/atau"],
    ["sub", "b.", "mengajukan permohonan penggantian Kurator atau Pengurus kepada Pengadilan."],
    ["ayat", "(4)", "Balai Harta Peninggalan tetap melaksanakan tugas atas perkara sebagaimana dimaksud pada ayat (1) sampai dengan pengalihan sebagaimana dimaksud pada ayat (3) selesai dilaksanakan."],
    ["ayat", "(5)", "Kelebihan jumlah perkara selama jangka waktu sebagaimana dimaksud pada ayat (2) **tidak dianggap sebagai pelanggaran** batas jumlah perkara."],
    ["note", "Pengalihan sebagaimana dimaksud pada ayat (3) huruf a cukup dilakukan melalui **surat tugas Kepala Balai Harta Peninggalan** karena Pengadilan mengangkat Balai Harta Peninggalan sebagai lembaga."],
  ];
  P.m3 = [
    ["pasal", "Pasal …"],
    ["ayat", "(1)", "Pendidikan, sertifikasi, registrasi, kode etik, disiplin, asuransi, dan perlindungan hukum bagi Kurator Swasta dan Pengurus Swasta **dilaksanakan oleh Organisasi Profesi**."],
    ["ayat", "(2)", "Pendidikan, pengembangan kompetensi, disiplin, dan perlindungan hukum bagi pejabat Kurator Keperdataan **dilaksanakan oleh Menteri** sesuai dengan ketentuan peraturan perundang-undangan di bidang aparatur sipil negara."],
    ["pasal", "Pasal …"],
    ["ayat", "(1)", "**Menteri membentuk Majelis Pengawas Kurator.**"],
    ["ayat", "(2)", "Majelis Pengawas Kurator terdiri atas unsur: a. pemerintah; b. Organisasi Profesi; dan c. akademisi."],
    ["ayat", "(3)", "Majelis Pengawas Kurator bertugas:"],
    ["sub", "a.", "melaksanakan pengawasan teknis dan administratif terhadap pelaksanaan tugas Kurator dan Pengurus;"],
    ["sub", "b.", "menerima dan memeriksa pengaduan terhadap Kurator dan Pengurus; dan"],
    ["sub", "c.", "menjatuhkan sanksi administratif kepada Kurator Swasta dan Pengurus Swasta, atau menyampaikan rekomendasi kepada Menteri dalam hal pelanggaran dilakukan oleh pejabat Kurator Keperdataan."],
  ];
  P.m4 = [
    ["pasal", "Pasal …"],
    ["ayat", "(1)", "Dalam melaksanakan pendidikan, sertifikasi, registrasi, kode etik, dan disiplin, Organisasi Profesi **wajib berpedoman pada standar profesi nasional** yang ditetapkan oleh Menteri setelah mendengar pertimbangan Organisasi Profesi dan Majelis Pengawas Kurator."],
    ["ayat", "(2)", "Standar profesi nasional sebagaimana dimaksud pada ayat (1) paling sedikit meliputi:"],
    ["sub", "a.", "kurikulum pendidikan profesi;"],
    ["sub", "b.", "materi dan tata cara ujian profesi;"],
    ["sub", "c.", "kode etik;"],
    ["sub", "d.", "standar pelaksanaan tugas; dan"],
    ["sub", "e.", "jenis sanksi dan tata cara penjatuhannya."],
  ];
  P.m5 = [
    ["pasal", "Pasal …"],
    ["ayat", "(1)", "Untuk kepentingan proses peradilan, penyidik, penuntut umum, atau hakim **dengan persetujuan Majelis Kehormatan Kurator** berwenang memanggil Kurator atau Pengurus untuk hadir dalam pemeriksaan yang berkaitan dengan tindakan dalam pelaksanaan tugasnya."],
    ["ayat", "(2)", "Dalam memberikan persetujuan sebagaimana dimaksud pada ayat (1), Majelis Kehormatan Kurator terlebih dahulu memeriksa dan menentukan apakah laporan terhadap Kurator atau Pengurus merupakan: a. sengketa teknis kepailitan; b. pelanggaran kode etik; c. pelanggaran administratif; d. tanggung jawab perdata; atau e. dugaan tindak pidana."],
    ["ayat", "(3)", "Majelis Kehormatan Kurator wajib memberikan jawaban menerima atau menolak permintaan persetujuan **paling lama 30 (tiga puluh) hari kerja** terhitung sejak permintaan diterima."],
    ["ayat", "(4)", "Dalam hal Majelis Kehormatan Kurator tidak memberikan jawaban dalam jangka waktu sebagaimana dimaksud pada ayat (3), Majelis Kehormatan Kurator **dianggap menerima** permintaan persetujuan."],
    ["ayat", "(5)", "Majelis Kehormatan Kurator terdiri atas unsur pemerintah, Organisasi Profesi, dan akademisi."],
  ];
  P.m6 = [
    ["pasal", "Pasal …"],
    ["ayat", "(1)", "**Kepolisian Negara Republik Indonesia wajib memberikan pendampingan dan pengamanan** kepada Kurator dan Pengurus dalam pelaksanaan tugasnya atas permintaan Kurator, Pengurus, atau Hakim Pengawas."],
    ["ayat", "(2)", "Permintaan sebagaimana dimaksud pada ayat (1) diajukan secara tertulis dengan melampirkan salinan putusan Pengadilan dan/atau penetapan Hakim Pengawas."],
    ["ayat", "(3)", "Debitor Pailit dan setiap pihak yang menguasai harta pailit **wajib memberikan akses, keterangan, dan dokumen** yang diminta oleh Kurator dalam pelaksanaan tugasnya."],
    ["head", "Ketentuan Pidana"],
    ["pasal", "Pasal …"],
    ["para", "Setiap Orang yang dengan sengaja menghalang-halangi atau merintangi Kurator atau Pengurus dalam melaksanakan tugasnya dipidana dengan **pidana penjara paling lama 2 (dua) tahun atau pidana denda paling banyak kategori IV**."],
  ];
  P.m7 = [
    ["pasal", "Pasal …"],
    ["ayat", "(1)", "Kurator wajib menyimpan seluruh uang harta pailit dalam **1 (satu) rekening kepailitan untuk setiap perkara**."],
    ["ayat", "(2)", "Setiap penerimaan dan pengeluaran uang harta pailit wajib dicatat, didukung dengan bukti, dan dilaporkan kepada Hakim Pengawas."],
    ["ayat", "(3)", "Rekening kepailitan yang dikelola Kurator Negara ditatausahakan sesuai dengan ketentuan peraturan perundang-undangan mengenai penatausahaan uang pihak ketiga pada Balai Harta Peninggalan."],
    ["pasal", "Pasal …"],
    ["para", "Dalam melakukan pembagian hasil pemberesan harta pailit, Kurator melakukan pembayaran dengan urutan sebagai berikut:"],
    ["sub", "a.", "biaya kepailitan dan imbalan jasa Kurator;"],
    ["sub", "b.", "**upah pekerja yang terutang**;"],
    ["sub", "c.", "tagihan Kreditor pemegang hak jaminan kebendaan, sebatas hasil penjualan benda yang dibebani jaminan;"],
    ["sub", "d.", "**hak pekerja lainnya**;"],
    ["sub", "e.", "tagihan negara dan tagihan lain yang menurut undang-undang mempunyai hak didahulukan; dan"],
    ["sub", "f.", "tagihan Kreditor konkuren secara seimbang."],
    ["note", "Urutan huruf b dan huruf d disusun dengan memperhatikan **Putusan Mahkamah Konstitusi Nomor 67/PUU-XI/2013**, yang menempatkan upah pekerja di atas semua jenis tagihan, termasuk tagihan Kreditor pemegang hak jaminan kebendaan, serta menempatkan hak pekerja lainnya di atas tagihan negara, kecuali tagihan Kreditor pemegang hak jaminan kebendaan."],
  ];
  P.m8 = [
    ["pasal", "Pasal …"],
    ["ayat", "(1)", "Pengawasan terhadap Kurator dan Pengurus dilaksanakan oleh:"],
    ["sub", "a.", "**Hakim Pengawas**, berupa pengawasan yuridis atas pengurusan dan pemberesan harta pailit;"],
    ["sub", "b.", "**Majelis Pengawas Kurator**, berupa pengawasan teknis dan administratif atas tahapan pelaksanaan pekerjaan Kurator dan Pengurus; dan"],
    ["sub", "c.", "**Komite Bersama**, berupa pengawasan terhadap pengembangan profesi dan Organisasi Profesi."],
    ["ayat", "(2)", "Pengawasan sebagaimana dimaksud pada ayat (1) tidak mengurangi kewenangan Menteri dalam pembinaan kepegawaian pejabat Kurator Keperdataan."],
    ["ayat", "(3)", "Ketentuan lebih lanjut mengenai tata cara pengawasan diatur dengan Peraturan Pemerintah."],
  ];
  P.m9 = [
    ["pasal", "Pasal …"],
    ["ayat", "(1)", "Kementerian, lembaga, pemerintah daerah, dan badan hukum yang menyimpan data mengenai harta Debitor Pailit **wajib memberikan data tersebut** atas permintaan Kurator **paling lama 14 (empat belas) hari kerja** terhitung sejak permintaan diterima."],
    ["ayat", "(2)", "Permintaan data sebagaimana dimaksud pada ayat (1) diajukan dengan melampirkan salinan putusan pernyataan pailit dan bukti pengangkatan Kurator."],
    ["ayat", "(3)", "**Ketentuan mengenai rahasia bank tidak berlaku** terhadap pemberian data sebagaimana dimaksud pada ayat (1) kepada Kurator."],
    ["ayat", "(4)", "Menteri menyelenggarakan sistem informasi Kurator dan Pengurus yang terintegrasi dengan sistem informasi kementerian dan lembaga terkait."],
    ["ayat", "(5)", "Pemberian, pengelolaan, dan penggunaan data sebagaimana dimaksud pada ayat (1) dan ayat (4) dilaksanakan sesuai dengan ketentuan peraturan perundang-undangan di bidang pelindungan data pribadi."],
  ];
  P.m10 = [
    ["pasal", "Pasal …"],
    ["ayat", "(1)", "Kurator dan Pengurus berhak atas imbalan jasa."],
    ["ayat", "(2)", "Besarnya imbalan jasa sebagaimana dimaksud pada ayat (1) ditetapkan oleh Pengadilan berdasarkan pedoman yang ditetapkan oleh Menteri."],
    ["ayat", "(3)", "Imbalan jasa yang diterima Balai Harta Peninggalan selaku Kurator Negara atau Pengurus **merupakan Penerimaan Negara Bukan Pajak**."],
  ];
  P.m11 = [
    ["pasal", "Pasal …"],
    ["ayat", "(1)", "Dalam melaksanakan tugas yang berkaitan dengan harta, Kreditor, atau proses kepailitan di negara lain, Kurator **wajib mematuhi ketentuan hukum internasional dan perjanjian internasional** yang mengikat Negara Republik Indonesia."],
    ["ayat", "(2)", "Pengadilan dan Kurator dapat bekerja sama dan berkomunikasi dengan pengadilan dan wakil kepailitan di negara lain."],
    ["ayat", "(3)", "Wakil kepailitan asing hanya dapat melakukan tindakan atas harta Debitor yang berada di wilayah Negara Republik Indonesia **bersama dengan Kurator yang terdaftar di Indonesia**."],
    ["ayat", "(4)", "Ketentuan lebih lanjut mengenai kepailitan lintas batas diatur dengan Peraturan Pemerintah."],
  ];
  P.m12 = [
    ["para", "Pembentukan Majelis Pengawas Kurator dan Majelis Kehormatan Kurator mengikuti usulan rumusan pada angka 3 dan angka 5."],
    ["pasal", "Pasal …"],
    ["ayat", "(1)", "Debitor, Kreditor, pekerja, atau pihak lain yang dirugikan oleh tindakan Kurator atau Pengurus **dapat mengajukan pengaduan kepada Majelis Pengawas Kurator**."],
    ["ayat", "(2)", "Majelis Pengawas Kurator wajib memeriksa dan memutus pengaduan **paling lama 60 (enam puluh) hari** terhitung sejak pengaduan diterima."],
    ["ayat", "(3)", "Pengajuan pengaduan **tidak menghentikan** proses pengurusan dan/atau pemberesan harta pailit."],
  ];

  const allCards = Object.values(P);
  const totalPasal = allCards.reduce((n, rows) => n + rows.filter((r) => r[0] === "pasal").length, 0);
  const totalPenjelasan = allCards.reduce((n, rows) => n + rows.filter((r) => r[0] === "note").length, 0);

  // ================================ SLIDE ================================

  // Judul
  {
    const s = newSlide(NAVY);
    text(s, "KEMENTERIAN HUKUM REPUBLIK INDONESIA\nKANTOR WILAYAH SUMATERA UTARA\nBALAI HARTA PENINGGALAN MEDAN", {
      x: 0.8, y: 0.5, w: 11.7, h: 1.2, fontSize: 18, bold: true, color: GOLD, margin: 0,
    });
    text(s, "BAHAN MASUKAN\nBALAI HARTA PENINGGALAN MEDAN", {
      x: 0.8, y: 1.85, w: 11.7, h: 1.6, fontSize: 44, bold: true, color: WHITE, margin: 0,
    });
    text(s, "Dalam Rapat Dengar Pendapat dengan Komisi XIII DPR RI", {
      x: 0.8, y: 3.5, w: 11.7, h: 0.6, fontSize: 26, bold: true, color: GOLD, margin: 0,
    });
    text(s, "Penyusunan Rancangan Undang-Undang tentang Profesi Kurator terkait Peran Balai Harta Peninggalan dalam Pelaksanaan Tugas Kurator", {
      x: 0.8, y: 4.2, w: 11.4, h: 1.1, fontSize: 22, color: WHITE, margin: 0,
    });
    text(s, [
      { text: "Syafriadi Lubis", options: { bold: true, breakLine: true } },
      { text: "Kepala Balai Harta Peninggalan Medan · Medan, 2 Oktober 2026" },
    ], { x: 0.8, y: 5.85, w: 11.7, h: 0.95, fontSize: 22, color: WHITE, margin: 0 });
    s.addNotes("Pembukaan. Salam hormat kepada Pimpinan dan Anggota Komisi XIII DPR RI.");
  }

  // Pendahuluan
  {
    const s = newSlide();
    header(s, "Pendahuluan");
    card(s, 0.6, 1.75, 5.6, 3.55, NAVY);
    text(s, "Balai Harta Peninggalan (BHP) Medan mendukung penuh pembentukan Rancangan Undang-Undang tentang Profesi Kurator (RUU).", {
      x: 0.95, y: 1.95, w: 4.9, h: 3.15, fontSize: 28, bold: true, color: WHITE, valign: "middle", margin: 0,
    });
    const rows = [
      ["BHP merupakan kurator dari unsur pemerintah", "Pasal 70 ayat (1) UU Kepailitan dan PKPU"],
      ["sekaligus kurator yang ditunjuk oleh undang-undang", "Pasal 15 ayat (2) UU Kepailitan dan PKPU"],
    ];
    rows.forEach(([a, b], i) => {
      const y = 1.75 + i * 1.85;
      card(s, 6.6, y, 6.13, 1.7);
      s.addImage({ data: I.gov, x: 6.85, y: y + 0.5, w: 0.7, h: 0.7 });
      text(s, [
        { text: a, options: { bold: true, breakLine: true } },
        { text: b, options: { fontSize: 20, bold: false, color: INK } },
      ], { x: 7.8, y: y + 0.12, w: 4.8, h: 1.46, fontSize: 24, color: NAVY, valign: "middle", margin: 0 });
    });
    text(s, rich("Oleh karena itu, **kedudukan BHP perlu diatur secara khusus dalam RUU**. Dalam bahan masukan ini, BHP disebut **Kurator Negara** dan kurator perseorangan disebut **Kurator Swasta**."), {
      x: 0.6, y: 5.55, w: 12.13, h: 1.25, fontSize: 24, margin: 0, valign: "middle",
    });
    footer(s);
    s.addNotes("Sebagaimana dengan agenda rapat, bahan masukan ini difokuskan pada peran BHP dalam pelaksanaan tugas kurator.");
  }

  // Kekuatan dokumen
  {
    const s = newSlide();
    header(s, "Bahan Masukan yang Siap Dipakai");
    const stats = [
      ["12", "masukan"],
      [String(totalPasal), "usulan rumusan pasal"],
      ["13", "definisi dalam Ketentuan Umum"],
    ];
    stats.forEach(([big, lbl], i) => {
      const x = 0.6 + i * 4.15;
      card(s, x, 1.75, 3.85, 2.45, NAVY);
      text(s, big, { x, y: 1.85, w: 3.85, h: 1.35, fontSize: 80, bold: true, color: GOLD, align: "center", valign: "middle", margin: 0 });
      text(s, lbl, { x: x + 0.2, y: 3.2, w: 3.45, h: 0.85, fontSize: 22, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
    });
    const flow = [[I.search, "Analisis hukum"], [I.file, "Usulan rumusan pasal"], [I.book, "Usulan penjelasan"]];
    flow.forEach(([ic, t], i) => {
      const x = 0.6 + i * 4.15;
      card(s, x, 4.5, 3.85, 1.1);
      s.addImage({ data: ic, x: x + 0.3, y: 4.75, w: 0.6, h: 0.6 });
      text(s, t, { x: x + 1.1, y: 4.5, w: 2.65, h: 1.1, fontSize: 22, bold: true, color: NAVY, valign: "middle", margin: 0 });
      if (i < 2) s.addImage({ data: I.arrow, x: x + 3.9, y: 4.87, w: 0.3, h: 0.35 });
    });
    text(s, "Setiap masukan disertai kartu usulan rumusan pasal yang dapat langsung digunakan dalam penyusunan draf RUU.", {
      x: 0.6, y: 5.85, w: 12.13, h: 0.95, fontSize: 24, bold: true, color: NAVY, valign: "middle", margin: 0,
    });
    footer(s);
    s.addNotes(`Bahan masukan memuat ${totalPasal} usulan pasal (termasuk Pasal 1 Ketentuan Umum dengan 13 definisi) dan ${totalPenjelasan} usulan penjelasan. Penomoran pasal ditulis "Pasal …" karena bersifat sementara, sedangkan istilah Debitor, Kreditor, Debitor Pailit, Hakim Pengawas, dan Pengadilan mengikuti pengertian dalam UU Kepailitan dan PKPU.`);
  }

  // Daftar masukan
  {
    const s = newSlide();
    header(s, "12 Masukan BHP Medan");
    const list = [
      "BHP sebagai Pengurus dalam PKPU", "Batas Jumlah Perkara bagi BHP", "Kekosongan Rezim Profesi",
      "Standar yang Terfragmentasi", "Batas Perlindungan dan Tanggung Jawab", "Hambatan Pelaksanaan Tugas",
      "Akuntabilitas Pengelolaan Boedel", "Pengawasan Berlapis yang Belum Terpadu", "Data yang Belum Optimal",
      "Imbalan dan Risiko Profesi", "Kepailitan Lintas Batas", "Perlindungan Pihak Terdampak",
    ];
    list.forEach((t, i) => {
      const col = i < 6 ? 0 : 1;
      const x = 0.6 + col * 6.3;
      const y = 1.7 + (i % 6) * 0.72;
      numDot(s, i + 1, x, y, 0.58, 20);
      text(s, t, { x: x + 0.8, y, w: 5.4, h: 0.58, fontSize: 22, bold: i < 2, color: i < 2 ? NAVY : INK, valign: "middle", margin: 0 });
    });
    text(s, rich("**2 (dua) masukan terkait peran BHP** sesuai agenda rapat ditambah **10 (sepuluh) masukan atas isu strategis** dalam Term of Reference Kunjungan Kerja Komisi XIII DPR RI, sehingga seluruhnya berjumlah 12 (dua belas) masukan."), {
      x: 0.6, y: 6.0, w: 12.13, h: 0.9, fontSize: 20, margin: 0, valign: "middle",
    });
    footer(s);
  }

  // Ketentuan Umum
  pasalSlides("KU", "Ketentuan Umum (petikan)", P.ku,
    "Sebagai dasar istilah bagi seluruh usulan rumusan pasal, BHP Medan mengusulkan ketentuan umum ini. Pasal 1 memuat 13 definisi; yang ditampilkan adalah definisi yang berkaitan langsung dengan BHP.");

  // ---------------- Masukan 1 ----------------
  {
    const s = newSlide();
    header(s, "BHP sebagai Pengurus dalam PKPU", "1");
    const cols = [
      ["KEPAILITAN", NAVY, WHITE, "UU Kepailitan dan PKPU menyebut BHP secara tegas sebagai kurator (Pasal 70 ayat (1)) dan menjadikannya kurator yang ditunjuk oleh undang-undang (Pasal 15 ayat (2))."],
      ["PKPU", SOFT, INK, "Pasal 234 ayat (3) hanya menyebut orang perseorangan sebagai pihak yang dapat menjadi pengurus."],
    ];
    cols.forEach(([h, fill, fg, body], i) => {
      const x = 0.6 + i * 6.28;
      card(s, x, 1.75, 5.85, 3.3, fill);
      text(s, h, { x: x + 0.35, y: 1.9, w: 5.2, h: 0.6, fontSize: 26, bold: true, color: i ? NAVY : GOLD, margin: 0 });
      text(s, body, { x: x + 0.35, y: 2.6, w: 5.2, h: 2.3, fontSize: 24, color: fg, margin: 0 });
    });
    s.addImage({ data: I.quote, x: 0.6, y: 5.4, w: 0.55, h: 0.5 });
    text(s, "Ketentuan tersebut tidak melarang BHP menjadi pengurus. BHP hanya tidak disebut.", {
      x: 1.4, y: 5.3, w: 11.3, h: 1.4, fontSize: 30, bold: true, color: NAVY, valign: "middle", margin: 0,
    });
    footer(s);
    s.addNotes("BHP Medan mengusulkan agar RUU memberikan kewenangan kepada BHP untuk diangkat sebagai pengurus dalam PKPU, dan menjadi pengurus yang diangkat oleh undang-undang apabila tidak ada usul pengangkatan pengurus, sama seperti kedudukannya dalam kepailitan. Ketidakseimbangan ini sulit dibenarkan karena kepailitan dan PKPU merupakan satu sistem yang saling terhubung: diatur dalam undang-undang yang sama, diperiksa oleh Pengadilan Niaga yang sama, diawasi oleh Hakim Pengawas, dan menggunakan pedoman imbalan jasa yang sama (Pasal 75 dan Pasal 234 ayat (5)).");
  }
  {
    const s = newSlide();
    header(s, "Celah Hukum: PKPU Tidak Memiliki Pengurus yang Ditunjuk oleh Undang-Undang", "1");
    const tiles = [["3 hari", "paling lambat untuk permohonan Debitor"], ["20 hari", "paling lambat untuk permohonan Kreditor"]];
    tiles.forEach(([big, lbl], i) => {
      const x = 0.6 + i * 3.2;
      card(s, x, 1.75, 2.95, 2.6, NAVY);
      text(s, big, { x, y: 1.85, w: 2.95, h: 1.2, fontSize: 48, bold: true, color: GOLD, align: "center", valign: "middle", margin: 0 });
      text(s, lbl, { x: x + 0.2, y: 3.05, w: 2.55, h: 1.15, fontSize: 18, bold: true, color: WHITE, align: "center", margin: 0 });
    });
    text(s, "Pasal 225 ayat (2) dan ayat (3) mewajibkan Pengadilan mengabulkan PKPU sementara dalam waktu yang sangat singkat. Pada saat yang sama, Pengadilan harus mengangkat satu atau lebih pengurus.", {
      x: 7.1, y: 1.75, w: 5.63, h: 2.6, fontSize: 22, margin: 0, valign: "middle",
    });
    card(s, 0.6, 4.65, 12.13, 2.1);
    text(s, rich("Dalam kepailitan, keadaan yang sama sudah diselesaikan oleh Pasal 15 ayat (2). **Dalam PKPU, jalan keluar tersebut tidak tersedia, padahal batas waktunya bersifat memaksa.**"), {
      x: 0.95, y: 4.65, w: 11.45, h: 2.1, fontSize: 26, valign: "middle", margin: 0,
    });
    footer(s);
    s.addNotes("Undang-undang tidak mengatur siapa yang diangkat sebagai pengurus apabila pemohon tidak mengusulkan pengurus, atau apabila pengurus yang diusulkan tidak memenuhi syarat dalam Pasal 234 ayat (1), yaitu independen, tidak memiliki benturan kepentingan, dan tidak sedang menangani lebih dari 3 (tiga) perkara.");
  }
  {
    const s = newSlide();
    header(s, "Tujuh Pokok Analisis Hukum", "1");
    const pts = [
      "Pengaturan kepailitan dan PKPU tidak seimbang",
      "Terdapat celah hukum: PKPU tidak memiliki pengurus yang ditunjuk oleh undang-undang",
      "Lembaga yang dipercaya untuk tugas yang lebih berat layak dipercaya untuk tugas yang lebih ringan",
      "BHP menjamin independensi pengurus, khususnya dalam PKPU yang diajukan Kreditor",
      "Penanganan perkara dari PKPU ke kepailitan menjadi berkesinambungan",
      "Kewenangan BHP harus diberikan secara tegas oleh undang-undang",
      "Peran sebagai pengurus tetap berada dalam batas kapasitas BHP",
    ];
    pts.forEach((t, i) => {
      const y = 1.7 + i * 0.73;
      numDot(s, "abcdefg"[i], 0.6, y + 0.04, 0.55, 20);
      text(s, t, { x: 1.4, y, w: 11.33, h: 0.65, fontSize: 22, bold: true, color: NAVY, valign: "middle", margin: 0 });
    });
    footer(s);
    s.addNotes("Huruf c: kewenangan kurator jauh lebih luas daripada pengurus; sejak putusan pailit Debitor kehilangan hak menguasai hartanya (Pasal 24) dan kurator melakukan pengurusan sekaligus pemberesan (Pasal 69), sedangkan dalam PKPU tindakan Debitor hanya memerlukan persetujuan pengurus (Pasal 240 ayat (1)). Huruf d: imbalan jasa BHP disetorkan ke kas negara sebagai PNBP berdasarkan UU 9/2018, pejabat tidak memperoleh keuntungan pribadi. Huruf e: PKPU dapat berakhir pailit (Pasal 230 ayat (1), Pasal 289); bila BHP sejak awal menjadi pengurus, data harta Debitor, hasil pencocokan tagihan, dan pemahaman perkara tetap berada pada lembaga yang sama. Huruf g: perkara PKPU dihitung dalam batas 3 perkara per tim; bila seluruh tim penuh, Pengadilan mengangkat pengurus swasta.");
  }
  {
    const s = newSlide();
    header(s, "Dua Argumen Kunci", "1");
    const quotes = [
      ["Lembaga yang dipercaya untuk tugas yang lebih berat", "Dalam hal undang-undang telah mempercayakan kewenangan yang lebih berat, yaitu mengambil alih dan membereskan seluruh harta Debitor, kepada BHP, maka secara logika hukum (argumentum a maiore ad minus) BHP juga mampu melaksanakan kewenangan yang lebih ringan sebagai pengurus."],
      ["Kewenangan harus tegas dalam undang-undang", "Bagi orang perseorangan, apa yang tidak dilarang boleh dilakukan. Sebaliknya, bagi badan pemerintahan, apa yang tidak diberikan kewenangannya tidak boleh dilakukan."],
    ];
    quotes.forEach(([h, q], i) => {
      const x = 0.6 + i * 6.28;
      card(s, x, 1.75, 5.85, 5.0, i ? NAVY : SOFT);
      s.addImage({ data: I.quote, x: x + 0.35, y: 2.0, w: 0.6, h: 0.55 });
      text(s, h, { x: x + 1.15, y: 1.95, w: 4.45, h: 0.7, fontSize: 20, bold: true, color: i ? GOLD : DARKGOLD, valign: "middle", margin: 0 });
      text(s, q, { x: x + 0.35, y: 2.85, w: 5.15, h: 3.7, fontSize: 23, bold: !!i, color: i ? WHITE : INK, margin: 0 });
    });
    footer(s);
    s.addNotes("Kewenangan badan pemerintahan diperoleh melalui atribusi, delegasi, atau mandat (Pasal 11 UU 30/2014 tentang Administrasi Pemerintahan), dan kewenangan atribusi hanya dapat diberikan oleh UUD atau undang-undang (Pasal 12 ayat (1)). Oleh karena itu, kewenangan BHP sebagai pengurus harus dimuat secara tegas dalam undang-undang. RUU ini merupakan wadah yang tepat karena ruang lingkupnya mencakup kurator dan pengurus.");
  }
  pasalSlides("1", "BHP sebagai Pengurus dalam PKPU", P.m1,
    "Dengan menjadikan BHP sebagai pengurus yang ditunjuk oleh undang-undang, celah ini tertutup dengan pola yang sudah dikenal dan sudah teruji dalam Pasal 15 ayat (2). Usulan ini tidak memperkenalkan konsep baru, tetapi melengkapi sistem yang sudah ada.");

  // ---------------- Masukan 2 ----------------
  {
    const s = newSlide();
    header(s, "Batas Jumlah Perkara Juga Berlaku bagi BHP", "2");
    const tiles = [
      ["3", "orang pejabat Kurator Keperdataan dalam setiap tim"],
      ["3", "perkara paling banyak per tim pada waktu yang sama"],
      ["Tim × 3", "kapasitas setiap BHP menjadi terukur"],
    ];
    tiles.forEach(([big, lbl], i) => {
      const x = 0.6 + i * 4.15;
      card(s, x, 1.75, 3.85, 2.75);
      text(s, big, { x, y: 1.85, w: 3.85, h: 1.35, fontSize: big.length > 2 ? 52 : 80, bold: true, color: NAVY, align: "center", valign: "middle", margin: 0 });
      text(s, lbl, { x: x + 0.25, y: 3.25, w: 3.35, h: 1.1, fontSize: 20, color: INK, align: "center", margin: 0 });
    });
    text(s, "Dengan cara ini, standar 3 (tiga) perkara tetap sama dengan Kurator Swasta, tetapi disesuaikan dengan karakter BHP sebagai lembaga. Batas jumlah perkara tidak menyebabkan suatu perkara kehilangan kurator atau pengurus.", {
      x: 0.6, y: 4.8, w: 12.13, h: 1.95, fontSize: 24, margin: 0, valign: "middle",
    });
    footer(s);
    s.addNotes("Pasal 15 ayat (3) menentukan kurator tidak sedang menangani lebih dari 3 perkara. Dalam praktik belum jelas apakah batas tersebut dihitung untuk BHP sebagai lembaga atau untuk setiap pejabat, sementara kewajiban menerima penunjukan berdasarkan Pasal 15 ayat (2) membuat jumlah perkara BHP terus bertambah tanpa batas. Pertimbangan: tujuan batas sama pentingnya bagi BHP; tanpa batas mutu menurun, penyelesaian tertunda merugikan Kreditor dan pekerja, dan pejabat menanggung risiko tanggung jawab (Pasal 72); perlakuan yang sama memperkuat kepercayaan para pihak terhadap BHP.");
  }
  pasalSlides("2", "Batas Jumlah Perkara", P.m2);
  {
    const s = newSlide();
    header(s, "Pengalihan Kelebihan Perkara sebagai Mitigasi Risiko", "2");
    const steps = [
      "Perkara yang sedang ditangani BHP tetap dilaksanakan oleh BHP",
      "Pengalihan terlebih dahulu kepada tim lain dalam BHP yang sama",
      "Bila tidak tertampung, permohonan penggantian kurator (Pasal 71)",
    ];
    steps.forEach((t, i) => {
      const x = 0.6 + i * 4.15;
      card(s, x, 1.75, 3.6, 2.7);
      numDot(s, i + 1, x + 0.3, 1.95, 0.6);
      text(s, t, { x: x + 0.3, y: 2.7, w: 3.05, h: 1.65, fontSize: 21, bold: true, color: NAVY, margin: 0 });
      if (i < 2) s.addImage({ data: I.arrow, x: x + 3.7, y: 2.9, w: 0.4, h: 0.4 });
    });
    card(s, 0.6, 4.75, 12.13, 2.0, NAVY);
    text(s, "6 BULAN", { x: 0.9, y: 4.75, w: 3.4, h: 2.0, fontSize: 48, bold: true, color: GOLD, valign: "middle", margin: 0 });
    text(s, "Cukup untuk membentuk tim dan mengajukan permohonan penggantian kurator, tetapi tidak terlalu lama sehingga batas jumlah perkara dapat segera berlaku efektif.", {
      x: 4.3, y: 4.75, w: 8.15, h: 2.0, fontSize: 22, color: WHITE, valign: "middle", margin: 0,
    });
    footer(s);
    s.addNotes("Tanpa ketentuan peralihan, terdapat tiga risiko: BHP langsung dianggap melanggar batas jumlah perkara, keabsahan tindakan BHP dalam perkara yang sedang berjalan dapat dipersoalkan, dan BHP tidak dapat menerima penunjukan baru meskipun diwajibkan oleh undang-undang. Pengalihan ke tim lain cukup dilakukan secara administratif melalui surat tugas Kepala BHP karena putusan Pengadilan mengangkat BHP sebagai lembaga, bukan pejabat tertentu. Selama jangka waktu tersebut, kelebihan perkara tidak dianggap sebagai pelanggaran batas jumlah perkara.");
  }
  pasalSlides("2", "Ketentuan Peralihan", P.peralihan);

  // ---------------- Masukan 3 dan 4 ----------------
  {
    const s = newSlide();
    header(s, "Kekosongan Rezim Profesi dan Standar yang Terfragmentasi", "3, 4");
    const cols = [
      [I.users, "Kurator Swasta", "Bagi Kurator Swasta, hal tersebut dilaksanakan oleh organisasi profesi."],
      [I.gov, "Kurator Negara", "Bagi Kurator Negara, hal tersebut dilaksanakan oleh Kementerian Hukum karena pejabat Kurator Keperdataan merupakan Aparatur Sipil Negara."],
    ];
    cols.forEach(([ic, h, b], i) => {
      const x = 0.6 + i * 6.28;
      card(s, x, 1.75, 5.85, 2.55);
      s.addImage({ data: ic, x: x + 0.3, y: 1.98, w: 0.6, h: 0.6 });
      text(s, h, { x: x + 1.1, y: 1.95, w: 4.5, h: 0.65, fontSize: 24, bold: true, color: NAVY, valign: "middle", margin: 0 });
      text(s, b, { x: x + 0.3, y: 2.7, w: 5.25, h: 1.5, fontSize: 21, margin: 0 });
    });
    text(s, rich("RUU perlu membentuk **Majelis Pengawas Kurator** yang terdiri atas unsur pemerintah, organisasi profesi, dan akademisi. Seluruh organisasi profesi wajib berpedoman pada **satu standar profesi nasional** yang ditetapkan oleh Menteri. Dengan demikian, standar dapat diseragamkan tanpa harus melebur organisasi profesi yang ada."), {
      x: 0.6, y: 4.55, w: 12.13, h: 2.2, fontSize: 23, margin: 0, valign: "middle",
    });
    footer(s);
  }
  pasalSlides("3", "Pembinaan Profesi dan Majelis Pengawas Kurator", P.m3);
  pasalSlides("4", "Standar Profesi Nasional", P.m4);

  // ---------------- Masukan 5 ----------------
  {
    const s = newSlide();
    header(s, "Batas Perlindungan dan Tanggung Jawab", "5");
    text(s, "RUU perlu membentuk Majelis Kehormatan Kurator. Majelis ini memeriksa lebih dahulu laporan terhadap kurator sebelum kurator dipanggil oleh aparat penegak hukum, untuk membedakan:", {
      x: 0.6, y: 1.7, w: 7.3, h: 1.75, fontSize: 21, margin: 0,
    });
    ["sengketa teknis kepailitan", "pelanggaran etik", "pelanggaran administratif", "tanggung jawab perdata", "tindak pidana"].forEach((t, i) => {
      const y = 3.55 + i * 0.64;
      card(s, 0.6, y, 7.3, 0.54);
      text(s, t, { x: 0.85, y, w: 6.9, h: 0.54, fontSize: 21, bold: true, color: NAVY, valign: "middle", margin: 0 });
    });
    card(s, 8.25, 1.75, 4.48, 5.0, NAVY);
    text(s, "30", { x: 8.25, y: 1.9, w: 4.48, h: 1.5, fontSize: 96, bold: true, color: GOLD, align: "center", valign: "middle", margin: 0 });
    text(s, "hari kerja", { x: 8.25, y: 3.4, w: 4.48, h: 0.55, fontSize: 24, bold: true, color: WHITE, align: "center", margin: 0 });
    text(s, "Majelis wajib memberikan jawaban dalam jangka waktu tertentu agar mekanisme ini tidak menjadi imunitas yang menghambat proses hukum.", {
      x: 8.5, y: 4.1, w: 3.98, h: 2.5, fontSize: 19, color: WHITE, align: "center", valign: "middle", margin: 0,
    });
    footer(s);
    s.addNotes("Model ini sejalan dengan saran dalam Term of Reference untuk mempertimbangkan praktik profesi Notaris yang telah memiliki Majelis Kehormatan Notaris.");
  }
  pasalSlides("5", "Majelis Kehormatan Kurator", P.m5);

  // ---------------- Masukan 6 ----------------
  {
    const s = newSlide();
    header(s, "Hambatan Pelaksanaan Tugas", "6");
    const cards = [
      [I.shield, "Pengamanan", "Kepolisian Negara Republik Indonesia wajib memberikan pendampingan dan pengamanan kepada kurator sesuai dengan permintaan."],
      [I.folder, "Akses dan Dokumen", "Kewajiban para pihak untuk memberikan akses dan dokumen kepada kurator."],
      [I.gavel, "Sanksi", "Sanksi bagi setiap orang yang dengan sengaja menghalangi pelaksanaan tugas kurator."],
    ];
    cards.forEach(([ic, h, b], i) => {
      const x = 0.6 + i * 4.15;
      card(s, x, 1.75, 3.85, 5.0);
      s.addImage({ data: ic, x: x + 1.47, y: 2.05, w: 0.9, h: 0.9 });
      text(s, h, { x: x + 0.25, y: 3.15, w: 3.35, h: 0.65, fontSize: 25, bold: true, color: NAVY, align: "center", margin: 0 });
      text(s, b, { x: x + 0.3, y: 3.95, w: 3.25, h: 2.6, fontSize: 21, align: "center", margin: 0 });
    });
    footer(s);
    s.addNotes("Masukan ini menjawab penolakan akses, penyembunyian aset dan dokumen, perlawanan pihak ketiga, dan tidak tersedianya pengamanan.");
  }
  pasalSlides("6", "Dukungan Pengamanan dan Ketentuan Pidana", P.m6);

  // ---------------- Masukan 7 ----------------
  {
    const s = newSlide();
    header(s, "Akuntabilitas Pengelolaan Boedel", "7");
    card(s, 0.6, 1.75, 4.6, 5.0, NAVY);
    text(s, "1", { x: 0.6, y: 1.9, w: 4.6, h: 1.5, fontSize: 96, bold: true, color: GOLD, align: "center", valign: "middle", margin: 0 });
    text(s, "rekening kepailitan untuk setiap perkara", { x: 0.85, y: 3.45, w: 4.1, h: 1.0, fontSize: 24, bold: true, color: WHITE, align: "center", margin: 0 });
    text(s, "Bagi Kurator Negara, rekening dikelola sesuai ketentuan penatausahaan uang pihak ketiga pada BHP.", { x: 0.85, y: 4.6, w: 4.1, h: 1.9, fontSize: 19, color: WHITE, align: "center", margin: 0 });
    text(s, "Untuk pembagian hasil pemberesan, RUU perlu memuat urutan prioritas pembayaran kepada Kreditor sebagai pedoman bagi kurator, dengan memperhatikan Putusan Mahkamah Konstitusi Nomor 67/PUU-XI/2013 mengenai kedudukan upah dan hak pekerja.", {
      x: 5.6, y: 1.75, w: 7.13, h: 5.0, fontSize: 25, margin: 0, valign: "middle",
    });
    footer(s);
    s.addNotes("Standar rekening terpisah, jejak audit, penilaian aset, penjualan, pembagian, pengungkapan konflik kepentingan, dan pelaporan diperkuat melalui kewajiban menyimpan seluruh uang harta pailit dalam satu rekening kepailitan untuk setiap perkara.");
  }
  pasalSlides("7", "Rekening Kepailitan dan Urutan Pembayaran", P.m7);

  // ---------------- Masukan 8 ----------------
  {
    const s = newSlide();
    header(s, "Pengawasan Berlapis yang Belum Terpadu", "8");
    const cols = [
      [I.gavel, "Hakim Pengawas", "pengawasan yuridis atas pengurusan dan pemberesan harta pailit"],
      [I.balance, "Majelis Pengawas Kurator", "pengawasan teknis dan administratif atas tahapan pelaksanaan pekerjaan kurator"],
      [I.users, "Komite Bersama", "pengawasan terkait pengembangan profesi dan organisasi kurator"],
    ];
    cols.forEach(([ic, h, b], i) => {
      const x = 0.6 + i * 4.15;
      card(s, x, 1.75, 3.85, 3.95);
      s.addImage({ data: ic, x: x + 1.47, y: 2.0, w: 0.9, h: 0.9 });
      text(s, h, { x: x + 0.25, y: 3.0, w: 3.35, h: 0.95, fontSize: 23, bold: true, color: NAVY, align: "center", valign: "middle", margin: 0 });
      text(s, b, { x: x + 0.3, y: 4.0, w: 3.25, h: 1.6, fontSize: 20, align: "center", margin: 0 });
    });
    text(s, "Pembagian pengawasan perlu ditegaskan agar hubungan kewenangan Hakim Pengawas, Kementerian Hukum, Komite Bersama, dan organisasi profesi tidak menimbulkan celah atau tumpang tindih.", {
      x: 0.6, y: 5.85, w: 12.13, h: 0.95, fontSize: 21, bold: true, color: NAVY, valign: "middle", margin: 0,
    });
    footer(s);
  }
  pasalSlides("8", "Pembagian Pengawasan", P.m8);

  // ---------------- Masukan 9 dan 10 ----------------
  {
    const s = newSlide();
    header(s, "Data yang Belum Optimal; Imbalan dan Risiko Profesi", "9, 10");
    const cols = [
      [I.db, "Data harta Debitor Pailit", "RUU perlu mewajibkan instansi atau lembaga terkait, seperti Badan Pertanahan Nasional, SAMSAT, PT Kustodian Sentral Efek Indonesia (KSEI), dan perbankan, untuk memberikan data harta Debitor Pailit yang dibutuhkan kurator dalam jangka waktu tertentu."],
      [I.coins, "Imbalan jasa", "RUU cukup menegaskan kembali dasar hukum pedoman imbalan jasa, serta menegaskan bahwa imbalan jasa yang diterima BHP merupakan Penerimaan Negara Bukan Pajak."],
    ];
    cols.forEach(([ic, h, b], i) => {
      const x = 0.6 + i * 6.28;
      card(s, x, 1.75, 5.85, 5.0);
      s.addImage({ data: ic, x: x + 0.3, y: 1.98, w: 0.6, h: 0.6 });
      text(s, h, { x: x + 1.1, y: 1.95, w: 4.5, h: 0.65, fontSize: 24, bold: true, color: NAVY, valign: "middle", margin: 0 });
      text(s, b, { x: x + 0.3, y: 2.85, w: 5.25, h: 3.7, fontSize: 22, margin: 0 });
    });
    footer(s);
    s.addNotes("Data diintegrasikan dalam satu sistem informasi terpusat dengan tetap melindungi data pribadi dan kerahasiaan perkara sesuai UU 27/2022. Menurut BHP Medan, transparansi imbalan, biaya operasional, jaminan pembayaran, dan asuransi tanggung jawab profesi tidak menjadi permasalahan pokok; imbalan jasa telah ditetapkan berdasarkan pedoman Menteri (Pasal 75 dan Pasal 234 ayat (5)), saat ini Peraturan Menteri Hukum Nomor 20 Tahun 2025.");
  }
  pasalSlides("9", "Kewajiban Penyediaan Data", P.m9);
  pasalSlides("10", "Imbalan Jasa", P.m10);

  // ---------------- Masukan 11 dan 12 ----------------
  {
    const s = newSlide();
    header(s, "Kepailitan Lintas Batas; Perlindungan Pihak Terdampak", "11, 12");
    const cols = [
      [I.globe, "Lintas batas", "Kurator wajib mematuhi ketentuan hukum internasional dan perjanjian internasional yang mengikat Indonesia. UNCITRAL Model Law on Cross-Border Insolvency (1997) dapat dijadikan acuan."],
      [I.comment, "Pengaduan", "Setiap pihak yang dirugikan dapat menyampaikan pengaduan melalui prosedur yang terbuka, sederhana, dan memiliki batas waktu penyelesaian yang jelas, tanpa menghentikan proses pengurusan dan pemberesan harta pailit."],
    ];
    cols.forEach(([ic, h, b], i) => {
      const x = 0.6 + i * 6.28;
      card(s, x, 1.75, 5.85, 5.0);
      s.addImage({ data: ic, x: x + 0.3, y: 1.98, w: 0.6, h: 0.6 });
      text(s, h, { x: x + 1.1, y: 1.95, w: 4.5, h: 0.65, fontSize: 24, bold: true, color: NAVY, valign: "middle", margin: 0 });
      text(s, b, { x: x + 0.3, y: 2.85, w: 5.25, h: 3.7, fontSize: 22, margin: 0 });
    });
    footer(s);
    s.addNotes("Masukan 11 menjawab belum adanya kerangka mengenai pengakuan proses kepailitan asing, kerja sama pengadilan, aset di luar negeri, dan kualifikasi praktisi asing. Masukan 12: kepentingan Debitor, Kreditor, pekerja, negara, konsumen, dan pihak ketiga diakomodasi melalui Majelis Pengawas Kurator dan Majelis Kehormatan Kurator.");
  }
  pasalSlides("11", "Kepailitan Lintas Batas", P.m11);
  pasalSlides("12", "Pengaduan", P.m12);

  // Rujukan
  {
    const s = newSlide();
    header(s, "Disusun di Atas Rujukan yang Kuat");
    const stats = [
      ["12", "undang-undang dan peraturan setingkat undang-undang"],
      ["5", "peraturan menteri"],
      ["1", "Putusan Mahkamah Konstitusi Nomor 67/PUU-XI/2013"],
      ["2", "dokumen UNCITRAL tentang hukum kepailitan"],
    ];
    stats.forEach(([big, lbl], i) => {
      const x = 0.6 + (i % 2) * 6.28;
      const y = 1.75 + Math.floor(i / 2) * 1.75;
      card(s, x, y, 5.85, 1.55);
      text(s, big, { x: x + 0.2, y, w: 1.5, h: 1.55, fontSize: 54, bold: true, color: NAVY, align: "center", valign: "middle", margin: 0 });
      text(s, lbl, { x: x + 1.85, y, w: 3.8, h: 1.55, fontSize: 21, valign: "middle", margin: 0 });
    });
    text(s, rich("Termasuk **UU 37/2004** tentang Kepailitan dan PKPU, **UU 30/2014** tentang Administrasi Pemerintahan, **UU 9/2018** tentang PNBP, **UU 27/2022** tentang Pelindungan Data Pribadi, **UU 20/2023** tentang ASN, dan **Permenkum 20/2025** tentang Pedoman Imbalan Jasa bagi Kurator dan Pengurus."), {
      x: 0.6, y: 5.35, w: 12.13, h: 1.45, fontSize: 20, margin: 0, valign: "middle",
    });
    footer(s);
    s.addNotes("Bahan masukan juga merujuk pada Term of Reference Kunjungan Kerja Komisi XIII DPR RI serta Buku Register Kepailitan dan Laporan Pengurusan dan Pemberesan Boedel Pailit Triwulan III Tahun 2026 BHP Medan.");
  }

  // Penutup
  {
    const s = newSlide(NAVY);
    text(s, "Penutup", { x: 0.8, y: 0.5, w: 11.7, h: 0.85, fontSize: 40, bold: true, color: GOLD, margin: 0 });
    text(s, "BHP Medan berharap RUU tentang Profesi Kurator dapat memperkuat kedudukan BHP sebagai Kurator Negara.", {
      x: 0.8, y: 1.45, w: 11.7, h: 1.05, fontSize: 26, bold: true, color: WHITE, margin: 0,
    });
    const pts = [
      "kewenangan BHP sebagai pengurus dalam PKPU untuk menutup celah hukum yang ada",
      "batas jumlah perkara yang dihitung per tim",
      "masa peralihan untuk mengalihkan kelebihan perkara",
    ];
    pts.forEach((t, i) => {
      const y = 2.7 + i * 0.75;
      s.addImage({ data: I.check, x: 0.8, y: y + 0.08, w: 0.5, h: 0.5 });
      text(s, t, { x: 1.55, y, w: 11.0, h: 0.66, fontSize: 24, color: WHITE, valign: "middle", margin: 0 });
    });
    text(s, "BHP dapat terus menjadi penyedia layanan kurator dan pengurus yang independen, akuntabel, dan dapat diakses oleh semua pihak.", {
      x: 0.8, y: 5.05, w: 11.7, h: 0.95, fontSize: 22, color: WHITE, margin: 0,
    });
    text(s, "Terima kasih", { x: 0.8, y: 6.1, w: 11.7, h: 0.9, fontSize: 44, bold: true, color: GOLD, margin: 0 });
    s.addNotes("Demikian bahan masukan ini disampaikan. Atas perhatian Pimpinan dan Anggota Komisi XIII DPR RI, kami ucapkan terima kasih.");
  }

  await pres.writeFile({ fileName: "Paparan_BHP_Medan_RUU_Profesi_Kurator.pptx" });
  console.log("slides:", slideNo, "pasal:", totalPasal, "penjelasan:", totalPenjelasan);
})();
