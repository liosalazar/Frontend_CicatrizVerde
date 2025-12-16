import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"; // <--- 1. IMPORTAR
import "../styles/Login.css";

const RegisterPage = () => {
  const { register } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast(); // <--- 2. INICIALIZAR

  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [msg, setMsg] = useState(""); // <--- ELIMINADO
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await register({
      name,
      identifier,
      email,
      password
    });

    setLoading(false);

    if (!res.success) {
      // 3. ERROR CON TOAST
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: res.message || "No se pudo crear la cuenta.",
      });
      return;
    }

    // 4. ÉXITO CON TOAST
    toast({
      title: "¡Cuenta creada! 🎉",
      description: "Bienvenido a la comunidad de Cicatriz Verde.",
      className: "bg-green-600 text-white border-none",
    });

    setTimeout(() => {
        navigate("/perfil");
    }, 1500);
  };

  return (
    <section className="login-section">
      <div className="login-card">
        
        {/* Encabezado */}
        <div className="login-header">
          <h2>Crear Cuenta</h2>
          <p>Únete a la comunidad de Cicatriz Verde.</p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Input Nombre */}
          <div className="input-group">
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Input DNI */}
          <div className="input-group">
            <div className="input-wrapper">
              <span className="input-icon">🪪</span>
              <input
                type="text"
                placeholder="DNI o identificador"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Input Email */}
          <div className="input-group">
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Input Password */}
          <div className="input-group">
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Botón */}
          <button 
            type="submit" 
            className="btn-login" 
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarme"}
          </button>

          {/* ELIMINADO: El bloque {msg && ...} ya no es necesario */}

        </form>

        {/* Footer para ir al Login */}
        <div className="login-footer">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </div>

      </div>
    </section>
  );
};

export default RegisterPage;