// Basit çevrimdışı önbellek — app kabuğunu saklar
const CACHE = "english-app-v101-away";
const ASSETS = [
  "./", "./index.html", "./manifest.webmanifest", "./icon-192-v4.png", "./icon-512-v4.png",
  "./assets/reading-library.json",
  "./assets/pdfjs/pdf.min.js",
  "./assets/pdfjs/pdf.worker.min.js",
  "./assets/mascot/hero-happy.webp",
  "./assets/mascot/pose-motivated.webp",
  "./assets/mascot/pose-goodjob.webp",
  "./assets/mascot/pose-greatprogress.webp",
  "./assets/mascot/pose-goalachieved.webp",
  "./assets/mascot/pose-learning.webp",
  "./assets/mascot/pose-todo.webp",
  "./assets/mascot/pose-speak.webp",
  "./assets/mascot/pose-goal.webp",
  "./assets/mascot/pose-reading.webp",
  "./assets/mascot/pose-sleepy.webp",
  "./assets/mascot/pose-writing.webp",
  "./assets/mascot/pose-listening.webp",
  "./assets/mascot/pose-newword.webp",
  "./assets/mascot/pose-happy2.webp",
  "./assets/mascot/pose-proud.webp",
  "./assets/mascot/pose-cheering.webp",
  "./assets/mascot/pose-confused.webp",
  "./assets/mascot/extra-pencil.webp",
  "./assets/mascot/extra-flying.webp"
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
  const isNav = e.request.mode === "navigate" || e.request.url.endsWith("/index.html") || e.request.url.endsWith(".webmanifest") || e.request.url.includes("/mascot/hd/index.json");
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
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {}); }
      return res;
    }).catch(() => caches.match("./index.html")))
  );
});
