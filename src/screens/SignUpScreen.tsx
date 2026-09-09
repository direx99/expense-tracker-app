import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import Screen from "../components/layout/Screen";
import { signIn } from "../features/auth/authSlice";
import { useAppDispatch } from "../store/hooks";
import { colors } from "../theme/colors";
import { radius, space } from "../theme/tokens";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

export default function SignUpScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const normalizedName = displayName.trim();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedName || !normalizedEmail.includes("@") || password.length < 6) {
      setError("Add your name, a valid email, and a password with at least 6 characters.");
      return;
    }
    dispatch(signIn({ displayName: normalizedName, email: normalizedEmail }));
  };

  return (
    <Screen scroll contentStyle={styles.content}>
      <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.backButton}><Text style={styles.backLabel}>‹  Back</Text></Pressable>
      <Text style={styles.eyebrow}>CREATE ACCOUNT</Text><Text style={styles.title}>Start with your profile.</Text><Text style={styles.description}>Passwords are never stored by this offline practice app.</Text>
      <View style={styles.form}>
        <Field label="Name" onChangeText={setDisplayName} placeholder="Your name" value={displayName} />
        <Field autoCapitalize="none" keyboardType="email-address" label="Email" onChangeText={setEmail} placeholder="you@example.com" value={email} />
        <Field label="Password" onChangeText={setPassword} placeholder="At least 6 characters" secureTextEntry value={password} />
        {error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
        <Pressable accessibilityRole="button" onPress={submit} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><Text style={styles.primaryButtonText}>Create account</Text></Pressable>
      </View>
    </Screen>
  );
}

function Field({ label, ...props }: { label: string } & ComponentProps<typeof TextInput>) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput placeholderTextColor={colors.mutedText} style={styles.input} {...props} /></View>;
}

const styles = StyleSheet.create({
  content: { paddingBottom: 34, paddingTop: 16 },
  backButton: { alignSelf: "flex-start", justifyContent: "center", minHeight: 44 },
  backLabel: { color: colors.accent, fontSize: 16, fontWeight: "700" },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.2, marginTop: 30 },
  title: { color: colors.text, fontSize: 32, fontWeight: "800", letterSpacing: -0.9, marginTop: space.sm },
  description: { color: colors.mutedText, fontSize: 16, lineHeight: 23, marginTop: space.sm },
  form: { marginTop: 30 },
  field: { marginTop: space.lg },
  label: { color: colors.text, fontSize: 15, fontWeight: "700", marginBottom: space.sm },
  input: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, color: colors.text, fontSize: 17, minHeight: 54, paddingHorizontal: space.lg },
  error: { color: colors.expense, fontSize: 14, lineHeight: 20, marginTop: space.md },
  primaryButton: { alignItems: "center", backgroundColor: colors.accent, borderRadius: radius.pill, justifyContent: "center", marginTop: 30, minHeight: 54 },
  primaryButtonText: { color: colors.background, fontSize: 16, fontWeight: "800" },
  pressed: { opacity: 0.72 },
});
