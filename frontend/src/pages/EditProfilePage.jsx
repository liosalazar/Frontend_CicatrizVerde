import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
// 1. Importamos el hook que acabamos de crear/traducir
import { useToast } from "../hooks/use-toast"; 
import "../styles/EditProfile.css";

const EditProfilePage = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  // 2. Inicializamos el toast
  const { toast } = useToast(); 

  // Estados locales para el formulario
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");

  // Estado de carga (ya no necesitamos 'msg')
  const [loading, setLoading] = useState(false);

  // Efecto para cargar los datos iniciales
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setIdentifier(user.identifier || "");
      setEmail(user.email || "");
      setPhoto(user.profile_picture || user.photo || "");
    }
  }, [user]);

  if (!user) return <p>Cargando datos o no autorizado...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Bloquear botón

    const res = await updateUser({
      ...user,
      name,
      identifier,
      email,
      profile_picture: photo,
    });

    setLoading(false); // Desbloquear botón

    // 3. Verificamos si hubo éxito (Con Toast Rojo)
    if (!res.success) {
      toast({
        variant: "destructive", // Esto hace que salga rojo (si tienes los estilos de shadcn)
        title: "Error al actualizar",
        description: res.message || "Hubo un problema, intenta de nuevo.",
      });
      return; 
    }

    // 4. Éxito (Con Toast Normal/Verde)
    toast({
      title: "¡Perfil Actualizado!",
      description: "Tus datos se han guardado correctamente.",
      duration: 3000, // Dura 3 segundos
    });

    setTimeout(() => {
      navigate("/perfil"); // Ajusta esta ruta si tu perfil está en "/user-info"
    }, 1500); 
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
          // También podemos usar toast para validaciones
          toast({
            variant: "destructive",
            title: "Archivo muy pesado",
            description: "La imagen debe pesar menos de 2MB.",
          });
          return;
      }

      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result); 
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
            <img src={photo} alt="Preview" style={{ maxWidth: '150px', borderRadius: '10px' }}/>
          </div>
        )}

        {/* Ya borramos el párrafo <p>{msg}</p> porque ahora salen flotando */}

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;