import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"; // <--- 1. IMPORTAR

const CreateUserPage = () => {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast(); // <--- 2. INICIALIZAR

  const [formData, setFormData] = useState({
    name: "",
    dni: "",
    age: "",
    country: "",
    department: "",
  });

  // Solo necesitamos estado de carga, el 'msg' se va porque usamos Toasts
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name.trim() || !formData.dni.trim()) {
        toast({
            variant: "destructive", // Rojo para errores
            title: "Datos faltantes",
            description: "El Nombre y DNI son obligatorios.",
        });
        return;
    }

    setLoading(true);

    // 1. Llamada al Backend
    const res = await updateUser({
        name: formData.name,
        identifier: formData.dni,
        age: formData.age,
        country: formData.country,
        department: formData.department
    });

    setLoading(false);

    // 2. Verificar error
    if (!res.success) {
        toast({
            variant: "destructive",
            title: "Error",
            description: res.message || "No se pudo guardar el perfil.",
        });
        return;
    }

    // 3. Éxito
    toast({
        title: "¡Perfil completado! 🎉",
        description: "Tus datos se han guardado correctamente.",
        className: "bg-green-600 text-white border-none", // Opcional: Para darle un toque verde
    });

    setTimeout(() => {
        navigate("/dashboard");
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

        {/* --- YA NO NECESITAMOS EL PÁRRAFO DE {msg} AQUÍ --- */}

        <button 
            type="submit" 
            disabled={loading} 
            style={{ 
                marginTop: "10px", 
                padding: "10px 20px", 
                cursor: loading ? "not-allowed" : "pointer",
                width: "100%",
                backgroundColor: loading ? "#ccc" : "#2ecc71", // Un toque visual simple
                color: "white",
                border: "none",
                borderRadius: "4px"
            }}
        >
          {loading ? "Guardando..." : "Guardar Datos"}
        </button>
      </form>
    </div>
  );
};

export default CreateUserPage;