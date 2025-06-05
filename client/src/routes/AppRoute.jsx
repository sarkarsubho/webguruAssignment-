import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminPanel from "../pages/AdminPanel";
import UserDashboard from "../pages/UserDashboard";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={
          <PrivateRoute role="admin">
            <AdminPanel />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoute;
