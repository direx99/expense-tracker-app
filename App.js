import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from 'react-native'
import React from 'react' 
import HomeScreen from "./HomeScreen";
import About from "./About";
import BottomNav from "./Model/BottomNav";
import Home from "./Model/Home";
import Statistic from "./Model/Statistic";
import More from "./Model/More";
import Wallet from "./Model/Wallet";
import Settings from "./Model/Settings";


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer>
     <Stack.Navigator screenOptions={{ animation: 'none' }}> 
        {/*Define our routes*/}
        <Stack.Screen name="Home" component={Home}  options={{headerShown: false}} />
        <Stack.Screen name="Statistic" component={Statistic}  options={{headerShown: false}}/>
        <Stack.Screen name="More" component={More}  options={{headerShown: false}}/>
        <Stack.Screen name="Wallet" component={Wallet}  options={{headerShown: false}}/>
        <Stack.Screen name="Settings" component={Settings}  options={{headerShown: false}}/>

      </Stack.Navigator>
      <BottomNav/>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#111111',
    padding:10
  }

})