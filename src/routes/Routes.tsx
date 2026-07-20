import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import TimeSheet from "../pages/TimeSheet";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timeSheet"
        element={
          <ProtectedRoute>
            <TimeSheet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
    </Routes>
  );
}

export default RoutesComponent;
