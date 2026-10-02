# Ekstraksi .docx -> dokumen.json (sadar tabel). Pemakaian: python3 ekstrak_dokumen.py Bahan_Masukan.docx dokumen.json
import zipfile,re,json,sys
src,dst=sys.argv[1],sys.argv[2]
z=zipfile.ZipFile(src)
num=z.read('word/numbering.xml').decode()
absf={}
for a in re.findall(r'<w:abstractNum .*?</w:abstractNum>',num,re.S):
    aid=re.search(r'w:abstractNumId="(\d+)"',a).group(1)
    absf[aid]={int(l):(f,t) for l,f,t in re.findall(r'<w:lvl w:ilvl="(\d)".*?<w:numFmt w:val="([^"]+)"/>.*?<w:lvlText w:val="([^"]*)"/>',a,re.S)}
nmap=dict(re.findall(r'<w:num w:numId="(\d+)"[^>]*><w:abstractNumId w:val="(\d+)"/>',num))
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
def clean(t): return t.replace('–','-').replace('—','-')
def para(s):
    segs=[]
    for r in re.findall(r'<w:r[ >].*?</w:r>',s,re.S):
        tt=''.join(re.findall(r'<w:t[^>]*>([^<]*)</w:t>|<w:br/>',r)) if False else ''
        parts=re.findall(r'<w:t[^>]*>([^<]*)</w:t>|(<w:br/>)',r)
        tt=''.join(p[0] if p[0] else ('\n' if p[1] else '') for p in parts)
        if not tt: continue
        f=(1 if re.search(r'<w:b/>|<w:b w:val="1"/>',r) else 0)|(2 if re.search(r'<w:i/>|<w:i w:val="1"/>',r) else 0)
        tt=clean(tt)
        if segs and segs[-1][1]==f: segs[-1][0]+=tt
        else: segs.append([tt,f])
    t=''.join(q[0] for q in segs)
    st=re.search(r'<w:pStyle w:val="([^"]+)"',s); np=re.search(r'<w:ilvl w:val="(\d)"/>.*?<w:numId w:val="(\d+)"',s,re.S)
    al=re.search(r'<w:jc w:val="([^"]+)"',s)
    label='';lv=None;nid=None
    if np and t.strip():
        lv=int(np.group(1)); nid=np.group(2); a=nmap[nid]
        c=counters.setdefault(nid,[0]*9); c[lv]+=1
        for k in range(lv+1,9): c[k]=0
        f,tx=absf[a].get(lv,('decimal','%1.'))
        if f!='bullet': label=re.sub(r'%(\d)',lambda mm: fmt(absf[a][int(mm.group(1))-1][0], c[int(mm.group(1))-1]),tx)
    return {'text':t,'segs':segs,'style':st.group(1) if st else '','label':label,'lvl':lv,'num':nid,'align':al.group(1) if al else ''}
raw=[]
for m in re.finditer(r'<w:tbl>.*?</w:tbl>|<w:p[ >].*?</w:p>',body,re.S):
    s=m.group(0)
    if s.startswith('<w:tbl>'):
        rows=[]
        for tr in re.findall(r'<w:tr[ >].*?</w:tr>',s,re.S):
            cells=[]
            for tc in re.findall(r'<w:tc>.*?</w:tc>',tr,re.S):
                sp=re.search(r'<w:gridSpan w:val="(\d+)"/>',tc)
                ps=[para(p) for p in re.findall(r'<w:p[ >].*?</w:p>',tc,re.S)]
                cells.append({'span':int(sp.group(1)) if sp else 1,'ps':[p for p in ps if p['text'].strip()]})
            rows.append(cells)
        ncol=max(len(r) for r in rows)
        raw.append({'table':rows,'ncol':ncol})
    else:
        p=para(s)
        if p['text'].strip(): raw.append(p)

out=[]
def plain(p): return p['text']
sec=None; pending_lt=None; i_par=0
for o in raw:
    if 'table' in o:
        if o['ncol']==1:
            out.append({'k':'cs'})
            first=True
            for row in o['table']:
                for p in row[0]['ps']:
                    t=p['text'].strip()
                    if first and t=='USULAN RUMUSAN PASAL':
                        first=False
                        ct={'k':'ct','s':[[pending_lt['title'],1]],'l':pending_lt['n'],'m':pending_lt['m']}
                        out.append(ct); continue
                    b={'s':p['segs'],'l':p['label']}
                    if t.startswith('Usulan penjelasan'): b['k']='note'
                    elif t.startswith('Terkait huruf'): b['k']='csub'
                    elif p['align']=='center': b['k']='cc'
                    elif p['label']: b['k']='li'; b['v']=p['lvl']
                    else: b['k']='p'
                    out.append(b)
            out.append({'k':'ce'})
        else:
            rows=[[{'s':[s for p in c['ps'] for s in (p['segs']+[['\n',0]])][:-1] if c['ps'] else [['',0]],'sp':c['span'],'a':(c['ps'][0]['align'] if c['ps'] else '')} for c in r] for r in o['table']]
            out.append({'k':'tbl','id':'ringkasan' if sec=='II' else 'sistematika','rows':rows})
        continue
    t=o['text'].strip(); b={'s':o['segs'],'l':o['label']}
    n=len([q for q in out if q['k'] in('kop','judul')]) if out else 0
    if not out or (len(out)<6 and out[-1]['k']=='kop'): b['k']='kop'
    elif len(out)<10: b['k']='judul'
    elif o['style']=='Heading1':
        b['k']='h1'; sec=o['label'].rstrip('.') or t
    elif o['style']=='ListParagraph' and sec=='LAMPIRAN I':
        mm=re.match(r'(.*?)\s*\((Masukan angka [^)]*)\)\s*$',t)
        pending_lt={'n':o['label'],'title':mm.group(1) if mm else t,'m':mm.group(2) if mm else ''}
        continue
    elif t.startswith('Masukan BHP Medan:'): b['k']='mb'
    elif t.startswith('Usulan rumusan pasal: lihat Lampiran I angka'):
        b['k']='ref'; b['n']=re.search(r'angka (\d+)',t).group(1)+'.'
    elif t.startswith('“Yang dapat'): b['k']='quote'
    elif t.startswith('(Pasal 234 ayat (3)'): b['k']='cite'
    elif t in('Medan, 1 Oktober 2026','Kepala,','Syafriadi Lubis'): b['k']='sign'
    elif o['num']=='11' and o['lvl']==1: b['k']='h2'
    elif o['label'] and all(s[1]&1 for s in o['segs']) and (o['num']=='13' or (o['num']=='11' and o['lvl']==2)): b['k']='h3'; b['v']=o['lvl']
    elif o['label']: b['k']='li'; b['v']=o['lvl']
    elif o['align']=='center': b['k']='sub'
    else: b['k']='p'
    out.append(b)
js=json.dumps(out,ensure_ascii=False,separators=(',',':'))
assert not re.search('[–—]',js)
open(dst,'w').write(js)
from collections import Counter; print(len(out),Counter(b['k'] for b in out))
