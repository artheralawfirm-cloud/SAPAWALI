// Paparan 2 slide BHP Medan, Klaster 1: Tumpang Tindih Kewenangan (RDP Komisi XIII DPR RI, 6 Oktober 2026).
// Isi mengikuti dokumen "BHP Medan - Telaah Poin 1 dan Klaster 1 - Tumpang Tindih Kewenangan" (3 Oktober 2026).
// Jalankan: NODE_PATH=<node_modules berisi pptxgenjs, react, react-dom, react-icons, sharp> node build_paparan.cjs
const fs = require("fs"), path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react"), RDS = require("react-dom/server"), sharp = require("sharp"), fa = require("react-icons/fa");

const MAROON = "7A1F2B", MAROON2 = "4F1520", GOLD = "C9A24A", GOLD2 = "8A6A22", CREAM = "E8CB80", INK = "2B2B2B", MUTED = "555555", SOFT = "F4F4F6", WHITE = "FFFFFF", LINE = "E2DDD5";
const FONT = "Calibri", W = 13.333, H = 7.5;
const NAMA = "BHP Medan - Klaster 1 Tumpang Tindih Kewenangan - Paparan.pptx";
const DATA_HTML = "BHP Medan - Data Interaktif.html"; // tautan relatif: simpan di folder yang sama dengan .pptx
const LOGO = ["logo-pengayoman.png", "logo-ahu.png"].map((f) => path.join(__dirname, "..", "web", f)).filter(fs.existsSync);

async function icon(Comp, color) {
  const svg = RDS.renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size: "256" }));
  return "image/png;base64," + (await sharp(Buffer.from(svg)).png().toBuffer()).toString("base64");
}
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Bahan Masukan BHP Medan: Klaster 1, Tumpang Tindih Kewenangan";
pres.author = "Balai Harta Peninggalan Medan";

const text = (s, t, o) => s.addText(t, { fontFace: FONT, color: INK, isTextBox: true, valign: "top", margin: 0, ...o });
const rect = (s, x, y, w, h, fill, o = {}) => s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: o.line || fill, width: o.lw || 0.75 }, ...o });
const rrect = (s, x, y, w, h, fill, o = {}) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: o.line || fill, width: 0.75 }, rectRadius: 0.07, ...o });
// "teks **tebal**" -> run; bagian tebal berwarna marun (atau warna lain)
const rich = (str, base = {}, bold = {}) => str.split("**").map((t, i) => ({ text: t, options: i % 2 ? { ...base, bold: true, color: MAROON, ...bold } : base })).filter((r) => r.text);

function header(s, no, title, sub) {
  rect(s, 0, 0, W, 1.12, MAROON); rect(s, 0, 1.12, W, 0.04, GOLD);
  let x = 0.45;
  LOGO.forEach((p) => { s.addImage({ path: p, x, y: 0.2, w: 0.72, h: 0.72 }); x += 0.8; });
  text(s, "BALAI HARTA PENINGGALAN MEDAN  ·  RDP KOMISI XIII DPR RI, 6 OKTOBER 2026  ·  RUU TENTANG PROFESI KURATOR", { x: x + 0.1, y: 0.1, w: 8.6, h: 0.24, fontSize: 9.5, bold: true, color: CREAM, charSpacing: 1.2, valign: "middle" });
  text(s, title, { x: x + 0.1, y: 0.33, w: 8.6, h: 0.38, fontSize: 20, bold: true, color: WHITE, valign: "middle" });
  text(s, sub, { x: x + 0.1, y: 0.7, w: 8.6, h: 0.4, fontSize: 9.5, color: "E9D6D9", valign: "top" });
  // tombol data interaktif (tautan ke berkas HTML di folder yang sama)
  rrect(s, 10.35, 0.24, 2.55, 0.64, GOLD);
  const HL = { hyperlink: { url: DATA_HTML, tooltip: "Buka data interaktif" } }; // tautan diletakkan pada tiap run (cara pptxgenjs)
  s.addText([{ text: "LIHAT DATA INTERAKTIF", options: { fontSize: 10, bold: true, color: MAROON2, charSpacing: 1.2, breakLine: true, ...HL } }, { text: "grafik perkara BHP Medan  ›", options: { fontSize: 9, color: MAROON2, ...HL } }],
    { x: 10.35, y: 0.24, w: 2.55, h: 0.64, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  text(s, `Klaster 1 · slide ${no} dari 2`, { x: 10.35, y: 0.9, w: 2.55, h: 0.2, fontSize: 8, color: CREAM, align: "center", valign: "middle" });
  text(s, "Sumber: Masukan dan Telaah BHP Medan, Klaster 1 (Medan, 3 Oktober 2026), Lampiran I (data perkara dan SIPP PN Medan per 2 Oktober 2026) dan Lampiran II (contoh rumusan pasal). Kepala BHP Medan: Syafriadi Lubis, M.H.", { x: 0.45, y: 7.17, w: 12.0, h: 0.24, fontSize: 8, color: "6B6B6B", valign: "middle" });
  text(s, String(no), { x: 12.5, y: 7.15, w: 0.4, h: 0.26, fontSize: 9, color: "8C8C8C", align: "right", valign: "middle" });
}
const badge = (s, n, x, y, d = 0.5) => { s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: MAROON }, line: { color: MAROON } }); text(s, n, { x, y, w: d, h: d, fontSize: 16, bold: true, color: GOLD, align: "center", valign: "middle" }); };
const label = (s, t, x, y, w, color = GOLD2, size = 9) => text(s, t.toUpperCase(), { x, y, w, h: 0.24, fontSize: size, bold: true, color, charSpacing: 1.2, valign: "middle" });

(async () => {
  const I = {};
  for (const [k, C] of [["gov", fa.FaLandmark], ["gavel", fa.FaGavel], ["balance", fa.FaBalanceScale], ["court", fa.FaUniversity], ["map", fa.FaMapMarkedAlt], ["chart", fa.FaChartBar]]) I[k] = await icon(C, GOLD);

  // =============== SLIDE 1: jawaban tiga pertanyaan ===============
  {
    const s = pres.addSlide();
    header(s, 1, "Jawaban BHP Medan atas Tiga Pertanyaan Klaster 1", "Tumpang tindih BHP dan kurator perseorangan bukan perebutan perkara. Aturannya belum mengatur tiga keadaan: tugas bersama, dua tugas BHP dalam satu perkara, dan perkara tertentu.");
    const Y = 1.38, CH = 4.1, CW = 4.05, GAP = 0.19;
    const COLS = [
      { k: "Pertanyaan 1 · Mekanisme dan kendala", q: "Bagaimana mekanisme BHP sebagai kurator, dan adakah kendala saat berhadapan dengan kurator privat dari asosiasi?",
        a: "**Berjalan sesuai SOP Kepailitan.** Putusan pengadilan › tim Kurator Keperdataan › pengurusan dan pemberesan di bawah Hakim Pengawas › imbalan jasa ke kas negara (PNBP).\n**Kendalanya saat bertugas bersama kurator perseorangan:** belum ada pembagian imbalan dan tanggung jawab, serah terima saat PKPU berakhir pailit, dan satu standar profesi.",
        bk: "Bukti lapangan", b: "PT Jasa Prima Mandiri (2015 sampai dengan 2019): bersama kurator perseorangan, harta Rp12,85 miliar dibereskan, tetapi pembagian imbalan tidak punya dasar aturan." },
      { k: "Pertanyaan 2 · Pemisahan peran BHP", q: "Perlukah pemisahan tegas peran BHP sebagai balai harta atau wali pengawas dengan peran kurator privat?",
        a: "**Perlu.** Tugas keperdataan dan tugas kurator adalah dua hal berbeda. Yang dipisah dasar hukum, pelaksana, dan pertanggungjawabannya, bukan lembaganya.",
        split: [["Tugas keperdataan · KUHPerdata", "Wali pengawas, pengampu pengawas, orang tidak hadir, harta tak terurus. Dibina Kementerian."], ["Tugas kurator · UU 37/2004", "Harta pailit, ditunjuk pengadilan, diawasi Hakim Pengawas (Pasal 65)."]],
        bk: "Bukti lapangan", b: "Gwe Tjoen: debitor meninggal, ahli waris tidak diketahui. BHP mengurus harta pailit sekaligus sisa harta tak bertuan. Berjalan 10,6 tahun." },
      { k: "Pertanyaan 3 · Kewajiban memakai BHP", q: "Bagaimana pandangan BHP tentang kewajiban memakai kurator BHP pada kasus tertentu (debitor tanpa ahli waris, harta tidak terurus)?",
        a: "**Setuju, dengan kriteria tertutup.** Kedua contoh itu memang tugas BHP menurut KUHPerdata. Ditambah: debitor tidak diketahui keberadaannya; ahli waris masih anak atau dalam pengampuan; permohonan buruh; perkara kehilangan kurator. Kurator perseorangan dapat menjadi kurator tambahan. **Di luar itu pemohon bebas memilih.**",
        bk: "Bukti lapangan", b: "SIPP 2025 sampai 2026: dari 16 putusan pailit, BHP diangkat 2 kali, keduanya karena diminta pemohon. Penugasan BHP masih bergantung pada pilihan pemohon." },
    ];
    COLS.forEach((c, i) => {
      const x = 0.45 + i * (CW + GAP);
      rrect(s, x, Y, CW, CH, SOFT);
      badge(s, String(i + 1), x + 0.18, Y + 0.16);
      label(s, c.k, x + 0.78, Y + 0.14, CW - 0.95, GOLD2, 9.5);
      text(s, c.q, { x: x + 0.78, y: Y + 0.38, w: CW - 0.95, h: 0.56, fontSize: 9, italic: true, color: MUTED });
      let y = Y + 1.0;
      if (c.split) {
        text(s, rich(c.a, { fontSize: 10 }), { x: x + 0.18, y, w: CW - 0.36, h: 0.78, fontSize: 10, paraSpaceAfter: 3 }); y += 0.84;
        const bw = (CW - 0.36 - 0.14) / 2;
        c.split.forEach(([h, t], k) => {
          const bx = x + 0.18 + k * (bw + 0.14);
          rrect(s, bx, y, bw, 1.08, k ? "F3E6E8" : "EFEFF2");
          text(s, [{ text: h, options: { fontSize: 8.5, bold: true, color: MAROON, breakLine: true } }, { text: t, options: { fontSize: 8.5, color: INK } }], { x: bx + 0.1, y: y + 0.07, w: bw - 0.2, h: 0.96, paraSpaceAfter: 2 });
        });
        text(s, "≠", { x: x + CW / 2 - 0.15, y: y + 0.3, w: 0.3, h: 0.4, fontSize: 18, bold: true, color: GOLD, align: "center", valign: "middle" });
        y += 1.16;
      } else {
        text(s, rich(c.a, { fontSize: 10 }), { x: x + 0.18, y, w: CW - 0.36, h: 1.98, fontSize: 10, paraSpaceAfter: 4 }); y += 2.0;
      }
      rrect(s, x + 0.14, Y + CH - 0.98, CW - 0.28, 0.86, WHITE, { line: LINE });
      text(s, [{ text: c.bk.toUpperCase(), options: { fontSize: 8, bold: true, color: GOLD2, charSpacing: 1.2, breakLine: true } }, { text: c.b, options: { fontSize: 8.5, color: INK } }], { x: x + 0.26, y: Y + CH - 0.92, w: CW - 0.52, h: 0.76, paraSpaceAfter: 2 });
    });
    // pita pengalaman BHP Medan
    const RY = Y + CH + 0.16;
    rect(s, 0.45, RY, 12.43, 1.06, MAROON);
    text(s, [{ text: "PENGALAMAN", options: { breakLine: true } }, { text: "BHP MEDAN" }], { x: 0.65, y: RY, w: 1.6, h: 1.06, fontSize: 11, bold: true, color: CREAM, charSpacing: 1.5, valign: "middle" });
    [["9", "perkara kepailitan sedang ditangani"], ["Rp47,35 M", "total tagihan kreditor"], ["6 dari 9", "perkara berjalan lebih dari 5 tahun"], ["2 dari 9", "putusan pailit 2025 mengangkat BHP"], ["0 dari 7", "putusan pailit 2026 mengangkat BHP"]].forEach(([n, t], i) => {
      const x = 2.4 + i * 2.08;
      text(s, n, { x, y: RY + 0.1, w: 1.95, h: 0.48, fontSize: 24, bold: true, color: GOLD, valign: "middle" });
      text(s, t, { x, y: RY + 0.58, w: 1.95, h: 0.42, fontSize: 9, color: WHITE });
    });
    s.addNotes("Slide 1 menjawab tiga pertanyaan Klaster 1 secara berurutan, masing-masing dengan bukti dari perkara BHP Medan. Pita bawah memuat pengalaman BHP Medan. Naskah lengkap pada berkas Narasi; tombol kanan atas membuka data interaktif (simpan berkas HTML di folder yang sama).");
  }

  // =============== SLIDE 2: materi RUU dan koordinasi ===============
  {
    const s = pres.addSlide();
    header(s, 2, "Materi yang Perlu Dimuat dalam RUU Profesi Kurator", "Jawaban slide 1 diterjemahkan ke tiga tujuan RUU: penegasan peran BHP, peningkatan kualitas profesi, serta pengawasan dan pertanggungjawaban.");
    const Y = 1.38, CH = 4.42, CW = 4.05, GAP = 0.19;
    const G = [
      { h: "Penegasan peran BHP", m: "Menjawab Pertanyaan 2 dan 3", u: ["BHP adalah kurator negara dan pengurus negara; kewenangannya dari undang-undang, tanpa izin atau pendaftaran.", "Pengadilan wajib mengangkat BHP bila debitor meninggal tanpa ahli waris atau hartanya tak terurus, tidak diketahui keberadaannya, ahli waris masih anak atau dalam pengampuan, permohonan diajukan pekerja, atau perkara kehilangan kurator.", "Di luar itu pemohon bebas memilih; kriteria rinci di RUU Kepailitan dan PKPU."], p: "Pasal 15 ayat (2) UU 37/2004 membuka pintu BHP hanya bila tidak ada usulan kurator; Pasal 1127 KUHPerdata sudah mewajibkan BHP mengurus harta tak terurus." },
      { h: "Peningkatan kualitas profesi", m: "Menjawab Pertanyaan 1 dan 2", u: ["Satu standar profesi bagi BHP dan kurator perseorangan; kode etik mengikuti jalur masing-masing (ASN untuk BHP, organisasi profesi untuk kurator perseorangan).", "Tugas kurator BHP dijalankan pejabat fungsional Kurator Keperdataan dengan kompetensi yang sama.", "Data kurator aktif dan beban perkaranya dikelola Kementerian, dapat diperiksa pengadilan.", "Pembinaan BHP tetap oleh Kementerian."], p: "TOR Komisi XIII mencatat standar profesi yang terfragmentasi; kini BHP dan kurator perseorangan diukur dengan aturan yang berbeda." },
      { h: "Pengawasan dan pertanggungjawaban", m: "Menjawab Pertanyaan 1 dan 2", u: ["Hakim Pengawas mengawasi pengurusan dan pemberesan oleh setiap kurator, BHP maupun perseorangan.", "Tugas bersama: pembagian tugas, tanggung jawab, dan imbalan ditetapkan sejak rapat kreditor pertama; bagian BHP menjadi PNBP.", "Serah terima wajib saat kurator berganti dan saat PKPU berakhir pailit.", "Tugas keperdataan dan tugas kurator BHP dijalankan pejabat berbeda dan dipertanggungjawabkan terpisah."], p: "Pasal 65 dan 73 UU 37/2004: Hakim Pengawas mengawasi, tetapi tanggung jawab antarkurator dalam tugas bersama belum dibagi." },
    ];
    G.forEach((g, i) => {
      const x = 0.45 + i * (CW + GAP);
      rrect(s, x, Y, CW, CH, SOFT);
      rrect(s, x + 0.16, Y + 0.14, CW - 0.32, 0.7, MAROON);
      text(s, [{ text: g.h, options: { fontSize: 13, bold: true, color: WHITE, breakLine: true } }, { text: g.m, options: { fontSize: 8.5, color: CREAM } }], { x: x + 0.32, y: Y + 0.14, w: CW - 0.64, h: 0.7, valign: "middle" });
      text(s, g.u.map((t) => ({ text: t, options: { bullet: { indent: 10 }, fontSize: 9.5, color: INK, paraSpaceAfter: 4 } })), { x: x + 0.18, y: Y + 0.96, w: CW - 0.36, h: 2.3 });
      rrect(s, x + 0.14, Y + CH - 1.06, CW - 0.28, 0.94, WHITE, { line: LINE });
      text(s, [{ text: "PIJAKAN SAAT INI", options: { fontSize: 8, bold: true, color: GOLD2, charSpacing: 1.2, breakLine: true } }, { text: g.p, options: { fontSize: 8.5, color: INK } }], { x: x + 0.26, y: Y + CH - 1.0, w: CW - 0.52, h: 0.84, paraSpaceAfter: 2 });
    });
    // pita koordinasi antarlembaga
    const RY = Y + CH + 0.14;
    rect(s, 0.45, RY, 12.43, 0.92, MAROON);
    text(s, [{ text: "KOORDINASI", options: { breakLine: true } }, { text: "ANTARLEMBAGA" }], { x: 0.65, y: RY, w: 1.6, h: 0.92, fontSize: 10, bold: true, color: CREAM, charSpacing: 1.5, valign: "middle" });
    [["gov", "Kementerian", "membina BHP dan mengelola data kurator aktif"], ["gavel", "Hakim Pengawas", "mengawasi tiap perkara"], ["balance", "Organisasi profesi", "menegakkan etik kurator perseorangan"], ["court", "Pengadilan", "mengangkat kurator dan segera menyampaikan salinan putusan"], ["map", "BHP dan kantor pertanahan", "mengamankan aset, mencegah sertifikat ganda"]].forEach(([ic, h, t], i) => {
      const x = 2.35 + i * 2.1;
      s.addImage({ data: I[ic], x, y: RY + 0.27, w: 0.36, h: 0.36 });
      text(s, [{ text: h, options: { fontSize: 9.5, bold: true, color: WHITE, breakLine: true } }, { text: t, options: { fontSize: 8, color: "E9D6D9" } }], { x: x + 0.44, y: RY + 0.1, w: 1.6, h: 0.74, valign: "middle" });
    });
    s.addNotes("Slide 2 menerjemahkan jawaban slide 1 ke dalam tiga tujuan RUU: penegasan peran BHP, peningkatan kualitas profesi, serta pengawasan dan pertanggungjawaban, ditutup pembagian peran koordinasi antarlembaga. Contoh rumusan pasal lengkap ada pada Lampiran II dokumen Telaah.");
  }

  await pres.writeFile({ fileName: path.join(__dirname, NAMA) });
  console.log("selesai:", NAMA);
})();
