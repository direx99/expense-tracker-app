import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Transaction = {
  amountCents: number;
  createdAt: string;
  id: string;
  recipientName: string;
};

export type WalletAccountType = "bank" | "credit" | "gift" | "savings";

export type WalletAccount = {
  accountType: WalletAccountType;
  balanceCents: number;
  createdAt: string;
  id: string;
  name: string;
};

export type FinanceState = {
  transactions: Transaction[];
  walletAccounts: WalletAccount[];
};

const initialState: FinanceState = {
  transactions: [],
  walletAccounts: [],
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Transaction>) {
      state.transactions.unshift(action.payload);
    },
    removeTransaction(state, action: PayloadAction<string>) {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload,
      );
    },
    addWalletAccount(state, action: PayloadAction<WalletAccount>) {
      state.walletAccounts ??= [];
      state.walletAccounts.unshift(action.payload);
    },
    removeWalletAccount(state, action: PayloadAction<string>) {
      state.walletAccounts = (state.walletAccounts ?? []).filter(
        (account) => account.id !== action.payload,
      );
    },
  },
});

export const { addExpense, addWalletAccount, removeTransaction, removeWalletAccount } = financeSlice.actions;
export default financeSlice.reducer;
