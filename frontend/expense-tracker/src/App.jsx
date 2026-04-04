import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import Home from "./pages/Dashboard/Home";
import Expenses from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";
import LoginForm from "./pages/Auth/LoginForm";
import SignUpForm from "./pages/Auth/SignUpForm";
import { UserProvider } from "./context/userContext";

import {Toaster} from 'react-hot-toast'
const App = () => {
  return (
    <UserProvider>
    <div>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/expense" element={<Expenses />} />
        <Route path="/income" element={<Income />} />
      </Routes>
    </div>
    <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated
    ? <Navigate to="/dashboard" />
    : <Navigate to="/login" />;
};