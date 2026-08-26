/* ricktew.com service worker. Makes the site installable and keeps the last
   good copy of each page and asset for when the connection drops. Network
   first, always: a fresh deploy must win over the cache, and Pages deploys
   every push. Only same-origin GETs are touched; the Letter Slot's endpoint
   is cross-origin and never passes through here. */
var VERSION = "rt-2026-08-26b";

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(VERSION).then(function (c) {
      return c.addAll(["/", "/aininja/", "/hininja/", "/manifest.webmanifest", "/assets/icons/icon-192.png"]);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.ok && (res.type === "basic")) {
        var copy = res.clone();
        caches.open(VERSION).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) {
        if (hit) return hit;
        if (req.mode === "navigate") return caches.match("/");
        return Response.error();
      });
    })
  );
});
