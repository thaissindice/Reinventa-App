import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

const { height, width } = Dimensions.get("window");

const SITE_URL = "https://reinventa-final.vercel.app";

const PALE_BG = "#F8FAFB";
const INPUT_BG = "#FEF9E6"; // amarelado claro como na referência
const CARD_BG = "#FFFFFF";
const PRIMARY = "#5C46E6"; // roxo do botão (ajuste se quiser)

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
  if (!email || !password) {
    Alert.alert("Preencha os campos");
    return;
  }

  setLoading(true);
  try {
    // Tenta login REAL via backend
    const res = await fetch(`${SITE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const json = await res.json();
      const user = json?.user ?? null;
      const token = json?.token ?? null;

      if (!user) {
        Alert.alert("Resposta inválida do servidor.");
        return;
      }

            const role = (user?.role ?? "").toString().toLowerCase();
      const rolePath = role.includes("mentor")
        ? "/mentor"
        : role.includes("candidate") || role.includes("aprendiz")
        ? "/aprendiz"
        : "/";

      const encodedUser = encodeURIComponent(JSON.stringify(user));
      const encodedToken = token ? encodeURIComponent(token) : "";

      const autoUrl = `${SITE_URL}/autologin?user=${encodedUser}&token=${encodedToken}&redirect=${encodeURIComponent(
        rolePath
      )}`;


      await WebBrowser.openBrowserAsync(autoUrl);
      return;
    }

    // Se resposta 401 → usar fallback do site (credenciais de demonstração)
    if (res.status === 401) {
      // LOGIN DEMO — igual a página do site
      if (email === "mentor" && password === "123456") {
        const user = { email: "mentor", name: "Mentor Demo", role: "mentor" };
        const autoUrl = `${SITE_URL}/autologin?user=${encodeURIComponent(
          JSON.stringify(user)
        )}&redirect=/mentor`;

        await WebBrowser.openBrowserAsync(autoUrl);
        return;
      }

      if (email === "aprendiz" && password === "123456") {
        const user = { email: "aprendiz", name: "Aprendiz Demo", role: "candidate" };
        const autoUrl = `${SITE_URL}/autologin?user=${encodeURIComponent(
          JSON.stringify(user)
        )}&redirect=/aprendiz`;

        await WebBrowser.openBrowserAsync(autoUrl);
        return;
      }

      Alert.alert("Credenciais inválidas");
      return;
    }

    Alert.alert("Erro no login");
  } catch (err) {
    console.error("Erro no login:", err);
    Alert.alert("Erro ao autenticar. Tente novamente.");
  } finally {
    setLoading(false);
  }
}

  // demo credentials exibidas no topo (estático — pode remover se não quiser)
  const demoMentor = { user: "mentor", pass: "123456" };
  const demoAprendiz = { user: "aprendiz", pass: "123456" };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding" })} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
          <View style={styles.wrapper}>
            {/* BOX de demonstração */}
            <View style={styles.demoBox}>
              <Text style={styles.demoTitle}>Acesso de demonstração:</Text>
              <Text style={styles.demoLine}>
                <Text style={styles.demoLabel}>Mentor: </Text>
                usuário: {demoMentor.user} | senha: {demoMentor.pass}
              </Text>
              <Text style={styles.demoLine}>
                <Text style={styles.demoLabel}>Aprendiz: </Text>
                usuário: {demoAprendiz.user} | senha: {demoAprendiz.pass}
              </Text>
            </View>

            {/* Card principal */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Entrar no Reinventa+</Text>
              <Text style={styles.cardSubtitle}>
                Acesse sua conta para gerenciar vagas, candidaturas e mentorias.
              </Text>

              <View style={{ height: 18 }} />

              <View style={styles.inputWrap}>
                <TextInput
                  placeholder="E-mail ou usuário"
                  placeholderTextColor="#9AA3B2"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={[styles.inputWrap, { marginTop: 12 }]}>
                <TextInput
                  placeholder="Senha"
                  placeholderTextColor="#9AA3B2"
                  style={[styles.input, { paddingRight: 80 }]}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable
                  style={styles.showButton}
                  onPress={() => setShowPassword((s) => !s)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.showText}>{showPassword ? "Ocultar" : "Mostrar"}</Text>
                </Pressable>
              </View>

              <View style={styles.rowBetween}>
                <View style={styles.rememberRow}>
                  <Checkbox value={remember} onValueChange={setRemember} color={remember ? "#1F6F61" : undefined} />
                  <Text style={styles.rememberText}> Lembrar dados</Text>
                </View>

                <TouchableOpacity onPress={() => Alert.alert("Esqueci minha senha")} style={{ padding: 6 }}>
                  <Text style={styles.forgot}>Esqueci a senha</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleSignIn} disabled={loading} activeOpacity={0.8}>
                <Text style={styles.buttonText}>{loading ? "Entrando..." : "Entrar"}</Text>
              </TouchableOpacity>

              <View style={styles.footerRow}>
                <Text style={styles.noAccount}>Não tem conta?</Text>
                <TouchableOpacity onPress={() => Alert.alert("Cadastre-se")}>
                  <Text style={styles.link}> Cadastre-se</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* Styles aproximados da referência visual */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: PALE_BG },
  screen: { flexGrow: 1, alignItems: "center", justifyContent: "center", paddingVertical: 36 },
  wrapper: {
    width: Math.min(500, width - 24),
    alignItems: "center",
  },

  demoBox: {
    width: "100%",
    backgroundColor: "#EFF6FF",
    borderColor: "#DBEAFE",
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 20,
  },
  demoTitle: { color: "#3B3B99", fontWeight: "700", marginBottom: 6, fontSize: 16 },
  demoLine: { color: "#2E3A59", fontSize: 14, marginTop: 6 },
  demoLabel: { fontWeight: "800", color: "#2E3A59" },

  card: {
    width: "100%",
    backgroundColor: CARD_BG,
    borderRadius: 14,
    paddingVertical: 28,
    paddingHorizontal: 22,
    // sombra leve
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 18,
    elevation: 6,
  },
  cardTitle: { fontSize: 28, fontWeight: "800", color: "#17233A", textAlign: "center" },
  cardSubtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 8,
    fontSize: 15,
    lineHeight: 20,
  },

  inputWrap: {
    marginTop: 12,
  },
  input: {
    height: 56,
    borderRadius: 10,
    paddingHorizontal: 18,
    fontSize: 16,
    backgroundColor: INPUT_BG,
    borderWidth: 0,
    color: "#17233A",
  },
  showButton: {
    position: "absolute",
    right: 14,
    top: 14,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  showText: { color: "#374151", fontWeight: "700" },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  rememberRow: { flexDirection: "row", alignItems: "center" },
  rememberText: { color: "#374151", marginLeft: 8, fontSize: 15 },

  forgot: { color: "#6B7280", fontSize: 14, fontWeight: "600" },

  button: {
    marginTop: 18,
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
  },

  footerRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  noAccount: { color: "#6B7280", fontSize: 14 },
  link: { color: PRIMARY, fontWeight: "700" },
});
