const CATS = ["Nasional","Dunia","Teknologi","Ekonomi","Olahraga","Hiburan"];
const CAT_COLOR = {Nasional:"#c1121f",Dunia:"#1d4ed8",Teknologi:"#7c3aed",Ekonomi:"#047857",Olahraga:"#ea580c",Hiburan:"#db2777"};
const CAT_EMOJI = {Nasional:"🏛️",Dunia:"🌍",Teknologi:"💻",Ekonomi:"💰",Olahraga:"⚽",Hiburan:"🎬"};

function fmtDate(iso){
  try{ return new Date(iso).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}); }
  catch(e){ return iso; }
}
function todayID(){
  return new Date().toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
}
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

async function loadArticles(){
  const res = await fetch("data/articles.json",{cache:"no-store"});
  if(!res.ok) return [];
  return res.json();
}

function cardHTML(a){
  const c = CAT_COLOR[a.category]||"#111";
  const thumb = a.image
    ? `<img src="${a.image}" alt="" loading="lazy">`
    : (CAT_EMOJI[a.category]||"📰");
  return `<a class="card" href="artikel/${a.slug}.html">
    <div class="thumb" style="background:linear-gradient(135deg,${c},#111)">${thumb}</div>
    <div class="body">
      <div class="kicker" style="color:${c}">${esc(a.category)}</div>
      <h2>${esc(a.title)}</h2>
      <div class="meta">${fmtDate(a.date)} · ${esc(a.read_time||"3 menit baca")}</div>
    </div></a>`;
}

async function renderHome(){
  const list = await loadArticles();
  document.getElementById("dateline").textContent = todayID();
  const nav = document.getElementById("catnav");
  nav.innerHTML = `<button class="chip active" data-cat="Semua">Semua</button>` +
    CATS.map(c=>`<button class="chip" data-cat="${c}">${c}</button>`).join("");
  nav.addEventListener("click",e=>{
    const b = e.target.closest(".chip"); if(!b) return;
    nav.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    renderList(list, b.dataset.cat);
  });
  renderList(list,"Semua");
}

function renderList(list,cat){
  const f = cat==="Semua" ? list : list.filter(a=>a.category===cat);
  const hero = document.getElementById("hero");
  const wrap = document.getElementById("list");
  if(!f.length){
    hero.innerHTML = "";
    wrap.innerHTML = `<div class="empty">📰 Belum ada artikel di kategori ini.<br>Artikel pertama segera terbit — pantau terus KabarKala!</div>`;
    return;
  }
  const [first,...rest] = f;
  const c = CAT_COLOR[first.category]||"#111";
  hero.innerHTML = `<a href="artikel/${first.slug}.html"><div class="hero">
    <div class="grad" style="background:linear-gradient(160deg,${c}cc,#111111ee)"></div>
    <div class="txt"><span class="badge" style="background:${c}">${esc(first.category)}</span>
    <h1>${esc(first.title)}</h1>
    <div class="meta">${fmtDate(first.date)} · ${esc(first.excerpt||"")}</div></div></div></a>`;
  wrap.innerHTML = rest.length
    ? `<div class="sec-title">Berita Terkini</div>` + rest.map(cardHTML).join("")
    : `<div class="empty">Itu dia artikel terbaru kami. Artikel berikutnya segera terbit!</div>`;
}

document.addEventListener("DOMContentLoaded",()=>{
  if(document.getElementById("list")) renderHome();
  const d = document.getElementById("dateline"); if(d && !document.getElementById("list")) d.textContent = todayID();
  bumpViewCount();
  initCarousel();
  initReactions();
});

/* ---- Carousel dots ---- */
function initCarousel(){
  const track = document.getElementById("track");
  if(!track) return;
  const dots = document.getElementById("dots");
  const n = track.children.length;
  for(let i=0;i<n;i++){ const s=document.createElement("span"); if(i===0)s.className="on"; dots.appendChild(s); }
  track.addEventListener("scroll",()=>{
    const w = track.children[0].offsetWidth + 14;
    const i = Math.max(0, Math.min(n-1, Math.round(track.scrollLeft/w)));
    [...dots.children].forEach((d,j)=>d.classList.toggle("on", j===i));
  },{passive:true});
}

/* ---- Tombol reaksi (tanpa daftar, via Abacus API) ---- */
async function initReactions(){
  const wrap = document.getElementById("react");
  if(!wrap || !wrap.dataset.slug) return;
  const slug = wrap.dataset.slug;
  const get = async k => { try{ const r=await fetch(`${COUNT_API}/get/${COUNT_NS}/${slug}-${k}`); const j=await r.json(); return Number(j.value)||0; }catch(e){ return 0; } };
  const hit = async k => { try{ const r=await fetch(`${COUNT_API}/hit/${COUNT_NS}/${slug}-${k}`); const j=await r.json(); return Number(j.value)||0; }catch(e){ return null; } };
  const btns = [...wrap.querySelectorAll("button")];
  for(const b of btns){ const el = wrap.querySelector("#c-"+b.dataset.r); if(el) el.textContent = (await get(b.dataset.r)).toLocaleString("id-ID"); }
  btns.forEach(b=>b.addEventListener("click", async ()=>{
    if(b.classList.contains("voted")) return;
    const v = await hit(b.dataset.r);
    if(v!==null){ const el = wrap.querySelector("#c-"+b.dataset.r); if(el) el.textContent = v.toLocaleString("id-ID"); b.classList.add("voted"); }
  }));
}
/* ---- Penghitung views tanpa daftar (via Abacus API) ---- */
const COUNT_API = "https://abacus.jasoncameron.dev";
const COUNT_NS = "kabarkala";
async function bumpViewCount(){
  const el = document.querySelector(".viewcount");
  if(!el || !el.dataset.slug) return;
  try{
    const res = await fetch(`${COUNT_API}/hit/${COUNT_NS}/${encodeURIComponent(el.dataset.slug)}`);
    if(!res.ok) throw new Error("count fail");
    const j = await res.json();
    el.textContent = `👁️ ${Number(j.value).toLocaleString("id-ID")} dibaca`;
  }catch(e){ el.style.display = "none"; }
}
