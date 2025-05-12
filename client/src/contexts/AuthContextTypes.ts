import { createContext } from "react";

export interface UserData {
  id: string;
  name: string;
  role: string;
}

export interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: { id: string; name: string; role: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
