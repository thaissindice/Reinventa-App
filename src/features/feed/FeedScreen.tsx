import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { articlesApi } from "../../api/endpoints";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Feed">;

export default function FeedScreen({ navigation }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await articlesApi.list();
      return res.data;
    },
  });

  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Erro ao carregar</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data || []}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={{ padding: 16, borderBottomWidth: 1 }}
            onPress={() => navigation.navigate("Article")}
          >
            <Text style={{ fontWeight: "600" }}>{item.title}</Text>
            <Text numberOfLines={2}>{item.excerpt || item.summary}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
