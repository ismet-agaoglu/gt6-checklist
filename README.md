# GT6 Checklist

🎯 **HUAWEI GT 6 Pro** - HarmonyOS Watch Checklist Application

## ✨ Özellikler

- ✅ Yapılacaklar Listesi (Create, Read, Update, Delete)
- ✅ Checkbox sistemi ile görev tamamlama
- ✅ REST API Entegrasyonu
- ✅ Dark Mode UI (Cyan tema)
- ✅ Türkçe Arayüz
- ✅ Gerçek Zamanlı Senkronizasyon

## 🏗️ Yapı

```
entry/
├── src/main/
│   ├── config.json          # App Configuration
│   ├── js/MainAbility/
│   │   ├── pages/index/
│   │   │   ├── index.hml    # UI
│   │   │   ├── index.js     # Logic
│   │   │   └── index.css    # Styling
│   │   └── app.js
│   └── resources/
├── build-profile.json5
└── oh-package.json5
```

## 🚀 Kurulum

1. **GitHub'dan Clone**
   ```bash
   git clone https://github.com/ismet-agaoglu/gt6-checklist.git
   cd gt6-checklist
   ```

2. **DevEco'da Aç**
   - File → Open Project → `gt6-checklist/` seçin

3. **Build & Run**
   - Build → Build HAP (Debug)
   - Build → Run (Watch'e yükle)

## 🌐 API

Base URL: `https://inf.alperagayev.com/api`

### Endpoints
- `GET /tasks` - Görevleri listele
- `POST /tasks` - Yeni görev ekle
- `PATCH /tasks/:id` - Görev güncelle
- `DELETE /tasks/:id` - Görev sil

**Header:** `x-user-id: cmlmdy7xw0000la9lcy1p0pd6`

## 📱 Cihaz

- Device: HUAWEI GT 6 Pro
- API: HarmonyOS (LiteWearable)
- Min API: 9, Target: 12

---

**Status:** ✅ Active Development  
**Last Updated:** 2026-02-14
