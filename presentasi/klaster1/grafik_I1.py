import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import rcParams
rcParams["font.family"]="DejaVu Sans"
MAROON="#7B1E2B"; GOLD="#C9A24A"; GREY="#8a8a8a"; INK="#333333"
rows=[("Gwe Tjoen",25.66,8.00,None),("CV Hitado",1.94,0.41,None),("PT Pro Mekanika Indonusa",2.75,2.45,"hasil bersih"),("Badaruddin HSB",2.30,0.93,None),
      ("Suparjo Rustam",0.28,None,"belum dinilai"),("PT Rimba Cipta Niaga",None,None,"belum dinilai"),("PT Rata Makmur",1.43,0.17,None),("KSO Maju Abadi",4.29,9.96,None),("Frans Winner",8.70,None,"belum dinilai")]
fig,ax=plt.subplots(figsize=(19.39,10.76),dpi=100)
h=0.36; ys=list(range(len(rows)))[::-1]
f=lambda v: f"{v:.2f}".replace(".",",")
for y,(n,t,hv,note) in zip(ys,rows):
    if t is not None:
        ax.barh(y+h/2,t,height=h,color=GOLD); ax.text(t+0.2,y+h/2,f(t),va="center",fontsize=19,color=INK)
    else:
        ax.text(0.2,y+h/2,"tidak ada kreditor diakui",va="center",fontsize=19,color=INK)
    if hv is not None:
        ax.barh(y-h/2,hv,height=h,color=MAROON)
        ax.text(hv+0.2,y-h/2,f(hv)+(f" ({note})" if note else ""),va="center",fontsize=19,color=MAROON)
    else:
        ax.text(0.2,y-h/2,"belum dinilai",va="center",fontsize=19,color=GREY)
ax.set_yticks(ys); ax.set_yticklabels([r[0] for r in rows],fontsize=21,color=INK)
ax.set_xlim(0,30); ax.set_xlabel("Rp miliar",fontsize=21,color=INK); ax.tick_params(axis="x",labelsize=19,colors=INK)
for s in ["top","right"]: ax.spines[s].set_visible(False)
ax.spines["left"].set_color("#cccccc"); ax.spines["bottom"].set_color("#cccccc")
ax.grid(axis="x",color="#e6e6e6"); ax.set_axisbelow(True)
from matplotlib.patches import Patch
ax.legend(handles=[Patch(color=GOLD,label="Jumlah tagihan"),Patch(color=MAROON,label="Nilai harta tercatat")],loc="lower right",fontsize=21,frameon=False)
fig.suptitle("Tagihan kreditor dan nilai harta tercatat pada 9 perkara BHP Medan",fontsize=30,fontweight="bold",color=MAROON,y=0.975)
ax.set_title("Pada 4 perkara yang sudah dinilai, harta hanya 12% sampai 40% dari tagihan",fontsize=21,color="#555555",pad=14)
fig.tight_layout(rect=[0,0,1,0.95])
fig.savefig("grafik1_baru.png",dpi=100)
print("ok")
