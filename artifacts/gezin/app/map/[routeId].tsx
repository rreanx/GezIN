import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  Line,
  Path,
  Rect,
  Text as SvgText,
} from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ROUTES } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

const DAY_COLORS = ["#FF6B00", "#4F46E5", "#10B981", "#F59E0B", "#EC4899", "#06B6D4"];

// Pre-defined visually interesting stop positions for up to 10 stops
// These represent rough geographic scatter in a city
const STOP_LAYOUT = [
  { x: 90, y: 90 },
  { x: 210, y: 70 },
  { x: 280, y: 150 },
  { x: 240, y: 240 },
  { x: 150, y: 290 },
  { x: 70, y: 220 },
  { x: 100, y: 150 },
  { x: 190, y: 170 },
  { x: 320, y: 90 },
  { x: 320, y: 280 },
];

// Fake street grid lines for background map texture
const STREET_LINES = [
  // Horizontals
  { x1: 0, y1: 60, x2: 380, y2: 60 },
  { x1: 0, y1: 130, x2: 380, y2: 130 },
  { x1: 0, y1: 190, x2: 380, y2: 190 },
  { x1: 0, y1: 260, x2: 380, y2: 260 },
  { x1: 0, y1: 320, x2: 380, y2: 320 },
  // Verticals
  { x1: 50, y1: 0, x2: 50, y2: 380 },
  { x1: 120, y1: 0, x2: 120, y2: 380 },
  { x1: 190, y1: 0, x2: 190, y2: 380 },
  { x1: 260, y1: 0, x2: 260, y2: 380 },
  { x1: 330, y1: 0, x2: 330, y2: 380 },
  // Diagonals
  { x1: 0, y1: 0, x2: 100, y2: 380 },
  { x1: 180, y1: 0, x2: 380, y2: 250 },
];

function buildSvgPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0]!.x} ${points[0]!.y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]!;
    const curr = points[i]!;
    const cx = (prev.x + curr.x) / 2;
    const cy = (prev.y + curr.y) / 2;
    d += ` Q ${cx} ${prev.y} ${curr.x} ${curr.y}`;
  }
  return d;
}

export default function MapScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { routeId } = useLocalSearchParams<{ routeId: string }>();
  const route = ROUTES.find((r) => r.id === routeId) ?? ROUTES[0]!;
  const [activeDay, setActiveDay] = useState(0);

  const topPad = Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top;

  // Assign global indices to all stops
  type StopInfo = { day: number; dayIdx: number; stop: (typeof route.days)[0]["stops"][0] };
  const allStops: StopInfo[] = [];
  route.days.forEach((d, di) => {
    d.stops.forEach((s, si) => {
      allStops.push({ day: di, dayIdx: si, stop: s });
    });
  });

  // Build paths per day
  const dayPaths = route.days.map((_, di) => {
    const pts = allStops
      .filter((s) => s.day === di)
      .map((s) => STOP_LAYOUT[allStops.findIndex((a) => a === s) % STOP_LAYOUT.length]!);
    return { pts, color: DAY_COLORS[di % DAY_COLORS.length]! };
  });

  const MAP_W = 380;
  const MAP_H = 380;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <Feather name="arrow-left" size={20} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          {route.title}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Map */}
      <View
        style={[
          styles.mapWrap,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: colors.radius + 4,
          },
        ]}
      >
        <Svg width={MAP_W} height={MAP_H} viewBox={`0 0 ${MAP_W} ${MAP_H}`}>
          <Defs />
          {/* Background */}
          <Rect x={0} y={0} width={MAP_W} height={MAP_H} fill={colors.background} />

          {/* Street grid */}
          {STREET_LINES.map((l, i) => (
            <Line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke={colors.border}
              strokeWidth={1.5}
              opacity={0.55}
            />
          ))}

          {/* Route paths (inactive days faded) */}
          {dayPaths.map((dp, di) => (
            <Path
              key={di}
              d={buildSvgPath(dp.pts)}
              stroke={dp.color}
              strokeWidth={activeDay === di ? 4 : 2.5}
              strokeDasharray={activeDay === di ? undefined : "8 5"}
              fill="none"
              opacity={activeDay === di ? 1 : 0.35}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Stop circles */}
          {allStops.map((s, i) => {
            const pos = STOP_LAYOUT[i % STOP_LAYOUT.length]!;
            const dayColor = DAY_COLORS[s.day % DAY_COLORS.length]!;
            const isActive = s.day === activeDay;
            return (
              <React.Fragment key={s.stop.id}>
                <Circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 16 : 13}
                  fill={dayColor}
                  opacity={isActive ? 1 : 0.4}
                />
                <Circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 16 : 13}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  opacity={isActive ? 1 : 0.4}
                />
                <SvgText
                  x={pos.x}
                  y={pos.y + 5}
                  fill="#FFFFFF"
                  fontSize={isActive ? 12 : 10}
                  fontWeight="bold"
                  textAnchor="middle"
                  opacity={isActive ? 1 : 0.4}
                >
                  {i + 1}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>

      {/* Day legend */}
      <View style={styles.legendContainer}>
        <Text style={[styles.legendTitle, { color: colors.mutedForeground, fontFamily: "Inter_600SemiBold" }]}>
          GÜN SEÇ
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dayScroll}
      >
        {route.days.map((d, di) => {
          const active = di === activeDay;
          const color = DAY_COLORS[di % DAY_COLORS.length]!;
          return (
            <Pressable
              key={d.id}
              onPress={() => setActiveDay(di)}
              style={[
                styles.dayCard,
                {
                  backgroundColor: active ? color : colors.card,
                  borderColor: active ? color : colors.border,
                  borderRadius: colors.radius,
                },
              ]}
            >
              <View style={[styles.dayColorStrip, { backgroundColor: color, opacity: active ? 0 : 1 }]} />
              <Text style={[styles.dayCardLabel, { color: active ? "#FFF" : colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
                {d.label}
              </Text>
              <Text style={[styles.dayCardDate, { color: active ? "#FFF" : colors.foreground, fontFamily: "Inter_700Bold" }]}>
                {d.date}
              </Text>
              <Text style={[styles.dayCardStops, { color: active ? "rgba(255,255,255,0.75)" : colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                {d.stops.length} durak
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Active day stop list */}
      <ScrollView
        contentContainerStyle={styles.stopList}
        showsVerticalScrollIndicator={false}
      >
        {route.days[activeDay]?.stops.map((stop, i) => {
          const color = DAY_COLORS[activeDay % DAY_COLORS.length]!;
          const isLast = i === (route.days[activeDay]?.stops.length ?? 0) - 1;
          return (
            <View key={stop.id} style={styles.stopRow}>
              <View style={styles.stopLeft}>
                <View style={[styles.stopNum, { backgroundColor: color }]}>
                  <Text style={[styles.stopNumText, { fontFamily: "Inter_700Bold" }]}>
                    {i + 1}
                  </Text>
                </View>
                {!isLast && <View style={[styles.stopLine, { backgroundColor: colors.border }]} />}
              </View>
              <View style={[styles.stopInfo, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius - 4 }]}>
                <Text style={[styles.stopTime, { color, fontFamily: "Inter_700Bold" }]}>
                  {stop.arrival}
                </Text>
                <Text style={[styles.stopTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
                  {stop.title}
                </Text>
                <Text style={[styles.stopDuration, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                  {stop.duration}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 16, letterSpacing: -0.3, flex: 1, textAlign: "center" },
  mapWrap: {
    marginHorizontal: 16,
    borderWidth: 1,
    overflow: "hidden",
    alignItems: "center",
  },
  legendContainer: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 10,
  },
  legendTitle: { fontSize: 10.5, letterSpacing: 1.2 },
  dayScroll: { paddingHorizontal: 16, gap: 10, paddingBottom: 4 },
  dayCard: {
    width: 90,
    padding: 12,
    borderWidth: 1.5,
    position: "relative",
    overflow: "hidden",
  },
  dayColorStrip: { position: "absolute", left: 0, top: 0, bottom: 0, width: 4 },
  dayCardLabel: { fontSize: 10.5, letterSpacing: 0.3 },
  dayCardDate: { fontSize: 14.5, marginTop: 2 },
  dayCardStops: { fontSize: 11, marginTop: 3 },
  stopList: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 60, gap: 2 },
  stopRow: { flexDirection: "row", alignItems: "stretch", gap: 12 },
  stopLeft: { alignItems: "center", width: 28 },
  stopNum: { width: 28, height: 28, borderRadius: 999, alignItems: "center", justifyContent: "center" },
  stopNumText: { color: "#FFFFFF", fontSize: 12 },
  stopLine: { flex: 1, width: 1.5, marginTop: 4 },
  stopInfo: { flex: 1, padding: 12, borderWidth: 1, marginBottom: 6 },
  stopTime: { fontSize: 12, letterSpacing: 0.2, marginBottom: 2 },
  stopTitle: { fontSize: 14.5, letterSpacing: -0.2 },
  stopDuration: { fontSize: 11.5, marginTop: 2 },
});
