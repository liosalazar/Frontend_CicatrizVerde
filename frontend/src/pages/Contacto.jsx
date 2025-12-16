import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"; // <--- 1. IMPORTAMOS EL HOOK
import "../styles/Contacto.css";

const Contacto = () => {
  // Inicializamos el hook
  const { toast } = useToast(); // <--- 2. DESESTRUCTURAMOS

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

  const [isSubmitting, setIsSubmitting] = useState(false); // Simplifiqué 'estado' a un booleano solo para cargar

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 3. VALIDACIÓN CON TOAST (En lugar de alert)
    if (!formData.aceptarPolitica) {
      toast({
        variant: "destructive", // Se pone rojo
        title: "Campo requerido",
        description: "Debes aceptar la política de privacidad para continuar.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulación de fetch (Reemplaza con tu URL real cuando la tengas)
      // const response = await fetch("http://localhost:5000/api/contact", ...);
      
      // Simulo un delay para que veas el efecto de carga
      await new Promise((resolve) => setTimeout(resolve, 1500)); 
      
      // Asumimos éxito por ahora para probar
      const response = { ok: true }; 

      if (response.ok) {
        // 4. ÉXITO CON TOAST
        toast({
          title: "¡Mensaje enviado! 🌱",
          description: "Gracias por contactarnos. Te responderemos pronto.",
          // Puedes personalizar la clase si quieres verde: className: "bg-green-600 text-white"
        });

        // Limpiar formulario
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
        throw new Error("Error en el servidor");
      }
    } catch (error) {
      console.error(error);
      // 5. ERROR CON TOAST
      toast({
        variant: "destructive",
        title: "Error al enviar",
        description: "Hubo un problema. Por favor intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        
        {/* --- LADO IZQUIERDO --- */}
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
                <div className="method-item"><span className="icon">✉️</span> info@cicatrizverde.com</div>
                <div className="method-item"><span className="icon">💬</span> (+51) 971 444 716</div>
                <div className="method-item"><span className="icon">📞</span> (+511) 480 0078</div>
                <div className="method-item"><span className="icon">📍</span> Lima - Perú</div>
            </div>
        </div>

        {/* --- LADO DERECHO: Formulario --- */}
        <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Tu nombre" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type="text" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required placeholder="Tus apellidos" />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="ejemplo@empresa.com" />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="organizacion">Organización</label>
                        <input type="text" id="organizacion" name="organizacion" value={formData.organizacion} onChange={handleChange} placeholder="Empresa verde" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pais">País</label>
                        <select id="pais" name="pais" value={formData.pais} onChange={handleChange} required>
                            <option value="" disabled>—Elige una opción—</option>
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
                    <select id="motivo" name="motivo" value={formData.motivo} onChange={handleChange} required>
                        <option value="" disabled>—Elige una opción—</option>
                        <option value="Consulta General">Consulta General</option>
                        <option value="Servicios">Servicios</option>
                        <option value="Alianzas">Alianzas</option>
                        <option value="Soporte">Soporte</option>
                    </select>
                </div>

                <div className="checkbox-group">
                    <label>
                        <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} />
                        Deseo recibir las últimas novedades sobre sostenibilidad
                    </label>
                </div>
                
                <div className="checkbox-group">
                    <label>
                        <input type="checkbox" name="aceptarPolitica" checked={formData.aceptarPolitica} onChange={handleChange} />
                        <span>
                            Acepto la{" "}
                            <Link to="/privacy" target="_blank" rel="noopener noreferrer" style={{color: '#2ecc71', fontWeight: 'bold'}}>
                                Política de privacidad
                            </Link>
                        </span>
                    </label>
                </div>

                <div style={{ marginTop: '-5px', marginBottom: '20px', paddingLeft: '24px', fontSize: '0.8rem', color: '#888' }}>
                    Ver también:{" "}
                    <Link to="/terms" target="_blank" style={{color: '#888', textDecoration: 'underline'}}>Términos</Link> |{" "}
                    <Link to="/ethics" target="_blank" style={{color: '#888', textDecoration: 'underline'}}>Ética</Link>
                </div>

                {/* Botón con estado de carga */}
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar ➔"}
                </button>

                {/* ¡HEMOS ELIMINADO LOS MENSAJES DE TEXTO DE AQUÍ! */}
                {/* Ahora saldrán flotando gracias al Toaster */}

            </form>
        </div>

      </div>
    </section>
  );
};

export default Contacto;