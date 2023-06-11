import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import bell from "../assets/bell.png";
import apple from "../assets/apple.png";
import pizza from "../assets/pizzaa.png";
import keells from "../assets/keells.png";
import more from "../assets/Navigation/more.png";


const BottomBar = (props) => {
  return (
    <View style={styles.BottomBar}>
      <View style={styles.BottomBarSecondery}></View>
    </View>
  );
};

const BillsDue = (props) => {
  return (
    <View style={styles.BillsDue}>
            <ScrollView showsVerticalScrollIndicator={false}>

      <View
        style={{
          paddingHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,

        }}
      >
        <Text style={styles.BillsDueTitle}>Bills due</Text>
        <View style={styles.AddBill}>
          <Text style={styles.AddBillTitle}>+ Add a Bill</Text>
        </View>
      </View>

        <View
          style={{
            paddingHorizontal: 10,
            gap: 10,
          }}
        >
          <Bill BillImage={keells} PayerName={'Keells'} PayerType={'Shoping'}/>
          <Bill BillImage={pizza} PayerName={'Pizza Hut'} PayerType={'Food'}/>
          <Bill BillImage={apple} PayerName={'Apple'} PayerType={'Shopping'}/>
          <Bill BillImage={keells} PayerName={'Keells'} PayerType={'Shoping'}/>
          <Bill BillImage={pizza} PayerName={'Pizza'} PayerType={'Food'}/>
          <Bill BillImage={apple} PayerName={'Apple'} PayerType={'Shopping'}/>
          <Bill BillImage={keells} PayerName={'Keells'} PayerType={'Shoping'}/>
          <Bill BillImage={pizza} PayerName={'Pizza'} PayerType={'Food'}/>
          <Bill BillImage={apple} PayerName={'Apple'} PayerType={'Shopping'}/><Bill BillImage={keells} PayerName={'Keells'} PayerType={'Shoping'}/>
          <Bill BillImage={pizza} PayerName={'Pizza'} PayerType={'Food'}/>
          <Bill BillImage={apple} PayerName={'Apple'} PayerType={'Shopping'}/>

        </View>
      </ScrollView>
    </View>
  );
};
const Bill = (props) => {
  return (
    <View style={styles.Bill}>
      <View style={{ flexDirection: "row", alignItems: "center",justifyContent:'space-between'}}>
      <View style={{flexDirection:'row', gap: 10 ,}}>

        <Image style={[styles.apple,{borderRadius:10}]} source={props.BillImage}></Image>
        <View style={{ gap: 2 }}>
          <Text style={styles.PayerName}>{props.PayerName}</Text>
          <Text style={styles.PayerType}>{props.PayerType}</Text>
        </View>
        </View>
        <View style={{flexDirection:'row',alignItems:'flex-end'}}>
        <Text style={[styles.PaymentVal,{color:'#FA6E39'}]}>$</Text>
        <Text style={styles.PaymentVal}>120.</Text>
        <Text style={[styles.PaymentVal,{color:'#757574',fontSize:16}]}>00</Text>

        </View>

      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <View>
          <Text style={styles.SubVal}>Date</Text>
          <Text style={styles.SubTitle}>13/07/23</Text>
        </View>
        <View>
          <Text style={styles.SubVal}>Subcategory</Text>
          <Text style={styles.SubTitle}>Tech</Text>
        </View>
        <View>
          <Text style={styles.SubVal}>Bank</Text>
          <Text style={styles.SubTitle}>Com Bank</Text>
        </View>
      </View>
    </View>
  );
};

const DottedBar = (props) => {
  const { bottom } = props;

  return (
    <View
      style={{
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "black",
        borderRadius: 1,
        width: "100%",
        position: "absolute",
        opacity: 0.2,
        bottom: bottom,
      }}
    />
  );
};

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
      <DottedBar bottom={250} />
      <DottedBar bottom={220} />
      <DottedBar bottom={190} />
      <DottedBar bottom={160} />
      <DottedBar bottom={130} />
      <DottedBar bottom={100} />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{ padding: 20, flexDirection: "row", alignContent: "center" }}
        >
          <GraphLine
            earnLineHeight={100}
            spendLineHeight={50}
            MonthName={"Jan"}
          />
          <GraphLine
            earnLineHeight={80}
            spendLineHeight={60}
            MonthName={"Feb"}
          />
          <GraphLine
            earnLineHeight={110}
            spendLineHeight={76}
            MonthName={"Mar"}
          />
          <GraphLine
            earnLineHeight={135}
            spendLineHeight={85}
            MonthName={"Apr"}
          />
          <GraphLine
            earnLineHeight={55}
            spendLineHeight={34}
            MonthName={"May"}
          />
          <GraphLine
            earnLineHeight={90}
            spendLineHeight={76}
            MonthName={"Jun"}
          />
          <GraphLine
            earnLineHeight={130}
            spendLineHeight={80}
            MonthName={"Jul"}
          />
          <GraphLine
            earnLineHeight={120}
            spendLineHeight={67}
            MonthName={"Aug"}
          />
          <GraphLine
            earnLineHeight={100}
            spendLineHeight={50}
            MonthName={"Sep"}
          />
          <GraphLine
            earnLineHeight={140}
            spendLineHeight={90}
            MonthName={"Oct"}
          />
          <GraphLine
            earnLineHeight={100}
            spendLineHeight={50}
            MonthName={"Nov"}
          />
          <GraphLine
            earnLineHeight={100}
            spendLineHeight={50}
            MonthName={"Dec"}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginBottom: 30,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 12,
            backgroundColor: "#FA6F39",
            marginRight: 10,
          }}
        />
        <Text
          style={{
            marginRight: 20,
            fontSize: 12,
          }}
        >
          Earned
        </Text>
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 12,
            backgroundColor: "#111111",
            marginRight: 10,
          }}
        />
        <Text
          style={{
            marginRight: 20,
            fontSize: 12,
          }}
        >
          Spent
        </Text>
      </View>
    </View>
  );
};

const GraphLine = (props) => {
  const { earnLineHeight, spendLineHeight, MonthName } = props;

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
          <Image style={styles.BellImg} source={more} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:10,borderRadius:20,marginBottom:-100}}>
      <GraphCard />
      <BillsDue />
      </ScrollView>
      <BottomBar />
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
    paddingTop: 50,
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
    alignItems: "center",
    marginRight: 13,
    paddingBottom: 25,
  },
  EarnLine: {
    backgroundColor: "#FA6F39",
    width: 9,
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
  },
  SpendLine: {
    backgroundColor: "#111111",
    width: 9,
    borderRadius: 10,
  },
  MonthName: {
    fontSize: 12,
    color: "#404040",
  },
  BillsDue: {
    flexGrow: 1,
    height:'100%',
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "flex-start",
    marginTop: 20,

    paddingTop: 20,
  },
  Bill: {
    backgroundColor: "#F6F6F6",
    boxShadow: 10,
    width: "100%",
    borderRadius: 15,
    padding: 15,
    gap: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  BillsDueTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#757574",
  },
  AddBill: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    flexDirection: "row",
  },
  AddBillTitle: {
    fontSize: 12,
  },
  apple: {
    width: 40,
    height: 40,
  },
  BottomBar: {
    width: "100%",
    height: 60,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#111111",
  },
  BottomBarSecondery: {
    width: "100%",
    height: 80,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#ffff",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  PayerName: {
    fontSize: 17,
    fontWeight: 600,
    color: "#111111",
  },
  PayerType: {
    fontSize: 12,
    color: "#757574",
  },
  SubVal: {
    fontSize: 11,
    color: "#757574",
  },
  SubTitle: {
    fontSize: 14,
    fontWeight: 500,
  },

  PaymentVal:{
    fontSize: 20,
    fontWeight: 600,
    color: "#111111",
  },
  
});
