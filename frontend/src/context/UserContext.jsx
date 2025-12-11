import React, { createContext, useContext, useState, useEffect } from "react";
// Importamos el cliente API configurado
import { apiClient } from "../api/apiClient"; 

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // --- 1. CARGAR USUARIO (Persistencia de sesión) ---
  const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
          // Llama al backend para obtener datos frescos usando el token
          const userData = await apiClient("/auth/me", { 
            headers: { Authorization: `Bearer ${token}` } 
          });
          setUser(userData);
      } catch (e) {
          console.error("Error al cargar usuario:", e);
          logout(); 
      }
  };

  // Opcional: Cargar usuario automáticamente al abrir la app
  useEffect(() => { loadUser(); }, []); 

  // --- 2. LOGOUT ---
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // --- 3. LOGIN ---
  const login = async (identifier, password) => {
      try {
          const response = await apiClient("/auth/login", { 
              method: 'POST',
              body: { identifier, password } 
          });

          localStorage.setItem("token", response.token); 
          setUser(response.user); 
          return { success: true };

      } catch (error) {
          return { success: false, message: error.message || "Error al iniciar sesión" };
      }
  };

  // --- 4. REGISTRO ---
  const register = async ({ name, identifier, email, password }) => {
      try {
          const response = await apiClient("/auth/register", { 
              method: 'POST',
              body: { name, identifier, email, password } 
          });

          localStorage.setItem("token", response.token); 
          setUser(response.user); 
          return { success: true };

      } catch (error) {
          return { success: false, message: error.message || "Error al registrarse" };
      }
  };

  // --- 5. ACTUALIZAR USUARIO (¡Esta es la que faltaba!) ---
  const updateUser = async (updatedData) => {
      try {
          // Enviamos los datos nuevos al backend (PUT)
          const response = await apiClient("/auth/update", { 
              method: 'PUT',
              body: updatedData 
          });
          
          // Actualizamos el estado local con la respuesta del backend
          setUser(response.user);
          return { success: true };
      } catch (error) {
          console.error("Error al actualizar:", error);
          return { success: false, message: error.message || "No se pudo actualizar el perfil" };
      }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout, login, register, loadUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);