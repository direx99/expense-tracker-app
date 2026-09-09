import { NavigationContainer, useNavigationState } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

import BottomNav from "../components/navigation/BottomNav";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import HomeScreen from "../screens/HomeScreen";
import MoreScreen from "../screens/MoreScreen";
import SendMoneyScreen from "../screens/SendMoneyScreen";
import SettingsScreen from "../screens/SettingsScreen";
import WalletScreen from "../screens/WalletScreen";
import { colors } from "../theme/colors";
import type { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

function BottomNavigation() {
  const routeName = useNavigationState((state) => state.routes[state.index]?.name);

  return routeName === "Send" ? null : (
    <View style={styles.bottomNavigation}>
      <BottomNav />
    </View>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator screenOptions={{ animation: "none" }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Statistic" component={AnalyticsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="More" component={MoreScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Wallet" component={WalletScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Send" component={SendMoneyScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        <BottomNavigation />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  bottomNavigation: { position: "absolute", bottom: -10, left: 10, right: 10 },
});
