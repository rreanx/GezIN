import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

type Props = {
  size?: number;
};

export function Logo({ size = 22 }: Props) {
  const colors = useColors();
  return (
    <View style={styles.row}>
      <View
        style={[
          styles.pinWrap,
          { backgroundColor: colors.primary, width: size + 6, height: size + 6 },
        ]}
      >
        <Feather name="map-pin" size={size - 6} color="#FFFFFF" />
      </View>
      <Text
        style={[
          styles.wordmark,
          { color: colors.foreground, fontFamily: "Inter_700Bold", fontSize: size },
        ]}
      >
        {"Gez"}
        <Text style={{ color: colors.primary }}>{"IN"}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  wordmark: {
    letterSpacing: -0.5,
  },
});
