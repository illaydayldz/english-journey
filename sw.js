// Basit çevrimdışı önbellek — app kabuğunu saklar
const CACHE = "english-app-v107-xfer";
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

// ---- Arka plan hatırlatma (Android, periodicSync) ----
const AWAY_TXT = [
  [14, "Moonie hayalet oldu…", "Gel, küçük bir adımla onu geri getir."],
  [10, "Moonie eriyip gitti", "5 dakika onu kurtarır."],
  [6, "Moonie öfkeden yanıyor!", "Barışmak için bugün bir şey çalış."],
  [4, "Moonie küstü!", "Küçük bir görev yap, affedeyim."],
  [3, "Moonie ağlıyor…", "Üç gündür seni bekliyor."],
  [2, "Seni özledim…", "5 dakika yeter, hadi başlayalım."]
];
const ALT_BODY = {14:["Hayalet Moonie hâlâ seni bekliyor."],10:["Neredeyse sadece kemikleri kaldı, kurtar onu!"],6:["Alev alev yanıyor, söndürmek için bir görev yap."],4:["Hmph! Gel de barışalım."],3:["Gözleri yaşardı. Bir kelime yeter."],2:["Dün gelmedin, biraz üzüldü."]};
const FOCUS_TXT = {14:["Yeniden başlama zamanı","2 hafta oldu. Bugün ilk adımı at."],10:["Neredeyse sıfırdayız","Tek bir 5 dakikalık oturumla başla."],6:["Bu gidişle olmaz","Bugün sıfırla ve yeniden başla."],4:["Hedeften sapıyorsun","Bir görev yap, hemen."],3:["Ritim bozuluyor","Tek görevle geri dön."],2:["Seri tehlikede","5 dakika ile toparla."]};
function parseDay(x) { const p = (x || "").split("-"); return p.length === 3 ? new Date(+p[0], +p[1] - 1, +p[2]) : null; }
self.addEventListener("periodicsync", (e) => {
  if (e.tag !== "moonie-away") return;
  e.waitUntil((async () => {
    try {
      const c = await caches.open("moonie-state");
      const r = await c.match("./__state.json"); if (!r) return;
      const st = await r.json(); if (!st.on) return;
      let ref = parseDay(st.lastActive) || parseDay(st.lastDone); if (!ref) return;
      const l = parseDay(st.lastDone); if (l && l > ref) ref = l;
      const t = new Date(); t.setHours(0, 0, 0, 0);
      const days = Math.round((t - ref) / 86400000);
      const tier0 = AWAY_TXT.find((x) => days >= x[0]); if (!tier0) return;
      const alts = st.focus ? [] : (ALT_BODY[tier0[0]] || []); const pool = [tier0[2]].concat(alts); const f = FOCUS_TXT[tier0[0]]; const tier = st.focus && f ? [tier0[0], f[0], f[1]] : [tier0[0], tier0[1], pool[Math.floor(Math.random() * pool.length)]];
      const key = t.toDateString();
      if (st.notified === key) return;
      st.notified = key; await c.put("./__state.json", new Response(JSON.stringify(st), { headers: { "Content-Type": "application/json" } }));
      await self.registration.showNotification(tier[1], { body: tier[2], icon: "./icon-192-v4.png", badge: "./icon-192-v4.png", tag: "moonie-away", data: { url: "./index.html?go=today" } });
    } catch (err) {}
  })());
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "./index.html?go=today";
  e.waitUntil(self.clients.matchAll({ type: "window" }).then((cl) => { for (const c of cl) { if ("focus" in c) { c.navigate(url).catch(() => {}); return c.focus(); } } return self.clients.openWindow(url); }));
});
