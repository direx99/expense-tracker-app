import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Transaction = {
  amountCents: number;
  createdAt: string;
  id: string;
  recipientName: string;
};

export type FinanceState = {
  transactions: Transaction[];
};

const initialState: FinanceState = {
  transactions: [],
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
  },
});

export const { addExpense, removeTransaction } = financeSlice.actions;
export default financeSlice.reducer;
