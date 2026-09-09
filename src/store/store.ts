import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import preferencesReducer from "../features/preferences/preferencesSlice";
import financeReducer from "../features/finance/financeSlice";

const rootReducer = combineReducers({
  finance: financeReducer,
  preferences: preferencesReducer,
});

const persistedReducer = persistReducer(
  {
    key: "expense-tracker",
    storage: AsyncStorage,
    whitelist: ["finance", "preferences"],
  },
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
