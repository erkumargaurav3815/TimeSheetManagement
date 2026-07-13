import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";

function Contact() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const resetForm = () => {
    setValues({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "linear-gradient(135deg,#84838d,#2017bd,#84838d)",
        p: 2,
      }}>
      <Card
        sx={{
          marginTop: 8,
          width: "100%",
          maxWidth: 420,
          borderRadius: 4,
          // background: "linear-gradient(#d3cdfc, #fff)",
          // boxShadow: "0 20px 60px red",
          boxShadow: "0 20px 60px #b1bbdf",
        }}>
        <CardContent sx={{ p: 4 }}>
          <Stack
            spacing={2}
            sx={{
              p: 2,
              width: 300,
            }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "Bolder",
                color: "#7e4cdbcf",
                fontFamily: "Segoe UI Emoji",
              }}>
              Contact Form
            </Typography>

            <TextField
              name="firstName"
              label="First Name"
              value={values.firstName}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              name="lastName"
              label="Last Name"
              value={values.lastName}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              variant="outlined"
            />

            <Button
              sx={{
                background: "linear-gradient(135deg,#15105c,#2017bd,#52648c)",
              }}
              onClick={resetForm}
              variant="contained">
              Submit
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Contact;
