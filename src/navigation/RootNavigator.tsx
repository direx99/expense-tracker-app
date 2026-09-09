import { createNavigationContainerRef, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import BottomNav from "../components/navigation/BottomNav";
import { useAppSelector } from "../store/hooks";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import HomeScreen from "../screens/HomeScreen";
import MoreScreen from "../screens/MoreScreen";
import SendMoneyScreen from "../screens/SendMoneyScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WalletScreen from "../screens/WalletScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { colors } from "../theme/colors";
import type { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigationRef = createNavigationContainerRef<RootStackParamList>();

function BottomNavigation({ activeRoute }: { activeRoute: keyof RootStackParamList }) {
  return activeRoute === "Send" ? null : <View style={styles.bottomNavigation}><BottomNav activeRoute={activeRoute} navigation={navigationRef} /></View>;
}

function AppNavigator({ activeRoute }: { activeRoute: keyof RootStackParamList }) {
  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={{ animation: "fade", headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Statistic" component={AnalyticsScreen} />
        <Stack.Screen name="More" component={MoreScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Send" component={SendMoneyScreen} />
      </Stack.Navigator>
      <BottomNavigation activeRoute={activeRoute} />
    </View>
  );
}

export default function RootNavigator() {
  const hasCompletedOnboarding = useAppSelector((state) => state.auth.hasCompletedOnboarding);
  const user = useAppSelector((state) => state.auth.user);
  const [activeRoute, setActiveRoute] = useState<keyof RootStackParamList>("Home");
  const syncActiveRoute = () => {
    const routeName = navigationRef.getCurrentRoute()?.name;
    if (routeName) {
      setActiveRoute(routeName);
    }
  };

  return (
    <NavigationContainer onReady={syncActiveRoute} onStateChange={syncActiveRoute} ref={navigationRef}>
      {!hasCompletedOnboarding ? <Stack.Navigator screenOptions={{ headerShown: false }}><Stack.Screen name="Welcome" component={WelcomeScreen} /></Stack.Navigator> : !user ? <Stack.Navigator screenOptions={{ animation: "fade", headerShown: false }}><Stack.Screen name="SignIn" component={SignInScreen} /><Stack.Screen name="SignUp" component={SignUpScreen} /></Stack.Navigator> : <AppNavigator activeRoute={activeRoute} />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1 },
  bottomNavigation: { bottom: 0, left: 0, position: "absolute", right: 0 },
});
