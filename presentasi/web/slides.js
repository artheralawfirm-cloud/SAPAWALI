function head(num, eyebrow, title, lead){
  return `<div class="s-head">${num?`<div class="badge${String(num).length>2&&!String(num).startsWith("<svg")?" sm":""}">${num}</div>`:""}<div class="s-ht">${eyebrow?`<div class="eyebrow">${eyebrow}</div>`:""}<h2 class="s-title">${title}</h2>${lead?`<p class="s-lead">${lead}</p>`:""}</div></div>`;
}
const BI = name => `<svg viewBox="0 0 24 24">${I(name)}</svg>`;
const ARW = `<svg class="arrow" viewBox="0 0 24 24">${I("arrowpath")}</svg>`;
const chips = (arr, cls="") => `<div class="chips ${cls}">${arr.map(c=>`<span class="chip">${c}</span>`).join("")}</div>`;
const tile = (o) => `<div class="tile ${o.cls||""}" style="${o.style||""}"${o.go?` data-goto="${o.go}"`:""}>${o.icon?`<svg class="ico" viewBox="0 0 24 24">${I(o.icon)}</svg>`:""}${o.ay?`<span class="ay">${o.ay}</span>`:""}${o.k?`<span class="k">${o.k}</span>`:""}${o.num!=null?`<span class="num" data-count="${o.num}">${String(o.num).replace(".",",")}</span>${o.unit?`<span class="unit">${o.unit}</span>`:""}`:""}${o.h?`<h3>${o.h}</h3>`:""}${o.t?`<p class="txt">${o.t}</p>`:""}${o.extra||""}</div>`;
// Jembatan di kaki slide: menjelaskan arti temuan atau menunjuk pasal yang menjawabnya. Tombol dapat diklik.
const bridge = (k, t, links=[]) => `<div class="bridge"><span class="bk">${k}</span><span class="bt">${t}</span>${links.map(([lbl,go])=>`<button class="bgo" data-goto="${go}">${lbl}${ARW}</button>`).join("")}</div>`;
// bagian dokumen: I Pokok Sikap, II Pengalaman, III Jawaban Klaster 1, IV Usulan Pasal, V Catatan
const BAG = ["","Pokok Sikap","Pengalaman BHP Medan","Jawaban Klaster 1","Usulan Pasal","Catatan untuk RUU Kepailitan dan PKPU"];
const RN = ["","I","II","III","IV","V"];
const E = (n, sub) => `Bagian ${RN[n]} · ${BAG[n]}${sub?" · "+sub:""}`;
const rail = n => `<div class="rail">${[1,2,3,4,5].map(k=>`<span class="${k<n?"done":k===n?"on":""}"></span>`).join("")}</div>`;
// Slide pembatas: judul bagian, pesan utamanya, lalu daftar isi bagian (dapat diklik).
const divider = (n, title, tor, items, msg) => `<div class="s-in">${rail(n)}
   <div class="pk">Bagian ${RN[n]} dari V</div><h2>${title}</h2><p class="tor">${tor}</p>
   ${msg?`<div class="dmsg"><span class="k">Pesan utama</span><p>${msg}</p></div>`:""}
   <div class="dms">${items.map(([b,t,g])=>`<button class="dm" data-goto="${g}"><span class="badge">${b}</span><span>${t}</span></button>`).join("")}</div></div>${foot([])}`;

const SLIDES = [
 { id:"sampul", title:"Sampul", doc:[0,1,2,3], step:false, cls:"cover",
   cue:"Salam pembuka.",
   html:()=>`<div class="s-in"><div class="logos">${logoHTML()}</div>
   <div class="org">Kementerian Hukum Republik Indonesia<br>Kantor Wilayah Sumatera Utara</div>
   <h1>Bahan Masukan Balai Harta Peninggalan Medan</h1>
   <p class="sub">Poin 1: Kewenangan dan Pembagian Peran Kurator</p>
   <p class="desc">Rapat Dengar Pendapat Komisi XIII DPR RI tentang Rancangan Undang-Undang tentang Profesi Kurator</p>
   <div class="who"><b>Syafriadi Lubis, M.H.</b><br>Kepala Balai Harta Peninggalan Medan · Medan, 2 Oktober 2026</div></div>
   <div class="stack" aria-hidden="true">${[0,1,2].map(()=>`<div class="sh"><div class="ln c"></div><div class="ln c" style="width:50%"></div><div class="ln"></div><div class="ln"></div><div class="ln s"></div><div class="bx"><span class="t">USULAN PASAL</span><div class="ln c" style="width:30%"></div><div class="ln"></div><div class="ln"></div><div class="ln s"></div></div><div class="ln"></div><div class="ln s"></div></div>`).join("")}</div>` },

 { id:"alur", title:"Alur paparan", doc:[3], step:false,
   cue:"Satu pesan: BHP dimuat dalam RUU sebagai lembaga negara yang menjalankan tugas kurator. Lima bagian paparan membangun pesan itu. Klik bagian mana pun untuk lompat langsung.",
   html:()=>{const P=[[1,"Pokok Sikap","Masalahnya apa, dan apa sikap BHP Medan",["1 masalah","4 sikap"]],[2,"Pengalaman BHP Medan","Bukti dari perkara yang sedang berjalan",["9 perkara","4 temuan"]],[3,"Jawaban Klaster 1","Tanggapan atas tiga pertanyaan Komisi",["3 pertanyaan"]],[4,"Usulan Pasal","Rumusan yang siap dipakai dalam RUU Profesi Kurator",["Pasal A sampai D"]],[5,"Catatan","Hal yang lebih tepat diatur dalam RUU Kepailitan dan PKPU",["4 hal"]]];
   return `<div class="s-in">${head(BI("docpath"),"Poin 1 · Kewenangan dan Pembagian Peran Kurator","Alur Paparan","Satu pesan: BHP dimuat dalam RUU sebagai lembaga negara yang menjalankan tugas kurator. Lima bagian berikut membangun pesan itu, dari masalah sampai rumusan pasal.")}
   <div class="content"><div class="pgrid grow">${P.map(([n,t,d,ms])=>`<button class="pcell" data-goto="p${n}"><span class="badge">${RN[n]}</span><b>${t}</b><span class="pd">${d}</span><span class="pm">${ms.map(m=>`<i>${m}</i>`).join("")}</span></button>`).join("")}</div>
   <div class="thread"><span>Masalah</span>${ARW}<span>Sikap</span>${ARW}<span>Bukti</span>${ARW}<span>Jawaban</span>${ARW}<span class="hi">Pasal</span>${ARW}<span>Catatan</span></div></div>${foot([3])}`} },

 // ================= I. POKOK SIKAP =================
 { id:"bag1", title:"Bagian I: Pokok Sikap", pk:1, doc:[], step:false, cls:"divider",
   cue:"Mulai dari masalahnya, lalu empat sikap BHP Medan. Setiap sikap nanti punya pasalnya sendiri di Bagian IV.",
   html:()=>divider(1,"Pokok Sikap","RUU Profesi Kurator akan mengatur profesi kurator, padahal kurator tidak hanya orang perseorangan. BHP juga menjalankan tugas kurator berdasarkan undang-undang.",
     [["1","Masalah","#masalah"],["2","Empat sikap BHP Medan","#sikap"],["3","Lembaga negara, standar sama","#sikap12"],["4","Pembagian peran","#peran"],["5","Koordinasi antarlembaga","#koordinasi"]],
     "BHP dimuat dalam RUU sebagai lembaga negara yang menjalankan tugas kurator.") },

 { id:"masalah", title:"Masalah", doc:[5,6], step:true,
   hl:["kurator tidak hanya orang perseorangan","BHP juga menjalankan tugas kurator berdasarkan undang-undang","kedudukan BHP menjadi tidak jelas"],
   cue:"Kurator ada dua: perseorangan dan BHP. Bila RUU hanya untuk perseorangan, tiga hal tentang BHP menjadi tidak jelas. Tiga hal inilah yang dijawab empat sikap berikutnya.",
   html:()=>`<div class="s-in">${head("I",E(1,"Masalah"),"Kurator Tidak Hanya Orang Perseorangan","Apabila RUU hanya disusun untuk kurator perorangan, kedudukan BHP menjadi tidak jelas dalam tiga hal.")}
   <div class="content"><div class="eq"><span class="q n"><small>Kurator</small>Pelaksana tugas kurator</span><span class="op">=</span><span class="q"><small>Orang</small>Kurator perorangan</span><span class="op">+</span><span class="q g"><small>Lembaga</small>BHP, berdasarkan undang-undang</span></div>
   <div class="row grow">
     ${tile({icon:"docpath",k:"Tidak jelas 1",h:"Apakah BHP ikut aturan izin dan sertifikasi profesi?"})}
     ${tile({icon:"scalepath",k:"Tidak jelas 2",h:"Siapa yang membina dan mengawasinya?"})}
     ${tile({icon:"userspath",k:"Tidak jelas 3",h:"Bagaimana pembagian perannya dengan kurator privat?"})}
   </div>
   ${bridge("Jawabannya","Empat sikap BHP Medan, masing-masing dirumuskan menjadi satu pasal.",[["Empat sikap","#sikap"]])}</div>${foot([6])}` },

 { id:"sikap", title:"Sikap BHP Medan", doc:[8,9,10,11], step:true,
   hl:["BHP dimuat dalam RUU sebagai lembaga negara yang menjalankan tugas kurator. ","Satu standar profesi untuk semua kurator. ","Pembagian peran BHP dan kurator perorangan ditegaskan. ","Koordinasi antarlembaga diatur dengan jelas. "],
   cue:"Empat sikap. Setiap kartu menunjuk pasal yang merumuskannya. Klik kartu untuk lompat ke uraian atau pasalnya.",
   html:()=>`<div class="s-in">${head("I",E(1,"Sikap BHP Medan"),"Empat Sikap BHP Medan","Keempatnya dijabarkan lebih lanjut dalam usulan Pasal A sampai Pasal D.")}
   <div class="content"><div class="g2 grow compact">
     ${tile({cls:"go",go:"#sikap12",icon:"govpath",k:"Sikap 1",h:"BHP dimuat dalam RUU sebagai lembaga negara",t:"Tugasnya dijalankan oleh pejabat fungsional Kurator Keperdataan.",extra:`<span class="to">Pasal A · Kedudukan BHP</span>`})}
     ${tile({cls:"go",go:"#sikap12",icon:"scalepath",k:"Sikap 2",h:"Satu standar profesi untuk semua kurator",t:"Yang berbeda hanya pembinaannya, karena BHP adalah lembaga pemerintah.",extra:`<span class="to">Pasal C · Standar dan Pembinaan BHP</span>`})}
     ${tile({cls:"go",go:"#peran",icon:"userspath",k:"Sikap 3",h:"Pembagian peran BHP dan kurator perorangan ditegaskan",t:"RUU Profesi Kurator memuat prinsipnya.",extra:`<span class="to">Pasal B · Pembagian Peran</span>`})}
     ${tile({cls:"go",go:"#koordinasi",icon:"handpath",k:"Sikap 4",h:"Koordinasi antarlembaga diatur dengan jelas",t:"BHP sendiri adalah kurator, bukan pengawas kurator privat.",extra:`<span class="to">Pasal D · Koordinasi dan Penugasan Bersama</span>`})}
   </div></div>${foot([8])}` },

 { id:"sikap12", title:"Lembaga negara dengan standar yang sama", doc:[8,9], step:true,
   hl:["Kewenangan BHP berasal dari undang-undang, sehingga BHP tidak memerlukan izin atau pendaftaran seperti kurator perorangan","Tugasnya dijalankan oleh pejabat fungsional Kurator Keperdataan.","Kode etik dan standar profesi yang sama berlaku bagi BHP dan kurator perorangan","Yang berbeda hanya pembinaannya, karena BHP adalah lembaga pemerintah."],
   cue:"Sikap 1 dan 2 menjawab dua hal yang tidak jelas: BHP tidak perlu izin karena kewenangannya dari undang-undang, tetapi standarnya tetap sama. Bukan keistimewaan.",
   html:()=>`<div class="s-in">${head("I",E(1,"Sikap 1 dan 2"),"Lembaga Negara, dengan Standar yang Sama","Kewenangan BHP berasal dari undang-undang, tetapi status lembaga negara tidak menjadi keistimewaan.")}
   <div class="content"><div class="row grow">
     ${tile({cls:"navy",icon:"govpath",k:"Sikap 1 · Kedudukan",h:"BHP tidak memerlukan izin atau pendaftaran seperti kurator perorangan",t:"Kewenangan BHP berasal dari undang-undang. Tugasnya dijalankan oleh pejabat fungsional Kurator Keperdataan."})}
     ${tile({icon:"scalepath",k:"Sikap 2 · Standar",h:"Kode etik dan standar profesi yang sama berlaku bagi BHP dan kurator perorangan",t:"Yang berbeda hanya pembinaannya, karena BHP adalah lembaga pemerintah."})}
   </div>
   ${bridge("Dirumuskan dalam","Pasal A untuk kedudukan BHP, Pasal C untuk standar dan pembinaannya.",[["Pasal A","#pasalA"],["Pasal C","#pasalC"]])}</div>${foot([8])}` },

 { id:"peran", title:"Pembagian peran", doc:[10], step:true,
   hl:["BHP menangani perkara yang menyangkut kepentingan publik atau tidak diminati, seperti perkara pekerja dan perkara dengan harta kecil","Kurator perorangan menangani perkara bisnis atas pilihan para pihak","RUU Profesi Kurator memuat prinsipnya, sedangkan rinciannya diatur dalam RUU Kepailitan dan PKPU"],
   cue:"Sikap 3. BHP mengisi perkara publik dan yang tidak diminati. Perkara bisnis tetap pilihan para pihak. Bagian II membuktikan pembagian ini dengan data.",
   html:()=>`<div class="s-in">${head("I",E(1,"Sikap 3"),"Pembagian Peran yang Tegas","BHP dan kurator perorangan tidak berebut perkara. Masing-masing punya wilayahnya sendiri.")}
   <div class="content"><div class="row grow">
     ${tile({cls:"navy",icon:"govpath",k:"BHP menangani",h:"Perkara yang menyangkut kepentingan publik atau tidak diminati",t:"seperti perkara pekerja dan perkara dengan harta kecil"})}
     <span class="vs">dan</span>
     ${tile({icon:"userspath",k:"Kurator perorangan menangani",h:"Perkara bisnis atas pilihan para pihak"})}
   </div>
   <div class="legend"><span class="k">Pengaturan</span><span><b>RUU Profesi Kurator</b> memuat prinsipnya</span><span><b>RUU Kepailitan dan PKPU</b> mengatur rinciannya</span></div>
   ${bridge("Dirumuskan dalam","Pasal B. Buktinya ada pada perkara yang sedang ditangani BHP Medan di Bagian II.",[["Pasal B","#pasalB"],["Bukti","#angka"]])}</div>${foot([10])}` },

 { id:"koordinasi", title:"Koordinasi antarlembaga", doc:[11], step:true,
   hl:["Kementerian membina","Hakim Pengawas mengawasi perkara","organisasi profesi menegakkan etik kurator perorangan","BHP menjadi simpul data di wilayahnya","BHP tidak ditempatkan sebagai pengawas kurator privat, karena BHP sendiri adalah kurator."],
   cue:"Sikap 4. Empat lembaga, empat peran. Tekankan: BHP bukan pengawas kurator privat.",
   html:()=>`<div class="s-in">${head("I",E(1,"Sikap 4"),"Koordinasi Antarlembaga","Setiap lembaga punya peran yang jelas, sehingga tidak ada tumpang tindih.")}
   <div class="content"><div class="row grow">
     ${tile({icon:"govpath",k:"Kementerian",h:"Membina"})}
     ${tile({icon:"gavelpath",k:"Hakim Pengawas",h:"Mengawasi perkara"})}
     ${tile({icon:"userspath",k:"Organisasi profesi",h:"Menegakkan etik kurator perorangan"})}
     ${tile({cls:"navy",icon:"folderpath",k:"BHP",h:"Simpul data di wilayahnya"})}
   </div>
   <p class="punch">BHP tidak ditempatkan sebagai pengawas kurator privat, karena BHP sendiri adalah kurator.</p>
   ${bridge("Dirumuskan dalam","Pasal D, termasuk data kurator dan perkara yang terintegrasi.",[["Pasal D","#pasalD"]])}</div>${foot([11])}` },

 // ================= II. PENGALAMAN BHP MEDAN =================
 { id:"bag2", title:"Bagian II: Pengalaman BHP Medan", pk:2, doc:[], step:false, cls:"divider",
   cue:"Bagian ini membuktikan Sikap 3 dengan data nyata: perkara yang jatuh ke BHP adalah perkara yang tidak diminati. Empat temuan.",
   html:()=>divider(2,"Pengalaman BHP Medan","BHP Medan saat ini menangani 9 perkara kepailitan yang masih berjalan dengan total tagihan sekitar Rp47,35 miliar. Seluruhnya jatuh ke BHP karena pemohon tidak mengusulkan kurator.",
     [["1","Hartanya kecil","#harta"],["2","Perkaranya panjang","#lama"],["3","Hak pekerja dan uang negara","#pekerja"],["4","Debitor menghilang","#pekerja"],["5","Data nasional","#nasional"]],
     "Perkara yang jatuh ke BHP adalah perkara yang tidak diambil pihak lain. Pembagian peran itu nyata.") },

 { id:"angka", title:"Perkara BHP Medan", doc:[13], step:true,
   hl:["9 perkara kepailitan yang masih berjalan","Rp47,35 miliar","Seluruhnya jatuh ke BHP karena pemohon tidak mengusulkan kurator."],
   cue:"Sembilan perkara, seluruhnya datang karena pemohon tidak mengusulkan kurator. Inilah wajah pembagian peran di lapangan.",
   html:()=>`<div class="s-in">${head("II",E(2),"Sembilan Perkara, Semuanya Tanpa Kurator Usulan Pemohon","Perkara yang sedang berjalan di BHP Medan hari ini.")}
   <div class="content"><div class="row grow">
     ${tile({cls:"navy",num:9,unit:"perkara kepailitan",t:"yang masih berjalan"})}
     ${tile({num:47.35,unit:"Rp miliar",t:"total tagihan, sekitar"})}
     ${tile({icon:"folderpath",k:"Asal perkara",h:"Seluruhnya jatuh ke BHP",t:"karena pemohon tidak mengusulkan kurator"})}
   </div>
   <div class="legend"><span class="k">Selain itu</span><span>BHP Medan telah menyelesaikan perkara lain, antara lain <b>PT Jasa Prima Mandiri</b> yang ditangani bersama kurator perorangan.</span></div>
   ${bridge("Artinya","BHP mengisi perkara yang tidak diambil pihak lain. Empat temuan berikut menunjukkan mengapa.",[["Temuan 1","#harta"]])}</div>${foot([13])}` },

 { id:"harta", title:"Hartanya kecil", doc:[14,15,16], step:true,
   hl:["Pada empat perkara yang sudah dinilai, harta pailit hanya 12% sampai 40% dari tagihan."],
   cue:"Temuan 1. Empat perkara yang sudah dinilai: harta hanya 12 sampai 40 persen dari tagihan. Tidak menarik bagi kurator berbayar. Pasal B ayat (1) menyebut perkara dengan nilai harta kecil.",
   html:()=>{const R=[["Badaruddin HSB","2,30","0,93",40],["Gwe Tjoen","25,66","8,00",31],["CV Hitado","1,94","0,53",27],["PT Rata Makmur","1,43","0,17",12]];
   return `<div class="s-in">${head(1,E(2,"Temuan 1"),"Hartanya Kecil","Pada empat perkara yang sudah dinilai, harta pailit hanya 12% sampai 40% dari tagihan.")}
   <div class="content"><div class="hb grow">${R.map(([n,tg,h,p],i)=>`<div class="r"><span class="nm">${n}<small>Tagihan Rp${tg} miliar</small><small>Harta Rp${h} miliar</small></span><span class="tr"><span class="fi" style="--w:${p}%;--dl:${(i*.15).toFixed(2)}s"></span></span><span class="pc"><span data-count="${p}">${p}</span>%</span></div>`).join("")}</div>
   <div class="hkey"><span><i></i>Tagihan (100%)</span><span><i class="n"></i>Nilai harta tercatat</span></div>
   ${bridge("Artinya","Perkara seperti ini tidak menarik bagi kurator yang bekerja atas dasar imbalan.",[["Pasal B ayat (1)","#pasalB"]])}</div>${foot([14])}`} },

 { id:"lama", title:"Perkaranya panjang", doc:[17,18,19], step:true,
   hl:["Enam dari sembilan perkara berjalan lebih dari lima tahun, yang terlama sejak 2016","Kurator perorangan bisa berhenti atau meninggal dunia, sedangkan BHP tetap berjalan sebagai lembaga."],
   cue:"Temuan 2. Enam dari sembilan perkara berjalan lebih dari lima tahun. Kurator perorangan bisa berhenti atau meninggal dunia; BHP tetap ada sebagai lembaga.",
   html:()=>{const R=[["Gwe Tjoen",10.6],["CV Hitado",9.4],["PT Pro Mekanika",8.3],["Badaruddin HSB",7.8],["Suparjo Rustam",6.9],["Hermanto",6.6],["PT Rata Makmur",4.1],["KSO Maju Abadi",3.0],["Frans Winner",0.8]];
   return `<div class="s-in">${head(2,E(2,"Temuan 2"),"Perkaranya Panjang","Enam dari sembilan perkara berjalan lebih dari lima tahun, yang terlama sejak 2016.")}
   <div class="content"><div class="row grow">
     <div class="dur" style="flex:1.75"><span class="five"><span>5 tahun</span></span>${R.map(([n,v],i)=>{const w=(v/14*100).toFixed(1)+"%";return `<div class="r"><span class="nm">${n}</span><span class="tr" style="--w:${w}"><span class="fi${v<5?" lo":""}" style="--dl:${(i*.07).toFixed(2)}s"></span><span class="v" style="--dl:${(i*.07).toFixed(2)}s">${String(v.toFixed(1)).replace(".",",")} tahun</span></span></div>`;}).join("")}</div>
     ${tile({cls:"navy",num:6,unit:"dari 9 perkara",t:"berjalan lebih dari lima tahun"})}
   </div>
   ${bridge("Artinya","Kurator perorangan bisa berhenti atau meninggal dunia, sedangkan BHP tetap berjalan sebagai lembaga.",[["Pasal A ayat (2)","#pasalA"]])}</div>${foot([17])}`} },

 { id:"pekerja", title:"Hak pekerja dan debitor menghilang", doc:[20,21], step:true,
   hl:["permohonan diajukan pekerja dan pengadilan menunjuk BHP Medan sebagai pengurus lalu kurator","Tagihan para pekerja pemohon sudah lunas, sisanya tagihan pajak.","debitor tidak ditemukan sekitar lima tahun sehingga penyelesaian perkara tertahan"],
   cue:"Temuan 3 dan 4. Perkara pekerja di PT Rata Makmur dan debitor yang menghilang di CV Hitado. Keduanya masuk daftar perkara BHP pada Pasal B; kelanjutan perkara debitor hilang menjadi catatan untuk RUU Kepailitan.",
   html:()=>`<div class="s-in">${head("II",E(2,"Temuan 3 dan 4"),"Hak Pekerja dan Debitor yang Menghilang","Perkara yang menyangkut kepentingan publik ditangani BHP sampai tuntas.")}
   <div class="content"><div class="row grow">
     ${tile({cls:"navy",icon:"userspath",k:"Temuan 3 · PT Rata Makmur",h:"Menyangkut hak pekerja dan uang negara",t:"Permohonan diajukan pekerja dan pengadilan menunjuk BHP Medan sebagai pengurus lalu kurator. Tagihan para pekerja pemohon sudah lunas, sisanya tagihan pajak."})}
     ${tile({icon:"searchpath",k:"Temuan 4 · CV Hitado",h:"Debitor menghilang",t:"Debitor tidak ditemukan sekitar lima tahun sehingga penyelesaian perkara tertahan."})}
   </div>
   ${bridge("Artinya","Hak pekerja dan debitor yang tidak diketahui keberadaannya masuk daftar perkara BHP. Kelanjutan perkara bila debitor menghilang perlu diatur RUU Kepailitan dan PKPU.",[["Pasal B","#pasalB"],["Catatan","#catatan"]])}</div>${foot([20])}` },

 { id:"nasional", title:"Data nasional", doc:[22], step:true,
   hl:["perkara niaga naik 19,18%, dari 782 menjadi 932 perkara","Data perbandingan perkara BHP dan kurator privat belum tersedia, karena pengadilan tidak mencatat siapa kurator yang diangkat."],
   cue:"Perkara niaga naik, tetapi tidak ada data siapa kurator yang diangkat. Kekosongan data ini dijawab Pasal D ayat (4).",
   html:()=>`<div class="s-in">${head(BI("searchpath"),E(2,"Secara nasional"),"Perkara Naik, Datanya Belum Ada","Laporan Tahunan Mahkamah Agung 2025 mencatat perkara niaga naik 19,18%.")}
   <div class="content"><div class="row grow" style="align-items:center">
     ${tile({k:"Dari",num:782,unit:"perkara niaga"})}
     <span class="vs">${ARW}</span>
     ${tile({cls:"navy",k:"Menjadi",num:932,unit:"perkara niaga"})}
     ${tile({k:"Naik",num:19.18,unit:"persen"})}
   </div>
   <p class="punch">Data perbandingan perkara BHP dan kurator privat belum tersedia, karena pengadilan tidak mencatat siapa kurator yang diangkat.</p>
   ${bridge("Dijawab oleh","Pasal D ayat (4): data Kurator dan perkara yang terintegrasi, BHP menjadi simpul data di wilayah kerjanya.",[["Pasal D ayat (4)","#pasalD"]])}</div>${foot([22])}` },

 // ================= III. JAWABAN KLASTER 1 =================
 { id:"bag3", title:"Bagian III: Jawaban Klaster 1", pk:3, doc:[], step:false, cls:"divider",
   cue:"Tiga pertanyaan Klaster 1 dan jawaban singkatnya. Rinciannya di slide berikut.",
   html:()=>`<div class="s-in">${rail(3)}
   <div class="pk">Bagian III dari V</div><h2>Jawaban Klaster 1</h2><p class="tor">Tiga pertanyaan Komisi, tiga jawaban singkat BHP Medan.</p>
   <div class="qa">${[["1","Bagaimana mekanisme BHP sebagai kurator, dan adakah kendala dengan kurator privat?","Mekanismenya jelas dan kerja sama berjalan baik. Kendalanya pada aturan imbalan jasa yang berbeda.","#mekanisme"],["2","Perlukah pemisahan tegas peran BHP dengan peran kurator privat?","Tidak perlu dipisahkan. Yang diperlukan adalah pembagian peran yang jelas.","#pemisahan"],["3","Bagaimana pandangan BHP tentang kewajiban memakai BHP pada kasus tertentu?","Setuju, untuk lima jenis perkara. Di luar itu para pihak tetap bebas memilih kurator.","#kewajiban"]].map(([n,q,a,g])=>`<button class="qr" data-goto="${g}"><span class="badge">${n}</span><span class="q">${q}</span><span class="a">${a}</span></button>`).join("")}</div></div>${foot([])}` },

 { id:"mekanisme", title:"Mekanisme BHP sebagai kurator", doc:[24,25], step:true,
   hl:["Kepala BHP menugaskan tim Kurator Keperdataan","di bawah pengawasan Hakim Pengawas","Imbalan jasa BHP disetor ke kas negara."],
   cue:"Pertanyaan 1, bagian mekanisme. Alur kerja BHP dari penunjukan sampai laporan. Imbalannya masuk kas negara.",
   html:()=>`<div class="s-in">${head(1,E(3,"Pertanyaan 1 · Mekanisme"),"Bagaimana BHP Bekerja sebagai Kurator","Setelah ditunjuk pengadilan, tim Kurator Keperdataan bekerja di bawah pengawasan Hakim Pengawas.")}
   <div class="content"><div class="steps" style="flex:1">${[["gavelpath","Ditunjuk pengadilan"],["userspath","Kepala BHP menugaskan tim Kurator Keperdataan"],["folderpath","Tim mengurus, menilai, dan menjual harta"],["docpath","Melapor secara berkala"]].map(([ic,t],i)=>`<div class="sp"><svg class="ico sm" viewBox="0 0 24 24">${I(ic)}</svg><span>${t}</span></div>${i<3?ARW:""}`).join("")}</div>
   <div class="row grow">
     ${tile({icon:"gavelpath",k:"Pengawasan",h:"Di bawah pengawasan Hakim Pengawas"})}
     ${tile({cls:"navy",icon:"coinspath",k:"Imbalan jasa",h:"Imbalan jasa BHP disetor ke kas negara"})}
   </div>
   ${bridge("Berikutnya","Adakah kendala dengan kurator privat? Contohnya pada PT Jasa Prima Mandiri.",[["Contoh","#jpm"]])}</div>${foot([25])}` },

 { id:"jpm", title:"Bertugas bersama kurator perorangan", doc:[26], step:true,
   hl:["BHP Medan diangkat sebagai kurator dalam putusan pailit","Kerja sama berjalan baik.","Harta senilai Rp12,85 miliar berhasil dibereskan","kepailitan berakhir pada Mei 2019, sekitar empat tahun"],
   cue:"Pertanyaan 1, bagian kendala. Contoh nyata kerja sama BHP dan kurator perorangan yang berjalan baik. Kendalanya satu: imbalan jasa.",
   html:()=>`<div class="s-in">${head(1,E(3,"Pertanyaan 1 · Kendala"),"Bersama Kurator Perorangan: PT Jasa Prima Mandiri","Nomor 1/Pdt.Sus-Pailit/2015/PN Niaga Mdn. Kerja sama berjalan baik.")}
   <div class="content"><div class="steps">${[["Putusan pailit","BHP Medan diangkat sebagai kurator"],["Mei 2015","Kurator tambahan diangkat"],["Mei 2019","Kepailitan berakhir, sekitar empat tahun"]].map(([k,t],i)=>`<div class="sp" style="flex-direction:column;align-items:flex-start;gap:6px"><span class="k" style="margin:0">${k}</span><span>${t}</span></div>${i<2?ARW:""}`).join("")}</div>
   <div class="row grow">
     ${tile({cls:"navy",num:12.85,unit:"Rp miliar",t:"harta berhasil dibereskan"})}
     ${tile({icon:"handpath",k:"Hasilnya",h:"Kerja sama berjalan baik",t:"BHP Medan dan kurator perorangan menangani perkara yang sama sampai selesai."})}
   </div>
   ${bridge("Kendalanya","Satu hal: imbalan jasa dihitung dengan aturan yang berbeda.",[["Lihat kendalanya","#imbalan"]])}</div>${foot([26])}` },

 { id:"imbalan", title:"Kendala imbalan jasa", doc:[27], step:true,
   hl:["imbalan BHP dihitung sebagai PNBP sebesar 8% dari nilai bersih hasil penjualan, yaitu Rp379,8 juta","imbalan kurator tambahan dihitung dari nilai kotor dan ditetapkan 5%, yaitu Rp642,7 juta","karena tidak ada aturan pembagian imbalan berdasarkan porsi tugas"],
   cue:"Kurator yang diangkat lebih dahulu justru menerima lebih kecil, karena aturannya berbeda. Ini dijawab Pasal D ayat (1) dan (2).",
   html:()=>`<div class="s-in">${head(1,E(3,"Pertanyaan 1 · Kendala"),"Kendalanya: Imbalan Jasa","Kurator tambahan memperoleh imbalan lebih besar daripada BHP sebagai kurator yang diangkat lebih dahulu.")}
   <div class="content"><div class="hb money grow">
     <div class="r"><span class="nm">BHP Medan<small>PNBP · 8% dari nilai bersih</small></span><span class="tr"><span class="fi" style="--w:59.1%"></span></span><span class="pc">Rp379,8 jt</span></div>
     <div class="r"><span class="nm">Kurator tambahan<small>5% dari nilai kotor</small></span><span class="tr"><span class="fi g" style="--w:100%;--dl:.2s"></span></span><span class="pc">Rp642,7 jt</span></div>
   </div>
   <p class="punch">Tidak ada aturan pembagian imbalan berdasarkan porsi tugas, dan belum ada pembagian tugas serta tanggung jawab di antara keduanya.</p>
   ${bridge("Dijawab oleh","Pasal D ayat (1) dan (2): imbalan dibagi sesuai porsi tugas, bagian BHP merupakan PNBP.",[["Pasal D","#pasalD"]])}</div>${foot([27])}` },

 { id:"pemisahan", title:"Perlukah pemisahan peran", doc:[28,29,30,31,32,33], step:true,
   hl:["Tidak perlu memisahkan BHP dari tugas kurator. Yang diperlukan adalah pembagian peran yang jelas","wali pengawas adalah tugas BHP dalam perwalian anak (Pasal 366 KUHPerdata), bukan pengawas kurator"],
   cue:"Pertanyaan 2. Jawaban: tidak perlu dipisahkan, cukup pembagian peran yang jelas, karena tiga alasan. Luruskan istilah wali pengawas.",
   html:()=>`<div class="s-in">${head(2,E(3,"Pertanyaan 2"),"Tidak Perlu Dipisahkan, Cukup Dibagi dengan Jelas","Perlukah pemisahan tegas peran BHP sebagai balai harta atau wali pengawas dengan peran kurator privat? Tidak perlu, karena tiga alasan.")}
   <div class="content"><div class="row grow">
     ${tile({icon:"folderpath",k:"Alasan a",h:"Tanpa BHP, perkara yang tidak diminati kurator privat tidak punya pelaksana."})}
     ${tile({icon:"handpath",k:"Alasan b",h:"BHP tidak berebut perkara dengan kurator privat.",t:"Yang ditangani BHP adalah perkara yang tidak diambil pihak lain."})}
     ${tile({cls:"navy",icon:"bookpath",k:"Alasan c",h:"Pengalaman BHP membuatnya paling siap",t:"mengurus warisan, perwalian anak, dan harta orang yang menghilang."})}
   </div>
   <div class="legend"><span class="k">Perlu dicatat</span><span><b>Wali pengawas</b> adalah tugas BHP dalam perwalian anak (Pasal 366 KUHPerdata), bukan pengawas kurator.</span></div>
   ${bridge("Dirumuskan dalam","Pasal B: pembagian peran yang jelas, bukan pemisahan.",[["Pasal B","#pasalB"]])}</div>${foot([29])}` },

 { id:"kewajiban", title:"Kewajiban memakai BHP", doc:[34,35], step:true,
   hl:["BHP Medan setuju","Di luar itu, para pihak tetap bebas memilih kurator."],
   cue:"Pertanyaan 3. Setuju untuk lima jenis perkara. Di luar itu para pihak tetap bebas memilih. Dasarnya di Pasal B, kriterianya di RUU Kepailitan.",
   html:()=>`<div class="s-in">${head(3,E(3,"Pertanyaan 3"),"Kewajiban Memakai BHP: Setuju","Bagaimana pandangan BHP tentang kewajiban memakai BHP pada kasus tertentu?")}
   <div class="content"><div class="row grow">
     <div class="tile navy" style="flex:1.5"><span class="k">BHP Medan setuju, terutama untuk</span><ol class="list tight">${["debitor yang meninggal tanpa ahli waris atau hartanya tidak terurus","debitor yang tidak diketahui keberadaannya","perkara pekerja","perkara dengan harta kecil","perkara yang kehilangan kurator"].map((t,i)=>`<li><span class="n" style="background:var(--gold);color:var(--navy)">${i+1}</span><span style="color:#fff">${t}</span></li>`).join("")}</ol></div>
     ${tile({icon:"userspath",k:"Di luar itu",h:"Para pihak tetap bebas memilih kurator",t:"RUU Profesi Kurator cukup memuat dasar penugasan ini."})}
   </div>
   ${bridge("Dirumuskan dalam","Pasal B ayat (1) memuat dasarnya; kriteria dan tata cara penunjukan diatur RUU Kepailitan dan PKPU.",[["Pasal B","#pasalB"],["Catatan","#catatan"]])}</div>${foot([35])}` },

 // ================= IV. USULAN PASAL =================
 { id:"bag4", title:"Bagian IV: Usulan Pasal", pk:4, doc:[], step:false, cls:"divider",
   cue:"Empat usulan pasal untuk RUU Profesi Kurator, satu untuk tiap sikap. Dokumen membuka setiap pasalnya.",
   html:()=>divider(4,"Usulan Pasal untuk RUU Profesi Kurator","Empat pasal yang dapat langsung dipakai, satu untuk setiap sikap, masing-masing disertai analisisnya.",
     [["A","Kedudukan BHP · Sikap 1","#pasalA"],["B","Pembagian Peran · Sikap 3","#pasalB"],["C","Standar dan Pembinaan BHP · Sikap 2","#pasalC"],["D","Koordinasi dan Penugasan Bersama · Sikap 4","#pasalD"]],
     "Setiap masalah yang disebut di awal punya rumusan pasalnya.") },

 { id:"pasalA", title:"Pasal A: Kedudukan BHP", doc:[39,40,41], step:true,
   hl:["Kurator terdiri atas Balai Harta Peninggalan dan Kurator perseorangan.","tidak memerlukan izin atau pendaftaran","dilaksanakan oleh pejabat fungsional Kurator Keperdataan"],
   cue:"Pasal A menjawab Sikap 1 dan ketidakjelasan pertama: BHP masuk sistem profesi kurator tanpa harus mengikuti aturan izin untuk orang perseorangan.",
   html:()=>`<div class="s-in">${head("A",E(4,"Pasal A"),"Kedudukan BHP","Pasal ini memastikan BHP masuk dalam sistem profesi kurator tanpa harus mengikuti aturan izin yang dirancang untuk orang perseorangan.")}
   <div class="content"><div class="eq"><span class="q n"><small>Ayat (1)</small>Kurator</span><span class="op">=</span><span class="q g">Balai Harta Peninggalan</span><span class="op">+</span><span class="q">Kurator perseorangan</span></div>
   <div class="row grow">
     ${tile({icon:"govpath",ay:"Ayat (2)",h:"Lembaga negara yang menjalankan tugas Kurator dan Pengurus berdasarkan undang-undang",t:"tidak memerlukan izin atau pendaftaran"})}
     ${tile({cls:"navy",icon:"userspath",ay:"Ayat (3)",h:"Dilaksanakan oleh pejabat fungsional Kurator Keperdataan"})}
   </div>
   ${bridge("Menjawab","Sikap 1 dan pertanyaan apakah BHP ikut aturan izin dan sertifikasi profesi.",[["Masalah","#masalah"]])}</div>${foot([39])}` },

 { id:"pasalB", title:"Pasal B: Pembagian Peran", doc:[46,47,48], step:true,
   hl:["kepentingan publik, hak pekerja, harta peninggalan yang tidak terurus, Debitor yang tidak diketahui keberadaannya, dan perkara dengan nilai harta kecil","Kurator dan Pengurus diangkat berdasarkan usulan para pihak","diatur dalam undang-undang mengenai kepailitan dan penundaan kewajiban pembayaran utang"],
   cue:"Pasal B menjawab Sikap 3, temuan Bagian II, dan Pertanyaan 2 dan 3: kepastian pembagian peran tanpa mengulang hukum acara kepailitan.",
   html:()=>`<div class="s-in">${head("B",E(4,"Pasal B"),"Pembagian Peran","Pasal ini memberi kepastian pembagian peran tanpa mengulang materi hukum acara kepailitan, sehingga RUU Profesi Kurator tetap selaras dengan RUU Kepailitan dan PKPU.")}
   <div class="content"><div class="row grow">
     ${tile({cls:"navy",style:"flex:1.6",ay:"Ayat (1) · BHP menjalankan tugas pada perkara",extra:chips(["kepentingan publik","hak pekerja","harta peninggalan yang tidak terurus","Debitor yang tidak diketahui keberadaannya","nilai harta kecil"],"sm")})}
     ${tile({icon:"userspath",ay:"Ayat (2) · Di luar itu",h:"Kurator dan Pengurus diangkat berdasarkan usulan para pihak"})}
   </div>
   <div class="legend"><span class="k">Ayat (3)</span><span>Kriteria dan tata cara penunjukan diatur dalam <b>undang-undang mengenai kepailitan dan PKPU</b>.</span></div>
   ${bridge("Menjawab","Sikap 3, keempat temuan BHP Medan, serta Pertanyaan 2 dan 3 Klaster 1.",[["Temuan","#harta"],["Jawaban","#pemisahan"]])}</div>${foot([46])}` },

 { id:"pasalC", title:"Pasal C: Standar dan Pembinaan BHP", doc:[53,54], step:true,
   hl:["tunduk pada standar profesi dan kode etik Kurator yang sama dengan Kurator perseorangan","dilakukan oleh Menteri dengan melibatkan unsur lembaga pengawas profesi"],
   cue:"Pasal C menjawab Sikap 2 dan ketidakjelasan kedua: status lembaga negara bukan keistimewaan. Standarnya satu, pembinaannya oleh Menteri.",
   html:()=>`<div class="s-in">${head("C",E(4,"Pasal C"),"Standar dan Pembinaan BHP","Status lembaga negara tidak boleh menjadi keistimewaan.")}
   <div class="content"><div class="row grow">
     ${tile({cls:"navy",icon:"scalepath",ay:"Ayat (1) · Standar",h:"Standar profesi dan kode etik yang sama dengan Kurator perseorangan"})}
     ${tile({icon:"govpath",ay:"Ayat (2) · Pembinaan",h:"Oleh Menteri, dengan melibatkan unsur lembaga pengawas profesi"})}
   </div>
   <p class="punch">Standarnya satu, hanya jalur pembinaannya yang menyesuaikan.</p>
   ${bridge("Menjawab","Sikap 2 dan pertanyaan siapa yang membina dan mengawasi BHP.",[["Masalah","#masalah"]])}</div>${foot([53])}` },

 { id:"pasalD", title:"Pasal D: Koordinasi dan Penugasan Bersama", doc:[59,60,61,62], step:true,
   hl:["imbalan jasa dibagi sesuai porsi tugas","merupakan Penerimaan Negara Bukan Pajak","wajib mengungkapkan hubungan yang dapat menimbulkan benturan kepentingan","Balai Harta Peninggalan menjadi simpul data di wilayah kerjanya"],
   cue:"Pasal D menjawab Sikap 4, kendala imbalan PT Jasa Prima Mandiri, dan kekosongan data perkara nasional.",
   html:()=>`<div class="s-in">${head("D",E(4,"Pasal D"),"Koordinasi dan Penugasan Bersama","Pasal ini mencegah perbedaan imbalan tanpa melihat porsi tugas, menjaga independensi, dan menyediakan data yang saat ini belum ada.")}
   <div class="content"><div class="g2 grow compact">
     ${tile({icon:"handpath",ay:"Ayat (1)",h:"Imbalan jasa dibagi sesuai porsi tugas",t:"bila BHP dan Kurator perseorangan ditunjuk dalam perkara yang sama"})}
     ${tile({icon:"coinspath",ay:"Ayat (2)",h:"Bagian imbalan jasa BHP merupakan PNBP"})}
     ${tile({icon:"shieldpath",ay:"Ayat (3)",h:"Setiap Kurator wajib mengungkapkan benturan kepentingan"})}
     ${tile({cls:"navy",icon:"folderpath",ay:"Ayat (4)",h:"Data Kurator dan perkara terintegrasi",t:"BHP menjadi simpul data di wilayah kerjanya"})}
   </div>
   ${bridge("Menjawab","Sikap 4, kendala imbalan pada PT Jasa Prima Mandiri, dan data perkara yang belum ada.",[["Kendala imbalan","#imbalan"],["Data nasional","#nasional"]])}</div>${foot([59])}` },

 // ================= V. CATATAN =================
 { id:"catatan", title:"Bagian V: Catatan untuk RUU Kepailitan dan PKPU", pk:5, doc:[66], step:true, cls:"divider",
   hl:["kewenangan BHP menjadi pengurus PKPU","kriteria dan tata cara penunjukan BHP pada perkara tertentu","kepailitan harta peninggalan tanpa ahli waris","kelanjutan perkara apabila debitor menghilang","Kedua RUU perlu disusun selaras sejak awal."],
   cue:"Empat hal yang lebih tepat diatur dalam RUU Kepailitan dan PKPU, termasuk yang muncul dari temuan: debitor menghilang dan kriteria penunjukan. Kedua RUU disusun selaras.",
   html:()=>`<div class="s-in">${rail(5)}
   <div class="pk">Bagian V dari V</div><h2>Catatan untuk RUU Kepailitan dan PKPU</h2><p class="tor">Beberapa hal lebih tepat diatur dalam RUU Kepailitan dan PKPU, yaitu:</p>
   <div class="dms" style="margin-top:6px">${["Kewenangan BHP menjadi pengurus PKPU","Kriteria dan tata cara penunjukan BHP pada perkara tertentu","Kepailitan harta peninggalan tanpa ahli waris","Kelanjutan perkara apabila debitor menghilang"].map((t,i)=>`<span class="dm st"><span class="badge">${i+1}</span><span>${t}</span></span>`).join("")}</div>
   <p class="punch" style="margin-top:auto">Kedua RUU perlu disusun selaras sejak awal.</p></div>${foot([66])}` },

 { id:"rekap", title:"Benang merah", doc:[8,9,10,11], step:true,
   hl:["BHP dimuat dalam RUU sebagai lembaga negara yang menjalankan tugas kurator. ","Satu standar profesi untuk semua kurator. ","Pembagian peran BHP dan kurator perorangan ditegaskan. ","Koordinasi antarlembaga diatur dengan jelas. "],
   cue:"Rekap satu halaman: tiap ketidakjelasan dijawab satu sikap, didukung bukti, dan dirumuskan dalam satu pasal.",
   html:()=>{const R=[["Apakah BHP ikut aturan izin dan sertifikasi profesi?","Sikap 1 · BHP dimuat dalam RUU sebagai lembaga negara","Perkara panjang: BHP tetap berjalan sebagai lembaga","A","Kedudukan BHP","#pasalA"],["Siapa yang membina dan mengawasinya?","Sikap 2 · Satu standar profesi untuk semua kurator","Status lembaga negara bukan keistimewaan","C","Standar dan Pembinaan BHP","#pasalC"],["Bagaimana pembagian perannya dengan kurator privat?","Sikap 3 · Pembagian peran ditegaskan","9 perkara jatuh ke BHP: harta kecil, pekerja, debitor hilang","B","Pembagian Peran","#pasalB"],["Siapa mengawasi, siapa membina, siapa memegang data?","Sikap 4 · Koordinasi antarlembaga diatur","Imbalan tak seimbang pada PT Jasa Prima Mandiri; data perkara belum ada","D","Koordinasi dan Penugasan Bersama","#pasalD"]];
   return `<div class="s-in">${head(BI("docpath"),"Rangkuman","Benang Merah Paparan","Setiap hal yang tidak jelas dijawab satu sikap, didukung bukti BHP Medan, dan dirumuskan dalam satu pasal.")}
   <div class="content"><div class="map grow"><div class="mh">Tidak jelas</div><div class="mh">Sikap BHP Medan</div><div class="mh">Bukti</div><div class="mh">Usulan pasal</div>
   ${R.map(([q,s,b,p,pt,g])=>`<div class="mq">${q}</div><div class="ms">${s}</div><div class="mb2">${b}</div><button class="mp" data-goto="${g}"><span class="badge">${p}</span><span>${pt}</span></button>`).join("")}</div></div>${foot([8])}`} },

 { id:"penutup", title:"Penutup", doc:[67,68,69], step:false, cls:"end",
   cue:"Pesan penutup dan ucapan terima kasih.",
   html:()=>`<div class="s-in"><div class="logos">${logoHTML()}</div><div class="eyebrow" style="color:var(--gold)">Penutup</div>
   <p class="lead" style="font-size:50px">BHP dimuat dalam RUU sebagai lembaga negara yang menjalankan tugas kurator, dengan satu standar profesi untuk semua kurator, pembagian peran yang jelas, dan koordinasi antarlembaga yang tegas.</p>
   <div class="thanks">Terima kasih</div>
   <div class="who"><b>Syafriadi Lubis, M.H.</b> · Kepala Balai Harta Peninggalan Medan</div></div>` },
];
