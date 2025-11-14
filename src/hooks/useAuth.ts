import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { authApi } from "../api/endpoints";

type SignInPayload = { email: string; password: string };
type SignInResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: any;
};

export function useAuth() {
  const qc = useQueryClient();

  const signInMut = useMutation<SignInResponse, Error, SignInPayload>({
    mutationFn: async (data) => {
      const res = await authApi.signIn(data);
      return res.data;
    },
    onSuccess: async (data) => {
      if (data.accessToken)
        await SecureStore.setItemAsync("accessToken", data.accessToken);
      if (data.refreshToken)
        await SecureStore.setItemAsync("refreshToken", data.refreshToken);
      qc.setQueryData(["user"], data.user || null);
    },
  });

  const signOut = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    qc.removeQueries({ queryKey: ["user"] });
  };

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await authApi.me();
      return res.data;
    },
    enabled: false, // ativa depois quando o token estiver salvo
  });

  return {
    signIn: signInMut.mutateAsync,
    signOut,
    user: userQuery.data,
    userStatus: userQuery.status,
    signInStatus: signInMut.status,
  };
}
