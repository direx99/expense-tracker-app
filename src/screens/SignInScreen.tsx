import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import Screen from "../components/layout/Screen";
import { signIn } from "../features/auth/authSlice";
import { useAppDispatch } from "../store/hooks";
import { colors } from "../theme/colors";
import { radius, space } from "../theme/tokens";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "SignIn">;

export default function SignInScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.includes("@") || password.length < 6) {
      setError("Enter a valid email and a password with at least 6 characters.");
      return;
    }
    dispatch(signIn({ displayName: normalizedEmail.split("@")[0], email: normalizedEmail }));
  };

  return (
    <Screen scroll contentStyle={styles.content}>
      <Text style={styles.brand}>FLOW</Text>
      <View style={styles.heading}><Text style={styles.eyebrow}>WELCOME BACK</Text><Text style={styles.title}>Sign in to your tracker.</Text><Text style={styles.description}>Your profile and finance data remain on this device.</Text></View>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput autoCapitalize="none" autoComplete="email" keyboardType="email-address" onChangeText={(value) => { setEmail(value); setError(null); }} placeholder="you@example.com" placeholderTextColor={colors.mutedText} style={styles.input} textContentType="emailAddress" value={email} />
        <Text style={[styles.label, styles.nextLabel]}>Password</Text>
        <TextInput autoComplete="password" onChangeText={(value) => { setPassword(value); setError(null); }} placeholder="At least 6 characters" placeholderTextColor={colors.mutedText} secureTextEntry style={styles.input} textContentType="password" value={password} />
        {error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
        <Pressable accessibilityRole="button" onPress={submit} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><Text style={styles.primaryButtonText}>Sign in</Text></Pressable>
      </View>
      <View style={styles.footer}><Text style={styles.footerText}>New to Flow?</Text><Pressable accessibilityRole="button" onPress={() => navigation.navigate("SignUp")} style={styles.linkButton}><Text style={styles.linkLabel}>Create an account</Text></Pressable></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { minHeight: "100%", paddingBottom: 28, paddingTop: 24 },
  brand: { color: colors.text, fontSize: 16, fontWeight: "900", letterSpacing: 2 },
  heading: { marginTop: 50 },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.2 },
  title: { color: colors.text, fontSize: 32, fontWeight: "800", letterSpacing: -0.9, marginTop: space.sm },
  description: { color: colors.mutedText, fontSize: 16, lineHeight: 23, marginTop: space.sm },
  form: { marginTop: 36 },
  label: { color: colors.text, fontSize: 15, fontWeight: "700", marginBottom: space.sm },
  nextLabel: { marginTop: space.xl },
  input: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, color: colors.text, fontSize: 17, minHeight: 54, paddingHorizontal: space.lg },
  error: { color: colors.expense, fontSize: 14, lineHeight: 20, marginTop: space.sm },
  primaryButton: { alignItems: "center", backgroundColor: colors.accent, borderRadius: radius.pill, justifyContent: "center", marginTop: 30, minHeight: 54 },
  primaryButtonText: { color: colors.background, fontSize: 16, fontWeight: "800" },
  footer: { alignItems: "center", flexDirection: "row", justifyContent: "center", marginTop: "auto", paddingTop: 38 },
  footerText: { color: colors.mutedText, fontSize: 15, marginRight: space.sm },
  linkButton: { minHeight: 44, justifyContent: "center" },
  linkLabel: { color: colors.accent, fontSize: 15, fontWeight: "800" },
  pressed: { opacity: 0.72 },
});
