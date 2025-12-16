import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"; // <--- 1. IMPORTAR
import { FaLeaf, FaBell, FaUsers, FaUserShield, FaProjectDiagram } from "react-icons/fa";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user, loadUser } = useUser();
  const { toast } = useToast(); // <--- 2. INICIALIZAR

  useEffect(() => {
    loadUser();
  }, []);

  // Función para simular clic en notificaciones
  const handleNotificationClick = () => {
    toast({
      description: "🔕 No tienes notificaciones nuevas por el momento.",
    });
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      
      <h2 className="dashboard-welcome">
        Hola, {user?.name || "Usuario"} <span style={{ fontSize: "0.8em", color: "#666" }}>({user?.role || "cargando..."})</span>
      </h2>

      <div className="dashboard-actions">
        <Link to="/perfil" className="dash-button">
          Ver mi información
        </Link>
      </div>

      <div className="cards-grid">

        {/* --- CLIENTES --- */}
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

        {/* --- ASESORES / ADMIN --- */}
        {(user?.role === 'asesor' || user?.role === 'admin') && (
            <Link to="/clients-list" style={{ textDecoration: 'none' }}>
                <div className="card highlight-card" style={{ borderColor: '#f1c40f' }}>
                    <FaUsers size={40} color="#f1c40f" />
                    <div className="card-content">
                        <h3>Panel de Clientes</h3>
                        <p>Revisar mediciones de usuarios.</p>
                    </div>
                </div>
            </Link>
        )}

        {/* --- SOLO ADMIN --- */}
        {user?.role === 'admin' && (
             <Link to="/admin/create-advisor" style={{ textDecoration: 'none' }}>
                <div className="card" style={{ borderLeft: "5px solid #e74c3c" }}>
                    <FaUserShield size={40} color="#e74c3c" />
                    <div className="card-content">
                        <h3>Gestión de Sistema</h3>
                        <p>Crear nuevos asesores.</p>
                    </div>
                </div>
             </Link>
        )}

        {/* --- TARJETAS COMUNES --- */}
        
        {user?.role === 'cliente' && (
            <div className="card">
                <FaProjectDiagram size={40} color="#3e7f5e" />
                <div className="card-content">
                    <h3>Historial</h3>
                    <p>Tus mediciones anteriores.</p>
                </div>
            </div>
        )}

        {/* --- NOTIFICACIONES INTERACTIVAS --- */}
        {/* Agregamos onClick y cursor pointer para que parezca botón */}
        <div 
            className="card" 
            onClick={handleNotificationClick} 
            style={{ cursor: "pointer", transition: "transform 0.2s" }}
        >
          <FaBell size={40} color="#3e7f5e" />
          <div className="card-content">
            <h3>Notificaciones</h3>
            <p>Haga clic para actualizar.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;