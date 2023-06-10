import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen';
import About from '../About';


const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      style:{
        backgroundColor:'#000',
        position:ab
        
      }
    }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
};

export default NavigationBar;
