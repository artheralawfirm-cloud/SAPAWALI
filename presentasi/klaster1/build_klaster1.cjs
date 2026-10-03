// Bahan RDP Komisi XIII DPR RI, 6 Oktober 2026. Klaster 1 (BHP Medan): Tumpang Tindih Kewenangan.
// Menghasilkan paparan 2 slide (.pptx) dan naskah narasi (.docx) dari dokumen Masukan BHP Medan Poin 1
// (../web/dokumen.json, hasil ekstraksi dokumen Word "Kewenangan dan Pembagian Peran Kurator").
// Jalankan: NODE_PATH=<node_modules berisi pptxgenjs> node build_klaster1.cjs   (docx dipakai dari node-tools global)
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const docx = require(fs.existsSync("/opt/node-tools/node_modules/docx") ? "/opt/node-tools/node_modules/docx" : "docx");

const NAVY = "14284B", GOLD = "E0A526", DARKGOLD = "8A6100", INK = "1A1A1A", SOFT = "EEF2F8", WHITE = "FFFFFF", MUTED = "4A5568", LINE = "C9D3E3";
const FONT = "Arial";
const W = 13.333;
const NAMA = "BHP Medan - Klaster 1 Tumpang Tindih Kewenangan";
const LOGO = ["logo-pengayoman.png", "logo-ahu.png"].map((f) => path.join(__dirname, "..", "web", f)).filter(fs.existsSync);

// Dokumen sumber: seluruh kalimat diambil dari sini.
const DOC = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "web", "dokumen.json"), "utf8"));
const plain = (i) => (DOC[i].s || []).map((x) => x[0]).join("");
const rest = (i) => (DOC[i].s || []).slice(1).map((x) => x[0]).join(""); // isi setelah kalimat tebal pembuka
const lead = (i) => DOC[i].s[0][0].trim();
const ayat = (from, to) => DOC.slice(from, to + 1).map((b) => [b.l, b.s[0][0]]);
const analisis = (i) => rest(i).trim();
const PASAL = [
  { no: "A", judul: DOC[38].m, ayat: ayat(39, 41), analisis: analisis(43) },
  { no: "B", judul: DOC[45].m, ayat: ayat(46, 48), analisis: analisis(50) },
  { no: "C", judul: DOC[52].m, ayat: ayat(53, 54), analisis: analisis(56) },
  { no: "D", judul: DOC[58].m, ayat: ayat(59, 62), analisis: analisis(64) },
];
for (const [i, t] of [[4, "POKOK SIKAP"], [12, "PENGALAMAN BHP MEDAN"], [23, "JAWABAN KLASTER 1"], [36, "USULAN PASAL"], [65, "CATATAN"]]) {
  if (!plain(i).startsWith(t)) throw new Error(`Susunan dokumen.json berubah: blok ${i} bukan ${t}`);
}

// "teks **tebal**" -> run pptxgenjs
function rich(str, base = {}, boldOpt = {}) {
  return str.split("**").map((t, i) => ({ text: t, options: i % 2 ? { ...base, bold: true, ...boldOpt } : { ...base } })).filter((r) => r.text.length);
}

// ======================= PAPARAN 2 SLIDE =======================
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Bahan Masukan BHP Medan: Klaster 1, Tumpang Tindih Kewenangan";
pres.author = "Balai Harta Peninggalan Medan";

const text = (s, t, o) => s.addText(t, { fontFace: FONT, color: INK, isTextBox: true, valign: "top", margin: 0, ...o });
const box = (s, x, y, w, h, fill = SOFT, line) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: line || fill, width: 0.75 }, rectRadius: 0.08 });
function header(s, no, title, sub) {
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: 1.05, fill: { color: NAVY }, line: { color: NAVY } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.05, w: W, h: 0.05, fill: { color: GOLD }, line: { color: GOLD } });
  let x = 0.45;
  LOGO.forEach((p) => { s.addImage({ path: p, x, y: 0.17, h: 0.72, w: 0.72 }); x += 0.82; });
  text(s, "BALAI HARTA PENINGGALAN MEDAN  ·  RDP KOMISI XIII DPR RI, 6 OKTOBER 2026  ·  RUU TENTANG PROFESI KURATOR", { x: x + 0.1, y: 0.12, w: 9.6, h: 0.3, fontSize: 10.5, bold: true, color: GOLD, charSpacing: 1.5, valign: "middle" });
  text(s, title, { x: x + 0.1, y: 0.4, w: 9.9, h: 0.42, fontSize: 21, bold: true, color: WHITE, valign: "middle" });
  text(s, sub, { x: x + 0.1, y: 0.78, w: 9.9, h: 0.25, fontSize: 11.5, color: "DCE4F2", valign: "middle" });
  box(s, W - 2.55, 0.22, 2.1, 0.62, GOLD);
  text(s, [{ text: "KLASTER 1", options: { fontSize: 10, bold: true, charSpacing: 2, breakLine: true } }, { text: `Slide ${no} dari 2`, options: { fontSize: 11, bold: true } }], { x: W - 2.55, y: 0.22, w: 2.1, h: 0.62, color: NAVY, align: "center", valign: "middle" });
  text(s, "Sumber: Bahan Masukan BHP Medan, Poin 1 Kewenangan dan Pembagian Peran Kurator (Medan, 2 Oktober 2026). Kepala BHP Medan: Syafriadi Lubis, M.H.", { x: 0.45, y: 7.17, w: 12.4, h: 0.25, fontSize: 8.5, color: MUTED, valign: "middle" });
}
function label(s, t, x, y, w, color = DARKGOLD) { text(s, t.toUpperCase(), { x, y, w, h: 0.26, fontSize: 9.5, bold: true, color, charSpacing: 1.5, valign: "middle" }); }
function numDot(s, n, x, y, d = 0.3, fill = NAVY, color = WHITE) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill } });
  text(s, String(n), { x, y, w: d, h: d, fontSize: 10, bold: true, color, align: "center", valign: "middle" });
}

// ---------- SLIDE 1: masalah, sikap, bukti, jawaban ----------
{
  const s = pres.addSlide();
  header(s, 1, "Tumpang Tindih Kewenangan: Kurator Tidak Hanya Orang Perseorangan", "Masalah, sikap BHP Medan, bukti dari perkara yang sedang berjalan, dan jawaban atas tiga pertanyaan Klaster 1");
  const Y = 1.3, H = 3.78;

  // Kolom 1: masalah
  box(s, 0.45, Y, 3.2, H, WHITE, LINE);
  label(s, "Masalah", 0.65, Y + 0.12, 2.8);
  text(s, rich("RUU Profesi Kurator akan mengatur profesi kurator, padahal **kurator tidak hanya orang perseorangan. BHP juga menjalankan tugas kurator berdasarkan undang-undang.** Apabila RUU hanya disusun untuk kurator perorangan, kedudukan BHP menjadi tidak jelas:", { fontSize: 11 }, { color: NAVY }), { x: 0.65, y: Y + 0.42, w: 2.8, h: 1.55, fontSize: 11 });
  ["Apakah BHP ikut aturan izin dan sertifikasi profesi?", "Siapa yang membina dan mengawasinya?", "Bagaimana pembagian perannya dengan kurator privat?"].forEach((t, i) => {
    const y = Y + 2.0 + i * 0.5;
    numDot(s, i + 1, 0.65, y + 0.06, 0.28);
    text(s, t, { x: 1.03, y, w: 2.45, h: 0.42, fontSize: 11, bold: true, color: NAVY, valign: "middle" });
  });

  // Kolom 2: sikap
  box(s, 3.85, Y, 4.75, H, NAVY);
  label(s, "Sikap BHP Medan", 4.05, Y + 0.12, 4.3, GOLD);
  const SIKAP = [8, 9, 10, 11].map((i) => [lead(i), rest(i).trim()]);
  const SHORT = ["Kewenangan BHP berasal dari undang-undang, sehingga BHP tidak memerlukan izin atau pendaftaran seperti kurator perorangan. Tugasnya dijalankan oleh pejabat fungsional Kurator Keperdataan.",
    "Kode etik dan standar profesi yang sama berlaku bagi BHP dan kurator perorangan. Yang berbeda hanya pembinaannya, karena BHP adalah lembaga pemerintah.",
    "BHP menangani perkara yang menyangkut kepentingan publik atau tidak diminati (perkara pekerja, harta kecil). Kurator perorangan menangani perkara bisnis atas pilihan para pihak.",
    "Kementerian membina, Hakim Pengawas mengawasi perkara, organisasi profesi menegakkan etik kurator perorangan, BHP menjadi simpul data. BHP bukan pengawas kurator privat, karena BHP sendiri adalah kurator."];
  SIKAP.forEach(([l], i) => {
    const y = Y + 0.42 + i * 0.83;
    numDot(s, i + 1, 4.05, y + 0.04, 0.28, GOLD, NAVY);
    text(s, [{ text: l + " ", options: { bold: true, color: GOLD } }, { text: SHORT[i], options: { color: "E6ECF7" } }], { x: 4.43, y, w: 3.98, h: 0.81, fontSize: 9.2 });
  });

  // Kolom 3: bukti
  box(s, 8.8, Y, 4.08, H, WHITE, LINE);
  label(s, "Bukti: pengalaman BHP Medan", 9.0, Y + 0.12, 3.7);
  const BUKTI = [["9 perkara", "kepailitan masih berjalan, tagihan sekitar Rp47,35 miliar. Semuanya jatuh ke BHP karena pemohon tidak mengusulkan kurator."],
    ["12% sampai 40%", "nilai harta dibanding tagihan pada empat perkara yang sudah dinilai. Tidak menarik bagi kurator yang bekerja atas dasar imbalan."],
    ["6 dari 9", "perkara berjalan lebih dari lima tahun, terlama sejak 2016. Kurator perorangan bisa berhenti atau meninggal dunia; BHP tetap ada sebagai lembaga."],
    ["Hak pekerja dan uang negara", "PT Rata Makmur: permohonan diajukan pekerja, BHP ditunjuk pengurus lalu kurator. Tagihan pekerja sudah lunas, sisanya tagihan pajak."],
    ["Debitor menghilang", "CV Hitado: debitor tidak ditemukan sekitar lima tahun sehingga penyelesaian perkara tertahan."],
    ["Naik 19,18%", "perkara niaga nasional, 782 menjadi 932 (Laporan Tahunan MA 2025). Data perkara BHP dan kurator privat belum ada: pengadilan tidak mencatat siapa kurator yang diangkat."]];
  let yb = Y + 0.4;
  BUKTI.forEach(([b, t]) => {
    const lines = Math.ceil((b.length * 1.25 + t.length) / 57); // perkiraan konservatif pada 9,5 pt
    const h = lines * 0.148 + 0.05;
    text(s, [{ text: b + "  ", options: { bold: true, color: NAVY, fontSize: 9.5 } }, { text: t, options: { fontSize: 8 } }], { x: 9.0, y: yb, w: 3.72, h });
    yb += h + 0.05;
  });
  if (yb - 0.05 > Y + H) throw new Error("kolom bukti meluap: " + yb.toFixed(2));

  // Bawah: jawaban tiga pertanyaan Klaster 1
  const Y2 = Y + H + 0.14;
  box(s, 0.45, Y2, 12.43, 1.92, SOFT);
  label(s, "Jawaban Klaster 1", 0.65, Y2 + 0.1, 6);
  const QA = [
    ["Bagaimana mekanisme BHP sebagai kurator, dan adakah kendala dengan kurator privat?", "Setelah ditunjuk pengadilan, Kepala BHP menugaskan tim Kurator Keperdataan: mengurus, menilai, dan menjual harta di bawah pengawasan Hakim Pengawas, melapor berkala; imbalan jasa disetor ke kas negara. Pada PT Jasa Prima Mandiri (2015 sampai 2019, harta Rp12,85 miliar dibereskan) kerja sama dengan kurator tambahan berjalan baik. **Kendalanya imbalan jasa**: BHP 8% dari nilai bersih (Rp379,8 juta), kurator tambahan 5% dari nilai kotor (Rp642,7 juta), tanpa aturan pembagian imbalan dan tugas sesuai porsi."],
    ["Perlukah pemisahan tegas peran BHP dengan peran kurator privat?", "**Tidak perlu dipisahkan; yang diperlukan pembagian peran yang jelas.** (a) Tanpa BHP, perkara yang tidak diminati kurator privat tidak punya pelaksana; (b) BHP tidak berebut perkara: yang ditangani adalah perkara yang tidak diambil pihak lain; (c) pengalaman BHP mengurus warisan, perwalian anak, dan harta orang yang menghilang membuatnya paling siap. Catatan: wali pengawas adalah tugas BHP dalam perwalian anak (Pasal 366 KUHPerdata), bukan pengawas kurator."],
    ["Bagaimana pandangan BHP tentang kewajiban memakai BHP pada kasus tertentu?", "**Setuju**, terutama untuk debitor yang meninggal tanpa ahli waris atau hartanya tidak terurus, debitor yang tidak diketahui keberadaannya, perkara pekerja, perkara dengan harta kecil, dan perkara yang kehilangan kurator. Di luar itu para pihak tetap bebas memilih kurator. RUU Profesi Kurator cukup memuat dasar penugasannya; kriteria dan tata cara diatur RUU Kepailitan dan PKPU."],
  ];
  QA.forEach(([q, a], i) => {
    const x = 0.65 + i * 4.12, w = 3.95;
    numDot(s, i + 1, x, Y2 + 0.4, 0.26);
    text(s, q, { x: x + 0.34, y: Y2 + 0.36, w: w - 0.34, h: 0.42, fontSize: 9.5, bold: true, color: NAVY, valign: "middle" });
    text(s, rich(a, { fontSize: 8 }, { color: NAVY }), { x, y: Y2 + 0.78, w, h: 1.1, fontSize: 8 });
  });
  s.addNotes("Slide 1: masalah (kurator tidak hanya orang perseorangan), empat sikap BHP Medan, bukti dari sembilan perkara yang sedang berjalan, dan jawaban atas tiga pertanyaan Klaster 1. Naskah lengkap pada berkas Narasi.");
}

// ---------- SLIDE 2: usulan pasal dan catatan ----------
{
  const s = pres.addSlide();
  header(s, 2, "Usulan Rumusan Pasal untuk RUU Profesi Kurator", "Empat pasal yang dapat langsung dipakai, satu untuk setiap sikap, beserta catatan untuk RUU Kepailitan dan PKPU");
  const Y = 1.3, CW = 6.1, CH = 2.33, GAP = 0.23;
  const MENJAWAB = ["Sikap 1: kedudukan BHP sebagai lembaga negara", "Sikap 3: pembagian peran yang tegas", "Sikap 2: satu standar profesi untuk semua kurator", "Sikap 4: koordinasi, imbalan bersama, dan data"];
  const ORDER = [0, 1, 2, 3]; // A B / C D
  ORDER.forEach((pi, k) => {
    const p = PASAL[pi];
    const x = 0.45 + (k % 2) * (CW + GAP), y = Y + Math.floor(k / 2) * (CH + GAP);
    box(s, x, y, CW, CH, WHITE, LINE);
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: CW, h: 0.42, fill: { color: NAVY }, line: { color: NAVY } });
    text(s, [{ text: `Pasal ${p.no}  `, options: { bold: true, color: GOLD, fontSize: 13 } }, { text: p.judul, options: { bold: true, color: WHITE, fontSize: 12 } }], { x: x + 0.2, y, w: CW - 2.6, h: 0.42, valign: "middle" });
    text(s, "Menjawab " + MENJAWAB[pi], { x: x + CW - 2.85, y, w: 2.7, h: 0.42, fontSize: 8.5, color: "DCE4F2", align: "right", valign: "middle" });
    const runs = [];
    p.ayat.forEach(([l, t], i) => { runs.push({ text: l + "  ", options: { bold: true, color: NAVY } }); runs.push({ text: t, options: { breakLine: true } }); });
    runs.push({ text: "Analisis. ", options: { bold: true, color: DARKGOLD, italic: true } });
    runs.push({ text: p.analisis, options: { italic: true, color: "2D3748" } });
    text(s, runs, { x: x + 0.2, y: y + 0.5, w: CW - 0.4, h: CH - 0.58, fontSize: p.no === "D" ? 9 : 9.5, paraSpaceAfter: 3 });
  });

  // Catatan untuk RUU Kepailitan dan PKPU
  const Y3 = Y + 2 * CH + GAP + 0.2;
  box(s, 0.45, Y3, 12.43, 0.85, NAVY);
  label(s, "Catatan untuk RUU Kepailitan dan PKPU", 0.65, Y3 + 0.08, 5, GOLD);
  const CAT = ["Kewenangan BHP menjadi pengurus PKPU", "Kriteria dan tata cara penunjukan BHP pada perkara tertentu", "Kepailitan harta peninggalan tanpa ahli waris", "Kelanjutan perkara apabila debitor menghilang"];
  CAT.forEach((t, i) => {
    const x = 0.65 + i * 2.55;
    numDot(s, i + 1, x, Y3 + 0.4, 0.26, GOLD, NAVY);
    text(s, t, { x: x + 0.32, y: Y3 + 0.34, w: 2.2, h: 0.42, fontSize: 9, bold: true, color: WHITE, valign: "middle" });
  });
  text(s, "Kedua RUU perlu disusun selaras sejak awal.", { x: 10.85, y: Y3 + 0.08, w: 1.9, h: 0.7, fontSize: 10, bold: true, color: GOLD, align: "right", valign: "middle" });
  s.addNotes("Slide 2: empat usulan pasal (A kedudukan BHP, B pembagian peran, C standar dan pembinaan, D koordinasi dan penugasan bersama) dan catatan untuk RUU Kepailitan dan PKPU.");
}

// ======================= NASKAH NARASI =======================
const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, Footer, PageNumber } = docx;
const P = (runs, o = {}) => new Paragraph({ spacing: { after: 140, line: 300 }, alignment: AlignmentType.JUSTIFIED, ...o, children: (Array.isArray(runs) ? runs : [runs]).map((r) => typeof r === "string" ? new TextRun({ text: r, font: FONT, size: 22 }) : r) });
const B = (t, extra = {}) => new TextRun({ text: t, bold: true, font: FONT, size: 22, ...extra });
const T = (t, extra = {}) => new TextRun({ text: t, font: FONT, size: 22, ...extra });
const H = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 280, after: 120 }, children: [new TextRun({ text: t, bold: true, font: FONT, size: 26, color: NAVY })] });
const NOTE = (t) => P([new TextRun({ text: t, italics: true, font: FONT, size: 20, color: MUTED })], { alignment: AlignmentType.LEFT });
const NUM = (n, runs) => new Paragraph({ spacing: { after: 100, line: 300 }, alignment: AlignmentType.JUSTIFIED, indent: { left: 540, hanging: 540 }, children: [B(n + "\t"), ...(Array.isArray(runs) ? runs : [runs]).map((r) => typeof r === "string" ? T(r) : r)] });
const cell = (t, o = {}) => new TableCell({ width: { size: o.w || 50, type: WidthType.PERCENTAGE }, shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill } : undefined, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: (Array.isArray(t) ? t : [t]).map((x) => typeof x === "string" ? new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: x, font: FONT, size: 20, bold: !!o.bold, color: o.color })] }) : x) });

const body = [];
body.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: "NASKAH NARASI PAPARAN", bold: true, font: FONT, size: 26 })] }));
body.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: "BALAI HARTA PENINGGALAN MEDAN", bold: true, font: FONT, size: 24 })] }));
body.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: "Klaster 1: Tumpang Tindih Kewenangan (Kewenangan dan Pembagian Peran Kurator)", bold: true, font: FONT, size: 24, color: NAVY })] }));
body.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, border: { bottom: { style: BorderStyle.DOUBLE, size: 6, color: "1A1E26" } }, children: [new TextRun({ text: "Rapat Dengar Pendapat Komisi XIII DPR RI tentang RUU Profesi Kurator, 6 Oktober 2026", font: FONT, size: 22 })] }));
body.push(NOTE("Naskah ini mengiringi paparan dua slide. Slide 1 memuat masalah, sikap, bukti, dan jawaban Klaster 1; slide 2 memuat usulan pasal dan catatan. Seluruh isi bersumber pada Bahan Masukan BHP Medan, Poin 1: Kewenangan dan Pembagian Peran Kurator (Medan, 2 Oktober 2026). Perkiraan waktu paparan 7 sampai 8 menit."));

body.push(H("Pembuka"));
body.push(P("Terima kasih, Pimpinan. Izinkan Balai Harta Peninggalan Medan menyampaikan masukan untuk Klaster 1, yaitu tumpang tindih kewenangan. Kami akan menyampaikan empat hal secara berurutan: masalahnya, sikap kami, bukti dari perkara yang sedang kami tangani, dan jawaban atas tiga pertanyaan Komisi, lalu ditutup dengan usulan rumusan pasal."));

body.push(H("1. Masalah: kurator tidak hanya orang perseorangan"));
body.push(P([T("(Slide 1, kolom kiri.) "), T(plain(6))]));
body.push(P("Tiga hal inilah yang kami jawab melalui empat sikap berikut."));

body.push(H("2. Sikap BHP Medan"));
body.push(P("(Slide 1, kolom tengah.) BHP Medan menyampaikan empat sikap."));
[8, 9, 10, 11].forEach((i, k) => body.push(NUM(`${k + 1}.`, [B(lead(i) + " "), T(rest(i).trim())])));

body.push(H("3. Bukti: pengalaman BHP Medan"));
body.push(P([T("(Slide 1, kolom kanan.) "), T(plain(13))]));
body.push(NUM("a.", [B("Hartanya kecil. "), T(rest(14).trim())]));
body.push(NUM("b.", [B("Perkaranya panjang. "), T(rest(17).trim())]));
body.push(NUM("c.", [B("Menyangkut hak pekerja dan uang negara. "), T(rest(20).trim())]));
body.push(NUM("d.", [B("Debitor menghilang. "), T(rest(21).trim())]));
body.push(P(plain(22)));
body.push(P("Dari data ini jelas: perkara yang jatuh ke BHP adalah perkara yang tidak diambil pihak lain. Pembagian peran yang kami usulkan bukan teori, melainkan sudah terjadi di lapangan."));

body.push(H("4. Jawaban atas tiga pertanyaan Klaster 1"));
body.push(P("(Slide 1, bagian bawah.)"));
body.push(P([B("Pertanyaan pertama: " + plain(24))]));
body.push(P(plain(25)));
body.push(P(plain(26)));
body.push(P(plain(27)));
body.push(P([B("Pertanyaan kedua: " + plain(28))]));
body.push(P(plain(29)));
["a.", "b.", "c."].forEach((l, k) => body.push(NUM(l, plain(30 + k))));
body.push(P(plain(33)));
body.push(P([B("Pertanyaan ketiga: " + plain(34))]));
body.push(P(plain(35)));

body.push(H("5. Usulan rumusan pasal untuk RUU Profesi Kurator"));
body.push(P("(Slide 2.) Dari empat sikap tadi, kami menyiapkan empat rumusan pasal yang dapat langsung dipakai. Satu sikap, satu pasal."));
PASAL.forEach((p) => {
  body.push(new Paragraph({ spacing: { before: 160, after: 60 }, children: [B(`Pasal ${p.no} (${p.judul})`, { color: NAVY })] }));
  p.ayat.forEach(([l, t]) => body.push(NUM(l, t)));
  body.push(P([B("Analisis. ", { italics: true, color: DARKGOLD }), T(p.analisis, { italics: true })]));
});

body.push(H("6. Catatan untuk RUU Kepailitan dan PKPU"));
body.push(P(plain(66)));

body.push(H("Penutup"));
body.push(P("Demikian masukan BHP Medan untuk Klaster 1. Intinya satu: BHP dimuat dalam RUU sebagai lembaga negara yang menjalankan tugas kurator, dengan satu standar profesi untuk semua kurator, pembagian peran yang jelas, dan koordinasi antarlembaga yang tegas. Terima kasih."));

body.push(new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.LEFT, indent: { left: 5000 }, children: [T("Medan, 2 Oktober 2026")] }));
body.push(new Paragraph({ indent: { left: 5000 }, children: [T("Kepala Balai Harta Peninggalan Medan,")] }));
body.push(new Paragraph({ spacing: { before: 700 }, indent: { left: 5000 }, children: [B("Syafriadi Lubis, M.H.", { underline: {} })] }));

const doc = new Document({
  creator: "Balai Harta Peninggalan Medan",
  title: "Naskah Narasi BHP Medan, Klaster 1 Tumpang Tindih Kewenangan",
  styles: { default: { document: { run: { font: FONT, size: 22 } } } },
  sections: [{
    properties: { page: { margin: { top: 1134, bottom: 1134, left: 1247, right: 1134 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BHP Medan · Klaster 1 Tumpang Tindih Kewenangan · Narasi · hal. ", font: FONT, size: 16, color: MUTED }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: MUTED })] })] }) },
    children: body,
  }],
});

(async () => {
  await pres.writeFile({ fileName: path.join(__dirname, `${NAMA} - Paparan.pptx`) });
  fs.writeFileSync(path.join(__dirname, `${NAMA} - Narasi.docx`), await Packer.toBuffer(doc));
  console.log("selesai: 2 slide + narasi");
})();
