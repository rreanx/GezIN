import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  initials: string;
  color: string;
  size?: number;
  bordered?: boolean;
  borderColor?: string;
};

export function Avatar({
  initials,
  color,
  size = 36,
  bordered = false,
  borderColor = "#FFFFFF",
}: Props) {
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          borderWidth: bordered ? 2.5 : 0,
          borderColor,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: size * 0.36,
            fontFamily: "Inter_700Bold",
          },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
});
