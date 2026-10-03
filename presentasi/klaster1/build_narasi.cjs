// Naskah narasi paparan BHP Medan, Klaster 1: Tumpang Tindih Kewenangan (RDP Komisi XIII DPR RI, 6 Oktober 2026).
// Mengiringi paparan 2 slide. Seluruh isi bersumber pada dokumen "BHP Medan - Telaah Poin 1 dan Klaster 1 - Tumpang Tindih Kewenangan".
// Jalankan: node build_narasi.cjs   (pustaka docx dari /opt/node-tools)
const fs = require("fs"), path = require("path");
const docx = require(fs.existsSync("/opt/node-tools/node_modules/docx") ? "/opt/node-tools/node_modules/docx" : "docx");
const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, BorderStyle, Footer, PageNumber } = docx;
const FONT = "Arial", MAROON = "7B1E2B", GOLD = "8A6A24", MUTED = "4A5568";
const T = (t, o = {}) => new TextRun({ text: t, font: FONT, size: 22, ...o });
const B = (t, o = {}) => T(t, { bold: true, ...o });
const P = (runs, o = {}) => new Paragraph({ spacing: { after: 140, line: 300 }, alignment: AlignmentType.JUSTIFIED, ...o, children: (Array.isArray(runs) ? runs : [runs]).map((r) => typeof r === "string" ? T(r) : r) });
const H = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 120 }, children: [new TextRun({ text: t, bold: true, font: FONT, size: 26, color: MAROON })] });
const CUE = (t) => new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: t, italics: true, font: FONT, size: 19, color: GOLD })] });
const NUM = (n, runs) => new Paragraph({ spacing: { after: 100, line: 300 }, alignment: AlignmentType.JUSTIFIED, indent: { left: 560, hanging: 560 }, children: [B(n + "\t"), ...(Array.isArray(runs) ? runs : [runs]).map((r) => typeof r === "string" ? T(r) : r)] });

const body = [];
const C = (t, o) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ font: FONT, ...o, text: t })] });
body.push(C("NASKAH NARASI PAPARAN", { bold: true, size: 26 }));
body.push(C("BALAI HARTA PENINGGALAN MEDAN", { bold: true, size: 24 }));
body.push(C("Klaster 1: Tumpang Tindih Kewenangan", { bold: true, size: 24, color: MAROON }));
body.push(C("Pokok Bahasan 1: Kewenangan dan Koordinasi, disertai Berbagi Pengalaman Kepala BHP Medan", { size: 22 }));
body.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, border: { bottom: { style: BorderStyle.DOUBLE, size: 6, color: "1A1E26" } }, children: [T("Rapat Dengar Pendapat Komisi XIII DPR RI tentang RUU Profesi Kurator, 6 Oktober 2026")] }));
body.push(P([new TextRun({ text: "Naskah ini mengiringi paparan dua slide: slide 1 menjawab tiga pertanyaan Klaster 1 dengan bukti dari perkara BHP Medan; slide 2 memuat materi yang perlu dimuat dalam RUU Profesi Kurator dan koordinasi antarlembaga. Seluruh isi bersumber pada dokumen Masukan dan Telaah BHP Medan (Medan, 3 Oktober 2026); rincian data ada pada Lampiran I dan contoh rumusan pasal pada Lampiran II dokumen itu. Perkiraan waktu bicara 9 sampai 10 menit.", italics: true, font: FONT, size: 20, color: MUTED })], { alignment: AlignmentType.LEFT }));

body.push(H("Pembuka"));
body.push(CUE("Slide 1 tampil."));
body.push(P("Terima kasih, Pimpinan. Balai Harta Peninggalan Medan mendapat tugas menyampaikan masukan untuk Klaster 1, yaitu tumpang tindih kewenangan, dengan pokok bahasan kewenangan dan koordinasi, disertai pengalaman kami di lapangan."));
body.push(P([T("Izinkan kami menyampaikan arah jawaban kami lebih dahulu. Berdasarkan pengalaman BHP Medan, "), B("tumpang tindih antara BHP dan kurator perseorangan bukan perebutan perkara."), T(" Kendalanya timbul karena aturan yang ada belum mengatur secara lengkap tiga keadaan: pertama, ketika BHP dan kurator perseorangan menangani perkara yang sama; kedua, ketika BHP harus menjalankan dua tugas sekaligus dalam satu perkara; dan ketiga, ketika tidak jelas siapa yang harus menjadi kurator pada perkara tertentu.")]));

body.push(H("Fakta dan data"));
body.push(CUE("Slide 1, pita bawah: Pengalaman BHP Medan."));
body.push(P("Sedikit gambaran. BHP Medan saat ini menangani 9 perkara kepailitan dengan total tagihan Rp47,35 miliar. Enam di antaranya sudah berjalan lebih dari lima tahun. Perkara-perkara ini berasal dari Pengadilan Niaga Medan, yang wilayahnya meliputi Sumatera Utara, Aceh, Sumatera Barat, Riau, Kepulauan Riau, Jambi, dan Bengkulu."));
body.push(P("Kami juga memeriksa seluruh perkara pailit dan PKPU yang terdaftar pada 2025 dan 2026 di SIPP Pengadilan Negeri Medan. Dari 16 putusan pailit, BHP ditunjuk hanya 2 kali, dan keduanya memang diminta dalam petitum. Sebelas permohonan meminta BHP dalam petitumnya, tetapi sebagian besar dicabut atau ditolak. Artinya, penugasan BHP sampai hari ini masih bergantung pada pilihan pemohon. Rincian data dan grafiknya ada pada Lampiran I."));

body.push(H("Pertanyaan 1: mekanisme BHP sebagai kurator dan kendalanya"));
body.push(CUE("Slide 1, kotak 1."));
body.push(P([B("Jawaban singkat kami: "), T("mekanismenya berjalan sesuai SOP Kepailitan, dan dalam setiap pengurusan dan pemberesan, kurator BHP tetap bertanggung jawab kepada Hakim Pengawas. Kendala dengan kurator perseorangan adalah belum adanya aturan tentang mekanisme kerja dan pembagian imbalan.")]));
body.push(P("Mekanismenya begini. Setelah pengadilan mengangkat BHP, Kepala BHP menugaskan tim pejabat Kurator Keperdataan. Tim mengurus harta, menjualnya, lalu membagikan hasilnya kepada kreditor. Imbalan jasa BHP masuk ke kas negara sebagai penerimaan negara bukan pajak."));
body.push(P("Kendalanya kami alami pada kepailitan PT Jasa Prima Mandiri, tahun 2015 sampai dengan 2019. BHP Medan bekerja bersama kurator perseorangan. Kerja sama berjalan baik dan harta Rp12,85 miliar berhasil dibereskan. Namun ada tiga hal yang belum diatur: pertama, cara membagi imbalan dan tanggung jawab antara BHP dan kurator perseorangan; kedua, kewajiban menyerahkan berkas dan data ketika perkara PKPU yang diurus kurator perseorangan berakhir pailit dan diteruskan kepada kurator lain; dan ketiga, ukuran profesi yang sama, karena kurator perseorangan mengikuti kode etik asosiasinya, sedangkan BHP mengikuti kode etik aparatur sipil negara."));
body.push(P("Undang-undang sudah menyebut BHP sebagai kurator pada Pasal 70 ayat (1), tetapi untuk kurator yang lebih dari satu, Pasal 73 ayat (1) hanya mengatur cara mengambil persetujuan. Karena itu, yang perlu diatur dalam RUU ada tiga: pembagian tugas, tanggung jawab, dan imbalan ditetapkan sejak awal bila BHP bertugas bersama kurator perseorangan, dan bagian BHP tetap menjadi PNBP; kewajiban menyerahkan berkas dan data ketika kurator berganti atau PKPU berakhir pailit; serta satu standar profesi bagi BHP dan kurator perseorangan, dengan kode etik yang tetap mengikuti jalur masing-masing."));

body.push(H("Pertanyaan 2: perlukah pemisahan tegas peran BHP"));
body.push(CUE("Slide 1, kotak 2."));
body.push(P([B("Jawaban kami: perlu. "), T("Tugas keperdataan BHP dan tugas BHP sebagai kurator adalah dua hal yang berbeda. Yang dipisahkan adalah dasar hukum, pelaksana, dan pertanggungjawabannya, bukan lembaganya. Dalam kepailitan, BHP berkedudukan sebagai kurator, sama seperti kurator perseorangan yang diangkat pengadilan. Dalam tugas pokok dan fungsi lain, BHP berkedudukan sebagai wali pengawas, pengampu pengawas, pengurus harta orang yang tidak hadir, dan pengurus harta peninggalan tak terurus menurut KUHPerdata.")]));
body.push(P("Kedua kelompok tugas itu bersumber dari aturan yang berbeda dan diawasi oleh pihak yang berbeda. Tugas keperdataan bersumber dari KUHPerdata dan dibina Kementerian; tugas kurator bersumber dari Undang-Undang Kepailitan dan diawasi Hakim Pengawas berdasarkan Pasal 65. Yang belum ada adalah aturan tentang cara memisahkannya bila BHP menjalankan keduanya dalam satu perkara."));
body.push(P("Contohnya nyata. Pada kepailitan Gwe Tjoen, debitor meninggal dunia dan ahli warisnya tidak diketahui. Selain mengurus harta pailit sebagai kurator, BHP juga harus memikirkan sisa harta yang tidak ada pemiliknya, yang menurut KUHPerdata menjadi tugas BHP. Perkara ini sudah berjalan 10,6 tahun."));
body.push(P("Bila pemisahan ini dituangkan dalam RUU, BHP diakui memiliki dua kedudukan yang sama-sama sah: sebagai pelaksana tugas keperdataan menurut KUHPerdata dan sebagai kurator negara menurut undang-undang kepailitan. Tanggung jawabnya pun menjadi jelas: tugas kurator dipertanggungjawabkan kepada Hakim Pengawas, tugas keperdataan dipertanggungjawabkan menurut KUHPerdata melalui pembinaan Kementerian. Ini melindungi kreditor, pihak yang diwakili BHP, dan pejabat BHP sendiri."));
body.push(P("Yang perlu diatur dalam RUU: pengakuan BHP sebagai kurator negara melalui pejabat Kurator Keperdataan yang dapat menangani seluruh jenis perkara kepailitan tanpa izin atau pendaftaran khusus, serta pemisahan yang tegas bentuk pertanggungjawaban BHP sebagai kurator dan BHP sebagai pelaksana tugas keperdataan."));

body.push(H("Pertanyaan 3: kewajiban memakai kurator BHP pada perkara tertentu"));
body.push(CUE("Slide 1, kotak 3."));
body.push(P([B("Jawaban kami: setuju. "), T("Kedua contoh dalam pertanyaan, yaitu debitor tanpa ahli waris dan harta tidak terurus, memang sudah menjadi tugas BHP menurut Pasal 1126 dan 1127 KUHPerdata, sehingga wajar bila kepailitannya juga ditangani BHP. Di luar kriteria itu, pemohon tetap bebas memilih kurator.")]));
body.push(P("Kriteria yang kami usulkan bertumpu pada tugas yang sudah dijalankan BHP selama ini: debitor meninggal tanpa ahli waris atau hartanya tidak terurus; debitor tidak diketahui keberadaannya; ahli waris atau pihak yang berkepentingan masih anak atau dalam pengampuan; permohonan diajukan buruh, karena upah buruh didahulukan; dan perkara yang kehilangan kurator, karena perkara tidak boleh terhenti. Pada perkara seperti ini, kurator perseorangan tetap dapat diangkat sebagai kurator tambahan."));
body.push(P("Mengapa perlu diatur? Satu-satunya jalan masuk BHP sebagai kurator yang diatur tegas undang-undang adalah Pasal 15 ayat (2): apabila pemohon tidak mengusulkan kurator. Kewajiban BHP menurut KUHPerdata belum dihubungkan dengan aturan penunjukan kurator. Data SIPP tadi membuktikannya: hanya 2 dari 16 putusan pailit yang menunjuk BHP."));
body.push(P("Kami menyadari kriteria rinci dan tata cara penunjukannya lebih tepat diatur dalam RUU Kepailitan dan PKPU. Namun rumusan dasarnya perlu ada di RUU Profesi Kurator ini, agar sinkron dan harmonis sejak awal."));

body.push(H("Pembagian peran dan koordinasi"));
body.push(CUE("Slide 2 tampil."));
body.push(P("Jawaban atas ketiga pertanyaan itu kami rangkum pada slide 2 menurut tiga tujuan RUU."));
body.push(NUM("1.", [B("Penegasan peran BHP. "), T("BHP adalah kurator negara dan pengurus negara; kewenangannya dari undang-undang, tanpa izin atau pendaftaran. Pengadilan wajib mengangkat BHP pada perkara dengan kriteria tertentu tadi; di luar itu pemohon bebas memilih.")]));
body.push(NUM("2.", [B("Peningkatan kualitas profesi. "), T("Satu standar profesi bagi BHP dan kurator perseorangan, dengan kode etik yang mengikuti jalur masing-masing. Tugas kurator BHP dijalankan pejabat fungsional Kurator Keperdataan dengan kompetensi yang sama. Data kurator aktif dan beban perkaranya dikelola Kementerian dan dapat diperiksa pengadilan.")]));
body.push(NUM("3.", [B("Pengawasan dan pertanggungjawaban. "), T("Hakim Pengawas mengawasi setiap kurator, baik BHP maupun perseorangan. Dalam tugas bersama, pembagian tugas, tanggung jawab, dan imbalan ditetapkan sejak rapat kreditor pertama. Serah terima wajib saat kurator berganti dan saat PKPU berakhir pailit.")]));
body.push(P("Tentang koordinasi, dua pengalaman kami. Pertama, dengan pengadilan. Pada perkara CV Riau Sukses Abadi dan Sukrianto, pengadilan mengangkat BHP Medan sebagai kurator pada 27 November 2025. Karena debitor mengajukan kasasi, salinan putusan tidak pernah dikirimkan kepada BHP. Padahal menurut Pasal 16 ayat (1), kasasi tidak menghentikan tugas kurator, dan Pasal 9 mewajibkan salinan putusan disampaikan paling lambat tiga hari. Tanpa salinan putusan, BHP tidak dapat mulai bekerja."));
body.push(P("Kedua, dengan kantor pertanahan. Pada perkara Badaruddin HSB, kurator memenangkan gugatan pembatalan hibah pada 2021, tetapi sertifikat masih atas nama penerima hibah karena kantor pertanahan meminta sertifikat asli yang dipegang pihak lain."));
body.push(P("Karena itu, RUU perlu menegaskan pembagian peran antara Kementerian, Hakim Pengawas, dan organisasi profesi; kewajiban pengadilan dan instansi menindaklanjuti kebutuhan kurator dalam waktu tertentu; serta forum koordinasi berkala."));

body.push(H("Penutup"));
body.push(P([T("Pelajaran utama dari pengalaman BHP Medan: "), B("hambatan terbesar BHP bukan persaingan dengan kurator perseorangan, melainkan aturan yang belum mengatur cara BHP dan kurator perseorangan bekerja sama, cara BHP menjalankan dua tugas dalam satu perkara, dan dukungan yang dibutuhkan kurator dari lembaga lain."), T(" Contoh rumusan pasalnya kami lampirkan pada Lampiran II: empat usulan pasal tentang tugas bersama dan serah terima, kedudukan BHP, penugasan BHP pada perkara tertentu, serta koordinasi dan dukungan instansi.")]));
body.push(P("Demikian masukan BHP Medan. Terima kasih."));

body.push(new Paragraph({ spacing: { before: 400 }, indent: { left: 5000 }, children: [T("Medan, 3 Oktober 2026")] }));
body.push(new Paragraph({ indent: { left: 5000 }, children: [T("Kepala Balai Harta Peninggalan Medan,")] }));
body.push(new Paragraph({ spacing: { before: 700 }, indent: { left: 5000 }, children: [B("Syafriadi Lubis, M.H.", { underline: {} })] }));

const doc = new Document({
  creator: "Balai Harta Peninggalan Medan", title: "Naskah Narasi BHP Medan, Klaster 1 Tumpang Tindih Kewenangan",
  styles: { default: { document: { run: { font: FONT, size: 22 } } } },
  sections: [{ properties: { page: { margin: { top: 1134, bottom: 1134, left: 1247, right: 1134 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BHP Medan · Klaster 1 Tumpang Tindih Kewenangan · Narasi · hal. ", font: FONT, size: 16, color: MUTED }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: MUTED })] })] }) },
    children: body }],
});
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(path.join(__dirname, "BHP Medan - Klaster 1 Tumpang Tindih Kewenangan - Narasi.docx"), b); console.log("narasi selesai"); });
