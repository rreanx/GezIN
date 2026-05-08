import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

type Props = {
  id: string;
  name: string;
  image: any;
};

export function CityBubble({ id, name, image }: Props) {
  const colors = useColors();
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/city/${id}`)}
      style={styles.container}
    >
      <View
        style={[
          styles.ring,
          {
            borderColor: colors.primary,
            backgroundColor: colors.background,
          },
        ]}
      >
        <Image source={image} style={styles.image} contentFit="cover" />
      </View>
      <Text
        style={[
          styles.name,
          { color: colors.foreground, fontFamily: "Inter_500Medium" },
        ]}
      >
        {name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 76,
    marginRight: 14,
  },
  ring: {
    width: 70,
    height: 70,
    borderRadius: 999,
    borderWidth: 2.5,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
  },
  name: {
    marginTop: 8,
    fontSize: 12.5,
  },
});
