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

import { NavLink } from "react-router-dom";

import logo from "../../assets/images/logo.png";

const pages = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Courses",
    path: "/courses",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg,#15105c,#2017bd,#52648c)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 15px 40px rgba(0,0,0,.25)",
        // overflow: "hidden",
      }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 80,
            // position: "relative",
            // zIndex: 2,
          }}>
          {/* Desktop Logo */}
          <Typography
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              "& img": {
                width: 130,
                cursor: "pointer",
                transition: ".4s",
              },
              "& img:hover": {
                transform: "scale(1.03) ",
              },
            }}>
            <img src={logo} alt="logo" />
          </Typography>

          {/* Mobile Menu */}
          <Box
            sx={{
              //   flexGrow: 1,
              display: {
                xs: "flex",
                md: "none",
              },
            }}>
            <IconButton
              onClick={handleOpenNavMenu}
              sx={{
                width: 50,
                height: 50,
                color: "#fff",
                background: "rgba(255,255,255,.15)",
                backdropFilter: "blur(15px)",
                transition: ".3s",
                "&:hover": {
                  background: "#fff",
                  color: "#2017bd",
                  transform: "rotate(90deg)",
                },
              }}>
              <MenuIcon
                sx={{
                  fontSize: 30,
                }}
              />
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
                    background: "rgba(255,255,255,.95)",
                    backdropFilter: "blur(25px)",
                    boxShadow: "0 20px 50px rgba(0,0,0,.3)",
                  },
                },
              }}>
              {pages.map((page, index) => (
                <MenuItem
                  key={page.name}
                  component={NavLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    borderRadius: 3,
                    py: 1.4,
                    mb: 0.8,
                    display: "flex",
                    gap: 2,
                    transition: ".3s",
                    "&:hover": {
                      background: "linear-gradient(135deg,#2017bd,#52648c)",
                      color: "#fff",
                      transform: "translateX(8px)",
                    },
                    "&.active": {
                      background: "linear-gradient(135deg,#2017bd,#52648c)",
                      color: "#fff",
                    },
                  }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      background: "linear-gradient(135deg,#2017bd,#52648c)",
                    }}>
                    {index + 1}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
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
              display: {
                xs: "flex",
                md: "none",
              },
              ml: "auto",
            }}>
            <img
              src={logo}
              alt="logo"
              style={{
                width: 120,
              }}
            />
          </Typography>

          {/* Desktop Navigation */}
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
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255,255,255,.12)",
            }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={NavLink}
                to={page.path}
                sx={{
                  px: 3.5,
                  py: 1.2,
                  color: "#fff",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: 15,
                  textTransform: "none",
                  borderRadius: "30px",
                  transition: ".35s",
                  "&:hover": {
                    background: "rgba(255,255,255,.18)",
                    transform: "translateY(-4px)",
                  },
                  "&.active": {
                    background: "linear-gradient(135deg,#fff,#eee)",
                    color: "#2017bd",
                    boxShadow: "0 10px 25px rgba(0,0,0,.25)",
                  },
                }}>
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
