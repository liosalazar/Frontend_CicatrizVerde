import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import UserProfile from "../components/UserProfile"; // Importamos el componente
import "../styles/UserInfo.css"; // Estilos generales de la página

const UserInfoPage = () => {
  const { user, loadUser } = useUser();

  // Forzamos la recarga de datos al entrar
  useEffect(() => {
    loadUser();
  }, []);

  // Manejo de carga
  if (!user) {
     const token = localStorage.getItem('token');
     if (token) return <div className="loading-container">Cargando perfil...</div>;
     return <p>No autorizado. Inicia sesión.</p>;
  }

  return (
    <div className="user-info-page">
      <h1 className="page-title">Mi Perfil</h1>

      <UserProfile />

      <div className="action-buttons">
        <Link to="/edit-profile">
          <button className="edit-button">✏️ Editar Información</button>
        </Link>
        
        <Link to="/dashboard">
          <button className="back-button">Volver al Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default UserInfoPage;