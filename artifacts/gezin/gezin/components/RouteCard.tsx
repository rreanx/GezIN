import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";

import { useSaved } from "@/contexts/SavedContext";
import { useColors } from "@/hooks/useColors";

type Props = {
  id: string;
  city: string;
  theme: string;
  title: string;
  rating: number;
  image: ImageSourcePropType;
  durationDays: number;
  variant?: "large" | "compact";
};

export function RouteCard({
  id,
  city,
  theme,
  title,
  rating,
  image,
  durationDays,
  variant = "large",
}: Props) {
  const colors = useColors();
  const router = useRouter();
  const { isSaved, toggleSave } = useSaved();
  const saved = isSaved(id);

  const isCompact = variant === "compact";

  return (
    <Pressable
      onPress={() => router.push(`/route/${id}`)}
      style={({ pressed }) => [
        styles.card,
        isCompact ? styles.cardCompact : styles.cardLarge,
        { borderRadius: colors.radius + 4 },
        pressed && { transform: [{ scale: 0.98 }] },
      ]}
    >
      <Image
        source={image}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <LinearGradient
        colors={["rgba(15,27,61,0)", "rgba(15,27,61,0.85)"]}
        style={styles.gradient}
      />

      <View style={styles.topRow}>
        <View style={styles.themeBadge}>
          <Text style={styles.themeText}>{theme}</Text>
        </View>
        <Pressable
          hitSlop={10}
          onPress={(e) => {
            e.stopPropagation();
            if (Platform.OS !== "web") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            toggleSave(id);
          }}
          style={styles.heartBtn}
        >
          <Feather
            name="heart"
            size={18}
            color={saved ? "#FF6B35" : "#FFFFFF"}
            style={
              saved
                ? {
                    textShadowColor: "rgba(255,107,53,0.6)",
                    textShadowRadius: 6,
                  }
                : undefined
            }
          />
        </Pressable>
      </View>

      <View style={styles.bottomContent}>
        <View style={styles.cityRow}>
          <Feather name="map-pin" size={13} color="#FFD7C2" />
          <Text style={styles.cityText}>{city}</Text>
          <View style={styles.dot} />
          <Text style={styles.cityText}>{durationDays} gün</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.ratingRow}>
          <Feather name="star" size={13} color="#FFB547" />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    backgroundColor: "#121417",
  },
  cardLarge: {
    width: 280,
    height: 360,
    marginRight: 14,
  },
  cardCompact: {
    width: "100%",
    height: 200,
    marginBottom: 14,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "65%",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 14,
  },
  themeBadge: {
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  themeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#121417",
    letterSpacing: 0.3,
  },
  heartBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: "rgba(15,27,61,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContent: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
  },
  cityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  cityText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12.5,
    color: "#FFD7C2",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 999,
    backgroundColor: "#FFD7C2",
    marginHorizontal: 4,
    opacity: 0.7,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 19,
    color: "#FFFFFF",
    lineHeight: 24,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  ratingText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#FFFFFF",
  },
});
