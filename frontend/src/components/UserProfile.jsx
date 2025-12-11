import React from "react";
import { useUser } from "../context/UserContext";
import "../styles/UserProfile.css"; // Sugerencia: crea este archivo para estilos

const UserProfile = () => {
  const { user } = useUser();

  // 1. Manejo de estado de carga o no logueado
  if (!user) {
    return <div className="profile-loading">Cargando perfil...</div>;
  }

  return (
    <div className="user-profile-card">
      <div className="profile-header">
        {/* FOTO: Si existe, la muestra. Si no, un círculo con la inicial */}
        <div className="profile-avatar">
          {user.photo ? (
            <img src={user.photo} alt="Perfil" />
          ) : (
            <div className="avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <h2>{user.name}</h2>
        <span className={`role-badge role-${user.role}`}>
            {user.role ? user.role.toUpperCase() : "USUARIO"}
        </span>
      </div>

      <div className="profile-details">
        <div className="detail-item">
            <strong>📧 Correo:</strong> <span>{user.email}</span>
        </div>
        <div className="detail-item">
            <strong>🆔 DNI/ID:</strong> <span>{user.identifier}</span>
        </div>
        
        {/* Solo mostramos estos si existen (porque son opcionales) */}
        {user.age && (
            <div className="detail-item">
                <strong>🎂 Edad:</strong> <span>{user.age} años</span>
            </div>
        )}
        
        {(user.country || user.department) && (
            <div className="detail-item">
                <strong>📍 Ubicación:</strong> 
                <span>{user.department}{user.department && user.country ? ", " : ""}{user.country}</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;