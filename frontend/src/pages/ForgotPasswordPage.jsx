import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css"; // Reutilizamos estilos

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      // LLAMADA AL BACKEND: Pide enviar el correo de recuperación
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMsg("✅ Se ha enviado un enlace de recuperación a tu correo.");
      } else {
        setMsg(`⚠️ ${data.message || "Error al solicitar recuperación"}`);
      }
    } catch (error) {
      setLoading(false);
      setMsg("⚠️ Error de conexión con el servidor.");
    }
  };

  return (
    <section className="login-section">
      <div className="login-card">
        
        <div className="login-header">
          <h2>Recuperar Contraseña</h2>
          <p>Ingresa tu correo y te enviaremos instrucciones.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="Correo registrado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Enlace"}
          </button>

          {/* Mensajes de Feedback */}
          {msg && (
            <div className={msg.includes("✅") ? "success-msg" : "error-msg"}>
              {msg}
            </div>
          )}
        </form>

        <div className="login-footer">
          <Link to="/login">← Volver al inicio de sesión</Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;