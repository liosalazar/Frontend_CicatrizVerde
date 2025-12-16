import React, { useEffect, useState } from "react";
import { ArrowLeft, Recycle, Trash2, AlertCircle, CheckCircle, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/WasteManagement.css";

const WasteManagement = () => {
  const navigate = useNavigate();
  const [wasteTypes, setWasteTypes] = useState([]); // Estado vacío
  const [loading, setLoading] = useState(true);

  // --- CARGAR DATOS DE LA BD ---
  useEffect(() => {
    const fetchWasteTypes = async () => {
      try {
        const res = await fetch("https://4ywtvryh4f.execute-api.us-east-2.amazonaws.com/dev/api/waste/types");
        const data = await res.json();
        if (data.success) {
          setWasteTypes(data.data);
        }
      } catch (error) {
        console.error("Error cargando tipos de residuos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWasteTypes();
  }, []);

  // (El resto de datos estáticos como 'regulations' y 'processSteps' los dejamos igual 
  // porque raramente cambian, pero podrías hacer lo mismo con ellos si quisieras).
  
  const processSteps = [
    { step: 1, title: "Segregación en Origen", description: "Separa los residuos en contenedores identificados por colores", icon: Trash2 },
    { step: 2, title: "Almacenamiento Temporal", description: "Guarda los residuos en áreas designadas hasta su recolección", icon: AlertCircle },
    { step: 3, title: "Recolección Selectiva", description: "Programa la recolección con gestores autorizados", icon: Recycle },
    { step: 4, title: "Valorización", description: "Los residuos se procesan para crear nuevos productos", icon: CheckCircle }
  ];

  const regulations = [
    { title: "Ley de Gestión Integral de Residuos", description: "Decreto Legislativo N° 1278 - Marco normativo principal", compliance: "Obligatorio" },
    { title: "Plan de Manejo de Residuos", description: "Documento técnico para grandes generadores", compliance: "Requerido >150kg/día" },
    { title: "Manifiesto de Residuos", description: "Registro de residuos peligrosos generados", compliance: "Residuos peligrosos" }
  ];

  return (
    <div className="waste-page">
      <header className="waste-header">
        <div className="header-content">
          <button 
            onClick={() => navigate("/servicios")} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#666', marginRight: '20px' }}
          >
            <ArrowLeft size={20} style={{ marginRight: '5px' }} /> Volver
          </button>
          <div className="waste-title">
            <Recycle size={28} style={{ color: '#2ecc71' }} />
            <span>Gestión de Residuos</span>
          </div>
        </div>
      </header>

      <main className="waste-container">
        <div className="waste-intro">
          <h2>Guía Completa de Gestión de Residuos</h2>
          <p>Aprende a segregar, valorizar y cumplir con la normativa ambiental peruana.</p>
        </div>

        {/* --- SECCIÓN DINÁMICA (VIENE DE BD) --- */}
        <div className="waste-card">
          <h3 className="card-title">Tipos de Residuos y Segregación</h3>
          <p className="card-desc">Identifica correctamente cada tipo de residuo para una segregación efectiva.</p>
          
          {loading ? (
            <p>Cargando información de residuos...</p>
          ) : (
            <div className="waste-types-grid">
                {wasteTypes.map((waste) => {
                // Convertimos el string "Papel,Cartón" en array ["Papel", "Cartón"]
                const itemsList = waste.items ? waste.items.split(',') : [];

                return (
                    <div key={waste.id} className="type-card">
                        <div className="type-header">
                            <div className={`type-icon ${waste.color_class}`}>
                            {waste.icon}
                            </div>
                            <h4 style={{margin:0, fontWeight: 600}}>{waste.name}</h4>
                        </div>
                        
                        <ul className="type-list">
                            {itemsList.map((item, i) => (
                            <li key={i}>• {item.trim()}</li>
                            ))}
                        </ul>
                        
                        <div className="tip-box">
                            💡 {waste.tips}
                        </div>
                    </div>
                );
                })}
            </div>
          )}
        </div>

        {/* El resto sigue igual... */}
        <div className="waste-card">
          <h3 className="card-title">Proceso de Gestión</h3>
          <p className="card-desc">Sigue estos pasos para una gestión integral efectiva.</p>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <div key={index}>
                <div className="step-circle"><step.icon size={32} /></div>
                <div className="step-number">{step.step}</div>
                <h4 style={{marginBottom: '5px', fontWeight: 600}}>{step.title}</h4>
                <p style={{fontSize: '0.9rem', color: '#666'}}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lower-section">
          <div className="waste-card">
            <h3 className="card-title">Cumplimiento Normativo</h3>
            <p className="card-desc">Principales regulaciones que debes conocer.</p>
            {regulations.map((reg, index) => (
              <div key={index} className="reg-item">
                <div className="reg-header">
                  <h4 style={{margin:0, fontSize: '0.95rem'}}>{reg.title}</h4>
                  <span className="reg-badge">{reg.compliance}</span>
                </div>
                <p style={{margin:0, fontSize: '0.85rem', color: '#666'}}>{reg.description}</p>
              </div>
            ))}
          </div>

          <div className="waste-card">
            <h3 className="card-title">Herramientas Útiles</h3>
            <p className="card-desc">Recursos para implementar tu plan de gestión.</p>
            <button className="btn-download-long" onClick={() => alert('Descargando plantilla...')}>
              <Download size={18} /> Descargar plantilla de segregación
            </button>
            {/* ... botones ... */}
            <div className="help-box">
              <h4 style={{marginTop:0, color: '#166534'}}>¿Necesitas ayuda personalizada?</h4>
              <button className="btn-contact">Contactar especialista</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WasteManagement;