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
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Avatar } from "@/components/Avatar";
import { SAMPLE_TRIPS, type TripNote } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

const TOOLS = [
  { icon: "navigation-2", label: "Uçuşlar" },
  { icon: "home", label: "Otel" },
  { icon: "truck", label: "Araç" },
  { icon: "credit-card", label: "Bilet" },
  { icon: "map", label: "Tren" },
  { icon: "coffee", label: "Yemek" },
] as const;

export default function TripScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = SAMPLE_TRIPS.find((t) => t.id === id) ?? SAMPLE_TRIPS[0];

  const [notes, setNotes] = useState<TripNote[]>(trip!.notes);
  const [places] = useState(trip!.places);
  const [draft, setDraft] = useState("");

  const topPad =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top;
  const me = trip!.members[0]!;

  const toggleNote = (noteId: string) => {
    if (Platform.OS !== "web") Haptics.selectionAsync();
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, done: !n.done } : n)),
    );
  };

  const addNote = () => {
    const text = draft.trim();
    if (!text) return;
    if (Platform.OS !== "web")
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setNotes((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
        text,
        authorId: me.id,
        done: false,
      },
    ]);
    setDraft("");
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover */}
        <View style={styles.cover}>
          <Image
            source={trip!.cover}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
          />
          <LinearGradient
            colors={["rgba(15,27,61,0.55)", "rgba(15,27,61,0.95)"]}
            locations={[0, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={[styles.coverTop, { paddingTop: topPad + 8 }]}>
            <Pressable
              onPress={() => router.back()}
              style={styles.coverBtn}
              hitSlop={6}
            >
              <Feather name="arrow-left" size={20} color="#FFFFFF" />
            </Pressable>
            <Pressable style={styles.coverBtn} hitSlop={6}>
              <Feather name="more-horizontal" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
          <View style={styles.coverBottom}>
            <Text style={[styles.coverDates, { fontFamily: "Inter_500Medium" }]}>
              {trip!.startDate} — {trip!.endDate}
            </Text>
            <Text style={[styles.coverTitle, { fontFamily: "Inter_700Bold" }]}>
              {trip!.title}
            </Text>
            <View style={styles.memberStack}>
              {trip!.members.slice(0, 4).map((m, i) => (
                <View
                  key={m.id}
                  style={{
                    marginLeft: i === 0 ? 0 : -10,
                    zIndex: trip!.members.length - i,
                  }}
                >
                  <Avatar
                    initials={m.initials}
                    color={m.color}
                    size={32}
                    bordered
                    borderColor="#121417"
                  />
                </View>
              ))}
              <Text
                style={[styles.memberCount, { fontFamily: "Inter_500Medium" }]}
              >
                {trip!.members.length} kişi
              </Text>
            </View>
          </View>
        </View>

        {/* Tools */}
        <View style={styles.toolsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.toolsRow}
          >
            {TOOLS.map((t) => (
              <Pressable
                key={t.label}
                style={({ pressed }) => [
                  styles.tool,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderRadius: colors.radius,
                  },
                  pressed && { transform: [{ scale: 0.96 }] },
                ]}
              >
                <View
                  style={[
                    styles.toolIcon,
                    { backgroundColor: colors.accent },
                  ]}
                >
                  <Feather
                    name={t.icon as any}
                    size={18}
                    color={colors.primary}
                  />
                </View>
                <Text
                  style={[
                    styles.toolLabel,
                    {
                      color: colors.foreground,
                      fontFamily: "Inter_500Medium",
                    },
                  ]}
                >
                  {t.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Itinerary preview */}
        <Pressable
          onPress={() => router.push(`/route/${trip!.routeId}`)}
          style={({ pressed }) => [
            styles.linkCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: colors.radius + 2,
            },
            pressed && { transform: [{ scale: 0.99 }] },
          ]}
        >
          <View
            style={[styles.linkIcon, { backgroundColor: colors.primary }]}
          >
            <Feather name="map" size={18} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.linkTitle,
                {
                  color: colors.foreground,
                  fontFamily: "Inter_700Bold",
                },
              ]}
            >
              Rotayı Görüntüle
            </Text>
            <Text
              style={[
                styles.linkDesc,
                {
                  color: colors.mutedForeground,
                  fontFamily: "Inter_400Regular",
                },
              ]}
            >
              Günlük zaman çizelgesi ve duraklar
            </Text>
          </View>
          <Feather
            name="chevron-right"
            size={20}
            color={colors.mutedForeground}
          />
        </Pressable>

        {/* Notes */}
        <View style={styles.sectionRow}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.foreground, fontFamily: "Inter_700Bold" },
            ]}
          >
            Notlar
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
            {notes.filter((n) => n.done).length}/{notes.length}
          </Text>
        </View>

        <View style={styles.notesContainer}>
          {notes.map((n) => {
            const author = trip!.members.find((m) => m.id === n.authorId);
            return (
              <Pressable
                key={n.id}
                onPress={() => toggleNote(n.id)}
                style={({ pressed }) => [
                  styles.noteRow,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderRadius: colors.radius,
                  },
                  pressed && { transform: [{ scale: 0.99 }] },
                ]}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: n.done ? colors.primary : colors.border,
                      backgroundColor: n.done
                        ? colors.primary
                        : "transparent",
                    },
                  ]}
                >
                  {n.done && (
                    <Feather name="check" size={13} color="#FFFFFF" />
                  )}
                </View>
                <Text
                  style={[
                    styles.noteText,
                    {
                      color: colors.foreground,
                      fontFamily: "Inter_500Medium",
                      textDecorationLine: n.done ? "line-through" : "none",
                      opacity: n.done ? 0.55 : 1,
                    },
                  ]}
                >
                  {n.text}
                </Text>
                {author && (
                  <Avatar
                    initials={author.initials}
                    color={author.color}
                    size={26}
                  />
                )}
              </Pressable>
            );
          })}

          <View
            style={[
              styles.noteInputRow,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: colors.radius,
              },
            ]}
          >
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Yeni not ekle…"
              placeholderTextColor={colors.mutedForeground}
              onSubmitEditing={addNote}
              returnKeyType="done"
              style={[
                styles.noteInput,
                {
                  color: colors.foreground,
                  fontFamily: "Inter_500Medium",
                },
              ]}
            />
            <Pressable
              onPress={addNote}
              style={[styles.noteAdd, { backgroundColor: colors.primary }]}
              disabled={draft.trim() === ""}
            >
              <Feather name="plus" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        {/* Places */}
        <View style={styles.sectionRow}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.foreground, fontFamily: "Inter_700Bold" },
            ]}
          >
            Gezilecek Yerler
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
            {places.length} mekan
          </Text>
        </View>

        <View style={styles.placesContainer}>
          {places.map((p) => {
            const author = trip!.members.find((m) => m.id === p.addedById);
            return (
              <View
                key={p.id}
                style={[
                  styles.placeRow,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderRadius: colors.radius,
                  },
                ]}
              >
                <View
                  style={[
                    styles.placePin,
                    { backgroundColor: colors.accent },
                  ]}
                >
                  <Feather
                    name="map-pin"
                    size={16}
                    color={colors.primary}
                  />
                </View>
                <Text
                  style={[
                    styles.placeName,
                    {
                      color: colors.foreground,
                      fontFamily: "Inter_600SemiBold",
                    },
                  ]}
                >
                  {p.name}
                </Text>
                {author && (
                  <View style={styles.placeAuthor}>
                    <Text
                      style={[
                        styles.placeAuthorLabel,
                        {
                          color: colors.mutedForeground,
                          fontFamily: "Inter_500Medium",
                        },
                      ]}
                    >
                      ekledi
                    </Text>
                    <Avatar
                      initials={author.initials}
                      color={author.color}
                      size={24}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* FAB */}
      <Pressable
        style={[
          styles.fab,
          {
            backgroundColor: colors.primary,
            bottom: Platform.OS === "ios" ? insets.bottom + 22 : 26,
          },
        ]}
        onPress={() => {
          if (Platform.OS !== "web")
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
      >
        <Feather name="plus" size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  cover: { width: "100%", height: 320, backgroundColor: "#121417" },
  coverTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  coverBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(15,27,61,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  coverBottom: {
    position: "absolute",
    left: 22,
    right: 22,
    bottom: 22,
  },
  coverDates: {
    color: "#FFD7C2",
    fontSize: 12.5,
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  coverTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    letterSpacing: -0.5,
    lineHeight: 30,
    marginBottom: 16,
  },
  memberStack: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberCount: {
    color: "#FFFFFF",
    marginLeft: 12,
    fontSize: 12.5,
  },
  toolsContainer: { marginTop: 22, marginBottom: 24 },
  toolsRow: { paddingHorizontal: 22, gap: 10 },
  tool: {
    width: 76,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    gap: 8,
  },
  toolIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  toolLabel: { fontSize: 11 },
  linkCard: {
    marginHorizontal: 22,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
  },
  linkIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  linkTitle: { fontSize: 15, letterSpacing: -0.2 },
  linkDesc: { fontSize: 12.5, marginTop: 2 },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    marginTop: 30,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 18.5, letterSpacing: -0.3 },
  sectionMeta: { fontSize: 12.5 },
  notesContainer: { paddingHorizontal: 22, gap: 8 },
  noteRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
    borderWidth: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.8,
    alignItems: "center",
    justifyContent: "center",
  },
  noteText: { flex: 1, fontSize: 14 },
  noteInputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    paddingLeft: 14,
    borderWidth: 1,
    marginTop: 4,
  },
  noteInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
  },
  noteAdd: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  placesContainer: { paddingHorizontal: 22, gap: 8 },
  placeRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
    borderWidth: 1,
  },
  placePin: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  placeName: { flex: 1, fontSize: 14.5 },
  placeAuthor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  placeAuthorLabel: { fontSize: 11 },
  fab: {
    position: "absolute",
    right: 24,
    width: 58,
    height: 58,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF6B35",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
});
