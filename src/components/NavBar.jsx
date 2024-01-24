import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Home from "../pages/Home";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const onHome = () => {
    navigate("/");
  };
  return (
    <AppBar component="nav">
      <Toolbar>
        <Button
          variant="h6"
          component="div"
          onClick={onHome}
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          FYP
        </Button>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button key={"Home"} sx={{ color: "#fff" }}>
            Nosotros
          </Button>
          <Button key={"Home"} sx={{ color: "#fff" }}>
            Eventos
          </Button>
          <Button key={"Home"} sx={{ color: "#fff" }}>
            Blog
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
