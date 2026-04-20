import { Search, MapPin, Heart, Home, Compass, User, Bell, Star, ChevronRight, Bookmark } from "lucide-react";

const ORANGE = "#F28444";
const ORANGE_LIGHT = "#FFF3EB";

const cities = [
  { name: "Ankara", image: "/__mockup/images/ankara.png" },
  { name: "İstanbul", image: "/__mockup/images/istanbul.png" },
  { name: "İzmir", image: "/__mockup/images/izmir.png" },
  { name: "Samsun", image: "/__mockup/images/samsun.png" },
  { name: "Eskişehir", image: "/__mockup/images/eskisehir.png" },
  { name: "Antalya", image: "/__mockup/images/antalya.png" },
];

const featuredPlaces = [
  {
    name: "Kapadokya",
    subtitle: "Nevşehir, Türkiye",
    image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=400&q=80",
    rating: "4.9",
    reviews: "2.4k",
    tag: "Doğa",
  },
  {
    name: "Pamukkale",
    subtitle: "Denizli, Türkiye",
    image: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=400&q=80",
    rating: "4.8",
    reviews: "1.8k",
    tag: "Tarih",
  },
];

export function GezIN() {
  return (
    <div
      style={{
        width: 390,
        minHeight: 844,
        backgroundColor: "#FFFFFF",
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
        overflowX: "hidden",
        overflowY: "auto",
        position: "relative",
      }}
    >
      {/* Status Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px 0", fontSize: 12, fontWeight: 600, color: "#111" }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0" y="3" width="3" height="9" rx="1" fill="#111" />
            <rect x="4.5" y="2" width="3" height="10" rx="1" fill="#111" />
            <rect x="9" y="0" width="3" height="12" rx="1" fill="#111" />
            <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#111" opacity="0.3" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 2.5C10.5 2.5 12.7 3.6 14.2 5.4L15.5 4C13.6 1.8 10.9 0.5 8 0.5C5.1 0.5 2.4 1.8 0.5 4L1.8 5.4C3.3 3.6 5.5 2.5 8 2.5Z" fill="#111" />
            <path d="M8 5.5C9.7 5.5 11.2 6.2 12.3 7.4L13.6 6C12.1 4.4 10.2 3.5 8 3.5C5.8 3.5 3.9 4.4 2.4 6L3.7 7.4C4.8 6.2 6.3 5.5 8 5.5Z" fill="#111" />
            <circle cx="8" cy="10" r="1.5" fill="#111" />
          </svg>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <div style={{ width: 22, height: 11, borderRadius: 3, border: "1.5px solid #111", padding: "1px 1px", display: "flex", alignItems: "center" }}>
              <div style={{ width: "75%", height: "100%", borderRadius: 2, backgroundColor: "#111" }} />
            </div>
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
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #F28444 0%, #E06010 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={20} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div style={{ padding: "20px 24px 0" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "#F7F7F7",
          borderRadius: 18,
          padding: "14px 18px",
          border: `1.5px solid #F0F0F0`,
        }}>
          <Search size={20} color={ORANGE} strokeWidth={2.5} />
          <span style={{ fontSize: 15, color: "#AAAAAA", flex: 1, fontWeight: 400 }}>
            Nereyi gezinmek istersin?
          </span>
          <div style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: ORANGE, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="20" y2="12" />
              <line x1="12" y1="18" x2="20" y2="18" />
            </svg>
          </div>
        </div>
      </div>

      {/* Quick Tags */}
      <div style={{ padding: "16px 24px 0", display: "flex", gap: 8 }}>
        {["Tümü", "Doğa", "Tarih", "Sahil", "Dağ"].map((tag, i) => (
          <div key={tag} style={{
            padding: "7px 16px",
            borderRadius: 20,
            backgroundColor: i === 0 ? ORANGE : "#F7F7F7",
            color: i === 0 ? "white" : "#666",
            fontSize: 13,
            fontWeight: 600,
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}>
            {tag}
          </div>
        ))}
      </div>

      {/* Recommended Places Section */}
      <div style={{ marginTop: 24 }}>
        <div style={{ padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>Önerilen Yerler</span>
          <span style={{ fontSize: 13, color: ORANGE, fontWeight: 600, display: "flex", alignItems: "center", gap: 2 }}>
            Tümünü Gör <ChevronRight size={14} />
          </span>
        </div>

        {/* Horizontal Scrollable City Circles */}
        <div style={{ paddingLeft: 24, display: "flex", gap: 16, overflowX: "auto", paddingBottom: 4, paddingRight: 8 }}>
          {cities.map((city) => (
            <div key={city.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0, cursor: "pointer" }}>
              <div style={{
                width: 76,
                height: 76,
                borderRadius: 38,
                overflow: "hidden",
                border: `2.5px solid ${ORANGE}`,
                boxShadow: `0 4px 16px rgba(242,132,68,0.18)`,
                position: "relative",
              }}>
                <img
                  src={city.image}
                  alt={city.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.parentElement) {
                      target.parentElement.style.background = `linear-gradient(135deg, ${ORANGE} 0%, #E06010 100%)`;
                      target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:white;font-size:22px;font-weight:800;">${city.name.charAt(0)}</div>`;
                    }
                  }}
                />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#111", textAlign: "center", letterSpacing: 0 }}>{city.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ margin: "24px 24px 0", height: 1, backgroundColor: "#F3F3F3" }} />

      {/* Featured Places */}
      <div style={{ marginTop: 20 }}>
        <div style={{ padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>Popüler Rotalar</span>
          <span style={{ fontSize: 13, color: ORANGE, fontWeight: 600, display: "flex", alignItems: "center", gap: 2 }}>
            Tümünü Gör <ChevronRight size={14} />
          </span>
        </div>

        <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {featuredPlaces.map((place) => (
            <div key={place.name} style={{
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              backgroundColor: "#fff",
              border: "1px solid #F3F3F3",
              cursor: "pointer",
            }}>
              <div style={{ position: "relative", height: 160 }}>
                <img
                  src={place.image}
                  alt={place.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)"
                }} />
                <div style={{
                  position: "absolute", top: 12, right: 12,
                  width: 34, height: 34, borderRadius: 17,
                  backgroundColor: "rgba(255,255,255,0.92)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  backdropFilter: "blur(8px)",
                }}>
                  <Heart size={16} color={ORANGE} />
                </div>
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  backgroundColor: ORANGE,
                  color: "white",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: 20,
                }}>
                  {place.tag}
                </div>
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>{place.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                      <MapPin size={12} color="#AAAAAA" />
                      <span style={{ fontSize: 12, color: "#888" }}>{place.subtitle}</span>
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
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        margin: "24px 24px 32px",
        backgroundColor: "#111",
        borderRadius: 28,
        padding: "14px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      }}>
        {[
          { icon: <Home size={22} />, label: "Ana Sayfa", active: true },
          { icon: <Compass size={22} />, label: "Keşfet", active: false },
          { icon: <Bookmark size={22} />, label: "Kaydedilenler", active: false },
          { icon: <User size={22} />, label: "Profil", active: false },
        ].map((item) => (
          <div key={item.label} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            color: item.active ? ORANGE : "rgba(255,255,255,0.45)",
            cursor: "pointer",
            position: "relative",
          }}>
            {item.active && (
              <div style={{
                position: "absolute",
                top: -14,
                width: 3,
                height: 3,
                borderRadius: 2,
                backgroundColor: ORANGE,
              }} />
            )}
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
