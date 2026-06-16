"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import apiClient, { setAccessToken } from "../lib/apiClient";

interface User {
  id: string;
  email: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (
    email: string,
    password: string,
    username: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await apiClient.post<{
          accessToken: string;
          user: User;
        }>("/auth/refresh");
        setUser(data.user);
        setAccessToken(data.accessToken);
      } catch {
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const register = async (
    email: string,
    password: string,
    username: string,
  ) => {
    try {
      const { data } = await apiClient.post<{
        accessToken: string;
        user: User;
      }>("/auth/register", { email, password, username });
      setUser(data.user);
      setAccessToken(data.accessToken);
      router.push("/todos");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(
        axiosError.response?.data?.message || "Registration failed",
      );
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await apiClient.post<{
        accessToken: string;
        user: User;
      }>("/auth/login", { email, password });
      setUser(data.user);
      setAccessToken(data.accessToken);
      router.push("/todos");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.log("Error detail:", axiosError.response?.data);
      throw new Error(axiosError.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
      setUser(null);
      setAccessToken(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
