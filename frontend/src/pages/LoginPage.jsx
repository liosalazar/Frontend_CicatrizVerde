import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom"; // Importamos Link para navegar
import "../styles/Login.css"; // Asegúrate de importar el CSS

const LoginPage = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    const res = await login(identifier, password);

    setLoading(false);

    if (!res.success) {
      setMsg(res.message);
      return;
    }

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
              <span className="input-icon">👤</span> {/* O usa <i className="fas fa-user"></i> */}
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
              <span className="input-icon">🔒</span> {/* O usa <i className="fas fa-lock"></i> */}
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

          {/* Mensaje de Error */}
          {msg && <div className="error-msg">⚠️ {msg}</div>}
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