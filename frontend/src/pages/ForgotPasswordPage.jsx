import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"; // <--- Importamos Toast
import "../styles/Login.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast(); // <--- Inicializamos Toast

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Asegúrate de que la URL coincida con tu ruta en el backend
      const response = await fetch("https://4ywtvryh4f.execute-api.us-east-2.amazonaws.com/dev/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        // ÉXITO (Status 200 del Backend)
        toast({
          title: "¡Correo enviado! 📧",
          description: data.message || "Revisa tu bandeja de entrada.",
          className: "bg-green-600 text-white border-none",
        });
        setEmail(""); // Limpiar el campo
      } else {
        // ERROR (Status 400 del Backend)
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message || "No se pudo procesar la solicitud.",
        });
      }
    } catch (error) {
      setLoading(false);
      // ERROR DE RED (Backend apagado o URL mal escrita)
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: "No se pudo contactar con el servidor.",
      });
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
        </form>

        <div className="login-footer">
          <Link to="/login">← Volver al inicio de sesión</Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;