import {
  Box,
  Container,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
const footerData = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", path: "/home" },
      { name: "Courses", path: "/courses" },
      { name: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Learning Guide", path: "" },
      { name: "Career Advice", path: "" },
      { name: "Student Support", path: "" },
      { name: "FAQ", path: "" },
    ],
  },
];
const socialIcons = [
  {
    icon: FacebookRoundedIcon,
    link: "https://facebook.com",
  },
  {
    icon: InstagramIcon,
    link: "https://instagram.com",
  },
  {
    icon: LinkedInIcon,
    link: "https://linkedin.com",
  },
  {
    icon: YouTubeIcon,
    link: "https://youtube.com",
  },
];

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        // position: "relative",
        // overflow: "hidden",
        background: "linear-gradient(135deg,#15105c,#2017bd,#52648c)",
        color: "#fff",
        pt: {
          xs: 6,
          md: 8,
        },
        pb: 3,
      }}>
      <Container
        maxWidth="xl"
        sx={
          {
            //   position: "relative",
            //   zIndex: 2,
          }
        }>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              sm: "1fr 1fr",
              lg: "2fr 1fr 1fr 1.3fr",
            },
            gap: 6,
          }}>
          <Box>
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{
                width: {
                  xs: 110,
                  md: 130,
                },
                mb: 3,
                transition: ".3s",
                "&:hover": {
                  transform: "scale(1.08)",
                },
              }}
            />

            <Typography
              sx={{
                maxWidth: 360,
                color: "rgba(255,255,255,.8)",
                fontFamily: "Poppins",
                lineHeight: 1.8,
                fontSize: 15,
              }}>
              Empowering students with quality courses, practical knowledge and
              future-ready skills to build successful careers.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                mt: 3,
              }}>
              {socialIcons.map((social, index) => {
                const Icon = social.icon;
                return (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.link}
                    sx={{
                      width: 46,
                      height: 46,
                      color: "#fff",
                      background: "rgba(255,255,255,.15)",
                      backdropFilter: "blur(15px)",
                      transition: ".35s",
                      "&:hover": {
                        background: "#fff",
                        color: "#2017bd",
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 30px rgba(0,0,0,.3)",
                      },
                    }}>
                    <Icon />
                  </IconButton>
                );
              })}
            </Box>
          </Box>

          {/* LINKS */}
          {footerData.map((section) => (
            <Box key={section.title}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 20,
                  fontWeight: 700,
                  mb: 3,
                }}>
                {section.title}
              </Typography>

              {section.links.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  style={{
                    textDecoration: "none",
                  }}>
                  <Typography
                    sx={{
                      display: "block",
                      width: "fit-content",
                      color: "rgba(255,255,255,.75)",
                      fontFamily: "Poppins",
                      mb: 1.6,
                      transition: ".3s",
                      "&:hover": {
                        color: "#fff",
                        transform: "translateX(10px)",
                      },
                    }}>
                    {item.name}
                  </Typography>
                </NavLink>
              ))}
            </Box>
          ))}

          {/* SUBSCRIBE */}
          <Box>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 700,
                mb: 2,
                fontFamily: "Poppins",
              }}>
              Subscribe
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,.8)",
                mb: 3,
                lineHeight: 1.7,
              }}>
              Get latest course updates, offers and learning resources.
            </Typography>

            <Box
              sx={{
                display: "flex",
                p: 0.7,
                borderRadius: 4,
                background: "rgba(255,255,255,.95)",
                backdropFilter: "blur(15px)",
              }}>
              <TextField
                placeholder="Your email"
                variant="standard"
                fullWidth
                sx={{
                  px: 2,
                  "& input": {
                    fontFamily: "Poppins",
                  },
                }}
              />

              <Button
                sx={{
                  minWidth: 55,
                  borderRadius: 3,
                  color: "#fff",
                  background: "linear-gradient(135deg,#2017bd,#52648c)",
                  "&:hover": {
                    background: "linear-gradient(135deg,#52648c,#2017bd)",
                  },
                }}>
                <SendRoundedIcon />
              </Button>
            </Box>
          </Box>
        </Box>

        {/* COPYRIGHT */}
        <Box
          sx={{
            mt: 7,
            pt: 3,
            borderTop: "1px solid rgba(255,255,255,.2)",
            textAlign: "center",
          }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: {
                xs: 12,
                md: 14,
              },
              color: "rgba(255,255,255,.7)",
            }}>
            © {new Date().getFullYear()} Your Company. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
