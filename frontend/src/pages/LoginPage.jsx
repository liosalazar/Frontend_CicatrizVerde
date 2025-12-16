import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"; // <--- 1. IMPORTAR
import "../styles/Login.css";

const LoginPage = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast(); // <--- 2. INICIALIZAR

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  // const [msg, setMsg] = useState(""); // <--- ELIMINADO: Ya no lo necesitamos
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(identifier, password);

    setLoading(false);

    if (!res.success) {
      // 3. ERROR CON TOAST
      toast({
        variant: "destructive", // Se pone rojo automáticamente
        title: "Error de acceso",
        description: res.message || "Usuario o contraseña incorrectos.",
      });
      return;
    }

    // 4. ÉXITO (Opcional, pero se ve bien antes de redirigir)
    toast({
        title: "¡Bienvenido de nuevo! 👋",
        description: "Iniciando sesión...",
        className: "bg-green-600 text-white border-none",
    });

    navigate("/perfil");
  };

  return (
    <section className="login-section">
      <div className="login-card">
        
        {/* Encabezado */}
        <div className="login-header">
          <h2>¡Bienvenido!</h2>
          <p>Inicia sesión para gestionar tu impacto sostenible.</p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Input DNI/Correo */}
          <div className="input-group">
            <label htmlFor="identifier">Usuario</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                id="identifier"
                placeholder="DNI o correo electrónico"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Input Contraseña */}
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="password"
                placeholder="Tu contraseña segura"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div style={{textAlign: 'right', marginTop: '5px'}}>
               <Link to="/forgot-password" style={{fontSize: '0.8rem', color: '#888', textDecoration:'none'}}>
                 ¿Olvidaste tu contraseña?
               </Link>
            </div>
          </div>

          {/* Botón de Acción */}
          <button 
            type="submit" 
            className="btn-login" 
            disabled={loading}
          >
            {loading ? "Verificando..." : "Iniciar Sesión"}
          </button>

          {/* ELIMINADO: {msg && <div className="error-msg">⚠️ {msg}</div>} */}
        </form>

        {/* Pie de la tarjeta */}
        <div className="login-footer">
          <p>
            ¿Aún no tienes cuenta?{" "}
            <Link to="/register">Regístrate aquí</Link>
          </p>
          <div style={{marginTop: '10px'}}>
             <Link to="/" style={{color: '#999', fontSize: '0.85rem'}}>← Volver al inicio</Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LoginPage;