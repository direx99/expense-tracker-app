import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Screen from "../components/layout/Screen";
import { formatCurrency, formatTransactionDate } from "../features/finance/formatters";
import { useResponsiveLayout } from "../hooks/useResponsiveLayout";
import { useAppSelector } from "../store/hooks";
import { colors } from "../theme/colors";
import { radius, space } from "../theme/tokens";
import type { RootStackParamList } from "../types/navigation";

type Navigation = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const { isCompact, isTablet } = useResponsiveLayout();
  const currencyCode = useAppSelector((state) => state.preferences.currencyCode);
  const transactions = useAppSelector((state) => state.finance.transactions);
  const totalSpentCents = useMemo(() => transactions.reduce((total, item) => total + item.amountCents, 0), [transactions]);
  const recipients = useMemo(() => [...new Set(transactions.map((item) => item.recipientName))].slice(0, 4), [transactions]);

  return (
    <Screen scroll contentStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>PERSONAL FINANCE</Text>
          <Text style={[styles.title, isCompact && styles.compactTitle]}>Your spending, clear.</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={() => navigation.navigate("Send")} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
          <Text style={styles.primaryButtonText}>New transfer</Text>
        </Pressable>
      </View>

      <View style={[styles.summary, isTablet && styles.summaryWide]}>
        <Text style={styles.summaryLabel}>Total spent</Text>
        <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.summaryValue, isCompact && styles.compactAmount]}>{formatCurrency(totalSpentCents, currencyCode)}</Text>
        <View style={styles.summaryFooter}>
          <Text style={styles.summaryCaption}>{transactions.length} saved</Text>
          <Text style={styles.summaryCaption}>This device</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent recipients</Text>
        {recipients.length > 0 && <Text style={styles.sectionMeta}>{recipients.length}</Text>}
      </View>
      {recipients.length === 0 ? (
        <View style={styles.emptyPanel}>
          <Text style={styles.emptyTitle}>No recipients yet</Text>
          <Text style={styles.emptyBody}>Your recent recipients will appear after your first saved transfer.</Text>
        </View>
      ) : (
        <View style={styles.recipientList}>
          {recipients.map((recipient) => <View key={recipient} style={styles.recipientChip}><Text style={styles.recipientText}>{recipient}</Text></View>)}
        </View>
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Activity</Text>
        <Text style={styles.sectionMeta}>{transactions.length} total</Text>
      </View>
      {transactions.length === 0 ? (
        <View style={styles.emptyPanel}>
          <Text style={styles.emptyTitle}>Nothing to review</Text>
          <Text style={styles.emptyBody}>Create a transfer to start tracking outgoing money.</Text>
          <Pressable onPress={() => navigation.navigate("Send")} style={styles.textAction}><Text style={styles.textActionLabel}>Create transfer</Text></Pressable>
        </View>
      ) : (
        <View style={styles.activityPanel}>
          {transactions.slice(0, 8).map((transaction, index) => (
            <View key={transaction.id} style={[styles.transaction, index > 0 && styles.transactionBorder]}>
              <View style={styles.transactionIdentity}>
                <View style={styles.avatar}><Text style={styles.avatarText}>{transaction.recipientName.charAt(0).toUpperCase()}</Text></View>
                <View style={styles.transactionCopy}>
                  <Text numberOfLines={1} style={styles.transactionRecipient}>{transaction.recipientName}</Text>
                  <Text style={styles.transactionDate}>{formatTransactionDate(transaction.createdAt)}</Text>
                </View>
              </View>
              <Text style={styles.transactionAmount}>−{formatCurrency(transaction.amountCents, currencyCode)}</Text>
            </View>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120, paddingTop: 20 },
  header: { alignItems: "flex-start", flexDirection: "row", gap: space.md, justifyContent: "space-between" },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.2 },
  title: { color: colors.text, fontSize: 30, fontWeight: "800", letterSpacing: -0.8, marginTop: space.xs },
  compactTitle: { fontSize: 25 },
  primaryButton: { alignItems: "center", backgroundColor: colors.accent, borderRadius: radius.pill, justifyContent: "center", minHeight: 44, paddingHorizontal: 14 },
  primaryButtonText: { color: colors.background, fontSize: 13, fontWeight: "800" },
  pressed: { opacity: 0.72 },
  summary: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, marginTop: space.xxl, padding: space.xl },
  summaryWide: { paddingVertical: 30 },
  summaryLabel: { color: colors.mutedText, fontSize: 14, fontWeight: "600" },
  summaryValue: { color: colors.text, fontSize: 42, fontVariant: ["tabular-nums"], fontWeight: "800", letterSpacing: -1.4, marginTop: space.sm },
  compactAmount: { fontSize: 34 },
  summaryFooter: { borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth, flexDirection: "row", justifyContent: "space-between", marginTop: space.xl, paddingTop: space.md },
  summaryCaption: { color: colors.mutedText, fontSize: 13 },
  sectionHeader: { alignItems: "baseline", flexDirection: "row", justifyContent: "space-between", marginTop: 30 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: "700", letterSpacing: -0.2 },
  sectionMeta: { color: colors.mutedText, fontSize: 13 },
  emptyPanel: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, marginTop: space.md, padding: space.lg },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  emptyBody: { color: colors.mutedText, fontSize: 15, lineHeight: 21, marginTop: space.xs },
  textAction: { alignSelf: "flex-start", marginTop: space.md, minHeight: 44, justifyContent: "center" },
  textActionLabel: { color: colors.accent, fontSize: 15, fontWeight: "800" },
  recipientList: { flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.md },
  recipientChip: { backgroundColor: colors.elevatedSurface, borderRadius: radius.pill, paddingHorizontal: space.md, paddingVertical: 10 },
  recipientText: { color: colors.text, fontSize: 14, fontWeight: "600" },
  activityPanel: { backgroundColor: colors.card, borderRadius: radius.md, marginTop: space.md, overflow: "hidden" },
  transaction: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", minHeight: 72, paddingHorizontal: space.lg },
  transactionBorder: { borderTopColor: "#E4E4E4", borderTopWidth: StyleSheet.hairlineWidth },
  transactionIdentity: { alignItems: "center", flex: 1, flexDirection: "row", minWidth: 0 },
  avatar: { alignItems: "center", backgroundColor: "#E9E9E9", borderRadius: radius.pill, height: 38, justifyContent: "center", marginRight: space.md, width: 38 },
  avatarText: { color: colors.cardText, fontSize: 15, fontWeight: "800" },
  transactionCopy: { flex: 1, minWidth: 0 },
  transactionRecipient: { color: colors.cardText, fontSize: 15, fontWeight: "700" },
  transactionDate: { color: colors.cardMutedText, fontSize: 13, marginTop: 2 },
  transactionAmount: { color: colors.cardText, fontSize: 15, fontVariant: ["tabular-nums"], fontWeight: "800", marginLeft: space.md },
});
