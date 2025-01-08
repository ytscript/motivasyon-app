# 🌟 Daily Quote - Motivasyon & Hedef Takip Uygulaması

Günlük motivasyon sözleri, hedef takibi ve kişisel gelişim için tasarlanmış mobil uygulama.

## 📱 Özellikler

- 📖 Günlük motivasyon sözleri
- 🎯 Hedef belirleme ve takip
- 📚 Kitap önerileri
- 🌓 Karanlık/Aydınlık tema desteği
- 💾 Çevrimdışı kullanım
- ⭐ Favori alıntılar
- 🔍 Kategori bazlı arama
- 📊 İlerleme takibi

## 🛠️ Teknolojiler

- React Native / Expo
- TypeScript
- SQLite
- Zustand
- React Navigation
- Expo Router
- AsyncStorage

## 🚀 Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/kullaniciadi/daily-quote.git
cd daily-quote
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Uygulamayı başlatın:

```bash
npx expo start
```

Çıktıda, uygulamayı şunlarda açma seçeneklerini bulacaksınız:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## 📱 Uygulama Kullanımı

1. **Motivasyon Sözleri**

   - Ana ekranda günlük motivasyon sözlerini görüntüleyin
   - Sözleri kategorilere göre filtreleyebilirsiniz
   - Beğendiğiniz sözleri favorilere ekleyin

2. **Hedef Takibi**

   - Yeni hedef ekleyin
   - Hedeflerinizi kategorize edin
   - İlerleme durumunuzu güncelleyin
   - Tamamlanan hedefleri işaretleyin

3. **Kitap Önerileri**
   - Kişisel gelişim kitaplarını keşfedin
   - Okuma listesi oluşturun
   - Kitap değerlendirmeleri yapın

## 📁 Proje Yapısı

```
src/
├── components/     # Yeniden kullanılabilir bileşenler
├── screens/        # Uygulama ekranları
├── navigation/     # Navigasyon yapılandırması
├── store/         # Zustand store yönetimi
├── utils/         # Yardımcı fonksiyonlar
├── constants/     # Sabit değerler
├── types/         # TypeScript tipleri
└── assets/        # Resimler ve diğer medya dosyaları
```

## 🔄 Veritabanı Şeması

```sql
-- Temel tablolar ve ilişkiler
users
  ├── id
  ├── username
  ├── email
  └── created_at

quotes
  ├── id
  ├── text
  ├── author
  ├── category
  └── created_at

goals
  ├── id
  ├── user_id
  ├── title
  ├── description
  ├── deadline
  └── progress
```

## 🌐 API Dokümantasyonu

API endpoint'leri ve kullanımları için [API.md](docs/API.md) dosyasını inceleyebilirsiniz.

## 🧪 Test

```bash
npm run test
```

## 🚀 Deployment

Production build oluşturmak için:

```bash
npx expo build:android  # Android için
npx expo build:ios     # iOS için
```

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik: Açıklama'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun

## 📚 Faydalı Kaynaklar

- [Expo Dokümantasyonu](https://docs.expo.dev/)
- [React Native Dokümantasyonu](https://reactnative.dev/)
- [TypeScript Dokümantasyonu](https://www.typescriptlang.org/docs/)
- [Zustand Dokümantasyonu](https://github.com/pmndrs/zustand)

---
(henüz tamamlanmamış ve bir çok eksiği olan bir proje olduğunu unutmayın)
⭐️ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

```

Bu güncellenmiş README dosyası:
- Expo ile ilgili spesifik bilgileri içeriyor
- Test ve deployment bölümleri eklendi
- Faydalı kaynaklar bölümü eklendi
- API dokümantasyonu referansı eklendi
- Discord topluluğu bağlantısı eklendi

İsterseniz başka eklemeler veya düzenlemeler yapabiliriz.
```
