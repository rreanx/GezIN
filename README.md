# GezIN Planner 🗺️

> Türkiye'yi keşfet — AI destekli seyahat rehberi, rezervasyon ve topluluk platformu.  
> Explore Türkiye — AI-powered travel guide, booking and community platform.

---

## 🇹🇷 Türkçe

### Proje Nedir?
GezIN, Türkiye içi seyahatleri kolaylaştırmak için tasarlanmış bir mobil uygulamadır. Yapay zeka destekli rota önerileri, toplu taşıma entegrasyonu, otel/restoran rezervasyonu ve kullanıcı topluluğunu tek platformda birleştirir.

### Özellikler
- 🤖 **AI Rota Üretimi** — OpenAI GPT-4o ile kişiselleştirilmiş gezi planları
- 🗺️ **Şehir Rehberleri** — Ankara, İstanbul, İzmir, Antalya, Samsun, Eskişehir ve daha fazlası
- 🏨 **Rezervasyon** *(geliştiriliyor)* — Otel, restoran, aktivite
- 🚌 **Toplu Taşıma** *(geliştiriliyor)* — TCDD, metro, otobüs entegrasyonu
- 👥 **Topluluk** *(geliştiriliyor)* — Kullanıcı yorumları ve öneri sistemi
- 🌙 **Dark / Light Tema** — Otomatik tema desteği

### Teknoloji Yığını
| Katman | Teknoloji |
|--------|-----------|
| Frontend | React + Vite + TypeScript |
| UI | Tailwind CSS + shadcn/ui |
| Backend | Express 5 + TypeScript |
| AI | OpenAI GPT-4o (SSE Streaming) |
| Veritabanı | PostgreSQL + Drizzle ORM |
| Monorepo | PNPM Workspace |

### Proje Yapısı
```
GezIN-Planner/
├── artifacts/
│   ├── mockup-sandbox/     # React UI (Frontend)
│   └── api-server/         # Express API (Backend)
└── lib/
    ├── db/                 # Drizzle şemaları
    ├── api-spec/           # OpenAPI tanımları
    └── integrations-openai-ai-server/  # OpenAI wrapper
```

### Kurulum

```bash
# Bağımlılıkları yükle
pnpm install

# Geliştirme sunucusunu başlat
pnpm dev
```

### Environment Variables
```env
AI_INTEGRATIONS_OPENAI_API_KEY=sk-...
AI_INTEGRATIONS_OPENAI_BASE_URL=https://api.openai.com/v1
DATABASE_URL=postgresql://...
GOOGLE_MAPS_API_KEY=...   # henüz kullanılmıyor
```

### Geliştirme Yol Haritası
- [x] Mockup UI tamamlandı
- [x] AI rota üretimi (SSE streaming)
- [x] GitHub entegrasyonu
- [ ] Expo Go mobil test (ngrok tunnel)
- [ ] Google Maps entegrasyonu
- [ ] Auth sistemi (Clerk / Supabase)
- [ ] Rezervasyon API'leri
- [ ] Topluluk özellikleri

---

## 🇬🇧 English

### What is GezIN?
GezIN is a mobile application designed to simplify travel within Türkiye. It combines AI-powered route suggestions, public transportation integration, hotel/restaurant booking, and a user community into a single platform.

### Features
- 🤖 **AI Route Generation** — Personalized travel plans via OpenAI GPT-4o
- 🗺️ **City Guides** — Ankara, Istanbul, Izmir, Antalya, Samsun, Eskişehir and more
- 🏨 **Booking** *(in development)* — Hotels, restaurants, activities
- 🚌 **Public Transport** *(in development)* — TCDD, metro, bus integration
- 👥 **Community** *(in development)* — User reviews and recommendations
- 🌙 **Dark / Light Theme** — Automatic theme support

### Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + TypeScript |
| UI | Tailwind CSS + shadcn/ui |
| Backend | Express 5 + TypeScript |
| AI | OpenAI GPT-4o (SSE Streaming) |
| Database | PostgreSQL + Drizzle ORM |
| Monorepo | PNPM Workspace |

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Roadmap
- [x] Mockup UI complete
- [x] AI route generation (SSE streaming)
- [x] GitHub integration
- [ ] Expo Go mobile testing (ngrok tunnel)
- [ ] Google Maps integration
- [ ] Auth system (Clerk / Supabase)
- [ ] Booking APIs
- [ ] Community features

---

> Geliştirici / Developer: **ibrahim Yağlı**  
> Başlangıç / Started: 2026
