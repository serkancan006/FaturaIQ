import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import TokenService from "../services/TokenService"; 

// Auth context tipi
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  userRoles: string[] | null;
}

// Varsayılan değerler
const defaultContext: AuthContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  userRoles: null, // Başlangıçta roles bilgisi yok
};

// Context oluşturuluyor
const AuthContext = createContext<AuthContextType>(defaultContext);

// AuthProvider bileşeni
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRoles, setUserRoles] = useState<string[] | null>(null);

  // Uygulama yüklendiğinde, token'a göre auth durumunu kontrol et
  useEffect(() => {
    const token = TokenService.getToken();
    if (token) {
      setIsAuthenticated(true);
      const roles = TokenService.getRoles(); // Token'dan rol bilgisini al
      setUserRoles(roles); // Rolleri state'e set et
    }
  }, []);

  // Giriş yapma fonksiyonu
  const login = (token: string) => {
    TokenService.setToken(token);
    setIsAuthenticated(true);
    const roles = TokenService.getRoles(); 
    setUserRoles(roles); 
  };

  // Çıkış yapma fonksiyonu
  const logout = () => {
    TokenService.removeToken();
    setIsAuthenticated(false);
    setUserRoles(null); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userRoles }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext'e erişmek için kullanabileceğimiz hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth, bir AuthProvider içinde kullanılmalıdır");
  }
  return context;
};
