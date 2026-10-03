# Paparan BHP Medan: RDP Komisi XIII DPR RI, RUU Profesi Kurator

Bahan paparan Kepala Balai Harta Peninggalan Medan, disusun dari dokumen
*Masukan BHP Medan, Poin 1: Kewenangan dan Pembagian Peran Kurator* (Medan, 2 Oktober 2026).
Seluruh kalimat pada slide diambil dari dokumen tersebut.

## 1. Presentasi web (utama): `web/Paparan_BHP_Medan.html`

Satu file mandiri (font tertanam, tanpa internet). Buka di Chrome atau Edge, tekan **F** untuk layar penuh.

- **Alur mengikuti 5 bagian dokumen** (28 slide): I Pokok Sikap, II Pengalaman BHP Medan, III Jawaban Klaster 1,
  IV Usulan Pasal (Pasal A sampai D), V Catatan untuk RUU Kepailitan dan PKPU. Benang merahnya satu:
  *Masalah, Sikap, Bukti, Jawaban, Pasal, Catatan*. Setiap sikap diuraikan (Sikap 1 dan 2 pada slide
  *Lembaga Negara, dengan Standar yang Sama*; Sikap 3 dan 4 pada slide masing-masing), setiap temuan Bagian II
  ditutup dengan **jembatan** "Artinya" yang menunjuk pasal yang menjawabnya, dan setiap pasal ditutup dengan
  jembatan "Menjawab" yang menunjuk sikap, temuan, atau pertanyaan yang dijawabnya. Tombol pada jembatan dapat diklik.
- **Slide pembatas memuat pesan utama** bagian itu; pembatas Bagian III langsung memuat tiga pertanyaan Komisi
  beserta jawaban singkatnya. Slide *Alur Paparan*, setiap pembatas, dan kartu *Empat Sikap* dapat diklik untuk
  lompat ke bagian, uraian, atau pasalnya.
- **Rekap *Benang Merah*** sebelum penutup: satu tabel yang menghubungkan tiap hal yang tidak jelas, sikap BHP Medan,
  buktinya, dan pasal usulannya.
- **Grafik hidup** dari data dokumen: harta hanya 12% sampai 40% dari tagihan, lama perkara dengan garis 5 tahun,
  dan perbandingan imbalan jasa pada PT Jasa Prima Mandiri. Batang tumbuh saat slide tampil, angka menghitung naik.
- **Slide sederhana, dokumen di sampingnya.** Mode *Otomatis* menyala sejak awal: setiap slide tampil
  penuh lebih dulu. Tekan lanjut sekali, slide bergeser ke kiri (tetap utuh, tidak tertutup) dan panel
  dokumen masuk dari kanan, menggulir ke bagian yang dibahas dan menandai kalimatnya. Tekan lanjut lagi,
  panel menutup dan slide berikutnya tampil penuh.
- **Pratinjau dokumen yang rapi**: kop, penomoran asli (I., 1., a., (1)), Grafik 1 dan Grafik 2 dari dokumen,
  kotak *Analisis*, dan 4 kartu *Usulan Pasal* (Pasal A sampai D) lengkap dengan tombol **Salin**.
- **Cari** (`/` atau `Ctrl+K`) di seluruh dokumen saat tanya jawab; hasil langsung membuka bagian dokumen dan slide terkait.
- **Mode presenter** (`P`): slide sekarang, slide berikutnya, poin bicara, naskah dari dokumen, pengatur waktu.
- **Dua layar**: buka file yang sama di dua jendela; keduanya bergerak bersama, termasuk titik **laser** (`L`).
- **Ikhtisar** (`G`), **baca dokumen penuh** dengan daftar isi (`R`), layar hitam (`B`), lompat slide (`12` lalu `Enter`), bantuan (`?`).
- **Ramah HP.** Saat HP berdiri, slide tampil selebar layar dengan keterangan yang mudah dibaca di bawahnya,
  dan dokumen muncul sebagai lembar di bawah slide. Saat HP direbahkan, slide memenuhi layar dan bilah kontrol
  menghilang sendiri. Geser untuk berpindah slide. Tampilan di PC tidak berubah.

### Logo

`logo-pengayoman.png` dan `logo-ahu.png` dipotong dari gambar logo yang diberikan. Untuk menggantinya, timpa kedua file itu di folder `web/`, lalu jalankan:

```bash
cd presentasi/web && python3 build_web.py
```

Logo otomatis tampil di sampul, penutup, dan kaki setiap slide.

### Isi folder `web/`

- `template.html`: halaman dan gaya.
- `slides.js`: isi slide.
- `vercel.json`: konfigurasi hosting Vercel.
- `dokumen.json`: isi dokumen terstruktur (hasil ekstraksi .docx, lengkap dengan penomoran).
- `grafik-1.png`, `grafik-2.png`: grafik dari dokumen, ditanam ke pratinjau dokumen saat build.
- `ekstrak_dokumen.py`: membuat ulang `dokumen.json` dan grafiknya dari file .docx bila dokumennya diperbarui:
  `python3 ekstrak_dokumen.py Masukan_BHP_Medan_Poin_1_Ringkas.docx dokumen.json`, lalu jalankan `build_web.py`.
  Nomor blok dokumen yang dirujuk slide ada di `slides.js` (kolom `doc`), jadi periksa kembali bila
  susunan dokumen berubah.
- `fonts_embedded.css`: font Plus Jakarta Sans dan Source Serif 4 yang ditanam.
- `build_web.py`: menggabungkan semuanya menjadi `Paparan_BHP_Medan.html`.

## 2. Bahan RDP 6 Oktober 2026 (maksimal 2 slide): folder `klaster1/`

Bahan Klaster 1 (BHP Medan: Tumpang Tindih Kewenangan). Sumber tunggalnya adalah dokumen Telaah buatan Kepala BHP Medan,
disimpan apa adanya; slide dan data interaktif disesuaikan dengannya.

- `BHP Medan - Telaah Poin 1 dan Klaster 1 - Tumpang Tindih Kewenangan.docx`: dokumen masukan dan telaah (3 Oktober 2026),
  tidak disunting.
- `BHP Medan - Klaster 1 Tumpang Tindih Kewenangan - Paparan.pptx`: paparan 2 slide (transisi fade dan morph, animasi,
  tombol tautan ke data interaktif). Dari file asli hanya dua hal diubah agar sama dengan dokumen: rumusan pertanyaan 1
  ("kurator privat dari asosiasi") dan koma menggantung pada kalimat kendala menjadi titik.
- `BHP Medan - Tumpang Tindih Kewenangan - Data Interaktif.html`: pelengkap slide, hanya memuat yang tidak muat di slide:
  rincian 9 perkara, garis waktu, daftar 16 putusan dan 11 permohonan (SIPP), alur kerja dan dasar hukum dua tugas BHP,
  kutipan pasal, kriteria perkara wajib BHP (Tabel 3), dua kasus koordinasi, dan contoh rumusan pasal Lampiran II
  (dengan tombol Salin). Adegan pembuka memetakan tiap angka di slide ke penjelasannya. Namanya harus persis seperti ini
  dan satu folder dengan .pptx agar tombol di slide bisa membukanya.
- `BHP Medan - Klaster 1 Tumpang Tindih Kewenangan - Narasi.docx`: naskah bicara pendamping (opsional), dibangun oleh
  `build_narasi.cjs`.

## 3. Cadangan PowerPoint lengkap: `Paparan_BHP_Medan_RUU_Profesi_Kurator.pptx`

28 slide 16:9 dengan alur dan urutan yang sama persis dengan presentasi web (termasuk jembatan "Artinya" dan
"Menjawab", pembatas tanya jawab, dan rekap *Benang Merah*), memuat Pasal A sampai Pasal D lengkap dengan
analisisnya, dan catatan pembicara. Dibuat ulang dengan `build_slides.cjs` (pptxgenjs):

```bash
cd presentasi && NODE_PATH=<folder node_modules berisi pptxgenjs, react, react-dom, react-icons, sharp> node build_slides.cjs
```

Versi Canva awal: https://www.canva.com/d/3PGEyDAsl1neFqh
