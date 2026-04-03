import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("prepconnect_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("prepconnect_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("prepconnect_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);