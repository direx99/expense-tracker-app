import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type PreferencesState = {
  currencyCode: CurrencyCode;
};

export type CurrencyCode = "LKR" | "USD" | "EUR" | "GBP";

export const currencyOptions: { code: CurrencyCode; label: string }[] = [
  { code: "LKR", label: "Rs (LKR)" },
  { code: "USD", label: "US Dollar" },
  { code: "EUR", label: "Euro" },
  { code: "GBP", label: "Pound" },
];

const initialState: PreferencesState = {
  currencyCode: "LKR",
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setCurrencyCode(state, action: PayloadAction<CurrencyCode>) {
      state.currencyCode = action.payload;
    },
  },
});

export const { setCurrencyCode } = preferencesSlice.actions;
export default preferencesSlice.reducer;
