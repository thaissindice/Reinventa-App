// App.tsx
import React from "react";
import { ActivityIndicator, View, Text, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

import RootNavigator from "./src/navigation/RootNavigator";

export type { RootStackParamList } from "./src/navigation/RootNavigator";

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // --- solução para os warnings/erros do TS: cast para `any` antes de acessar defaultProps
  // isso preserva o comportamento runtime e remove o erro de tipagem no editor
  const TextAny = Text as any;
  const TextInputAny = TextInput as any;

  if (!TextAny.defaultProps) TextAny.defaultProps = {};
  TextAny.defaultProps.style = { fontFamily: "Nunito_400Regular" };

  if (!TextInputAny.defaultProps) TextInputAny.defaultProps = {};
  TextInputAny.defaultProps.style = { fontFamily: "Nunito_400Regular" };

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
