import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";

import Login from "./pages/Login";
import User from "./pages/User";
import Orders from "./pages/Orders";
import Kitchen from "./pages/Kitchen";
import Robots from "./pages/Robots";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import Manager from "./pages/Manager";
import Register from "./pages/Register";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/analytics" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/robots" element={<Robots />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="*" element={<h4 className="text-danger">Sidan finns inte</h4>} />
      </Routes>
    </Layout>
  );
}

export default App;
