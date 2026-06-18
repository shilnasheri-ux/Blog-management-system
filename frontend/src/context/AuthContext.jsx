import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: localStorage.getItem("username"),
  });

  const login = async (username, password) => {
    const response = await API.post("/api/token/", {
      username,
      password,
    });

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    localStorage.setItem("username", username);

    setUser({ username });

    navigate("/posts");
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");

    setUser(null);

    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}