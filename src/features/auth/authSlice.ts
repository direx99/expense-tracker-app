import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserProfile = {
  displayName: string;
  email: string;
};

type AuthState = {
  hasCompletedOnboarding: boolean;
  user: UserProfile | null;
};

const initialState: AuthState = {
  hasCompletedOnboarding: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    completeOnboarding(state) {
      state.hasCompletedOnboarding = true;
    },
    signIn(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
    },
    signOut(state) {
      state.user = null;
    },
  },
});

export const { completeOnboarding, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
