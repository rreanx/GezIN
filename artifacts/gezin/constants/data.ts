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
    image: require("../assets/images/nevşehir.png"),
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
    image: require("../assets/images/rize.png"),
  },
  {
    id: "izmir",
    name: "İzmir",
    region: "Ege",
    image: require("../assets/images/izmir.png"),
  },
  {
    id: "bursa",
    name: "Bursa",
    region: "Marmara",
    image: require("../assets/images/bursa.png"),
  },
  {
    id: "ankara",
    name: "Ankara",
    region: "İç Anadolu",
    image: require("../assets/images/ankara.png"),
  },
  {
    id: "eskisehir",
    name: "Eskişehir",
    region: "İç Anadolu",
    image: require("../assets/images/eskişehir.png"),
  },
  {
    id: "konya",
    name: "Konya",
    region: "İç Anadolu",
    image: require("../assets/images/konya.png"),
  },
  {
    id: "mugla",
    name: "Muğla",
    region: "Ege",
    image: require("../assets/images/muğla.png"),
  },
  {
    id: "corum",
    name: "Çorum",
    region: "Karadeniz",
    image: require("../assets/images/çorum.png"),
  },
  {
    id: "samsun",
    name: "Samsun",
    region: "Karadeniz",
    image: require("../assets/images/samsun.png"),
  },
  {
    id: "diyarbakir",
    name: "Diyarbakır",
    region: "Güneydoğu Anadolu",
    image: require("../assets/images/diyarbakır.png"),
  },
  {
    id: "trabzon",
    name: "Trabzon",
    region: "Karadeniz",
    image: require("../assets/images/trabzon.png"),
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
    image: require("../assets/images/nevşehir.png"),
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
      {
        id: "ad2",
        label: "Cum",
        date: "6 Tem",
        stops: [
          {
            id: "as3",
            title: "Düden Şelalesi",
            description: "Kayalıklardan denize dökülen çağlayan",
            arrival: "10:00",
            duration: "1s 30dk",
          },
          {
            id: "as4",
            title: "Antalya Müzesi",
            description: "Antik Likya ve Pamfilya eserleri",
            arrival: "13:00",
            duration: "2s",
            travelTime: "18 dk",
            travelMode: "car",
            distance: "7,4 km",
          },
        ],
      },
      {
        id: "ad3",
        label: "Cmt",
        date: "7 Tem",
        stops: [
          {
            id: "as5",
            title: "Aspendos Antik Tiyatrosu",
            description: "En iyi korunmuş Roma tiyatrosu",
            arrival: "10:00",
            duration: "1s 30dk",
          },
          {
            id: "as6",
            title: "Side Antik Kenti",
            description: "Apollon Tapınağı ve limana nazır sokaklar",
            arrival: "14:00",
            duration: "2s 30dk",
            travelTime: "35 dk",
            travelMode: "car",
            distance: "42 km",
          },
        ],
      },
      {
        id: "ad4",
        label: "Paz",
        date: "8 Tem",
        stops: [
          {
            id: "as7",
            title: "Lara Plajı",
            description: "İnce kumsal ve kayalık uçurumlar",
            arrival: "09:30",
            duration: "3s",
          },
          {
            id: "as8",
            title: "Karaalioğlu Parkı",
            description: "Deniz manzaralı gün batımı",
            arrival: "18:00",
            duration: "1s",
            travelTime: "22 dk",
            travelMode: "transit",
            distance: "9,3 km",
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
    image: require("../assets/images/rize.png"),
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
      {
        id: "rd2",
        label: "Paz",
        date: "9 Ağu",
        stops: [
          {
            id: "rs3",
            title: "Çay Bahçeleri",
            description: "Yamaçlarda uzanan yeşil çay tarlaları",
            arrival: "09:30",
            duration: "1s 30dk",
          },
          {
            id: "rs4",
            title: "Ziraat Botanik Bahçesi",
            description: "Kuş sesleri eşliğinde doğa yürüyüşü",
            arrival: "12:00",
            duration: "2s",
            travelTime: "20 dk",
            travelMode: "car",
            distance: "11 km",
          },
        ],
      },
      {
        id: "rd3",
        label: "Pzt",
        date: "10 Ağu",
        stops: [
          {
            id: "rs5",
            title: "Fırtına Vadisi",
            description: "Osmanlı köprüleri ve akarsu manzarası",
            arrival: "10:00",
            duration: "2s",
          },
          {
            id: "rs6",
            title: "Rize Kalesi",
            description: "Şehir merkezine hakim tarihi kale",
            arrival: "14:30",
            duration: "1s",
            travelTime: "40 dk",
            travelMode: "car",
            distance: "28 km",
          },
        ],
      },
    ],
  },
  {
    id: "route-izmir",
    city: "İzmir",
    cityId: "izmir",
    theme: "Sahil",
    title: "Ege'nin İncisi",
    rating: 4.7,
    reviewCount: 731,
    durationDays: 2,
    budget: "Konfor",
    image: require("../assets/images/izmir.png"),
    highlights: ["Kordon", "Kemeraltı", "Efes"],
    description:
      "Sahil şeridinde gün batımı yürüyüşleri, tarihi çarşı ve antik Efes'e kısa bir kaçamak.",
    days: [
      {
        id: "izd1",
        label: "Cmt",
        date: "14 Haz",
        stops: [
          {
            id: "izs1",
            title: "Kordon (Birinci Kordon)",
            description: "Deniz kıyısında yürüyüş ve kahve molası",
            arrival: "09:30",
            duration: "1s 30dk",
          },
          {
            id: "izs2",
            title: "Saat Kulesi & Konak Meydanı",
            description: "İzmir'in simgesi tarihi meydan",
            arrival: "11:30",
            duration: "1s",
            travelTime: "10 dk",
            travelMode: "walk",
            distance: "0,8 km",
          },
          {
            id: "izs3",
            title: "Kemeraltı Çarşısı",
            description: "Baharat kokulu dar sokaklar ve esnaf",
            arrival: "13:00",
            duration: "2s",
            travelTime: "5 dk",
            travelMode: "walk",
            distance: "0,3 km",
          },
        ],
      },
      {
        id: "izd2",
        label: "Paz",
        date: "15 Haz",
        stops: [
          {
            id: "izs4",
            title: "Efes Antik Kenti",
            description: "Celsus Kütüphanesi ve antik tiyatro",
            arrival: "09:00",
            duration: "3s",
          },
          {
            id: "izs5",
            title: "Şirince Köyü",
            description: "Taş evler, üzüm bağları ve yerel şaraplar",
            arrival: "14:00",
            duration: "2s",
            travelTime: "25 dk",
            travelMode: "car",
            distance: "12 km",
          },
        ],
      },
    ],
  },
  {
    id: "route-bursa",
    city: "Bursa",
    cityId: "bursa",
    theme: "Tarih",
    title: "Osmanlı'nın İlk Başkenti",
    rating: 4.6,
    reviewCount: 528,
    durationDays: 2,
    budget: "Ekonomik",
    image: require("../assets/images/bursa.png"),
    highlights: ["Cumalıkızık", "Ulu Cami", "Uludağ"],
    description:
      "Tarihi köyler, kubbeli çarşılar ve teleferikle çıkılan karlı zirve.",
    days: [
      {
        id: "bud1",
        label: "Cmt",
        date: "21 Eyl",
        stops: [
          {
            id: "bus1",
            title: "Ulu Cami",
            description: "20 kubbeli, şadırvanlı Selçuklu-Osmanlı camii",
            arrival: "10:00",
            duration: "1s",
          },
          {
            id: "bus2",
            title: "Koza Han",
            description: "İpek ticaretinin kalbi, tarihi kervansaray",
            arrival: "11:30",
            duration: "1s 30dk",
            travelTime: "6 dk",
            travelMode: "walk",
            distance: "0,4 km",
          },
          {
            id: "bus3",
            title: "Cumalıkızık",
            description: "Osmanlı dönemi ahşap evleriyle tarihi köy",
            arrival: "14:00",
            duration: "2s",
            travelTime: "25 dk",
            travelMode: "car",
            distance: "15 km",
          },
        ],
      },
      {
        id: "bud2",
        label: "Paz",
        date: "22 Eyl",
        stops: [
          {
            id: "bus4",
            title: "Uludağ Teleferiği",
            description: "Bursa'ya tepeden bakan kayak merkezi",
            arrival: "10:00",
            duration: "3s",
          },
          {
            id: "bus5",
            title: "Yeşil Türbe & Yeşil Cami",
            description: "Firuze çinilerle bezeli Osmanlı mimarisi",
            arrival: "15:00",
            duration: "1s",
            travelTime: "30 dk",
            travelMode: "car",
            distance: "18 km",
          },
        ],
      },
    ],
  },
  {
    id: "route-ankara",
    city: "Ankara",
    cityId: "ankara",
    theme: "Tarih",
    title: "Başkentin İzinde",
    rating: 4.5,
    reviewCount: 389,
    durationDays: 2,
    budget: "Ekonomik",
    image: require("../assets/images/ankara.png"),
    highlights: ["Anıtkabir", "Hamamönü", "Ankara Kalesi"],
    description:
      "Cumhuriyet tarihi, Osmanlı sokakları ve kaleden şehir manzarası.",
    days: [
      {
        id: "and1",
        label: "Cmt",
        date: "19 Nis",
        stops: [
          {
            id: "ans1",
            title: "Anıtkabir",
            description: "Atatürk'ün anıt mezarı ve müzesi",
            arrival: "09:30",
            duration: "2s",
          },
          {
            id: "ans2",
            title: "Anadolu Medeniyetleri Müzesi",
            description: "Hitit ve Frig eserleriyle ödüllü müze",
            arrival: "13:00",
            duration: "1s 30dk",
            travelTime: "20 dk",
            travelMode: "car",
            distance: "8 km",
          },
        ],
      },
      {
        id: "and2",
        label: "Paz",
        date: "20 Nis",
        stops: [
          {
            id: "ans3",
            title: "Ankara Kalesi",
            description: "Şehre hakim tarihi kale ve dar sokaklar",
            arrival: "10:00",
            duration: "1s 30dk",
          },
          {
            id: "ans4",
            title: "Hamamönü",
            description: "Restore edilmiş Osmanlı evleri, kafeler",
            arrival: "12:00",
            duration: "2s",
            travelTime: "12 dk",
            travelMode: "walk",
            distance: "1 km",
          },
        ],
      },
    ],
  },
  {
    id: "route-eskisehir",
    city: "Eskişehir",
    cityId: "eskisehir",
    theme: "Gastronomi",
    title: "Porsuk Kıyısında Bir Mola",
    rating: 4.6,
    reviewCount: 276,
    durationDays: 2,
    budget: "Ekonomik",
    image: require("../assets/images/eskişehir.png"),
    highlights: ["Odunpazarı", "Porsuk Çayı", "Sazova"],
    description:
      "Renkli Osmanlı evleri, kanal kenarı kafeler ve öğrenci şehrinin enerjisi.",
    days: [
      {
        id: "esd1",
        label: "Cmt",
        date: "3 May",
        stops: [
          {
            id: "ess1",
            title: "Odunpazarı Evleri",
            description: "Renkli, korunmuş Osmanlı mahallesi",
            arrival: "10:00",
            duration: "2s",
          },
          {
            id: "ess2",
            title: "Porsuk Çayı Kıyısı",
            description: "Gondollarla nehir turu ve kafeler",
            arrival: "13:00",
            duration: "1s 30dk",
            travelTime: "15 dk",
            travelMode: "walk",
            distance: "1,2 km",
          },
        ],
      },
      {
        id: "esd2",
        label: "Paz",
        date: "4 May",
        stops: [
          {
            id: "ess3",
            title: "Sazova Bilim, Deneyim ve Kültür Merkezi",
            description: "Masal Şatosu ve bilim müzesi",
            arrival: "10:00",
            duration: "2s 30dk",
          },
          {
            id: "ess4",
            title: "Kurşunlu Külliyesi",
            description: "16. yüzyıldan kalma Osmanlı külliyesi",
            arrival: "14:00",
            duration: "1s",
            travelTime: "18 dk",
            travelMode: "car",
            distance: "6,5 km",
          },
        ],
      },
    ],
  },
  {
    id: "route-konya",
    city: "Konya",
    cityId: "konya",
    theme: "Tarih",
    title: "Mevlana'nın Şehri",
    rating: 4.7,
    reviewCount: 445,
    durationDays: 2,
    budget: "Ekonomik",
    image: require("../assets/images/konya.png"),
    highlights: ["Mevlana Müzesi", "Alaeddin Tepesi", "Sille"],
    description:
      "Selçuklu mimarisi, tasavvuf kültürü ve tarihi Konya sokakları.",
    days: [
      {
        id: "kod1",
        label: "Cum",
        date: "11 Ekim",
        stops: [
          {
            id: "kos1",
            title: "Mevlana Müzesi",
            description: "Yeşil kubbesiyle Mevlana'nın türbesi",
            arrival: "09:30",
            duration: "1s 30dk",
          },
          {
            id: "kos2",
            title: "Alaeddin Tepesi & Camii",
            description: "Selçuklu Sultanları Camii, şehir tepesi",
            arrival: "11:30",
            duration: "1s",
            travelTime: "10 dk",
            travelMode: "walk",
            distance: "0,9 km",
          },
          {
            id: "kos3",
            title: "İnce Minareli Medrese",
            description: "Taş işçiliğiyle ünlü Selçuklu medresesi",
            arrival: "13:00",
            duration: "1s",
            travelTime: "6 dk",
            travelMode: "walk",
            distance: "0,4 km",
          },
        ],
      },
      {
        id: "kod2",
        label: "Cmt",
        date: "12 Ekim",
        stops: [
          {
            id: "kos4",
            title: "Sille Köyü",
            description: "Kayaya oyulmuş kiliseler ve taş evler",
            arrival: "10:00",
            duration: "2s",
            travelTime: "20 dk",
            travelMode: "car",
            distance: "9 km",
          },
          {
            id: "kos5",
            title: "Tropikal Kelebek Bahçesi",
            description: "Yüzlerce kelebek türü ve şelale",
            arrival: "13:30",
            duration: "1s 30dk",
          },
        ],
      },
    ],
  },
  {
    id: "route-mugla",
    city: "Muğla",
    cityId: "mugla",
    theme: "Sahil",
    title: "Ege'nin Turkuaz Koyları",
    rating: 4.8,
    reviewCount: 967,
    durationDays: 3,
    budget: "Lüks",
    image: require("../assets/images/muğla.png"),
    highlights: ["Bodrum Kalesi", "Ölüdeniz", "Kabak Koyu"],
    description:
      "Beyaz badanalı evler, turkuaz koylar ve yamaç paraşütüyle kuş bakışı manzaralar.",
    days: [
      {
        id: "mud1",
        label: "Per",
        date: "17 Tem",
        stops: [
          {
            id: "mus1",
            title: "Bodrum Kalesi",
            description: "Sualtı Arkeoloji Müzesi'ne ev sahipliği yapıyor",
            arrival: "10:00",
            duration: "2s",
          },
          {
            id: "mus2",
            title: "Bodrum Marina",
            description: "Yat limanı boyunca akşam yürüyüşü",
            arrival: "19:00",
            duration: "1s 30dk",
            travelTime: "8 dk",
            travelMode: "walk",
            distance: "0,6 km",
          },
        ],
      },
      {
        id: "mud2",
        label: "Cum",
        date: "18 Tem",
        stops: [
          {
            id: "mus3",
            title: "Ölüdeniz & Kelebekler Vadisi",
            description: "Lagün manzarası ve yamaç paraşütü",
            arrival: "09:00",
            duration: "4s",
          },
        ],
      },
      {
        id: "mud3",
        label: "Cmt",
        date: "19 Tem",
        stops: [
          {
            id: "mus4",
            title: "Kabak Koyu",
            description: "Doğal, sakin ve ulaşımı yürüyüşle olan koy",
            arrival: "10:00",
            duration: "3s",
            travelTime: "50 dk",
            travelMode: "car",
            distance: "38 km",
          },
          {
            id: "mus5",
            title: "Datça Eski Datça",
            description: "Taş sokaklar, badem ağaçları ve gün batımı",
            arrival: "17:00",
            duration: "2s",
            travelTime: "1s 20dk",
            travelMode: "car",
            distance: "72 km",
          },
        ],
      },
    ],
  },
  {
    id: "route-corum",
    city: "Çorum",
    cityId: "corum",
    theme: "Tarih",
    title: "Hitit Uygarlığının İzinde",
    rating: 4.4,
    reviewCount: 158,
    durationDays: 2,
    budget: "Ekonomik",
    image: require("../assets/images/çorum.png"),
    highlights: ["Hattuşa", "Alacahöyük", "Boğazkale"],
    description:
      "Dünya mirası Hitit başkenti ve binlerce yıllık antik kalıntılar arasında bir yolculuk.",
    days: [
      {
        id: "cod1",
        label: "Cmt",
        date: "7 Haz",
        stops: [
          {
            id: "cos1",
            title: "Hattuşa Ören Yeri",
            description: "Hitit İmparatorluğu'nun antik başkenti",
            arrival: "10:00",
            duration: "2s 30dk",
          },
          {
            id: "cos2",
            title: "Yazılıkaya Açık Hava Tapınağı",
            description: "Kayalara oyulmuş Hitit tanrı kabartmaları",
            arrival: "13:30",
            duration: "1s",
            travelTime: "12 dk",
            travelMode: "car",
            distance: "3 km",
          },
        ],
      },
      {
        id: "cod2",
        label: "Paz",
        date: "8 Haz",
        stops: [
          {
            id: "cos3",
            title: "Alacahöyük Ören Yeri",
            description: "Sfenksli Kapı ve kral mezarları",
            arrival: "10:00",
            duration: "1s 30dk",
          },
          {
            id: "cos4",
            title: "Çorum Müzesi",
            description: "Hitit tabletleri ve arkeolojik eserler",
            arrival: "14:00",
            duration: "1s",
            travelTime: "45 dk",
            travelMode: "car",
            distance: "42 km",
          },
        ],
      },
    ],
  },
  {
    id: "route-samsun",
    city: "Samsun",
    cityId: "samsun",
    theme: "Tarih",
    title: "Milli Mücadelenin Başladığı Şehir",
    rating: 4.5,
    reviewCount: 302,
    durationDays: 2,
    budget: "Ekonomik",
    image: require("../assets/images/samsun.png"),
    highlights: ["Bandırma Vapuru", "Amisos Tepesi", "Ilgaz"],
    description:
      "Karadeniz kıyısında tarih, yeşil tepeler ve sahil şeridi keyfi.",
    days: [
      {
        id: "sad1",
        label: "Cmt",
        date: "18 May",
        stops: [
          {
            id: "sas1",
            title: "Bandırma Vapuru Müzesi",
            description: "Atatürk'ün Samsun'a çıktığı geminin replikası",
            arrival: "10:00",
            duration: "1s",
          },
          {
            id: "sas2",
            title: "Amisos Tepesi",
            description: "Şehre ve Karadeniz'e tepeden bakış",
            arrival: "12:00",
            duration: "1s 30dk",
            travelTime: "15 dk",
            travelMode: "car",
            distance: "6 km",
          },
        ],
      },
      {
        id: "sad2",
        label: "Paz",
        date: "19 May",
        stops: [
          {
            id: "sas3",
            title: "Sahil Yürüyüş Yolu",
            description: "Denize paralel uzun kıyı yürüyüşü",
            arrival: "09:30",
            duration: "2s",
          },
          {
            id: "sas4",
            title: "Amazon Köyü",
            description: "Ormanlık alanda macera parkuru",
            arrival: "13:00",
            duration: "2s 30dk",
            travelTime: "30 dk",
            travelMode: "car",
            distance: "20 km",
          },
        ],
      },
    ],
  },
  {
    id: "route-diyarbakir",
    city: "Diyarbakır",
    cityId: "diyarbakir",
    theme: "Tarih",
    title: "Surlar Şehri",
    rating: 4.6,
    reviewCount: 341,
    durationDays: 2,
    budget: "Ekonomik",
    image: require("../assets/images/diyarbakır.png"),
    highlights: ["Diyarbakır Surları", "Hevsel Bahçeleri", "On Gözlü Köprü"],
    description:
      "Dünyanın en uzun ikinci suru, Dicle kıyısındaki bahçeler ve tarihi çarşılar.",
    days: [
      {
        id: "did1",
        label: "Cmt",
        date: "26 Nis",
        stops: [
          {
            id: "dis1",
            title: "Diyarbakır Surları",
            description: "Bazalt taşından örülü UNESCO Dünya Mirası",
            arrival: "09:30",
            duration: "2s",
          },
          {
            id: "dis2",
            title: "Ulu Cami",
            description: "Anadolu'nun en eski camilerinden",
            arrival: "12:00",
            duration: "1s",
            travelTime: "8 dk",
            travelMode: "walk",
            distance: "0,6 km",
          },
        ],
      },
      {
        id: "did2",
        label: "Paz",
        date: "27 Nis",
        stops: [
          {
            id: "dis3",
            title: "Hevsel Bahçeleri",
            description: "Dicle kıyısında UNESCO korumasında tarım alanı",
            arrival: "10:00",
            duration: "1s 30dk",
          },
          {
            id: "dis4",
            title: "On Gözlü Köprü",
            description: "Dicle Nehri üzerinde 900 yıllık taş köprü",
            arrival: "12:30",
            duration: "1s",
            travelTime: "15 dk",
            travelMode: "car",
            distance: "4 km",
          },
        ],
      },
    ],
  },
  {
    id: "route-trabzon",
    city: "Trabzon",
    cityId: "trabzon",
    theme: "Doğa",
    title: "Sisli Zirvelerden Manastıra",
    rating: 4.8,
    reviewCount: 812,
    durationDays: 3,
    budget: "Konfor",
    image: require("../assets/images/trabzon.png"),
    highlights: ["Sümela Manastırı", "Uzungöl", "Boztepe"],
    description:
      "Uçurumdaki manastır, sisli göl ve şehre hakim tepeden Karadeniz manzarası.",
    days: [
      {
        id: "trd1",
        label: "Cum",
        date: "23 Ağu",
        stops: [
          {
            id: "trs1",
            title: "Sümela Manastırı",
            description: "Kayalık uçuruma inşa edilmiş Bizans manastırı",
            arrival: "09:00",
            duration: "3s",
          },
          {
            id: "trs2",
            title: "Boztepe",
            description: "Şehir ve deniz manzaralı gün batımı noktası",
            arrival: "18:30",
            duration: "1s",
            travelTime: "40 dk",
            travelMode: "car",
            distance: "30 km",
          },
        ],
      },
      {
        id: "trd2",
        label: "Cmt",
        date: "24 Ağu",
        stops: [
          {
            id: "trs3",
            title: "Uzungöl",
            description: "Ormanlarla çevrili sisli dağ gölü",
            arrival: "09:30",
            duration: "4s",
          },
        ],
      },
      {
        id: "trd3",
        label: "Paz",
        date: "25 Ağu",
        stops: [
          {
            id: "trs4",
            title: "Atatürk Köşkü",
            description: "Ormanlık tepede tarihi köşk ve bahçeler",
            arrival: "10:00",
            duration: "1s 30dk",
          },
          {
            id: "trs5",
            title: "Ayasofya Müzesi (Trabzon)",
            description: "Bizans döneminden kalma freskli kilise-cami",
            arrival: "13:00",
            duration: "1s",
            travelTime: "20 dk",
            travelMode: "car",
            distance: "9 km",
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