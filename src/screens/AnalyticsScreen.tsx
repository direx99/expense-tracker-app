import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import Screen from "../components/layout/Screen";
import { formatCurrency } from "../features/finance/formatters";
import { useResponsiveLayout } from "../hooks/useResponsiveLayout";
import { useAppSelector } from "../store/hooks";
import { colors } from "../theme/colors";
import { radius, space } from "../theme/tokens";

export default function AnalyticsScreen() {
  const { isTablet } = useResponsiveLayout();
  const currencyCode = useAppSelector((state) => state.preferences.currencyCode);
  const transactions = useAppSelector((state) => state.finance.transactions);
  const metrics = useMemo(() => {
    const totalCents = transactions.reduce((total, item) => total + item.amountCents, 0);
    const largestCents = Math.max(0, ...transactions.map((item) => item.amountCents));
    const averageCents = transactions.length ? Math.round(totalCents / transactions.length) : 0;
    return { averageCents, largestCents, totalCents };
  }, [transactions]);

  return (
    <Screen scroll contentStyle={styles.content}>
      <Text style={styles.eyebrow}>SPENDING INSIGHTS</Text>
      <Text style={styles.title}>See the shape of your spending.</Text>
      <Text style={styles.description}>Every saved transfer updates these numbers immediately.</Text>

      <View style={styles.primaryMetric}>
        <Text style={styles.metricLabel}>Total spent</Text>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.totalValue}>{formatCurrency(metrics.totalCents, currencyCode)}</Text>
        <Text style={styles.metricCaption}>{transactions.length === 1 ? "1 transfer recorded" : `${transactions.length} transfers recorded`}</Text>
      </View>

      <View style={[styles.secondaryMetrics, isTablet && styles.secondaryMetricsWide]}>
        <Metric label="Average transfer" value={formatCurrency(metrics.averageCents, currencyCode)} />
        <Metric label="Largest expense" value={formatCurrency(metrics.largestCents, currencyCode)} />
      </View>

      {transactions.length === 0 && (
        <View style={styles.emptyPanel}>
          <Text style={styles.emptyTitle}>Insights will grow with you</Text>
          <Text style={styles.emptyBody}>Start with one transfer. We will turn that activity into a useful spending record.</Text>
        </View>
      )}
    </Screen>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <View style={styles.secondaryMetric}><Text style={styles.metricLabel}>{label}</Text><Text adjustsFontSizeToFit numberOfLines={1} style={styles.secondaryValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120, paddingTop: 24 },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.2 },
  title: { color: colors.text, fontSize: 31, fontWeight: "800", letterSpacing: -0.8, marginTop: space.sm, maxWidth: 500 },
  description: { color: colors.mutedText, fontSize: 16, lineHeight: 23, marginTop: space.sm, maxWidth: 500 },
  primaryMetric: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, marginTop: 30, padding: space.xl },
  metricLabel: { color: colors.mutedText, fontSize: 14, fontWeight: "600" },
  totalValue: { color: colors.text, fontSize: 39, fontVariant: ["tabular-nums"], fontWeight: "800", marginTop: space.sm },
  metricCaption: { color: colors.accent, fontSize: 13, fontWeight: "700", marginTop: space.md },
  secondaryMetrics: { gap: space.md, marginTop: space.md },
  secondaryMetricsWide: { flexDirection: "row" },
  secondaryMetric: { backgroundColor: colors.elevatedSurface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, flex: 1, minHeight: 122, padding: space.lg },
  secondaryValue: { color: colors.text, fontSize: 22, fontVariant: ["tabular-nums"], fontWeight: "800", marginTop: space.md },
  emptyPanel: { borderColor: colors.border, borderRadius: radius.md, borderStyle: "dashed", borderWidth: 1, marginTop: space.xl, padding: space.lg },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  emptyBody: { color: colors.mutedText, fontSize: 15, lineHeight: 21, marginTop: space.xs },
});
