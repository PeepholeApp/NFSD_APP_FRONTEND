import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Home from "../pages/Home";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Login";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/logo.png";
import Stack from "@mui/material/Stack";

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
            <Button key={"Home"} sx={{ color: "#fff" }}>
              Comunity
            </Button>
            <Button key={"Home"} sx={{ color: "#fff" }}>
              Blog
            </Button>
            <Button key={"Home"} sx={{ color: "#fff" }}>
              About us
            </Button>
            <Button key={"Home"} sx={{ color: "#fff" }}>
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
