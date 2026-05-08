import { Feather } from "@expo/vector-icons";
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

import { Avatar } from "@/components/Avatar";
import { BADGES, USER } from "@/constants/data";
import { useTheme, type ThemeMode } from "@/contexts/ThemeContext";
import { useColors } from "@/hooks/useColors";

const SETTINGS_SECTIONS = [
  {
    label: "Hesabım",
    rows: [
      { icon: "user" as const, label: "Profil bilgileri" },
      { icon: "calendar" as const, label: "Rezervasyonlarım" },
      { icon: "shield" as const, label: "Doğrulama" },
    ],
  },
  {
    label: "Tercihler",
    rows: [
      { icon: "bell" as const, label: "Bildirimler" },
      { icon: "globe" as const, label: "Dil ve bölge" },
    ],
  },
  {
    label: "Destek",
    rows: [
      { icon: "info" as const, label: "Hakkımızda" },
      { icon: "help-circle" as const, label: "Yardım" },
    ],
  },
];

const THEME_OPTIONS: {
  value: ThemeMode;
  label: string;
  icon: keyof typeof Feather.glyphMap;
}[] = [
  { value: "light", label: "Açık", icon: "sun" },
  { value: "dark", label: "Koyu", icon: "moon" },
  { value: "system", label: "Sistem", icon: "smartphone" },
];

const ACCENT = "#FF6B00";

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { mode, setMode, resolved } = useTheme();
  const topPad =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top + 8;

  const earnedCount = BADGES.filter((b) => b.earned).length;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingTop: topPad, paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile card ── */}
        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: ACCENT }]}>
          {/* Top-right edit button */}
          <Pressable style={styles.cardEditBtn} hitSlop={8}>
            <Feather name="edit-2" size={15} color={colors.mutedForeground} />
          </Pressable>

          <View style={styles.cardMain}>
            {/* Avatar with orange ring */}
            <View style={styles.avatarWrap}>
              <View
                style={[styles.avatarRing, { borderColor: ACCENT }]}
              >
                <Avatar
                  initials="İY"
                  color={ACCENT}
                  size={74}
                />
              </View>
              {/* Camera edit button */}
              <Pressable
                style={[styles.cameraBtn, { backgroundColor: ACCENT, borderColor: colors.card }]}
                hitSlop={4}
              >
                <Feather name="camera" size={12} color="#FFFFFF" />
              </Pressable>
            </View>

            {/* User info */}
            <View style={styles.cardInfo}>
              <Text style={[styles.cardName, { fontFamily: "Inter_700Bold", color: colors.foreground }]}>
                {USER.name}
              </Text>
              <Text
                style={[
                  styles.cardHandle,
                  { fontFamily: "Inter_500Medium", color: colors.mutedForeground },
                ]}
              >
                {USER.handle}
              </Text>

              {/* GezIN Kaşifi badge */}
              <View style={[styles.kaşifBadge, { borderColor: ACCENT, backgroundColor: ACCENT + "10" }]}>
                <Feather name="star" size={11} color={ACCENT} />
                <Text
                  style={[
                    styles.kaşifText,
                    { color: ACCENT, fontFamily: "Inter_600SemiBold" },
                  ]}
                >
                  GezIN Kaşifi
                </Text>
              </View>

              {/* Location */}
              <View style={styles.locationRow}>
                <Feather name="map-pin" size={12} color={colors.mutedForeground} />
                <Text
                  style={[
                    styles.locationText,
                    { fontFamily: "Inter_400Regular", color: colors.mutedForeground },
                  ]}
                >
                  {USER.location}
                </Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={[styles.statsRow, { borderTopColor: colors.border }]}>
            <View style={styles.stat}>
              <Text
                style={[styles.statValue, { fontFamily: "Inter_700Bold", color: colors.foreground }]}
              >
                {USER.visitedCities}
              </Text>
              <Text
                style={[styles.statLabel, { fontFamily: "Inter_500Medium", color: colors.mutedForeground }]}
              >
                Şehir
              </Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.stat}>
              <Text
                style={[styles.statValue, { fontFamily: "Inter_700Bold", color: colors.foreground }]}
              >
                {USER.visitedPlaces}
              </Text>
              <Text
                style={[styles.statLabel, { fontFamily: "Inter_500Medium", color: colors.mutedForeground }]}
              >
                Mekan
              </Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.stat}>
              <Text
                style={[styles.statValue, { fontFamily: "Inter_700Bold", color: colors.foreground }]}
              >
                {USER.upcomingTrips}
              </Text>
              <Text
                style={[styles.statLabel, { fontFamily: "Inter_500Medium", color: colors.mutedForeground }]}
              >
                Plan
              </Text>
            </View>
          </View>
        </View>

        {/* ── Badges (minimal pill row) ── */}
        <View style={styles.sectionHeaderRow}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.foreground, fontFamily: "Inter_700Bold" },
            ]}
          >
            Rozetler
          </Text>
          <Text
            style={[
              styles.sectionMeta,
              {
                color: colors.mutedForeground,
                fontFamily: "Inter_500Medium",
              },
            ]}
          >
            {earnedCount}/{BADGES.length}
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.badgePillRow}
        >
          {BADGES.map((b) => (
            <View
              key={b.id}
              style={[
                styles.badgePill,
                {
                  backgroundColor: b.earned ? colors.accent : colors.card,
                  borderColor: b.earned ? ACCENT : colors.border,
                  opacity: b.earned ? 1 : 0.5,
                  borderRadius: 999,
                },
              ]}
            >
              <Feather
                name={b.icon as any}
                size={14}
                color={b.earned ? ACCENT : colors.mutedForeground}
              />
              <Text
                style={[
                  styles.badgePillLabel,
                  {
                    color: b.earned ? ACCENT : colors.mutedForeground,
                    fontFamily: "Inter_600SemiBold",
                  },
                ]}
              >
                {b.name}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* ── Theme picker ── */}
        <View style={styles.sectionHeaderRow}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.foreground, fontFamily: "Inter_700Bold" },
            ]}
          >
            Görünüm
          </Text>
          <Text
            style={[
              styles.sectionMeta,
              {
                color: colors.mutedForeground,
                fontFamily: "Inter_500Medium",
              },
            ]}
          >
            {resolved === "dark" ? "Koyu" : "Açık"} tema
          </Text>
        </View>
        <View style={styles.settingsContainer}>
          <View
            style={[
              styles.themeRow,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: colors.radius,
              },
            ]}
          >
            {THEME_OPTIONS.map((opt) => {
              const active = mode === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  onPress={() => setMode(opt.value)}
                  style={({ pressed }) => [
                    styles.themeOption,
                    {
                      backgroundColor: active ? ACCENT : "transparent",
                      borderRadius: colors.radius - 4,
                    },
                    pressed && !active && { opacity: 0.65 },
                  ]}
                >
                  <Feather
                    name={opt.icon}
                    size={15}
                    color={active ? "#FFFFFF" : colors.foreground}
                  />
                  <Text
                    style={[
                      styles.themeLabel,
                      {
                        color: active ? "#FFFFFF" : colors.foreground,
                        fontFamily: active
                          ? "Inter_700Bold"
                          : "Inter_500Medium",
                      },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* ── Settings sections ── */}
        {SETTINGS_SECTIONS.map((section) => (
          <View key={section.label}>
            <Text
              style={[
                styles.sectionGroupLabel,
                {
                  color: colors.mutedForeground,
                  fontFamily: "Inter_600SemiBold",
                },
              ]}
            >
              {section.label.toUpperCase()}
            </Text>
            <View style={styles.settingsContainer}>
              <View
                style={[
                  styles.settingsCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderRadius: colors.radius,
                  },
                ]}
              >
                {section.rows.map((row, i) => (
                  <Pressable
                    key={row.label}
                    style={({ pressed }) => [
                      styles.settingsRow,
                      i !== section.rows.length - 1 && {
                        borderBottomColor: colors.border,
                        borderBottomWidth: 1,
                      },
                      pressed && { backgroundColor: colors.secondary },
                    ]}
                  >
                    <View
                      style={[
                        styles.settingsIcon,
                        { backgroundColor: colors.accent },
                      ]}
                    >
                      <Feather
                        name={row.icon}
                        size={16}
                        color={ACCENT}
                      />
                    </View>
                    <Text
                      style={[
                        styles.settingsLabel,
                        {
                          color: colors.foreground,
                          fontFamily: "Inter_500Medium",
                        },
                      ]}
                    >
                      {row.label}
                    </Text>
                    <Feather
                      name="chevron-right"
                      size={17}
                      color={colors.mutedForeground}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  /* Profile card */
  profileCard: {
    marginHorizontal: 18,
    marginBottom: 8,
    borderRadius: 24,
    padding: 22,
    position: "relative",
    overflow: "hidden",
    borderWidth: 2.5,
  },
  cardEditBtn: {
    position: "absolute",
    top: 18,
    right: 18,
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardMain: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 22,
  },
  avatarWrap: { position: "relative" },
  avatarRing: {
    width: 86,
    height: 86,
    borderRadius: 999,
    borderWidth: 2.5,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  cardInfo: { flex: 1, gap: 7, paddingTop: 4 },
  cardName: {
    fontSize: 20,
    letterSpacing: -0.4,
  },
  cardHandle: {
    fontSize: 13,
  },
  kaşifBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  kaşifText: { fontSize: 11.5, letterSpacing: 0.2 },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  locationText: {
    fontSize: 12,
  },
  statsRow: {
    flexDirection: "row",
    paddingTop: 18,
    borderTopWidth: 1,
  },
  stat: { flex: 1, alignItems: "center" },
  statDivider: {
    width: 1,
  },
  statValue: {
    fontSize: 20,
    letterSpacing: -0.4,
  },
  statLabel: {
    fontSize: 11,
    marginTop: 3,
    letterSpacing: 0.2,
  },

  /* Section headers */
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, letterSpacing: -0.3 },
  sectionMeta: { fontSize: 12 },

  /* Minimal badge pills */
  badgePillRow: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 4,
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1.5,
  },
  badgePillLabel: { fontSize: 12 },

  /* Theme picker */
  settingsContainer: { paddingHorizontal: 20 },
  themeRow: {
    flexDirection: "row",
    padding: 5,
    borderWidth: 1,
    gap: 5,
  },
  themeOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    gap: 7,
  },
  themeLabel: { fontSize: 12.5, letterSpacing: -0.1 },

  /* Settings sections */
  sectionGroupLabel: {
    fontSize: 10.5,
    letterSpacing: 1,
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 8,
  },
  settingsCard: { borderWidth: 1, overflow: "hidden" },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsLabel: { flex: 1, fontSize: 14.5 },
});
