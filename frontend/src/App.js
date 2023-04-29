import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import Navigation from "./components/Navigation/Navigation";

import routes from "./routes/routes";
import AuthProvider from "./AuthProvider";
import ChatApiProvider from "./context/ChatApiContext";
import useAuth from "./hooks/useAuth";

const { homePage, loginPage, notFoundPage, signupPage } = routes;

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return auth.loggedIn ? children : <Navigate to={routes.loginPage()} />;
};

const App = ({ socket }) => {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navigation />
          <Routes>
            <Route
              path={homePage()}
              element={
                <ChatApiProvider socket={socket}>
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                </ChatApiProvider>
              }
            />
            <Route path={loginPage()} element={<Login />} />
            <Route path={signupPage()} element={<Register />} />
            <Route path={notFoundPage()} element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
