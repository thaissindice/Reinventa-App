// src/features/home/HomeScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App"; // importa o tipo do App

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bem-vinda ao Reinventa+!</Text>
      <Button title="Sair" onPress={() => navigation.replace("SignIn")} />
    </View>
  );
}
