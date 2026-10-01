// Generator slide paparan Kepala BHP Medan — RDP Komisi XIII DPR RI, RUU Profesi Kurator.
// Jalankan: NODE_PATH=<folder node_modules> node build_slides.cjs
// Butuh: pptxgenjs, react, react-dom, react-icons, sharp.
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");

const NAVY = "14284B";
const GOLD = "E0A526";
const INK = "1A1A1A";
const SOFT = "EEF2F8";
const WHITE = "FFFFFF";
const FONT = "Arial";

async function icon(Comp, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Comp, { color: "#" + color, size: String(size) })
  );
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in
pres.title = "Bahan Masukan BHP Medan — RUU Profesi Kurator";
pres.author = "Balai Harta Peninggalan Medan";

const W = 13.333;

function text(slide, t, opts) {
  slide.addText(t, { fontFace: FONT, color: INK, isTextBox: true, valign: "top", ...opts });
}

// Judul slide konten: lencana nomor masukan (opsional) + judul besar.
function header(slide, title, num) {
  let x = 0.6;
  if (num) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.6, y: 0.45, w: 1.05, h: 1.05, fill: { color: NAVY }, rectRadius: 0.15,
    });
    text(slide, num, {
      x: 0.6, y: 0.45, w: 1.05, h: 1.05, fontSize: num.length > 2 ? 26 : 40, bold: true,
      color: GOLD, align: "center", valign: "middle", margin: 0,
    });
    x = 1.95;
  }
  text(slide, title, {
    x, y: 0.45, w: W - x - 0.6, h: 1.05, fontSize: 36, bold: true, color: NAVY,
    valign: "middle", margin: 0,
  });
}

function footer(slide, n) {
  text(slide, "BHP Medan · RDP Komisi XIII DPR RI", {
    x: 0.6, y: 6.95, w: 8, h: 0.4, fontSize: 14, color: "4A5568", margin: 0, valign: "middle",
  });
  text(slide, String(n), {
    x: W - 1.6, y: 6.95, w: 1.0, h: 0.4, fontSize: 14, color: "4A5568", align: "right",
    margin: 0, valign: "middle",
  });
}

function bullets(slide, items, opts) {
  const arr = items.map((it, i) => ({
    text: it,
    options: { bullet: { indent: 30 }, breakLine: i < items.length - 1, paraSpaceAfter: 14 },
  }));
  text(slide, arr, { fontSize: 26, ...opts });
}

function card(slide, x, y, w, h, fill = SOFT) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, fill: { color: fill }, rectRadius: 0.12, line: { color: fill },
  });
}

function numDot(slide, n, x, y, d = 0.6) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: NAVY }, line: { color: NAVY } });
  text(slide, String(n), {
    x, y, w: d, h: d, fontSize: 22, bold: true, color: WHITE, align: "center",
    valign: "middle", margin: 0,
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
    check: await icon(fa.FaCheckCircle, GOLD),
    arrow: await icon(fa.FaArrowRight, NAVY),
  };
  let n = 0;

  // 1. Judul
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    text(s, "KEMENTERIAN HUKUM REPUBLIK INDONESIA\nBALAI HARTA PENINGGALAN MEDAN", {
      x: 0.8, y: 0.6, w: 11.7, h: 1.0, fontSize: 20, bold: true, color: GOLD, margin: 0,
    });
    text(s, "Bahan Masukan BHP Medan", {
      x: 0.8, y: 1.95, w: 11.7, h: 1.1, fontSize: 54, bold: true, color: WHITE, margin: 0,
    });
    text(s, "RUU tentang Profesi Kurator", {
      x: 0.8, y: 3.05, w: 11.7, h: 0.9, fontSize: 40, bold: true, color: GOLD, margin: 0,
    });
    text(s, "Peran Balai Harta Peninggalan dalam Pelaksanaan Tugas Kurator\nRapat Dengar Pendapat dengan Komisi XIII DPR RI", {
      x: 0.8, y: 4.1, w: 11.7, h: 1.2, fontSize: 24, color: WHITE, margin: 0,
    });
    text(s, [
      { text: "Syafriadi Lubis", options: { bold: true, breakLine: true } },
      { text: "Kepala BHP Medan · Medan, 1 Oktober 2026" },
    ], { x: 0.8, y: 5.75, w: 11.7, h: 1.0, fontSize: 22, color: WHITE, margin: 0 });
    s.addNotes("Pembukaan. Salam hormat kepada Pimpinan dan Anggota Komisi XIII DPR RI. BHP Medan menyampaikan bahan masukan penyusunan RUU tentang Profesi Kurator, difokuskan pada peran BHP dalam pelaksanaan tugas kurator.");
    n++;
  }

  // 2. Pendahuluan
  {
    const s = pres.addSlide(); n++;
    header(s, "Pendahuluan");
    card(s, 0.6, 1.8, 5.6, 3.3, NAVY);
    text(s, "BHP Medan mendukung penuh pembentukan RUU tentang Profesi Kurator", {
      x: 0.95, y: 2.05, w: 4.9, h: 2.8, fontSize: 30, bold: true, color: WHITE, valign: "middle", margin: 0,
    });
    const rows = [
      ["Kurator dari unsur pemerintah", "Pasal 70 ayat (1) UU 37/2004"],
      ["Kurator yang ditunjuk undang-undang", "Pasal 15 ayat (2) UU 37/2004"],
    ];
    rows.forEach(([a, b], i) => {
      const y = 1.8 + i * 1.7;
      card(s, 6.6, y, 6.1, 1.5);
      s.addImage({ data: I.gov, x: 6.85, y: y + 0.4, w: 0.7, h: 0.7 });
      text(s, [
        { text: a, options: { bold: true, breakLine: true } },
        { text: b, options: { fontSize: 22 } },
      ], { x: 7.8, y: y + 0.15, w: 4.75, h: 1.2, fontSize: 24, color: NAVY, valign: "middle", margin: 0 });
    });
    text(s, [
      { text: "Istilah:  ", options: { bold: true } },
      { text: "BHP = Kurator Negara   ·   kurator perseorangan = Kurator Swasta" },
    ], { x: 0.6, y: 5.45, w: 12.1, h: 0.9, fontSize: 24, color: INK, valign: "middle", margin: 0 });
    footer(s, n);
    s.addNotes("BHP merupakan kurator dari unsur pemerintah berdasarkan Pasal 70 ayat (1) UU Kepailitan dan PKPU, sekaligus kurator yang ditunjuk oleh undang-undang berdasarkan Pasal 15 ayat (2). Oleh karena itu, kedudukan BHP perlu diatur secara khusus dalam RUU. Dalam bahan ini, BHP disebut Kurator Negara dan kurator perseorangan disebut Kurator Swasta. Setiap masukan disertai usulan rumusan pasal.");
  }

  // 3. 12 masukan — angka besar
  {
    const s = pres.addSlide(); n++;
    header(s, "12 Masukan BHP Medan");
    const cols = [
      ["2", "Masukan", "Peran BHP dalam tugas kurator", "Agenda rapat · Masukan 1–2"],
      ["10", "Masukan", "Isu strategis dalam ToR Komisi XIII DPR RI", "Masukan 3–12"],
    ];
    cols.forEach(([big, unit, desc, sub], i) => {
      const x = 0.6 + i * 6.25;
      card(s, x, 1.8, 5.85, 4.4);
      text(s, big, { x, y: 2.0, w: 5.85, h: 1.7, fontSize: 110, bold: true, color: NAVY, align: "center", valign: "middle", margin: 0 });
      text(s, unit, { x, y: 3.7, w: 5.85, h: 0.5, fontSize: 24, bold: true, color: NAVY, align: "center", margin: 0 });
      text(s, [
        { text: desc, options: { breakLine: true } },
        { text: sub, options: { fontSize: 20, color: "4A5568" } },
      ], { x: x + 0.3, y: 4.35, w: 5.25, h: 1.6, fontSize: 24, color: INK, align: "center", margin: 0 });
    });
    text(s, "Setiap masukan disertai usulan rumusan pasal", {
      x: 0.6, y: 6.3, w: 12.1, h: 0.55, fontSize: 22, bold: true, color: NAVY, align: "center", margin: 0,
    });
    footer(s, n);
    s.addNotes("BHP Medan menyampaikan 12 masukan: 2 masukan terkait peran BHP sesuai agenda rapat dalam surat undangan (masukan 1 dan 2), dan 10 masukan yang menjawab 10 isu strategis dalam matriks permasalahan Term of Reference Kunjungan Kerja Komisi XIII DPR RI (masukan 3 sampai 12).");
  }

  // 4. Daftar 12 masukan
  {
    const s = pres.addSlide(); n++;
    header(s, "Daftar Masukan");
    const list = [
      "BHP sebagai Pengurus PKPU", "Batas Jumlah Perkara BHP", "Kekosongan Rezim Profesi",
      "Standar yang Terfragmentasi", "Batas Perlindungan & Tanggung Jawab", "Hambatan Pelaksanaan Tugas",
      "Akuntabilitas Pengelolaan Boedel", "Pengawasan yang Belum Terpadu", "Data yang Belum Optimal",
      "Imbalan dan Risiko Profesi", "Kepailitan Lintas Batas", "Perlindungan Pihak Terdampak",
    ];
    list.forEach((t, i) => {
      const col = i < 6 ? 0 : 1;
      const row = i % 6;
      const x = 0.6 + col * 6.25;
      const y = 1.75 + row * 0.82;
      numDot(s, i + 1, x, y, 0.62);
      text(s, t, {
        x: x + 0.85, y, w: 5.3, h: 0.62, fontSize: 23, bold: i < 2, color: i < 2 ? NAVY : INK,
        valign: "middle", margin: 0,
      });
    });
    footer(s, n);
    s.addNotes("Masukan 1 dan 2 (dicetak tebal) adalah fokus utama sesuai agenda rapat: peran BHP. Masukan 3 sampai 12 menjawab isu strategis dalam ToR.");
  }

  // 5. Masukan 1 — masalah
  {
    const s = pres.addSlide(); n++;
    header(s, "BHP sebagai Pengurus PKPU: Masalahnya", "1");
    const cols = [
      ["KEPAILITAN", NAVY, WHITE, ["BHP disebut tegas sebagai kurator", "BHP ditunjuk UU bila tidak ada usul kurator"]],
      ["PKPU", SOFT, NAVY, ["Pasal 234 ayat (3) hanya menyebut orang perseorangan", "Tidak ada pengurus yang ditunjuk UU"]],
    ];
    cols.forEach(([h, fill, fg, items], i) => {
      const x = 0.6 + i * 6.25;
      card(s, x, 1.8, 5.85, 3.5, fill);
      text(s, h, { x: x + 0.35, y: 1.95, w: 5.2, h: 0.65, fontSize: 28, bold: true, color: i ? NAVY : GOLD, margin: 0 });
      bullets(s, items, { x: x + 0.35, y: 2.7, w: 5.2, h: 2.5, fontSize: 24, color: fg, margin: 0 });
    });
    text(s, [
      { text: "Celah hukum: ", options: { bold: true, color: NAVY } },
      { text: "PKPU sementara wajib dikabulkan dalam 3 hari (Debitor) / 20 hari (Kreditor) dan pengurus harus diangkat — tetapi UU tidak mengatur siapa pengurusnya bila tidak ada usul." },
    ], { x: 0.6, y: 5.5, w: 12.1, h: 1.3, fontSize: 22, color: INK, margin: 0, valign: "middle" });
    footer(s, n);
    s.addNotes("Dalam kepailitan, UU menyebut BHP sebagai kurator (Pasal 70 ayat 1) dan kurator yang ditunjuk UU (Pasal 15 ayat 2). Dalam PKPU, Pasal 234 ayat (3) hanya menyebut orang perseorangan. Ketentuan itu tidak melarang BHP, hanya tidak menyebut. Padahal kepailitan dan PKPU satu sistem: satu undang-undang, Pengadilan Niaga yang sama, Hakim Pengawas, pedoman imbalan jasa yang sama, dan satu Permenkumham 37/2018. Pasal 225 ayat (2) dan (3) mewajibkan PKPU sementara dikabulkan paling lambat 3 hari (permohonan Debitor) dan 20 hari (permohonan Kreditor), dengan mengangkat pengurus. Namun tidak diatur siapa pengurusnya bila tidak diusulkan atau yang diusulkan tidak memenuhi syarat Pasal 234 ayat (1).");
  }

  // 6. Masukan 1 — alasan
  {
    const s = pres.addSlide(); n++;
    header(s, "Mengapa BHP Layak Menjadi Pengurus", "1");
    const rows = [
      ["Menutup celah hukum", "pola Pasal 15 ayat (2) yang sudah teruji"],
      ["Mampu tugas berat, pasti mampu tugas ringan", "kurator lebih luas dari pengurus"],
      ["Netral dan independen", "imbalan BHP masuk kas negara (PNBP)"],
      ["Berkesinambungan", "dari PKPU ke pailit: lebih cepat, lebih hemat"],
      ["Kewenangan harus tegas dalam UU", "badan pemerintah butuh atribusi (UU 30/2014)"],
    ];
    rows.forEach(([a, b], i) => {
      const y = 1.75 + i * 1.0;
      numDot(s, i + 1, 0.6, y + 0.12, 0.62);
      text(s, [
        { text: a, options: { bold: true, color: NAVY } },
        { text: "  —  " + b, options: { color: INK } },
      ], { x: 1.45, y, w: 11.3, h: 0.86, fontSize: 24, valign: "middle", margin: 0 });
    });
    footer(s, n);
    s.addNotes("Lima alasan: (1) Celah tertutup dengan pola yang sudah dikenal dan teruji dalam Pasal 15 ayat (2) — tidak memperkenalkan konsep baru. (2) Argumentum a maiore ad minus: kewenangan kurator (mengambil alih dan membereskan seluruh harta, Pasal 24 dan 69) jauh lebih luas dari pengurus (memberi persetujuan, Pasal 240 ayat 1). (3) Imbalan jasa BHP disetor ke kas negara sebagai PNBP (UU 9/2018); pejabat tidak memperoleh keuntungan pribadi, sehingga BHP pilihan netral terutama dalam PKPU yang diajukan Kreditor. (4) Bila PKPU berakhir pailit (Pasal 230 ayat 1, Pasal 289), data harta dan hasil pencocokan tagihan tetap di lembaga yang sama. (5) Bagi perseorangan, yang tidak dilarang boleh; bagi badan pemerintahan, yang tidak diberi kewenangan tidak boleh (Pasal 11 dan 12 ayat 1 UU 30/2014). Karena itu harus ditegaskan dalam UU.");
  }

  // 7. Masukan 1 — usulan
  {
    const s = pres.addSlide(); n++;
    header(s, "Usulan Pengaturan", "1");
    card(s, 0.6, 1.8, 12.1, 1.35, NAVY);
    text(s, [
      { text: "Pengurus PKPU terdiri atas:  ", options: { color: WHITE } },
      { text: "BHP  dan  Pengurus Swasta", options: { color: GOLD, bold: true } },
    ], { x: 0.95, y: 1.8, w: 11.4, h: 1.35, fontSize: 30, bold: true, valign: "middle", margin: 0 });
    bullets(s, [
      "BHP diangkat bila tidak ada usul pengurus, atau pengurus yang diusulkan tidak memenuhi syarat",
      "Berlaku sepanjang BHP masih punya tim yang belum penuh",
      "Bila semua tim penuh, Pengadilan mengangkat Pengurus Swasta",
      "Perkara PKPU dihitung dalam batas jumlah perkara BHP",
    ], { x: 0.6, y: 3.45, w: 12.1, h: 3.3, fontSize: 26, margin: 0 });
    footer(s, n);
    s.addNotes("Usulan rumusan pasal: Kurator terdiri atas Kurator Negara dan Kurator Swasta. Pengurus terdiri atas Balai Harta Peninggalan dan Pengurus Swasta. Dalam hal Debitor atau Kreditor pemohon PKPU tidak mengusulkan pengurus, atau pengurus yang diusulkan tidak memenuhi persyaratan, BHP diangkat selaku Pengurus sepanjang masih memiliki Tim Kurator Keperdataan yang belum mencapai batas jumlah perkara. Dalam hal seluruh tim telah penuh, Pengadilan mengangkat Pengurus Swasta. Tugas dilaksanakan oleh pejabat Kurator Keperdataan.");
  }

  // 8. Masukan 2 — batas per tim
  {
    const s = pres.addSlide(); n++;
    header(s, "Batas Jumlah Perkara Berlaku bagi BHP", "2");
    const tiles = [
      ["3", "pejabat Kurator Keperdataan\ndalam 1 tim"],
      ["3", "perkara maksimal\nper tim pada waktu sama"],
      ["Tim × 3", "kapasitas BHP\nterukur & terencana"],
    ];
    tiles.forEach(([big, lbl], i) => {
      const x = 0.6 + i * 4.1;
      card(s, x, 1.8, 3.8, 2.9);
      text(s, big, { x, y: 1.9, w: 3.8, h: 1.4, fontSize: big.length > 2 ? 54 : 80, bold: true, color: NAVY, align: "center", valign: "middle", margin: 0 });
      text(s, lbl, { x: x + 0.2, y: 3.35, w: 3.4, h: 1.2, fontSize: 22, color: INK, align: "center", margin: 0 });
    });
    bullets(s, [
      "PKPU yang berlanjut pailit dan tetap di BHP dihitung 1 perkara",
      "Semua tim penuh: Kepala BHP memberi tahu Pengadilan secara tertulis",
    ], { x: 0.6, y: 5.0, w: 12.1, h: 1.8, fontSize: 24, margin: 0 });
    footer(s, n);
    s.addNotes("Pasal 15 ayat (3) membatasi kurator maksimal 3 perkara, tetapi belum jelas apakah dihitung untuk BHP sebagai lembaga atau per pejabat; sementara kewajiban menerima penunjukan Pasal 15 ayat (2) membuat perkara BHP bertambah tanpa batas. Alasan batas berlaku bagi BHP: menjaga kapasitas agar pengurusan cermat dan tepat waktu; tanpa batas mutu menurun, perkara tertunda merugikan Kreditor dan pekerja, dan pejabat menanggung risiko tanggung jawab (Pasal 72); perlakuan sama memperkuat kepercayaan. Dihitung per tim karena Pengadilan mengangkat BHP sebagai lembaga dan pekerjaan dilaksanakan secara tim.");
  }

  // 9. Masukan 2 — peralihan
  {
    const s = pres.addSlide(); n++;
    header(s, "Masa Peralihan 6 Bulan", "2");
    const steps = [
      "Perkara berjalan tetap ditangani BHP",
      "Alihkan ke tim lain (surat tugas Kepala BHP)",
      "Bila tak tertampung: mohon penggantian kurator (Pasal 71)",
    ];
    steps.forEach((t, i) => {
      const x = 0.6 + i * 4.15;
      card(s, x, 1.85, 3.6, 2.6);
      numDot(s, i + 1, x + 0.3, 2.05, 0.62);
      text(s, t, { x: x + 0.3, y: 2.8, w: 3.05, h: 1.55, fontSize: 22, bold: true, color: NAVY, margin: 0 });
      if (i < 2) s.addImage({ data: I.arrow, x: x + 3.7, y: 2.95, w: 0.4, h: 0.4 });
    });
    card(s, 0.6, 4.75, 12.1, 1.95, NAVY);
    text(s, "6 BULAN", { x: 0.9, y: 4.75, w: 3.6, h: 1.95, fontSize: 48, bold: true, color: GOLD, valign: "middle", margin: 0 });
    text(s, "batas waktu pengalihan sejak UU diundangkan — selama masa ini kelebihan perkara tidak dianggap pelanggaran", {
      x: 4.5, y: 4.75, w: 7.9, h: 1.95, fontSize: 24, color: WHITE, valign: "middle", margin: 0,
    });
    footer(s, n);
    s.addNotes("Tanpa ketentuan peralihan ada tiga risiko: BHP langsung dianggap melanggar batas, keabsahan tindakan dalam perkara berjalan dapat dipersoalkan, dan BHP tidak dapat menerima penunjukan baru padahal diwajibkan UU. Usulan: perkara berjalan tetap dilaksanakan BHP; kelebihan dialihkan paling lama 6 bulan; terlebih dahulu ke tim lain cukup dengan surat tugas Kepala BHP karena Pengadilan mengangkat BHP sebagai lembaga; bila tidak tertampung, mohon penggantian kurator ke Pengadilan berdasarkan Pasal 71. Enam bulan cukup untuk membentuk tim dan mengajukan penggantian, tetapi tidak terlalu lama.");
  }

  // 10. Masukan 3 & 4
  {
    const s = pres.addSlide(); n++;
    header(s, "Rezim Profesi dan Standar Nasional", "3–4");
    const cols = [
      ["Kurator Swasta", "dibina oleh Organisasi Profesi"],
      ["Kurator Negara (BHP)", "dibina oleh Kementerian Hukum sebagai ASN (UU 20/2023)"],
    ];
    cols.forEach(([a, b], i) => {
      const x = 0.6 + i * 6.25;
      card(s, x, 1.8, 5.85, 2.0);
      s.addImage({ data: i ? I.gov : I.users, x: x + 0.3, y: 2.45, w: 0.7, h: 0.7 });
      text(s, [
        { text: a, options: { bold: true, color: NAVY, breakLine: true } },
        { text: b, options: { fontSize: 22 } },
      ], { x: x + 1.25, y: 1.95, w: 4.4, h: 1.7, fontSize: 26, valign: "middle", margin: 0 });
    });
    bullets(s, [
      "Majelis Pengawas Kurator: unsur pemerintah, organisasi profesi, dan akademisi",
      "Satu standar profesi nasional ditetapkan Menteri — tanpa melebur organisasi profesi",
    ], { x: 0.6, y: 4.15, w: 12.1, h: 2.6, fontSize: 26, margin: 0 });
    footer(s, n);
    s.addNotes("Pendidikan, sertifikasi, registrasi, kode etik, disiplin, asuransi, dan perlindungan hukum dibedakan sesuai jenis kurator. Kurator Swasta oleh organisasi profesi; Kurator Negara oleh Kementerian Hukum karena pejabat Kurator Keperdataan adalah ASN dalam jabatan fungsional. Majelis Pengawas Kurator mengawasi seluruh kurator, menerima pengaduan, menjatuhkan sanksi administratif kepada Kurator Swasta atau merekomendasikan kepada Menteri untuk pejabat Kurator Keperdataan. Standar profesi nasional paling sedikit meliputi kurikulum, materi dan tata cara ujian, kode etik, standar pelaksanaan tugas, serta jenis dan tata cara sanksi.");
  }

  // 11. Masukan 5
  {
    const s = pres.addSlide(); n++;
    header(s, "Majelis Kehormatan Kurator", "5");
    text(s, "Memeriksa laporan lebih dulu sebelum kurator dipanggil aparat penegak hukum, lalu memilah:", {
      x: 0.6, y: 1.75, w: 7.2, h: 1.2, fontSize: 24, color: INK, margin: 0,
    });
    ["Sengketa teknis kepailitan", "Pelanggaran kode etik", "Pelanggaran administratif", "Tanggung jawab perdata", "Dugaan tindak pidana"]
      .forEach((t, i) => {
        const y = 3.0 + i * 0.75;
        card(s, 0.6, y, 7.0, 0.62);
        text(s, t, { x: 0.85, y, w: 6.6, h: 0.62, fontSize: 22, bold: true, color: NAVY, valign: "middle", margin: 0 });
      });
    card(s, 8.1, 1.8, 4.6, 4.95, NAVY);
    text(s, "30", { x: 8.1, y: 2.0, w: 4.6, h: 1.6, fontSize: 96, bold: true, color: GOLD, align: "center", valign: "middle", margin: 0 });
    text(s, "hari kerja\nbatas jawaban", { x: 8.1, y: 3.6, w: 4.6, h: 1.0, fontSize: 24, bold: true, color: WHITE, align: "center", margin: 0 });
    text(s, "Tidak dijawab = dianggap disetujui. Bukan imunitas.", { x: 8.4, y: 4.9, w: 4.0, h: 1.6, fontSize: 22, color: WHITE, align: "center", valign: "middle", margin: 0 });
    footer(s, n);
    s.addNotes("Penyidik, penuntut umum, atau hakim dengan persetujuan Majelis Kehormatan Kurator berwenang memanggil Kurator atau Pengurus terkait tindakan dalam pelaksanaan tugasnya. Majelis wajib menjawab paling lama 30 hari kerja; bila tidak menjawab dianggap menerima, agar mekanisme ini tidak menjadi imunitas yang menghambat proses hukum. Majelis terdiri atas unsur pemerintah, organisasi profesi, dan akademisi. Model ini sejalan dengan saran ToR untuk mempertimbangkan praktik Majelis Kehormatan Notaris.");
  }

  // 12. Masukan 6
  {
    const s = pres.addSlide(); n++;
    header(s, "Hambatan Pelaksanaan Tugas", "6");
    const cards = [
      [I.shield, "Pengamanan", "Polri wajib mendampingi dan mengamankan kurator atas permintaan"],
      [I.folder, "Akses & Dokumen", "Debitor dan pihak yang menguasai harta wajib memberi akses dan dokumen"],
      [I.gavel, "Sanksi Pidana", "Menghalangi kurator: penjara maks. 2 tahun atau denda kategori IV"],
    ];
    cards.forEach(([ic, h, b], i) => {
      const x = 0.6 + i * 4.1;
      card(s, x, 1.8, 3.8, 4.9);
      s.addImage({ data: ic, x: x + 1.45, y: 2.1, w: 0.9, h: 0.9 });
      text(s, h, { x: x + 0.25, y: 3.2, w: 3.3, h: 0.7, fontSize: 26, bold: true, color: NAVY, align: "center", margin: 0 });
      text(s, b, { x: x + 0.3, y: 4.0, w: 3.2, h: 2.5, fontSize: 22, color: INK, align: "center", margin: 0 });
    });
    footer(s, n);
    s.addNotes("Untuk mengatasi penolakan akses, penyembunyian aset dan dokumen, perlawanan pihak ketiga, dan tidak tersedianya pengamanan: Polri wajib memberikan pendampingan dan pengamanan atas permintaan Kurator, Pengurus, atau Hakim Pengawas, diajukan tertulis dengan melampirkan salinan putusan atau penetapan. Debitor Pailit dan pihak yang menguasai harta pailit wajib memberikan akses, keterangan, dan dokumen. Setiap orang yang dengan sengaja menghalangi Kurator atau Pengurus dipidana penjara paling lama 2 tahun atau denda paling banyak kategori IV.");
  }

  // 13. Masukan 7
  {
    const s = pres.addSlide(); n++;
    header(s, "Akuntabilitas Pengelolaan Boedel", "7");
    card(s, 0.6, 1.8, 4.6, 4.95, NAVY);
    text(s, "1", { x: 0.6, y: 1.95, w: 4.6, h: 1.4, fontSize: 96, bold: true, color: GOLD, align: "center", valign: "middle", margin: 0 });
    text(s, "rekening kepailitan untuk setiap perkara", { x: 0.85, y: 3.35, w: 4.1, h: 1.1, fontSize: 24, bold: true, color: WHITE, align: "center", margin: 0 });
    text(s, "Setiap uang masuk & keluar dicatat, ada bukti, dan dilaporkan ke Hakim Pengawas", { x: 0.85, y: 4.6, w: 4.1, h: 1.9, fontSize: 20, color: WHITE, align: "center", margin: 0 });
    text(s, "Urutan pembayaran", { x: 5.6, y: 1.75, w: 7.1, h: 0.6, fontSize: 26, bold: true, color: NAVY, margin: 0 });
    ["Biaya kepailitan & imbalan kurator", "Upah pekerja yang terutang", "Kreditor pemegang jaminan kebendaan", "Hak pekerja lainnya", "Tagihan negara & hak didahulukan", "Kreditor konkuren (seimbang)"]
      .forEach((t, i) => {
        const y = 2.4 + i * 0.66;
        numDot(s, i + 1, 5.6, y, 0.55);
        text(s, t, { x: 6.35, y, w: 6.35, h: 0.55, fontSize: 22, color: INK, valign: "middle", margin: 0 });
      });
    text(s, "Memperhatikan Putusan MK 67/PUU-XI/2013", { x: 5.6, y: 6.35, w: 7.1, h: 0.45, fontSize: 18, bold: true, color: NAVY, margin: 0 });
    footer(s, n);
    s.addNotes("Kurator wajib menyimpan seluruh uang harta pailit dalam satu rekening kepailitan untuk setiap perkara; setiap penerimaan dan pengeluaran dicatat, didukung bukti, dan dilaporkan ke Hakim Pengawas. Bagi Kurator Negara, rekening ditatausahakan sesuai ketentuan penatausahaan uang pihak ketiga pada BHP. Urutan pembayaran memperhatikan Putusan MK 67/PUU-XI/2013: upah pekerja di atas semua jenis tagihan termasuk kreditor separatis, dan hak pekerja lainnya di atas tagihan negara kecuali kreditor pemegang jaminan kebendaan.");
  }

  // 14. Masukan 8
  {
    const s = pres.addSlide(); n++;
    header(s, "Pembagian Pengawasan", "8");
    const cols = [
      [I.gavel, "Hakim Pengawas", "Pengawasan yuridis atas pengurusan dan pemberesan"],
      [I.balance, "Majelis Pengawas Kurator", "Pengawasan teknis dan administratif"],
      [I.users, "Komite Bersama", "Pengembangan profesi dan organisasi"],
    ];
    cols.forEach(([ic, h, b], i) => {
      const x = 0.6 + i * 4.1;
      card(s, x, 1.8, 3.8, 3.9);
      s.addImage({ data: ic, x: x + 1.45, y: 2.1, w: 0.9, h: 0.9 });
      text(s, h, { x: x + 0.25, y: 3.15, w: 3.3, h: 1.0, fontSize: 24, bold: true, color: NAVY, align: "center", valign: "middle", margin: 0 });
      text(s, b, { x: x + 0.3, y: 4.2, w: 3.2, h: 1.4, fontSize: 22, color: INK, align: "center", margin: 0 });
    });
    text(s, "Tidak mengurangi kewenangan Menteri dalam pembinaan kepegawaian pejabat Kurator Keperdataan", {
      x: 0.6, y: 5.95, w: 12.1, h: 0.85, fontSize: 22, color: NAVY, bold: true, align: "center", valign: "middle", margin: 0,
    });
    footer(s, n);
    s.addNotes("Pembagian pengawasan ditegaskan agar hubungan kewenangan Hakim Pengawas, Kementerian Hukum, Komite Bersama, dan organisasi profesi tidak menimbulkan celah atau tumpang tindih. Tata cara pengawasan diatur lebih lanjut dengan Peraturan Pemerintah.");
  }

  // 15. Masukan 9 & 10
  {
    const s = pres.addSlide(); n++;
    header(s, "Data Harta dan Imbalan Jasa", "9–10");
    card(s, 0.6, 1.8, 5.85, 4.95);
    s.addImage({ data: I.db, x: 0.9, y: 2.05, w: 0.7, h: 0.7 });
    text(s, "Kewajiban Penyediaan Data", { x: 1.8, y: 2.05, w: 4.5, h: 0.7, fontSize: 24, bold: true, color: NAVY, valign: "middle", margin: 0 });
    bullets(s, [
      "BPN, SAMSAT, KSEI, perbankan wajib beri data maks. 14 hari kerja",
      "Rahasia bank tidak berlaku bagi kurator",
      "Sistem informasi terintegrasi; data pribadi tetap dilindungi",
    ], { x: 0.9, y: 3.0, w: 5.3, h: 3.6, fontSize: 22, margin: 0 });
    card(s, 6.85, 1.8, 5.85, 4.95);
    s.addImage({ data: I.coins, x: 7.15, y: 2.05, w: 0.7, h: 0.7 });
    text(s, "Imbalan Jasa", { x: 8.05, y: 2.05, w: 4.5, h: 0.7, fontSize: 24, bold: true, color: NAVY, valign: "middle", margin: 0 });
    bullets(s, [
      "Ditetapkan Pengadilan berdasarkan pedoman Menteri (Permenkum 20/2025)",
      "Imbalan jasa yang diterima BHP merupakan PNBP",
    ], { x: 7.15, y: 3.0, w: 5.3, h: 3.6, fontSize: 22, margin: 0 });
    footer(s, n);
    s.addNotes("Masukan 9: kementerian, lembaga, pemerintah daerah, dan badan hukum yang menyimpan data harta Debitor Pailit wajib memberikan data atas permintaan Kurator paling lama 14 hari kerja, dengan melampirkan salinan putusan pailit dan bukti pengangkatan. Rahasia bank tidak berlaku. Menteri menyelenggarakan sistem informasi kurator yang terintegrasi, sesuai UU 27/2022 tentang Pelindungan Data Pribadi. Masukan 10: menurut BHP Medan, imbalan dan risiko profesi bukan masalah pokok; imbalan jasa telah diatur pedoman Menteri (Pasal 75 dan 234 ayat 5; Permenkum 20/2025). RUU cukup menegaskan dasar hukumnya dan bahwa imbalan BHP adalah PNBP.");
  }

  // 16. Masukan 11 & 12
  {
    const s = pres.addSlide(); n++;
    header(s, "Lintas Batas dan Pengaduan", "11–12");
    card(s, 0.6, 1.8, 5.85, 4.95);
    s.addImage({ data: I.globe, x: 0.9, y: 2.05, w: 0.7, h: 0.7 });
    text(s, "Kepailitan Lintas Batas", { x: 1.8, y: 2.05, w: 4.5, h: 0.7, fontSize: 24, bold: true, color: NAVY, valign: "middle", margin: 0 });
    bullets(s, [
      "Kurator patuh hukum & perjanjian internasional",
      "Kerja sama dengan pengadilan asing",
      "Kurator asing bertindak bersama kurator terdaftar di Indonesia",
      "Acuan: UNCITRAL Model Law 1997",
    ], { x: 0.9, y: 3.0, w: 5.3, h: 3.6, fontSize: 22, margin: 0 });
    card(s, 6.85, 1.8, 5.85, 4.95);
    s.addImage({ data: I.comment, x: 7.15, y: 2.05, w: 0.7, h: 0.7 });
    text(s, "Pengaduan", { x: 8.05, y: 2.05, w: 4.5, h: 0.7, fontSize: 24, bold: true, color: NAVY, valign: "middle", margin: 0 });
    bullets(s, [
      "Pihak yang dirugikan mengadu ke Majelis Pengawas Kurator",
      "Diputus maks. 60 hari",
      "Tidak menghentikan proses kepailitan",
    ], { x: 7.15, y: 3.0, w: 5.3, h: 3.6, fontSize: 22, margin: 0 });
    footer(s, n);
    s.addNotes("Masukan 11: kurator wajib mematuhi hukum internasional dan perjanjian internasional yang mengikat Indonesia; Pengadilan dan Kurator dapat bekerja sama dengan pengadilan dan wakil kepailitan di negara lain; wakil kepailitan asing hanya dapat bertindak atas harta di Indonesia bersama Kurator terdaftar di Indonesia; diatur lebih lanjut dengan PP. Masukan 12: kepentingan Debitor, Kreditor, pekerja, negara, konsumen, dan pihak ketiga diakomodasi melalui Majelis Pengawas Kurator dan Majelis Kehormatan Kurator; pengaduan diperiksa dan diputus paling lama 60 hari, tanpa menghentikan pengurusan dan pemberesan.");
  }

  // 17. Penutup
  {
    const s = pres.addSlide(); n++;
    s.background = { color: NAVY };
    text(s, "Penutup", { x: 0.8, y: 0.55, w: 11.7, h: 0.9, fontSize: 40, bold: true, color: GOLD, margin: 0 });
    const pts = [
      "BHP sebagai Pengurus PKPU untuk menutup celah hukum",
      "Batas jumlah perkara dihitung per tim",
      "Masa peralihan 6 bulan untuk kelebihan perkara",
      "BHP: independen, akuntabel, dan dapat diakses semua pihak",
    ];
    pts.forEach((t, i) => {
      const y = 1.75 + i * 0.95;
      s.addImage({ data: I.check, x: 0.8, y: y + 0.1, w: 0.55, h: 0.55 });
      text(s, t, { x: 1.6, y, w: 11.0, h: 0.75, fontSize: 28, color: WHITE, valign: "middle", margin: 0 });
    });
    text(s, "Terima kasih", { x: 0.8, y: 5.75, w: 11.7, h: 1.0, fontSize: 48, bold: true, color: GOLD, margin: 0 });
    s.addNotes("BHP Medan berharap RUU memperkuat kedudukan BHP sebagai Kurator Negara: kewenangan sebagai pengurus PKPU untuk menutup celah hukum, tetap tunduk pada batas jumlah perkara per tim, dengan masa peralihan untuk mengalihkan kelebihan perkara. Demikian bahan masukan ini disampaikan. Atas perhatian Pimpinan dan Anggota Komisi XIII DPR RI, kami ucapkan terima kasih.");
  }

  await pres.writeFile({ fileName: "Paparan_BHP_Medan_RUU_Profesi_Kurator.pptx" });
  console.log("slides:", n);
})();
