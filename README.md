# Kahveborsam

Kahveborsam, Nuxt 3 ve Firebase üzerinde geliştirilen kahve temalı e-ticaret deneyimidir. Kullanıcı kimlik doğrulaması, ürün listeleme, sepet yönetimi ve temel CRM aksiyonları tek bir monorepo içerisinde toplanmıştır.

## İçindekiler
- [Genel Bakış](#genel-bakış)
- [Öne Çıkan Özellikler](#öne-çıkan-özellikler)
- [Teknoloji Yığını](#teknoloji-yığını)
- [Mimari Özet](#mimari-özet)
- [Kurulum](#kurulum)
- [Ortam Değişkenleri](#ortam-değişkenleri)
- [Geliştirme Komutları](#geliştirme-komutları)
- [Test ve Kalite](#test-ve-kalite)
- [Dağıtım Notları](#dağıtım-notları)
- [Katkıda Bulunma](#katkıda-bulunma)

## Genel Bakış
- **Amaç:** Kahve ürünlerini kategorize eden, kullanıcıya özel deneyim sunan modern bir storefront.
- **Hedef Kitlesi:** Nihai tüketiciler ve içerik editörleri.
- **Durum:** Aktif geliştirme. Üye yönetimi, sepet ve Firestore entegrasyonu hazır.

## Öne Çıkan Özellikler
- Firebase Authentication ile e-posta/şifre tabanlı üyelik.
- Firestore destekli gerçek zamanlı ürün ve sepet senkronizasyonu.
- Pinia store’ları ile merkezi state yönetimi.
- Bootstrap 5 + SCSS ile responsive arayüz.
- Header içerisinden tetiklenen Auth modal & mini sepet.

## Teknoloji Yığını
| Katman | Teknoloji |
| ------ | --------- |
| Framework | Nuxt 3 (Vue 3, Vite) |
| Durum Yönetimi | Pinia |
| Backend-as-a-Service | Firebase Auth + Firestore |
| UI | Bootstrap 5.3, Bootstrap Icons, özel SCSS |
| Dil | TypeScript (strict mode) |

## Mimari Özet
- `pages/`: Route tabanlı sayfalar (ana sayfa, ürün listesi, sepet, hesap vb.)
- `components/`: Header, MiniCart, AuthModal gibi tekrar kullanılabilir UI blokları.
- `stores/`: `auth`, `cart`, `products` gibi Pinia store’ları.
- `boot/firebase.ts`: Firebase bootstrap dosyası (ortam değişkenleriyle beslenir).
- `styles/`: Global SCSS ve bileşen bazlı stiller.

## Kurulum
### Önkoşullar
- Node.js ≥ 18
- npm ≥ 9
- Firebase projesi (Auth & Firestore etkin)

### Adımlar
```bash
npm install
```

## Ortam Değişkenleri
Tüm anahtarlar `NUXT_PUBLIC_` prefix’iyle tanımlanmalı ve `.env` dosyanıza eklenmelidir:
```
NUXT_PUBLIC_FIREBASE_API_KEY=xxxxx
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxx.firebaseapp.com
NUXT_PUBLIC_FIREBASE_PROJECT_ID=kahveborsam-xxxx
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxx.appspot.com
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxxxxxxxxx
NUXT_PUBLIC_FIREBASE_APP_ID=1:xxxx:web:xxxx
```
> Bu değerler Firebase konsolunuzdaki **Project Settings → General** ekranından alınır. Depoda gerçek anahtar tutulmaz.

## Geliştirme Komutları
| Komut | Açıklama |
| ----- | -------- |
| `npm run dev` | Geliştirme sunucusunu `http://localhost:3000` üzerinde başlatır. |
| `npm run build` | Üretim build’i oluşturur. |
| `npm run preview` | Build edilmiş projeyi lokal olarak ön izletir. |

## Test ve Kalite
- **Statik analiz:** Nuxt hazırlık aşamasında tip üretimi yapar. Ek olarak `npm run typecheck` veya `nuxi typecheck` tanımlamak önerilir.
- **Linter:** Proje TypeScript strict modunda çalışır; ek eslint/Prettier entegrasyonu ihtiyaca göre eklenebilir.
- **Manuel test:** Kimlik doğrulama, sepet senkronizasyonu ve UI akışlarını staging ortamında doğrulayın.

## Dağıtım Notları
1. `.env` değerlerinin platform (Vercel, Netlify vb.) üzerinde tanımlı olduğundan emin olun.
2. `npm run build` çıktılarını sunucuya aktarın.
3. Firebase güvenlik kurallarınızı (Firestore rules) production ortamına uygun şekilde güncelleyin.

## Katkıda Bulunma
1. Fork → Branch (`feat/özellik-adi`).
2. Testleri ve lint kontrollerini çalıştırın.
3. Açıklayıcı commit mesajları kullanın.
4. Pull request açarken yapılan değişiklikleri ve test sonuçlarını özetleyin.

Sorularınız için issue açabilir veya doğrudan pull request gönderebilirsiniz. Keyifli katkılar! ☕
