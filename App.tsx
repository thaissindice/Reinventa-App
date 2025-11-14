import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignInScreen from "./src/features/auth/SignInScreen";
import HomeScreen from "./src/features/home/HomeScreen";
import FeedScreen from "./src/features/feed/FeedScreen";
import ArticleScreen from "./src/features/article/ArticleScreen";

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  Feed: undefined;
  Article: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: "Entrar" }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Reinventa+" }} />
          <Stack.Screen name="Feed" component={FeedScreen} options={{ title: "Feed" }} />
          <Stack.Screen name="Article" component={ArticleScreen} options={{ title: "Artigo" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
