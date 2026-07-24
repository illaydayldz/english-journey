# 🇬🇧 My English Journey

Kanıta dayalı, günde 1 saatlik İngilizce çalışma app'i. Tamamen tarayıcıda çalışır — sunucu yok, hesap yok, tüm verin **kendi cihazında** saklanır. Telefonuna "ana ekrana ekle" ile gerçek bir uygulama gibi kurabilirsin.

## İçinde ne var?

- **🏠 Bugün** — streak (kesintisiz gün), toplam gün, sınava geri sayım ve 6 adımlı günlük ders checklist'i.
- **🃏 Kelime** — kendi kelimelerini ekle, aralıklı tekrar (SRS) ile çalış. Önce Türkçesini görürsün, İngilizcesini hatırlamaya çalışırsın (aktif hatırlama). "Tekrar / Bildim / Kolay" ile kart bir sonraki güne planlanır.
- **🎤 Telaffuz** — bir cümle yaz ya da hazır cümle seç → **Dinle** (app doğrusunu seslendirir) → **Konuş** (app mikrofonla dinler, ne kadar doğru söylediğini yüzde olarak verir).
- **📚 Plan** — 60 dakikalık günlük modül + haftalık odak tablosu + veri yedekleme (dışa/içe aktar).

> Not: **Claude ile konuşma pratiği** ayrıdır — onu Cowork'te yaparsın. Bu app kendi kendine çalışma (kelime, telaffuz, ilerleme) içindir. İkisi birbirini tamamlar.

## Bilgisayarda hemen denemek

Sadece `index.html`'i çift tıkla — çoğu şey çalışır. Ancak **telaffuz (mikrofon)** ve **ana ekrana ekleme** için `https://` üzerinden açılması gerekir. Bu yüzden GitHub Pages öneriyoruz (bedava, aşağıda).

## GitHub'a koyup yayınlama (GitHub Pages)

1. github.com'da giriş yap → sağ üstten **New repository**.
2. İsim ver (örn. `english-journey`), **Public** seç, **Create repository**.
3. Açılan sayfada **uploading an existing file** bağlantısına tıkla.
4. Bu klasördeki **tüm dosyaları** sürükle-bırak:
   `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `README.md`
5. **Commit changes**.
6. Repo'da **Settings → Pages** → *Branch* olarak `main` / `/root` seç → **Save**.
7. Birkaç dakika sonra `https://KULLANICIADIN.github.io/english-journey/` adresinde yayında olur.

## Telefona app gibi ekleme

- **iPhone (Safari):** Yayınlanan adresi aç → Paylaş → **Ana Ekrana Ekle**.
- **Android (Chrome):** Adresi aç → menü (⋮) → **Uygulamayı yükle / Ana ekrana ekle**.

Artık ana ekranda bir simge olur; tam ekran, app gibi açılır ve çevrimdışı çalışır.

## Telaffuz özelliği hakkında

Ses tanıma tarayıcının **Web Speech API**'sini kullanır. En iyi **Chrome** (Android/masaüstü) ve Safari'de çalışır. İlk kullanımda **mikrofon izni** ister — izin ver. Ses tanıma yoksa "Dinle" yine çalışır.

## Verini yedekleme

Veriler tarayıcının yerel deposunda (localStorage) tutulur. Tarayıcı verisini silersen kaybolur. **Plan → Veri → Dışa aktar** ile bir `.json` yedeği indir; başka cihazda **İçe aktar** ile geri yükle.

## Kişiselleştirme (opsiyonel)

`index.html` içinde en üstteki ayarlar:
- `EXAM` — sınav tarihin (geri sayım için).
- `GOAL` — alışkanlık hedefi (gün sayısı).
- `STEPS` — günlük ders adımların.
- `PHRASES` — telaffuz için hazır cümleler.

---
Herhangi bir dosyayı elle düzenlemek istersen Cowork'te Claude'a sor — birlikte güncelleriz.
