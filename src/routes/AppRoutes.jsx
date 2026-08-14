import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import StockManagement from "../pages/StockManagement";
import Users from "../pages/Users";
import Home from "../pages/Home";
import Login from "../pages/Login";

function AppRoutes() {
  return (
    <Routes>
      {/* Assignment-required routes (4 main pages) */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="/products" element={<Layout />}>
        <Route index element={<Products />} />
      </Route>

      <Route path="/stock" element={<Layout />}>
        <Route index element={<StockManagement />} />
      </Route>

      <Route path="/users" element={<Layout />}>
        <Route index element={<Users />} />
      </Route>

      {/* Optional landing / auth pages */}
      <Route path="/welcome" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Backward compatibility */}
      <Route path="/dashboard" element={<Navigate to="/" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
