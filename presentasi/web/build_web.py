"""Gabungkan template.html + dokumen.json + font + ikon (+ logo bila ada) menjadi satu file HTML mandiri.

Logo: letakkan logo-pengayoman.png dan/atau logo-ahu.png (atau .jpg/.svg) di folder ini,
lalu jalankan ulang: python3 build_web.py
"""
import base64, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
P = {
 "left": '<path d="M15 5l-7 7 7 7"/>',
 "right": '<path d="M9 5l7 7-7 7"/>',
 "auto": '<path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
 "doc": '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M10 13h6M10 17h6"/>',
 "grid": '<rect x="3.5" y="4" width="7" height="7" rx="1.5"/><rect x="13.5" y="4" width="7" height="7" rx="1.5"/><rect x="3.5" y="14" width="7" height="7" rx="1.5"/><rect x="13.5" y="14" width="7" height="7" rx="1.5"/>',
 "search": '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
 "laser": '<circle cx="12" cy="12" r="3.2" fill="currentColor"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
 "pres": '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
 "full": '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
 "help": '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 1 1 3.6 2.3c-.8.4-1.2 1-1.2 1.9v.5"/><circle cx="12" cy="17.2" r=".6" fill="currentColor"/>',
 "x": '<path d="M6 6l12 12M18 6L6 18"/>',
 "copy": '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
 "book": '<path d="M4 5.5C6.5 4 9.5 4 12 5.5v14C9.5 18 6.5 18 4 19.5z"/><path d="M20 5.5C17.5 4 14.5 4 12 5.5v14c2.5-1.5 5.5-1.5 8 0z"/>',
 "arrowpath": '<path d="M4 12h15M13 6l6 6-6 6"/>',
 "userspath": '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 14.2c3 .2 5.5 2.6 5.5 5.8"/>',
 "govpath": '<path d="M3 9.5L12 4l9 5.5"/><path d="M4 10h16M6 10v8M10 10v8M14 10v8M18 10v8M3 20.5h18"/>',
 "shieldpath": '<path d="M12 3l7.5 3v6c0 4.6-3.2 7.8-7.5 9-4.3-1.2-7.5-4.4-7.5-9V6z"/><path d="M9 12l2 2 4-4"/>',
 "folderpath": '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
 "gavelpath": '<path d="M13.5 4.5l6 6M10.5 7.5l6 6M12 6l-4.5 4.5 3 3L15 9"/><path d="M9 12l-6 6 1.5 1.5 6-6"/><path d="M13 20h8"/>',
 "scalepath": '<path d="M12 4v16M8 20h8M5 7h14"/><path d="M5 7l-3 6a3 3 0 0 0 6 0z"/><path d="M19 7l-3 6a3 3 0 0 0 6 0z"/>',
 "globepath": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
 "searchpath": '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
 "docpath": '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M10 13h6M10 17h6"/>',
 "bookpath": '<path d="M4 5.5C6.5 4 9.5 4 12 5.5v14C9.5 18 6.5 18 4 19.5z"/><path d="M20 5.5C17.5 4 14.5 4 12 5.5v14c2.5-1.5 5.5-1.5 8 0z"/>',
 "personpath": '<circle cx="12" cy="8" r="3.6"/><path d="M5 20.5c0-3.9 3.1-7 7-7s7 3.1 7 7"/>',
 "coinspath": '<ellipse cx="9" cy="7" rx="6" ry="2.6"/><path d="M3 7v4c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6V7"/><path d="M9 13.6V17c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-4c0-1.4-2.7-2.6-6-2.6"/>',
 "handpath": '<path d="M3 12l4-4 4 2 3-2 7 5"/><path d="M7 8l-1 6 5 5 7-5"/><path d="M11 10l-2 3 3 2"/>',
}
def svg(inner):
    return ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
            'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>')

def logos():
    out = []
    for stem, alt in (("logo-pengayoman", "Logo Kementerian Hukum"), ("logo-ahu", "Logo Direktorat Jenderal AHU")):
        for ext, mime in ((".png", "image/png"), (".jpg", "image/jpeg"), (".jpeg", "image/jpeg"), (".svg", "image/svg+xml"), (".webp", "image/webp")):
            f = os.path.join(HERE, stem + ext)
            if os.path.exists(f):
                out.append({"src": f"data:{mime};base64," + base64.b64encode(open(f, "rb").read()).decode(), "alt": alt})
                break
    return out

t = open(os.path.join(HERE, "template.html"), encoding="utf8").read()
t = t.replace("/*__FONTS__*/", open(os.path.join(HERE, "fonts_embedded.css"), encoding="utf8").read())
t = t.replace("/*__SLIDES__*/", open(os.path.join(HERE, "slides.js"), encoding="utf8").read())
t = t.replace("/*__DOC__*/[]", open(os.path.join(HERE, "dokumen.json"), encoding="utf8").read())
L = logos()
t = t.replace("/*__LOGOS__*/[]", json.dumps(L))
icons = dict(P); icons["doc"] = svg(P["doc"])
t = t.replace("/*__ICONS__*/{}", json.dumps(icons))
t = re.sub(r"__I_(\w+)__", lambda m: svg(P[m.group(1)]), t)
assert not re.search(r"[–—]", t), "masih ada tanda pisah"
out = os.path.join(HERE, "Paparan_BHP_Medan.html")
open(out, "w", encoding="utf8").write(t)
print(f"{out}: {os.path.getsize(out)//1024} KB, logo: {len(L)}")
