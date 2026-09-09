import { StyleSheet, Text, View } from "react-native";

import { useAppSelector } from "../store/hooks";
import { colors } from "../theme/colors";

export default function WalletScreen() {
  const transactionCount = useAppSelector((state) => state.finance.transactions.length);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
      <Text style={styles.description}>Your financial activity is stored locally on this device.</Text>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Saved transfers</Text>
        <Text style={styles.cardValue}>{transactionCount}</Text>
      </View>
      <Text style={styles.emptyText}>Cards are intentionally not fabricated. Add a card feature when you are ready to collect real card data.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1, paddingTop: 32 },
  title: { color: colors.text, fontSize: 30, fontWeight: "700" },
  description: { color: colors.mutedText, lineHeight: 20, marginTop: 8 },
  card: { backgroundColor: colors.surface, borderRadius: 20, marginTop: 28, padding: 20 },
  cardLabel: { color: colors.mutedText },
  cardValue: { color: colors.text, fontSize: 34, fontWeight: "700", marginTop: 6 },
  emptyText: { color: colors.mutedText, lineHeight: 20, marginTop: 24 },
});
