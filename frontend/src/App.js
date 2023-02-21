import { useState, useCallback, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PrivateRoute from "./components/PrivateRoute";

export const AuthContext = createContext(null);

const App = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(false);
  const logIn = useCallback((user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }, []);
  const logOut = useCallback((user) => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, logIn, logOut }}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthContext.Provider>
    </>
  );
};

export default App;
