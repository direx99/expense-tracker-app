import { Pressable, StyleSheet, Text, View } from "react-native";

import Screen from "../components/layout/Screen";
import { signOut } from "../features/auth/authSlice";
import { currencyOptions, setCurrencyCode } from "../features/preferences/preferencesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { colors } from "../theme/colors";
import { radius, space } from "../theme/tokens";

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const currencyCode = useAppSelector((state) => state.preferences.currencyCode);
  const user = useAppSelector((state) => state.auth.user);
  const initial = user?.displayName.charAt(0).toUpperCase() ?? "P";

  return (
    <Screen scroll contentStyle={styles.content}>
      <Text style={styles.eyebrow}>SETTINGS</Text>
      <Text style={styles.title}>Profile & preferences.</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}><Text style={styles.avatarLabel}>{initial}</Text></View>
        <View style={styles.profileCopy}><Text style={styles.profileName}>{user?.displayName}</Text><Text numberOfLines={1} style={styles.profileEmail}>{user?.email}</Text></View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>CURRENCY</Text>
        <Text style={styles.groupDescription}>Choose how balances and transfers are displayed.</Text>
        <View accessibilityRole="radiogroup" style={styles.currencyGrid}>{currencyOptions.map((currency) => { const selected = currency.code === currencyCode; return <Pressable accessibilityRole="radio" accessibilityState={{ checked: selected }} key={currency.code} onPress={() => dispatch(setCurrencyCode(currency.code))} style={[styles.currencyOption, selected && styles.selectedCurrencyOption]}><Text style={[styles.currencyLabel, selected && styles.selectedCurrencyLabel]}>{currency.label}</Text><Text style={[styles.currencyCode, selected && styles.selectedCurrencyCode]}>{currency.code}</Text></Pressable>; })}</View>
      </View>
      <View style={styles.group}>
        <Text style={styles.groupLabel}>ACCOUNT</Text>
        <Pressable accessibilityRole="button" onPress={() => dispatch(signOut())} style={({ pressed }) => [styles.signOutButton, pressed && styles.pressed]}><Text style={styles.signOutLabel}>Sign out</Text></Pressable>
      </View>
      <Text style={styles.caption}>New installs use Sri Lankan Rupees. Your chosen currency is saved locally.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120, paddingTop: 24 },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.2 },
  title: { color: colors.text, fontSize: 31, fontWeight: "800", letterSpacing: -0.8, marginTop: space.sm },
  profileCard: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, flexDirection: "row", marginTop: 30, minHeight: 104, padding: space.lg },
  avatar: { alignItems: "center", backgroundColor: "rgba(255, 107, 61, 0.16)", borderRadius: radius.pill, height: 56, justifyContent: "center", width: 56 },
  avatarLabel: { color: colors.accent, fontSize: 22, fontWeight: "800" },
  profileCopy: { flex: 1, marginLeft: space.md, minWidth: 0 },
  profileName: { color: colors.text, fontSize: 17, fontWeight: "800" },
  profileEmail: { color: colors.mutedText, fontSize: 14, marginTop: space.xs },
  group: { marginTop: 30 },
  groupLabel: { color: colors.mutedText, fontSize: 12, fontWeight: "800", letterSpacing: 1, marginBottom: space.sm },
  groupDescription: { color: colors.mutedText, fontSize: 14, lineHeight: 20 },
  currencyGrid: { flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.md },
  currencyOption: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, flexGrow: 1, minHeight: 76, minWidth: "46%", paddingHorizontal: space.md, paddingVertical: space.md },
  selectedCurrencyOption: { backgroundColor: colors.accent, borderColor: colors.accent },
  currencyLabel: { color: colors.text, fontSize: 15, fontWeight: "800" },
  selectedCurrencyLabel: { color: colors.background },
  currencyCode: { color: colors.mutedText, fontSize: 12, fontWeight: "700", marginTop: 3 },
  selectedCurrencyCode: { color: "#542413" },
  signOutButton: { alignItems: "center", backgroundColor: "rgba(255, 154, 122, 0.12)", borderColor: "rgba(255, 154, 122, 0.35)", borderRadius: radius.md, borderWidth: 1, justifyContent: "center", minHeight: 52 },
  signOutLabel: { color: colors.expense, fontSize: 16, fontWeight: "800" },
  caption: { color: colors.mutedText, fontSize: 14, lineHeight: 20, marginTop: space.lg },
  pressed: { opacity: 0.72 },
});
