const CACHE="huerta-index-v2";
const ASSETS=[
  "./index.html",
  "./manifest-index.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./favicon-32.png"
];

self.addEventListener("install",e=>{
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(err=>console.warn("cache addAll:",err)))
  );
});

self.addEventListener("activate",e=>{
  e.waitUntil(Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&k.startsWith("huerta-index-")).map(k=>caches.delete(k)))),
    self.clients.claim()
  ]));
});

self.addEventListener("fetch",e=>{
  const req=e.request;
  if(req.method!=="GET")return;
  const url=new URL(req.url);
  if(url.origin!==location.origin)return;
  // Estrategia: cache-first sólo para los archivos del index
  // Para todo lo demás (diseno.html, asistente.html, etc.) dejar que su propio SW lo maneje
  e.respondWith(
    caches.match(req).then(cached=>{
      if(cached)return cached;
      return fetch(req).then(res=>{
        // Cachear sólo si es uno de los archivos esperados
        if(res.ok){
          const path=url.pathname;
          if(path.endsWith("/")||path.endsWith("/index.html")||
             path.endsWith("/manifest-index.json")||
             path.endsWith("/favicon-32.png")||
             path.endsWith("/icon-192.png")||
             path.endsWith("/icon-512.png")||
             path.endsWith("/icon-512-maskable.png")){
            const copy=res.clone();
            caches.open(CACHE).then(c=>c.put(req,copy));
          }
        }
        return res;
      });
    })
  );
});
