import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useAuth } from "../context/Login";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import logo from "../assets/logo.png";
import Popper from "@mui/material/Popper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import ThreePIcon from "@mui/icons-material/ThreeP";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import json2mq from "json2mq";
import MainMenu from "./MainMenu";

const Navbar = ({ newNotifications, onNotificationsRefresh }) => {
  const { user, logout } = useAuth();

  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const [menuEl, setMenuEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profile, setProfile] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // devuelve verdadero para dispositivos moviles
  const isMobile = useMediaQuery(
    json2mq({
      maxWidth: 700,
    })
  );

  useEffect(() => {
    if (user) {
      getRequests();
      getProfile();
    }
  }, [user]);
  useEffect(() => {
    if (newNotifications) {
      onNotificationsRefresh();
    }
  }, [newNotifications, onNotificationsRefresh]);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/profiles/user/${user.profileId}`,

        {
          headers: {
            //manda el token del usuario verificado
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.data) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getRequests = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/connections/`,

        {
          headers: {
            //manda el token del usuario verificado
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.data) {
        setRequests(response.data);
      }
    } catch (error) {
      logout();
      console.error(error);
    }
  };

  const handleClose = () => {
    setMenuEl(null);
  };

  const onHome = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleConnectionUpdate = (profileId, status) => async () => {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/connections/${profileId}`,
      {
        status,
      },
      {
        headers: {
          //manda el token del usuario verificado
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response) {
      setRequests((requests) =>
        requests.map((request) => {
          return request._id == profileId
            ? { ...request, connectionStatus: response.data.status }
            : request;
        })
      );
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <AppBar component="nav" position="static">
        <Toolbar
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#0C0C0C",
            boxShadow: "0px 2px 10px 0px #1B0554",
          }}
        >
          <ButtonBase onClick={onHome}>
            <img src={logo} alt="logo" style={{ width: 150 }} />
          </ButtonBase>

          {!isMobile ? <MainMenu logged={user} /> : null}

          <Stack
            sx={{ flexGrow: 0 }}
            gap={1}
            direction="row"
            alignItems="center"
          >
            {user ? (
              <>
                {/* connection requests */}
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleClick}
                  type="button"
                >
                  <Badge badgeContent={requests.length} color="primary">
                    <EmailIcon />
                  </Badge>
                </IconButton>
                <Popper open={open} anchorEl={anchorEl}>
                  <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                    <List
                      key="index"
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                    >
                      {requests.map((profile) => (
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={profile.photo[0]} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={profile.name}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                ></Typography>
                                {"Hi! — Wants to contact you"}
                              </React.Fragment>
                            }
                          />
                          {!profile.connectionStatus ? (
                            <Stack>
                              <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                size="small"
                                onClick={handleConnectionUpdate(
                                  profile._id,
                                  "accepted"
                                )}
                              >
                                Aceptar
                              </Button>
                              <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                size="small"
                                onClick={handleConnectionUpdate(
                                  profile._id,
                                  "rejected"
                                )}
                              >
                                Rechazar
                              </Button>
                            </Stack>
                          ) : (
                            <p>Status: {profile.connectionStatus}</p>
                          )}
                        </ListItem>
                      ))}

                      <Divider variant="inset" component="li" />
                    </List>
                  </Box>
                </Popper>

                {/* chat notifications */}
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={0} color="error">
                    <ThreePIcon />
                  </Badge>
                </IconButton>

                {/* user menu */}
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={(event) => {
                      setMenuEl(event.currentTarget);
                    }}
                    sx={{ p: 0 }}
                  >
                    {profile ? (
                      <Avatar alt="photo" src={profile.photo[0]} />
                    ) : (
                      <Avatar />
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={menuEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(menuEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate(`/user/${user.profileId}`);
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Help</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : null}

            {/* mobile menu */}
            {isMobile ? (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            ) : null}
            {!isMobile && !user ? <Box sx={{ width: 150 }} /> : null}
          </Stack>
        </Toolbar>

        {isMobile ? (
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <MainMenu
              logged={user}
              vertical
              onMenuClick={() => setDrawerOpen(false)}
            />
          </Drawer>
        ) : null}
      </AppBar>
    </>
  );
};

export default Navbar;
