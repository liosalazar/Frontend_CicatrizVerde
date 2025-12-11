import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom"; // Importamos el hook de navegación

const LogoutButton = ({ className }) => { // Aceptamos className para estilos personalizados
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 1. Borra token y estado
    navigate("/login"); // 2. Redirige al usuario a la pantalla de entrada
  };

  return (
    <button onClick={handleLogout} className={className}>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;