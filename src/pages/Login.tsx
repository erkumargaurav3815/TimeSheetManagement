import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
=======
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
>>>>>>> Stashed changes

interface User {
  email: string;
  password: string;
<<<<<<< Updated upstream
  name: string;
=======
>>>>>>> Stashed changes
}

const Login = () => {
  const navigate = useNavigate();
<<<<<<< Updated upstream

  const users: User[] = [
    {
      email: "admin@gmail.com",
      password: "123456",
      name: "Admin",
    },
  ];

=======
>>>>>>> Stashed changes
  //later on setMessage should update to login message
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

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setMessage("");
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

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;
<<<<<<< Updated upstream

    const user = users.find(
      (item) =>
        item.email === values.email && item.password === values.password,
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setMessage("Login successful");

      resetForm();

      setTimeout(() => {
        navigate("/home");
      }, 500);
    } else {
      setMessage("Invalid email or password");
=======
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find(
      (user) =>
        user.email === values.email && user.password === values.password,
    );
    if (existingUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", values.email);
      setMessage("Login Successful");
      resetForm();
      setErrors({
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 2000);
    } else {
      setMessage("Invalid Email or Password");
>>>>>>> Stashed changes
    }
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
            <Typography
<<<<<<< Updated upstream
              color={message === "Login successful" ? "success" : "warning"}
=======
>>>>>>> Stashed changes
              align="center"
              sx={{
                mb: 2,
                color:
                  message === "Login Successful"
                    ? "success.main"
                    : "error.main",
              }}>
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
            Login
          </Typography>

          <form onSubmit={handleLogin}>
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
<<<<<<< Updated upstream

=======
            <Typography>
              Don't have an account?{" "}
              <Link
                component={RouterLink}
                to="/signup"
                sx={{ textDecoration: "none" }}>
                Sign Up
              </Link>
            </Typography>
>>>>>>> Stashed changes
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
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
