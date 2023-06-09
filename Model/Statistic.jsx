import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import bell from "../assets/bell.png";


const DottedBar = (props) => {
  const { bottom} = props;

  return(
   
    <View
      style={{
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'black',
        borderRadius: 1,
        width: '100%',
        position:'absolute',
        opacity:0.2,
        bottom:bottom
      }}
    />
    
  )
}

const GraphCard = () => {
  return (
    <View style={styles.GraphCard}>
      <View style={styles.ToggleBar}>
        <View style={styles.ToggleBtn}>
          <Text>W</Text>
        </View>
        <View style={styles.ToggleBtnActive}>
          <Text style={{ color: "#fff" }}>M</Text>
        </View>
        <View style={styles.ToggleBtn}>
          <Text>Y</Text>
        </View>
      </View>
      <DottedBar bottom={250}/>
      <DottedBar bottom={220}/>
      <DottedBar bottom={190}/>
      <DottedBar bottom={160}/>
      <DottedBar bottom={130}/>
      <DottedBar bottom={100}/>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{ padding: 20 , flexDirection:'row'  ,alignContent:'center'}}>
        <GraphLine  earnLineHeight = {100} spendLineHeight={50} MonthName={'Jan'}/>
        <GraphLine earnLineHeight = {80} spendLineHeight={60} MonthName={'Feb'}/>
        <GraphLine earnLineHeight = {110} spendLineHeight={76} MonthName={'Mar'}/>
        <GraphLine earnLineHeight = {135} spendLineHeight={85} MonthName={'Apr'}/>
        <GraphLine earnLineHeight = {100} spendLineHeight={50} MonthName={'May'}/>
        <GraphLine earnLineHeight = {100} spendLineHeight={50} MonthName={'Jun'}/>
        <GraphLine earnLineHeight = {100} spendLineHeight={50} MonthName={'Jul'}/>
        <GraphLine earnLineHeight = {100} spendLineHeight={50} MonthName={'Aug'}/>
        <GraphLine earnLineHeight = {100} spendLineHeight={50} MonthName={'Sep'}/>
        <GraphLine earnLineHeight = {100} spendLineHeight={50} MonthName={'Oct'}/>
        <GraphLine earnLineHeight = {100} spendLineHeight={50} MonthName={'Nov'}/>
        <GraphLine earnLineHeight = {100} spendLineHeight={50} MonthName={'Dec'}/>

      </View>
      </ScrollView>
<View style={{flexDirection:'row',alignSelf:'center',marginBottom:30,alignItems:'center'}}>
<View style={{
  width:12,
  height:12,
  borderRadius:12,
  backgroundColor:'#FA6F39',
  marginRight:10,

  
}}/>
<Text style={{
    marginRight:20,
    fontSize:12}}>
      Earned</Text>
<View style={{
  width:12,
  height:12,
  borderRadius:12,
  backgroundColor:'#111111',
  marginRight:10,
  
}}/>
<Text style={{
    marginRight:20,
    fontSize:12

}}>Spent</Text>

</View>
     

    </View>
  );
};

const GraphLine = (props) => {
  const { earnLineHeight, spendLineHeight,MonthName } = props;

  return (
    <View style={styles.GraphLine}>
      <View style={[styles.EarnLine, { height: earnLineHeight }]}>
        <View style={[styles.SpendLine, { height: spendLineHeight }]}></View>
       
      </View>
     
      <Text style={styles.MonthName}>{props.MonthName}</Text>
    </View>
  );
};

const Statistic = () => {
  return (
    <View style={styles.Stat}>
      <View style={styles.TopBar}>
        <View style={styles.leftbtn}></View>

        <Text style={styles.Analytics}>Analytics</Text>
        <View style={styles.BellContiner}>
          <Image style={styles.BellImg} source={bell} />
        </View>
      </View>
      <GraphCard />
    </View>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  Stat: {
    flex: 1,
    backgroundColor: "#111111",
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
  GraphCard: {
    width: "100%",
    height: 300,
    backgroundColor: "#fff",
    marginTop: 40,
    borderRadius: 20,
  },
  ToggleBar: {
    width: 130,
    alignSelf: "center",
    height: 50,
    backgroundColor: "#fff",
    marginTop: -20,
    borderRadius: 50,
    borderColor: "#111111",
    borderWidth: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  ToggleBtn: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  ToggleBtnActive: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#FA6E39",
  },
  GraphLine: {
    height: 200,
    justifyContent: "flex-end",
    alignItems:'center',
    marginRight:13,
    paddingBottom:25
      

  },
  EarnLine: {
    backgroundColor: "#FA6F39",
    width: 9,
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems:'center',
    position:'absolute',
    bottom:50
  },
  SpendLine: {
    backgroundColor: "#111111",
    width: 9,
    borderRadius: 10,
  },
  MonthName:{
    fontSize:12,
    color:'#404040',

   
  }
});
