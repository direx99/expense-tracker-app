import { useNavigation, useNavigationState } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import card from "../../../assets/card.png";
import home from "../../../assets/home.png";
import more from "../../../assets/more.png";
import settings from "../../../assets/setting.png";
import statistic from "../../../assets/statistic.png";
import { colors } from "../../theme/colors";
import { radius } from "../../theme/tokens";
import type { RootStackParamList } from "../../types/navigation";

type Navigation = NativeStackNavigationProp<RootStackParamList>;
type NavItem = { icon: number; label: string; route: keyof RootStackParamList };

const items: NavItem[] = [
  { icon: home, label: "Home", route: "Home" },
  { icon: statistic, label: "Insights", route: "Statistic" },
  { icon: card, label: "Wallet", route: "Wallet" },
  { icon: settings, label: "Settings", route: "Settings" },
  { icon: more, label: "More", route: "More" },
];

export default function BottomNav() {
  const navigation = useNavigation<Navigation>();
  const activeRoute = useNavigationState((state) => state.routes[state.index]?.name);
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.shell, { marginBottom: Math.max(bottom, 12) }]}>
      {items.map((item) => {
        const isActive = item.route === activeRoute;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            key={item.route}
            onPress={() => navigation.navigate(item.route)}
            style={({ pressed }) => [styles.item, isActive && styles.activeItem, pressed && styles.pressed]}
          >
            <Image style={[styles.icon, isActive && styles.activeIcon]} source={item.icon} />
            <Text numberOfLines={1} style={[styles.label, isActive && styles.activeLabel]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { alignSelf: "center", backgroundColor: colors.elevatedSurface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, flexDirection: "row", justifyContent: "space-between", maxWidth: 680, minHeight: 68, padding: 6, width: "94%" },
  item: { alignItems: "center", borderRadius: radius.md, flex: 1, justifyContent: "center", minHeight: 56, paddingHorizontal: 2 },
  activeItem: { backgroundColor: "rgba(120, 216, 174, 0.16)" },
  pressed: { opacity: 0.68 },
  icon: { height: 21, opacity: 0.6, resizeMode: "contain", tintColor: colors.mutedText, width: 21 },
  activeIcon: { opacity: 1, tintColor: colors.accent },
  label: { color: colors.mutedText, fontSize: 10, fontWeight: "600", marginTop: 3 },
  activeLabel: { color: colors.accent },
});
