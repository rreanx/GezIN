import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Heart, Home, Compass, User, Bell, Star, ChevronRight, Bookmark, ArrowLeft, Send, Loader2, Sparkles } from "lucide-react";

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

function SimpleMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      elements.push(
        <div key={key++} style={{ marginTop: 20, marginBottom: 10 }}>
          <div style={{
            fontSize: 17,
            fontWeight: 800,
            color: "#111",
            borderLeft: `3px solid ${ORANGE}`,
            paddingLeft: 10,
            lineHeight: 1.3,
          }}>
            {line.replace("## ", "")}
          </div>
        </div>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <div key={key++} style={{ marginTop: 12, marginBottom: 6 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: ORANGE }}>
            {line.replace("### ", "")}
          </div>
        </div>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <div key={key++} style={{ marginTop: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>
            {line.replace(/\*\*/g, "")}
          </span>
        </div>
      );
    } else if (line.startsWith("- ")) {
      const content = line.replace("- ", "");
      const parts = content.split(/\*\*(.*?)\*\*/g);
      elements.push(
        <div key={key++} style={{ display: "flex", gap: 6, marginBottom: 4, paddingLeft: 4 }}>
          <span style={{ color: ORANGE, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>•</span>
          <span style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </span>
        </div>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={key++} style={{ height: 4 }} />);
    } else {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      if (parts.length > 1 || line.trim()) {
        elements.push(
          <p key={key++} style={{ fontSize: 13, color: "#555", lineHeight: 1.6, margin: "2px 0" }}>
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i} style={{ color: "#333" }}>{part}</strong> : part
            )}
          </p>
        );
      }
    }
  }

  return <>{elements}</>;
}

type Screen = "home" | "guide";

export function GezIN() {
  const [screen, setScreen] = useState<Screen>("home");
  const [searchValue, setSearchValue] = useState("");
  const [guideCity, setGuideCity] = useState("");
  const [guideText, setGuideText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [guideText]);

  const startGuide = async (city: string) => {
    if (!city.trim()) return;
    setGuideCity(city.trim());
    setGuideText("");
    setError("");
    setIsLoading(true);
    setScreen("guide");

    try {
      const res = await fetch("/api/gezin/guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: city.trim() }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Sunucu hatası");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const payload = JSON.parse(line.slice(6));
            if (payload.done) {
              setIsLoading(false);
            } else if (payload.error) {
              setError(payload.error);
              setIsLoading(false);
            } else if (payload.content) {
              setGuideText((prev) => prev + payload.content);
            }
          } catch {}
        }
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu. Lütfen tekrar dene.");
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      startGuide(searchValue);
    }
  };

  const handleCityClick = (cityName: string) => {
    startGuide(cityName);
  };

  return (
    <div style={{
      width: 390,
      height: 844,
      backgroundColor: "#FFFFFF",
      fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      flexDirection: "column",
    }}>
      {screen === "home" ? (
        <HomeScreen
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearchSubmit={handleSearchSubmit}
          onCityClick={handleCityClick}
        />
      ) : (
        <GuideScreen
          city={guideCity}
          text={guideText}
          isLoading={isLoading}
          error={error}
          scrollRef={scrollRef}
          onBack={() => setScreen("home")}
          onRetry={() => startGuide(guideCity)}
        />
      )}
    </div>
  );
}

function HomeScreen({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onCityClick,
}: {
  searchValue: string;
  onSearchChange: (v: string) => void;
  onSearchSubmit: () => void;
  onCityClick: (city: string) => void;
}) {
  return (
    <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
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
          <div style={{ width: 22, height: 11, borderRadius: 3, border: "1.5px solid #111", padding: "1px 1px", display: "flex", alignItems: "center" }}>
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
            <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${ORANGE} 0%, #E06010 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={20} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Guide Banner */}
      <div style={{ margin: "20px 24px 0", borderRadius: 18, background: `linear-gradient(135deg, ${ORANGE} 0%, #E06010 100%)`, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 6px 24px rgba(242,132,68,0.28)" }}>
        <div style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Sparkles size={22} color="white" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "white", lineHeight: 1.2 }}>Yapay Zeka Rehberin</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>Bir şehir yaz, rota oluşturalım!</div>
        </div>
      </div>

      {/* Search Box */}
      <div style={{ padding: "16px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "#F7F7F7", borderRadius: 18, padding: "14px 18px", border: "1.5px solid #F0F0F0" }}>
          <Search size={20} color={ORANGE} strokeWidth={2.5} />
          <input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearchSubmit()}
            placeholder="Nereyi gezinmek istersin?"
            style={{ fontSize: 15, color: "#333", flex: 1, background: "none", border: "none", outline: "none", fontFamily: "inherit" }}
          />
          {searchValue && (
            <button
              onClick={onSearchSubmit}
              style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", flexShrink: 0 }}
            >
              <Send size={15} color="white" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Tags */}
      <div style={{ padding: "14px 24px 0", display: "flex", gap: 8 }}>
        {["Tümü", "Doğa", "Tarih", "Sahil", "Dağ"].map((tag, i) => (
          <div key={tag} style={{ padding: "7px 16px", borderRadius: 20, backgroundColor: i === 0 ? ORANGE : "#F7F7F7", color: i === 0 ? "white" : "#666", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer" }}>
            {tag}
          </div>
        ))}
      </div>

      {/* Recommended Places Section */}
      <div style={{ marginTop: 22 }}>
        <div style={{ padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>Önerilen Yerler</span>
          <span style={{ fontSize: 13, color: ORANGE, fontWeight: 600, display: "flex", alignItems: "center", gap: 2 }}>Tümünü Gör <ChevronRight size={14} /></span>
        </div>
        <div style={{ paddingLeft: 24, display: "flex", gap: 16, overflowX: "auto", paddingBottom: 4, paddingRight: 8 }}>
          {cities.map((city) => (
            <div key={city.name} onClick={() => onCityClick(city.name)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, flexShrink: 0, cursor: "pointer" }}>
              <div style={{ width: 72, height: 72, borderRadius: 36, overflow: "hidden", border: `2.5px solid ${ORANGE}`, boxShadow: `0 4px 14px rgba(242,132,68,0.18)`, position: "relative" }}>
                <img src={city.image} alt={city.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = "none";
                  if (t.parentElement) t.parentElement.style.background = `linear-gradient(135deg, ${ORANGE}, #E06010)`;
                }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#111", textAlign: "center" }}>{city.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: "20px 24px 0", height: 1, backgroundColor: "#F3F3F3" }} />

      {/* Featured Places */}
      <div style={{ marginTop: 18 }}>
        <div style={{ padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>Popüler Rotalar</span>
          <span style={{ fontSize: 13, color: ORANGE, fontWeight: 600, display: "flex", alignItems: "center", gap: 2 }}>Tümünü Gör <ChevronRight size={14} /></span>
        </div>
        <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          {featuredPlaces.map((place) => (
            <div key={place.name} onClick={() => onCityClick(place.name)} style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 18px rgba(0,0,0,0.07)", backgroundColor: "#fff", border: "1px solid #F3F3F3", cursor: "pointer" }}>
              <div style={{ position: "relative", height: 150 }}>
                <img src={place.image} alt={place.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />
                <div style={{ position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: 17, backgroundColor: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Heart size={16} color={ORANGE} />
                </div>
                <div style={{ position: "absolute", top: 12, left: 12, backgroundColor: ORANGE, color: "white", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>
                  {place.tag}
                </div>
              </div>
              <div style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{place.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
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
      <div style={{ margin: "22px 24px 32px", backgroundColor: "#111", borderRadius: 28, padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
        {[
          { icon: <Home size={22} />, active: true },
          { icon: <Compass size={22} />, active: false },
          { icon: <Bookmark size={22} />, active: false },
          { icon: <User size={22} />, active: false },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", color: item.active ? ORANGE : "rgba(255,255,255,0.45)", cursor: "pointer", position: "relative" }}>
            {item.active && <div style={{ position: "absolute", top: -14, width: 3, height: 3, borderRadius: 2, backgroundColor: ORANGE }} />}
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}

function GuideScreen({
  city,
  text,
  isLoading,
  error,
  scrollRef,
  onBack,
  onRetry,
}: {
  city: string;
  text: string;
  isLoading: boolean;
  error: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onBack: () => void;
  onRetry: () => void;
}) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Status Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px 0", fontSize: 12, fontWeight: 600, color: "#111", flexShrink: 0 }}>
        <span>9:41</span>
        <div style={{ width: 22, height: 11, borderRadius: 3, border: "1.5px solid #111", padding: "1px 1px", display: "flex", alignItems: "center" }}>
          <div style={{ width: "75%", height: "100%", borderRadius: 2, backgroundColor: "#111" }} />
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: "14px 24px 16px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0, borderBottom: "1px solid #F3F3F3" }}>
        <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 19, border: "none", backgroundColor: "#F7F7F7", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <ArrowLeft size={18} color="#333" />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "#AAA", fontWeight: 500 }}>Yapay Zeka Rehberi</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#111", lineHeight: 1.2 }}>
            {city} <span style={{ color: ORANGE }}>Rotası</span>
          </div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 18, background: `linear-gradient(135deg, ${ORANGE}, #E06010)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sparkles size={18} color="white" />
        </div>
      </div>

      {/* Content */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "16px 24px 24px" }}>
        {!text && isLoading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 60, gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 28, background: ORANGE_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Loader2 size={28} color={ORANGE} style={{ animation: "spin 1s linear infinite" }} />
            </div>
            <div style={{ fontSize: 14, color: "#888", fontWeight: 500, textAlign: "center" }}>
              {city} için rota hazırlanıyor...
            </div>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {error && (
          <div style={{ backgroundColor: "#FFF3EB", borderRadius: 16, padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: 14, color: "#E06010", marginBottom: 12 }}>{error}</div>
            <button onClick={onRetry} style={{ backgroundColor: ORANGE, color: "white", border: "none", borderRadius: 12, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              Tekrar Dene
            </button>
          </div>
        )}

        {text && (
          <div>
            <SimpleMarkdown text={text} />
            {isLoading && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: ORANGE, animation: "pulse 1s ease-in-out infinite" }} />
                <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: ORANGE, animation: "pulse 1s ease-in-out 0.2s infinite" }} />
                <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: ORANGE, animation: "pulse 1s ease-in-out 0.4s infinite" }} />
                <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              </div>
            )}
            {!isLoading && (
              <div style={{ marginTop: 20, padding: "14px 16px", backgroundColor: ORANGE_LIGHT, borderRadius: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Sparkles size={16} color={ORANGE} style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: 12, color: "#E06010", lineHeight: 1.5 }}>
                  Rotanı beğendin mi? Başka bir şehir için de YZ rehberinden rota alabilirsin!
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ margin: "0 24px 28px", backgroundColor: "#111", borderRadius: 28, padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
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
