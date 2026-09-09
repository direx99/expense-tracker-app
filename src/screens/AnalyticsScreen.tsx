import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { formatCurrency } from "../features/finance/formatters";
import { useAppSelector } from "../store/hooks";
import { colors } from "../theme/colors";

export default function AnalyticsScreen() {
  const currencyCode = useAppSelector((state) => state.preferences.currencyCode);
  const transactions = useAppSelector((state) => state.finance.transactions);
  const monthlyTotal = useMemo(
    () => transactions.reduce((total, transaction) => total + transaction.amountCents, 0),
    [transactions],
  );
  const highestExpense = useMemo(
    () => Math.max(0, ...transactions.map((transaction) => transaction.amountCents)),
    [transactions],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics</Text>
      <Text style={styles.subtitle}>Your saved transaction activity</Text>
      <View style={styles.metricCard}>
        <Text style={styles.metricLabel}>Total spent</Text>
        <Text style={styles.metricValue}>{formatCurrency(monthlyTotal, currencyCode)}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.smallMetric}>
          <Text style={styles.metricLabel}>Transfers</Text>
          <Text style={styles.smallMetricValue}>{transactions.length}</Text>
        </View>
        <View style={styles.smallMetric}>
          <Text style={styles.metricLabel}>Largest expense</Text>
          <Text style={styles.smallMetricValue}>{formatCurrency(highestExpense, currencyCode)}</Text>
        </View>
      </View>
      {transactions.length === 0 && (
        <Text style={styles.emptyText}>Save a transfer to see live analytics here.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1, paddingTop: 32 },
  title: { color: colors.text, fontSize: 30, fontWeight: "700" },
  subtitle: { color: colors.mutedText, marginTop: 8 },
  metricCard: { backgroundColor: colors.surface, borderRadius: 20, marginTop: 28, padding: 20 },
  metricLabel: { color: colors.mutedText, fontSize: 14 },
  metricValue: { color: colors.text, fontSize: 32, fontWeight: "700", marginTop: 8 },
  row: { flexDirection: "row", gap: 12, marginTop: 12 },
  smallMetric: { backgroundColor: colors.surface, borderRadius: 16, flex: 1, padding: 16 },
  smallMetricValue: { color: colors.text, fontSize: 18, fontWeight: "700", marginTop: 8 },
  emptyText: { color: colors.mutedText, lineHeight: 20, marginTop: 28 },
});
