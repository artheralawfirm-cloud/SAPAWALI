function head(num, eyebrow, title, lead){
  return `<div class="s-head">${num?`<div class="badge${String(num).length>2&&!String(num).startsWith("<svg")?" sm":""}">${num}</div>`:""}<div class="s-ht">${eyebrow?`<div class="eyebrow">${eyebrow}</div>`:""}<h2 class="s-title">${title}</h2>${lead?`<p class="s-lead">${lead}</p>`:""}</div></div>`;
}
const M = n => `Masukan ${n} dari 12`;
const BI = name => `<svg viewBox="0 0 24 24">${I(name)}</svg>`;
const OK = `<span class="mk ok"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>`;
const NO = `<span class="mk no"><svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg></span>`;
const ARW = `<svg class="arrow" viewBox="0 0 24 24">${I("arrowpath")}</svg>`;
const chips = (arr, cls="") => `<div class="chips ${cls}">${arr.map(c=>`<span class="chip">${c}</span>`).join("")}</div>`;
const tile = (o) => `<div class="tile ${o.cls||""}" style="${o.style||""}">${o.icon?`<svg class="ico" viewBox="0 0 24 24">${I(o.icon)}</svg>`:""}${o.k?`<span class="k">${o.k}</span>`:""}${o.num!=null?`<span class="num" data-count="${o.num}">${o.num}</span>${o.unit?`<span class="unit">${o.unit}</span>`:""}`:""}${o.h?`<h3>${o.h}</h3>`:""}${o.t?`<p class="txt">${o.t}</p>`:""}${o.extra||""}</div>`;

const SLIDES = [
 { title:"Sampul", doc:[0,6,7,8,9], step:false, cls:"cover",
   cue:"Salam pembuka kepada Pimpinan dan Anggota Komisi XIII DPR RI.",
   html:()=>`<div class="s-in"><div class="logos">${logoHTML()}</div>
   <div class="org">Kementerian Hukum Republik Indonesia<br>Kantor Wilayah Sumatera Utara</div>
   <h1>Bahan Masukan Balai Harta Peninggalan Medan</h1>
   <p class="sub">Dalam Rapat Dengar Pendapat dengan Komisi XIII DPR RI</p>
   <p class="desc">Penyusunan Rancangan Undang-Undang tentang Profesi Kurator terkait Peran Balai Harta Peninggalan dalam Pelaksanaan Tugas Kurator</p>
   <div class="who"><b>Syafriadi Lubis</b><br>Kepala Balai Harta Peninggalan Medan · Medan, 2 Oktober 2026</div></div>
   <div class="stack" aria-hidden="true">${[0,1,2].map(()=>`<div class="sh"><div class="ln c"></div><div class="ln c" style="width:50%"></div><div class="ln"></div><div class="ln"></div><div class="ln s"></div><div class="bx"><span class="t">USULAN RUMUSAN PASAL</span><div class="ln c" style="width:30%"></div><div class="ln"></div><div class="ln"></div><div class="ln s"></div></div><div class="ln"></div><div class="ln s"></div></div>`).join("")}</div>` },

 { title:"Pendahuluan", doc:[11,12], step:false,
   hl:["mendukung penuh pembentukan Rancangan Undang-Undang tentang Profesi Kurator (RUU)","BHP merupakan kurator dari unsur pemerintah","kedudukan BHP perlu diatur secara khusus dalam RUU","BHP disebut Kurator Negara dan kurator selain BHP disebut Kurator Perseorangan"],
   cue:"Tegaskan dukungan penuh, lalu dasar kedudukan BHP sebagai kurator dari unsur pemerintah.",
   html:()=>`<div class="s-in">${head("I","Bahan masukan · Bagian I","Pendahuluan","BHP adalah kurator dari unsur pemerintah, sehingga kedudukannya perlu diatur secara khusus dalam RUU.")}
   <div class="content"><div class="row grow">
     ${tile({cls:"navy",k:"Sikap BHP Medan",h:"Mendukung penuh",t:"pembentukan Rancangan Undang-Undang tentang Profesi Kurator."})}
     ${tile({icon:"govpath",k:"Pasal 70 ayat (1) UU Kepailitan dan PKPU",h:"Kurator dari unsur pemerintah"})}
     ${tile({icon:"docpath",k:"Oleh karena itu",h:"Kedudukan BHP perlu diatur secara khusus dalam RUU"})}
   </div>
   <div class="legend"><span class="k">Istilah dalam paparan</span><span><b>Kurator Negara</b> = BHP</span><span><b>Kurator Perseorangan</b> = kurator selain BHP</span></div></div>${foot([11])}` },

 { title:"Bahan yang siap pakai", doc:[12,14], step:false,
   hl:["Setiap masukan disertai usulan rumusan pasal yang dapat langsung digunakan dalam penyusunan draf RUU.","Setiap masukan disertai usulan rumusan pasal yang dihimpun dalam Lampiran I."],
   cue:"Tunjukkan kekuatan dokumen: setiap masukan langsung disertai rumusan pasal yang dihimpun dalam Lampiran I.",
   html:()=>`<div class="s-in">${head("II","Bahan masukan · Bagian II","Masukan yang Siap Dipakai","Setiap masukan disertai usulan rumusan pasal yang dapat langsung digunakan dalam penyusunan draf RUU.")}
   <div class="content"><div class="row grow">
     ${[[12,"masukan"],[COUNT.pasal,"usulan rumusan pasal"],[COUNT.ayat,"ayat"],[COUNT.definisi,"definisi dalam ketentuan umum"]].map(([n,l])=>tile({cls:"navy",num:n,t:l})).join("")}
   </div>
   <div class="steps">${[["searchpath","Uraian setiap masukan"],["shieldpath","Kesimpulan: Masukan BHP Medan"],["docpath","Usulan rumusan pasal dalam Lampiran I"]].map(([ic,t],i)=>`<div class="sp"><svg class="ico sm" viewBox="0 0 24 24">${I(ic)}</svg><span>${t}</span></div>${i<2?ARW:""}`).join("")}</div></div>${foot([14])}` },

 { title:"Peta 12 masukan", doc:[14], step:true,
   hl:["masukan angka 1 dan angka 2 sesuai dengan agenda rapat mengenai peran BHP dalam pelaksanaan tugas kurator","masukan angka 3 sampai dengan angka 12 sebagai tanggapan atas 10 (sepuluh) isu strategis"],
   cue:"Dua masukan sesuai agenda rapat, sepuluh menanggapi isu strategis ToR. Klik nomor mana pun untuk lompat ke masukannya.",
   html:()=>{const T=["Batas Jumlah Perkara bagi BHP","BHP sebagai Pengurus dalam PKPU","Kekosongan Rezim Profesi","Standar yang Terfragmentasi","Batas Perlindungan dan Tanggung Jawab","Hambatan Pelaksanaan Tugas","Akuntabilitas Pengelolaan Boedel","Pengawasan Berlapis yang Belum Terpadu","Data yang Belum Optimal","Imbalan dan Risiko Profesi","Kepailitan Lintas Batas","Perlindungan Pihak Terdampak"];
   return `<div class="s-in">${head("II","Bahan masukan · Bagian II","12 Masukan BHP Medan","Masukan 1 dan 2 sesuai dengan agenda rapat mengenai peran BHP; masukan 3 sampai 12 menanggapi 10 isu strategis dalam Term of Reference.")}
   <div class="content"><div class="mgrid grow">${T.map((t,i)=>`<button class="mcell${i<2?" hi":""}" data-goto="m${i+1}"><span class="badge">${i+1}</span><span>${t}</span></button>`).join("")}</div></div>${foot([14])}`} },

 { title:"Ketentuan Umum", doc:[152,153], step:true,
   cue:"Dasar istilah bagi seluruh usulan pasal: Kurator Negara dan Kurator Perseorangan.",
   html:()=>`<div class="s-in">${head(BI("docpath"),"Lampiran I angka 1 · Pasal 1","Ketentuan Umum: "+COUNT.definisi+" Definisi","Sebagai dasar istilah, RUU perlu membedakan dua jenis kurator: Kurator Negara dan Kurator Perseorangan.")}
   <div class="content"><div class="row grow">
     ${tile({cls:"navy",k:"Pasal 1 angka 2",extra:`<p class="def"><b>Kurator Negara</b> adalah Balai Harta Peninggalan yang melaksanakan tugas Kurator melalui pejabat Kurator Keperdataan.</p>`})}
     ${tile({k:"Pasal 1 angka 3",extra:`<p class="def"><b>Kurator Perseorangan</b> adalah orang perseorangan yang memenuhi persyaratan dan terdaftar pada Kementerian untuk melaksanakan tugas Kurator.</p>`})}
   </div>
   ${chips(["Pengurus","Pengurus Perseorangan","Kurator Keperdataan","Tim Kurator Keperdataan","Majelis Pengawas Kurator","Majelis Kehormatan Kurator"],"sm")}</div>${foot([152])}` },

 // ---------------- MASUKAN 1: BATAS JUMLAH PERKARA ----------------
 { title:"Mengapa batas berlaku bagi BHP", sec:1, doc:[18,20,21,22], step:false,
   hl:["kurator yang diangkat tidak sedang menangani perkara kepailitan lebih dari 3 (tiga) perkara","batas tersebut seharusnya juga berlaku bagi BHP","dilakukan secara cermat dan tepat waktu","merugikan Kreditor dan pekerja","menjaga kesetaraan perlakuan antara Kurator Negara dan Kurator Perseorangan"],
   cue:"Kurator lain dibatasi 3 perkara. BHP juga kurator, jadi batas yang sama seharusnya berlaku. Tiga pertimbangan.",
   html:()=>`<div class="s-in">${head(1,M(1)+" · Batas Jumlah Perkara bagi BHP","Kurator Dibatasi 3 Perkara, BHP Juga","Pasal 15 ayat (3) UU Kepailitan dan PKPU membatasi kurator pada 3 perkara. Karena BHP juga kurator, batas tersebut seharusnya juga berlaku bagi BHP.")}
   <div class="content"><div class="row grow">
     ${tile({icon:"userspath",k:"Pertimbangan 1",h:"Kapasitas yang cukup",t:"agar pengurusan dan pemberesan dilakukan secara cermat dan tepat waktu"})}
     ${tile({icon:"scalepath",k:"Pertimbangan 2",h:"Mutu tetap terjaga",t:"tanpa batas, penyelesaian perkara tertunda sehingga merugikan Kreditor dan pekerja"})}
     ${tile({cls:"navy",icon:"shieldpath",k:"Pertimbangan 3",h:"Perlakuan yang setara",t:"antara Kurator Negara dan Kurator Perseorangan, sehingga perkara tidak menumpuk pada BHP"})}
   </div></div>${foot([18])}` },

 { title:"Batas 3 perkara per tim", sec:1, doc:[169,170,171,172,173], step:true,
   hl:["berlaku juga bagi Balai Harta Peninggalan dan dihitung untuk setiap Tim Kurator Keperdataan","terdiri atas 3 (tiga) orang pejabat Kurator Keperdataan","diperhitungkan dalam batas jumlah perkara","dihitung sebagai 1 (satu) perkara","memberitahukan secara tertulis kepada Pengadilan"],
   cue:"Batas dihitung per tim. Perkara PKPU ikut dihitung. Bila semua tim penuh, Kepala BHP memberi tahu Pengadilan.",
   html:()=>`<div class="s-in">${head(1,M(1)+" · Usulan rumusan pasal","Batas Dihitung untuk Setiap Tim","Setiap tim berisi 3 pejabat Kurator Keperdataan dan menangani paling banyak 3 perkara, sehingga kapasitas BHP terukur.")}
   <div class="content"><div class="row grow">
     ${[1,2,3].map(n=>`<div class="team"><span class="k">Tim ${n}</span><div class="ppl">${[0,1,2].map(()=>`<svg viewBox="0 0 24 24">${I("personpath")}</svg>`).join("")}</div><span class="cap">3 pejabat Kurator Keperdataan</span><div class="cases">${[0,1,2].map(()=>`<i></i>`).join("")}</div><span class="cap">paling banyak 3 perkara</span></div>`).join("")}
     <div class="tile navy" style="flex:1.25"><span class="k">Kapasitas BHP</span><span class="num" style="font-size:96px">Tim × 3</span><p class="txt">Perkara PKPU ikut dihitung. PKPU yang berlanjut pailit tetap dihitung 1 perkara.</p></div>
   </div>
   <div class="steps"><div class="sp">Semua tim penuh</div>${ARW}<div class="sp">Kepala BHP memberi tahu Pengadilan secara tertulis</div>${ARW}<div class="sp">Pengadilan mengangkat Kurator atau Pengurus lain</div></div></div>${foot([169])}` },

 { title:"Masa peralihan 6 bulan", sec:1, doc:[182,183,185,186,188], step:true,
   hl:["tetap dilaksanakan oleh Balai Harta Peninggalan","paling lama 6 (enam) bulan","menugaskan Tim Kurator Keperdataan lain pada Balai Harta Peninggalan yang sama","mengajukan permohonan penggantian Kurator atau Pengurus kepada Pengadilan","tidak dianggap sebagai pelanggaran"],
   cue:"Mitigasi risiko saat RUU berlaku: perkara berjalan aman, kelebihan perkara dialihkan paling lama 6 bulan.",
   html:()=>`<div class="s-in">${head(1,M(1)+" · Pengalihan Kelebihan Perkara","Masa Peralihan 6 Bulan","Saat RUU berlaku, perkara yang sedang berjalan tidak terganggu, dan kelebihan perkara dialihkan paling lama 6 bulan.")}
   <div class="content"><div class="tl"><span class="dot l"></span><span class="bar"></span><span class="dot r"></span>
     <span class="tlab l">UU diundangkan</span><span class="tbig"><span data-count="6">6</span> bulan</span><span class="tlab r">Batas jumlah perkara berlaku penuh</span></div>
   <div class="row grow">
     ${tile({icon:"folderpath",h:"Perkara berjalan aman",t:"Perkara yang sedang ditangani BHP tetap dilaksanakan oleh BHP."})}
     ${tile({icon:"userspath",h:"Dialihkan bertahap",t:"Ke tim lain melalui surat tugas Kepala BHP, atau melalui penggantian kurator oleh Pengadilan (Pasal 71)."})}
     ${tile({icon:"shieldpath",h:"Bukan pelanggaran",t:"Selama masa peralihan, kelebihan perkara tidak dianggap pelanggaran batas jumlah perkara."})}
   </div></div>${foot([182])}` },

 // ---------------- MASUKAN 2: BHP SEBAGAI PENGURUS PKPU ----------------
 { title:"Masalah: BHP tidak disebut dalam PKPU", sec:2, doc:[37,38,40,42,43], step:true,
   hl:["menyebut BHP secara tegas sebagai kurator","hanya menyebut orang perseorangan sebagai pihak yang dapat menjadi pengurus","orang perseorangan yang berdomisili di wilayah Negara Republik Indonesia","Ketentuan tersebut tidak melarang BHP menjadi pengurus. BHP hanya tidak disebutkan dalam rumusan pasal tersebut.","undang-undang tidak mengatur siapa yang diangkat sebagai pengurus apabila pemohon tidak mengusulkan pengurus"],
   cue:"Bandingkan kepailitan dan PKPU. Tekankan: BHP tidak dilarang, hanya tidak disebutkan.",
   html:()=>`<div class="s-in">${head(2,M(2)+" · BHP sebagai Pengurus dalam PKPU","Masalahnya: BHP Tidak Disebut dalam PKPU","Dalam kepailitan kedudukan BHP diatur tegas, tetapi dalam PKPU BHP tidak disebut, sehingga ada celah ketika pemohon tidak mengusulkan pengurus.")}
   <div class="content"><div class="cmp grow">
     <div class="c h"></div><div class="c h">Kepailitan</div><div class="c h">PKPU</div>
     <div class="c l">BHP disebut dalam UU</div><div class="c">${OK}<span>Ya, sebagai kurator<small>Pasal 70 ayat (1)</small></span></div><div class="c">${NO}<span>Tidak, hanya orang perseorangan<small>Pasal 234 ayat (3)</small></span></div>
     <div class="c l">Bila pemohon tidak mengusulkan</div><div class="c">${OK}<span>BHP ditunjuk oleh undang-undang<small>Pasal 15 ayat (2)</small></span></div><div class="c">${NO}<span>Tidak diatur, terjadi celah hukum<small>padahal batas waktu 3 hari / 20 hari</small></span></div>
   </div>
   <p class="punch">Ketentuan tersebut tidak melarang BHP menjadi pengurus. BHP hanya tidak disebutkan.</p></div>${foot([37])}` },

 { title:"Mengapa BHP layak", sec:2, doc:[46,49,51,53], step:false,
   hl:["secara logika hukum (argumentum a maiore ad minus) BHP juga mampu melaksanakan kewenangan yang lebih ringan sebagai pengurus","disetorkan ke kas negara sebagai Penerimaan Negara Bukan Pajak","Pejabat yang menangani perkara tidak memperoleh keuntungan pribadi dari perkara tersebut.","dalam hal BHP sejak awal bertindak sebagai pengurus","BHP hanya dapat bertindak berdasarkan kewenangan yang diberikan oleh peraturan perundang-undangan"],
   cue:"Empat alasan dari analisis hukum, huruf c sampai f dalam dokumen.",
   html:()=>`<div class="s-in">${head(2,M(2)+" · BHP sebagai Pengurus dalam PKPU","Mengapa BHP Layak Menjadi Pengurus","Empat alasan hukum: BHP sudah dipercaya untuk tugas yang lebih berat, netral, berkesinambungan, dan kewenangannya memang harus ditulis tegas.")}
   <div class="content"><div class="g2 grow">
     ${tile({icon:"scalepath",h:"Tugas lebih berat sudah dipercayakan",t:"Sebagai kurator, BHP membereskan seluruh harta Debitor. Tugas pengurus jauh lebih ringan."})}
     ${tile({icon:"shieldpath",h:"Netral dan independen",t:"Imbalan jasa BHP disetorkan ke kas negara sebagai PNBP. Pejabatnya tidak memperoleh keuntungan pribadi."})}
     ${tile({icon:"arrowpath",h:"Berkesinambungan",t:"Bila PKPU berakhir pailit, data harta dan hasil pencocokan tagihan tetap pada lembaga yang sama."})}
     ${tile({icon:"govpath",h:"Harus tegas dalam undang-undang",t:"Sebagai badan pemerintahan, BHP hanya dapat bertindak berdasarkan kewenangan yang diberikan peraturan."})}
   </div></div>${foot([46])}` },

 { title:"Usulan pasal: BHP sebagai Pengurus", sec:2, doc:[198,200,201], step:true,
   hl:["Balai Harta Peninggalan; dan","Balai Harta Peninggalan diangkat selaku Pengurus","Pengadilan mengangkat Pengurus Perseorangan"],
   cue:"Jelaskan alurnya dari kiri ke kanan. Dokumen menunjukkan ayat (2) sampai (4).",
   html:()=>`<div class="s-in">${head(2,M(2)+" · Usulan rumusan pasal","Usulannya: BHP sebagai Pengurus PKPU","Seperti dalam kepailitan, BHP menjadi pengurus yang ditunjuk undang-undang bila pemohon tidak mengusulkan pengurus, selama kapasitas timnya masih tersedia.")}
   <div class="content"><div class="flow grow">
     <svg class="fl" viewBox="0 0 1416 420" preserveAspectRatio="none" aria-hidden="true">
       <defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#14284B"/></marker></defs>
       <g stroke="#14284B" stroke-width="4" fill="none" marker-end="url(#ah)">
         <path d="M252 175H316"/><path d="M702 175H766"/><path d="M1112 175H1176"/>
         <path d="M509 262V318"/><path d="M939 262V318"/>
       </g></svg>
     <div class="fb start" style="left:0;top:90px;width:250px;height:170px">Permohonan PKPU diajukan</div>
     <div class="fb q" style="left:320px;top:90px;width:380px;height:170px">Ada usul pengurus yang memenuhi syarat?</div>
     <div class="fb res" style="left:320px;top:322px;width:380px;height:98px">Pengurus yang diusulkan diangkat</div>
     <div class="fb q" style="left:770px;top:90px;width:340px;height:170px">BHP masih punya tim yang belum penuh?</div>
     <div class="fb win" style="left:1180px;top:90px;width:236px;height:170px">BHP diangkat selaku Pengurus</div>
     <div class="fb res" style="left:770px;top:322px;width:340px;height:98px">Pengadilan mengangkat Pengurus Perseorangan</div>
     <span class="lab" style="left:734px;top:128px">Tidak</span><span class="lab" style="left:1144px;top:128px">Ya</span>
     <span class="lab" style="left:556px;top:272px">Ya</span><span class="lab" style="left:994px;top:272px">Tidak</span>
   </div></div>${foot([198])}` },

 // ---------------- MASUKAN 3 sampai 12 ----------------
 { title:"Kekosongan rezim profesi", sec:3, doc:[209,210,212], step:true,
   hl:["dilaksanakan oleh Organisasi Profesi","dilaksanakan oleh Menteri","Menteri membentuk Majelis Pengawas Kurator."],
   cue:"Pembinaan dibedakan menurut jenis kurator; satu Majelis Pengawas untuk semua.",
   html:()=>`<div class="s-in">${head(3,M(3),"Kekosongan Rezim Profesi","Pembinaan dibedakan menurut jenis kurator, dan seluruh kurator diawasi oleh satu Majelis Pengawas Kurator.")}
   <div class="content"><div class="row grow">
     ${tile({icon:"userspath",k:"Kurator Perseorangan",h:"Dibina oleh organisasi profesi",t:"pendidikan, sertifikasi, registrasi, kode etik, disiplin, asuransi, dan perlindungan hukum"})}
     ${tile({icon:"govpath",k:"Kurator Negara",h:"Dibina oleh Kementerian Hukum",t:"karena pejabat Kurator Keperdataan merupakan Aparatur Sipil Negara"})}
     ${tile({cls:"navy",icon:"scalepath",k:"Untuk semua kurator",h:"Majelis Pengawas Kurator",t:"terdiri atas unsur pemerintah, organisasi profesi, dan akademisi"})}
   </div></div>${foot([209])}` },

 { title:"Standar profesi nasional", sec:4, doc:[225,227,228,229,230,231], step:true,
   hl:["wajib berpedoman pada standar profesi nasional"],
   cue:"Satu standar nasional untuk seluruh organisasi profesi.",
   html:()=>`<div class="s-in">${head(4,M(4),"Standar yang Terfragmentasi","Organisasi profesi boleh lebih dari satu, asalkan semuanya berpedoman pada satu standar profesi nasional.")}
   <div class="content"><div class="row grow">
     ${tile({cls:"navy",style:"flex:1",k:"Usulan",h:"Satu standar profesi nasional",t:"ditetapkan oleh Menteri setelah mendengar pertimbangan Organisasi Profesi dan Majelis Pengawas Kurator"})}
     <div class="tile" style="flex:1.25"><span class="k">Paling sedikit meliputi</span><ol class="list">${["kurikulum pendidikan profesi","materi dan tata cara ujian profesi","kode etik","standar pelaksanaan tugas","jenis sanksi dan tata cara penjatuhannya"].map((t,i)=>`<li><span class="n">${"abcde"[i]}</span><span>${t}</span></li>`).join("")}</ol></div>
   </div></div>${foot([225])}` },

 { title:"Majelis Kehormatan Kurator", sec:5, doc:[236,237,243,244], step:true,
   hl:["dengan persetujuan Majelis Kehormatan Kurator","paling lama 30 (tiga puluh) hari kerja","dianggap menerima permintaan persetujuan"],
   cue:"Majelis memilah laporan sebelum kurator dipanggil, dengan batas waktu agar bukan imunitas.",
   html:()=>`<div class="s-in">${head(5,M(5),"Batas Perlindungan dan Tanggung Jawab","Laporan terhadap kurator dipilah lebih dahulu oleh Majelis Kehormatan Kurator, dengan batas waktu agar tidak menjadi imunitas.")}
   <div class="content"><div class="row grow">
     <div class="tile" style="flex:1.35"><span class="k">Majelis memilah: laporan ini termasuk</span><ol class="list">${["sengketa teknis kepailitan","pelanggaran kode etik","pelanggaran administratif","tanggung jawab perdata","dugaan tindak pidana"].map((t,i)=>`<li><span class="n">${"abcde"[i]}</span><span>${t}</span></li>`).join("")}</ol></div>
     ${tile({cls:"navy",num:30,unit:"hari kerja",t:"batas waktu jawaban Majelis. Bila tidak dijawab, Majelis dianggap menerima permintaan persetujuan."})}
   </div></div>${foot([236])}` },

 { title:"Hambatan pelaksanaan tugas", sec:6, doc:[250,252,255], step:true,
   hl:["wajib memberikan pendampingan dan pengamanan","wajib memberikan akses, keterangan, dan dokumen","pidana penjara paling lama 2 (dua) tahun atau pidana denda paling banyak kategori IV"],
   cue:"Pengamanan Polri, kewajiban akses, dan sanksi pidana.",
   html:()=>`<div class="s-in">${head(6,M(6),"Hambatan Pelaksanaan Tugas","Kurator perlu dukungan pengamanan, akses terhadap harta dan dokumen, serta sanksi bagi pihak yang menghalangi.")}
   <div class="content"><div class="row grow">
     ${tile({icon:"shieldpath",k:"Pengamanan",h:"Polri wajib mendampingi",t:"dan mengamankan kurator atas permintaan Kurator, Pengurus, atau Hakim Pengawas"})}
     ${tile({icon:"folderpath",k:"Akses",h:"Wajib membuka akses",t:"Debitor Pailit dan pihak yang menguasai harta pailit wajib memberikan keterangan dan dokumen"})}
     ${tile({cls:"navy",icon:"gavelpath",k:"Ketentuan pidana",h:"Pidana bagi yang menghalangi",t:"penjara paling lama 2 tahun atau denda paling banyak kategori IV"})}
   </div></div>${foot([250])}` },

 { title:"Akuntabilitas boedel", sec:7, doc:[261,266,268,270,273], step:true,
   hl:["1 (satu) rekening kepailitan untuk setiap perkara","upah pekerja yang terutang","hak pekerja lainnya","Putusan Mahkamah Konstitusi Nomor 67/PUU-XI/2013"],
   cue:"Satu rekening per perkara, dan urutan pembayaran sesuai Putusan MK 67/PUU-XI/2013.",
   html:()=>`<div class="s-in">${head(7,M(7),"Akuntabilitas Pengelolaan Boedel","Uang harta pailit disimpan dalam satu rekening per perkara, lalu dibayarkan menurut urutan yang melindungi pekerja.")}
   <div class="content"><div class="row grow">
     ${tile({cls:"navy",style:"flex:.8",num:1,unit:"rekening per perkara",t:"setiap uang masuk dan keluar dicatat, didukung bukti, dan dilaporkan kepada Hakim Pengawas"})}
     <div class="tile" style="flex:1.3"><span class="k">Urutan pembayaran</span><ol class="list tight">${["biaya kepailitan dan imbalan jasa Kurator","<b>upah pekerja yang terutang</b>","Kreditor pemegang hak jaminan kebendaan","<b>hak pekerja lainnya</b>","tagihan negara dan yang didahulukan","Kreditor konkuren secara seimbang"].map((t,i)=>`<li><span class="n">${"abcdef"[i]}</span><span>${t}</span></li>`).join("")}</ol></div>
   </div></div>${foot([261])}` },

 { title:"Pembagian pengawasan", sec:8, doc:[279,280,281], step:true,
   hl:["Hakim Pengawas","Majelis Pengawas Kurator","Komite Bersama"],
   cue:"Tiga lapis pengawasan, masing-masing jelas wilayahnya.",
   html:()=>`<div class="s-in">${head(8,M(8),"Pengawasan Berlapis yang Belum Terpadu","Tiga pengawas dengan wilayah yang berbeda, sehingga tidak ada celah dan tidak ada tumpang tindih.")}
   <div class="content"><div class="row grow">
     ${tile({icon:"gavelpath",k:"Yuridis",h:"Hakim Pengawas",t:"mengawasi pengurusan dan pemberesan harta pailit"})}
     ${tile({icon:"scalepath",k:"Teknis dan administratif",h:"Majelis Pengawas Kurator",t:"mengawasi tahapan pelaksanaan pekerjaan Kurator dan Pengurus"})}
     ${tile({icon:"userspath",k:"Pengembangan profesi",h:"Komite Bersama",t:"mengawasi pengembangan profesi dan Organisasi Profesi"})}
   </div></div>${foot([279])}` },

 { title:"Kewajiban penyediaan data", sec:9, doc:[288,290], step:true,
   hl:["wajib memberikan data tersebut","paling lama 14 (empat belas) hari kerja","Ketentuan mengenai rahasia bank tidak berlaku"],
   cue:"Data harta Debitor Pailit wajib diberikan paling lama 14 hari kerja.",
   html:()=>`<div class="s-in">${head(9,M(9),"Data yang Belum Optimal","Instansi yang menyimpan data harta Debitor Pailit wajib memberikannya kepada kurator dalam waktu yang pasti.")}
   <div class="content"><div class="row grow">
     ${tile({cls:"navy",style:"flex:.8",num:14,unit:"hari kerja",t:"batas waktu pemberian data atas permintaan kurator"})}
     <div class="tile" style="flex:1.3"><span class="k">Antara lain</span>${chips(["Badan Pertanahan Nasional","SAMSAT","KSEI","perbankan"])}<h3>Rahasia bank tidak berlaku terhadap pemberian data kepada kurator.</h3><p class="txt">Data pribadi tetap dilindungi sesuai UU Pelindungan Data Pribadi.</p></div>
   </div></div>${foot([288])}` },

 { title:"Imbalan jasa", sec:10, doc:[297,298,299], step:true,
   hl:["berhak atas imbalan jasa","berdasarkan pedoman yang ditetapkan oleh Menteri","merupakan Penerimaan Negara Bukan Pajak"],
   cue:"Bukan masalah pokok; cukup ditegaskan dasar hukumnya dan sifat PNBP imbalan BHP.",
   html:()=>`<div class="s-in">${head(10,M(10),"Imbalan dan Risiko Profesi","Imbalan jasa sudah diatur pedoman Menteri, sehingga RUU cukup menegaskan dasar hukumnya dan status PNBP bagi BHP.")}
   <div class="content"><div class="row grow">
     ${tile({icon:"docpath",k:"Sudah berlaku",h:"Pedoman Menteri",t:"Peraturan Menteri Hukum Nomor 20 Tahun 2025 tentang Pedoman Imbalan Jasa bagi Kurator dan Pengurus"})}
     ${tile({cls:"navy",style:"flex:1.4",icon:"coinspath",k:"Usulan",h:"Imbalan jasa BHP merupakan Penerimaan Negara Bukan Pajak",t:"diterima BHP selaku Kurator Negara atau Pengurus"})}
   </div></div>${foot([297])}` },

 { title:"Kepailitan lintas batas", sec:11, doc:[304,305,306], step:true,
   hl:["wajib mematuhi ketentuan hukum internasional dan perjanjian internasional","dapat bekerja sama dan berkomunikasi","bersama dengan Kurator yang terdaftar di Indonesia"],
   cue:"Kepatuhan pada hukum internasional; wakil asing bertindak bersama kurator Indonesia.",
   html:()=>`<div class="s-in">${head(11,M(11),"Kepailitan Lintas Batas","Untuk harta dan proses kepailitan di luar negeri, kurator berpegang pada hukum internasional dan bekerja bersama kurator Indonesia.")}
   <div class="content"><div class="row grow">
     ${tile({icon:"globepath",k:"Kepatuhan",h:"Hukum dan perjanjian internasional",t:"yang mengikat Negara Republik Indonesia"})}
     ${tile({icon:"handpath",k:"Kerja sama",h:"Pengadilan dan kurator di negara lain",t:"dapat bekerja sama dan berkomunikasi"})}
     ${tile({cls:"navy",icon:"shieldpath",k:"Perlindungan",h:"Wakil asing bersama kurator Indonesia",t:"untuk harta Debitor yang berada di wilayah Indonesia"})}
   </div></div>${foot([304])}` },

 { title:"Pengaduan pihak terdampak", sec:12, doc:[313,314,315], step:true,
   hl:["dapat mengajukan pengaduan kepada Majelis Pengawas Kurator","paling lama 60 (enam puluh) hari","tidak menghentikan proses pengurusan"],
   cue:"Pengaduan terbuka dan sederhana, diputus 60 hari, tanpa menghentikan pemberesan.",
   html:()=>`<div class="s-in">${head(12,M(12),"Perlindungan Pihak Terdampak","Setiap pihak yang dirugikan dapat mengadu dengan prosedur sederhana dan batas waktu jelas, tanpa menghentikan proses kepailitan.")}
   <div class="content"><div class="row grow">
     <div class="tile" style="flex:1.3"><span class="k">Kepentingan yang dilindungi</span>${chips(["Debitor","Kreditor","pekerja","negara","konsumen","pihak ketiga"])}<h3>Pengaduan diajukan kepada Majelis Pengawas Kurator, dan tidak menghentikan proses pengurusan dan pemberesan.</h3></div>
     ${tile({cls:"navy",style:"flex:.8",num:60,unit:"hari",t:"batas waktu Majelis memeriksa dan memutus pengaduan"})}
   </div></div>${foot([313])}` },

 { title:"Rujukan", doc:[112,114,127,133,136,141], step:false,
   cue:"Seluruh usulan berpijak pada rujukan yang dapat diverifikasi.",
   html:()=>`<div class="s-in">${head(BI("bookpath"),"Daftar rujukan","Disusun di Atas Rujukan yang Kuat","Seluruh usulan berpijak pada peraturan, putusan, dan dokumen yang dapat diverifikasi.")}
   <div class="content"><div class="row grow">${[[RUJ.uu,"undang-undang dan peraturan setingkat undang-undang"],[RUJ.pm,"peraturan menteri"],[RUJ.put,"Putusan Mahkamah Konstitusi"],[RUJ.res+RUJ.int,"dokumen resmi dan internasional"]].map(([n,l])=>tile({num:n,t:l})).join("")}</div>
   <div class="legend"><span class="k">Antara lain</span><span>UU Kepailitan dan PKPU · UU Administrasi Pemerintahan · UU PNBP · UU Pelindungan Data Pribadi · UU ASN · KUHP · Putusan MK 67/PUU-XI/2013 · UNCITRAL Model Law</span></div></div>${foot([112])}` },

 { title:"Penutup", doc:[108], step:false, cls:"end",
   hl:["memperkuat kedudukan BHP sebagai Kurator Negara"],
   cue:"Harapan BHP Medan dan ucapan terima kasih kepada Pimpinan dan Anggota Komisi XIII DPR RI.",
   html:()=>`<div class="s-in"><div class="logos">${logoHTML()}</div><div class="eyebrow" style="color:var(--gold)">Bagian III · Penutup</div>
   <p class="lead" style="font-size:52px">BHP Medan berharap RUU tentang Profesi Kurator dapat memperkuat kedudukan BHP sebagai Kurator Negara.</p>
   <p class="txt" style="color:#E6ECF7">Atas perhatian Pimpinan dan Anggota Komisi XIII DPR RI, kami ucapkan terima kasih.</p>
   <div class="thanks">Terima kasih</div>
   <div class="who"><b>Syafriadi Lubis</b> · Kepala Balai Harta Peninggalan Medan</div></div>` },
];
