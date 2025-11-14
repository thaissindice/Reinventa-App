import React from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Article">;

export default function ArticleScreen({ route }: Props) {
  const url = "https://reinventa-plus.com";

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator style={{ flex: 1 }} />}
      />
    </View>
  );
}
