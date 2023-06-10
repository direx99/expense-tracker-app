import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const SendMoney = () => {
    const [currentScreenName, setCurrentScreenName] = useState('Send');

  return (
    <View style={styles.SendMoney}>
      <Text>SendMoney</Text>
    </View>
  )
}

export default SendMoney

const styles = StyleSheet.create({
    SendMoney:{
        backgroundColor:'#757575',
        height:1000,
        position:'absolute',
        
    }
})