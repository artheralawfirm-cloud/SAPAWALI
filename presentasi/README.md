# Paparan BHP Medan: RDP Komisi XIII DPR RI, RUU Profesi Kurator

Bahan paparan Kepala Balai Harta Peninggalan Medan, disusun dari dokumen
*Bahan Masukan BHP Medan, RDP Komisi XIII DPR RI, RUU Profesi Kurator* (1 Oktober 2026).
Seluruh kalimat pada slide diambil dari dokumen tersebut.

## 1. Presentasi web (utama): `web/Paparan_BHP_Medan.html`

Satu file mandiri (font tertanam, tanpa internet). Buka di Chrome atau Edge, tekan **F** untuk layar penuh.

- **Slide sederhana, dokumen di sampingnya.** Mode *Otomatis* menyala sejak awal: setiap slide tampil
  penuh lebih dulu. Tekan lanjut sekali, slide bergeser ke kiri (tetap utuh, tidak tertutup) dan panel
  dokumen masuk dari kanan, menggulir ke bagian yang dibahas dan menandai kalimatnya. Tekan lanjut lagi,
  panel menutup dan slide berikutnya tampil penuh.
- **Pratinjau dokumen yang rapi**: kop, penomoran asli (I., 1., a., 1), (1)), dan kartu
  *Usulan Rumusan Pasal* lengkap dengan tombol **Salin** untuk menyalin teks pasal.
- **Cari** (`/` atau `Ctrl+K`) di seluruh dokumen saat tanya jawab; hasil langsung membuka bagian dokumen dan slide terkait.
- **Mode presenter** (`P`): slide sekarang, slide berikutnya, poin bicara, naskah dari dokumen, pengatur waktu.
- **Dua layar**: buka file yang sama di dua jendela; keduanya bergerak bersama, termasuk titik **laser** (`L`).
- **Ikhtisar** (`G`), **baca dokumen penuh** dengan daftar isi (`R`), layar hitam (`B`), lompat slide (`12` lalu `Enter`), bantuan (`?`).
- Peta 12 masukan pada slide 4 dapat diklik untuk lompat ke masukan mana pun.

### Logo

Letakkan `logo-pengayoman.png` dan `logo-ahu.png` (atau `.jpg`/`.svg`) di folder `web/`, lalu jalankan:

```bash
cd presentasi/web && python3 build_web.py
```

Logo otomatis tampil di sampul, penutup, dan kaki setiap slide.

### Isi folder `web/`

- `template.html`: halaman, gaya, dan isi slide.
- `dokumen.json`: isi dokumen terstruktur (hasil ekstraksi .docx, lengkap dengan penomoran).
- `fonts_embedded.css`: font Plus Jakarta Sans dan Source Serif 4 yang ditanam.
- `build_web.py`: menggabungkan semuanya menjadi `Paparan_BHP_Medan.html`.

## 2. Cadangan PowerPoint: `Paparan_BHP_Medan_RUU_Profesi_Kurator.pptx`

48 slide 16:9, memuat seluruh 17 usulan rumusan pasal sesuai dokumen, dengan catatan pembicara.
Dibuat ulang dengan `build_slides.cjs` (pptxgenjs).

Versi Canva awal: https://www.canva.com/d/3PGEyDAsl1neFqh
