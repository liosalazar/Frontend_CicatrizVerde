import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/EditProfile.css";

const EditProfilePage = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  // Estados locales para el formulario
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");

  // Estados para UX (Mensajes y Carga)
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Efecto para cargar los datos iniciales cuando 'user' esté disponible
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setIdentifier(user.identifier || "");
      setEmail(user.email || "");
      setPhoto(user.photo || "");
    }
  }, [user]);

  // Si no hay usuario, mostramos aviso (o podrías redirigir al login)
  if (!user) return <p>Cargando datos o no autorizado...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");       // Limpiar mensajes previos
    setLoading(true); // Bloquear botón

    // 1. Llamamos a la función del Contexto y ESPERAMOS (await) la respuesta
    const res = await updateUser({
      ...user, // Mantenemos otros datos que no estén en el formulario (como ID)
      name,
      identifier,
      email,
      photo, // Se envía como cadena Base64 (texto largo)
    });

    setLoading(false); // Desbloquear botón

    // 2. Verificamos si hubo éxito
    if (!res.success) {
      setMsg(res.message || "Error al actualizar perfil");
      return; // Detenemos la función, no navegamos
    }

    // 3. Si todo salió bien, mensaje de éxito y redirección
    setMsg("¡Perfil actualizado correctamente!");
    setTimeout(() => {
      navigate("/user-info");
    }, 1500); // Pequeña pausa para que el usuario lea el mensaje
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validación opcional de tamaño (ej. máx 2MB) para no saturar la base de datos
      if (file.size > 2 * 1024 * 1024) {
          alert("La imagen es muy pesada. Intenta con una menor a 2MB.");
          return;
      }

      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result); // Convierte imagen a texto Base64
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Editar Información</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        <label>DNI / Identificador</label>
        <input 
          value={identifier} 
          onChange={(e) => setIdentifier(e.target.value)} 
          required 
        />

        <label>Correo</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label>Foto de perfil</label>
        <input type="file" accept="image/*" onChange={handlePhotoChange} />

        {photo && (
          <div className="photo-preview">
            <p>Vista previa:</p>
            <img src={photo} alt="Preview" />
          </div>
        )}

        {/* Mensaje de estado */}
        {msg && (
            <p style={{ color: msg.includes("Error") ? "red" : "green", fontWeight: "bold" }}>
                {msg}
            </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;