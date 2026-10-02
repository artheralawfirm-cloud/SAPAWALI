# Paparan BHP Medan: RDP Komisi XIII DPR RI, RUU Profesi Kurator

Bahan paparan Kepala Balai Harta Peninggalan Medan, disusun dari dokumen
*Bahan Masukan BHP Medan, RDP Komisi XIII DPR RI, RUU Profesi Kurator* (1 Oktober 2026).
Seluruh kalimat pada slide diambil dari dokumen tersebut.

## 1. Presentasi web (utama): `web/Paparan_BHP_Medan.html`

Satu file mandiri (font tertanam, tanpa internet). Buka di Chrome atau Edge, tekan **F** untuk layar penuh.

- **Alur 5 pokok pembahasan.** Ke-12 masukan dikelompokkan ke dalam 5 pokok: (1) kewenangan dan koordinasi,
  (2) standar profesi, (3) permasalahan praktik, (4) penguatan kelembagaan BHP, dan (5) masukan pengaturan.
  Setiap pokok dibuka dengan slide pembatas. Slide "5 Pokok Pembahasan" dan slide pembatas dapat diklik untuk
  lompat ke pokok atau masukan mana pun.
- **Slide sederhana, dokumen di sampingnya.** Mode *Otomatis* menyala sejak awal: setiap slide tampil
  penuh lebih dulu. Tekan lanjut sekali, slide bergeser ke kiri (tetap utuh, tidak tertutup) dan panel
  dokumen masuk dari kanan, menggulir ke bagian yang dibahas dan menandai kalimatnya. Tekan lanjut lagi,
  panel menutup dan slide berikutnya tampil penuh.
- **Pratinjau dokumen yang rapi**: kop, penomoran asli (I., 1., a., 1), (1)), kotak *Masukan BHP Medan*,
  dan 14 kartu *Usulan Rumusan Pasal* pada Lampiran I lengkap dengan tombol **Salin**. Tautan *Buka kartu*
  di setiap uraian masukan dapat diklik untuk langsung melompat ke kartu pasalnya.
- **Cari** (`/` atau `Ctrl+K`) di seluruh dokumen saat tanya jawab; hasil langsung membuka bagian dokumen dan slide terkait.
- **Mode presenter** (`P`): slide sekarang, slide berikutnya, poin bicara, naskah dari dokumen, pengatur waktu.
- **Dua layar**: buka file yang sama di dua jendela; keduanya bergerak bersama, termasuk titik **laser** (`L`).
- **Ikhtisar** (`G`), **baca dokumen penuh** dengan daftar isi (`R`), layar hitam (`B`), lompat slide (`12` lalu `Enter`), bantuan (`?`).
- Peta 12 masukan pada slide 4 dapat diklik untuk lompat ke masukan mana pun.
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
- `dokumen.json`: isi dokumen terstruktur (hasil ekstraksi .docx sampai Lampiran I, lengkap dengan penomoran).
- `ekstrak_dokumen.py`: membuat ulang `dokumen.json` dari file .docx bila dokumennya diperbarui:
  `python3 ekstrak_dokumen.py Bahan_Masukan.docx dokumen.json`, lalu jalankan `build_web.py`.
  Nomor blok dokumen yang dirujuk slide ada di `slides.js` (kolom `doc`), jadi periksa kembali bila
  susunan dokumen berubah.
- `fonts_embedded.css`: font Plus Jakarta Sans dan Source Serif 4 yang ditanam.
- `build_web.py`: menggabungkan semuanya menjadi `Paparan_BHP_Medan.html`.

## 2. Cadangan PowerPoint: `Paparan_BHP_Medan_RUU_Profesi_Kurator.pptx`

53 slide 16:9 dengan alur 5 pokok pembahasan yang sama, memuat seluruh 17 usulan rumusan pasal (Lampiran I) sesuai dokumen, dengan catatan pembicara.
Dibuat ulang dengan `build_slides.cjs` (pptxgenjs).

Versi Canva awal: https://www.canva.com/d/3PGEyDAsl1neFqh
