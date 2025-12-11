import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

// Páginas
import EditProfilePage from "./pages/EditProfilePage";
import HomePage from "./pages/HomePage";
import CreateUserPage from "./pages/CreateUserPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import UserInfoPage from "./pages/UserInfoPage";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          <Navbar />

          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-user" element={<CreateUserPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />
              <Route path="/user-info" element={<UserInfoPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
  
            </Routes>
          </div>

          <Footer /> 

        </div>
      </Router>
    </UserProvider>
  );
};

export default App;