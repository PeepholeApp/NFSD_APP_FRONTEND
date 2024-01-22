import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Home from "../pages/Home";

const Navbar = () => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          color="#inherit"
          aria-label="open drawer"
          edge="start"
          //   onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        ></IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          FYP
        </Typography>
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
