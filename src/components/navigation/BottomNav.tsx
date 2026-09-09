import type { NavigationContainerRef } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import card from "../../../assets/card.png";
import home from "../../../assets/home.png";
import settings from "../../../assets/setting.png";
import statistic from "../../../assets/statistic.png";
import { colors } from "../../theme/colors";
import { radius } from "../../theme/tokens";
import type { RootStackParamList } from "../../types/navigation";

type NavItem = { icon: number; label: string; route: "Home" | "Statistic" | "Wallet" | "Settings" };
type BottomNavProps = { activeRoute: keyof RootStackParamList; navigation: NavigationContainerRef<RootStackParamList> };

const items: NavItem[] = [
  { icon: home, label: "Home", route: "Home" },
  { icon: statistic, label: "Insights", route: "Statistic" },
  { icon: card, label: "Wallet", route: "Wallet" },
  { icon: settings, label: "Settings", route: "Settings" },
];

export default function BottomNav({ activeRoute, navigation }: BottomNavProps) {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.shell, { marginBottom: Math.max(bottom, 14) }]}>
      {items.map((item) => {
        const isActive = item.route === activeRoute;
        return <Pressable accessibilityLabel={item.label} accessibilityRole="tab" accessibilityState={{ selected: isActive }} key={item.route} onPress={() => navigation.navigate(item.route)} style={({ pressed }) => [styles.item, isActive && styles.activeItem, pressed && styles.pressed]}><View style={isActive ? styles.activeIconContainer : styles.iconContainer}><Image source={item.icon} style={[styles.icon, isActive && styles.activeIcon]} /></View></Pressable>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { alignItems: "center", alignSelf: "center", backgroundColor: "#080808", borderColor: "#333333", borderRadius: radius.pill, borderWidth: 1, elevation: 14, flexDirection: "row", height: 58, justifyContent: "space-around", maxWidth: 350, paddingHorizontal: 10, shadowColor: "#000", shadowOffset: { height: 8, width: 0 }, shadowOpacity: 0.35, shadowRadius: 16, width: "86%" },
  item: { alignItems: "center", height: 52, justifyContent: "center", width: 52 },
  iconContainer: { alignItems: "center", height: 44, justifyContent: "center", width: 44 },
  activeItem: { transform: [{ translateY: -18 }] },
  activeIconContainer: { alignItems: "center", backgroundColor: colors.accent, borderColor: "#FF9D7F", borderRadius: radius.pill, borderWidth: 4, elevation: 8, height: 56, justifyContent: "center", shadowColor: "#000", shadowOffset: { height: 5, width: 0 }, shadowOpacity: 0.32, shadowRadius: 8, width: 56 },
  icon: { height: 21, opacity: 0.72, resizeMode: "contain", tintColor: "#D2D2D2", width: 21 },
  activeIcon: { opacity: 1, tintColor: colors.text },
  pressed: { opacity: 0.65 },
});
