import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import more from "../assets/Navigation/more.png";
import back from "../assets/Navigation/back.png";
import next from "../assets/Navigation/next.png";
import del from "../assets/Navigation/del.png";
import user from "../assets/avatar/a1.png";




const SendDetails = ({number}) =>{
  const { width, height } = Dimensions.get('window');
  const cssWidth = `${width}px`;
  const cssHeight = height-200;
  return(
    <View style={[styles.SendDetails,{height:cssHeight }]}>
      <View style={styles.SenderCard}>
        <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
        <Image style={styles.UserImage} source={user}/>
<View>
  <Text style={styles.SenderName}>Salman Rizwan</Text>
  <Text style={styles.SenderId}>8978 89** ****</Text>

</View>
        </View>
     
        <Image style={styles.NextBtn} source={next}/>
      </View>
<View style={{flexDirection:'row',justifyContent:'center'}}>
<Text  style={styles.AmountInput}>$</Text>
                  
                  <TextInput value={number} style={styles.AmountInput} />
</View>
                 

    </View>
  )
}

const CustomNumberPad = ({handleNumberPress,handleDeletePress}) => { 

  

  return (
    <View style={styles.NumPad}>
      <View
        style={{
          width: "100%",
          justifyContent: "flex-start",
          padding: 20,
          gap: 5,
        }}
      >
        
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={styles.NumBtn}
            onPress={() => handleNumberPress(1)}
          >
            <Text style={styles.NumText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NumBtn}
            onPress={() => handleNumberPress(2)}
          >
            <Text style={styles.NumText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NumBtn}
            onPress={() => handleNumberPress(3)}
          >
            <Text style={styles.NumText}>3</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={styles.NumBtn}
            onPress={() => handleNumberPress(4)}
          >
            <Text style={styles.NumText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NumBtn}
            onPress={() => handleNumberPress(5)}
          >
            <Text style={styles.NumText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NumBtn}
            onPress={() => handleNumberPress(6)}
          >
            <Text style={styles.NumText}>6</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={styles.NumBtn}
            onPress={() => handleNumberPress(7)}
          >
            <Text style={styles.NumText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NumBtn}
            onPress={() => handleNumberPress(8)}
          >
            <Text style={styles.NumText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NumBtn}
            onPress={() => handleNumberPress(9)}
          >
            <Text style={styles.NumText}>9</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={styles.NumBtn}
            onPress={() => handleNumberPress('.')}
          >
            <Text style={styles.NumText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NumBtn}
            onPress={() => handleNumberPress(0)}
          >
            <Text style={styles.NumText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NumBtn}
            onPress={() => handleDeletePress()}
          >
            <Image source={del} style={{width:18,height:18}}/>
          </TouchableOpacity>
        </View>
        
        
        <View style={styles.SendBtn}>
          <Text style={styles.SendTxt}>Send</Text>
        </View>
      </View>
    </View>
  );
};

const SendMoney = ({ navigation }) => {
  const [number, setNumber] = useState("10.00");

  const handleNumberPress = (digit) => {
    setNumber(number + digit);
  };

  const handleDeletePress = () => {
    setNumber(number.slice(0, -1));
  };

  return (
    <View style={styles.SendMoney}>
      <View style={styles.TopBar}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <View style={styles.BellContiner}>
            <Image style={styles.BellImg} source={back} />
          </View>
        </TouchableOpacity>

        <Text style={styles.Analytics}>Send Money</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <View style={styles.BellContiner}>
            <Image style={styles.BellImg} source={more} />
          </View>
        </TouchableOpacity>
      </View>
      <View>

      <SendDetails number={number} style={styles.SendDetailContainer}/>
        </View>
      <CustomNumberPad handleDeletePress={handleDeletePress} handleNumberPress={handleNumberPress} setNumber={setNumber}/>
    </View>
  );
};

export default SendMoney;

const styles = StyleSheet.create({
  SendMoney: {
    backgroundColor: "#111111",
    flex: 1,
  },
  NumPad: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 40,
  },
  NumBtn: {
    width: "32%",
    height: 50,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },
  NumText: {
    fontSize: 22,
    fontWeight: 400,
  },
  SendBtn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F86E36",
    height: 50,
    borderRadius: 50,
    marginTop: 10,
  },
  SendTxt: {
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
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
  SendDetails:{
    width:"100%",
    backgroundColor:'#2B2B2B',
    borderRadius:20,
    marginTop:30,
    marginBottom:-100,
    alignItems:'center',
    paddingTop:10,
    paddingHorizontal:10

  },
  AmountInput:{
    fontSize:50,
    fontWeight:600,
    color:'#fff',
  },
  SenderCard:{
    width:'100%',
    backgroundColor:'#4A4949',
    borderRadius:15,
    marginBottom:80,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,

  },
  NextBtn:{
    width:30,
    height:30
  },
  UserImage:{
    width:50,
    height:50,
    borderRadius:40
  },
  SenderName:{
    fontSize:18,
    fontWeight:500,
    color:'#F2F4F2'
  },
  SenderId:{
    fontSize:13,
    color:'#757575',
    marginTop:2
  }
});
