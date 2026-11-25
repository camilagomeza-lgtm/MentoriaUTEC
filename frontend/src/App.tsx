import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import AuthProvider from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/*" element={<h1>Página no encontrada</h1>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}