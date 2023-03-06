import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PrivateRoute from "./components/PrivateRoute";

import AuthContext from "./contexts/index.jsx";

const App = () => {
  const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggetIn] = useState(false);

    const logIn = () => setLoggetIn(true);
    const logOut = () => {
      localStorage.removeItem("userId");
      setLoggetIn(false);
    };

    return (
      <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
        {children}
      </AuthContext.Provider>
    );
  };

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
