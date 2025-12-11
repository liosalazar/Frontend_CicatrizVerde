import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom"; // Para redirigir al terminar

const CreateUserPage = () => {
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dni: "",
    age: "",
    country: "",
    department: "",
  });

  // Estados para feedback visual
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    
    // Validación básica
    if (!formData.name.trim() || !formData.dni.trim()) {
        setMsg("Nombre y DNI son obligatorios.");
        return;
    }

    setLoading(true); // Bloquear botón

    // 1. Llamada al Backend (esperamos respuesta)
    // Nota: 'dni' se mapeará a 'identifier' en el backend si así lo decides
    const res = await updateUser({
        name: formData.name,
        identifier: formData.dni, // Unificamos nombres con la DB
        age: formData.age,
        country: formData.country,
        department: formData.department
    });

    setLoading(false); // Desbloquear botón

    // 2. Verificar error
    if (!res.success) {
        setMsg(res.message || "Error al guardar los datos.");
        return;
    }

    // 3. Éxito
    setMsg("¡Perfil completado con éxito!");
    setTimeout(() => {
        navigate("/dashboard"); // Redirigir al Dashboard
    }, 1500);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h1>Completar Perfil</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
        />

        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={formData.dni}
          onChange={handleChange}
          maxLength={12}
          required
          style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
        />

        <input
          type="number"
          name="age"
          placeholder="Edad"
          value={formData.age}
          onChange={handleChange}
          min={1}
          max={120}
          required
          style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
        />

        <input
          type="text"
          name="country"
          placeholder="País"
          value={formData.country}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
        />

        <input
          type="text"
          name="department"
          placeholder="Departamento / Región"
          value={formData.department}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
        />

        {msg && (
            <p style={{ color: msg.includes("éxito") ? "green" : "red", fontWeight: "bold" }}>
                {msg}
            </p>
        )}

        <button 
            type="submit" 
            disabled={loading} 
            style={{ marginTop: "10px", padding: "10px 20px", cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Guardando..." : "Guardar Datos"}
        </button>
      </form>
    </div>
  );
};

export default CreateUserPage;