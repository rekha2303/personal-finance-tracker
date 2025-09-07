import React, { useReducer } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Reports from './pages/Reports';
import ProtectedRoute from './components/ProtectedRoute';
import { themeReducer, initialTheme } from "./components/theme/themeReducer";

export default function App() {

  return (
    <div className={"min-h-screen flex flex-col"} >

      <Navbar />
      <main className="flex-1 container py-8">

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div className="card p-6">Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </ div>
  );
}