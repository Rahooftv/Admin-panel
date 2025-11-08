import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../components/Sidebaar";
import Users from "../pages/User";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import Orders from "../pages/Order";
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>
   
      <Route path="/login" element={<Login />} />

   
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <div className="flex">
              <Sidebar />
              <div className="flex-1 bg-gray-50 min-h-screen p-4">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="products" element={<Products />} />
                  <Route path="orders" element={<Orders />} />
                  <Route
                    path="*"
                    element={<Navigate to="/admin/dashboard" replace />}
                  />
                </Routes>
              </div>
            </div>
          </AdminRoute>
        }
      />

    

    </Routes>
  );
}
