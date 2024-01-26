import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HomeApp from "./pages/HomeApp/HomeApp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { AuthProvider } from "./context/Login";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#654ea3",
    },
  },
});

function App() {
  return (
    <>
   
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
