import { Pressable, StyleSheet, Text, View } from "react-native";

import Screen from "../components/layout/Screen";
import { setCurrencyCode } from "../features/preferences/preferencesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { colors } from "../theme/colors";
import { radius, space } from "../theme/tokens";

const currencies = ["USD", "EUR", "GBP"];

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const currencyCode = useAppSelector((state) => state.preferences.currencyCode);
  const currentIndex = currencies.indexOf(currencyCode);
  const nextCurrency = currencies[(currentIndex + 1) % currencies.length];

  return (
    <Screen contentStyle={styles.content}>
      <Text style={styles.eyebrow}>PREFERENCES</Text>
      <Text style={styles.title}>Make the tracker yours.</Text>
      <View style={styles.group}>
        <Text style={styles.groupLabel}>DISPLAY</Text>
        <Pressable accessibilityRole="button" onPress={() => dispatch(setCurrencyCode(nextCurrency))} style={({ pressed }) => [styles.setting, pressed && styles.pressed]}>
          <View><Text style={styles.settingTitle}>Currency</Text><Text style={styles.settingDescription}>Tap to use the next available currency.</Text></View>
          <Text style={styles.settingValue}>{currencyCode}</Text>
        </Pressable>
      </View>
      <Text style={styles.caption}>Preferences are saved locally with your transfers.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 24 },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.2 },
  title: { color: colors.text, fontSize: 31, fontWeight: "800", letterSpacing: -0.8, marginTop: space.sm },
  group: { marginTop: 34 },
  groupLabel: { color: colors.mutedText, fontSize: 12, fontWeight: "800", letterSpacing: 1, marginBottom: space.sm },
  setting: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, flexDirection: "row", justifyContent: "space-between", minHeight: 78, paddingHorizontal: space.lg },
  settingTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  settingDescription: { color: colors.mutedText, fontSize: 13, marginTop: space.xs },
  settingValue: { color: colors.accent, fontSize: 15, fontWeight: "800", marginLeft: space.md },
  caption: { color: colors.mutedText, fontSize: 14, lineHeight: 20, marginTop: space.lg },
  pressed: { opacity: 0.72 },
});
