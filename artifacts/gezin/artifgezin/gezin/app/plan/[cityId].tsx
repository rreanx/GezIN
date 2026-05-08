import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CITIES, ROUTES } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

const ACCENT = "#FF6B00";

const BUDGETS = [
  { value: "Ekonomik", icon: "tag", desc: "Uygun fiyatlı konaklama ve ulaşım" },
  { value: "Normal", icon: "star", desc: "Orta segment, konforlu seyahat" },
  { value: "Lüks", icon: "award", desc: "Premium konaklama ve özel transferler" },
] as const;

type Budget = (typeof BUDGETS)[number]["value"];

const INTERESTS = [
  { value: "Tarih", icon: "archive" as const },
  { value: "Doğa", icon: "wind" as const },
  { value: "Plaj", icon: "umbrella" as const },
  { value: "Gastronomi", icon: "coffee" as const },
  { value: "Sanat", icon: "framer" as const },
  { value: "Gece Hayatı", icon: "moon" as const },
];

const MESSAGES = [
  "Rotanız hazırlanıyor…",
  "En iyi mekanlar seçiliyor…",
  "Zaman çizelgesi oluşturuluyor…",
  "Son rötuşlar yapılıyor…",
];

export default function PlanWizard() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cityId } = useLocalSearchParams<{ cityId: string }>();

  const city = CITIES.find((c) => c.id === cityId);

  const [step, setStep] = useState(0);
  const [days, setDays] = useState<number | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);

  // Loading animation
  const pinY = useRef(new Animated.Value(0)).current;
  const pinScale = useRef(new Animated.Value(1)).current;
  const shadowScale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!loading) return;
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pinY, { toValue: -22, duration: 400, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          Animated.timing(pinScale, { toValue: 1.15, duration: 400, useNativeDriver: true }),
          Animated.timing(shadowScale, { toValue: 0.6, duration: 400, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(pinY, { toValue: 0, duration: 350, easing: Easing.in(Easing.quad), useNativeDriver: true }),
          Animated.timing(pinScale, { toValue: 1, duration: 350, useNativeDriver: true }),
          Animated.timing(shadowScale, { toValue: 1, duration: 350, useNativeDriver: true }),
        ]),
        Animated.delay(200),
      ])
    );
    bounce.start();

    const msgInterval = setInterval(() => {
      setMsgIdx((i) => (i + 1) % MESSAGES.length);
    }, 700);

    const matchedRoute = ROUTES.find((r) => r.cityId === cityId) ?? ROUTES[0]!;
    const timer = setTimeout(() => {
      clearInterval(msgInterval);
      bounce.stop();
      router.replace(`/route/${matchedRoute.id}`);
    }, 3000);

    return () => {
      clearInterval(msgInterval);
      clearTimeout(timer);
      bounce.stop();
    };
  }, [loading]);

  const topPad = Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top + 8;
  const canProceed =
    step === 0 ? days !== null : step === 1 ? budget !== null : interests.length > 0;

  const handleNext = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (step < 2) {
      setStep((s) => s + 1);
    } else {
      setLoading(true);
    }
  };

  const toggleInterest = (v: string) => {
    if (Platform.OS !== "web") Haptics.selectionAsync();
    setInterests((prev) =>
      prev.includes(v) ? prev.filter((i) => i !== v) : [...prev, v],
    );
  };

  if (loading) {
    return (
      <Animated.View
        style={[
          styles.loadingRoot,
          { backgroundColor: colors.background, opacity: fadeAnim },
        ]}
      >
        <View style={styles.loadingContent}>
          <View style={styles.pinContainer}>
            <Animated.View style={{ transform: [{ translateY: pinY }, { scale: pinScale }] }}>
              <View style={[styles.pinHead, { backgroundColor: ACCENT }]}>
                <Feather name="map-pin" size={32} color="#FFFFFF" />
              </View>
              <View style={[styles.pinTip, { borderTopColor: ACCENT }]} />
            </Animated.View>
            <Animated.View
              style={[
                styles.pinShadow,
                { transform: [{ scaleX: shadowScale }], backgroundColor: "rgba(255,107,0,0.2)" },
              ]}
            />
          </View>
          <Text
            style={[
              styles.loadingMsg,
              { color: colors.foreground, fontFamily: "Inter_700Bold" },
            ]}
          >
            {MESSAGES[msgIdx]}
          </Text>
          <Text
            style={[
              styles.loadingSubMsg,
              { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
            ]}
          >
            {city?.name ?? cityId} için kişisel rotanız
          </Text>
          <View style={styles.dotsRow}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.loadingDot,
                  { backgroundColor: i === msgIdx % 4 ? ACCENT : colors.border },
                ]}
              />
            ))}
          </View>
        </View>
      </Animated.View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad }]}>
        <Pressable onPress={() => (step === 0 ? router.back() : setStep((s) => s - 1))} hitSlop={8}>
          <Feather name="arrow-left" size={22} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          {city?.name ?? "Rota"} Planı
        </Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Step indicator */}
      <View style={styles.stepRow}>
        {[0, 1, 2].map((s) => (
          <View
            key={s}
            style={[
              styles.stepDot,
              {
                backgroundColor: s <= step ? ACCENT : colors.border,
                width: s === step ? 28 : 10,
              },
            ]}
          />
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        {/* Step 0 — Days */}
        {step === 0 && (
          <>
            <Text style={[styles.stepTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              Kaç gün gidiyorsunuz?
            </Text>
            <Text style={[styles.stepSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Rotanız bu süreye göre özelleştirilecek
            </Text>
            <View style={styles.daysGrid}>
              {[1, 2, 3, 4, 5, 6, 7, 10, 14].map((n) => {
                const active = days === n;
                return (
                  <Pressable
                    key={n}
                    onPress={() => { if (Platform.OS !== "web") Haptics.selectionAsync(); setDays(n); }}
                    style={[
                      styles.dayPill,
                      {
                        backgroundColor: active ? ACCENT : colors.card,
                        borderColor: active ? ACCENT : colors.border,
                        borderRadius: colors.radius,
                      },
                    ]}
                  >
                    <Text style={[styles.dayNum, { color: active ? "#FFF" : colors.foreground, fontFamily: "Inter_700Bold" }]}>
                      {n}
                    </Text>
                    <Text style={[styles.dayLabel, { color: active ? "rgba(255,255,255,0.8)" : colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                      gün
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}

        {/* Step 1 — Budget */}
        {step === 1 && (
          <>
            <Text style={[styles.stepTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              Bütçe tercihini seçin
            </Text>
            <Text style={[styles.stepSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Rotadaki konaklama ve ulaşım seçenekleri buna göre ayarlanacak
            </Text>
            <View style={styles.budgetList}>
              {BUDGETS.map((b) => {
                const active = budget === b.value;
                return (
                  <Pressable
                    key={b.value}
                    onPress={() => { if (Platform.OS !== "web") Haptics.selectionAsync(); setBudget(b.value); }}
                    style={[
                      styles.budgetCard,
                      {
                        backgroundColor: active ? ACCENT : colors.card,
                        borderColor: active ? ACCENT : colors.border,
                        borderRadius: colors.radius,
                      },
                    ]}
                  >
                    <View style={[styles.budgetIcon, { backgroundColor: active ? "rgba(255,255,255,0.2)" : colors.accent }]}>
                      <Feather name={b.icon as any} size={22} color={active ? "#FFFFFF" : ACCENT} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.budgetName, { color: active ? "#FFF" : colors.foreground, fontFamily: "Inter_700Bold" }]}>
                        {b.value}
                      </Text>
                      <Text style={[styles.budgetDesc, { color: active ? "rgba(255,255,255,0.75)" : colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                        {b.desc}
                      </Text>
                    </View>
                    {active && <Feather name="check-circle" size={20} color="#FFFFFF" />}
                  </Pressable>
                );
              })}
            </View>
          </>
        )}

        {/* Step 2 — Interests */}
        {step === 2 && (
          <>
            <Text style={[styles.stepTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              İlgi alanlarınız neler?
            </Text>
            <Text style={[styles.stepSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Birden fazla seçebilirsiniz
            </Text>
            <View style={styles.interestsGrid}>
              {INTERESTS.map((item) => {
                const active = interests.includes(item.value);
                return (
                  <Pressable
                    key={item.value}
                    onPress={() => toggleInterest(item.value)}
                    style={[
                      styles.interestCard,
                      {
                        backgroundColor: active ? ACCENT : colors.card,
                        borderColor: active ? ACCENT : colors.border,
                        borderRadius: colors.radius,
                      },
                    ]}
                  >
                    <Feather name={item.icon} size={26} color={active ? "#FFFFFF" : ACCENT} />
                    <Text style={[styles.interestLabel, { color: active ? "#FFF" : colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
                      {item.value}
                    </Text>
                    {active && (
                      <View style={styles.checkBadge}>
                        <Feather name="check" size={10} color="#FFFFFF" />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>

      {/* CTA */}
      <View style={[styles.footer, { paddingBottom: Platform.OS === "ios" ? insets.bottom + 12 : 20 }]}>
        <Pressable
          onPress={handleNext}
          disabled={!canProceed}
          style={[
            styles.nextBtn,
            { backgroundColor: canProceed ? ACCENT : colors.border },
          ]}
        >
          <Text style={[styles.nextBtnText, { fontFamily: "Inter_700Bold" }]}>
            {step < 2 ? "Devam Et" : "Rota Oluştur"}
          </Text>
          <Feather name={step < 2 ? "arrow-right" : "map"} size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: { fontSize: 17, letterSpacing: -0.3 },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  stepDot: { height: 5, borderRadius: 999 },
  body: { paddingHorizontal: 20, paddingBottom: 40 },
  stepTitle: { fontSize: 24, letterSpacing: -0.5, marginBottom: 8, lineHeight: 30 },
  stepSub: { fontSize: 14, lineHeight: 20, marginBottom: 28 },
  daysGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  dayPill: {
    width: 80,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 1.5,
  },
  dayNum: { fontSize: 22, letterSpacing: -0.5 },
  dayLabel: { fontSize: 11, marginTop: 2 },
  budgetList: { gap: 14 },
  budgetCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    gap: 16,
    borderWidth: 1.5,
  },
  budgetIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  budgetName: { fontSize: 16, letterSpacing: -0.2 },
  budgetDesc: { fontSize: 12.5, marginTop: 3, lineHeight: 17 },
  interestsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  interestCard: {
    width: "47%",
    paddingVertical: 22,
    alignItems: "center",
    gap: 10,
    borderWidth: 1.5,
    position: "relative",
  },
  interestLabel: { fontSize: 14.5, letterSpacing: -0.2 },
  checkBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 18,
    height: 18,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 999,
  },
  nextBtnText: { color: "#FFFFFF", fontSize: 15.5 },
  // Loading
  loadingRoot: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingContent: { alignItems: "center", gap: 0 },
  pinContainer: { alignItems: "center", marginBottom: 20, height: 90 },
  pinHead: {
    width: 64,
    height: 64,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: ACCENT,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  pinTip: {
    width: 0,
    height: 0,
    alignSelf: "center",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 16,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    marginTop: -2,
  },
  pinShadow: {
    width: 40,
    height: 8,
    borderRadius: 999,
    marginTop: 4,
  },
  loadingMsg: { fontSize: 18, letterSpacing: -0.3, textAlign: "center" },
  loadingSubMsg: { fontSize: 13, marginTop: 6, textAlign: "center" },
  dotsRow: { flexDirection: "row", gap: 8, marginTop: 24 },
  loadingDot: { width: 8, height: 8, borderRadius: 999 },
});
