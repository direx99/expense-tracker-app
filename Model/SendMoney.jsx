import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import bell from "../assets/bell.png";



const CustomNumberPad = () => {

  return (
    <View style={styles.NumPad}>
      <View style={{width:'100%',justifyContent:'flex-start',padding:20,gap:5}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
          <View style={styles.NumBtn}>
          <Text style={styles.NumText}>1</Text>
          </View>
          <View style={styles.NumBtn}>
          <Text style={styles.NumText}>2</Text>
          </View>
          <View style={styles.NumBtn}>
          <Text style={styles.NumText}>3</Text>
          </View>
          
          
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
          <View style={styles.NumBtn}>
          <Text style={styles.NumText}>4</Text>
          </View>
          <View style={styles.NumBtn}>
          <Text style={styles.NumText}>5</Text>
          </View>
          <View style={styles.NumBtn}>
          <Text style={styles.NumText}>6</Text>
          </View>
          
          
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
          <View style={styles.NumBtn}>
          <Text style={styles.NumText}>7</Text>
          </View>
          <View style={styles.NumBtn}>
          <Text style={styles.NumText}>8</Text>
          </View>
          <View style={styles.NumBtn}>
          <Text style={styles.NumText}>9</Text>
          </View>
          
          
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
          <View style={styles.NumBtn}>
          <Text style={styles.NumText}>.</Text>
          </View>
          <View style={styles.NumBtn}>
          <Text style={styles.NumText}>0</Text>
          </View>
          <View style={styles.NumBtn}>
          <Text style={styles.NumText}>3</Text>
          </View>
          
          
        </View>
        <View style={styles.SendBtn}>
          <Text style={styles.SendTxt}>Send</Text>
          </View>

      </View>
    </View>
  )
}


const SendMoney = () => {





  return (
    <View style={styles.SendMoney}>
       <View style={styles.TopBar}>
       <View style={styles.BellContiner}>
          <Image style={styles.BellImg} source={bell} />
        </View>

        <Text style={styles.Analytics}>Send Money</Text>
        <View style={styles.BellContiner}>
          <Image style={styles.BellImg} source={bell} />
        </View>
      </View>
      <CustomNumberPad/>
    </View>
  )
}

export default SendMoney

const styles = StyleSheet.create({
    SendMoney:{
        backgroundColor:'#111111',
       flex:1,
       
      
        
    },
    NumPad:{
      position:'absolute',
      bottom:20,
      width:'100%',
      backgroundColor:'#fff',
      borderRadius:40
      
      
    },
    NumBtn:{
      width:"32%",
      height:60,
      backgroundColor:'#F6F6F6',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:60
    },
    NumText:{
      fontSize:22,
      fontWeight:400
    },
    SendBtn:{
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#F86E36',
      height:50,
      borderRadius:50,
      marginTop:20
    },
    SendTxt:{
      fontSize:16,
      fontWeight:600,
      color:"#fff"
    },
    BellImg: {
      width: 24,
      height: 24,
    },
    BellContiner: {
      width: 40,
      height: 40,
      backgroundColor: "#3C3C3C",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
    },
    leftbtn: {
      width: 40,
      height: 40,
    },
    TopBar: {
      paddingTop: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    Analytics: {
      fontSize: 20,
      color: "#fff",
  
    },
})