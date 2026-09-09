import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { formatCurrency, formatTransactionDate } from "../features/finance/formatters";
import { useAppSelector } from "../store/hooks";
import { colors } from "../theme/colors";
import type { RootStackParamList } from "../types/navigation";

type Navigation = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const currencyCode = useAppSelector((state) => state.preferences.currencyCode);
  const transactions = useAppSelector((state) => state.finance.transactions);
  const totalSpentCents = useMemo(
    () => transactions.reduce((total, transaction) => total + transaction.amountCents, 0),
    [transactions],
  );
  const recipients = useMemo(
    () => [...new Set(transactions.map((transaction) => transaction.recipientName))].slice(0, 5),
    [transactions],
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Expense tracker</Text>
          <Text style={styles.title}>Overview</Text>
        </View>
        <Pressable style={styles.sendButton} onPress={() => navigation.navigate("Send")}>
          <Text style={styles.sendButtonText}>Send money</Text>
        </Pressable>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total spent</Text>
        <Text style={styles.summaryValue}>{formatCurrency(totalSpentCents, currencyCode)}</Text>
        <Text style={styles.summaryCaption}>{transactions.length} saved transactions</Text>
      </View>

      <Text style={styles.sectionTitle}>Recent recipients</Text>
      {recipients.length === 0 ? (
        <Text style={styles.emptyText}>Recipients appear here after your first transfer.</Text>
      ) : (
        <View style={styles.recipientList}>
          {recipients.map((recipient) => (
            <View key={recipient} style={styles.recipientChip}>
              <Text style={styles.recipientText}>{recipient}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.transactionsHeader}>
        <Text style={styles.sectionTitle}>Recent transactions</Text>
        <Text style={styles.count}>{transactions.length}</Text>
      </View>
      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>No saved transactions yet.</Text>
      ) : (
        transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transaction}>
            <View>
              <Text style={styles.transactionRecipient}>{transaction.recipientName}</Text>
              <Text style={styles.transactionDate}>{formatTransactionDate(transaction.createdAt)}</Text>
            </View>
            <Text style={styles.transactionAmount}>
              −{formatCurrency(transaction.amountCents, currencyCode)}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: colors.background, paddingTop: 32, paddingBottom: 96 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  greeting: { color: colors.mutedText, fontSize: 14 },
  title: { color: colors.text, fontSize: 28, fontWeight: "700", marginTop: 4 },
  sendButton: { backgroundColor: colors.accent, borderRadius: 24, paddingHorizontal: 14, paddingVertical: 10 },
  sendButtonText: { color: colors.text, fontWeight: "700" },
  summaryCard: { backgroundColor: colors.surface, borderRadius: 20, marginTop: 28, padding: 20 },
  summaryLabel: { color: colors.mutedText, fontSize: 14 },
  summaryValue: { color: colors.text, fontSize: 34, fontWeight: "700", marginTop: 6 },
  summaryCaption: { color: colors.mutedText, marginTop: 8 },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: "700", marginTop: 28 },
  emptyText: { color: colors.mutedText, lineHeight: 20, marginTop: 10 },
  recipientList: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  recipientChip: { backgroundColor: colors.surface, borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8 },
  recipientText: { color: colors.text },
  transactionsHeader: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  count: { color: colors.mutedText, marginTop: 28 },
  transaction: { alignItems: "center", borderBottomColor: "#303030", borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: "row", justifyContent: "space-between", paddingVertical: 16 },
  transactionRecipient: { color: colors.text, fontSize: 16, fontWeight: "600" },
  transactionDate: { color: colors.mutedText, marginTop: 4 },
  transactionAmount: { color: colors.accent, fontSize: 16, fontWeight: "700" },
});
