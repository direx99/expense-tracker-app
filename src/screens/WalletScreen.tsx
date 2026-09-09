import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useMemo, useState } from "react";
import type { ComponentProps } from "react";

import Screen from "../components/layout/Screen";
import { formatCurrency } from "../features/finance/formatters";
import { removeWalletAccount, type WalletAccount, type WalletAccountType } from "../features/finance/financeSlice";
import type { CurrencyCode } from "../features/preferences/preferencesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { colors } from "../theme/colors";
import { radius, space } from "../theme/tokens";
import type { RootStackParamList } from "../types/navigation";

type Filter = "all" | WalletAccountType;
type Navigation = NativeStackNavigationProp<RootStackParamList, "Wallet">;

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Bank accounts", value: "bank" },
  { label: "Credit cards", value: "credit" },
  { label: "Gift cards", value: "gift" },
  { label: "Savings", value: "savings" },
];

const accountMeta: Record<WalletAccountType, { icon: ComponentProps<typeof Feather>["name"]; label: string }> = {
  bank: { icon: "briefcase", label: "Bank account" },
  credit: { icon: "credit-card", label: "Credit card" },
  gift: { icon: "gift", label: "Gift card" },
  savings: { icon: "archive", label: "Savings wallet" },
};

export default function WalletScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Navigation>();
  const currencyCode = useAppSelector((state) => state.preferences.currencyCode);
  const accounts = useAppSelector((state) => state.finance.walletAccounts ?? []);
  const [filter, setFilter] = useState<Filter>("all");
  const displayedAccounts = useMemo(() => filter === "all" ? accounts : accounts.filter((account) => account.accountType === filter), [accounts, filter]);
  const totalCents = useMemo(() => accounts.reduce((total, account) => total + account.balanceCents, 0), [accounts]);

  const confirmRemove = (account: WalletAccount) => {
    Alert.alert("Remove account?", `${account.name} will be removed from this device.`, [
      { style: "cancel", text: "Cancel" },
      { onPress: () => dispatch(removeWalletAccount(account.id)), style: "destructive", text: "Remove" },
    ]);
  };

  return (
    <Screen scroll contentStyle={styles.content}>
      <View style={styles.header}><View><Text style={styles.eyebrow}>WALLET</Text><Text style={styles.title}>Your accounts.</Text></View><Pressable accessibilityRole="button" onPress={() => navigation.navigate("AddAccount")} style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}><Feather color={colors.background} name="plus" size={19} strokeWidth={3} /><Text style={styles.addButtonLabel}>Add</Text></Pressable></View>
      <View style={styles.totalPanel}><Text style={styles.totalLabel}>Total balance</Text><Text adjustsFontSizeToFit numberOfLines={1} style={styles.totalValue}>{formatCurrency(totalCents, currencyCode)}</Text><Text style={styles.totalCaption}>{accounts.length === 1 ? "1 account saved" : `${accounts.length} accounts saved`}</Text></View>
      <ScrollView contentContainerStyle={styles.filterList} horizontal showsHorizontalScrollIndicator={false}>{filters.map((item) => <Pressable accessibilityRole="tab" accessibilityState={{ selected: filter === item.value }} key={item.value} onPress={() => setFilter(item.value)} style={[styles.filter, filter === item.value && styles.activeFilter]}><Text style={[styles.filterLabel, filter === item.value && styles.activeFilterLabel]}>{item.label}</Text></Pressable>)}</ScrollView>
      {displayedAccounts.length === 0 ? <View style={styles.emptyPanel}><Feather color={colors.accent} name="plus-circle" size={26} /><Text style={styles.emptyTitle}>{filter === "all" ? "Add your first account" : "No accounts in this group"}</Text><Text style={styles.emptyBody}>{filter === "all" ? "Keep bank accounts, credit cards, gift cards, and savings wallets together." : "Choose another type or add a new account."}</Text><Pressable onPress={() => navigation.navigate("AddAccount")} style={styles.emptyAction}><Text style={styles.emptyActionLabel}>Add account</Text></Pressable></View> : <View style={styles.accountList}>{displayedAccounts.map((account) => <AccountRow account={account} currencyCode={currencyCode} key={account.id} onRemove={() => confirmRemove(account)} />)}</View>}
    </Screen>
  );
}

function AccountRow({ account, currencyCode, onRemove }: { account: WalletAccount; currencyCode: CurrencyCode; onRemove: () => void }) {
  const meta = accountMeta[account.accountType];
  return <View style={styles.accountRow}><View style={styles.accountIcon}><Feather color={colors.accent} name={meta.icon} size={20} /></View><View style={styles.accountCopy}><Text numberOfLines={1} style={styles.accountName}>{account.name}</Text><Text style={styles.accountType}>{meta.label}</Text></View><View style={styles.accountEnd}><Text adjustsFontSizeToFit numberOfLines={1} style={styles.accountBalance}>{formatCurrency(account.balanceCents, currencyCode)}</Text><Pressable accessibilityLabel={`Remove ${account.name}`} accessibilityRole="button" hitSlop={8} onPress={onRemove} style={({ pressed }) => [styles.removeButton, pressed && styles.pressed]}><Feather color={colors.cardMutedText} name="trash-2" size={16} /></Pressable></View></View>;
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120, paddingTop: 24 },
  header: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.2 },
  title: { color: colors.text, fontSize: 31, fontWeight: "800", letterSpacing: -0.8, marginTop: space.sm },
  addButton: { alignItems: "center", backgroundColor: colors.accent, borderRadius: radius.pill, flexDirection: "row", gap: 4, justifyContent: "center", minHeight: 44, paddingHorizontal: space.md },
  addButtonLabel: { color: colors.background, fontSize: 14, fontWeight: "800" },
  totalPanel: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, marginTop: 30, padding: space.xl },
  totalLabel: { color: colors.mutedText, fontSize: 14, fontWeight: "600" },
  totalValue: { color: colors.text, fontSize: 40, fontVariant: ["tabular-nums"], fontWeight: "800", marginTop: space.sm },
  totalCaption: { color: colors.accent, fontSize: 13, fontWeight: "700", marginTop: space.md },
  filterList: { gap: space.sm, paddingVertical: space.xl },
  filter: { backgroundColor: colors.elevatedSurface, borderColor: colors.border, borderRadius: radius.pill, borderWidth: 1, justifyContent: "center", minHeight: 40, paddingHorizontal: space.md },
  activeFilter: { backgroundColor: colors.accent, borderColor: colors.accent },
  filterLabel: { color: colors.mutedText, fontSize: 13, fontWeight: "700" },
  activeFilterLabel: { color: colors.background },
  emptyPanel: { alignItems: "flex-start", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderStyle: "dashed", borderWidth: 1, padding: space.xl },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: "800", marginTop: space.md },
  emptyBody: { color: colors.mutedText, fontSize: 15, lineHeight: 21, marginTop: space.xs },
  emptyAction: { justifyContent: "center", marginTop: space.md, minHeight: 44 },
  emptyActionLabel: { color: colors.accent, fontSize: 15, fontWeight: "800" },
  accountList: { gap: space.sm },
  accountRow: { alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, flexDirection: "row", minHeight: 84, paddingHorizontal: space.md },
  accountIcon: { alignItems: "center", backgroundColor: "#F3DDD5", borderRadius: radius.pill, height: 42, justifyContent: "center", width: 42 },
  accountCopy: { flex: 1, marginLeft: space.md, minWidth: 0 },
  accountName: { color: colors.cardText, fontSize: 16, fontWeight: "800" },
  accountType: { color: colors.cardMutedText, fontSize: 13, marginTop: 2 },
  accountEnd: { alignItems: "flex-end", marginLeft: space.sm, maxWidth: "42%" },
  accountBalance: { color: colors.cardText, fontSize: 15, fontVariant: ["tabular-nums"], fontWeight: "800" },
  removeButton: { alignItems: "center", height: 34, justifyContent: "center", marginTop: 2, width: 34 },
  pressed: { opacity: 0.68 },
});
