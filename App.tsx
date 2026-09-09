import { NavigationContainer, useNavigationState } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { StyleSheet, View } from "react-native";

import BottomNav from "./Model/BottomNav";
import Home from "./Model/Home";
import More from "./Model/More";
import SendMoney from "./Model/SendMoney";
import Settings from "./Model/Settings";
import Statistic from "./Model/Statistic";
import Wallet from "./Model/Wallet";
import { persistor, store } from "./store/store";
import type { RootStackParamList } from "./types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

function ScreenNameTracker() {
  const currentScreenName = useNavigationState(
    (state) => state.routes[state.index]?.name,
  );

  if (currentScreenName === "Send") {
    return null;
  }

  return (
    <View style={styles.btmnav}>
      <BottomNav />
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <StatusBar style="light" />
          <NavigationContainer>
            <View style={styles.navigationContainer}>
              <Stack.Navigator screenOptions={{ animation: "none" }}>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Statistic" component={Statistic} options={{ headerShown: false }} />
                <Stack.Screen name="More" component={More} options={{ headerShown: false }} />
                <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
                <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
                <Stack.Screen name="Send" component={SendMoney} options={{ headerShown: false }} />
              </Stack.Navigator>
              <ScreenNameTracker />
            </View>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111111", padding: 20 },
  navigationContainer: { flex: 1 },
  btmnav: { position: "absolute", bottom: -10, left: 10, right: 10 },
});
