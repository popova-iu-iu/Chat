import { useMemo, useState } from "react";
import AuthContext from "./contexts/index";

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(
    currentUser ? { username: currentUser.username } : null
  );

  const logIn = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    console.log(user)
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  const auth = useMemo(
    () => ({
      logIn,
      logOut,
      getAuthHeader,
      user,
    }),
    [user]
  );

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
