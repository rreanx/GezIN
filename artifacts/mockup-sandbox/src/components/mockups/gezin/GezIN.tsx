import { useState } from "react";
import {
  Search, MapPin, Heart, Home, Compass, User, Bell,
  Star, ChevronRight, Bookmark, ArrowLeft, Send, Sparkles,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────
const ORANGE = "#E67E22";
const ORANGE_LIGHT = "#FEF3E8";
const ORANGE_DARK = "#C96A10";

// ─── Animations ───────────────────────────────────────────────────────
const ANIM_CSS = `
@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
@keyframes slideOutLeft {
  from { transform: translateX(0);    opacity: 1; }
  to   { transform: translateX(-60%); opacity: 0; }
}
@keyframes slideInLeft {
  from { transform: translateX(-60%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
@keyframes dot-bounce {
  0%, 80%, 100% { transform: translateY(0);   opacity: 0.4; }
  40%           { transform: translateY(-6px); opacity: 1;   }
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0);    }
}
`;

// ─── Route data ───────────────────────────────────────────────────────
type Item = { icon: string; bold?: string; after?: string; before?: string };
type Day  = { title: string; items: Item[] };
type Route = { city: string; days: Day[] };

const ROUTES: Record<string, Route> = {
  ankara: {
    city: "Ankara",
    days: [
      {
        title: "Anıtkabir & Müze Turu",
        items: [
          { icon: "📍", before: "Sabah erkenden ", bold: "Anıtkabir", after: "'i ziyaret et — tarihin ağırlığını hissedeceksin." },
          { icon: "🏛️", before: "Öğleden sonra yanı başındaki ", bold: "Anadolu Medeniyetleri Müzesi", after: "'ne geç, dünyanın en iyi müzelerinden biri." },
          { icon: "🍽️", before: "Akşam Kızılay'da meşhur bir kebapçıda ", bold: "Ankara tava", after: " ve ayran dene." },
        ],
      },
      {
        title: "Ankara Kalesi & Tarihi Çarşı",
        items: [
          { icon: "📍", before: "Sabah ", bold: "Ankara Kalesi", after: "'ne çık — surlardan tüm şehri seyret." },
          { icon: "📸", before: "Kale içinde dar taş sokaklarda ", bold: "bakır ustaları", after: " ve antika dükkânlarını keşfet." },
          { icon: "🍽️", before: "Öğlede yakın lokantalarda ", bold: "Simit çorbası ve kavurma", after: " denemeyi unutma." },
        ],
      },
      {
        title: "Kuğulu Park & Modern Ankara",
        items: [
          { icon: "🌿", before: "Sabah sakin ", bold: "Kuğulu Park", after: "'ta yürüyüş, şehrin ortasında nefes al." },
          { icon: "📸", before: "Öğleden sonra ", bold: "Tunalı Hilmi Caddesi", after: "'nde kafeler ve butiklerle modern Ankara'yı keşfet." },
          { icon: "🍽️", before: "Son akşam için ", bold: "Gaziosmanpaşa restoranları", after: " — başkentin en iyi mutfağı burada." },
        ],
      },
    ],
  },
  samsun: {
    city: "Samsun",
    days: [
      {
        title: "Bandırma Vapuru & Atakum Sahili",
        items: [
          { icon: "⚓", before: "Sabah ", bold: "Bandırma Vapuru Müzesi", after: "'ni ziyaret et — Kurtuluş Savaşı'nın başlangıç noktası." },
          { icon: "📸", before: "Öğleden sonra ", bold: "Atakum Sahili", after: " boyunca yürü, deniz manzarası eşsiz." },
          { icon: "🍽️", before: "Akşam sahil restoranlarında ", bold: "hamsi tava ve Samsun pilavı", after: " ye." },
        ],
      },
      {
        title: "Amisos Tepesi & Kızılırmak Deltası",
        items: [
          { icon: "📍", before: "Sabah ", bold: "Amisos Tepesi", after: "'ne çık — antik tümülüs ve panoramik şehir manzarası." },
          { icon: "🦅", before: "Öğle sonrası ", bold: "Kızılırmak Deltası Kuş Cenneti", after: " — yüzlerce kuş türü, doğa fotoğrafçılarının gözdesi." },
          { icon: "🍽️", before: "Akşam şehir merkezinde ", bold: "Samsun kebabı", after: " ve tatlı dükkanlarını gez." },
        ],
      },
      {
        title: "Samsun Pidesi & Stadyum Turu",
        items: [
          { icon: "🍕", before: "Sabah mutlaka ", bold: "Samsun pidesi", after: " ye — tereyağlı, kaşarlı, fırından taze. Yemeden gitme!" },
          { icon: "📍", before: "Öğleden sonra ", bold: "19 Mayıs Stadyumu", after: " çevresinde tur at, büyük parkta dinlen." },
          { icon: "📸", before: "Akşam ", bold: "Saat Kulesi ve çarşı", after: " bölgesinde tarihi dokuyu yakala." },
        ],
      },
    ],
  },
  istanbul: {
    city: "İstanbul",
    days: [
      {
        title: "Sultanahmet & Tarihi Yarımada",
        items: [
          { icon: "🕌", before: "Sabah ", bold: "Ayasofya", after: "'ya gir — kubbenin altında dur, büyüleneceksin." },
          { icon: "📍", before: "Öğlede ", bold: "Kapalıçarşı", after: "'da kuyum ve baharat koridorlarında kaybol." },
          { icon: "🍽️", before: "Akşam Eminönü'nde ", bold: "balık ekmek", after: " ve ", bold2: "midye dolma", after2: " — İstanbul klasiği." },
        ],
      },
      {
        title: "Boğaz & Beyoğlu",
        items: [
          { icon: "⛵", before: "Sabah ", bold: "Boğaz turu", after: " ile iki kıtayı aynı anda gör, rüzgarı hisset." },
          { icon: "📸", before: "Öğleden sonra ", bold: "İstiklal Caddesi", after: " ve Galata Kulesi, şehrin ruhunu taşıyor." },
          { icon: "🍽️", before: "Akşam Karaköy'de ", bold: "meyhane sofrası", after: " — meze, rakı, deniz ürünleri." },
        ],
      },
      {
        title: "Adalar & Prenses Adası",
        items: [
          { icon: "⛴️", before: "Sabah vapurla ", bold: "Büyükada'ya", after: " geç — arabalar yok, sadece faytonlar ve bisikletler." },
          { icon: "📸", before: "Ada tepesinde ", bold: "Aya Yorgi Kilisesi", after: "'nden Marmara manzarası nefes kesici." },
          { icon: "🍽️", before: "Ada dönüşü Kadıköy'de ", bold: "çarşı turu", after: " ve akşam yemeği." },
        ],
      },
    ],
  },
  izmir: {
    city: "İzmir",
    days: [
      {
        title: "Kordon & Tarihi Merkez",
        items: [
          { icon: "🌊", before: "Sabah ", bold: "Kordon", after: " boyunca kahveni al, Ege'nin önünde yürü." },
          { icon: "📍", before: "Öğlede ", bold: "Kemeraltı Çarşısı", after: "'nda labirent gibi sokakları keşfet." },
          { icon: "🍽️", before: "Akşam ", bold: "İzmir köfte ve boyoz", after: " — lokaller nereye gidiyorsa oraya git." },
        ],
      },
      {
        title: "Efes Antik Kenti",
        items: [
          { icon: "🏛️", before: "Tam gün ", bold: "Efes Antik Kenti", after: " gezisi — Selsus Kütüphanesi ve Büyük Tiyatro ihtişamlı." },
          { icon: "📸", before: "Yakınındaki ", bold: "Meryem Ana Evi", after: "'ni de ziyaret et, huzur dolu bir yer." },
          { icon: "🍽️", before: "Dönüşte Selçuk'ta ", bold: "köy kahvaltısı", after: " ya da taze incir ve peynir." },
        ],
      },
      {
        title: "Çeşme & Alaçatı",
        items: [
          { icon: "🏖️", before: "Sabah ", bold: "Çeşme plajları", after: "'nda yüz — kristal berraklığında Ege suyu." },
          { icon: "📍", before: "Öğleden sonra ", bold: "Alaçatı taş sokakları", after: " — bougainvillea sarılı evler, butik kafeler." },
          { icon: "🍽️", before: "Akşam Alaçatı'da ", bold: "ege mezeleri ve deniz mahsulleri", after: " ile muhteşem bitiş." },
        ],
      },
    ],
  },
  eskisehir: {
    city: "Eskişehir",
    days: [
      {
        title: "Porsuk & Odunpazarı",
        items: [
          { icon: "🚣", before: "Sabah ", bold: "Porsuk Çayı", after: "'nda gondol turu — şehrin romantik yüzü." },
          { icon: "📍", before: "Öğlede ", bold: "Odunpazarı", after: " tarihi evlerini gez — Osmanlı dokusu harika korunmuş." },
          { icon: "🍽️", before: "Akşam kutlama buluşmasının merkezi ", bold: "çibörek ve Eskişehir ciğeri", after: " dene." },
        ],
      },
      {
        title: "Müzeler & Lületaşı",
        items: [
          { icon: "🏛️", before: "Sabah ", bold: "Cam Eserleri Müzesi", after: " ve ", bold2: "Atatürk Evi", after2: " — kültür turu." },
          { icon: "📸", before: "Öğlede ", bold: "Lületaşı çarşısı", after: " — dünyanın lületaşı başkenti, hediyelik mükemmel." },
          { icon: "🍽️", before: "Akşam üniversite mahallesinde ", bold: "öğrenci kafeleri", after: " — canlı atmosfer, uygun fiyat." },
        ],
      },
    ],
  },
  antalya: {
    city: "Antalya",
    days: [
      {
        title: "Kaleiçi & Tarihi Liman",
        items: [
          { icon: "⚓", before: "Sabah ", bold: "Kaleiçi", after: "'nde kaybol — Roma surları, dar sokaklar, sarmaşıklar." },
          { icon: "📍", before: "Öğlede ", bold: "Hadrian Kapısı", after: " ve antik liman çevresinde fotoğraf çek." },
          { icon: "🍽️", before: "Akşam limanda balıkçı restoranlarında ", bold: "Akdeniz meze ve ızgara balık", after: "." },
        ],
      },
      {
        title: "Düden Şelalesi & Müzeler",
        items: [
          { icon: "💦", before: "Sabah ", bold: "Düden Şelalesi", after: " — denize dökülen şelale, görülmesi gereken manzara." },
          { icon: "🏛️", before: "Öğlede Türkiye'nin en büyük arkeoloji müzelerinden ", bold: "Antalya Müzesi", after: "'ne git." },
          { icon: "🍽️", before: "Akşam ", bold: "Tantuni ve şiş köfte", after: " — yerel sokak lezzetleri, bol acı." },
        ],
      },
      {
        title: "Olimpos & Yanartaş",
        items: [
          { icon: "🔥", before: "Tam gün turu: ", bold: "Yanartaş", after: " — binlerce yıldır yanan doğal alevler, efsane gibi." },
          { icon: "📍", before: "Yakınındaki ", bold: "Olimpos antik kenti", after: " ve plajı — ormandan denize açılan gizli cennet." },
          { icon: "🍽️", before: "Dönüşte ", bold: "Kemer'de balık restoranı", after: " — yorgunluk uçup gidecek." },
        ],
      },
    ],
  },
  kapadokya: {
    city: "Kapadokya",
    days: [
      {
        title: "Balon Turu & Göreme",
        items: [
          { icon: "🎈", before: "Sabah şafakta ", bold: "sıcak hava balonu turu", after: " — hayatının en güzel anlarından biri olacak." },
          { icon: "📍", before: "Öğlede ", bold: "Göreme Açık Hava Müzesi", after: " — kaya kiliseler ve freskler." },
          { icon: "🍽️", before: "Akşam yerel restoranda ", bold: "testi kebabı", after: " — kil testi içinde pişen et, muhteşem." },
        ],
      },
      {
        title: "Peribacaları & Yeraltı Şehri",
        items: [
          { icon: "🗿", before: "Sabah ", bold: "Ürgüp peribacaları", after: " arasında yürüyüş — Mars gezegeninde gibi hissedeceksin." },
          { icon: "📍", before: "Öğlede ", bold: "Derinkuyu Yeraltı Şehri", after: " — 8 katlı, binlerce kişilik yeraltı medeniyeti." },
          { icon: "🍽️", before: "Akşam Ürgüp'te şarap tadımı: ", bold: "Kapadokya üzümlerinden", after: " yapılan şaraplar dünyaca ünlü." },
        ],
      },
    ],
  },
  pamukkale: {
    city: "Pamukkale",
    days: [
      {
        title: "Travertenler & Antik Havuz",
        items: [
          { icon: "⬜", before: "Sabah erkenden ", bold: "Pamukkale travertenleri", after: "'ne çık — beyaz pamuk kaleler, sıcak kaplıca suyu." },
          { icon: "🏊", before: "Öğlede ", bold: "Kleopatra'nın Antik Havuzu", after: "'nda yüz — Roma sütunları arasında yüzmek başka bir şey." },
          { icon: "🍽️", before: "Akşam köyde ", bold: "kuzu tandır ve yöresel mezeler", after: " — sade ama lezzetli." },
        ],
      },
      {
        title: "Hierapolis Antik Kenti",
        items: [
          { icon: "🏛️", before: "Sabah ", bold: "Hierapolis Antik Kenti", after: " turu — nekropol ve büyük tiyatro etkileyici." },
          { icon: "📸", before: "Öğlede tepeden ", bold: "Denizli ovasının", after: " panoramasını fotoğrafla." },
          { icon: "🍽️", before: "Dönüşte Denizli'de ", bold: "incir tatlıları ve halva", after: " — bölgenin en sevilen lezzetleri." },
        ],
      },
    ],
  },
};

// Normalise Turkish city names → lookup key
function toKey(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/i̇/g, "i")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/â/g, "a")
    .trim();
}

function findRoute(city: string): Route | null {
  return ROUTES[toKey(city)] ?? null;
}

// ─── Regions data ────────────────────────────────────────────────────
const REGIONS: { name: string; emoji: string; cities: { name: string; img?: string }[] }[] = [
  {
    name: "Marmara", emoji: "🌉",
    cities: [
      { name: "İstanbul",  img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=200&q=80" },
      { name: "Bursa",     img: "https://images.unsplash.com/photo-1562401017-4e43a2c569e0?w=200&q=80" },
      { name: "Edirne",    img: "https://images.unsplash.com/photo-1600349612854-a38838c85834?w=200&q=80" },
      { name: "Çanakkale" },
      { name: "Sakarya" },
      { name: "Kocaeli" },
    ],
  },
  {
    name: "Ege", emoji: "🏖️",
    cities: [
      { name: "İzmir",          img: "/__mockup/images/izmir.png" },
      { name: "Muğla",          img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=200&q=80" },
      { name: "Aydın" },
      { name: "Denizli",        img: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=200&q=80" },
      { name: "Afyonkarahisar" },
      { name: "Manisa" },
    ],
  },
  {
    name: "Akdeniz", emoji: "☀️",
    cities: [
      { name: "Antalya",  img: "/__mockup/images/antalya.png" },
      { name: "Mersin",   img: "https://images.unsplash.com/photo-1620963376898-ef7a01a05edd?w=200&q=80" },
      { name: "Adana" },
      { name: "Hatay" },
      { name: "Isparta" },
      { name: "Burdur" },
    ],
  },
  {
    name: "İç Anadolu", emoji: "🏔️",
    cities: [
      { name: "Ankara",    img: "/__mockup/images/ankara.png" },
      { name: "Konya",     img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=200&q=80" },
      { name: "Eskişehir", img: "/__mockup/images/eskisehir.png" },
      { name: "Nevşehir",  img: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=200&q=80" },
      { name: "Sivas" },
      { name: "Kayseri" },
    ],
  },
  {
    name: "Karadeniz", emoji: "🌿",
    cities: [
      { name: "Samsun",  img: "/__mockup/images/samsun.png" },
      { name: "Trabzon", img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=200&q=80" },
      { name: "Rize",    img: "https://images.unsplash.com/photo-1598935888738-cd2622bcd437?w=200&q=80" },
      { name: "Artvin" },
      { name: "Sinop" },
      { name: "Amasya" },
      { name: "Bolu" },
      { name: "Karabük" },
      { name: "Çorum" },
    ],
  },
  {
    name: "Güneydoğu & Doğu", emoji: "🏛️",
    cities: [
      { name: "Gaziantep",  img: "https://images.unsplash.com/photo-1568695122048-fba07a580b88?w=200&q=80" },
      { name: "Erzurum" },
      { name: "Şanlıurfa" },
      { name: "Mardin",     img: "https://images.unsplash.com/photo-1601778614764-0b8cdd99aeb6?w=200&q=80" },
      { name: "Kars" },
      { name: "Van" },
      { name: "Diyarbakır" },
    ],
  },
];

// ─── City + featured lists ────────────────────────────────────────────
const CITY_CIRCLES = [
  { name: "Ankara",    image: "/__mockup/images/ankara.png" },
  { name: "İstanbul",  image: "/__mockup/images/istanbul.png" },
  { name: "İzmir",     image: "/__mockup/images/izmir.png" },
  { name: "Samsun",    image: "/__mockup/images/samsun.png" },
  { name: "Eskişehir", image: "/__mockup/images/eskisehir.png" },
  { name: "Antalya",   image: "/__mockup/images/antalya.png" },
];

const FEATURED = [
  { name: "Kapadokya", subtitle: "Nevşehir", image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=400&q=80", rating: "4.9", reviews: "2.4k", tag: "Doğa" },
  { name: "Pamukkale", subtitle: "Denizli",  image: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=400&q=80", rating: "4.8", reviews: "1.8k", tag: "Tarih" },
];

// ─── Transition wrapper ───────────────────────────────────────────────
type Direction = "forward" | "back";

function ScreenSlide({ children, id, direction }: { children: React.ReactNode; id: string; direction: Direction }) {
  const anim = direction === "forward" ? "slideInRight 0.35s cubic-bezier(0.4,0,0.2,1) forwards"
                                       : "slideInLeft  0.35s cubic-bezier(0.4,0,0.2,1) forwards";
  return (
    <div key={id} style={{ position: "absolute", inset: 0, animation: anim, willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────
type Screen = "home" | "loading" | "guide" | "saved" | "regions";

export function GezIN() {
  const [screen, setScreen]       = useState<Screen>("home");
  const [direction, setDirection] = useState<Direction>("forward");
  const [search, setSearch]       = useState("");
  const [pendingCity, setPending] = useState("");
  const [activeRoute, setRoute]   = useState<Route | null>(null);
  const [unknownCity, setUnknown] = useState("");
  const [saved, setSaved]         = useState<string[]>([]);

  const goTo = (city: string) => {
    setSearch(city);
    setPending(city);
    setDirection("forward");
    setScreen("loading");
    setTimeout(() => {
      const r = findRoute(city);
      setRoute(r);
      setUnknown(r ? "" : city);
      setScreen("guide");
    }, 1400);
  };

  const goBack  = () => { setDirection("back");    setScreen("home"); };
  const goHome  = () => { setDirection("back");    setScreen("home"); };
  const goSaved = () => { setDirection("forward"); setScreen("saved"); };
  const goRegions = () => { setDirection("forward"); setScreen("regions"); };

  const toggleSave = (city: string) => {
    setSaved((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  return (
    <div style={{
      width: 390, height: 844,
      backgroundColor: "#fff",
      fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      overflow: "hidden",
      position: "relative",
    }}>
      <style>{ANIM_CSS}</style>

      {screen === "home" && (
        <ScreenSlide id="home" direction={direction}>
          <HomeScreen search={search} onSearchChange={setSearch} onOpen={goTo} onSaved={goSaved} onRegions={goRegions} />
        </ScreenSlide>
      )}

      {screen === "loading" && (
        <ScreenSlide id={"loading-" + pendingCity} direction="forward">
          <LoadingScreen city={pendingCity} />
        </ScreenSlide>
      )}

      {screen === "guide" && (
        <ScreenSlide id={"guide-" + pendingCity} direction="forward">
          <GuideScreen
            route={activeRoute}
            unknownCity={unknownCity}
            isSaved={saved.includes(activeRoute?.city ?? unknownCity)}
            onToggleSave={() => toggleSave(activeRoute?.city ?? unknownCity)}
            onBack={goBack}
            onHome={goHome}
            onSaved={goSaved}
          />
        </ScreenSlide>
      )}

      {screen === "saved" && (
        <ScreenSlide id="saved" direction={direction}>
          <SavedScreen saved={saved} onOpen={goTo} onHome={goHome} onSaved={goSaved} />
        </ScreenSlide>
      )}

      {screen === "regions" && (
        <ScreenSlide id="regions" direction={direction}>
          <RegionsScreen onOpen={goTo} onBack={goHome} onSaved={goSaved} />
        </ScreenSlide>
      )}
    </div>
  );
}

// ─── Loading screen ───────────────────────────────────────────────────
function LoadingScreen({ city }: { city: string }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", gap: 20 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#111", marginBottom: 8 }}>
          <span style={{ color: ORANGE }}>{city}</span> rotası
        </div>
        <div style={{ fontSize: 14, color: "#888", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
          planlanıyor
          <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                width: 7, height: 7, borderRadius: 4,
                backgroundColor: ORANGE,
                display: "inline-block",
                animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Home screen ──────────────────────────────────────────────────────
function HomeScreen({ search, onSearchChange, onOpen, onSaved, onRegions }: {
  search: string;
  onSearchChange: (v: string) => void;
  onOpen: (city: string) => void;
  onSaved: () => void;
  onRegions: () => void;
}) {
  return (
    <div style={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden" }}>
      {/* Status bar */}
      <StatusBar />

      {/* Header */}
      <div style={{ padding: "14px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, color: "#888", fontWeight: 500, marginBottom: 2, display: "flex", alignItems: "center", gap: 4 }}>
            <MapPin size={12} color={ORANGE} /> Merhaba, Gezgin!
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1, color: "#111", lineHeight: 1 }}>
            Gez<span style={{ color: ORANGE }}>IN</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
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

      {/* AI Banner */}
      <div style={{ margin: "16px 24px 0", borderRadius: 20, background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_DARK})`, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, boxShadow: `0 6px 24px rgba(230,126,34,0.25)` }}>
        <div style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Sparkles size={22} color="white" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Yapay Zeka Rehberin</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>Şehre tıkla, rotanı anında gör!</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "14px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "#F7F7F7", borderRadius: 18, padding: "13px 18px", border: "1.5px solid #F0F0F0" }}>
          <Search size={20} color={ORANGE} strokeWidth={2.5} />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search.trim() && onOpen(search.trim())}
            placeholder="Nereyi gezinmek istersin?"
            style={{ fontSize: 15, color: "#333", flex: 1, background: "none", border: "none", outline: "none", fontFamily: "inherit" }}
          />
          {search.trim() && (
            <button onClick={() => onOpen(search.trim())} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", flexShrink: 0 }}>
              <Send size={15} color="white" />
            </button>
          )}
        </div>
      </div>

      {/* Tags */}
      <div style={{ padding: "12px 24px 0", display: "flex", gap: 8 }}>
        {["Tümü", "Doğa", "Tarih", "Sahil", "Dağ"].map((tag, i) => (
          <div key={tag} style={{ padding: "7px 15px", borderRadius: 20, backgroundColor: i === 0 ? ORANGE : "#F7F7F7", color: i === 0 ? "white" : "#666", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer" }}>
            {tag}
          </div>
        ))}
      </div>

      {/* Önerilen Yerler */}
      <SectionHeader title="Önerilen Yerler" />
      <div style={{ paddingLeft: 24, display: "flex", gap: 14, overflowX: "auto", paddingBottom: 4, paddingRight: 8 }}>
        {CITY_CIRCLES.map((c) => (
          <div key={c.name} onClick={() => onOpen(c.name)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0, cursor: "pointer" }}>
            <div style={{ width: 70, height: 70, borderRadius: 35, overflow: "hidden", border: `2.5px solid ${ORANGE}`, boxShadow: `0 4px 14px rgba(230,126,34,0.18)` }}>
              <img src={c.image} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = "none";
                  if (t.parentElement) t.parentElement.style.background = `linear-gradient(135deg,${ORANGE},${ORANGE_DARK})`;
                }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#111", textAlign: "center" }}>{c.name}</span>
          </div>
        ))}
      </div>

      <div style={{ margin: "18px 24px 0", height: 1, backgroundColor: "#F3F3F3" }} />

      {/* Popüler Rotalar */}
      <SectionHeader title="Popüler Rotalar" onAll={onRegions} />
      <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        {FEATURED.map((p) => (
          <div key={p.name} onClick={() => onOpen(p.name)} style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.07)", border: "1px solid #F3F3F3", cursor: "pointer" }}>
            <div style={{ position: "relative", height: 140 }}>
              <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5))" }} />
              <div style={{ position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: 17, backgroundColor: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Heart size={16} color={ORANGE} />
              </div>
              <div style={{ position: "absolute", top: 12, left: 12, backgroundColor: ORANGE, color: "white", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{p.tag}</div>
            </div>
            <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                  <MapPin size={12} color="#AAA" />
                  <span style={{ fontSize: 12, color: "#888" }}>{p.subtitle}, Türkiye</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Star size={13} color={ORANGE} fill={ORANGE} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{p.rating}</span>
                </div>
                <span style={{ fontSize: 11, color: "#AAA" }}>{p.reviews} değerlendirme</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <BottomNav active={0} onHome={() => {}} onSaved={onSaved} />
    </div>
  );
}

// ─── Guide screen ─────────────────────────────────────────────────────
function GuideScreen({ route, unknownCity, isSaved, onToggleSave, onBack, onHome, onSaved }: {
  route: Route | null;
  unknownCity: string;
  isSaved: boolean;
  onToggleSave: () => void;
  onBack: () => void;
  onHome: () => void;
  onSaved: () => void;
}) {
  const cityLabel = route?.city ?? unknownCity;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBar />

      {/* Header */}
      <div style={{ padding: "10px 24px 14px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0, borderBottom: "1px solid #F3F3F3" }}>
        <button
          onClick={onBack}
          style={{ width: 38, height: 38, borderRadius: 19, border: "none", backgroundColor: "#F7F7F7", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
        >
          <ArrowLeft size={18} color="#333" />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "#AAA", fontWeight: 500 }}>GezIN Rehberi</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#111", lineHeight: 1.2 }}>
            {cityLabel} <span style={{ color: ORANGE }}>Rotası</span>
          </div>
        </div>
        {/* Save button */}
        <button
          onClick={onToggleSave}
          style={{
            width: 38, height: 38, borderRadius: 19, border: "none", cursor: "pointer",
            backgroundColor: isSaved ? ORANGE_LIGHT : "#F7F7F7",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background-color 0.2s",
            flexShrink: 0,
          }}
        >
          {isSaved
            ? <Bookmark size={18} color={ORANGE} fill={ORANGE} />
            : <Bookmark size={18} color="#888" />}
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 20px 24px" }}>
        {route ? (
          <RouteContent route={route} />
        ) : (
          <UnknownCity city={unknownCity} onBack={onBack} />
        )}
      </div>

      <BottomNav active={1} onHome={onHome} onSaved={onSaved} />
    </div>
  );
}

// ─── Route content ────────────────────────────────────────────────────
function RouteContent({ route }: { route: Route }) {
  return (
    <>
      {/* Banner */}
      <div style={{ backgroundColor: ORANGE_LIGHT, borderRadius: 16, padding: "13px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10, animation: "fade-in 0.4s ease forwards" }}>
        <span style={{ fontSize: 22 }}>🎉</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: ORANGE }}>Harika seçim!</div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 1 }}>GezIN rehberin hazır. İyi geziler!</div>
        </div>
      </div>

      {route.days.map((day, di) => (
        <div key={di} style={{ backgroundColor: "#fff", borderRadius: 20, boxShadow: "0 2px 14px rgba(0,0,0,0.07)", border: "1px solid #F0F0F0", marginBottom: 14, overflow: "hidden", animation: `fade-in 0.4s ease ${di * 0.1 + 0.1}s both` }}>
          {/* Day header */}
          <div style={{ backgroundColor: di % 2 === 0 ? ORANGE : "#111", padding: "11px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "white", flexShrink: 0 }}>
              {di + 1}
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "white", lineHeight: 1.3 }}>{day.title}</span>
          </div>
          {/* Items */}
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 11 }}>
            {day.items.map((item, ii) => (
              <div key={ii} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 17, flexShrink: 0, lineHeight: 1.45 }}>{item.icon}</span>
                <p style={{ fontSize: 13, color: "#444", lineHeight: 1.6, margin: 0 }}>
                  {item.before}
                  {item.bold && <strong style={{ color: ORANGE }}>{item.bold}</strong>}
                  {item.after}
                  {"bold2" in item && <><strong style={{ color: ORANGE }}>{(item as any).bold2}</strong>{(item as any).after2}</>}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ padding: "12px 14px", backgroundColor: "#F7F7F7", borderRadius: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>✨</span>
        <div style={{ fontSize: 12, color: "#666", lineHeight: 1.55 }}>
          Başka bir şehir için rota ister misin? <span style={{ color: ORANGE, fontWeight: 700 }}>Geri dön</span> ve yeni bir şehir seç!
        </div>
      </div>
    </>
  );
}

// ─── Unknown city ────────────────────────────────────────────────────
function UnknownCity({ city, onBack }: { city: string; onBack: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 48, gap: 14, textAlign: "center", animation: "fade-in 0.4s ease forwards" }}>
      <div style={{ fontSize: 48 }}>🗺️</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>"{city}" için rota yok</div>
      <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6, maxWidth: 260 }}>
        Şu an&nbsp;
        {["Ankara","Samsun","İstanbul","İzmir","Eskişehir","Antalya","Kapadokya","Pamukkale"].map((c, i, arr) => (
          <span key={c}><span style={{ color: ORANGE, fontWeight: 700 }}>{c}</span>{i < arr.length - 1 ? ", " : ""}</span>
        ))}
        &nbsp;için rotalarımız hazır.
      </div>
      <button onClick={onBack} style={{ marginTop: 8, backgroundColor: ORANGE, color: "white", border: "none", borderRadius: 14, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
        Geri Dön
      </button>
    </div>
  );
}

// ─── Saved tours screen ───────────────────────────────────────────────
function SavedScreen({ saved, onOpen, onHome, onSaved }: {
  saved: string[];
  onOpen: (city: string) => void;
  onHome: () => void;
  onSaved: () => void;
}) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBar />

      {/* Header */}
      <div style={{ padding: "14px 24px 14px", flexShrink: 0, borderBottom: "1px solid #F3F3F3" }}>
        <div style={{ fontSize: 11, color: "#AAA", fontWeight: 500 }}>GezIN</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#111", lineHeight: 1.2 }}>
          Kaydedilen <span style={{ color: ORANGE }}>Turlar</span>
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 24px" }}>
        {saved.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 56, gap: 14, textAlign: "center", animation: "fade-in 0.4s ease forwards" }}>
            <div style={{ fontSize: 48 }}>🔖</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>Henüz kaydedilen tur yok</div>
            <div style={{ fontSize: 13, color: "#888", maxWidth: 240, lineHeight: 1.55 }}>
              Bir rota ekranında sağ üstteki <span style={{ color: ORANGE, fontWeight: 700 }}>kaydet</span> simgesine bas!
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fade-in 0.35s ease forwards" }}>
            {saved.map((city, i) => (
              <div
                key={city}
                onClick={() => onOpen(city)}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  border: "1px solid #F0F0F0",
                  boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  cursor: "pointer",
                  animation: `fade-in 0.35s ease ${i * 0.07}s both`,
                }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 23, background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_DARK})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin size={20} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>{city}</div>
                  <div style={{ fontSize: 12, color: "#AAA", marginTop: 2 }}>Kaydedilmiş rota · Türkiye</div>
                </div>
                <div style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: ORANGE_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ChevronRight size={16} color={ORANGE} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav active={2} onHome={onHome} onSaved={onSaved} />
    </div>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 24px 0", fontSize: 12, fontWeight: 600, color: "#111", flexShrink: 0 }}>
      <span>9:41</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
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
  );
}

function SectionHeader({ title, onAll }: { title: string; onAll?: () => void }) {
  return (
    <div style={{ padding: "18px 24px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 17, fontWeight: 700, color: "#111" }}>{title}</span>
      <span onClick={onAll} style={{ fontSize: 13, color: ORANGE, fontWeight: 600, display: "flex", alignItems: "center", gap: 2, cursor: onAll ? "pointer" : "default" }}>
        Tümünü Gör <ChevronRight size={14} />
      </span>
    </div>
  );
}

// ─── Regions screen ───────────────────────────────────────────────────
function RegionsScreen({ onOpen, onBack, onSaved }: {
  onOpen: (city: string) => void;
  onBack: () => void;
  onSaved: () => void;
}) {
  const [openRegion, setOpenRegion] = useState<string | null>(null);

  const toggle = (name: string) =>
    setOpenRegion((prev) => (prev === name ? null : name));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBar />

      {/* Header */}
      <div style={{ padding: "10px 24px 14px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0, borderBottom: "1px solid #F3F3F3" }}>
        <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 19, border: "none", backgroundColor: "#F7F7F7", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <ArrowLeft size={18} color="#333" />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "#AAA", fontWeight: 500 }}>GezIN</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#111", lineHeight: 1.2 }}>
            Bölgesel <span style={{ color: ORANGE }}>Keşif</span>
          </div>
        </div>
      </div>

      {/* Accordion list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 0 24px" }}>
        {REGIONS.map((region, ri) => {
          const isOpen = openRegion === region.name;
          return (
            <div key={region.name} style={{ animation: `fade-in 0.3s ease ${ri * 0.05}s both` }}>
              {/* Region row */}
              <div
                onClick={() => toggle(region.name)}
                style={{
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  cursor: "pointer",
                  backgroundColor: isOpen ? ORANGE_LIGHT : "transparent",
                  borderBottom: isOpen ? "none" : "1px solid #F5F5F5",
                  transition: "background-color 0.2s",
                }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 21, flexShrink: 0,
                  backgroundColor: isOpen ? ORANGE : "#F7F7F7",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20,
                  transition: "background-color 0.2s",
                  boxShadow: isOpen ? `0 4px 12px rgba(230,126,34,0.25)` : "none",
                }}>
                  {region.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: isOpen ? ORANGE : "#111" }}>{region.name}</div>
                  <div style={{ fontSize: 12, color: "#AAA", marginTop: 1 }}>{region.cities.length} şehir</div>
                </div>
                <div style={{
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.25s",
                  color: isOpen ? ORANGE : "#CCC",
                }}>
                  <ChevronRight size={18} />
                </div>
              </div>

              {/* Cities grid */}
              {isOpen && (
                <div style={{
                  padding: "14px 20px 18px",
                  backgroundColor: ORANGE_LIGHT,
                  borderBottom: "1px solid #F5F5F5",
                  animation: "fade-in 0.25s ease forwards",
                }}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "14px 8px",
                  }}>
                    {region.cities.map((city) => (
                      <div
                        key={city.name}
                        onClick={() => onOpen(city.name)}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}
                      >
                        <div style={{
                          width: 64, height: 64, borderRadius: 32,
                          overflow: "hidden",
                          border: `2px solid ${ORANGE}`,
                          boxShadow: "0 3px 10px rgba(230,126,34,0.2)",
                          backgroundColor: ORANGE,
                        }}>
                          {city.img ? (
                            <img
                              src={city.img}
                              alt={city.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={(e) => {
                                const t = e.target as HTMLImageElement;
                                t.style.display = "none";
                                if (t.parentElement) {
                                  t.parentElement.style.background = `linear-gradient(135deg,${ORANGE},${ORANGE_DARK})`;
                                  t.parentElement.innerHTML = `<span style="color:white;font-size:22px;display:flex;align-items:center;justify-content:center;width:100%;height:100%">📍</span>`;
                                }
                              }}
                            />
                          ) : (
                            <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg,${ORANGE},${ORANGE_DARK})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <MapPin size={22} color="white" />
                            </div>
                          )}
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#111", textAlign: "center", lineHeight: 1.3 }}>{city.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <BottomNav active={1} onHome={onBack} onSaved={onSaved} />
    </div>
  );
}

function BottomNav({ active, onHome, onSaved }: { active: number; onHome: () => void; onSaved: () => void; }) {
  const tabs = [
    { icon: <Home size={22} />,     onClick: onHome },
    { icon: <Compass size={22} />,  onClick: () => {} },
    { icon: <Bookmark size={22} />, onClick: onSaved },
    { icon: <User size={22} />,     onClick: () => {} },
  ];
  return (
    <div style={{ margin: "0 20px 24px", backgroundColor: "#111", borderRadius: 28, padding: "13px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, boxShadow: "0 8px 28px rgba(0,0,0,0.18)" }}>
      {tabs.map((tab, i) => (
        <div key={i} onClick={tab.onClick} style={{ color: i === active ? ORANGE : "rgba(255,255,255,0.4)", cursor: "pointer", position: "relative" }}>
          {i === active && <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: 2, backgroundColor: ORANGE }} />}
          {tab.icon}
        </div>
      ))}
    </div>
  );
}
