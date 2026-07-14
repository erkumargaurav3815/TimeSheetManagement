import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";

const pages = [
  { name: "Home", path: "/home" },
  { name: "Courses", path: "/courses" },
  { name: "Contact", path: "/contact" },
];

const authPages = [
  { name: "Login", path: "/login" },
  { name: "Sign Up", path: "/signUp" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("user");

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const mobilePages = isLoggedIn
    ? [...pages, { name: "Logout", path: "" }]
    : authPages;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg,#15105c,#2017bd,#52648c)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 15px 40px rgba(0,0,0,.25)",
      }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 80,
          }}>
          {/* Desktop Logo */}
          <Typography
            sx={{
              display: { xs: "none", md: "flex" },
              "& img": {
                width: 130,
                cursor: "pointer",
              },
            }}>
            <img src={logo} alt="logo" />
          </Typography>

          {/* Mobile Menu */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}>
            <IconButton
              onClick={handleOpenNavMenu}
              sx={{
                width: 50,
                height: 50,
                color: "#fff",
                background: "rgba(255,255,255,.15)",

                "&:hover": {
                  background: "#fff",
                  color: "#2017bd",
                },
              }}>
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              slotProps={{
                paper: {
                  sx: {
                    mt: 2,
                    width: 230,
                    borderRadius: 5,
                    p: 1,
                  },
                },
              }}>
              {mobilePages.map((page, index) => (
                <MenuItem
                  key={page.name}
                  component={page.name === "Logout" ? "div" : NavLink}
                  to={page.name === "Logout" ? undefined : page.path}
                  onClick={() => {
                    handleCloseNavMenu();

                    if (page.name === "Logout") {
                      handleLogout();
                    }
                  }}
                  sx={{
                    borderRadius: 3,
                    mb: 1,

                    "&:hover": {
                      background: "linear-gradient(135deg,#2017bd,#52648c)",
                      color: "#fff",
                    },

                    "&.active": {
                      background: "linear-gradient(135deg,#2017bd,#52648c)",
                      color: "#fff",
                    },
                  }}>
                  <Box
                    sx={{
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg,#2017bd,#52648c)",
                      color: "#fff",
                      mr: 2,
                    }}>
                    {index + 1}
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            sx={{
              display: { xs: "flex", md: "none" },
              ml: "auto",
            }}>
            <img src={logo} alt="logo" width="120" />
          </Typography>

          {/* Desktop Navigation */}

          {isLoggedIn && (
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",

                display: {
                  xs: "none",
                  md: "flex",
                },

                gap: 1,
                p: 0.8,
                borderRadius: "40px",

                background: "rgba(255,255,255,.1)",
              }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={NavLink}
                  to={page.path}
                  sx={{
                    px: 3,
                    py: 1,

                    color: "#fff",
                    fontWeight: 600,
                    textTransform: "none",

                    borderRadius: "30px",

                    "&:hover": {
                      background: "rgba(255,255,255,.2)",
                    },

                    "&.active": {
                      background: "#fff",
                      color: "#2017bd",
                    },
                  }}>
                  {page.name}
                </Button>
              ))}
            </Box>
          )}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },

              marginLeft: "auto",
              gap: 1.5,
            }}>
            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                sx={{
                  px: 3,
                  py: 1,

                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",

                  borderRadius: "30px",

                  border: "1px solid rgba(255,255,255,.3)",

                  "&:hover": {
                    background: "#fff",
                    color: "#d32f2f",
                  },
                }}>
                Logout
              </Button>
            ) : (
              authPages.map((page) => (
                <Button
                  key={page.name}
                  component={NavLink}
                  to={page.path}
                  sx={{
                    px: 3,
                    py: 1,

                    color: "#fff",
                    fontWeight: 600,
                    textTransform: "none",

                    borderRadius: "30px",

                    border: "1px solid rgba(255,255,255,.3)",

                    "&:hover": {
                      background: "#fff",
                      color: "#2017bd",
                    },
                  }}>
                  {page.name}
                </Button>
              ))
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
