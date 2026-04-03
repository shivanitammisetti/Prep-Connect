import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Register    from "./pages/Register";
import VerifyOTP   from "./pages/VerifyOTP";
import Login       from "./pages/Login";
import Dashboard   from "./pages/Dashboard";
import Doubts      from "./pages/Doubts";
import DoubtDetail from "./pages/DoubtDetail";
import Videos      from "./pages/Videos";
import VideoDetail from "./pages/VideoDetail";
import Roadmaps    from "./pages/Roadmaps";
import Profile     from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"            element={<Navigate to="/login" replace />} />
          <Route path="/register"    element={<Register />} />
          <Route path="/verify-otp"  element={<VerifyOTP />} />
          <Route path="/login"       element={<Login />} />

          <Route path="/dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/doubts"      element={<ProtectedRoute><Doubts /></ProtectedRoute>} />
          <Route path="/doubts/:id"  element={<ProtectedRoute><DoubtDetail /></ProtectedRoute>} />
          <Route path="/videos"      element={<ProtectedRoute><Videos /></ProtectedRoute>} />
          <Route path="/videos/:id"  element={<ProtectedRoute><VideoDetail /></ProtectedRoute>} />
          <Route path="/roadmaps"    element={<ProtectedRoute><Roadmaps /></ProtectedRoute>} />
          <Route path="/profile"     element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;