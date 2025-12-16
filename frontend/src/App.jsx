import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "./components/ui/toaster"; 

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
import ServicesPage from "./pages/ServicesPage";
import CarbonCalculator from "./pages/CarbonCalculator";
import EcoTips from "./pages/EcoTips"
import Reports from "./pages/Reports";

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
              <Route path="/perfil" element={<UserInfoPage />} />
              <Route path="/servicios" element={<ServicesPage />} />
              <Route path="/calcular" element={<CarbonCalculator />} />
              <Route path="/consejos" element={<EcoTips />} />
              <Route path="/residuos" element={<div style={{padding: 50}}><h1>Gestión de Residuos próximamente...</h1></div>} />
              <Route path="/reportes" element={<Reports />} />
            
              
            </Routes>
          </div>

          <Footer /> 

          <Toaster /> 

        </div>
      </Router>
    </UserProvider>
  );
};

export default App;