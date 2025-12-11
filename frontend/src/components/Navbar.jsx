import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import LogoutButton from "./LogoutButton"; 
import "../styles/Navbar.css";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="navbar">
      {/* 1. LOGO / MARCA */}
      <div className="nav-brand">
        <Link to="/">Cicatriz Verde 🌿</Link>
      </div>

      {/* 2. ENLACES PRINCIPALES (Nueva Estructura) */}
      <div className="nav-links">
        <Link to="/servicios">Nuestros servicios</Link>
        <Link to="/proyectos">Proyectos y plataformas</Link>
        <Link to="/noticias">Noticias</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/contacto">Contáctanos</Link>
        {/* SOLO MUESTRA SUSCRÍBETE SI NO HAY USUARIO LOGUEADO */}
        {!user && (
            <Link to="/suscribete" className="nav-subscribe">Suscríbete</Link>
        )}
      </div>

      {/* 3. ZONA DE USUARIO / ADMIN (Derecha) */}
      <div className="nav-auth">
        {!user ? (
          /* MODO INVITADO */
          <div className="guest-menu">
            <Link to="/login" className="nav-link">Ingresar</Link>
            <Link to="/register" className="btn-register">Registrarse</Link>
          </div>
        ) : (
          /* MODO USUARIO LOGUEADO */
          <div className="user-menu">
            
            {/* Roles Especiales */}
            {user.role === 'admin' && (
                <Link to="/admin/dashboard" className="role-link admin-link">Admin</Link>
            )}
            
            {(user.role === 'asesor' || user.role === 'admin') && (
                <Link to="/clients-list" className="role-link advisor-link">Clientes</Link>
            )}

            {/* Avatar y Nombre */}
            <div className="user-info-mini">
                <span className="user-name">
                  {user.name ? user.name.split(" ")[0] : "Hola"}
                </span>
                
                <Link to="/user-info" className="avatar-link">
                    {user.photo ? (
                        <img src={user.photo} alt="Avatar" className="nav-avatar" />
                    ) : (
                        <div className="nav-avatar-placeholder">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                    )}
                </Link>
            </div>

            {/* Botón Salir */}
            <LogoutButton className="btn-logout" />
            
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;