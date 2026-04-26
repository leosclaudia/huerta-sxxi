const CACHE="huerta-index-v1";
const ASSETS=["./","./index.html","./manifest-index.json","./icon-192.png","./icon-512.png","./favicon-32.png"];

self.addEventListener("install",e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})));
});

self.addEventListener("activate",e=>{
  e.waitUntil(Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),
    self.clients.claim()
  ]));
});

self.addEventListener("fetch",e=>{
  const req=e.request;
  if(req.method!=="GET")return;
  const url=new URL(req.url);
  // Sólo manejar requests del propio scope (la portada + íconos)
  // Las apps internas (diseno.html, asistente.html) tienen sus propios SW
  if(url.origin!==location.origin)return;
  // No interferir con las otras apps
  if(url.pathname.endsWith("diseno.html")||
     url.pathname.endsWith("asistente.html")||
     url.pathname.includes("manifest-diseno")||
     url.pathname.includes("manifest-asistente")||
     url.pathname.includes("sw-diseno")||
     url.pathname.includes("sw-asistente"))return;
  e.respondWith(
    caches.match(req).then(cached=>cached||fetch(req).then(res=>{
      if(res.ok){
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(req,copy));
      }
      return res;
    }).catch(()=>cached))
  );
});
