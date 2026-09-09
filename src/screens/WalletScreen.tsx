import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import Screen from "../components/layout/Screen";
import { formatCurrency } from "../features/finance/formatters";
import { useAppSelector } from "../store/hooks";
import { colors } from "../theme/colors";
import { radius, space } from "../theme/tokens";

export default function WalletScreen() {
  const currencyCode = useAppSelector((state) => state.preferences.currencyCode);
  const transactions = useAppSelector((state) => state.finance.transactions);
  const totalCents = useMemo(() => transactions.reduce((total, item) => total + item.amountCents, 0), [transactions]);

  return (
    <Screen scroll contentStyle={styles.content}>
      <Text style={styles.eyebrow}>WALLET</Text>
      <Text style={styles.title}>A simple view of what left your account.</Text>
      <View style={styles.balancePanel}>
        <Text style={styles.balanceLabel}>Saved outgoings</Text>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.balanceValue}>{formatCurrency(totalCents, currencyCode)}</Text>
        <View style={styles.balanceDivider} />
        <View style={styles.balanceFooter}><Text style={styles.balanceCaption}>Transfers</Text><Text style={styles.balanceCaption}>{transactions.length}</Text></View>
      </View>
      <View style={styles.notePanel}>
        <Text style={styles.noteTitle}>Keep your data honest</Text>
        <Text style={styles.noteBody}>This wallet only shows amounts you have actually saved. It never fills your account with demo cards or invented balances.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120, paddingTop: 24 },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.2 },
  title: { color: colors.text, fontSize: 31, fontWeight: "800", letterSpacing: -0.8, marginTop: space.sm, maxWidth: 490 },
  balancePanel: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, marginTop: 30, padding: space.xl },
  balanceLabel: { color: colors.mutedText, fontSize: 14, fontWeight: "600" },
  balanceValue: { color: colors.text, fontSize: 40, fontVariant: ["tabular-nums"], fontWeight: "800", marginTop: space.sm },
  balanceDivider: { backgroundColor: colors.border, height: StyleSheet.hairlineWidth, marginTop: space.xl },
  balanceFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: space.md },
  balanceCaption: { color: colors.mutedText, fontSize: 14 },
  notePanel: { backgroundColor: colors.elevatedSurface, borderRadius: radius.md, marginTop: space.md, padding: space.lg },
  noteTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  noteBody: { color: colors.mutedText, fontSize: 15, lineHeight: 21, marginTop: space.xs },
});
