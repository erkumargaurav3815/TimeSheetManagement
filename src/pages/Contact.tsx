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
    confirmPassword: "",
  });

  const resetForm = () => {
    setValues({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!values.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (values.firstName.trim().length < 3) {
      newErrors.firstName = "Minimum 3 characters required";
    }

    if (!values.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword != values.password) {
      newErrors.confirmPassword = "Password and Confirm Password doesn't match";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log(values);

      alert("Form submitted successfully!");

      resetForm();
      setErrors({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
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
              error={!!errors.firstName}
              helperText={errors.firstName}
            />

            <TextField
              name="lastName"
              label="Last Name"
              value={values.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password}
            />

            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />

            <Button
              sx={{
                background: "linear-gradient(135deg,#15105c,#2017bd,#52648c)",
              }}
              onClick={handleSubmit}
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
