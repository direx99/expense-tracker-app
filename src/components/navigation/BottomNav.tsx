import type { NavigationContainerRef } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useRef } from "react";
import type { ComponentProps } from "react";
import { Animated, Easing, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useReducedMotion } from "../../hooks/useReducedMotion";
import { colors } from "../../theme/colors";
import { radius } from "../../theme/tokens";
import type { RootStackParamList } from "../../types/navigation";

type NavItem = { icon: ComponentProps<typeof Feather>["name"]; label: string; route: "Home" | "Statistic" | "Wallet" | "Settings" };
type BottomNavProps = { activeRoute: keyof RootStackParamList; navigation: NavigationContainerRef<RootStackParamList> };

const items: NavItem[] = [
  { icon: "home", label: "Home", route: "Home" },
  { icon: "bar-chart-2", label: "Insights", route: "Statistic" },
  { icon: "credit-card", label: "Wallet", route: "Wallet" },
  { icon: "settings", label: "Settings", route: "Settings" },
];

export default function BottomNav({ activeRoute, navigation }: BottomNavProps) {
  const { bottom } = useSafeAreaInsets();
  return <View accessibilityRole="tablist" style={[styles.shell, { marginBottom: Math.max(bottom, 14) }]}>{items.map((item) => <NavTab active={item.route === activeRoute} item={item} key={item.route} navigation={navigation} />)}</View>;
}

function NavTab({ active, item, navigation }: { active: boolean; item: NavItem; navigation: NavigationContainerRef<RootStackParamList> }) {
  const shouldReduceMotion = useReducedMotion();
  const progress = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    if (shouldReduceMotion) {
      progress.setValue(active ? 1 : 0);
      return;
    }
    Animated.timing(progress, {
      duration: 180,
      easing: Easing.bezier(0.455, 0.03, 0.515, 0.955),
      toValue: active ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [active, progress, shouldReduceMotion]);

  const activePuckStyle = {
    opacity: progress,
    transform: [
      { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [0, -18] }) },
      { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.82, 1] }) },
    ],
  };
  const inactiveIconStyle = { opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0.72, 0] }) };

  return (
    <Pressable accessibilityLabel={item.label} accessibilityRole="tab" accessibilityState={{ selected: active }} onPress={() => navigation.navigate(item.route)} style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
      <Animated.View style={inactiveIconStyle}><Feather color="#D2D2D2" name={item.icon} size={21} strokeWidth={2.2} /></Animated.View>
      <Animated.View accessibilityElementsHidden={!active} pointerEvents="none" style={[styles.activePuck, activePuckStyle]}>
        <Feather color={colors.text} name={item.icon} size={22} strokeWidth={2.8} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shell: { alignItems: "center", alignSelf: "center", backgroundColor: "#080808", borderColor: "#333333", borderRadius: radius.pill, borderWidth: 1, elevation: 14, flexDirection: "row", height: 58, justifyContent: "space-around", maxWidth: 350, paddingHorizontal: 10, shadowColor: "#000", shadowOffset: { height: 8, width: 0 }, shadowOpacity: 0.35, shadowRadius: 16, width: "86%" },
  item: { alignItems: "center", height: 52, justifyContent: "center", minHeight: 44, minWidth: 44, width: 52 },
  activePuck: { alignItems: "center", backgroundColor: colors.accent, borderColor: "#FF9D7F", borderRadius: radius.pill, borderWidth: 4, elevation: 8, height: 56, justifyContent: "center", position: "absolute", shadowColor: "#000", shadowOffset: { height: 5, width: 0 }, shadowOpacity: 0.32, shadowRadius: 8, width: 56 },
  pressed: { opacity: 0.65 },
});
