import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import RootNavigator from "./src/navigation/RootNavigator";

// Re-exporta o tipo das rotas (caso outras telas importem de App)
export type { RootStackParamList } from "./src/navigation/RootNavigator";

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  // carregamento de fontes (dentro do componente!!!)
  const [fontsLoaded] = useFonts({
    "Nunito-Regular": require("./assets/fonts/Nunito-VariableFont_wght.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito-Italic-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
