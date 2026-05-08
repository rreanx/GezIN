import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
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
import { SectionHeader } from "@/components/SectionHeader";
import { CITIES } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

const GROUPS = [
  {
    id: "g1",
    name: "İstanbul Gezginleri",
    members: 1240,
    image: require("@/assets/images/istanbul.png"),
    category: "Şehir",
  },
  {
    id: "g2",
    name: "Kapadokya Kaşifleri",
    members: 876,
    image: require("@/assets/images/cappadocia.png"),
    category: "Doğa",
  },
  {
    id: "g3",
    name: "Akdeniz Rotası",
    members: 2103,
    image: require("@/assets/images/antalya.png"),
    category: "Sahil",
  },
  {
    id: "g4",
    name: "Karadeniz Seyahat",
    members: 654,
    image: require("@/assets/images/karadeniz.png"),
    category: "Doğa",
  },
];

const FEED = [
  {
    id: "f1",
    user: { initials: "AK", color: "#4F46E5", name: "Ayşe K." },
    groupName: "İstanbul Gezginleri",
    time: "2 saat önce",
    text: "Balat'ta yeni keşfettiğim sokakları harita ile paylaşıyorum, mutlaka görün!",
    likes: 34,
    comments: 8,
  },
  {
    id: "f2",
    user: { initials: "ME", color: "#0EA5E9", name: "Mert E." },
    groupName: "Kapadokya Kaşifleri",
    time: "5 saat önce",
    text: "Sabah balonlu yolculuğu hayatımın en güzel deneyimiydi. Gökyüzünden Kapadokya inanılmaz!",
    likes: 91,
    comments: 22,
  },
  {
    id: "f3",
    user: { initials: "ZY", color: "#10B981", name: "Zeynep Y." },
    groupName: "Akdeniz Rotası",
    time: "Dün",
    text: "Antalya yat turu için grup arıyoruz. Haziran sonu uygun olan var mı?",
    likes: 17,
    comments: 45,
  },
];

export default function CommunityScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topPad =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top + 8;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingTop: topPad, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.titleRow}>
          <View>
            <Text
              style={[
                styles.title,
                { color: colors.foreground, fontFamily: "Inter_700Bold" },
              ]}
            >
              Topluluklar
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
              Gezginlerle bağlan ve keşfet
            </Text>
          </View>
          <Pressable
            style={[
              styles.createBtn,
              { backgroundColor: colors.primary },
            ]}
          >
            <Feather name="plus" size={14} color="#FFFFFF" />
            <Text
              style={[
                styles.createBtnText,
                { fontFamily: "Inter_600SemiBold" },
              ]}
            >
              Oluştur
            </Text>
          </Pressable>
        </View>

        {/* Groups */}
        <SectionHeader
          title="Gruplar"
          right="Tümü"
          onRight={() => {}}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.groupsRow}
        >
          {GROUPS.map((g) => (
            <Pressable
              key={g.id}
              style={({ pressed }) => [
                styles.groupCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderRadius: colors.radius,
                },
                pressed && { transform: [{ scale: 0.97 }] },
              ]}
            >
              <Image
                source={g.image}
                style={styles.groupImg}
                contentFit="cover"
              />
              <View style={styles.groupBody}>
                <View
                  style={[
                    styles.groupTag,
                    { backgroundColor: colors.accent },
                  ]}
                >
                  <Text
                    style={[
                      styles.groupTagText,
                      {
                        color: colors.primary,
                        fontFamily: "Inter_600SemiBold",
                      },
                    ]}
                  >
                    {g.category}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.groupName,
                    {
                      color: colors.foreground,
                      fontFamily: "Inter_700Bold",
                    },
                  ]}
                  numberOfLines={2}
                >
                  {g.name}
                </Text>
                <View style={styles.groupMeta}>
                  <Feather
                    name="users"
                    size={12}
                    color={colors.mutedForeground}
                  />
                  <Text
                    style={[
                      styles.groupMetaText,
                      {
                        color: colors.mutedForeground,
                        fontFamily: "Inter_500Medium",
                      },
                    ]}
                  >
                    {g.members.toLocaleString("tr")} üye
                  </Text>
                </View>
              </View>
              <Pressable
                style={[
                  styles.joinBtn,
                  {
                    borderColor: colors.primary,
                    borderRadius: 999,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.joinText,
                    {
                      color: colors.primary,
                      fontFamily: "Inter_600SemiBold",
                    },
                  ]}
                >
                  Katıl
                </Text>
              </Pressable>
            </Pressable>
          ))}
        </ScrollView>

        {/* Feed */}
        <SectionHeader title="Akış" right="" onRight={() => {}} />
        <View style={styles.feedContainer}>
          {FEED.map((post) => (
            <View
              key={post.id}
              style={[
                styles.postCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderRadius: colors.radius,
                },
              ]}
            >
              <View style={styles.postHeader}>
                <Avatar
                  initials={post.user.initials}
                  color={post.user.color}
                  size={38}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.postUserName,
                      {
                        color: colors.foreground,
                        fontFamily: "Inter_700Bold",
                      },
                    ]}
                  >
                    {post.user.name}
                  </Text>
                  <Text
                    style={[
                      styles.postMeta,
                      {
                        color: colors.mutedForeground,
                        fontFamily: "Inter_400Regular",
                      },
                    ]}
                  >
                    {post.groupName} • {post.time}
                  </Text>
                </View>
                <Feather
                  name="more-horizontal"
                  size={18}
                  color={colors.mutedForeground}
                />
              </View>
              <Text
                style={[
                  styles.postText,
                  {
                    color: colors.foreground,
                    fontFamily: "Inter_400Regular",
                  },
                ]}
              >
                {post.text}
              </Text>
              <View
                style={[
                  styles.postActions,
                  { borderTopColor: colors.border },
                ]}
              >
                <Pressable style={styles.postAction}>
                  <Feather name="heart" size={16} color={colors.mutedForeground} />
                  <Text
                    style={[
                      styles.postActionText,
                      {
                        color: colors.mutedForeground,
                        fontFamily: "Inter_500Medium",
                      },
                    ]}
                  >
                    {post.likes}
                  </Text>
                </Pressable>
                <Pressable style={styles.postAction}>
                  <Feather name="message-circle" size={16} color={colors.mutedForeground} />
                  <Text
                    style={[
                      styles.postActionText,
                      {
                        color: colors.mutedForeground,
                        fontFamily: "Inter_500Medium",
                      },
                    ]}
                  >
                    {post.comments}
                  </Text>
                </Pressable>
                <Pressable style={styles.postAction}>
                  <Feather name="share-2" size={16} color={colors.mutedForeground} />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    marginBottom: 6,
  },
  title: { fontSize: 26, letterSpacing: -0.6 },
  subtitle: { fontSize: 13, marginTop: 2 },
  createBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  createBtnText: { color: "#FFFFFF", fontSize: 13 },
  groupsRow: {
    paddingHorizontal: 22,
    gap: 12,
    paddingBottom: 4,
  },
  groupCard: {
    width: 160,
    borderWidth: 1,
    overflow: "hidden",
  },
  groupImg: { width: "100%", height: 100 },
  groupBody: { padding: 12, gap: 6 },
  groupTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  groupTagText: { fontSize: 10.5, letterSpacing: 0.2 },
  groupName: { fontSize: 13.5, letterSpacing: -0.2, lineHeight: 18 },
  groupMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  groupMetaText: { fontSize: 11.5 },
  joinBtn: {
    marginHorizontal: 12,
    marginBottom: 12,
    paddingVertical: 8,
    alignItems: "center",
    borderWidth: 1.5,
  },
  joinText: { fontSize: 12.5 },
  feedContainer: { paddingHorizontal: 22, gap: 14 },
  postCard: { padding: 16, borderWidth: 1 },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  postUserName: { fontSize: 14, letterSpacing: -0.2 },
  postMeta: { fontSize: 11.5, marginTop: 2 },
  postText: { fontSize: 13.5, lineHeight: 20 },
  postActions: {
    flexDirection: "row",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 20,
  },
  postAction: { flexDirection: "row", alignItems: "center", gap: 6 },
  postActionText: { fontSize: 12.5 },
});
