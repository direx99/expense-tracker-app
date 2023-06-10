import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  Dimensions
} from "react-native";
import React, { useState } from "react";
import BlueCard from "../assets/cards/blue.png";
import PurpleCard from "../assets/cards/purple.png";
import OrangeCard from "../assets/cards/orange.png";
import master from "../assets/cards/master.png";

const Card = (props) => {
  return (
    <View>
      <View style={styles.Card}>
        <ImageBackground
          style={[styles.cardimg]}
          source={props.Image}
          imageStyle={[styles.cardimg]}
        >
          <View style={{padding:20,justifyContent:'space-between',height:'100%'}}>
            <View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={styles.BalanceTitle}>Current Balance</Text>
            <Text style={styles.BalanceTitle}>12 / 24</Text>

            </View>
            <Text style={styles.Balance}>$7,788.60</Text>

          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end'}}>

          <Text style={styles.BalanceTitle}>4216 7876 6878 7898</Text>
          <Image style={styles.Master} source={master} />

          </View>

          </View>
        </ImageBackground>
      </View>
      
    </View>
  );
};

const AddCard = () => {
  return (
    <View style={styles.AddCardContainer}>
      <View style={styles.AddCard}>
        <Text style={{ color: "#757575", fontWeight: 500 }}>Add Card</Text>
      </View>
    </View>
  );
};

const TopBtn = ({ selectedType, setSelectedType }) => {
  const handleCardTypePress = (type) => {
    setSelectedType(type);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.CardType,
            selectedType === "All Cards" && { backgroundColor: "#FA6E39" },
          ]}
          onPress={() => handleCardTypePress("All Cards")}
        >
          <Text
            style={[
              styles.TypeText,
              selectedType === "All Cards" && { color: "#fff" },
            ]}
          >
            All Cards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.CardType,
            selectedType === "Debit" && { backgroundColor: "#FA6E39" },
          ]}
          onPress={() => handleCardTypePress("Debit")}
        >
          <Text
            style={[
              styles.TypeText,
              selectedType === "Debit" && { color: "#fff" },
            ]}
          >
            Debit Cards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.CardType,
            selectedType === "Credit" && { backgroundColor: "#FA6E39" },
          ]}
          onPress={() => handleCardTypePress("Credit")}
        >
          <Text
            style={[
              styles.TypeText,
              selectedType === "Credit" && { color: "#fff" },
            ]}
          >
            Credit Cards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.CardType,
            selectedType === "Virtual" && { backgroundColor: "#FA6E39" },
          ]}
          onPress={() => handleCardTypePress("Virtual")}
        >
          <Text
            style={[
              styles.TypeText,
              selectedType === "Virtual" && { color: "#fff" },
            ]}
          >
            Virtual Cards
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const Wallet = () => {
  const [selectedType, setSelectedType] = useState("All Cards");
  const { width, height } = Dimensions.get('window');
  const cssWidth = `${width}px`;
  const cssHeight = height-100;
  return (
    <View style={{
      flex: 1,
      backgroundColor: "#111111",
      width: "100%",
      height: "100%",
    }} >

    <View style={[styles.Wallet,{  maxHeight: cssHeight }]}>
      <TopBtn selectedType={selectedType} setSelectedType={setSelectedType} />
      <View>
        <ScrollView
          style={{ marginTop: 20, borderRadius: 20 ,borderBottomLeftRadius:40,borderBottomRightRadius:40, height: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <AddCard />

          <Card Image={PurpleCard} />
          <Card Image={OrangeCard} />
          <Card Image={BlueCard} />
          <Card Image={PurpleCard} />
          <Card Image={OrangeCard} />
          <Card Image={BlueCard} />
          <Card Image={PurpleCard} />


        </ScrollView>
      </View>
    </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  Wallet: {
    flex: 1,
    backgroundColor: "#111111",
    width: "100%",
    height: "100%",
    paddingTop: 50,
  },
  CardType: {
    backgroundColor: "#212325",
    width: 140,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  TypeText: {
    fontWeight: 600,
    color: "#656D72",
  },
  AddCard: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    marginVertical: 20,
    borderColor: "#646D73",
    borderStyle: "dashed",
    borderRadius: 10,
  },
  Card: {
    alignItems: "center",
    marginTop: 30,
    justifyContent: "center",
  },
  cardimg: {
    width: "100%",
    height: 180,
    borderRadius: 20,

  },
  AddCardContainer: {
    paddingHorizontal: 2,

  },
  BalanceTitle:{
    color:'#D6D6D6',
    fontWeight:600,
    fontSize:15
  },
  Balance:{
    color:'#D6D6D6',
    fontWeight:700,
    fontSize:30,
    marginTop:3
  },
  Master:{
    height:60,
    width:60,
    marginBottom:-10
  },
  btmnav: {
    position: 'absolute',
    bottom: -10,
    left: 10,
    right: 10
  }
});
