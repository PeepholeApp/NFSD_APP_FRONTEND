import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Home from "../pages/Home";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Login";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const onHome = () => {
    navigate("/");
  };
  return user ? (
    <>
      <AppBar component="nav" position="static">
        <Toolbar
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box onClick={onHome}>
            <img src={logo} alt="logo" style={{ width: 150 }} />
          </Box>

          <Box>
            <Button
              key={"Home"}
              onClick={() => navigate("/community")}
              sx={{ color: "#fff" }}
            >
              Comunity
            </Button>
            <Button
              key={"Home"}
              onClick={() => navigate("/blog")}
              sx={{ color: "#fff" }}
            >
              Blog
            </Button>
            <Button
              key={"Home"}
              onClick={() => navigate("/aboutUs")}
              sx={{ color: "#fff" }}
            >
              About us
            </Button>
            <Button
              key={"Home"}
              onClick={() => navigate("/contact")}
              sx={{ color: "#fff" }}
            >
              Contact
            </Button>
          </Box>

          <Avatar></Avatar>
        </Toolbar>
      </AppBar>
    </>
  ) : (
    <AppBar component="nav" position="static">
      <Toolbar
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box onClick={onHome}>
          <img src={logo} alt="logo" style={{ width: 150 }} />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button key={"Home"} sx={{ color: "#fff" }}>
            App
          </Button>
          <Button key={"Home"} sx={{ color: "#fff" }}>
            About us
          </Button>
          <Button key={"Home"} sx={{ color: "#fff" }}>
            Blog
          </Button>
        </Box>
        <Box>
          <Button>Sign In</Button>
          <Button>Sign up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
