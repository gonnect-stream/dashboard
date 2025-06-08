// src/routes/Routes.jsx
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/SignIn";
import ResetPassword from "@/pages/auth/ResetPassword";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ApplicationLayout from "@/pages/app/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Events from "@/pages/app/events";
import Profile from "@/pages/app/user/Profile";
import Home from "@/pages/app/Home.jsx";
import Users from "@/pages/app/user/Users.jsx";
import PageNotFound from "@/pages/page-not-found.jsx";

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
      >
        <Route path="/dashboard/" element={<Home />} />
        <Route path="/dashboard/eventos" element={<Events />} />
        <Route path="/dashboard/perfil" element={<Profile />} />
        <Route path="/dashboard/usuarios" element={<Users />} />
      </Route>


        <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
