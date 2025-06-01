// src/routes/Routes.jsx
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/SignIn";
import ResetPassword from "@/pages/auth/ResetPassword";
import ForgotPassword from "@/pages/auth/ForgotPassword";
// import Dashboard from "@/pages/app/Dashboard";
import ApplicationLayout from "@/pages/app/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ApplicationLayout />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}
