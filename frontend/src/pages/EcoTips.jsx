import React, { useEffect, useState } from "react";
import { ArrowLeft, Lightbulb, Zap, Droplets, Recycle, Leaf, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/EcoTips.css"; 

// Mapeo de Texto -> Componente (Porque la BD solo guarda texto)
const iconMap = {
  Zap: Zap,
  Droplets: Droplets,
  Recycle: Recycle,
  Leaf: Leaf,
  Lightbulb: Lightbulb
};

const EcoTips = () => {
  const navigate = useNavigate();
  const [tips, setTips] = useState([]); // Estado vacío al inicio
  const [loading, setLoading] = useState(true);

  // Cargar datos del Backend
  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await fetch("https://4ywtvryh4f.execute-api.us-east-2.amazonaws.com/dev/api/tips");
        const data = await res.json();
        
        if (data.success) {
          setTips(data.data); // Guardamos lo que vino de la DB
        }
      } catch (error) {
        console.error("Error cargando tips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  // Helpers de estilo (Igual que antes)
  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-100";
      case "Medio": return "bg-yellow-100";
      case "Difícil": return "bg-red-100";
      default: return "bg-gray-100";
    }
  };

  const getColorClass = (category) => {
     // Asignamos color según categoría automáticamente
     if (category === 'Energía') return 'bg-yellow-100';
     if (category === 'Agua') return 'bg-blue-100';
     if (category === 'Residuos') return 'bg-green-100';
     if (category === 'Transporte') return 'bg-emerald-100';
     return 'bg-gray-100';
  };

  const getImpactStars = (impact) => {
    const count = impact === "Alto" ? 3 : impact === "Medio" ? 2 : 1;
    return Array.from({ length: count }, (_, i) => (
      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" style={{ fill: '#f1c40f', color: '#f1c40f' }} />
    ));
  };

  return (
    <div className="eco-tips-page">
      {/* Header */}
      <div className="tips-header-container">
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
                onClick={() => navigate("/servicios")} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#666', marginRight: '20px' }}
            >
                <ArrowLeft size={20} style={{ marginRight: '5px' }} /> Volver
            </button>
            <div className="tips-title">
                <Lightbulb size={28} style={{ color: '#2ecc71' }} />
                <span>Consejos de Ecoeficiencia</span>
            </div>
        </div>
      </div>

      <main>
        <div className="tips-intro">
          <h2>Recomendaciones Personalizadas</h2>
          <p>Implementa estas acciones sostenibles adaptadas a pequeñas y medianas empresas</p>
        </div>

        {/* Loading State */}
        {loading ? (
            <p style={{textAlign: 'center', fontSize: '1.2rem', color: '#666'}}>Cargando consejos...</p>
        ) : (
            <>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div>
                      <p className="stat-label">Ahorro Potencial</p>
                      <p className="stat-value">S/ 1,200+</p>
                    </div>
                    <div className="stat-icon"><Leaf size={24} /></div>
                  </div>
                  <div className="stat-card">
                    <div>
                      <p className="stat-label">Consejos Disponibles</p>
                      <p className="stat-value">{tips.length}</p>
                    </div>
                    <div className="stat-icon"><Lightbulb size={24} /></div>
                  </div>
                  <div className="stat-card">
                     <div>
                      <p className="stat-label">Implementación Fácil</p>
                      <p className="stat-value">70%</p>
                    </div>
                    <div className="stat-icon"><Star size={24} /></div>
                  </div>
                </div>

                <div className="tips-grid">
                  {tips.map((tip) => {
                    // Resolvemos el icono y el color dinámicamente
                    const IconComponent = iconMap[tip.icon_name] || Lightbulb;
                    const colorClass = getColorClass(tip.category);

                    return (
                        <div key={tip.id} className="tip-card">
                          <div className="tip-header">
                            <div className="tip-top-row">
                              <div className={`tip-icon-box ${colorClass}`}>
                                <IconComponent size={24} />
                              </div>
                              <div style={{ display: 'flex', gap: '2px' }}>
                                {getImpactStars(tip.impact)}
                              </div>
                            </div>
                            <h3 className="tip-title">{tip.title}</h3>
                            <p className="tip-desc">{tip.description}</p>
                          </div>

                          <div className="tip-content">
                            <div className="badge-container">
                                <span className={`badge ${colorClass}`}>{tip.category}</span>
                                <span className={`badge ${getDifficultyClass(tip.difficulty)}`}>{tip.difficulty}</span>
                            </div>
                            
                            <div className="savings-box">
                                💰 Ahorro estimado: {tip.savings}
                            </div>

                            <button className="btn-tip">
                                Ver detalles
                            </button>
                          </div>
                        </div>
                    );
                  })}
                </div>
            </>
        )}

        <div className="cta-card">
            <h3 className="cta-title">¿Necesitas consejos más específicos?</h3>
            <p style={{marginBottom: '20px', color: '#555'}}>Nuestro equipo puede ayudarte con recomendaciones personalizadas para tu sector</p>
            <button className="btn-cta">Solicitar consultoría</button>
        </div>

      </main>
    </div>
  );
};

export default EcoTips;