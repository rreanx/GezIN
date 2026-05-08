import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const ACTIVE_COLOR = "#F7941D";
const INACTIVE_COLOR = "#9CA3AF";
const BAR_BG = "#121417";

type TabDef = {
  name: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
};

const TABS: TabDef[] = [
  { name: "index", label: "Ana Sayfa", icon: "home" },
  { name: "discover", label: "Keşfet", icon: "compass" },
  { name: "community", label: "Topluluklar", icon: "users" },
  { name: "saved", label: "Kaydedilenler", icon: "bookmark" },
  { name: "profile", label: "Profil", icon: "user" },
];

function FloatingTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();
  const bottomInset =
    Platform.OS === "ios" ? Math.max(insets.bottom, 10) : 14;

  return (
    <View
      pointerEvents="box-none"
      style={[styles.barWrap, { paddingBottom: bottomInset }]}
    >
      <View style={styles.bar}>
        {state.routes.map((route: any, index: number) => {
          const tab = TABS.find((t) => t.name === route.name);
          if (!tab) return null;
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              if (Platform.OS !== "web") Haptics.selectionAsync();
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              onPress={onPress}
              style={styles.tabItem}
              hitSlop={4}
            >
              {/* Active dot indicator */}
              <View style={styles.dotWrap}>
                {focused && <View style={styles.dot} />}
              </View>

              <Feather
                name={tab.icon}
                size={22}
                color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  const colors = useColors();
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Ana Sayfa" }} />
      <Tabs.Screen name="discover" options={{ title: "Keşfet" }} />
      <Tabs.Screen name="community" options={{ title: "Topluluklar" }} />
      <Tabs.Screen name="saved" options={{ title: "Kaydedilenler" }} />
      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  barWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    paddingHorizontal: 14,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BAR_BG,
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderRadius: 40,
    width: "100%",
    maxWidth: 480,
    shadowColor: "#000000",
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
    gap: 3,
  },
  dotWrap: {
    height: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: ACTIVE_COLOR,
  },
});
