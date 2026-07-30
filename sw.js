// Basit çevrimdışı önbellek — app kabuğunu saklar
const CACHE = "english-app-v7-mascot-recrop";
const ASSETS = [
  "./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png",
  "./assets/reading-library.json",
  "./assets/mascot/hero-happy.png",
  "./assets/mascot/pose-motivated.png",
  "./assets/mascot/pose-goodjob.png",
  "./assets/mascot/pose-greatprogress.png",
  "./assets/mascot/pose-goalachieved.png",
  "./assets/mascot/pose-learning.png",
  "./assets/mascot/pose-reading.png",
  "./assets/mascot/pose-sleepy.png",
  "./assets/mascot/pose-writing.png",
  "./assets/mascot/pose-listening.png",
  "./assets/mascot/pose-newword.png",
  "./assets/mascot/pose-happy2.png",
  "./assets/mascot/pose-proud.png",
  "./assets/mascot/pose-cheering.png",
  "./assets/mascot/pose-confused.png",
  "./assets/mascot/extra-pencil.png",
  "./assets/mascot/extra-flying.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // HTML/navigasyon istekleri: önce ağdan taze kopya dene (her deploy hemen yansısın),
  // sadece çevrimdışıyken önbelleğe düş. Statik varlıklar (ikon/maskot) önbellek-öncelikli kalır.
  const isNav = e.request.mode === "navigate" || e.request.url.endsWith("/index.html") || e.request.url.endsWith(".webmanifest");
  if (isNav) {
    e.respondWith(
      fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(e.request).then((hit) => hit || caches.match("./index.html")))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match("./index.html")))
  );
});
