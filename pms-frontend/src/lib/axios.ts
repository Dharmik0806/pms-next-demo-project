// The ONE Axios instance for the whole app, with both interceptors.
import axios from "axios";
import { env } from "@/config/env";
import { TOKEN_KEY } from "@/constants/app.constants";
import { ROUTES } from "@/constants/routes";

export const api = axios.create({
  baseURL: env.apiUrl,
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
});

// REQUEST interceptor → attach the JWT to every call
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE interceptor → if the token is invalid/expired, log the user out
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthCall = error.config?.url?.startsWith("/auth/login") || error.config?.url?.startsWith("/auth/register");
    if (error.response?.status === 401 && !isAuthCall && typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      // Avoid a redirect loop if we are already on a public page
      if (!window.location.pathname.startsWith(ROUTES.login)) {
        window.location.assign(ROUTES.login);
      }
    }
    return Promise.reject(error);
  }
);
