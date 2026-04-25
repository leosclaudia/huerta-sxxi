const CACHE="huerta-diseno-v3";
const ASSETS=["./","./diseno.html","./manifest-diseno.json","./icon-192.png","./icon-512.png","./favicon-32.png"];

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
  if(url.hostname.includes("generativelanguage.googleapis.com"))return;
  e.respondWith(
    caches.match(req).then(cached=>cached||fetch(req).then(res=>{
      if(res.ok&&url.origin===location.origin){
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(req,copy));
      }
      return res;
    }).catch(()=>cached))
  );
});
