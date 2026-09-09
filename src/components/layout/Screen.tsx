import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import { colors } from "../../theme/colors";

type ScreenProps = PropsWithChildren<{
  contentStyle?: StyleProp<ViewStyle>;
  scroll?: boolean;
}>;

export default function Screen({ children, contentStyle, scroll = false }: ScreenProps) {
  const { contentPadding, contentWidth } = useResponsiveLayout();
  const responsiveContent = { maxWidth: contentWidth, paddingHorizontal: contentPadding, width: "100%" } as const;

  if (scroll) {
    return <SafeAreaView edges={["top"]} style={styles.screen}><ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}><View style={[styles.content, responsiveContent, contentStyle]}>{children}</View></ScrollView></SafeAreaView>;
  }

  return <SafeAreaView edges={["top"]} style={styles.screen}><View style={[styles.content, responsiveContent, contentStyle]}>{children}</View></SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1 },
  scrollContent: { alignItems: "center", backgroundColor: colors.background, flexGrow: 1 },
  content: { alignSelf: "center", flex: 1 },
});
