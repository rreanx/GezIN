import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ROUTES, type Stop } from "@/constants/data";
import { useSaved } from "@/contexts/SavedContext";
import { useColors } from "@/hooks/useColors";

const HEADER_HEIGHT = 300;
const DAY_COLORS = ["#FF6B00", "#4F46E5", "#10B981", "#F59E0B", "#EC4899", "#06B6D4"];

type Transit = {
  type: "tramvay" | "metro" | "otobüs" | "vapur";
  line: string;
  direction: string;
  minutes: number;
};

// Example transit data keyed by stop index (modulo)
const TRANSIT_BY_STOP: Record<number, Transit[]> = {
  0: [{ type: "tramvay", line: "T1", direction: "Bağcılar", minutes: 12 }],
  1: [{ type: "metro", line: "M2", direction: "Hacıosman", minutes: 8 }],
  2: [{ type: "otobüs", line: "28T", direction: "Bakırköy", minutes: 6 }],
  3: [
    { type: "tramvay", line: "T1", direction: "Kabataş", minutes: 15 },
    { type: "vapur", line: "İDO", direction: "Kadıköy", minutes: 22 },
  ],
  4: [{ type: "metro", line: "M4", direction: "Sabiha Gökçen", minutes: 18 }],
  5: [{ type: "otobüs", line: "15F", direction: "Üsküdar", minutes: 9 }],
};

const TRANSIT_COLORS: Record<string, string> = {
  tramvay: "#E11D48",
  metro: "#7C3AED",
  otobüs: "#0369A1",
  vapur: "#0891B2",
};

const TRANSIT_ICONS: Record<string, string> = {
  tramvay: "navigation-2",
  metro: "zap",
  otobüs: "navigation",
  vapur: "anchor",
};

export default function RouteDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const route = ROUTES.find((r) => r.id === id);
  const [activeDay, setActiveDay] = useState(0);
  const { isSaved, toggleSave } = useSaved();

  if (!route) {
    return (
      <View
        style={[styles.notFound, { backgroundColor: colors.background, paddingTop: insets.top + 80 }]}
      >
        <Text style={{ color: colors.foreground, fontFamily: "Inter_600SemiBold" }}>
          Rota bulunamadı
        </Text>
      </View>
    );
  }

  const day = route.days[activeDay];
  const dayColor = DAY_COLORS[activeDay % DAY_COLORS.length]!;
  const saved = isSaved(route.id);
  const topPad = Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 180 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={[styles.hero, { height: HEADER_HEIGHT }]}>
          <Image
            source={route.image}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
          />
          <LinearGradient
            colors={["rgba(18,20,23,0.7)", "rgba(18,20,23,0)", "rgba(18,20,23,0.9)"]}
            locations={[0, 0.35, 1]}
            style={StyleSheet.absoluteFillObject}
          />

          <View style={[styles.heroTop, { paddingTop: topPad + 8 }]}>
            <Pressable onPress={() => router.back()} style={styles.heroBtn} hitSlop={6}>
              <Feather name="arrow-left" size={20} color="#FFFFFF" />
            </Pressable>
            <View style={styles.heroTopRight}>
              <Pressable
                style={styles.heroBtn}
                hitSlop={6}
                onPress={() => router.push(`/map/${route.id}`)}
              >
                <Feather name="map" size={19} color="#FFFFFF" />
              </Pressable>
              <Pressable
                style={styles.heroBtn}
                hitSlop={6}
                onPress={() => {
                  if (Platform.OS !== "web")
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  toggleSave(route.id);
                }}
              >
                <Feather
                  name="heart"
                  size={20}
                  color={saved ? "#FF6B00" : "#FFFFFF"}
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.heroBottom}>
            <View style={styles.heroBadge}>
              <Text style={[styles.heroBadgeText, { fontFamily: "Inter_600SemiBold" }]}>
                {route.theme}
              </Text>
            </View>
            <Text style={[styles.heroTitle, { fontFamily: "Inter_700Bold" }]}>
              {route.title}
            </Text>
            <View style={styles.heroMeta}>
              <Feather name="map-pin" size={13} color="#FFD7C2" />
              <Text style={[styles.heroMetaText, { fontFamily: "Inter_500Medium" }]}>
                {route.city}
              </Text>
              <Text style={styles.heroDot}>•</Text>
              <Feather name="star" size={13} color="#FFB547" />
              <Text style={[styles.heroMetaText, { fontFamily: "Inter_500Medium" }]}>
                {route.rating} ({route.reviewCount})
              </Text>
              <Text style={styles.heroDot}>•</Text>
              <Feather name="clock" size={13} color="#FFD7C2" />
              <Text style={[styles.heroMetaText, { fontFamily: "Inter_500Medium" }]}>
                {route.durationDays} gün
              </Text>
            </View>
          </View>
        </View>

        {/* Description & quick actions */}
        <View style={styles.body}>
          <Text
            style={[styles.description, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}
          >
            {route.description}
          </Text>

          <View style={styles.quickActions}>
            {[
              { icon: "navigation", label: "Yol Tarifi" },
              { icon: "calendar", label: "Plana Ekle" },
              { icon: "share-2", label: "Paylaş" },
              { icon: "users", label: "Davet Et" },
            ].map((a) => (
              <Pressable
                key={a.label}
                style={({ pressed }) => [
                  styles.quickAction,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderRadius: colors.radius,
                  },
                  pressed && { transform: [{ scale: 0.96 }] },
                ]}
              >
                <Feather name={a.icon as any} size={18} color={dayColor} />
                <Text
                  style={[
                    styles.quickActionLabel,
                    { color: colors.foreground, fontFamily: "Inter_500Medium" },
                  ]}
                >
                  {a.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Timeline label */}
          <Text
            style={[
              styles.sectionLabel,
              { color: colors.mutedForeground, fontFamily: "Inter_600SemiBold" },
            ]}
          >
            ZAMAN ÇİZELGESİ
          </Text>

          {/* Day color indicator */}
          <View style={[styles.dayIndicator, { backgroundColor: dayColor + "22", borderColor: dayColor, borderRadius: 999 }]}>
            <View style={[styles.dayDot, { backgroundColor: dayColor }]} />
            <Text style={[styles.dayIndicatorText, { color: dayColor, fontFamily: "Inter_600SemiBold" }]}>
              {day?.label} · {day?.date}
            </Text>
          </View>

          {/* Timeline */}
          <View style={styles.timeline}>
            {day?.stops.map((stop, idx) => (
              <StopCard
                key={stop.id}
                stop={stop}
                index={idx}
                isLast={idx === day.stops.length - 1}
                dayColor={dayColor}
                transit={TRANSIT_BY_STOP[idx] ?? null}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom: Day selector + CTA */}
      <View
        style={[
          styles.bottomSheet,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            paddingBottom: Platform.OS === "ios" ? insets.bottom + 8 : 14,
          },
        ]}
      >
        {/* Scrollable day tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayTabsRow}
        >
          {route.days.map((d, i) => {
            const active = i === activeDay;
            const dColor = DAY_COLORS[i % DAY_COLORS.length]!;
            return (
              <Pressable
                key={d.id}
                onPress={() => {
                  if (Platform.OS !== "web") Haptics.selectionAsync();
                  setActiveDay(i);
                }}
                style={[
                  styles.dayTab,
                  {
                    backgroundColor: active ? dColor : colors.card,
                    borderColor: active ? dColor : colors.border,
                    borderRadius: colors.radius - 4,
                  },
                ]}
              >
                <Text style={[styles.dayTabLabel, { color: active ? "#FFF" : colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
                  {d.label}
                </Text>
                <Text style={[styles.dayTabDate, { color: active ? "#FFF" : colors.foreground, fontFamily: "Inter_700Bold" }]}>
                  {d.date}
                </Text>
                <Text style={[styles.dayTabCount, { color: active ? "rgba(255,255,255,0.7)" : colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                  {d.stops.length} durak
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Price + CTA */}
        <View style={styles.ctaRow}>
          <View>
            <Text style={[styles.priceLabel, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
              {route.budget} bütçe
            </Text>
            <Text style={[styles.priceValue, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              {route.durationDays * 750}₺
              <Text style={[styles.priceUnit, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                {" "}/ kişi
              </Text>
            </Text>
          </View>
          <Pressable
            style={[styles.cta, { backgroundColor: dayColor }]}
            onPress={() => {
              if (Platform.OS !== "web")
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              router.push("/trip/trip-istanbul");
            }}
          >
            <Text style={[styles.ctaText, { color: "#FFFFFF", fontFamily: "Inter_600SemiBold" }]}>
              Plana Başla
            </Text>
            <Feather name="arrow-right" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function StopCard({
  stop,
  index,
  isLast,
  dayColor,
  transit,
}: {
  stop: Stop;
  index: number;
  isLast: boolean;
  dayColor: string;
  transit: Transit[] | null;
}) {
  const colors = useColors();

  const travelIcon =
    stop.travelMode === "walk"
      ? "user"
      : stop.travelMode === "transit"
        ? "navigation-2"
        : "navigation";

  return (
    <View>
      {stop.travelTime && (
        <View style={stopStyles.travelRow}>
          <View style={[stopStyles.travelLine, { borderColor: colors.border }]} />
          <View style={[stopStyles.travelChip, { backgroundColor: colors.accent, borderColor: colors.border }]}>
            <Feather name={travelIcon as any} size={11} color={dayColor} />
            <Text style={[stopStyles.travelText, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>
              {stop.travelTime} • {stop.distance}
            </Text>
          </View>
        </View>
      )}

      <View style={stopStyles.row}>
        <View style={stopStyles.left}>
          <View style={[stopStyles.bullet, { backgroundColor: dayColor }]}>
            <Text style={[stopStyles.bulletText, { fontFamily: "Inter_700Bold" }]}>
              {index + 1}
            </Text>
          </View>
          {!isLast && (
            <View style={[stopStyles.line, { backgroundColor: colors.border }]} />
          )}
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={[
              stopStyles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: colors.radius - 4,
              },
            ]}
          >
            <View style={stopStyles.cardTop}>
              <Text style={[stopStyles.time, { color: dayColor, fontFamily: "Inter_700Bold" }]}>
                {stop.arrival}
              </Text>
              <View style={stopStyles.durationChip}>
                <Feather name="clock" size={10} color={colors.mutedForeground} />
                <Text style={[stopStyles.duration, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
                  {stop.duration}
                </Text>
              </View>
            </View>
            <Text style={[stopStyles.title, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              {stop.title}
            </Text>
            <Text style={[stopStyles.desc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              {stop.description}
            </Text>
          </View>

          {/* Transit lines */}
          {transit && transit.length > 0 && (
            <View style={stopStyles.transitList}>
              {transit.map((t, ti) => {
                const tColor = TRANSIT_COLORS[t.type] ?? "#666";
                const tIcon = TRANSIT_ICONS[t.type] ?? "navigation";
                return (
                  <View
                    key={ti}
                    style={[
                      stopStyles.transitChip,
                      { backgroundColor: tColor + "14", borderColor: tColor + "55" },
                    ]}
                  >
                    <View style={[stopStyles.transitLineBadge, { backgroundColor: tColor }]}>
                      <Text style={[stopStyles.transitLineTxt, { fontFamily: "Inter_700Bold" }]}>
                        {t.line}
                      </Text>
                    </View>
                    <Feather name={tIcon as any} size={12} color={tColor} />
                    <Text style={[stopStyles.transitType, { color: tColor, fontFamily: "Inter_600SemiBold" }]}>
                      {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                    </Text>
                    <Text style={[stopStyles.transitDir, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                      {t.direction}
                    </Text>
                    <View style={{ flex: 1 }} />
                    <View style={[stopStyles.transitEta, { backgroundColor: tColor + "22" }]}>
                      <Text style={[stopStyles.transitEtaTxt, { color: tColor, fontFamily: "Inter_600SemiBold" }]}>
                        {t.minutes} dk
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  notFound: { flex: 1, alignItems: "center" },
  hero: { width: "100%", backgroundColor: "#121417" },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  heroTopRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  heroBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(18,20,23,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroBottom: {
    position: "absolute",
    left: 22,
    right: 22,
    bottom: 22,
  },
  heroBadge: {
    backgroundColor: "rgba(255,255,255,0.94)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 10,
  },
  heroBadgeText: { fontSize: 11, color: "#121417", letterSpacing: 0.4 },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    letterSpacing: -0.5,
    lineHeight: 28,
    marginBottom: 10,
  },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flexWrap: "wrap",
  },
  heroMetaText: { color: "#FFFFFF", fontSize: 12.5 },
  heroDot: { color: "#FFD7C2", marginHorizontal: 3, fontSize: 11 },
  body: { padding: 20 },
  description: { fontSize: 14, lineHeight: 21, marginBottom: 20 },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 26,
  },
  quickAction: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderWidth: 1,
    gap: 7,
  },
  quickActionLabel: { fontSize: 10.5, letterSpacing: -0.1 },
  sectionLabel: { fontSize: 10.5, letterSpacing: 1.2, marginBottom: 12 },
  dayIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    marginBottom: 16,
  },
  dayDot: { width: 8, height: 8, borderRadius: 999 },
  dayIndicatorText: { fontSize: 12.5, letterSpacing: 0.2 },
  timeline: {},
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  dayTabsRow: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 10,
  },
  dayTab: {
    minWidth: 76,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1.5,
    alignItems: "center",
  },
  dayTabLabel: { fontSize: 10, letterSpacing: 0.3 },
  dayTabDate: { fontSize: 13.5, marginTop: 1 },
  dayTabCount: { fontSize: 10, marginTop: 2 },
  ctaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  priceLabel: { fontSize: 11, letterSpacing: 0.3 },
  priceValue: { fontSize: 20, marginTop: 1, letterSpacing: -0.4 },
  priceUnit: { fontSize: 12 },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 999,
  },
  ctaText: { fontSize: 14, letterSpacing: -0.1 },
});

const stopStyles = StyleSheet.create({
  travelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 14,
    marginVertical: 3,
  },
  travelLine: {
    width: 2,
    height: 20,
    borderLeftWidth: 1.5,
    borderStyle: "dashed",
  },
  travelChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  travelText: { fontSize: 11.5 },
  row: { flexDirection: "row", alignItems: "stretch" },
  left: { alignItems: "center", marginRight: 12, width: 28 },
  bullet: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  bulletText: { color: "#FFFFFF", fontSize: 12 },
  line: { flex: 1, width: 1.5, marginTop: 4 },
  card: {
    padding: 13,
    borderWidth: 1,
    marginBottom: 6,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  time: { fontSize: 12.5, letterSpacing: 0.2 },
  durationChip: { flexDirection: "row", alignItems: "center", gap: 3 },
  duration: { fontSize: 11 },
  title: { fontSize: 15, letterSpacing: -0.2, marginBottom: 3 },
  desc: { fontSize: 12.5, lineHeight: 17 },
  transitList: { gap: 5, marginBottom: 8 },
  transitChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
  },
  transitLineBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    minWidth: 30,
    alignItems: "center",
  },
  transitLineTxt: { color: "#FFFFFF", fontSize: 10.5 },
  transitType: { fontSize: 12 },
  transitDir: { fontSize: 11, flexShrink: 1 },
  transitEta: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 999 },
  transitEtaTxt: { fontSize: 11 },
});
