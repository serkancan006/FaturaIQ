import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "accessToken";

const TokenService = {
  // Token'ı kaydet
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Token'ı al
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Token'ı sil
  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Token'ın var olup olmadığını kontrol et aslında token doğrulaması olamadan authenticate olduğunu söyleyemeyiz
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Token'dan rol bilgisini çıkar
  getRoles: (): string[] | null => {
    const token = TokenService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.roles || null; // Eğer roles varsa döndür, yoksa null döndür
      } catch (error) {
        console.error("Token decode hatası", error);
        return null;
      }
    }
    return null;
  },
  
};

export default TokenService;
