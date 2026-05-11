import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import KanbanBoard from "./pages/KanbanBoard";
import ResumeUpload from "./pages/ResumeUpload";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddApplication from "./pages/AddApplication";
import Profile from "./pages/Profile";

import "./App.css";

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-section">
        <Navbar />

        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/add" element={<AddApplication />} />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Layout>
              <Analytics />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/board"
        element={
          <ProtectedRoute>
            <Layout>
              <KanbanBoard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume"
        element={
          <ProtectedRoute>
            <Layout>
              <ResumeUpload />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}

      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>

    
  );
}

export default App;