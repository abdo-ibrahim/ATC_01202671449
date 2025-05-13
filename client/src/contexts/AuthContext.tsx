import { authURL } from "@/api/api";
import axios from "axios";
import { useState, ReactNode, useEffect } from "react";
import { AuthContext, UserData } from "./AuthContextTypes";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("userData");
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);
  const login = (data: { id: string; name: string; role: string }) => {
    localStorage.setItem("userData", JSON.stringify(data));
    setUser(data);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await axios.get(`${authURL}/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("userData");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);

      localStorage.removeItem("userData");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>;
};
