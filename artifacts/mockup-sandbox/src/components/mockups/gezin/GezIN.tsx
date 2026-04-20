import { useState } from "react";
import { Search, MapPin, Heart, Home, Compass, User, Bell, Star, ChevronRight, Bookmark, ArrowLeft, Send, Sparkles } from "lucide-react";

const ORANGE = "#E67E22";
const ORANGE_LIGHT = "#FEF3E8";
const ORANGE_DARK = "#C96A10";

// ─── Static route data ──────────────────────────────────────────────
type Day = {
  title: string;
  items: { icon: string; text: string; highlight?: string }[];
};

type RouteData = {
  city: string;
  days: Day[];
};

const STATIC_ROUTES: Record<string, RouteData> = {
  samsun: {
    city: "Samsun",
    days: [
      {
        title: "1. Gün — Bandırma Vapuru & Atakum Sahili",
        items: [
          { icon: "📍", text: "Sabah erkenden ", highlight: "Bandırma Vapuru Müzesi", text2: "'ni ziyaret et — Kurtuluş Savaşı'nın başlangıç noktası, tarihe adım atmak gibi." },
          { icon: "📸", text: "Öğleden sonra ", highlight: "Atakum Sahili", text2: "boyunca yürüyüş yap, yürüyüş parkurları harika manzara sunuyor." },
          { icon: "🍽️", text: "Akşam sahil restoranlarında ", highlight: "Samsun pilavı ve hamsi tava", text2: " dene — balık burada efsane!" },
        ],
      },
      {
        title: "2. Gün — Amisos Tepesi & Kızılırmak Deltası",
        items: [
          { icon: "📍", text: "Sabah ", highlight: "Amisos Tepesi", text2: "'ne çık — antik tümülüs ve şehrin panoramik manzarası seni bekliyor." },
          { icon: "📸", text: "Öğle sonrası ", highlight: "Kızılırmak Deltası Kuş Cenneti", text2: "'ni keşfet — yüzlerce kuş türü, doğa fotoğrafçıları için cennet." },
          { icon: "🍽️", text: "Akşam şehir merkezinde ", highlight: "Samsun kebabı ve yöresel tatlılar", text2: " için ünlü lokantalara uğra." },
        ],
      },
      {
        title: "3. Gün — Samsun Pidesi & Stadyum Turu",
        items: [
          { icon: "🍽️", text: "Sabah mutlaka ", highlight: "Samsun pidesi", text2: " ye — kaşarlı, tereyağlı, fırından yeni çıkmış. Yemeden gitme!" },
          { icon: "📍", text: "Öğleden sonra ", highlight: "Samsun 19 Mayıs Stadyumu", text2: " çevresinde tur at, büyük parkta dinlen." },
          { icon: "📸", text: "Akşam ", highlight: "Saat Kulesi ve çarşı", text2: " bölgesinde tarihi dokuyu yakala, hediyelik alışverişini tamamla." },
        ],
      },
    ],
  },
  ankara: {
    city: "Ankara",
    days: [
      {
        title: "1. Gün — Anıtkabir & Atatürk'ün izi",
        items: [
          { icon: "📍", text: "Sabah ", highlight: "Anıtkabir", text2: "'i ziyaret et — Türkiye'nin en önemli anıtı, derin bir his bırakıyor." },
          { icon: "📸", text: "Öğleden sonra yakınındaki ", highlight: "Anadolu Medeniyetleri Müzesi", text2: "'ne geç — dünyanın en iyi müzelerinden biri." },
          { icon: "🍽️", text: "Akşam ", highlight: "Kızılay meydanı", text2: " çevresinde Ankara'nın sevilen kebapçılarından birinde ", highlight2: "Ankara tava", text2b: " dene." },
        ],
      },
      {
        title: "2. Gün — Ankara Kalesi & Tarihi Çarşı",
        items: [
          { icon: "📍", text: "Sabah ", highlight: "Ankara Kalesi", text2: "'ne çık — sur duvarları üzerinden tüm şehri gör, tarihi Hisar semtini gez." },
          { icon: "📸", text: "Kale içindeki dar taş sokaklarda ", highlight: "geleneksel el sanatları", text2: " atölyelerini ve bakır ustalarını keşfet." },
          { icon: "🍽️", text: "Öğle yemeğinde yakındaki restoranlarda ", highlight: "Ankara simidi ve kavurma", text2: " mutlaka dene." },
        ],
      },
      {
        title: "3. Gün — Kuğulu Park & Modern Ankara",
        items: [
          { icon: "📍", text: "Sabah sakin ", highlight: "Kuğulu Park", text2: "'ta yürüyüş yap — şehrin ortasında nefes alan yeşil bir cennet." },
          { icon: "📸", text: "Öğleden sonra ", highlight: "Tunalı Hilmi Caddesi", text2: " ve Kavaklıdere'de kafeler, butik dükkanlar, Ankara'nın modern yüzü." },
          { icon: "🍽️", text: "Son akşam için ", highlight: "Gaziosmanpaşa'da fine dining", text2: " — başkentin en iyi restoranları burada seni bekliyor." },
        ],
      },
    ],
  },
};

function getRoute(cityName: string): RouteData | null {
  const key = cityName.toLowerCase().replace("i̇", "i").replace("ı", "i").replace("ş", "s").replace("ğ", "g").replace("ü", "u").replace("ö", "o").replace("ç", "c");
  return STATIC_ROUTES[key] ?? null;
}

// ─── Types ────────────────────────────────────────────────────────────
type Screen = "home" | "guide";

// ─── City list ───────────────────────────────────────────────────────
const cities = [
  { name: "Ankara", image: "/__mockup/images/ankara.png" },
  { name: "İstanbul", image: "/__mockup/images/istanbul.png" },
  { name: "İzmir", image: "/__mockup/images/izmir.png" },
  { name: "Samsun", image: "/__mockup/images/samsun.png" },
  { name: "Eskişehir", image: "/__mockup/images/eskisehir.png" },
  { name: "Antalya", image: "/__mockup/images/antalya.png" },
];

const featuredPlaces = [
  { name: "Kapadokya", subtitle: "Nevşehir", image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=400&q=80", rating: "4.9", reviews: "2.4k", tag: "Doğa" },
  { name: "Pamukkale", subtitle: "Denizli", image: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=400&q=80", rating: "4.8", reviews: "1.8k", tag: "Tarih" },
];

// ─── Root component ───────────────────────────────────────────────────
export function GezIN() {
  const [screen, setScreen] = useState<Screen>("home");
  const [searchValue, setSearchValue] = useState("");
  const [activeRoute, setActiveRoute] = useState<RouteData | null>(null);
  const [unknownCity, setUnknownCity] = useState("");

  const openCity = (cityName: string) => {
    const route = getRoute(cityName);
    if (route) {
      setActiveRoute(route);
      setUnknownCity("");
    } else {
      setActiveRoute(null);
      setUnknownCity(cityName);
    }
    setScreen("guide");
  };

  return (
    <div style={{
      width: 390, height: 844,
      backgroundColor: "#FFFFFF",
      fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>
      {screen === "home"
        ? <HomeScreen searchValue={searchValue} onSearchChange={setSearchValue} onOpen={openCity} />
        : <GuideScreen route={activeRoute} unknownCity={unknownCity} onBack={() => setScreen("home")} />}
    </div>
  );
}

// ─── Home screen ──────────────────────────────────────────────────────
function HomeScreen({ searchValue, onSearchChange, onOpen }: {
  searchValue: string;
  onSearchChange: (v: string) => void;
  onOpen: (city: string) => void;
}) {
  return (
    <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
      {/* Status bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px 0", fontSize: 12, fontWeight: 600, color: "#111" }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0" y="3" width="3" height="9" rx="1" fill="#111" />
            <rect x="4.5" y="2" width="3" height="10" rx="1" fill="#111" />
            <rect x="9" y="0" width="3" height="12" rx="1" fill="#111" />
            <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#111" opacity="0.3" />
          </svg>
          <div style={{ width: 22, height: 11, borderRadius: 3, border: "1.5px solid #111", padding: "1px", display: "flex", alignItems: "center" }}>
            <div style={{ width: "75%", height: "100%", borderRadius: 2, backgroundColor: "#111" }} />
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: "16px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, color: "#888", fontWeight: 500, marginBottom: 2 }}>
            <MapPin size={12} style={{ display: "inline", verticalAlign: "middle", color: ORANGE, marginRight: 4 }} />
            Merhaba, Gezgin!
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1, color: "#111", lineHeight: 1 }}>
            Gez<span style={{ color: ORANGE }}>IN</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: ORANGE_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <Bell size={18} color={ORANGE} />
            <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: ORANGE, position: "absolute", top: 9, right: 9, border: "1.5px solid white" }} />
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 20, overflow: "hidden", border: `2px solid ${ORANGE}` }}>
            <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_DARK})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={20} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Guide banner */}
      <div style={{ margin: "18px 24px 0", borderRadius: 20, background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_DARK})`, padding: "15px 18px", display: "flex", alignItems: "center", gap: 14, boxShadow: `0 6px 24px rgba(230,126,34,0.28)` }}>
        <div style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Sparkles size={22} color="white" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Yapay Zeka Rehberin</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>Şehre tıkla, rotanı anında gör!</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "16px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "#F7F7F7", borderRadius: 18, padding: "14px 18px", border: "1.5px solid #F0F0F0" }}>
          <Search size={20} color={ORANGE} strokeWidth={2.5} />
          <input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchValue.trim() && onOpen(searchValue.trim())}
            placeholder="Nereyi gezinmek istersin?"
            style={{ fontSize: 15, color: "#333", flex: 1, background: "none", border: "none", outline: "none", fontFamily: "inherit" }}
          />
          {searchValue.trim() && (
            <button onClick={() => onOpen(searchValue.trim())} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", flexShrink: 0 }}>
              <Send size={15} color="white" />
            </button>
          )}
        </div>
      </div>

      {/* Tags */}
      <div style={{ padding: "14px 24px 0", display: "flex", gap: 8 }}>
        {["Tümü", "Doğa", "Tarih", "Sahil", "Dağ"].map((tag, i) => (
          <div key={tag} style={{ padding: "7px 16px", borderRadius: 20, backgroundColor: i === 0 ? ORANGE : "#F7F7F7", color: i === 0 ? "white" : "#666", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer" }}>
            {tag}
          </div>
        ))}
      </div>

      {/* Önerilen Yerler */}
      <div style={{ marginTop: 22 }}>
        <div style={{ padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>Önerilen Yerler</span>
          <span style={{ fontSize: 13, color: ORANGE, fontWeight: 600, display: "flex", alignItems: "center", gap: 2 }}>Tümünü Gör <ChevronRight size={14} /></span>
        </div>
        <div style={{ paddingLeft: 24, display: "flex", gap: 16, overflowX: "auto", paddingBottom: 4, paddingRight: 8 }}>
          {cities.map((city) => (
            <div key={city.name} onClick={() => onOpen(city.name)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, flexShrink: 0, cursor: "pointer" }}>
              <div style={{ width: 72, height: 72, borderRadius: 36, overflow: "hidden", border: `2.5px solid ${ORANGE}`, boxShadow: `0 4px 14px rgba(230,126,34,0.18)` }}>
                <img src={city.image} alt={city.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = "none";
                    if (t.parentElement) t.parentElement.style.background = `linear-gradient(135deg, ${ORANGE}, ${ORANGE_DARK})`;
                  }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#111", textAlign: "center" }}>{city.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: "20px 24px 0", height: 1, backgroundColor: "#F3F3F3" }} />

      {/* Popüler Rotalar */}
      <div style={{ marginTop: 18 }}>
        <div style={{ padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>Popüler Rotalar</span>
          <span style={{ fontSize: 13, color: ORANGE, fontWeight: 600, display: "flex", alignItems: "center", gap: 2 }}>Tümünü Gör <ChevronRight size={14} /></span>
        </div>
        <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          {featuredPlaces.map((place) => (
            <div key={place.name} onClick={() => onOpen(place.name)} style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 18px rgba(0,0,0,0.07)", backgroundColor: "#fff", border: "1px solid #F3F3F3", cursor: "pointer" }}>
              <div style={{ position: "relative", height: 148 }}>
                <img src={place.image} alt={place.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />
                <div style={{ position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: 17, backgroundColor: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Heart size={16} color={ORANGE} />
                </div>
                <div style={{ position: "absolute", top: 12, left: 12, backgroundColor: ORANGE, color: "white", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>
                  {place.tag}
                </div>
              </div>
              <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{place.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                    <MapPin size={12} color="#AAAAAA" />
                    <span style={{ fontSize: 12, color: "#888" }}>{place.subtitle}, Türkiye</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Star size={13} color={ORANGE} fill={ORANGE} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{place.rating}</span>
                  </div>
                  <span style={{ fontSize: 11, color: "#AAA" }}>{place.reviews} değerlendirme</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ margin: "22px 24px 32px", backgroundColor: "#111", borderRadius: 28, padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
        {[
          { icon: <Home size={22} />, active: true },
          { icon: <Compass size={22} />, active: false },
          { icon: <Bookmark size={22} />, active: false },
          { icon: <User size={22} />, active: false },
        ].map((item, i) => (
          <div key={i} style={{ color: item.active ? ORANGE : "rgba(255,255,255,0.45)", cursor: "pointer", position: "relative" }}>
            {item.active && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: 2, backgroundColor: ORANGE }} />}
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Guide screen ─────────────────────────────────────────────────────
function GuideScreen({ route, unknownCity, onBack }: {
  route: RouteData | null;
  unknownCity: string;
  onBack: () => void;
}) {
  const cityLabel = route?.city ?? unknownCity;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Status bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px 0", fontSize: 12, fontWeight: 600, color: "#111", flexShrink: 0 }}>
        <span>9:41</span>
        <div style={{ width: 22, height: 11, borderRadius: 3, border: "1.5px solid #111", padding: "1px", display: "flex", alignItems: "center" }}>
          <div style={{ width: "75%", height: "100%", borderRadius: 2, backgroundColor: "#111" }} />
        </div>
      </div>

      {/* Header bar */}
      <div style={{ padding: "12px 24px 14px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0, borderBottom: "1px solid #F3F3F3" }}>
        <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 19, border: "none", backgroundColor: "#F7F7F7", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <ArrowLeft size={18} color="#333" />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "#AAA", fontWeight: 500 }}>GezIN Rehberi</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#111", lineHeight: 1.2 }}>
            {cityLabel} <span style={{ color: ORANGE }}>Rotası</span>
          </div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 18, background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_DARK})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sparkles size={18} color="white" />
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 28px" }}>
        {route ? (
          <>
            {/* "Harika seçim!" banner */}
            <div style={{ backgroundColor: ORANGE_LIGHT, borderRadius: 16, padding: "14px 16px", marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🎉</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: ORANGE }}>Harika seçim!</div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 1 }}>GezIN rehberin hazır. İyi geziler!</div>
              </div>
            </div>

            {/* Day cards */}
            {route.days.map((day, di) => (
              <DayCard key={di} day={day} index={di} />
            ))}

            {/* Footer tip */}
            <div style={{ marginTop: 8, padding: "14px 16px", backgroundColor: "#F7F7F7", borderRadius: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Sparkles size={15} color={ORANGE} style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.55 }}>
                Başka bir şehir için de rota oluşturmak ister misin? <span style={{ color: ORANGE, fontWeight: 700 }}>Geri dön</span> ve yeni bir şehir seç!
              </div>
            </div>
          </>
        ) : (
          /* Unknown city state */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 48, gap: 14, textAlign: "center" }}>
            <div style={{ fontSize: 48 }}>🗺️</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>"{cityLabel}" için hazır rota yok</div>
            <div style={{ fontSize: 13, color: "#888", lineHeight: 1.55, maxWidth: 260 }}>
              Şu an <span style={{ color: ORANGE, fontWeight: 700 }}>Ankara</span> ve <span style={{ color: ORANGE, fontWeight: 700 }}>Samsun</span> için detaylı rotalarımız var. Diğer şehirler yakında ekleniyor!
            </div>
            <button onClick={onBack} style={{ marginTop: 8, backgroundColor: ORANGE, color: "white", border: "none", borderRadius: 14, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Geri Dön
            </button>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ margin: "0 20px 24px", backgroundColor: "#111", borderRadius: 28, padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        {[
          { icon: <Home size={22} />, active: false },
          { icon: <Compass size={22} />, active: true },
          { icon: <Bookmark size={22} />, active: false },
          { icon: <User size={22} />, active: false },
        ].map((item, i) => (
          <div key={i} style={{ color: item.active ? ORANGE : "rgba(255,255,255,0.45)", cursor: "pointer" }}>
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Day card ─────────────────────────────────────────────────────────
function DayCard({ day, index }: { day: Day; index: number }) {
  return (
    <div style={{
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
      border: "1px solid #F0F0F0",
      marginBottom: 14,
      overflow: "hidden",
    }}>
      {/* Day header */}
      <div style={{
        backgroundColor: index % 2 === 0 ? ORANGE : "#111",
        padding: "12px 18px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <div style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "white", flexShrink: 0 }}>
          {index + 1}
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: "white", lineHeight: 1.3 }}>{day.title.replace(/^\d+\. Gün — /, "")}</span>
      </div>

      {/* Day items */}
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {day.items.map((item, ii) => (
          <RouteItem key={ii} item={item} />
        ))}
      </div>
    </div>
  );
}

// ─── Route item ───────────────────────────────────────────────────────
type ItemData = {
  icon: string;
  text: string;
  highlight?: string;
  text2?: string;
  highlight2?: string;
  text2b?: string;
};

function RouteItem({ item }: { item: ItemData }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.4 }}>{item.icon}</span>
      <p style={{ fontSize: 13, color: "#444", lineHeight: 1.6, margin: 0 }}>
        {item.text}
        {item.highlight && <strong style={{ color: ORANGE }}>{item.highlight}</strong>}
        {item.text2}
        {item.highlight2 && <strong style={{ color: ORANGE }}>{item.highlight2}</strong>}
        {item.text2b}
      </p>
    </div>
  );
}
