import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import userimg from "../assets/user.jpg";
import bell from "../assets/bell.png";
import send from "../assets/send.png";
import rec from "../assets/rec.png";
import menuicon from "../assets/menu.png";



const Home = () => {
  const [balance, setBalance] = useState(0);
  const [balanceFloat, setBalanceFloat] = useState("70");
  const [balanceNoFloat, setBalancebalanceNoFloat] = useState("5672");

  const TopBtn = (props)=> {
    return (
      <View style={styles.TopBtn}>
        <View style={styles.IconRound}>
        <Image style={styles.SendImg} source={props.imageSource} />

        </View>
        <Text style={styles.SendTitle}>{props.name}</Text>
      </View>
    );
  };
  const Sender = (props)=> {
    return (
      <View style={{alignItems:'center',gap:5}}>
        <Image style={styles.SenderImg} source={userimg} />
        <Text style={styles.SenderName}>{props.senderName}</Text>
      </View>
    );
  };

  return (
    <View style={styles.home}>
      <View style={styles.TopBar}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={styles.UserImg} source={userimg} />
          <View>
            <Text style={styles.GreetMsg}>Good Morning</Text>
            <Text style={styles.UserName}>Dinith Perera</Text>
          </View>
        </View>
        <View style={styles.BellContiner}>
          <Image style={styles.BellImg} source={bell} />
        </View>
      </View>
      <View style={styles.BalanceView}>
        <Text style={styles.BalanceTitle}>Your Balance</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.Balance}>${balanceNoFloat}.</Text>
          <Text style={[styles.Balance, { color: "#6E6E6E" }]}>
            {balanceFloat}
          </Text>
        </View>
      </View>
      <View style = {{flexDirection:'row', gap:10}}>
      <TopBtn name={"Send"} imageSource={send}/>
      <TopBtn name={"Recieve"} imageSource={rec}/>
      <View style={styles.MenuContainer}>
      <Image style={styles.SendImg} source={menuicon} />

      </View>
      </View>
      <View style={styles.QuickSend}>
        <Text style={styles.QuickSendTitle}> 
            Quick Send
        </Text>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Sender senderName ="Dinith"/>
        <Sender senderName ="Salman"/>
        <Sender senderName ="Amashi"/>
        <Sender senderName ="Imesh"/>
        <Sender senderName ="Ahnaf"/>

       
        
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.transcontainer}       scrollEnabled={false}>
      <View style={styles.content}>
      <View style={styles.RecentTransaction}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end'}}>
      <Text style={styles.RecentTransactionTitle} >
        Recent Transactions
      </Text>
      <Text style={styles.SeeAll} >
        See all
      </Text>
      </View>
      </View>

<View >
      
      </View>
      </View>
    </ScrollView>   



    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: "#111111",
    width: "100%",
    height: "100%",
    paddingTop: 50,

  },
  TopBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  UserImg: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
  },
  GreetMsg: {
    color: "#767675",
    fontSize: 12,
  },
  UserName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 500,
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
  BalanceView: {
    marginVertical: 20,
    marginTop:40,
  },
  BalanceTitle: {
    color: "#767675",
    fontSize: 16,
    marginBottom: 5,
  },
  Balance: {
    color: "#fff",
    fontSize: 46,
    fontWeight: 500,
  },
  TopBtn: {
    Width:110,
    height: 40,
    backgroundColor: "#F26F2F",
    borderRadius: 30,
    alignItems:'center',
    paddingHorizontal:4,
    flexDirection:'row',
    
  },
  IconRound:{
    backgroundColor:'#EC8B6A',
    width: 32,
    height: 32,
    borderRadius: 30,
    justifyContent:'center',
    alignItems:'center'

  },
    SendImg:{
        width: 20,
    height: 20,
    },
    SendTitle:{
        color:'#fff',
        fontSize:16,
        fontWeight:600,
       marginHorizontal:20

    },
    MenuContainer:{
        width: 39,
    height: 39,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#5D5D5D',
    borderRadius:30,
    borderWidth:1,
    borderColor:'#fff'
    },
    QuickSend:{
        width:'100%',
        height:160,
        backgroundColor:'#292929',
        borderTopStartRadius:20,
        borderTopEndRadius:20,
        marginTop:20,
        paddingTop:20,
        paddingHorizontal:15,
        marginBottom:-20

    },
    QuickSendTitle:{
        fontSize:15,
        fontWeight:500,
        color:'#fff',
        opacity:0.8,
        marginBottom:15
    },
    SenderImg:{
        width:45,
        height:45,
        borderRadius:40
    },
    SenderName:{
        fontSize:12,
        fontWeight:500,
        color:'#fff',
        opacity:0.8,
        marginBottom:15
    },
    RecentTransaction:{
        width:'100%',
        height:'100%',
        justifyContent:'flex-start'
    },


    transcontainer: {
        flexGrow: 1,
        borderTopStartRadius:20,
        borderTopEndRadius:20,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        justifyContent: 'flex-start',
      },
      content: {
        flexDirection: 'column',
        paddingTop: 20,
        paddingHorizontal: 15,
      },
      RecentTransactionTitle:{
        fontSize:15,
        fontWeight:600,
        color:'#707070'
      },
      SeeAll:{
        fontSize:13,
        color:'#707070'
      }
    });