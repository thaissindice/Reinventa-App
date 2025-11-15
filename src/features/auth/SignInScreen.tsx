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
} from "react-native";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  function handleSignIn() {
    if (email && password) navigation.replace("Home");
    else Alert.alert("Preencha os campos");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding" })} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={20} color="#374151" />
            </TouchableOpacity>

            <View style={styles.topBox}>
              <Text style={styles.logoText}>
                Reinventa<Text style={styles.logoPlus}>+</Text>
              </Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.title}>Acesse sua conta</Text>

              <Text style={styles.label}>E-mail</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  placeholder="seuemail@email.com.br"
                  placeholderTextColor="#9AA3B2"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <Text style={[styles.label, { marginTop: 12 }]}>Senha</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  placeholder="**********"
                  placeholderTextColor="#9AA3B2"
                  style={[styles.input, { paddingRight: 52 }]}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword((v) => !v)}>
                  <Feather name={showPassword ? "eye" : "eye-off"} size={22} color="#475569" />
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 12 }}>
                <TouchableOpacity style={styles.rememberRow} onPress={() => setRemember((v) => !v)}>
                  <Checkbox value={remember} onValueChange={setRemember} color={remember ? "#1F6F61" : undefined} />
                  <Text style={styles.rememberText}> Lembrar dados</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Alert.alert("Ajuda...")} style={{ marginTop: 14 }}>
                <Text style={styles.help}>Precisa de ajuda?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7FAFC" },
  screen: { flexGrow: 1, alignItems: "center", justifyContent: "center", paddingVertical: 30 },
  card: {
    width: Math.min(380, width - 32),
    minHeight: Math.round(height * 0.78),
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  back: {
    position: "absolute",
    left: 16,
    top: 16,
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#EEF3F8",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  topBox: {
    height: 100,
    backgroundColor: "#F7FAFC",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    marginBottom: -8,
  },
  logoText: {
    fontSize: 34,
    fontFamily: "Nunito-Bold",
    color: "#0F1724",
    letterSpacing: 0.5,
  },
  logoPlus: {
    color: "#1F6F61",
    fontSize: 26,
    position: "relative",
    top: -4,
  },
  form: { paddingHorizontal: 22, paddingVertical: 18 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F1724",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "Nunito-Bold",
    fontStyle: "normal",
  },
  label: { color: "#243240", marginBottom: 6, fontWeight: "700", fontSize: 16 },
  inputWrap: { position: "relative" },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: "#D1D9E2",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  eyeButton: { position: "absolute", right: 14, top: 14, height: 28, width: 36, alignItems: "center", justifyContent: "center" },
  rememberRow: { flexDirection: "row", alignItems: "center" },
  rememberText: { color: "#374151", marginLeft: 8, fontSize: 16 },
  button: {
    marginTop: 18,
    backgroundColor: "#1F6F61",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 20,
    fontFamily: "Nunito-Bold",
    fontStyle: "normal",
  },
  help: { textAlign: "center", color: "#283242", fontWeight: "700", marginTop: 18, fontSize: 16 },
});
