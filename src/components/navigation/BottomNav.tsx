import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import card from "../../../assets/card.png";
import home from "../../../assets/home.png";
import more from "../../../assets/more.png";
import settings from "../../../assets/setting.png";
import statistic from "../../../assets/statistic.png";
import type { RootStackParamList } from "../../types/navigation";

type IconName = "home" | "statistic" | "more" | "card" | "settings";
type Navigation = NativeStackNavigationProp<RootStackParamList>;

const destinations: Record<IconName, keyof RootStackParamList> = {
  home: "Home", statistic: "Statistic", more: "More", card: "Wallet", settings: "Settings",
};

const icons: Record<IconName, number> = { home, statistic, more, card, settings };

export default function BottomNav() {
  const navigation = useNavigation<Navigation>();
  const [selectedIcon, setSelectedIcon] = useState<IconName>("home");

  const handleIconPress = (iconName: IconName) => {
    setSelectedIcon(iconName);
    navigation.navigate(destinations[iconName]);
  };

  return (
    <View style={styles.container}>
      {(Object.keys(destinations) as IconName[]).map((iconName) => (
        <TouchableOpacity key={iconName} onPress={() => handleIconPress(iconName)}>
          <View style={[styles.iconContainer, selectedIcon === iconName && styles.selectedIcon]}>
            <Image style={styles.icon} source={icons[iconName]} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignSelf: "center", width: "100%", height: 60, backgroundColor: "#000", borderRadius: 70, marginBottom: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 },
  icon: { height: 25, width: 25 },
  iconContainer: { borderRadius: 40, height: 45, width: 45, justifyContent: "center", alignItems: "center" },
  selectedIcon: { backgroundColor: "#F97234" },
});
