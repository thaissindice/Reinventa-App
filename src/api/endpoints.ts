// src/api/endpoints.ts
import client from "./client";

type SignInResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: any;
};

export const authApi = {
  // POST /auth/login  -> body: { email, password }  -> responde { accessToken, refreshToken, user }
  signIn: (payload: { email: string; password: string }) =>
    client.post<SignInResponse>("/auth/login", payload),

  // GET /user/me -> precisa do token no header (Bearer)
  me: () => client.get("/user/me"),
};

export const articlesApi = {
  // GET /articles -> lista de artigos (pagina, query opcional)
  list: (params?: { page?: number; q?: string }) =>
    client.get("/articles", { params }),

  // GET /articles/:id -> artigo específico
  get: (id: string | number) => client.get(`/articles/${id}`),
};
