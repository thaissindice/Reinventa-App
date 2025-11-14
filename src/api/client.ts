// src/api/client.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const EXPO_API = Constants?.manifest?.extra?.apiUrl as string | undefined;

//const API_BASE = process.env.EXPO_PUBLIC_API_URL || "https://api.reinventa-plus.com";
// const API_BASE = "http://192.168.0.10:4000";
const API_BASE = EXPO_API || process.env.EXPO_PUBLIC_API_URL || "https://api.reinventa-plus.com";

const client = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

// 🔐 Intercepta requisições para adicionar o token JWT no header
client.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// ♻️ Intercepta respostas 401 (token expirado) e tenta renovar automaticamente
client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return client(originalRequest);
          })
          .catch((e) => Promise.reject(e));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const resp = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
        const { accessToken, refreshToken: newRefresh } = resp.data;

        await SecureStore.setItemAsync("accessToken", accessToken);
        if (newRefresh) await SecureStore.setItemAsync("refreshToken", newRefresh);

        client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return client(originalRequest);
      } catch (e) {
        processQueue(e, null);
        isRefreshing = false;
        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  }
);

export default client;
export { API_BASE };
