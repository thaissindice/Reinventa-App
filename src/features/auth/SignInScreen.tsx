// src/features/auth/SignInScreen.tsx
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App"; // importa o tipo do App

type Props = NativeStackScreenProps<RootStackParamList, "SignIn">;

export default function SignInScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    // simulação de login
    if (email && password) {
      navigation.replace("Home");
    } else {
      alert("Preencha os campos!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar no Reinventa+</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 12, borderRadius: 6 },
  title: { fontSize: 18, textAlign: "center", marginBottom: 16 },
});
