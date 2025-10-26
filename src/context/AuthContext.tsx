import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type User = {
  username: string;
  email: string;
  name: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = "myapp_auth";
const USER_KEY = "myapp_user";

export { AuthContext };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw === "true";
  });

  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  const login = (username: string, password: string) => {
    if (username === "Mohamed" && password === "P@#$w0rd") {
      const userData: User = {
        username: "Mohamed",
        email: "MohamedAhmed@gmail.com",
        name: "Mohamed Ahmed",
      };
      setIsAuthenticated(true);
      setUser(userData);
      return true;
    }

    if (username === "admin" && password === "password") {
      const userData: User = {
        username: "admin",
        email: "admin@dashboardapp.com",
        name: "Administrator",
      };
      setIsAuthenticated(true);
      setUser(userData);
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const value: AuthContextType = { isAuthenticated, user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
