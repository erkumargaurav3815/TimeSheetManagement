import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  //later on setMessage should update to signup message
  const [message, setMessage] = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const resetForm = () => {
    setValues({
      email: "",
      password: "",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
    };

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

    setErrors(newErrors);

    if (newErrors.email === "" && newErrors.password === "") {
      return true;
    }

    return false;
  };

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    const user: User = {
      email: values.email,
      password: values.password,
    };

    localStorage.setItem("user", JSON.stringify(user));
    setMessage("Sign up sucessfull");

    resetForm();
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <Box
      sx={{
        mt: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}>
      <Card
        sx={{
          width: 380,
          p: 2,
          borderRadius: 3,
          boxShadow: 5,
        }}>
        <CardContent>
          {message && (
            <Typography color="success" align="center" sx={{ mb: 2 }}>
              {message}
            </Typography>
          )}

          <Typography
            variant="h4"
            align="center"
            sx={{
              mb: 3,
              fontWeight: "bold",
              fontFamily: "Segoe UI Emoji",
            }}>
            Sign Up
          </Typography>
          {/* 
          {message && (
            <Typography color="success" align="center" sx={{ mb: 2 }}>
              {message}
            </Typography>
          )} */}

          <form onSubmit={handleSignUp}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />

            <Typography>
              Already have an account?{" "}
              <Link href="/login" sx={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                py: 1.2,
                borderRadius: 2,
                background: "linear-gradient(135deg,#15105c,#2017bd,#52648c)",
              }}>
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;
