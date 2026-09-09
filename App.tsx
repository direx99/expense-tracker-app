import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "./src/navigation/RootNavigator";
import { persistor, store } from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar style="light" />
          <RootNavigator />
        </PersistGate>
      </SafeAreaProvider>
    </Provider>
  );
}
