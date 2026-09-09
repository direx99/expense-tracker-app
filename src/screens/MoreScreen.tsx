import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Screen from "../components/layout/Screen";
import { colors } from "../theme/colors";
import { radius, space } from "../theme/tokens";
import type { RootStackParamList } from "../types/navigation";

type Navigation = NativeStackNavigationProp<RootStackParamList, "More">;

export default function MoreScreen() {
  const navigation = useNavigation<Navigation>();
  return (
    <Screen contentStyle={styles.content}>
      <Text style={styles.eyebrow}>MORE</Text>
      <Text style={styles.title}>Your money, on your terms.</Text>
      <Text style={styles.description}>Everything in this app stays on this device unless you choose to export it in a future update.</Text>
      <View style={styles.menu}>
        <MenuItem description="Choose how amounts are displayed." label="Preferences" onPress={() => navigation.navigate("Settings")} />
        <MenuItem description="Review saved outgoing activity." label="Wallet" onPress={() => navigation.navigate("Wallet")} />
      </View>
    </Screen>
  );
}

function MenuItem({ description, label, onPress }: { description: string; label: string; onPress: () => void }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}><View><Text style={styles.menuLabel}>{label}</Text><Text style={styles.menuDescription}>{description}</Text></View><Text style={styles.arrow}>›</Text></Pressable>;
}

const styles = StyleSheet.create({
  content: { paddingTop: 24 },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.2 },
  title: { color: colors.text, fontSize: 31, fontWeight: "800", letterSpacing: -0.8, marginTop: space.sm },
  description: { color: colors.mutedText, fontSize: 16, lineHeight: 23, marginTop: space.sm, maxWidth: 480 },
  menu: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, marginTop: 34, overflow: "hidden" },
  menuItem: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", minHeight: 82, paddingHorizontal: space.lg },
  menuLabel: { color: colors.text, fontSize: 16, fontWeight: "700" },
  menuDescription: { color: colors.mutedText, fontSize: 14, marginTop: space.xs },
  arrow: { color: colors.accent, fontSize: 28, marginLeft: space.md },
  pressed: { backgroundColor: colors.elevatedSurface },
});
