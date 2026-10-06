const CACHE = "kabarkala-v3";
const SHELL = ["index.html","tentang.html","assets/style.css","assets/app.js","data/articles.json"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  e.respondWith(
    fetch(e.request).then(r=>{ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); return r; })
    .catch(()=>caches.match(e.request).then(m=>m||caches.match("index.html")))
  );
});
