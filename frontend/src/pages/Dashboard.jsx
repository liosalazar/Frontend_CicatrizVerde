import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";

import { FaLeaf, FaBell, FaUsers, FaUserShield, FaProjectDiagram } from "react-icons/fa";

const Dashboard = () => {
  const { user, loadUser } = useUser();

  // Cargamos los datos frescos al entrar (para asegurar que el 'role' esté actualizado)
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      
      {/* Mostramos el nombre y el rol entre paréntesis, como pediste */}
      <h2 className="dashboard-welcome">
        Hola, {user?.name || "Usuario"} <span style={{ fontSize: "0.8em", color: "#666" }}>({user?.role || "cargando..."})</span>
      </h2>

      <div className="dashboard-actions">
        <Link to="/user-info" className="dash-button">
          Ver mi información
        </Link>
      </div>

      <div className="cards-grid">

        {/* ------------------------------------------------------ */}
        {/* 1. VISTA PARA CLIENTES (La calculadora verde)          */}
        {/* ------------------------------------------------------ */}
        {user?.role === 'cliente' && (
            <Link to="/calcular" style={{ textDecoration: 'none' }}>
                <div className="card highlight-card"> 
                  <FaLeaf size={40} color="#2ecc71" />
                  <div className="card-content">
                    <h3>Nueva Medición</h3>
                    <p>Calcula tu huella de carbono.</p>
                  </div>
                </div>
            </Link>
        )}

        {/* ------------------------------------------------------ */}
        {/* 2. VISTA PARA ASESORES O ADMINS (Ver Clientes)         */}
        {/* ------------------------------------------------------ */}
        {(user?.role === 'asesor' || user?.role === 'admin') && (
            <Link to="/clients-list" style={{ textDecoration: 'none' }}>
                <div className="card highlight-card" style={{ borderColor: '#f1c40f' }}> {/* Borde Dorado */}
                    <FaUsers size={40} color="#f1c40f" />
                    <div className="card-content">
                        <h3>Panel de Clientes</h3>
                        <p>Revisar mediciones de usuarios.</p>
                    </div>
                </div>
            </Link>
        )}

        {/* ------------------------------------------------------ */}
        {/* 3. VISTA SOLO PARA ADMIN (Crear Asesores)              */}
        {/* ------------------------------------------------------ */}
        {user?.role === 'admin' && (
             <Link to="/admin/create-advisor" style={{ textDecoration: 'none' }}>
                <div className="card" style={{ borderLeft: "5px solid #e74c3c" }}> {/* Acento Rojo */}
                    <FaUserShield size={40} color="#e74c3c" />
                    <div className="card-content">
                        <h3>Gestión de Sistema</h3>
                        <p>Crear nuevos asesores.</p>
                    </div>
                </div>
             </Link>
        )}

        {/* ------------------------------------------------------ */}
        {/* 4. TARJETAS COMUNES (Visibles para todos)              */}
        {/* ------------------------------------------------------ */}
        
        {/* Historial (Solo clientes suelen tener historial propio, pero asesores podrían ver reportes) */}
        {user?.role === 'cliente' && (
            <div className="card">
            <FaProjectDiagram size={40} color="#3e7f5e" />
            <div className="card-content">
                <h3>Historial</h3>
                <p>Tus mediciones anteriores.</p>
            </div>
            </div>
        )}

        <div className="card">
          <FaBell size={40} color="#3e7f5e" />
          <div className="card-content">
            <h3>Notificaciones</h3>
            <p>Sin alertas nuevas.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;