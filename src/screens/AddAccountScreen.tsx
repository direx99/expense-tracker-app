import Feather from "@expo/vector-icons/Feather";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import type { ComponentProps } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import Screen from "../components/layout/Screen";
import { addWalletAccount, type WalletAccountType } from "../features/finance/financeSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { colors } from "../theme/colors";
import { radius, space } from "../theme/tokens";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "AddAccount">;
type AccountOption = { description: string; icon: ComponentProps<typeof Feather>["name"]; label: string; value: WalletAccountType };

const options: AccountOption[] = [
  { description: "Checking or current account", icon: "briefcase", label: "Bank account", value: "bank" },
  { description: "Card balance to track", icon: "credit-card", label: "Credit card", value: "credit" },
  { description: "Store or prepaid balance", icon: "gift", label: "Gift card", value: "gift" },
  { description: "Savings and cash reserves", icon: "archive", label: "Savings wallet", value: "savings" },
];

export default function AddAccountScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const currencyCode = useAppSelector((state) => state.preferences.currencyCode);
  const [accountType, setAccountType] = useState<WalletAccountType>("bank");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState<string | null>(null);

  const save = () => {
    const normalizedName = name.trim();
    const parsedBalance = Number(balance.trim().replace(/,/g, ""));
    if (!normalizedName) {
      setError("Enter a name for this account.");
      return;
    }
    if (!Number.isFinite(parsedBalance) || parsedBalance < 0) {
      setError("Enter a balance of zero or more.");
      return;
    }
    dispatch(addWalletAccount({ accountType, balanceCents: Math.round(parsedBalance * 100), createdAt: new Date().toISOString(), id: nanoid(), name: normalizedName }));
    navigation.goBack();
  };

  return (
    <Screen scroll contentStyle={styles.content}>
      <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.backButton}><Text style={styles.backLabel}>‹  Back</Text></Pressable>
      <Text style={styles.eyebrow}>ADD ACCOUNT</Text><Text style={styles.title}>What would you like to track?</Text><Text style={styles.description}>Add the current balance for an account you want to see in your wallet.</Text>
      <Text style={styles.sectionLabel}>ACCOUNT TYPE</Text>
      <View style={styles.options}>{options.map((option) => <Pressable accessibilityRole="radio" accessibilityState={{ checked: accountType === option.value }} key={option.value} onPress={() => { setAccountType(option.value); setError(null); }} style={[styles.option, accountType === option.value && styles.activeOption]}><View style={[styles.optionIcon, accountType === option.value && styles.activeOptionIcon]}><Feather color={accountType === option.value ? colors.background : colors.accent} name={option.icon} size={19} /></View><View style={styles.optionCopy}><Text style={[styles.optionLabel, accountType === option.value && styles.activeOptionLabel]}>{option.label}</Text><Text style={[styles.optionDescription, accountType === option.value && styles.activeOptionDescription]}>{option.description}</Text></View></Pressable>)}</View>
      <View style={styles.form}><Text style={styles.label}>Account name</Text><TextInput autoCapitalize="words" onChangeText={(value) => { setName(value); setError(null); }} placeholder="e.g. Main checking" placeholderTextColor={colors.mutedText} style={styles.input} value={name} /><Text style={[styles.label, styles.nextLabel]}>Current balance ({currencyCode})</Text><TextInput inputMode="decimal" keyboardType="decimal-pad" onChangeText={(value) => { setBalance(value); setError(null); }} placeholder="0.00" placeholderTextColor={colors.mutedText} style={styles.input} value={balance} />{error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}</View>
      <Pressable accessibilityRole="button" onPress={save} style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}><Text style={styles.saveButtonLabel}>Save account</Text></Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 36, paddingTop: 16 },
  backButton: { alignSelf: "flex-start", justifyContent: "center", minHeight: 44 },
  backLabel: { color: colors.accent, fontSize: 16, fontWeight: "700" },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.2, marginTop: 30 },
  title: { color: colors.text, fontSize: 31, fontWeight: "800", letterSpacing: -0.8, marginTop: space.sm },
  description: { color: colors.mutedText, fontSize: 16, lineHeight: 22, marginTop: space.sm },
  sectionLabel: { color: colors.mutedText, fontSize: 12, fontWeight: "800", letterSpacing: 1, marginTop: 30 },
  options: { gap: space.sm, marginTop: space.sm },
  option: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, flexDirection: "row", minHeight: 72, paddingHorizontal: space.md },
  activeOption: { backgroundColor: colors.accent, borderColor: colors.accent },
  optionIcon: { alignItems: "center", backgroundColor: "#F3DDD5", borderRadius: radius.pill, height: 38, justifyContent: "center", width: 38 },
  activeOptionIcon: { backgroundColor: "rgba(17, 17, 17, 0.14)" },
  optionCopy: { flex: 1, marginLeft: space.md },
  optionLabel: { color: colors.text, fontSize: 15, fontWeight: "800" },
  activeOptionLabel: { color: colors.background },
  optionDescription: { color: colors.mutedText, fontSize: 13, marginTop: 2 },
  activeOptionDescription: { color: "#522513" },
  form: { marginTop: 30 },
  label: { color: colors.text, fontSize: 15, fontWeight: "700", marginBottom: space.sm },
  nextLabel: { marginTop: space.xl },
  input: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, color: colors.text, fontSize: 16, minHeight: 54, paddingHorizontal: space.lg },
  error: { color: colors.expense, fontSize: 14, marginTop: space.sm },
  saveButton: { alignItems: "center", backgroundColor: colors.accent, borderRadius: radius.pill, justifyContent: "center", marginTop: 32, minHeight: 54 },
  saveButtonLabel: { color: colors.background, fontSize: 16, fontWeight: "800" },
  pressed: { opacity: 0.68 },
});
