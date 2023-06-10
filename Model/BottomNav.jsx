import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import home from '../assets/home.png'
import card from '../assets/card.png'
import settings from '../assets/setting.png'
import more from '../assets/more.png'
import statics from '../assets/statistic.png'
import { useNavigation } from '@react-navigation/native';



const BottomNav = ({hideView}) => {
    const navigation = useNavigation();
    const handleClick = () => {
      hideView();
    };
  const [selectedIcon, setSelectedIcon] = useState('home');

  const handleIconPress = (iconName) => {

    
    

    setSelectedIcon(iconName);
    if (iconName === 'home') {
        setSelectedIcon('home')
        navigation.navigate('Home',  { animation:'none' });
        
      }
      else  if (iconName === 'statics') {
        setSelectedIcon('statics')
        navigation.navigate('Statistic')
        ; 
      }
      else  if (iconName === 'more') {
        setSelectedIcon('more')
        navigation.navigate('More'); 
      } 
      else  if (iconName === 'card') {
        setSelectedIcon('card')
        navigation.navigate('Wallet'); 
      } 
      else  if (iconName === 'settings') {
        setSelectedIcon('settings')
        navigation.navigate('Settings'); 
      }
  };

  const getIconContainerStyle = (iconName) => {
    if (iconName === selectedIcon) {
      return { ...styles.iconContainer, backgroundColor: '#F97234' }; // Change the background color to your desired color
    }
    return styles.iconContainer;
  };

  return (
    <View style={styles.BottomNav}>
      <TouchableOpacity onPress={() => handleIconPress('home')}>
        <View style={getIconContainerStyle('home')}>
          <Image style={styles.navicon} source={home} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleIconPress('statics')}>
        <View style={getIconContainerStyle('statics')}>
          <Image style={styles.navicon} source={statics} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleIconPress('more')}>
        <View style={getIconContainerStyle('more')}>
          <Image style={styles.navicon} source={more} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleIconPress('card')}>
        <View style={getIconContainerStyle('card')}>
          <Image style={styles.navicon} source={card} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleIconPress('settings')}>
        <View style={getIconContainerStyle('settings')}>
          <Image style={styles.navicon} source={settings} />
        </View>
      </TouchableOpacity>
    </View>
  );
};




export default BottomNav

const styles = StyleSheet.create({
    BottomNav:{
        alignSelf:'center',
        width:'100%',
        height:60,
        backgroundColor:'#000',
        borderRadius:70,
        marginBottom:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10

    },
    navicon:{
        height:25,
        width:25,
    },
    iconContainer:{
      
        borderRadius:40,
        height:45,
        width:45,
        justifyContent:'center',
        alignItems:'center'
    }
})