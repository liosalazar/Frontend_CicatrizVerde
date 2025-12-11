import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams es clave aquí
import "../styles/Login.css";

const ResetPasswordPage = () => {
  const { token } = useParams(); // Capturamos el token de la URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (newPassword !== confirmPassword) {
      setMsg("⚠️ Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      // LLAMADA AL BACKEND: Envía el token y la nueva contraseña
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "PUT", // O POST, depende de tu backend
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMsg("✅ Contraseña actualizada correctamente.");
        setTimeout(() => navigate("/login"), 2000); // Redirigir al login
      } else {
        setMsg(`⚠️ ${data.message || "El enlace ha expirado o es inválido."}`);
      }
    } catch (error) {
      setLoading(false);
      setMsg("⚠️ Error al conectar con el servidor.");
    }
  };

  return (
    <section className="login-section">
      <div className="login-card">
        
        <div className="login-header">
          <h2>Nueva Contraseña</h2>
          <p>Crea una contraseña segura para tu cuenta.</p>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label>Nueva contraseña</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Confirmar contraseña</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Repite la contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Guardando..." : "Cambiar Contraseña"}
          </button>

          {msg && (
            <div className={msg.includes("✅") ? "success-msg" : "error-msg"}>
              {msg}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ResetPasswordPage;