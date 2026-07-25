# VSCode'a Devir Özeti — İlayda'nın İngilizce Öğrenme Projesi

> **Nasıl kullanılır:** VSCode'da Claude Code eklentisini aç, `english-app` klasörünü aç, ve bu dosyanın tamamını (ya da aşağıdaki "Claude'a ilk mesaj" bölümünü) sohbete yapıştır. Yeni Claude böylece kaldığımız yerden devam eder.

---

## 1. Öğrenci profili (ben — İlayda)

- **Seviye:** Üretimde A2 (basit cümle kurabiliyorum; zayıf noktalarım: `a/an`, zamanlar, olumsuzlar).
- **Hedef:** Dört becerinin (okuma, dinleme, konuşma, yazma) dördünde de native/profesyonel seviye. İngilizceyi iş hayatımda aktif kullanıyorum.
- **Tempo:** Her gün **en az 1 saat** ayırabiliyorum (sınav var diye tempoyu düşürmek istemiyorum).
- **Sınav:** 19-20 Eylül 2026'da aktüerlik sınavım var.
- **Kaynak:** "More to Read" (ODTÜ) kitabından günde 1 paragraf okuyup Claude'a İngilizce anlatıyorum. Kelimeleri bir panele ekliyorum, streak (kesintisiz gün) tutuyorum.
- **Dil tercihi:** Açıklamalar Türkçe + İngilizce örnekler karışık. Kısa ve net anlatım seviyorum.

## 2. Öğrenme yöntemi (kanıta dayalı sistem)

Program **Paul Nation'ın "Dört İplik"** modeline oturuyor (her birine ~%25 zaman): anlam odaklı girdi, anlam odaklı çıktı, dil odaklı öğrenme, akıcılık. Üstüne şu ilkeler entegre:
- **Anlaşılır girdi** (Krashen): %95-98'ini anladığım içerik.
- **Aralıklı tekrar + aktif hatırlama** (Anki/SRS mantığı): önce Türkçeden İngilizceyi hatırlamaya çalışmak.
- **Çıktı hipotezi** (Swain): üretmeye "zorlanınca" öğrenmek — her ders bir üretim adımıyla biter.
- **Shadowing:** telaffuz/akıcılık için gölgeleme.

### Günlük 60 dakikalık modül (6 adım)
1. Isınma (5 dk) — dünkü dersi İngilizce anlat
2. Kelime (10 dk) — SRS kartları + yeni 5-7 kelime
3. Grammar (10 dk) — günün tek kuralı + örnek + mini alıştırma (öncelik: a/an, zamanlar, olumsuzlar)
4. Okuma/Dinleme (15 dk) — More to Read paragrafı + podcast/dizi
5. Üretim (12 dk) — Claude'a anlat / cümle yaz
6. Telaffuz (8 dk) — shadowing

## 3. Şimdiye kadar yapılanlar

- **İlerleme paneli/widget** (Cowork'te) — streak, 6 adım checklist, sınav geri sayımı.
- **Günlük ders hatırlatıcısı** — her gün 20:00 (otomatik).
- **Günlük konuşma seansı** — her gün 21:00, Claude ile sesli konuşma pratiği.
- **Çalışma modülü dökümanı** (Word) — yukarıdaki sistemin detaylı hali + kaynaklar.
- **`english-app` (bu klasör)** — kendi kendine çalışma web uygulaması (PWA).

## 4. Ders durumu (kaldığımız yer)

- **Ders 1** bitti ("work day": a/an, "I haven't ___ yet").
- **Ders 2** yarım kaldı — konu: **Present Simple vs Present Continuous + olumsuzlar**. Bekleyen alıştırmam:
  - `a/an` seç: `___ email`, `___ office`, `___ hour`, `___ report`
  - Çevir: (1) Her sabah maillerimi kontrol ederim. (2) Şu an bir rapor yazıyorum. (3) O, hafta sonları çalışmaz. (4) Bugün toplantıya katılmıyorum.

## 5. `english-app` klasörü (bu proje)

Tarayıcıda çalışan, sunucusuz bir İngilizce çalışma uygulaması. Tüm veri cihazda (localStorage).

| Dosya | Ne işe yarar |
|---|---|
| `index.html` | Tüm uygulama — sekmeler: Bugün, Kelime (SRS), Telaffuz (Web Speech), Plan |
| `manifest.webmanifest` | "Ana ekrana ekle" için PWA ayarları |
| `sw.js` | Çevrimdışı önbellek (service worker) |
| `icon-192.png`, `icon-512.png` | Uygulama simgeleri |
| `README.md` | Kurulum + GitHub Pages yayınlama adımları |

## 6. Sıradaki iş (yeni Claude bununla başlayabilir)

**GitHub'a yükleyip yayınlamak.** GitHub kullanıcı adım: `illaydayldz`. Terminalden:

```bash
# GitHub CLI varsa (en kolay):
gh auth login
gh repo create english-journey --public --source=. --push

# CLI yoksa: önce github.com/new'den boş "english-journey" repo aç, sonra:
git init && git add . && git commit -m "İlk sürüm"
git branch -M main
git remote add origin https://github.com/illaydayldz/english-journey.git
git push -u origin main
```

Sonra: GitHub repo → **Settings → Pages → Branch: main → Save**. Adres: `https://illaydayldz.github.io/english-journey/`

---

## Claude'a ilk mesaj (bunu yapıştır)

> Merhaba! Ben İlayda. Yukarıdaki devir özetini oku — İngilizce öğrenme projemde bana yardım ediyorsun. A2 seviyesindeyim, hedefim native/profesyonel, günde 1 saat çalışıyorum. Bu `english-app` klasörü benim çalışma uygulamam. Önce bu repo'yu GitHub'a (kullanıcı adım: illaydayldz) yüklemede yardım et, sonra yarım kalan Ders 2'ye (Present Simple vs Continuous) devam edelim. Türkçe + İngilizce karışık, kısa ve net anlat.
