import { jwtDecode } from "jwt-decode";


export const getToken = () => localStorage.getItem("access_token");
export const setToken = (token: string) => localStorage.setItem("access_token", token);
export const removeToken = () => localStorage.removeItem("access_token");

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

export const logout = () => {
  removeToken();
  window.location.href = "/signin";
};

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch {
    return true;
  }
};
