import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
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

import { Avatar } from "@/components/Avatar";
import { CityBubble } from "@/components/CityBubble";
import { Logo } from "@/components/Logo";
import { Pill } from "@/components/Pill";
import { RouteCard } from "@/components/RouteCard";
import { SectionHeader } from "@/components/SectionHeader";
import { CATEGORIES, CITIES, ROUTES, USER, type Category } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [category, setCategory] = useState<Category>("Tümü");
  const [search, setSearch] = useState("");

  const filteredRoutes = useMemo(() => {
    return ROUTES.filter(
      (r) =>
        (category === "Tümü" || r.theme === category) &&
        (search.trim() === "" ||
          r.title.toLowerCase().includes(search.trim().toLowerCase()) ||
          r.city.toLowerCase().includes(search.trim().toLowerCase())),
    );
  }, [category, search]);

  const topPad =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top + 8;
  const bottomPad = Platform.OS === "web" ? 110 : 110;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: topPad,
          paddingBottom: bottomPad,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Logo size={20} />
            <Text
              style={[
                styles.greeting,
                {
                  color: colors.foreground,
                  fontFamily: "Inter_700Bold",
                },
              ]}
            >
              Merhaba, {USER.name.split(" ")[0]}
            </Text>
            <Text
              style={[
                styles.subgreeting,
                {
                  color: colors.mutedForeground,
                  fontFamily: "Inter_400Regular",
                },
              ]}
            >
              Bugün nereyi keşfedelim?
            </Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable
              style={[
                styles.iconBtn,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              hitSlop={6}
              onPress={() => {
                if (Platform.OS !== "web")
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Feather name="bell" size={18} color={colors.foreground} />
              <View
                style={[styles.badge, { backgroundColor: colors.primary }]}
              />
            </Pressable>
            <Pressable
              onPress={() => router.push("/(tabs)/profile")}
              hitSlop={6}
            >
              <Avatar
                initials="DY"
                color={colors.primary}
                size={42}
                bordered
                borderColor={colors.background}
              />
            </Pressable>
          </View>
        </View>

        {/* Search */}
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
              value={search}
              onChangeText={setSearch}
              placeholder="Nereyi gezinmek istersin?"
              placeholderTextColor={colors.mutedForeground}
              style={[
                styles.searchInput,
                {
                  color: colors.foreground,
                  fontFamily: "Inter_500Medium",
                },
              ]}
              returnKeyType="search"
            />
            <Pressable
              style={[
                styles.filterBtn,
                { backgroundColor: colors.primary },
              ]}
              hitSlop={6}
            >
              <Feather name="sliders" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        {/* Categories */}
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

        {/* Featured cities */}
        <SectionHeader title="Önerilen Şehirler" actionLabel="Tümü" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cityRow}
        >
          {CITIES.map((city) => (
            <CityBubble
              key={city.id}
              id={city.id}
              name={city.name}
              image={city.image}
            />
          ))}
        </ScrollView>

        {/* Popular routes */}
        <SectionHeader
          title="Popüler Rotalar"
          actionLabel={`${filteredRoutes.length} sonuç`}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.routeRow}
        >
          {filteredRoutes.map((r) => (
            <RouteCard
              key={r.id}
              id={r.id}
              city={r.city}
              theme={r.theme}
              title={r.title}
              rating={r.rating}
              image={r.image}
              durationDays={r.durationDays}
            />
          ))}
        </ScrollView>

        {/* Trip CTA */}
        <Pressable
          onPress={() => router.push("/trip/trip-istanbul")}
          style={[
            styles.ctaCard,
            {
              backgroundColor: "#121417",
              borderRadius: colors.radius + 4,
            },
          ]}
        >
          <View style={styles.ctaLeft}>
            <View
              style={[styles.ctaIcon, { backgroundColor: colors.primary }]}
            >
              <Feather name="users" size={18} color="#FFFFFF" />
            </View>
            <View>
              <Text
                style={[
                  styles.ctaTitle,
                  { color: "#FFFFFF", fontFamily: "Inter_700Bold" },
                ]}
              >
                Arkadaşlarınla planla
              </Text>
              <Text
                style={[
                  styles.ctaSubtitle,
                  { color: "#9AA5C5", fontFamily: "Inter_400Regular" },
                ]}
              >
                Ortak rota, notlar, oylama
              </Text>
            </View>
          </View>
          <Feather name="arrow-up-right" size={20} color={colors.primary} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 22,
  },
  greeting: {
    fontSize: 24,
    marginTop: 8,
    letterSpacing: -0.5,
  },
  subgreeting: {
    fontSize: 13,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 9,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  searchWrap: {
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14.5,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
  },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  pillRow: {
    paddingHorizontal: 20,
    paddingBottom: 26,
    paddingRight: 28,
  },
  cityRow: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  routeRow: {
    paddingLeft: 20,
    paddingRight: 6,
    paddingBottom: 24,
  },
  ctaCard: {
    marginHorizontal: 20,
    marginTop: 4,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ctaLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  ctaIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaTitle: {
    fontSize: 15.5,
    letterSpacing: -0.2,
  },
  ctaSubtitle: {
    fontSize: 12.5,
    marginTop: 2,
  },
});
