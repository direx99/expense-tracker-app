import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import RootNavigator from "./src/navigation/RootNavigator";
import { persistor, store } from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar style="light" />
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}
