import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import Screen from "../components/layout/Screen";
import { addExpense } from "../features/finance/financeSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { colors } from "../theme/colors";
import { radius, space } from "../theme/tokens";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Send">;

export default function SendMoneyScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const currencyCode = useAppSelector((state) => state.preferences.currencyCode);
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  const saveTransaction = () => {
    const normalizedName = recipientName.trim();
    const amountCents = Math.round(Number(amount) * 100);
    if (!normalizedName || !Number.isFinite(amountCents) || amountCents <= 0) {
      setError("Enter a recipient and an amount greater than zero.");
      return;
    }

    dispatch(addExpense({ amountCents, createdAt: new Date().toISOString(), id: nanoid(), recipientName: normalizedName }));
    navigation.navigate("Home");
  };

  return (
    <Screen contentStyle={styles.content}>
      <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
        <Text style={styles.backLabel}>‹  Back</Text>
      </Pressable>
      <Text style={styles.eyebrow}>NEW TRANSFER</Text>
      <Text style={styles.title}>Where is the money going?</Text>
      <Text style={styles.description}>Save an outgoing payment to keep your activity up to date.</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Recipient</Text>
        <TextInput autoCapitalize="words" autoCorrect={false} onChangeText={(value) => { setRecipientName(value); setError(null); }} placeholder="Name or business" placeholderTextColor={colors.mutedText} returnKeyType="next" style={styles.input} value={recipientName} />
        <Text style={[styles.label, styles.amountLabel]}>Amount</Text>
        <View style={styles.amountField}>
          <Text style={styles.currencyPrefix}>{currencyCode}</Text>
          <TextInput inputMode="decimal" keyboardType="decimal-pad" onChangeText={(value) => { setAmount(value); setError(null); }} placeholder="0.00" placeholderTextColor={colors.mutedText} style={styles.amountInput} value={amount} />
        </View>
        {error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
      </View>
      <View style={styles.footer}>
        <Pressable accessibilityRole="button" onPress={saveTransaction} style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}>
          <Text style={styles.saveButtonText}>Save transfer</Text>
        </Pressable>
        <Text style={styles.footerCaption}>Saved locally on this device.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 30, paddingTop: 20 },
  backButton: { alignSelf: "flex-start", justifyContent: "center", minHeight: 44 },
  backLabel: { color: colors.accent, fontSize: 16, fontWeight: "700" },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.2, marginTop: space.xl },
  title: { color: colors.text, fontSize: 31, fontWeight: "800", letterSpacing: -0.8, marginTop: space.sm, maxWidth: 430 },
  description: { color: colors.mutedText, fontSize: 16, lineHeight: 23, marginTop: space.sm, maxWidth: 430 },
  form: { marginTop: 34 },
  label: { color: colors.text, fontSize: 15, fontWeight: "700", marginBottom: space.sm },
  amountLabel: { marginTop: space.xl },
  input: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, color: colors.text, fontSize: 17, minHeight: 54, paddingHorizontal: space.lg },
  amountField: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, flexDirection: "row", minHeight: 62, paddingHorizontal: space.lg },
  currencyPrefix: { color: colors.accent, fontSize: 14, fontWeight: "800", marginRight: space.sm },
  amountInput: { color: colors.text, flex: 1, fontSize: 24, fontVariant: ["tabular-nums"], fontWeight: "800", paddingVertical: 10 },
  error: { color: colors.expense, fontSize: 14, lineHeight: 20, marginTop: space.sm },
  footer: { marginTop: "auto", paddingTop: space.xxl },
  saveButton: { alignItems: "center", backgroundColor: colors.accent, borderRadius: radius.pill, justifyContent: "center", minHeight: 52 },
  saveButtonText: { color: colors.background, fontSize: 16, fontWeight: "800" },
  footerCaption: { color: colors.mutedText, fontSize: 13, marginTop: space.md, textAlign: "center" },
  pressed: { opacity: 0.72 },
});
