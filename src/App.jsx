import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar";
import { AuthProvider } from "./context/Login";
import Home from "./pages/Home";
import HomeApp from "./pages/HomeApp/HomeApp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UserDetails from "./pages/UserDetails/UserDetails";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#654ea3",
    },
  },

  typography: {
    fontFamily: ["Source Code Pro"].join(","),
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <CssBaseline />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<HomeApp />} />
              <Route path="/user/:userId" element={<UserDetails />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
