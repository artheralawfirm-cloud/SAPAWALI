"""Gabungkan data_interaktif_template.html + font tertanam + logo menjadi satu berkas HTML mandiri.
Jalankan: python3 build_data_interaktif.py"""
import base64, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); WEB = os.path.join(HERE, "..", "web")
t = open(os.path.join(HERE, "data_interaktif_template.html"), encoding="utf8").read()
t = t.replace("/*__FONTS__*/", open(os.path.join(WEB, "fonts_embedded.css"), encoding="utf8").read())
logo = "data:image/png;base64," + base64.b64encode(open(os.path.join(WEB, "logo-pengayoman.png"), "rb").read()).decode()
t = t.replace("/*__LOGO__*/", logo)
assert not re.search("[–—]", t), "masih ada tanda pisah"
out = os.path.join(HERE, "BHP Medan - Tumpang Tindih Kewenangan - Data Interaktif.html")
open(out, "w", encoding="utf8").write(t); print(out, os.path.getsize(out) // 1024, "KB")
