import { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");

      // No sacar a menos que el token contenga esta informacion
      const storedUserId = localStorage.getItem("userId");
      const storedProfileId = localStorage.getItem("profileId");

      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        const { sub: userId, profileId, roles } = decodedToken;

        const updatedRoles = roles || [];
        if (!updatedRoles.includes("user")) {
          updatedRoles.push("user");
        }

        setUser({
          token: storedToken,
          userId: storedUserId,
          profileId: storedProfileId,
          roles: updatedRoles,
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error in useEffect:", error);
      setLoading(false);
    }
  }, []);

  const login = (user) => {
    setUser(user);

    const rolesToStore = Array.isArray(user.roles) ? user.roles : [];

    localStorage.setItem("token", user.token);
    localStorage.setItem("userId", user.userId);
    localStorage.setItem("profileId", user.profileId);
    const rolesString = JSON.stringify(rolesToStore);
    localStorage.setItem("roles", rolesString);
    console.log("Roles stored:", rolesString);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("profileId");
    localStorage.removeItem("roles");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { user, loading, login, logout } = useContext(AuthContext);

  const hasRole = (role) => {
    return user && user.roles.includes(role);
  };

  return { user, loading, login, logout, hasRole };
};
