# Paparan BHP Medan: RDP Komisi XIII DPR RI, RUU Profesi Kurator

Bahan paparan Kepala Balai Harta Peninggalan Medan, disusun dari dokumen
*Masukan BHP Medan, Poin 1: Kewenangan dan Pembagian Peran Kurator* (Medan, 2 Oktober 2026).
Seluruh kalimat pada slide diambil dari dokumen tersebut.

## 1. Presentasi web (utama): `web/Paparan_BHP_Medan.html`

Satu file mandiri (font tertanam, tanpa internet). Buka di Chrome atau Edge, tekan **F** untuk layar penuh.

- **Alur mengikuti 5 bagian dokumen** (26 slide): I Pokok Sikap, II Pengalaman BHP Medan, III Jawaban Klaster 1,
  IV Usulan Pasal (Pasal A sampai D), V Catatan untuk RUU Kepailitan dan PKPU. Slide *Alur Paparan* dan setiap
  slide pembatas dapat diklik untuk lompat ke bagian atau slide mana pun. Kartu *Empat Sikap* juga dapat diklik
  menuju uraian atau pasalnya.
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

## 2. Cadangan PowerPoint: `Paparan_BHP_Medan_RUU_Profesi_Kurator.pptx`

26 slide 16:9 dengan alur 5 bagian yang sama, memuat Pasal A sampai Pasal D lengkap dengan analisisnya, dan catatan pembicara.
Dibuat ulang dengan `build_slides.cjs` (pptxgenjs).

Versi Canva awal: https://www.canva.com/d/3PGEyDAsl1neFqh
