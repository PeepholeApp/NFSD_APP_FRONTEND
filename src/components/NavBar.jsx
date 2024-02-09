import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/Login";

const Navbar = () => {
  const { user } = useAuth();
  console.log("logear usuario", user);

  const navigate = useNavigate();

  const onHome = () => {
    navigate("/home");
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

          <Avatar onClick={() => navigate(`/user/${user.profileId}`)}></Avatar>
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
