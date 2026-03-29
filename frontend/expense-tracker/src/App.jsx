import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import Home from "./pages/Dashboard/Home";
import Expenses from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";
import LoginForm from "./pages/Auth/LoginForm";
import SignUpForm from "./pages/Auth/SignUpForm";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/income" element={<Income />} />
      </Routes>
    </div>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated
    ? <Navigate to="/dashboard" />
    : <Navigate to="/login" />;
};