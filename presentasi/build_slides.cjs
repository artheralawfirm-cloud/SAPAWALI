// Generator slide paparan Kepala BHP Medan: RDP Komisi XIII DPR RI, RUU Profesi Kurator.
// Alur: Masalah, Sikap, Bukti, Jawaban, Pasal, Catatan; sama dengan presentasi web (web/slides.js).
// Seluruh kalimat diambil dari dokumen Masukan BHP Medan Poin 1: Kewenangan dan Pembagian Peran Kurator (2 Oktober 2026).
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

// Judul slide konten: lencana (opsional) + label bagian + judul besar.
function header(slide, title, num, eyebrow) {
  let x = 0.6;
  if (num) { badge(slide, num); x = 1.95; }
  if (eyebrow) text(slide, eyebrow.toUpperCase(), { x, y: 0.42, w: W - x - 0.6, h: 0.38, fontSize: 15, bold: true, color: DARKGOLD, charSpacing: 2, margin: 0, valign: "middle" });
  text(slide, title, {
    x, y: eyebrow ? 0.8 : 0.45, w: W - x - 0.6, h: eyebrow ? 0.75 : 1.05, fontSize: title.length > 40 ? 26 : 32, bold: true, color: NAVY,
    valign: "middle", margin: 0,
  });
}

function footer(slide) {
  text(slide, "BHP Medan · RDP Komisi XIII DPR RI · RUU tentang Profesi Kurator · Poin 1", {
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

// Slide pembatas tiap bagian dokumen (I sampai V): judul, pengantar, pesan utama (opsional), daftar isi bagian.
function dividerSlide(n, title, tor, items, msg) {
  const s = newSlide(NAVY);
  for (let k = 1; k <= 5; k++) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8 + (k - 1) * 2.38, y: 0.6, w: 2.2, h: 0.08, rectRadius: 0.04,
      fill: { color: k === n ? GOLD : k < n ? "8A7A4A" : "34456A" }, line: { color: k === n ? GOLD : k < n ? "8A7A4A" : "34456A" },
    });
  }
  text(s, `BAGIAN ${["","I","II","III","IV","V"][n]} DARI V`, { x: 0.8, y: 1.15, w: 11.7, h: 0.5, fontSize: 18, bold: true, color: GOLD, charSpacing: 3, margin: 0 });
  text(s, title, { x: 0.8, y: 1.7, w: 11.7, h: 1.1, fontSize: title.length > 30 ? 36 : 48, bold: true, color: WHITE, margin: 0, valign: "middle" });
  text(s, tor, { x: 0.8, y: 2.95, w: 11.2, h: 1.1, fontSize: 21, color: "DCE4F2", margin: 0 });
  let y0 = 4.35;
  if (msg) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.8, y: 4.1, w: 11.7, h: 0.95, rectRadius: 0.08, fill: { color: "243A63" }, line: { color: "243A63" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 4.1, w: 0.09, h: 0.95, fill: { color: GOLD }, line: { color: GOLD } });
    text(s, "PESAN UTAMA", { x: 1.1, y: 4.1, w: 1.9, h: 0.95, fontSize: 13, bold: true, color: GOLD, charSpacing: 2, margin: 0, valign: "middle" });
    text(s, msg, { x: 3.0, y: 4.1, w: 9.3, h: 0.95, fontSize: 21, bold: true, color: WHITE, margin: 0, valign: "middle" });
    y0 = 5.25;
  }
  const step = items.length > 4 ? 0.42 : 0.5;
  items.forEach(([num, t], i) => {
    const y = y0 + i * step;
    s.addShape(pres.shapes.OVAL, { x: 0.8, y, w: 0.36, h: 0.36, fill: { color: GOLD }, line: { color: GOLD } });
    text(s, num, { x: 0.8, y, w: 0.36, h: 0.36, fontSize: 13, bold: true, color: NAVY, align: "center", valign: "middle", margin: 0 });
    text(s, t, { x: 1.3, y, w: 10.8, h: 0.36, fontSize: 17, bold: true, color: WHITE, valign: "middle", margin: 0 });
  });
  s.addNotes(`Bagian ${["","I","II","III","IV","V"][n]}: ${title}.` + (msg ? ` Pesan utama: ${msg}` : ""));
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
const PF = 18;              // ukuran huruf teks pasal
const LINE_H = 0.285;       // tinggi satu baris pada 18 pt (inci)
const ROW_PAD = 0.12;       // ruang antar baris tabel
const BUDGET = 4.45;        // tinggi area tabel dalam kartu (sisanya untuk jembatan "Menjawab")
const CPL = { ayat: 84, para: 84, sub: 80, note: 94, pasal: 999, head: 999 };

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
    return [{ text: rich(r[1], { fontFace: FONT, fontSize: 17, color: "2D3748", italic: true }), options: { ...base, fontSize: 17, color: "2D3748", colspan: 3, fill: { color: "F3F6FA" } } }];
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

// Jembatan di kaki slide: label emas + kalimat yang menjelaskan arti temuan atau menunjuk pasal yang menjawabnya.
function bridgeBar(slide, label, t, y = 6.2, h = 0.68) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y, w: 12.13, h, rectRadius: 0.08, fill: { color: NAVY }, line: { color: NAVY } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 0.1, h, fill: { color: GOLD }, line: { color: GOLD } });
  text(slide, label.toUpperCase(), { x: 0.9, y, w: 2.1, h, fontSize: 12, bold: true, color: GOLD, charSpacing: 2, margin: 0, valign: "middle" });
  text(slide, rich(t, { color: WHITE }).map((r) => ({ ...r, options: { ...r.options, color: r.options.bold ? GOLD : WHITE } })), { x: 3.0, y, w: 9.5, h, fontSize: 16, color: WHITE, margin: 0, valign: "middle" });
}

function pasalSlides(num, title, rows, notes, answers) {
  const pages = paginate(rows);
  pages.forEach((page, pi) => {
    const s = newSlide(PAPER_BG);
    badge(s, num);
    text(s, "BAGIAN IV · USULAN PASAL UNTUK RUU PROFESI KURATOR" + (pages.length > 1 ? `  (${pi + 1}/${pages.length})` : ""), {
      x: 1.95, y: 0.42, w: 10.8, h: 0.42, fontSize: 18, bold: true, color: DARKGOLD, margin: 0, valign: "middle", charSpacing: 2,
    });
    text(s, title, {
      x: 1.95, y: 0.84, w: 10.8, h: 0.66, fontSize: 30, bold: true, color: NAVY, margin: 0, valign: "middle",
    });
    card(s, 0.6, 1.6, 12.13, 4.6, WHITE, "B8C4D8");
    const est = page.reduce((n, r) => n + rowHeight(r), 0);
    s.addTable(page.map(tableRow), {
      x: 0.85, y: 1.72, w: 11.63, h: est, colW: [0.8, 0.65, 10.18],
      rowH: page.map(rowHeight),
      border: { type: "none" }, margin: [3, 4, 5, 4],
    });
    if (answers && pi === pages.length - 1) bridgeBar(s, "Menjawab", answers, 6.3, 0.58);
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
    hand: await icon(fa.FaHandshake, NAVY),
  };
  const G = {};
  for (const [k, c] of [["gov", fa.FaLandmark], ["users", fa.FaUsers], ["folder", fa.FaFolderOpen], ["coins", fa.FaCoins], ["balance", fa.FaBalanceScale], ["book", fa.FaBookOpen], ["hand", fa.FaHandshake], ["db", fa.FaDatabase]]) G[k] = await icon(c, GOLD);

  // ======================= HELPER TATA LETAK =======================
  const lead = (s, t, y = 1.62) => text(s, t, { x: 0.6, y, w: 12.13, h: 0.8, fontSize: 20, color: MUTED, margin: 0, valign: "top" });
  function tiles(s, arr, y, h, gap = 0.3, x0 = 0.6, wTot = 12.13) {
    const w = (wTot - gap * (arr.length - 1)) / arr.length;
    arr.forEach((o, i) => {
      const x = x0 + i * (w + gap);
      card(s, x, y, w, h, o.navy ? NAVY : SOFT);
      let yy = y + 0.28;
      if (o.icon) { s.addImage({ data: (o.navy ? G : I)[o.icon], x: x + 0.3, y: yy, w: 0.55, h: 0.55 }); yy += 0.78; }
      const runs = [];
      if (o.k) runs.push({ text: o.k.toUpperCase(), options: { fontSize: 13, bold: true, color: o.navy ? GOLD : DARKGOLD, charSpacing: 1.5, breakLine: true } });
      if (o.big) runs.push({ text: o.big, options: { fontSize: o.bs || 54, bold: true, color: o.navy ? GOLD : NAVY, breakLine: true } });
      if (o.h) runs.push({ text: o.h, options: { fontSize: o.hs || 22, bold: true, color: o.navy ? WHITE : NAVY, breakLine: !!o.t } });
      if (o.t) runs.push({ text: o.t, options: { fontSize: o.ts || 17, color: o.navy ? "DCE4F2" : INK } });
      text(s, runs, { x: x + 0.3, y: yy, w: w - 0.6, h: y + h - yy - 0.2, margin: 0, valign: "top", paraSpaceAfter: 4 });
    });
  }
  const punch = (s, t, y = 5.95, h = 0.85) => text(s, t, { x: 0.6, y, w: 12.13, h, fontSize: 22, bold: true, color: NAVY, margin: 0, valign: "middle" });
  function slide(title, num, eyebrow, leadText, notes, body) {
    const s = newSlide(); header(s, title, num, eyebrow); if (leadText) lead(s, leadText); body(s); footer(s); if (notes) s.addNotes(notes); return s;
  }
  const E = (n, sub) => `Bagian ${["", "I", "II", "III", "IV", "V"][n]} · ${["", "Pokok Sikap", "Pengalaman BHP Medan", "Jawaban Klaster 1", "Usulan Pasal", "Catatan"][n]}${sub ? " · " + sub : ""}`;

  // ======================= USULAN PASAL (Bagian IV dokumen) =======================
  const P = {
    A: [["pasal", "Pasal A (Kedudukan BHP)"],
      ["ayat", "(1)", "Kurator terdiri atas **Balai Harta Peninggalan** dan **Kurator perseorangan**."],
      ["ayat", "(2)", "Balai Harta Peninggalan merupakan lembaga negara yang menjalankan tugas Kurator dan Pengurus berdasarkan undang-undang, dan **tidak memerlukan izin atau pendaftaran**."],
      ["ayat", "(3)", "Tugas Kurator dan Pengurus pada Balai Harta Peninggalan dilaksanakan oleh **pejabat fungsional Kurator Keperdataan**."],
      ["note", "**Analisis.** Pasal ini memastikan BHP masuk dalam sistem profesi kurator tanpa harus mengikuti aturan izin yang dirancang untuk orang perseorangan."]],
    B: [["pasal", "Pasal B (Pembagian Peran)"],
      ["ayat", "(1)", "Balai Harta Peninggalan menjalankan tugas Kurator dan Pengurus pada perkara yang menyangkut **kepentingan publik, hak pekerja, harta peninggalan yang tidak terurus, Debitor yang tidak diketahui keberadaannya, dan perkara dengan nilai harta kecil**."],
      ["ayat", "(2)", "Di luar perkara sebagaimana dimaksud pada ayat (1), Kurator dan Pengurus diangkat **berdasarkan usulan para pihak**."],
      ["ayat", "(3)", "Kriteria dan tata cara penunjukan sebagaimana dimaksud pada ayat (1) diatur dalam undang-undang mengenai kepailitan dan penundaan kewajiban pembayaran utang."],
      ["note", "**Analisis.** Pasal ini memberi kepastian pembagian peran tanpa mengulang materi hukum acara kepailitan, sehingga RUU Profesi Kurator tetap selaras dengan RUU Kepailitan dan PKPU."]],
    C: [["pasal", "Pasal C (Standar dan Pembinaan BHP)"],
      ["ayat", "(1)", "Balai Harta Peninggalan tunduk pada **standar profesi dan kode etik Kurator yang sama** dengan Kurator perseorangan."],
      ["ayat", "(2)", "Pembinaan dan pengawasan terhadap Balai Harta Peninggalan dilakukan oleh **Menteri** dengan melibatkan unsur lembaga pengawas profesi."],
      ["note", "**Analisis.** Status lembaga negara tidak boleh menjadi keistimewaan. Standarnya satu, hanya jalur pembinaannya yang menyesuaikan."]],
    D: [["pasal", "Pasal D (Koordinasi dan Penugasan Bersama)"],
      ["ayat", "(1)", "Dalam hal Balai Harta Peninggalan dan Kurator perseorangan ditunjuk dalam perkara yang sama, masing-masing bertanggung jawab atas tugas yang ditetapkan baginya, dan **imbalan jasa dibagi sesuai porsi tugas**."],
      ["ayat", "(2)", "Bagian imbalan jasa Balai Harta Peninggalan merupakan **Penerimaan Negara Bukan Pajak**."],
      ["ayat", "(3)", "Setiap Kurator **wajib mengungkapkan hubungan yang dapat menimbulkan benturan kepentingan**."],
      ["ayat", "(4)", "Menteri menyelenggarakan data Kurator dan perkara yang terintegrasi, dan **Balai Harta Peninggalan menjadi simpul data** di wilayah kerjanya."],
      ["note", "**Analisis.** Pada perkara PT Jasa Prima Mandiri, imbalan BHP dan kurator tambahan dihitung dengan aturan yang berbeda tanpa melihat porsi tugas. Pasal ini mencegah hal tersebut, menjaga independensi, dan menyediakan data yang saat ini belum ada, termasuk perbandingan perkara BHP dan kurator perorangan."]],
  };

  // ================================ SLIDE ================================
  // Alur: Masalah -> Sikap -> Bukti -> Jawaban -> Pasal -> Catatan. Jembatan di kaki slide menghubungkan tiap langkah.
  // Sampul
  {
    const s = newSlide(NAVY);
    text(s, "KEMENTERIAN HUKUM REPUBLIK INDONESIA\nKANTOR WILAYAH SUMATERA UTARA\nBALAI HARTA PENINGGALAN MEDAN", { x: 0.8, y: 0.5, w: 11.7, h: 1.2, fontSize: 18, bold: true, color: GOLD, margin: 0 });
    text(s, "BAHAN MASUKAN\nBALAI HARTA PENINGGALAN MEDAN", { x: 0.8, y: 1.85, w: 11.7, h: 1.6, fontSize: 44, bold: true, color: WHITE, margin: 0 });
    text(s, "Poin 1: Kewenangan dan Pembagian Peran Kurator", { x: 0.8, y: 3.5, w: 11.7, h: 0.6, fontSize: 28, bold: true, color: GOLD, margin: 0 });
    text(s, "Rapat Dengar Pendapat Komisi XIII DPR RI tentang Rancangan Undang-Undang tentang Profesi Kurator", { x: 0.8, y: 4.2, w: 11.4, h: 1.1, fontSize: 22, color: WHITE, margin: 0 });
    text(s, [{ text: "Syafriadi Lubis, M.H.", options: { bold: true, breakLine: true } }, { text: "Kepala Balai Harta Peninggalan Medan · Medan, 2 Oktober 2026" }],
      { x: 0.8, y: 5.85, w: 11.7, h: 0.95, fontSize: 22, color: WHITE, margin: 0 });
    s.addNotes("Salam pembuka.");
  }

  // Alur paparan
  slide("Alur Paparan", null, "Poin 1 · Kewenangan dan Pembagian Peran Kurator", "Satu pesan: BHP dimuat dalam RUU sebagai lembaga negara yang menjalankan tugas kurator. Lima bagian berikut membangun pesan itu, dari masalah sampai rumusan pasal.", "Satu pesan, lima bagian. Alurnya: masalah, sikap, bukti, jawaban, pasal, catatan.", (s) => {
    [["I", "Pokok Sikap", "Masalahnya apa, dan apa sikap BHP Medan", "1 masalah · 4 sikap"], ["II", "Pengalaman BHP Medan", "Bukti dari perkara yang sedang berjalan", "9 perkara · 4 temuan"], ["III", "Jawaban Klaster 1", "Tanggapan atas tiga pertanyaan Komisi", "3 pertanyaan"], ["IV", "Usulan Pasal", "Rumusan yang siap dipakai dalam RUU Profesi Kurator", "Pasal A sampai D"], ["V", "Catatan", "Hal yang lebih tepat diatur dalam RUU Kepailitan dan PKPU", "4 hal"]].forEach(([n, t, d, m], i) => {
      const x = 0.6 + i * 2.45;
      card(s, x, 2.6, 2.25, 3.3);
      numDot(s, n, x + 0.25, 2.85, 0.6, 18);
      text(s, t, { x: x + 0.25, y: 3.6, w: 1.85, h: 0.9, fontSize: 19, bold: true, color: NAVY, margin: 0 });
      text(s, d, { x: x + 0.25, y: 4.5, w: 1.85, h: 0.9, fontSize: 13, color: MUTED, margin: 0 });
      text(s, m, { x: x + 0.25, y: 5.4, w: 1.85, h: 0.4, fontSize: 13, bold: true, color: DARKGOLD, margin: 0, valign: "bottom" });
    });
    bridgeBar(s, "Benang merah", "Masalah  ›  Sikap  ›  Bukti  ›  Jawaban  ›  **Pasal**  ›  Catatan");
  });

  // ================= I. POKOK SIKAP =================
  dividerSlide(1, "Pokok Sikap", "RUU Profesi Kurator akan mengatur profesi kurator, padahal kurator tidak hanya orang perseorangan. BHP juga menjalankan tugas kurator berdasarkan undang-undang.",
    [["1", "Masalah"], ["2", "Empat sikap BHP Medan"], ["3", "Lembaga negara, standar sama (Sikap 1 dan 2)"], ["4", "Pembagian peran (Sikap 3)"], ["5", "Koordinasi antarlembaga (Sikap 4)"]],
    "BHP dimuat dalam RUU sebagai lembaga negara yang menjalankan tugas kurator.");

  slide("Kurator Tidak Hanya Orang Perseorangan", "I", E(1, "Masalah"), "Apabila RUU hanya disusun untuk kurator perorangan, kedudukan BHP menjadi tidak jelas dalam tiga hal.", "Kurator ada dua: perseorangan dan BHP. Bila RUU hanya untuk perseorangan, tiga hal tentang BHP menjadi tidak jelas. Tiga hal inilah yang dijawab empat sikap berikutnya.", (s) => {
    tiles(s, [{ icon: "file", k: "Tidak jelas 1", h: "Apakah BHP ikut aturan izin dan sertifikasi profesi?", hs: 22 }, { icon: "balance", k: "Tidak jelas 2", h: "Siapa yang membina dan mengawasinya?", hs: 22 }, { icon: "users", k: "Tidak jelas 3", h: "Bagaimana pembagian perannya dengan kurator privat?", hs: 22 }], 2.55, 2.6);
    text(s, rich("Kurator = **kurator perorangan** + **BHP, berdasarkan undang-undang**. BHP juga menjalankan tugas kurator berdasarkan undang-undang."), { x: 0.6, y: 5.3, w: 12.13, h: 0.75, fontSize: 19, margin: 0, valign: "middle" });
    bridgeBar(s, "Jawabannya", "Empat sikap BHP Medan, masing-masing dirumuskan menjadi satu pasal.");
  });

  slide("Empat Sikap BHP Medan", "I", E(1, "Sikap BHP Medan"), "Keempatnya dijabarkan lebih lanjut dalam usulan Pasal A sampai Pasal D.", "Empat sikap. Setiap sikap menunjuk pasal yang merumuskannya.", (s) => {
    tiles(s, [{ k: "Sikap 1  ›  Pasal A", h: "BHP dimuat dalam RUU sebagai lembaga negara", t: "Tugasnya dijalankan oleh pejabat fungsional Kurator Keperdataan.", hs: 20, ts: 15 }, { k: "Sikap 2  ›  Pasal C", h: "Satu standar profesi untuk semua kurator", t: "Yang berbeda hanya pembinaannya, karena BHP adalah lembaga pemerintah.", hs: 20, ts: 15 }], 2.5, 1.75);
    tiles(s, [{ k: "Sikap 3  ›  Pasal B", h: "Pembagian peran BHP dan kurator perorangan ditegaskan", t: "RUU Profesi Kurator memuat prinsipnya, rinciannya di RUU Kepailitan dan PKPU.", hs: 20, ts: 15 }, { k: "Sikap 4  ›  Pasal D", h: "Koordinasi antarlembaga diatur dengan jelas", t: "BHP sendiri adalah kurator, bukan pengawas kurator privat.", hs: 20, ts: 15 }], 4.4, 1.75);
    bridgeBar(s, "Dirumuskan dalam", "Satu sikap, satu pasal: Sikap 1 Pasal A, Sikap 2 Pasal C, Sikap 3 Pasal B, Sikap 4 Pasal D.");
  });

  slide("Lembaga Negara, dengan Standar yang Sama", "I", E(1, "Sikap 1 dan 2"), "Kewenangan BHP berasal dari undang-undang, tetapi status lembaga negara tidak menjadi keistimewaan.", "Sikap 1 dan 2 menjawab dua hal yang tidak jelas: BHP tidak perlu izin karena kewenangannya dari undang-undang, tetapi standarnya tetap sama. Bukan keistimewaan.", (s) => {
    tiles(s, [{ navy: true, icon: "gov", k: "Sikap 1 · Kedudukan", h: "BHP tidak memerlukan izin atau pendaftaran seperti kurator perorangan", t: "Kewenangan BHP berasal dari undang-undang. Tugasnya dijalankan oleh pejabat fungsional Kurator Keperdataan.", hs: 22, ts: 17 }, { icon: "balance", k: "Sikap 2 · Standar", h: "Kode etik dan standar profesi yang sama berlaku bagi BHP dan kurator perorangan", t: "Yang berbeda hanya pembinaannya, karena BHP adalah lembaga pemerintah.", hs: 22, ts: 17 }], 2.5, 3.5);
    bridgeBar(s, "Dirumuskan dalam", "**Pasal A** untuk kedudukan BHP, **Pasal C** untuk standar dan pembinaannya.");
  });

  slide("Pembagian Peran yang Tegas", "I", E(1, "Sikap 3"), "BHP dan kurator perorangan tidak berebut perkara. Masing-masing punya wilayahnya sendiri.", "Sikap 3. BHP mengisi perkara publik dan yang tidak diminati. Perkara bisnis tetap pilihan para pihak. Bagian II membuktikan pembagian ini dengan data.", (s) => {
    tiles(s, [{ navy: true, icon: "gov", k: "BHP menangani", h: "Perkara yang menyangkut kepentingan publik atau tidak diminati", t: "seperti perkara pekerja dan perkara dengan harta kecil", hs: 22, ts: 17 }, { icon: "users", k: "Kurator perorangan menangani", h: "Perkara bisnis atas pilihan para pihak", hs: 22 }], 2.5, 2.6);
    text(s, rich("**RUU Profesi Kurator** memuat prinsipnya, sedangkan rinciannya diatur dalam **RUU Kepailitan dan PKPU**."), { x: 0.6, y: 5.3, w: 12.13, h: 0.75, fontSize: 19, margin: 0, valign: "middle" });
    bridgeBar(s, "Dirumuskan dalam", "**Pasal B**. Buktinya ada pada perkara yang sedang ditangani BHP Medan di Bagian II.");
  });

  slide("Koordinasi Antarlembaga", "I", E(1, "Sikap 4"), "Setiap lembaga punya peran yang jelas, sehingga tidak ada tumpang tindih.", "Sikap 4. Empat lembaga, empat peran. Tekankan: BHP bukan pengawas kurator privat.", (s) => {
    tiles(s, [{ icon: "gov", k: "Kementerian", h: "Membina" }, { icon: "gavel", k: "Hakim Pengawas", h: "Mengawasi perkara" }, { icon: "users", k: "Organisasi profesi", h: "Menegakkan etik kurator perorangan" }, { navy: true, icon: "db", k: "BHP", h: "Simpul data di wilayahnya" }], 2.5, 2.6, 0.25);
    punch(s, "BHP tidak ditempatkan sebagai pengawas kurator privat, karena BHP sendiri adalah kurator.", 5.25, 0.85);
    bridgeBar(s, "Dirumuskan dalam", "**Pasal D**, termasuk data kurator dan perkara yang terintegrasi.");
  });

  // ================= II. PENGALAMAN BHP MEDAN =================
  dividerSlide(2, "Pengalaman BHP Medan", "BHP Medan saat ini menangani 9 perkara kepailitan yang masih berjalan dengan total tagihan sekitar Rp47,35 miliar. Seluruhnya jatuh ke BHP karena pemohon tidak mengusulkan kurator.",
    [["1", "Hartanya kecil"], ["2", "Perkaranya panjang"], ["3", "Menyangkut hak pekerja dan uang negara"], ["4", "Debitor menghilang"], ["5", "Data nasional"]],
    "Perkara yang jatuh ke BHP adalah perkara yang tidak diambil pihak lain. Pembagian peran itu nyata.");

  slide("Sembilan Perkara, Semuanya Tanpa Kurator Usulan Pemohon", "II", E(2), "Perkara yang sedang berjalan di BHP Medan hari ini.", "Sembilan perkara, seluruhnya datang karena pemohon tidak mengusulkan kurator. Inilah wajah pembagian peran di lapangan.", (s) => {
    tiles(s, [{ navy: true, big: "9", k: "Perkara kepailitan", t: "yang masih berjalan", ts: 18 }, { big: "Rp47,35 M", bs: 40, k: "Total tagihan", t: "sekitar Rp47,35 miliar", ts: 18 }, { icon: "folder", k: "Asal perkara", h: "Seluruhnya jatuh ke BHP", t: "karena pemohon tidak mengusulkan kurator", ts: 18 }], 2.5, 2.6);
    text(s, rich("Selain itu, BHP Medan telah menyelesaikan perkara lain, antara lain **PT Jasa Prima Mandiri** yang ditangani bersama kurator perorangan."), { x: 0.6, y: 5.3, w: 12.13, h: 0.75, fontSize: 18, margin: 0, valign: "middle" });
    bridgeBar(s, "Artinya", "BHP mengisi perkara yang tidak diambil pihak lain. Empat temuan berikut menunjukkan mengapa.");
  });

  slide("Hartanya Kecil", "1", E(2, "Temuan 1"), "Pada empat perkara yang sudah dinilai, harta pailit hanya 12% sampai 40% dari tagihan.", "Temuan 1. Empat perkara yang sudah dinilai: harta hanya 12 sampai 40 persen dari tagihan. Sumber: Buku Register Kepailitan BHP Medan, pemutakhiran Juni 2026.", (s) => {
    [["Badaruddin HSB", "2,30", "0,93", 40], ["Gwe Tjoen", "25,66", "8,00", 31], ["CV Hitado", "1,94", "0,53", 27], ["PT Rata Makmur", "1,43", "0,17", 12]].forEach(([n, tg, h, p], i) => {
      const y = 2.5 + i * 0.78;
      text(s, [{ text: n, options: { bold: true, color: NAVY, fontSize: 19, breakLine: true } }, { text: `Tagihan Rp${tg} miliar`, options: { fontSize: 12, color: MUTED, breakLine: true } }, { text: `Harta Rp${h} miliar`, options: { fontSize: 12, color: MUTED } }], { x: 0.6, y: y - 0.05, w: 3.4, h: 0.76, margin: 0, valign: "middle" });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.1, y: y + 0.14, w: 7.0, h: 0.4, rectRadius: 0.08, fill: { color: "D5DDEA" }, line: { color: "D5DDEA" } });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.1, y: y + 0.14, w: 7.0 * p / 100, h: 0.4, rectRadius: 0.08, fill: { color: NAVY }, line: { color: NAVY } });
      text(s, p + "%", { x: 11.2, y, w: 1.53, h: 0.68, fontSize: 30, bold: true, color: NAVY, align: "right", margin: 0, valign: "middle" });
    });
    text(s, "Batang abu-abu: tagihan (100%). Batang navy: nilai harta tercatat.", { x: 4.1, y: 5.65, w: 8.6, h: 0.35, fontSize: 12, color: MUTED, margin: 0 });
    bridgeBar(s, "Artinya", "Perkara seperti ini tidak menarik bagi kurator yang bekerja atas dasar imbalan. Lihat **Pasal B ayat (1)**.");
  });

  slide("Perkaranya Panjang", "2", E(2, "Temuan 2"), "Enam dari sembilan perkara berjalan lebih dari lima tahun, yang terlama sejak 2016.", "Temuan 2. Lama perkara sejak putusan sampai Oktober 2026 (PT Rata Makmur sejak PKPU). Sumber: Buku Register Kepailitan BHP Medan, diolah.", (s) => {
    const R = [["Gwe Tjoen", 10.6], ["CV Hitado", 9.4], ["PT Pro Mekanika", 8.3], ["Badaruddin HSB", 7.8], ["Suparjo Rustam", 6.9], ["Hermanto", 6.6], ["PT Rata Makmur", 4.1], ["KSO Maju Abadi", 3.0], ["Frans Winner", 0.8]];
    const X0 = 2.75, WB = 5.0, S = WB / 12;
    s.addShape(pres.shapes.LINE, { x: X0 + 5 * S, y: 2.35, w: 0, h: 3.65, line: { color: DARKGOLD, width: 1.5, dashType: "dash" } });
    text(s, "5 tahun", { x: X0 + 5 * S + 0.08, y: 2.3, w: 1.2, h: 0.25, fontSize: 12, bold: true, color: DARKGOLD, margin: 0 });
    R.forEach(([n, v], i) => {
      const y = 2.6 + i * 0.38;
      text(s, n, { x: 0.6, y, w: 2.0, h: 0.32, fontSize: 13, align: "right", margin: 0, valign: "middle" });
      s.addShape(pres.shapes.RECTANGLE, { x: X0, y: y + 0.03, w: v * S, h: 0.26, fill: { color: v >= 5 ? NAVY : "C3CEDF" }, line: { color: v >= 5 ? NAVY : "C3CEDF" } });
      text(s, String(v.toFixed(1)).replace(".", ",") + " tahun", { x: X0 + v * S + 0.08, y, w: 1.3, h: 0.32, fontSize: 12, bold: true, color: NAVY, margin: 0, valign: "middle" });
    });
    tiles(s, [{ navy: true, big: "6", k: "dari 9 perkara", t: "berjalan lebih dari lima tahun", ts: 18 }], 2.45, 3.55, 0, 9.4, 3.33);
    bridgeBar(s, "Artinya", "Kurator perorangan bisa berhenti atau meninggal dunia, sedangkan BHP tetap berjalan sebagai lembaga. Lihat **Pasal A ayat (2)**.");
  });

  slide("Hak Pekerja dan Debitor yang Menghilang", "II", E(2, "Temuan 3 dan 4"), "Perkara yang menyangkut kepentingan publik ditangani BHP sampai tuntas.", "Temuan 3 dan 4: PT Rata Makmur dan CV Hitado. Keduanya masuk daftar perkara BHP pada Pasal B; kelanjutan perkara debitor hilang menjadi catatan untuk RUU Kepailitan.", (s) => {
    tiles(s, [{ navy: true, icon: "users", k: "Temuan 3 · PT Rata Makmur", h: "Menyangkut hak pekerja dan uang negara", t: "Permohonan diajukan pekerja dan pengadilan menunjuk BHP Medan sebagai pengurus lalu kurator. Tagihan para pekerja pemohon sudah lunas, sisanya tagihan pajak.", hs: 22, ts: 17 }, { icon: "search", k: "Temuan 4 · CV Hitado", h: "Debitor menghilang", t: "Debitor tidak ditemukan sekitar lima tahun sehingga penyelesaian perkara tertahan.", hs: 22, ts: 17 }], 2.5, 3.5);
    bridgeBar(s, "Artinya", "Hak pekerja dan debitor yang tidak diketahui keberadaannya masuk daftar perkara BHP (**Pasal B**). Kelanjutan perkara bila debitor menghilang perlu diatur RUU Kepailitan dan PKPU (**Bagian V**).");
  });

  slide("Perkara Naik, Datanya Belum Ada", "II", E(2, "Secara nasional"), "Laporan Tahunan Mahkamah Agung 2025 mencatat perkara niaga naik 19,18%.", "Perkara niaga naik, tetapi tidak ada data siapa kurator yang diangkat. Kekosongan data ini dijawab Pasal D ayat (4).", (s) => {
    tiles(s, [{ k: "Dari", big: "782", t: "perkara niaga" }, { navy: true, k: "Menjadi", big: "932", t: "perkara niaga" }, { k: "Naik", big: "19,18%", t: "Laporan Tahunan Mahkamah Agung 2025" }], 2.5, 2.3);
    punch(s, "Data perbandingan perkara BHP dan kurator privat belum tersedia, karena pengadilan tidak mencatat siapa kurator yang diangkat.", 4.95, 1.15);
    bridgeBar(s, "Dijawab oleh", "**Pasal D ayat (4)**: data Kurator dan perkara yang terintegrasi, BHP menjadi simpul data di wilayah kerjanya.");
  });

  // ================= III. JAWABAN KLASTER 1 =================
  {
    const s = newSlide(NAVY);
    for (let k = 1; k <= 5; k++) s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.8 + (k - 1) * 2.38, y: 0.6, w: 2.2, h: 0.08, rectRadius: 0.04, fill: { color: k === 3 ? GOLD : k < 3 ? "8A7A4A" : "34456A" }, line: { color: k === 3 ? GOLD : k < 3 ? "8A7A4A" : "34456A" } });
    text(s, "BAGIAN III DARI V", { x: 0.8, y: 1.15, w: 11.7, h: 0.5, fontSize: 18, bold: true, color: GOLD, charSpacing: 3, margin: 0 });
    text(s, "Jawaban Klaster 1", { x: 0.8, y: 1.7, w: 11.7, h: 1.0, fontSize: 48, bold: true, color: WHITE, margin: 0, valign: "middle" });
    text(s, "Tiga pertanyaan Komisi, tiga jawaban singkat BHP Medan.", { x: 0.8, y: 2.75, w: 11.2, h: 0.5, fontSize: 21, color: "DCE4F2", margin: 0 });
    [["1", "Bagaimana mekanisme BHP sebagai kurator, dan adakah kendala dengan kurator privat?", "Mekanismenya jelas dan kerja sama berjalan baik. Kendalanya pada aturan imbalan jasa yang berbeda."], ["2", "Perlukah pemisahan tegas peran BHP dengan peran kurator privat?", "Tidak perlu dipisahkan. Yang diperlukan adalah pembagian peran yang jelas."], ["3", "Bagaimana pandangan BHP tentang kewajiban memakai BHP pada kasus tertentu?", "Setuju, untuk lima jenis perkara. Di luar itu para pihak tetap bebas memilih kurator."]].forEach(([n, q, a], i) => {
      const y = 3.45 + i * 1.12;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.8, y, w: 11.7, h: 1.0, rectRadius: 0.1, fill: { color: "243A63" }, line: { color: "243A63" } });
      s.addShape(pres.shapes.OVAL, { x: 1.0, y: y + 0.28, w: 0.44, h: 0.44, fill: { color: GOLD }, line: { color: GOLD } });
      text(s, n, { x: 1.0, y: y + 0.28, w: 0.44, h: 0.44, fontSize: 15, bold: true, color: NAVY, align: "center", valign: "middle", margin: 0 });
      text(s, q, { x: 1.65, y, w: 5.0, h: 1.0, fontSize: 15, color: "DCE4F2", margin: 0, valign: "middle" });
      s.addShape(pres.shapes.RECTANGLE, { x: 6.85, y: y + 0.15, w: 0.04, h: 0.7, fill: { color: GOLD }, line: { color: GOLD } });
      text(s, a, { x: 7.1, y, w: 5.2, h: 1.0, fontSize: 16, bold: true, color: WHITE, margin: 0, valign: "middle" });
    });
    s.addNotes("Bagian III: tiga pertanyaan Klaster 1 dan jawaban singkatnya. Rinciannya di slide berikut.");
  }

  slide("Bagaimana BHP Bekerja sebagai Kurator", "1", E(3, "Pertanyaan 1 · Mekanisme"), "Setelah ditunjuk pengadilan, tim Kurator Keperdataan bekerja di bawah pengawasan Hakim Pengawas.", "Pertanyaan 1, bagian mekanisme. Alur kerja BHP dari penunjukan sampai laporan. Imbalannya masuk kas negara.", (s) => {
    [[I.gavel, "Ditunjuk pengadilan"], [I.users, "Kepala BHP menugaskan tim Kurator Keperdataan"], [I.folder, "Tim mengurus, menilai, dan menjual harta"], [I.file, "Melapor secara berkala"]].forEach(([ic, t], i) => {
      const x = 0.6 + i * 3.1;
      card(s, x, 2.5, 2.75, 1.4, WHITE, "B8C4D8");
      s.addImage({ data: ic, x: x + 0.2, y: 2.95, w: 0.5, h: 0.5 });
      text(s, t, { x: x + 0.85, y: 2.5, w: 1.8, h: 1.4, fontSize: 15, bold: true, color: NAVY, margin: 0, valign: "middle" });
      if (i < 3) s.addImage({ data: I.arrow, x: x + 2.8, y: 3.05, w: 0.25, h: 0.3 });
    });
    tiles(s, [{ icon: "gavel", k: "Pengawasan", h: "Di bawah pengawasan Hakim Pengawas" }, { navy: true, icon: "coins", k: "Imbalan jasa", h: "Imbalan jasa BHP disetor ke kas negara" }], 4.15, 1.9);
    bridgeBar(s, "Berikutnya", "Adakah kendala dengan kurator privat? Contohnya pada PT Jasa Prima Mandiri.");
  });

  slide("Bersama Kurator Perorangan: PT Jasa Prima Mandiri", "1", E(3, "Pertanyaan 1 · Kendala"), "Nomor 1/Pdt.Sus-Pailit/2015/PN Niaga Mdn. Kerja sama berjalan baik.", "Contoh nyata kerja sama BHP dan kurator perorangan yang berjalan baik. Kendalanya satu: imbalan jasa.", (s) => {
    tiles(s, [{ k: "Putusan pailit", h: "BHP Medan diangkat sebagai kurator", hs: 19 }, { k: "Mei 2015", h: "Kurator tambahan diangkat", hs: 19 }, { k: "Mei 2019", h: "Kepailitan berakhir, sekitar empat tahun", hs: 19 }], 2.5, 1.35);
    tiles(s, [{ navy: true, big: "Rp12,85 M", bs: 40, t: "harta berhasil dibereskan", ts: 18 }, { icon: "hand", k: "Hasilnya", h: "Kerja sama berjalan baik", t: "BHP Medan dan kurator perorangan menangani perkara yang sama sampai selesai.", ts: 16 }], 4.05, 2.0);
    bridgeBar(s, "Kendalanya", "Satu hal: imbalan jasa dihitung dengan aturan yang berbeda.");
  });

  slide("Kendalanya: Imbalan Jasa", "1", E(3, "Pertanyaan 1 · Kendala"), "Kurator tambahan memperoleh imbalan lebih besar daripada BHP sebagai kurator yang diangkat lebih dahulu.", "Kurator yang diangkat lebih dahulu justru menerima lebih kecil, karena aturannya berbeda. Ini dijawab Pasal D ayat (1) dan (2).", (s) => {
    [["BHP Medan", "PNBP · 8% dari nilai bersih", 379.8, NAVY], ["Kurator tambahan", "5% dari nilai kotor", 642.7, GOLD]].forEach(([n, d, v, c], i) => {
      const y = 2.55 + i * 1.1;
      text(s, [{ text: n, options: { bold: true, color: NAVY, fontSize: 21, breakLine: true } }, { text: d, options: { fontSize: 14, color: MUTED } }], { x: 0.6, y, w: 3.3, h: 0.9, margin: 0, valign: "middle" });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.0, y: y + 0.15, w: 6.0 * v / 642.7, h: 0.6, rectRadius: 0.1, fill: { color: c }, line: { color: c } });
      text(s, "Rp" + String(v).replace(".", ",") + " juta", { x: 10.2, y, w: 2.53, h: 0.9, fontSize: 24, bold: true, color: NAVY, align: "right", margin: 0, valign: "middle" });
    });
    punch(s, "Tidak ada aturan pembagian imbalan berdasarkan porsi tugas. Aturan juga belum mengatur pembagian tugas dan tanggung jawab di antara keduanya.", 4.85, 1.2);
    bridgeBar(s, "Dijawab oleh", "**Pasal D ayat (1) dan (2)**: imbalan dibagi sesuai porsi tugas, bagian BHP merupakan PNBP.");
  });

  slide("Tidak Perlu Dipisahkan, Cukup Dibagi dengan Jelas", "2", E(3, "Pertanyaan 2"), "Perlukah pemisahan tegas peran BHP sebagai balai harta atau wali pengawas dengan peran kurator privat? Tidak perlu, karena tiga alasan.", "Pertanyaan 2. Tidak perlu memisahkan BHP dari tugas kurator. Yang diperlukan adalah pembagian peran yang jelas, karena tiga alasan. Luruskan istilah wali pengawas.", (s) => {
    tiles(s, [{ icon: "folder", k: "Alasan a", h: "Tanpa BHP, perkara yang tidak diminati kurator privat tidak punya pelaksana.", hs: 17 }, { icon: "hand", k: "Alasan b", h: "BHP tidak berebut perkara dengan kurator privat.", t: "Yang ditangani BHP adalah perkara yang tidak diambil pihak lain.", hs: 17, ts: 14 }, { navy: true, icon: "book", k: "Alasan c", h: "Pengalaman BHP mengurus warisan, perwalian anak, dan harta orang yang menghilang", t: "membuat BHP paling siap menangani perkara yang berkaitan dengan hal tersebut.", hs: 16, ts: 14 }], 2.6, 2.75);
    text(s, rich("Perlu dicatat, **wali pengawas** adalah tugas BHP dalam perwalian anak (Pasal 366 KUHPerdata), bukan pengawas kurator."), { x: 0.6, y: 5.45, w: 12.13, h: 0.65, fontSize: 17, margin: 0, valign: "middle" });
    bridgeBar(s, "Dirumuskan dalam", "**Pasal B**: pembagian peran yang jelas, bukan pemisahan.");
  });

  slide("Kewajiban Memakai BHP: Setuju", "3", E(3, "Pertanyaan 3"), "Bagaimana pandangan BHP tentang kewajiban memakai BHP pada kasus tertentu?", "Pertanyaan 3. Setuju untuk lima jenis perkara. Di luar itu para pihak tetap bebas memilih. Dasarnya di Pasal B, kriterianya di RUU Kepailitan.", (s) => {
    card(s, 0.6, 2.5, 7.3, 3.55, NAVY);
    text(s, "BHP MEDAN SETUJU, TERUTAMA UNTUK", { x: 0.9, y: 2.65, w: 6.8, h: 0.35, fontSize: 13, bold: true, color: GOLD, charSpacing: 1.5, margin: 0 });
    ["debitor yang meninggal tanpa ahli waris atau hartanya tidak terurus", "debitor yang tidak diketahui keberadaannya", "perkara pekerja", "perkara dengan harta kecil", "perkara yang kehilangan kurator"].forEach((t, i) => {
      const y = 3.1 + i * 0.57;
      s.addShape(pres.shapes.OVAL, { x: 0.9, y: y + 0.07, w: 0.38, h: 0.38, fill: { color: GOLD }, line: { color: GOLD } });
      text(s, String(i + 1), { x: 0.9, y: y + 0.07, w: 0.38, h: 0.38, fontSize: 13, bold: true, color: NAVY, align: "center", valign: "middle", margin: 0 });
      text(s, t, { x: 1.45, y, w: 6.3, h: 0.52, fontSize: 17, bold: true, color: WHITE, margin: 0, valign: "middle" });
    });
    tiles(s, [{ icon: "users", k: "Di luar itu", h: "Para pihak tetap bebas memilih kurator", t: "RUU Profesi Kurator cukup memuat dasar penugasan ini, sedangkan kriteria dan tata cara penunjukannya diatur dalam RUU Kepailitan dan PKPU.", ts: 16 }], 2.5, 3.55, 0, 8.2, 4.53);
    bridgeBar(s, "Dirumuskan dalam", "**Pasal B ayat (1)** memuat dasarnya; kriteria dan tata cara penunjukan diatur RUU Kepailitan dan PKPU (**Bagian V**).");
  });

  // ================= IV. USULAN PASAL =================
  dividerSlide(4, "Usulan Pasal untuk RUU Profesi Kurator", "Empat pasal yang dapat langsung dipakai, satu untuk setiap sikap, masing-masing disertai analisisnya.",
    [["A", "Kedudukan BHP · Sikap 1"], ["B", "Pembagian Peran · Sikap 3"], ["C", "Standar dan Pembinaan BHP · Sikap 2"], ["D", "Koordinasi dan Penugasan Bersama · Sikap 4"]],
    "Setiap masalah yang disebut di awal punya rumusan pasalnya.");
  pasalSlides("A", "Kedudukan BHP", P.A, "Pasal A menjawab Sikap 1 dan ketidakjelasan pertama: BHP masuk sistem profesi kurator tanpa harus mengikuti aturan izin untuk orang perseorangan.", "**Sikap 1** dan pertanyaan apakah BHP ikut aturan izin dan sertifikasi profesi.");
  pasalSlides("B", "Pembagian Peran", P.B, "Pasal B menjawab Sikap 3, temuan Bagian II, dan Pertanyaan 2 dan 3: kepastian pembagian peran tanpa mengulang hukum acara kepailitan.", "**Sikap 3**, keempat temuan BHP Medan, serta Pertanyaan 2 dan 3 Klaster 1.");
  pasalSlides("C", "Standar dan Pembinaan BHP", P.C, "Pasal C menjawab Sikap 2 dan ketidakjelasan kedua: status lembaga negara bukan keistimewaan. Standarnya satu, pembinaannya oleh Menteri.", "**Sikap 2** dan pertanyaan siapa yang membina dan mengawasi BHP.");
  pasalSlides("D", "Koordinasi dan Penugasan Bersama", P.D, "Pasal D menjawab Sikap 4, kendala imbalan PT Jasa Prima Mandiri, dan kekosongan data perkara nasional.", "**Sikap 4**, kendala imbalan pada PT Jasa Prima Mandiri, dan data perkara yang belum ada.");

  // ================= V. CATATAN =================
  dividerSlide(5, "Catatan untuk RUU Kepailitan dan PKPU", "Beberapa hal lebih tepat diatur dalam RUU Kepailitan dan PKPU, termasuk yang muncul dari temuan BHP Medan: debitor menghilang dan kriteria penunjukan BHP.",
    [["1", "Kewenangan BHP menjadi pengurus PKPU"], ["2", "Kriteria dan tata cara penunjukan BHP pada perkara tertentu"], ["3", "Kepailitan harta peninggalan tanpa ahli waris"], ["4", "Kelanjutan perkara apabila debitor menghilang"]],
    "Kedua RUU perlu disusun selaras sejak awal.");

  // Rekap: benang merah
  slide("Benang Merah Paparan", null, "Rangkuman", "Setiap hal yang tidak jelas dijawab satu sikap, didukung bukti BHP Medan, dan dirumuskan dalam satu pasal.", "Rekap satu halaman: tiap ketidakjelasan dijawab satu sikap, didukung bukti, dan dirumuskan dalam satu pasal.", (s) => {
    const hdr = ["Tidak jelas", "Sikap BHP Medan", "Bukti", "Usulan pasal"];
    const R = [["Apakah BHP ikut aturan izin dan sertifikasi profesi?", "Sikap 1 · BHP dimuat dalam RUU sebagai lembaga negara", "Perkara panjang: BHP tetap berjalan sebagai lembaga", "Pasal A · Kedudukan BHP"],
      ["Siapa yang membina dan mengawasinya?", "Sikap 2 · Satu standar profesi untuk semua kurator", "Status lembaga negara bukan keistimewaan", "Pasal C · Standar dan Pembinaan BHP"],
      ["Bagaimana pembagian perannya dengan kurator privat?", "Sikap 3 · Pembagian peran ditegaskan", "9 perkara jatuh ke BHP: harta kecil, pekerja, debitor hilang", "Pasal B · Pembagian Peran"],
      ["Siapa mengawasi, siapa membina, siapa memegang data?", "Sikap 4 · Koordinasi antarlembaga diatur", "Imbalan tak seimbang pada PT Jasa Prima Mandiri; data perkara belum ada", "Pasal D · Koordinasi dan Penugasan Bersama"]];
    const base = { fontFace: FONT, fontSize: 14, color: INK, valign: "middle", margin: [4, 6, 4, 6] };
    const rows = [hdr.map((h) => ({ text: h.toUpperCase(), options: { ...base, fontSize: 11, bold: true, color: DARKGOLD, charSpacing: 1.5, fill: { color: WHITE } } }))];
    R.forEach((r) => rows.push([
      { text: r[0], options: { ...base, fill: { color: WHITE } } },
      { text: r[1], options: { ...base, bold: true, color: NAVY, fill: { color: SOFT } } },
      { text: r[2], options: { ...base, fill: { color: SOFT } } },
      { text: r[3], options: { ...base, bold: true, color: WHITE, fill: { color: NAVY } } },
    ]));
    s.addTable(rows, { x: 0.6, y: 2.5, w: 12.13, colW: [2.9, 3.2, 3.3, 2.73], rowH: [0.35, 0.95, 0.95, 0.95, 0.95], border: { type: "solid", color: "FFFFFF", pt: 3 } });
  });

  // Penutup
  {
    const s = newSlide(NAVY);
    text(s, "Penutup", { x: 0.8, y: 0.5, w: 11.7, h: 0.85, fontSize: 40, bold: true, color: GOLD, margin: 0 });
    text(s, "BHP dimuat dalam RUU sebagai lembaga negara yang menjalankan tugas kurator, dengan satu standar profesi untuk semua kurator, pembagian peran yang jelas, dan koordinasi antarlembaga yang tegas.", {
      x: 0.8, y: 1.45, w: 11.7, h: 2.4, fontSize: 30, bold: true, color: WHITE, margin: 0, valign: "top",
    });
    text(s, "Terima kasih", { x: 0.8, y: 5.0, w: 11.7, h: 0.9, fontSize: 44, bold: true, color: GOLD, margin: 0 });
    text(s, [{ text: "Syafriadi Lubis, M.H.", options: { bold: true } }, { text: " · Kepala Balai Harta Peninggalan Medan" }], { x: 0.8, y: 5.95, w: 11.7, h: 0.6, fontSize: 22, color: WHITE, margin: 0 });
    s.addNotes("Pesan penutup dan ucapan terima kasih.");
  }

  await pres.writeFile({ fileName: "Paparan_BHP_Medan_RUU_Profesi_Kurator.pptx" });
  console.log("slides:", slideNo);
})();
