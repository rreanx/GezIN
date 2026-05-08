import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RouteCard } from "@/components/RouteCard";
import { CITIES, ROUTES, TRANSIT_LINE } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

const FACTS = [
  { icon: "thermometer", label: "Hava", value: "21°" },
  { icon: "users", label: "Yoğunluk", value: "Orta" },
  { icon: "navigation", label: "Trafik", value: "Akıcı" },
];

export default function CityScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const city = CITIES.find((c) => c.id === id);
  const cityRoutes = ROUTES.filter((r) => r.cityId === id);
  const topPad =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top;

  if (!city) {
    return (
      <View
        style={[
          styles.notFound,
          { backgroundColor: colors.background, paddingTop: insets.top + 80 },
        ]}
      >
        <Text style={{ color: colors.foreground, fontFamily: "Inter_600SemiBold" }}>
          Şehir bulunamadı
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Image
            source={city.image}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
          />
          <LinearGradient
            colors={["rgba(15,27,61,0.55)", "rgba(15,27,61,0.95)"]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={[styles.heroTop, { paddingTop: topPad + 8 }]}>
            <Pressable
              onPress={() => router.back()}
              style={styles.heroBtn}
              hitSlop={6}
            >
              <Feather name="arrow-left" size={20} color="#FFFFFF" />
            </Pressable>
            <Pressable style={styles.heroBtn} hitSlop={6}>
              <Feather name="share-2" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
          <View style={styles.heroBottom}>
            <Text
              style={[styles.heroRegion, { fontFamily: "Inter_500Medium" }]}
            >
              {city.region}
            </Text>
            <Text
              style={[styles.heroTitle, { fontFamily: "Inter_700Bold" }]}
            >
              {city.name}
            </Text>
            <View style={styles.factsRow}>
              {FACTS.map((f) => (
                <View key={f.label} style={styles.fact}>
                  <Feather
                    name={f.icon as any}
                    size={14}
                    color="#FFD7C2"
                  />
                  <Text
                    style={[styles.factValue, { fontFamily: "Inter_700Bold" }]}
                  >
                    {f.value}
                  </Text>
                  <Text
                    style={[styles.factLabel, { fontFamily: "Inter_500Medium" }]}
                  >
                    {f.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Live transit card */}
        <View
          style={[
            styles.transitCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: colors.radius + 4,
            },
          ]}
        >
          <View style={styles.transitHeader}>
            <View style={styles.transitTag}>
              <View style={styles.live} />
              <Text style={[styles.transitTagText, { fontFamily: "Inter_600SemiBold" }]}>
                CANLI
              </Text>
            </View>
            <Text
              style={[
                styles.transitEta,
                { color: colors.primary, fontFamily: "Inter_700Bold" },
              ]}
            >
              {TRANSIT_LINE.eta}
            </Text>
          </View>
          <Text
            style={[
              styles.transitTitle,
              { color: colors.foreground, fontFamily: "Inter_700Bold" },
            ]}
          >
            {TRANSIT_LINE.name}
          </Text>
          <Text
            style={[
              styles.transitDir,
              {
                color: colors.mutedForeground,
                fontFamily: "Inter_500Medium",
              },
            ]}
          >
            {TRANSIT_LINE.vehicle} • {TRANSIT_LINE.direction}
          </Text>

          <View style={styles.stopsRow}>
            {TRANSIT_LINE.stops.map((s, i) => {
              const isLast = i === TRANSIT_LINE.stops.length - 1;
              const passedColor = s.passed
                ? colors.primary
                : (s as any).current
                  ? colors.primary
                  : colors.border;
              return (
                <View
                  key={s.id}
                  style={[styles.stopCol, { flex: isLast ? 0 : 1 }]}
                >
                  <View style={styles.stopBulletRow}>
                    <View
                      style={[
                        styles.stopBullet,
                        {
                          backgroundColor: (s as any).current
                            ? colors.primary
                            : s.passed
                              ? colors.primary
                              : colors.background,
                          borderColor: passedColor,
                          borderWidth: 2,
                        },
                      ]}
                    >
                      {(s as any).current && (
                        <View style={styles.stopInner} />
                      )}
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.stopLine,
                          {
                            backgroundColor: s.passed
                              ? colors.primary
                              : colors.border,
                          },
                        ]}
                      />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.stopName,
                      {
                        color: (s as any).current
                          ? colors.foreground
                          : colors.mutedForeground,
                        fontFamily: (s as any).current
                          ? "Inter_700Bold"
                          : "Inter_500Medium",
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {s.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Routes */}
        <Text
          style={[
            styles.routesLabel,
            {
              color: colors.mutedForeground,
              fontFamily: "Inter_600SemiBold",
            },
          ]}
        >
          {city.name.toUpperCase()} ROTALARI
        </Text>
        <View style={{ paddingHorizontal: 22 }}>
          {cityRoutes.length === 0 ? (
            <Text
              style={[
                styles.empty,
                {
                  color: colors.mutedForeground,
                  fontFamily: "Inter_400Regular",
                },
              ]}
            >
              Bu şehir için henüz rota eklenmedi.
            </Text>
          ) : (
            cityRoutes.map((r) => (
              <RouteCard
                key={r.id}
                id={r.id}
                city={r.city}
                theme={r.theme}
                title={r.title}
                rating={r.rating}
                image={r.image}
                durationDays={r.durationDays}
                variant="compact"
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Sticky Plan CTA */}
      <View
        style={[
          styles.planBar,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            paddingBottom: Platform.OS === "ios" ? insets.bottom + 10 : 16,
          },
        ]}
      >
        <Pressable
          style={[styles.planBtn, { backgroundColor: colors.primary }]}
          onPress={() => router.push(`/plan/${city.id}`)}
        >
          <Feather name="map" size={18} color="#FFFFFF" />
          <Text style={[styles.planBtnText, { fontFamily: "Inter_700Bold" }]}>
            {city.name} Rotası Planla
          </Text>
          <Feather name="arrow-right" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  notFound: { flex: 1, alignItems: "center" },
  hero: { width: "100%", height: 280, backgroundColor: "#121417" },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  heroBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(15,27,61,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroBottom: {
    position: "absolute",
    left: 22,
    right: 22,
    bottom: 22,
  },
  heroRegion: {
    color: "#FFD7C2",
    fontSize: 12.5,
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    letterSpacing: -0.8,
    marginBottom: 18,
  },
  factsRow: {
    flexDirection: "row",
    gap: 18,
  },
  fact: { flexDirection: "row", alignItems: "center", gap: 6 },
  factValue: { color: "#FFFFFF", fontSize: 14 },
  factLabel: { color: "#FFD7C2", fontSize: 12 },
  transitCard: {
    margin: 22,
    padding: 18,
    borderWidth: 1,
  },
  transitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  transitTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  live: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#EF4444",
  },
  transitTagText: {
    fontSize: 10.5,
    color: "#EF4444",
    letterSpacing: 1.2,
  },
  transitEta: { fontSize: 16, letterSpacing: -0.2 },
  transitTitle: { fontSize: 17, letterSpacing: -0.3, marginBottom: 3 },
  transitDir: { fontSize: 12.5, marginBottom: 18 },
  stopsRow: { flexDirection: "row", alignItems: "flex-start" },
  stopCol: { alignItems: "flex-start" },
  stopBulletRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
  stopBullet: {
    width: 14,
    height: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  stopInner: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
  },
  stopLine: { flex: 1, height: 2.5 },
  stopName: { fontSize: 11, maxWidth: 65 },
  routesLabel: {
    fontSize: 11,
    letterSpacing: 1.2,
    paddingHorizontal: 22,
    marginTop: 6,
    marginBottom: 12,
  },
  empty: {
    fontSize: 13,
    paddingVertical: 24,
    textAlign: "center",
  },
  planBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 14,
    borderTopWidth: 1,
  },
  planBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 999,
  },
  planBtnText: { color: "#FFFFFF", fontSize: 15.5 },
});
