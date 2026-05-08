import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RouteCard } from "@/components/RouteCard";
import { ROUTES } from "@/constants/data";
import { useSaved } from "@/contexts/SavedContext";
import { useColors } from "@/hooks/useColors";

export default function SavedScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { saved } = useSaved();

  const savedRoutes = ROUTES.filter((r) => saved.includes(r.id));
  const topPad =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top + 8;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: topPad,
          paddingBottom: 110,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            styles.title,
            { color: colors.foreground, fontFamily: "Inter_700Bold" },
          ]}
        >
          Kaydedilenler
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
          {savedRoutes.length} rota kaydedildi
        </Text>

        {savedRoutes.length === 0 ? (
          <View
            style={[
              styles.empty,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: colors.radius + 4,
              },
            ]}
          >
            <View
              style={[
                styles.emptyIcon,
                { backgroundColor: colors.accent },
              ]}
            >
              <Feather name="bookmark" size={28} color={colors.primary} />
            </View>
            <Text
              style={[
                styles.emptyTitle,
                { color: colors.foreground, fontFamily: "Inter_700Bold" },
              ]}
            >
              Henüz rota kaydetmedin
            </Text>
            <Text
              style={[
                styles.emptyText,
                {
                  color: colors.mutedForeground,
                  fontFamily: "Inter_400Regular",
                },
              ]}
            >
              Beğendiğin rotaları kalp ikonu ile kaydet, sonra burada bul.
            </Text>
            <Pressable
              onPress={() => router.push("/(tabs)/discover")}
              style={[
                styles.emptyBtn,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text
                style={[
                  styles.emptyBtnText,
                  {
                    color: colors.primaryForeground,
                    fontFamily: "Inter_600SemiBold",
                  },
                ]}
              >
                Keşfetmeye başla
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={{ marginTop: 18 }}>
            {savedRoutes.map((r) => (
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
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  title: { fontSize: 30, letterSpacing: -0.8 },
  subtitle: { fontSize: 13.5, marginTop: 4, marginBottom: 8 },
  empty: {
    marginTop: 32,
    padding: 28,
    borderWidth: 1,
    alignItems: "center",
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  emptyTitle: { fontSize: 17, letterSpacing: -0.3, marginBottom: 6 },
  emptyText: {
    fontSize: 13.5,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 22,
  },
  emptyBtn: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 999,
  },
  emptyBtnText: { fontSize: 13.5, letterSpacing: 0.2 },
});
