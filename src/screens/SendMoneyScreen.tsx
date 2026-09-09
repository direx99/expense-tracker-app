import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { addExpense } from "../features/finance/financeSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { colors } from "../theme/colors";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Send">;

export default function SendMoneyScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const currencyCode = useAppSelector((state) => state.preferences.currencyCode);
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");

  const saveTransaction = () => {
    const normalizedName = recipientName.trim();
    const amountCents = Math.round(Number(amount) * 100);

    if (!normalizedName || !Number.isFinite(amountCents) || amountCents <= 0) {
      Alert.alert("Enter a recipient and a valid amount.");
      return;
    }

    dispatch(
      addExpense({
        amountCents,
        createdAt: new Date().toISOString(),
        id: nanoid(),
        recipientName: normalizedName,
      }),
    );
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Back</Text>
      </Pressable>
      <Text style={styles.title}>Send money</Text>
      <Text style={styles.description}>Saved transfers are available after restarting the app.</Text>

      <Text style={styles.label}>Recipient</Text>
      <TextInput
        autoCapitalize="words"
        onChangeText={setRecipientName}
        placeholder="Name"
        placeholderTextColor={colors.mutedText}
        style={styles.input}
        value={recipientName}
      />

      <Text style={styles.label}>Amount ({currencyCode})</Text>
      <TextInput
        inputMode="decimal"
        keyboardType="decimal-pad"
        onChangeText={setAmount}
        placeholder="0.00"
        placeholderTextColor={colors.mutedText}
        style={styles.input}
        value={amount}
      />

      <Pressable style={styles.saveButton} onPress={saveTransaction}>
        <Text style={styles.saveButtonText}>Save transfer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1, paddingTop: 32 },
  back: { color: colors.accent, fontSize: 16, fontWeight: "600" },
  title: { color: colors.text, fontSize: 30, fontWeight: "700", marginTop: 28 },
  description: { color: colors.mutedText, lineHeight: 20, marginTop: 8 },
  label: { color: colors.text, fontSize: 15, fontWeight: "600", marginTop: 28 },
  input: { backgroundColor: colors.surface, borderColor: "#3D3D3D", borderRadius: 12, borderWidth: 1, color: colors.text, fontSize: 18, marginTop: 10, paddingHorizontal: 14, paddingVertical: 13 },
  saveButton: { alignItems: "center", backgroundColor: colors.accent, borderRadius: 24, marginTop: 32, paddingVertical: 15 },
  saveButtonText: { color: colors.text, fontSize: 16, fontWeight: "700" },
});
