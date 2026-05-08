import type { ImageSourcePropType } from "react-native";

export type Category =
  | "Tümü"
  | "Doğa"
  | "Tarih"
  | "Sahil"
  | "Dağ"
  | "Gastronomi";

export const CATEGORIES: Category[] = [
  "Tümü",
  "Doğa",
  "Tarih",
  "Sahil",
  "Dağ",
  "Gastronomi",
];

export type City = {
  id: string;
  name: string;
  region: string;
  image: ImageSourcePropType;
};

export const CITIES: City[] = [
  {
    id: "istanbul",
    name: "İstanbul",
    region: "Marmara",
    image: require("../assets/images/istanbul.png"),
  },
  {
    id: "kapadokya",
    name: "Kapadokya",
    region: "İç Anadolu",
    image: require("../assets/images/cappadocia.png"),
  },
  {
    id: "antalya",
    name: "Antalya",
    region: "Akdeniz",
    image: require("../assets/images/antalya.png"),
  },
  {
    id: "rize",
    name: "Rize",
    region: "Karadeniz",
    image: require("../assets/images/karadeniz.png"),
  },
  {
    id: "izmir",
    name: "İzmir",
    region: "Ege",
    image: require("../assets/images/antalya.png"),
  },
  {
    id: "bursa",
    name: "Bursa",
    region: "Marmara",
    image: require("../assets/images/karadeniz.png"),
  },
];

export type Stop = {
  id: string;
  title: string;
  description: string;
  arrival: string;
  duration: string;
  travelTime?: string;
  travelMode?: "walk" | "car" | "transit";
  distance?: string;
};

export type Day = {
  id: string;
  label: string;
  date: string;
  stops: Stop[];
};

export type Route = {
  id: string;
  city: string;
  cityId: string;
  theme: Category;
  title: string;
  rating: number;
  reviewCount: number;
  durationDays: number;
  budget: "Ekonomik" | "Konfor" | "Lüks";
  image: ImageSourcePropType;
  highlights: string[];
  description: string;
  days: Day[];
};

export const ROUTES: Route[] = [
  {
    id: "route-cappadocia",
    city: "Kapadokya",
    cityId: "kapadokya",
    theme: "Doğa",
    title: "Peri Bacaları & Balon Turu",
    rating: 4.9,
    reviewCount: 1284,
    durationDays: 2,
    budget: "Konfor",
    image: require("../assets/images/cappadocia.png"),
    highlights: ["Sıcak hava balonu", "Göreme", "Uçhisar"],
    description:
      "Şafakta gökyüzünü dolduran balonlar, peri bacaları arasında yürüyüşler ve yer altı şehirleri.",
    days: [
      {
        id: "d1",
        label: "Cmt",
        date: "12 Eyl",
        stops: [
          {
            id: "s1",
            title: "Balon Turu",
            description: "Göreme üzerinde gün doğumu turu",
            arrival: "05:30",
            duration: "1s 30dk",
          },
          {
            id: "s2",
            title: "Göreme Açık Hava Müzesi",
            description: "Kayaya oyulmuş kiliseler ve freskler",
            arrival: "09:00",
            duration: "2s",
            travelTime: "12 dk",
            travelMode: "car",
            distance: "4,2 km",
          },
          {
            id: "s3",
            title: "Uçhisar Kalesi",
            description: "Vadiye hakim panoramik manzara",
            arrival: "12:30",
            duration: "1s",
            travelTime: "8 dk",
            travelMode: "car",
            distance: "3,1 km",
          },
          {
            id: "s4",
            title: "Sunset Point",
            description: "Kızıl Vadi'de gün batımı",
            arrival: "18:15",
            duration: "1s",
            travelTime: "20 dk",
            travelMode: "car",
            distance: "9,8 km",
          },
        ],
      },
      {
        id: "d2",
        label: "Paz",
        date: "13 Eyl",
        stops: [
          {
            id: "s5",
            title: "Derinkuyu Yer Altı Şehri",
            description: "8 katlı antik yer altı yerleşimi",
            arrival: "10:00",
            duration: "1s 30dk",
          },
          {
            id: "s6",
            title: "Ihlara Vadisi",
            description: "Yeşil vadide yürüyüş ve manastırlar",
            arrival: "13:00",
            duration: "2s",
            travelTime: "35 dk",
            travelMode: "car",
            distance: "28 km",
          },
        ],
      },
    ],
  },
  {
    id: "route-istanbul",
    city: "İstanbul",
    cityId: "istanbul",
    theme: "Tarih",
    title: "Tarihi Yarımada Klasiği",
    rating: 4.8,
    reviewCount: 2103,
    durationDays: 3,
    budget: "Lüks",
    image: require("../assets/images/istanbul.png"),
    highlights: ["Ayasofya", "Topkapı", "Boğaz"],
    description:
      "Bizans'tan Osmanlı'ya iki kıta arasında uzanan bir başkent yolculuğu.",
    days: [
      {
        id: "id1",
        label: "Cum",
        date: "21 Mar",
        stops: [
          {
            id: "is1",
            title: "Ayasofya",
            description: "1500 yıllık kubbe ve mozaikler",
            arrival: "09:00",
            duration: "1s 30dk",
          },
          {
            id: "is2",
            title: "Sultanahmet Camii",
            description: "Mavi çinileriyle ünlü altı minareli cami",
            arrival: "11:00",
            duration: "1s",
            travelTime: "5 dk",
            travelMode: "walk",
            distance: "0,4 km",
          },
          {
            id: "is3",
            title: "Topkapı Sarayı",
            description: "Osmanlı padişahlarının evi",
            arrival: "13:30",
            duration: "2s",
            travelTime: "8 dk",
            travelMode: "walk",
            distance: "0,7 km",
          },
          {
            id: "is4",
            title: "Kapalıçarşı",
            description: "4000 dükkanlı kapalı çarşı",
            arrival: "16:30",
            duration: "1s 30dk",
            travelTime: "10 dk",
            travelMode: "walk",
            distance: "0,9 km",
          },
        ],
      },
      {
        id: "id2",
        label: "Cmt",
        date: "22 Mar",
        stops: [
          {
            id: "is5",
            title: "Boğaz Turu",
            description: "İki kıta arasında tekne keyfi",
            arrival: "10:00",
            duration: "2s",
          },
          {
            id: "is6",
            title: "Karaköy Kahvaltısı",
            description: "Sahilde geleneksel serpme kahvaltı",
            arrival: "12:30",
            duration: "1s 15dk",
            travelTime: "12 dk",
            travelMode: "transit",
            distance: "2,8 km",
          },
        ],
      },
      {
        id: "id3",
        label: "Paz",
        date: "23 Mar",
        stops: [
          {
            id: "is7",
            title: "Galata Kulesi",
            description: "Şehrin panoramik manzarası",
            arrival: "11:00",
            duration: "1s",
          },
          {
            id: "is8",
            title: "İstiklal Caddesi",
            description: "Tarihi tramvay ve butikler",
            arrival: "12:30",
            duration: "2s",
            travelTime: "6 dk",
            travelMode: "walk",
            distance: "0,5 km",
          },
        ],
      },
    ],
  },
  {
    id: "route-antalya",
    city: "Antalya",
    cityId: "antalya",
    theme: "Sahil",
    title: "Akdeniz Sahil Klasiği",
    rating: 4.7,
    reviewCount: 894,
    durationDays: 4,
    budget: "Ekonomik",
    image: require("../assets/images/antalya.png"),
    highlights: ["Kaleiçi", "Konyaaltı", "Düden Şelalesi"],
    description:
      "Turkuaz koylar, antik şehirler ve Akdeniz'in en güzel sahilleri.",
    days: [
      {
        id: "ad1",
        label: "Per",
        date: "5 Tem",
        stops: [
          {
            id: "as1",
            title: "Kaleiçi",
            description: "Tarihi taş sokaklarda kaybolun",
            arrival: "10:00",
            duration: "2s",
          },
          {
            id: "as2",
            title: "Konyaaltı Plajı",
            description: "Toroslar manzaralı kıyı",
            arrival: "13:00",
            duration: "3s",
            travelTime: "15 dk",
            travelMode: "transit",
            distance: "5,1 km",
          },
        ],
      },
    ],
  },
  {
    id: "route-rize",
    city: "Rize",
    cityId: "rize",
    theme: "Dağ",
    title: "Karadeniz Yayla Turu",
    rating: 4.6,
    reviewCount: 412,
    durationDays: 3,
    budget: "Ekonomik",
    image: require("../assets/images/karadeniz.png"),
    highlights: ["Ayder", "Pokut", "Çay tarlaları"],
    description:
      "Sisli yaylalar, çağlayanlar ve yemyeşil çay tarlaları arasında huzur dolu bir kaçış.",
    days: [
      {
        id: "rd1",
        label: "Cmt",
        date: "8 Ağu",
        stops: [
          {
            id: "rs1",
            title: "Ayder Yaylası",
            description: "Sisli yamaçlar ve kaplıcalar",
            arrival: "09:00",
            duration: "3s",
          },
          {
            id: "rs2",
            title: "Pokut Yaylası",
            description: "Tahta evler ve panoramik manzara",
            arrival: "13:30",
            duration: "2s",
            travelTime: "45 dk",
            travelMode: "car",
            distance: "32 km",
          },
        ],
      },
    ],
  },
];

export type TripMember = {
  id: string;
  name: string;
  initials: string;
  color: string;
};

export type TripNote = {
  id: string;
  text: string;
  authorId: string;
  done: boolean;
};

export type Trip = {
  id: string;
  title: string;
  cityId: string;
  routeId: string;
  startDate: string;
  endDate: string;
  cover: ImageSourcePropType;
  members: TripMember[];
  notes: TripNote[];
  places: { id: string; name: string; addedById: string }[];
};

export const SAMPLE_TRIPS: Trip[] = [
  {
    id: "trip-istanbul",
    title: "Arkadaşlar ile İstanbul Gezisi",
    cityId: "istanbul",
    routeId: "route-istanbul",
    startDate: "21 Mar",
    endDate: "23 Mar",
    cover: require("../assets/images/istanbul.png"),
    members: [
      { id: "u1", name: "Sen", initials: "SE", color: "#FF6B35" },
      { id: "u2", name: "Elif", initials: "EL", color: "#4F46E5" },
      { id: "u3", name: "Mert", initials: "ME", color: "#0EA5E9" },
      { id: "u4", name: "Zeynep", initials: "ZE", color: "#10B981" },
    ],
    notes: [
      { id: "n1", text: "Ayasofya için bilet al", authorId: "u2", done: true },
      {
        id: "n2",
        text: "Karaköy'de balık ekmek dene",
        authorId: "u3",
        done: false,
      },
      {
        id: "n3",
        text: "Galata'da gün batımı için yer ayır",
        authorId: "u1",
        done: false,
      },
      { id: "n4", text: "Pazar sabahı erken kalk", authorId: "u4", done: false },
    ],
    places: [
      { id: "p1", name: "Ayasofya", addedById: "u2" },
      { id: "p2", name: "Topkapı Sarayı", addedById: "u1" },
      { id: "p3", name: "Galata Kulesi", addedById: "u3" },
      { id: "p4", name: "Kapalıçarşı", addedById: "u4" },
    ],
  },
];

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
};

export const BADGES: Badge[] = [
  {
    id: "b1",
    name: "İlk Adım",
    description: "İlk şehrini keşfettin",
    icon: "flag",
    earned: true,
  },
  {
    id: "b2",
    name: "Yedi Tepe",
    description: "İstanbul'u tamamladın",
    icon: "award",
    earned: true,
  },
  {
    id: "b3",
    name: "Balon Pilotu",
    description: "Kapadokya'da balona bindin",
    icon: "wind",
    earned: true,
  },
  {
    id: "b4",
    name: "Sahil Avcısı",
    description: "5 sahil noktası ziyaret et",
    icon: "umbrella",
    earned: false,
  },
  {
    id: "b5",
    name: "Yaylacı",
    description: "3 yayla rotası tamamla",
    icon: "cloud",
    earned: false,
  },
  {
    id: "b6",
    name: "Gurme",
    description: "10 yerel lezzet keşfet",
    icon: "coffee",
    earned: false,
  },
];

export const USER = {
  name: "İbrahim Yağlı",
  handle: "@ibrahimygl",
  location: "İstanbul, Türkiye",
  visitedCities: 12,
  visitedPlaces: 47,
  upcomingTrips: 2,
};

export const TRANSIT_LINE = {
  name: "Taksim — Mecidiyeköy",
  direction: "Mecidiyeköy Yönü",
  vehicle: "Metro M2",
  eta: "4 dk",
  stops: [
    { id: "t1", name: "Taksim", passed: true },
    { id: "t2", name: "Osmanbey", passed: true },
    { id: "t3", name: "Şişli", passed: false, current: true },
    { id: "t4", name: "Gayrettepe", passed: false },
    { id: "t5", name: "Mecidiyeköy", passed: false },
  ],
};
