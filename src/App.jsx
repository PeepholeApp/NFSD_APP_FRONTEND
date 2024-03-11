import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/NavBar";
import { FiltersProvider } from "./context/FiltersContext";
import { useAuth } from "./context/Login"; 
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog/Blog";
import Community from "./pages/Community/Community";
import Contact from "./pages/Contact";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import HomeApp from "./pages/HomeApp/HomeApp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UserDetails from "./pages/UserDetails/UserDetails";
import ForgotPassword from "./pages/ForgotPassword";
import { useParams } from "react-router-dom";
import initializeNotifications from "../notifications";
import Chat from "./pages/Chat/Chat";
import io from "socket.io-client";
import { ChatContextProvider } from './context/ChatContext';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#654ea3",
    },
  },
  typography: {
    fontFamily: ["Cascadia Code PL"].join(","),
  },
});

function PrivateRoute({ element }) {
  const auth = useAuth();

  return auth.loading ? null : auth.user ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
}

function UserDetailsWrapper() {
  const { userId } = useParams();
  const auth = useAuth();

  return auth.loading ? null : auth.user ? (
    <UserDetails userId={userId} />
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log("user", user);
    if (user) {
      initializeNotifications(user);
    }
  }, [user]);

  return (
    <>
      <ThemeProvider theme={theme}>
          <FiltersProvider>
            <CssBaseline />
            <ChatContextProvider user={user}>
            <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/profile"
                  element={<PrivateRoute element={<Profile />} />}
                />
                <Route
                  path="/editProfile"
                  element={<PrivateRoute element={<EditProfile />} />}
                />
                <Route
                  path="/home"
                  element={<PrivateRoute element={<HomeApp />} />}
                />
                <Route path="/user/:userId" element={<UserDetailsWrapper />} />
                <Route
                  path="/community"
                  element={<PrivateRoute element={<Community />} />}
                />
                <Route path="/blog" element={<Blog />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </ChatContextProvider>
          </FiltersProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
