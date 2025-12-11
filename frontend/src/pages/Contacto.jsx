import React, { useState } from "react";
import { Link } from "react-router-dom"; // Asegúrate de tener esto importado
import "../styles/Contacto.css";

const Contacto = () => {
  // 1. ESTADO (Lógica)
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    organizacion: "",
    pais: "",
    motivo: "",
    newsletter: false,
    aceptarPolitica: false,
  });

  const [estado, setEstado] = useState(null); // null, 'enviando', 'exito', 'error'

  // 2. MANEJADOR DE CAMBIOS (Lógica)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 3. ENVÍO DEL FORMULARIO (Lógica)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.aceptarPolitica) {
      alert("Debes aceptar la política de privacidad.");
      return;
    }

    setEstado("enviando");

    try {
      // Ajusta la URL a tu backend real
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setEstado("exito");
        setFormData({
          nombre: "",
          apellidos: "",
          email: "",
          organizacion: "",
          pais: "",
          motivo: "",
          newsletter: false,
          aceptarPolitica: false,
        });
      } else {
        setEstado("error");
      }
    } catch (error) {
      console.error(error);
      setEstado("error");
    }
  };

  // 4. RENDERIZADO
  return (
    <section className="contact-section">
      <div className="contact-container">
        
        {/* --- LADO IZQUIERDO: Información Rica --- */}
        <div className="contact-info">
            <span className="breadcrumb">Cicatriz Verde {'>'} <span className="active">Contacto</span></span>
            
            <h1>¡Solo unidos lograremos el cambio!</h1>
            <p>
              Ponte en contacto con nuestros expertos si tienes alguna duda, 
              quieres más información sobre nuestros servicios o te interesa formar 
              parte de nuestro equipo.
            </p>
            <p>Te responderemos tan pronto como sea posible.</p>

            <button className="btn-agendar" type="button">Agendar ahora ↗</button>

            <div className="contact-methods">
                <div className="method-item">
                    <span className="icon">✉️</span> info@cicatrizverde.com
                </div>
                <div className="method-item">
                    <span className="icon">💬</span> (+51) 971 444 716
                </div>
                <div className="method-item">
                    <span className="icon">📞</span> (+511) 480 0078
                </div>
                <div className="method-item">
                    <span className="icon">📍</span> Lima - Perú
                </div>
            </div>
        </div>

        {/* --- LADO DERECHO: Formulario Funcional --- */}
        <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text" 
                            id="nombre"
                            name="nombre" 
                            value={formData.nombre} 
                            onChange={handleChange} 
                            required 
                            placeholder="Tu nombre" 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input 
                            type="text" 
                            id="apellidos"
                            name="apellidos" 
                            value={formData.apellidos} 
                            onChange={handleChange} 
                            required 
                            placeholder="Tus apellidos" 
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        placeholder="ejemplo@empresa.com" 
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="organizacion">Organización</label>
                        <input 
                            type="text" 
                            id="organizacion"
                            name="organizacion" 
                            value={formData.organizacion} 
                            onChange={handleChange} 
                            placeholder="Empresa verde" 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pais">País</label>
                        <select 
                            id="pais"
                            name="pais" 
                            value={formData.pais} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="" disabled>—Por favor, elige una opción—</option>
                            <option value="Perú">Perú</option>
                            <option value="México">México</option>
                            <option value="Colombia">Colombia</option>
                            <option value="España">España</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="motivo">Motivo</label>
                    <select 
                        id="motivo"
                        name="motivo" 
                        value={formData.motivo} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="" disabled>—Por favor, elige una opción—</option>
                        <option value="Consulta General">Consulta General</option>
                        <option value="Servicios">Servicios</option>
                        <option value="Alianzas">Alianzas</option>
                        <option value="Soporte">Soporte</option>
                    </select>
                </div>

                <div className="checkbox-group">
                    <label>
                        <input 
                            type="checkbox" 
                            name="newsletter" 
                            checked={formData.newsletter} 
                            onChange={handleChange} 
                        />
                        Deseo recibir las últimas novedades sobre sostenibilidad
                    </label>
                </div>
                
                {/* --- AQUÍ ESTÁ EL CAMBIO CLAVE --- */}
                <div className="checkbox-group">
                    <label>
                        <input 
                            type="checkbox" 
                            name="aceptarPolitica" 
                            checked={formData.aceptarPolitica} 
                            onChange={handleChange} 
                            required 
                        />
                        <span>
                            Acepto la{" "}
                            {/* Usamos Link con target blank para no perder los datos del form */}
                            <Link 
                                to="/privacy" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{color: '#2ecc71', fontWeight: 'bold'}}
                            >
                                Política de privacidad
                            </Link>
                        </span>
                    </label>
                </div>

                {/* Enlaces adicionales (Opcional, pero recomendado si tienes /terms) */}
                <div style={{ marginTop: '-5px', marginBottom: '20px', paddingLeft: '24px', fontSize: '0.8rem', color: '#888' }}>
                    Ver también:{" "}
                    <Link to="/terms" target="_blank" style={{color: '#888', textDecoration: 'underline'}}>Términos</Link> |{" "}
                    <Link to="/ethics" target="_blank" style={{color: '#888', textDecoration: 'underline'}}>Ética</Link>
                </div>

                <button type="submit" className="btn-submit" disabled={estado === "enviando"}>
                    {estado === "enviando" ? "Enviando..." : "Enviar ➔"}
                </button>

                {/* Mensajes de feedback */}
                {estado === "exito" && <p className="msg-success">¡Mensaje enviado correctamente! 🌱</p>}
                {estado === "error" && <p className="msg-error">Hubo un error. Inténtalo de nuevo.</p>}
            </form>
        </div>

      </div>
    </section>
  );
};

export default Contacto;