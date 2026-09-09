import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Screen from "../components/layout/Screen";
import { completeOnboarding } from "../features/auth/authSlice";
import { useAppDispatch } from "../store/hooks";
import { colors } from "../theme/colors";
import { radius, space } from "../theme/tokens";

const slides = [
  { eyebrow: "WELCOME", title: "Know where your money goes.", body: "Track each outgoing payment in one quiet, clear place." },
  { eyebrow: "STAY IN CONTROL", title: "Make every transfer visible.", body: "Your activity and spending insights update as you save them." },
  { eyebrow: "PRIVATE BY DEFAULT", title: "Your data stays with you.", body: "This practice app keeps your saved data on this device." },
];

export default function WelcomeScreen() {
  const dispatch = useAppDispatch();
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = slides[slideIndex];
  const isLastSlide = slideIndex === slides.length - 1;

  const advance = () => {
    if (isLastSlide) {
      dispatch(completeOnboarding());
      return;
    }
    setSlideIndex((index) => index + 1);
  };

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.topRow}>
        <Text style={styles.brand}>FLOW</Text>
        {!isLastSlide && <Pressable accessibilityRole="button" onPress={() => dispatch(completeOnboarding())} style={styles.skipButton}><Text style={styles.skipLabel}>Skip</Text></Pressable>}
      </View>
      <View style={styles.hero}>
        <View style={styles.artwork}><View style={styles.artworkCore}><View style={styles.artworkMark} /></View></View>
        <Text style={styles.eyebrow}>{slide.eyebrow}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.body}>{slide.body}</Text>
      </View>
      <View style={styles.footer}>
        <View accessibilityLabel={`Slide ${slideIndex + 1} of ${slides.length}`} style={styles.pagination}>{slides.map((_, index) => <View key={index} style={[styles.dot, index === slideIndex && styles.activeDot]} />)}</View>
        <Pressable accessibilityRole="button" onPress={advance} style={({ pressed }) => [styles.button, pressed && styles.pressed]}><Text style={styles.buttonText}>{isLastSlide ? "Get started" : "Continue"}</Text></Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 30, paddingTop: 16 },
  topRow: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  brand: { color: colors.text, fontSize: 16, fontWeight: "900", letterSpacing: 2 },
  skipButton: { alignItems: "center", justifyContent: "center", minHeight: 44, minWidth: 44 },
  skipLabel: { color: colors.mutedText, fontSize: 15, fontWeight: "700" },
  hero: { justifyContent: "center", marginTop: "auto" },
  artwork: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, height: 176, justifyContent: "center", marginBottom: 38, width: "100%" },
  artworkCore: { alignItems: "center", backgroundColor: "rgba(120, 216, 174, 0.14)", borderRadius: radius.pill, height: 104, justifyContent: "center", width: 104 },
  artworkMark: { backgroundColor: colors.accent, borderRadius: radius.pill, height: 42, width: 42 },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.2 },
  title: { color: colors.text, fontSize: 34, fontWeight: "800", letterSpacing: -1, marginTop: space.sm, maxWidth: 480 },
  body: { color: colors.mutedText, fontSize: 17, lineHeight: 24, marginTop: space.md, maxWidth: 460 },
  footer: { marginTop: "auto", paddingTop: space.xxl },
  pagination: { flexDirection: "row", gap: space.sm, marginBottom: space.lg },
  dot: { backgroundColor: colors.border, borderRadius: radius.pill, height: 8, width: 8 },
  activeDot: { backgroundColor: colors.accent, width: 24 },
  button: { alignItems: "center", backgroundColor: colors.accent, borderRadius: radius.pill, justifyContent: "center", minHeight: 54 },
  buttonText: { color: colors.background, fontSize: 16, fontWeight: "800" },
  pressed: { opacity: 0.72 },
});
