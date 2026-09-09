import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomNav from "./BottomNav";


const More = () => {
  return (
    <View>
     <View style={styles.btmnav}>
          <BottomNav />
        </View>
    
    </View>
  )
}

export default More

const styles = StyleSheet.create({
  btmnav: {
    position: 'absolute',
    bottom: -10,
    left: 10,
    right: 10
  }
})