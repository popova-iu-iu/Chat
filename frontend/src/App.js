import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";

import AuthProvider from "./AuthProvider";

const App = () => (
  <AuthProvider>
    <Header />
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </AuthProvider>
);

export default App;
