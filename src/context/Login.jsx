import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); //estado que representa mientra el usuario se esta cargando

  useEffect(() => {
    // revisa en localstorage si el token existe
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken && storedUserId) {
      setUser({ token: storedToken, userId: storedUserId });
    }
    setLoading(false);
  }, []);

  const login = (user) => {
    setUser(user);
    // guarda el token en el local storage cuando se loggean
    localStorage.setItem("token", user.token);
    localStorage.setItem("userId", user.userId);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
