import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type PreferencesState = {
  currencyCode: string;
};

const initialState: PreferencesState = {
  currencyCode: "USD",
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setCurrencyCode(state, action: PayloadAction<string>) {
      state.currencyCode = action.payload;
    },
  },
});

export const { setCurrencyCode } = preferencesSlice.actions;
export default preferencesSlice.reducer;
