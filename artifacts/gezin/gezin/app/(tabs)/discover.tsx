import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Pill } from "@/components/Pill";
import { CATEGORIES, CITIES, ROUTES, type Category } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

export default function DiscoverScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("Tümü");

  const cityResults = useMemo(() => {
    return CITIES.filter(
      (c) =>
        query.trim() === "" ||
        c.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        c.region.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [query]);

  const routeResults = useMemo(() => {
    return ROUTES.filter(
      (r) => category === "Tümü" || r.theme === category,
    );
  }, [category]);

  const topPad =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top + 8;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: topPad,
          paddingBottom: 110,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              { color: colors.foreground, fontFamily: "Inter_700Bold" },
            ]}
          >
            Keşfet
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: colors.mutedForeground,
                fontFamily: "Inter_400Regular",
              },
            ]}
          >
            Türkiye'nin dört bir yanında 40+ rota
          </Text>
        </View>

        <View style={styles.searchWrap}>
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: colors.radius,
              },
            ]}
          >
            <Feather name="search" size={18} color={colors.mutedForeground} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Şehir veya bölge ara"
              placeholderTextColor={colors.mutedForeground}
              style={[
                styles.searchInput,
                {
                  color: colors.foreground,
                  fontFamily: "Inter_500Medium",
                },
              ]}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillRow}
        >
          {CATEGORIES.map((c) => (
            <Pill
              key={c}
              label={c}
              active={c === category}
              onPress={() => setCategory(c)}
            />
          ))}
        </ScrollView>

        <View style={styles.cityGrid}>
          {cityResults.map((city) => (
            <Pressable
              key={city.id}
              onPress={() => router.push(`/city/${city.id}`)}
              style={({ pressed }) => [
                styles.cityTile,
                { borderRadius: colors.radius + 2 },
                pressed && { transform: [{ scale: 0.98 }] },
              ]}
            >
              <Image
                source={city.image}
                style={StyleSheet.absoluteFillObject}
                contentFit="cover"
              />
              <LinearGradient
                colors={["rgba(15,27,61,0)", "rgba(15,27,61,0.85)"]}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={styles.cityTileInfo}>
                <Text
                  style={[
                    styles.cityTileName,
                    { fontFamily: "Inter_700Bold" },
                  ]}
                >
                  {city.name}
                </Text>
                <Text
                  style={[
                    styles.cityTileRegion,
                    { fontFamily: "Inter_400Regular" },
                  ]}
                >
                  {city.region}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        <Text
          style={[
            styles.sectionLabel,
            {
              color: colors.mutedForeground,
              fontFamily: "Inter_600SemiBold",
            },
          ]}
        >
          {category === "Tümü" ? "Tüm rotalar" : `${category} rotaları`}
        </Text>

        <View style={styles.list}>
          {routeResults.map((r) => (
            <Pressable
              key={r.id}
              onPress={() => router.push(`/route/${r.id}`)}
              style={({ pressed }) => [
                styles.listRow,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderRadius: colors.radius,
                },
                pressed && { transform: [{ scale: 0.99 }] },
              ]}
            >
              <Image
                source={r.image}
                style={styles.listImage}
                contentFit="cover"
              />
              <View style={styles.listContent}>
                <View style={styles.listTopRow}>
                  <Text
                    style={[
                      styles.listTheme,
                      {
                        color: colors.primary,
                        fontFamily: "Inter_600SemiBold",
                      },
                    ]}
                  >
                    {r.theme.toUpperCase()}
                  </Text>
                  <View style={styles.ratingChip}>
                    <Feather name="star" size={11} color="#FFB547" />
                    <Text
                      style={[
                        styles.ratingTxt,
                        {
                          color: colors.foreground,
                          fontFamily: "Inter_600SemiBold",
                        },
                      ]}
                    >
                      {r.rating.toFixed(1)}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.listTitle,
                    {
                      color: colors.foreground,
                      fontFamily: "Inter_700Bold",
                    },
                  ]}
                  numberOfLines={2}
                >
                  {r.title}
                </Text>
                <View style={styles.listMeta}>
                  <Feather
                    name="map-pin"
                    size={12}
                    color={colors.mutedForeground}
                  />
                  <Text
                    style={[
                      styles.listMetaTxt,
                      {
                        color: colors.mutedForeground,
                        fontFamily: "Inter_500Medium",
                      },
                    ]}
                  >
                    {r.city}
                  </Text>
                  <Text
                    style={[
                      styles.dotSep,
                      { color: colors.mutedForeground },
                    ]}
                  >
                    •
                  </Text>
                  <Feather
                    name="clock"
                    size={12}
                    color={colors.mutedForeground}
                  />
                  <Text
                    style={[
                      styles.listMetaTxt,
                      {
                        color: colors.mutedForeground,
                        fontFamily: "Inter_500Medium",
                      },
                    ]}
                  >
                    {r.durationDays} gün
                  </Text>
                  <Text
                    style={[
                      styles.dotSep,
                      { color: colors.mutedForeground },
                    ]}
                  >
                    •
                  </Text>
                  <Text
                    style={[
                      styles.budgetTag,
                      {
                        color: colors.foreground,
                        backgroundColor: colors.accent,
                        fontFamily: "Inter_600SemiBold",
                      },
                    ]}
                  >
                    {r.budget}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 20, marginBottom: 16 },
  title: { fontSize: 30, letterSpacing: -0.8 },
  subtitle: { fontSize: 13.5, marginTop: 4 },
  searchWrap: { paddingHorizontal: 20, marginBottom: 16 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 12 : 6,
    borderWidth: 1,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14.5,
    paddingVertical: Platform.OS === "ios" ? 4 : 8,
  },
  pillRow: {
    paddingHorizontal: 20,
    paddingBottom: 22,
    paddingRight: 28,
  },
  cityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 28,
  },
  cityTile: {
    width: "48%",
    height: 130,
    overflow: "hidden",
    backgroundColor: "#121417",
  },
  cityTileInfo: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
  },
  cityTileName: {
    color: "#FFFFFF",
    fontSize: 17,
    letterSpacing: -0.3,
  },
  cityTileRegion: {
    color: "#FFD7C2",
    fontSize: 11.5,
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 11.5,
    letterSpacing: 1.2,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 20,
    gap: 12,
  },
  listRow: {
    flexDirection: "row",
    borderWidth: 1,
    overflow: "hidden",
  },
  listImage: {
    width: 100,
    height: 110,
  },
  listContent: {
    flex: 1,
    padding: 14,
    gap: 4,
  },
  listTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listTheme: { fontSize: 10.5, letterSpacing: 1 },
  ratingChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingTxt: { fontSize: 12 },
  listTitle: {
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 19,
    marginTop: 2,
  },
  listMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
    flexWrap: "wrap",
  },
  listMetaTxt: { fontSize: 11.5 },
  dotSep: { marginHorizontal: 2, fontSize: 11 },
  budgetTag: {
    fontSize: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
    overflow: "hidden",
  },
});
