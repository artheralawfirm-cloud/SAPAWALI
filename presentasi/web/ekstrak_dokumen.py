# Ekstraksi .docx -> dokumen.json (sadar tabel dan gambar).
# Pemakaian: python3 ekstrak_dokumen.py Masukan_BHP_Medan_Poin_1_Ringkas.docx dokumen.json
# Gambar grafik disimpan di samping dokumen.json sebagai grafik-1.png, grafik-2.png, dan seterusnya.
import zipfile,re,json,sys,os
src,dst=sys.argv[1],sys.argv[2]
z=zipfile.ZipFile(src)
num=z.read('word/numbering.xml').decode()
absf={}
for a in re.findall(r'<w:abstractNum .*?</w:abstractNum>',num,re.S):
    aid=re.search(r'w:abstractNumId="(\d+)"',a).group(1)
    absf[aid]={int(l):(f,t) for l,f,t in re.findall(r'<w:lvl w:ilvl="(\d)".*?<w:numFmt w:val="([^"]+)"/>.*?<w:lvlText w:val="([^"]*)"/>',a,re.S)}
nmap=dict(re.findall(r'<w:num w:numId="(\d+)"[^>]*><w:abstractNumId w:val="(\d+)"/>',num))
rels=dict(re.findall(r'Id="(rId\d+)"[^>]*Target="([^"]+)"',z.read('word/_rels/document.xml.rels').decode()))
x=z.read('word/document.xml').decode()
body=x[x.find('<w:body>'):]
def roman(n):
    r=''
    for a,s in [(10,'X'),(9,'IX'),(5,'V'),(4,'IV'),(1,'I')]:
        while n>=a:r+=s;n-=a
    return r
def fmt(f,n):
    return {'decimal':str(n),'lowerLetter':'abcdefghijklmnopqrstuvwxyz'[n-1],'upperLetter':'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[n-1],'upperRoman':roman(n)}.get(f,'')
counters={}
def clean(t): return t.replace('\u2013','-').replace('\u2014','-')
def para(s):
    segs=[]
    for r in re.findall(r'<w:r[ >].*?</w:r>',s,re.S):
        parts=re.findall(r'<w:t[^>]*>([^<]*)</w:t>|(<w:br/>)|(<w:tab/>)',r)
        tt=''.join(p[0] if p[0] else ('\n' if p[1] else ('\t' if p[2] else '')) for p in parts)
        if not tt: continue
        f=(1 if re.search(r'<w:b/>|<w:b w:val="1"/>',r) else 0)|(2 if re.search(r'<w:i/>|<w:i w:val="1"/>',r) else 0)
        tt=clean(tt)
        if segs and segs[-1][1]==f: segs[-1][0]+=tt
        else: segs.append([tt,f])
    t=''.join(q[0] for q in segs)
    st=re.search(r'<w:pStyle w:val="([^"]+)"',s); np=re.search(r'<w:ilvl w:val="(\d)"/>.*?<w:numId w:val="(\d+)"',s,re.S)
    al=re.search(r'<w:jc w:val="([^"]+)"',s)
    img=re.search(r'r:embed="([^"]+)"',s)
    label='';lv=None;nid=None
    if np and t.strip():
        lv=int(np.group(1)); nid=np.group(2); a=nmap[nid]
        c=counters.setdefault(nid,[0]*9); c[lv]+=1
        for k in range(lv+1,9): c[k]=0
        f,tx=absf[a].get(lv,('decimal','%1.'))
        if f!='bullet': label=re.sub(r'%(\d)',lambda mm: fmt(absf[a][int(mm.group(1))-1][0], c[int(mm.group(1))-1]),tx)
    return {'text':t,'segs':segs,'style':st.group(1) if st else '','label':label,'lvl':lv,'num':nid,'align':al.group(1) if al else '','img':img.group(1) if img else None}
raw=[]
for m in re.finditer(r'<w:tbl>.*?</w:tbl>|<w:p[ >].*?</w:p>',body,re.S):
    s=m.group(0)
    if s.startswith('<w:tbl>'):
        raw.append({'table':[para(p) for p in re.findall(r'<w:p[ >].*?</w:p>',s,re.S) if para(p)['text'].strip()]})
    else:
        p=para(s)
        if p['text'].strip() or p['img']: raw.append(p)

out=[]; sec=''; nimg=0; signing=False
def bold(o): return o['segs'] and all(s[1]&1 for s in o['segs'] if s[0].strip())
for o in raw:
    if 'table' in o:
        # kartu usulan pasal: baris judul "Pasal A (Kedudukan BHP)" lalu ayat "(1)<tab>..."
        out.append({'k':'cs'})
        for p in o['table']:
            t=p['text'].strip()
            mm=re.match(r'(Pasal \S+)\s*\((.*)\)$',t)
            if mm and p['align']=='center':
                out.append({'k':'ct','s':[[mm.group(1),1]],'l':mm.group(1).split()[1],'m':mm.group(2)}); continue
            ay=re.match(r'(\(\d+\))\t?\s*(.*)$',t,re.S)
            if ay: out.append({'k':'li','l':ay.group(1),'v':0,'s':[[ay.group(2),0]]})
            else: out.append({'k':'p','l':'','s':p['segs']})
        out.append({'k':'ce'}); continue
    if o['img']:
        nimg+=1; name=f'grafik-{nimg}.png'
        open(os.path.join(os.path.dirname(os.path.abspath(dst)),name),'wb').write(z.read('word/'+rels[o['img']]))
        out.append({'k':'img','src':name,'n':nimg}); continue
    t=o['text'].strip(); b={'s':o['segs'],'l':o['label']}
    if not any(q['k']=='h1' for q in out) and o['num'] is None: b['k']='kop'
    elif o['lvl']==0: b['k']='h1'; sec=o['label']
    elif t.startswith('Medan, ') or signing: b['k']='sign'; signing=True
    elif o['lvl'] is not None and sec=='III.' and o['lvl']==1 and bold(o): b['k']='h2'
    elif o['lvl'] is not None: b['k']='li'; b['v']=o['lvl']
    elif o['align']=='center': b['k']='sub'
    elif t.startswith('Analisis.'): b['k']='mb'
    elif bold(o) and len(t)<40: b['k']='h4'
    else: b['k']='p'
    out.append(b)
js=json.dumps(out,ensure_ascii=False,separators=(',',':'))
assert not re.search('[\u2013\u2014]',js)
open(dst,'w').write(js)
from collections import Counter; print(len(out),Counter(b['k'] for b in out))
