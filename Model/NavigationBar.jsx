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
        position:'absolute',
        bottom:25,
        backgroundColor:'#000',
        left:20,
        right:20,
        height:100,


        
      }
    }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
};

export default NavigationBar;
