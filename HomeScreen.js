import React from "react";
import { Button, StyleSheet,View, Text } from "react-native";
import BottomNav from "./Model/BottomNav";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.home}>
     
      <Button
        title="Go to About"
        onPress={() => navigation.navigate("About")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  home:{
    flex:1,
    backgroundColor:'#111111',
    justifyContent:'space-between',
    padding:20
    
  },
  navbar:{
    
   
  }

})