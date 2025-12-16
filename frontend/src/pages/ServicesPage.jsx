import React from "react";
import { Link } from "react-router-dom";
import { Calculator, Lightbulb, Recycle, FileBarChart } from "lucide-react";
import "../styles/Services.css"; // Crearemos este CSS ahora

const ServicesPage = () => {
  return (
    <div className="services-container">
      <header className="services-header">
        <h1>Nuestros Servicios</h1>
        <p>Herramientas diseñadas para potenciar tu sostenibilidad.</p>
      </header>

      <section className="services-grid">
        <h2 className="section-title">Accesos Rápidos</h2>
        
        <div className="cards-wrapper">
          {/* 1. CALCULADORA (La Estrella) */}
          <div className="service-card featured">
            <div className="icon-wrapper">
              <Calculator size={48} />
            </div>
            <h3>Calculadora de Huella de Carbono</h3>
            <p>Calcula las emisiones de tu empresa basándote en energía, agua y transporte.</p>
            <Link to="/calcular" className="btn-access primary">
              Acceder ➔
            </Link>
          </div>

          {/* 2. Consejos */}
          <div className="service-card">
            <div className="icon-wrapper">
              <Lightbulb size={40} />
            </div>
            <h3>Consejos de Ecoeficiencia</h3>
            <p>Recomendaciones personalizadas para reducir tu consumo y ahorrar costos.</p>
            <Link to="/consejos" className="btn-access">
              Acceder ➔
            </Link>
          </div>

          {/* 3. Residuos */}
          <div className="service-card">
            <div className="icon-wrapper">
              <Recycle size={40} />
            </div>
            <h3>Gestión de Residuos</h3>
            <p>Guías interactivas de segregación, reciclaje y economía circular.</p>
            <Link to="/residuos" className="btn-access">
              Acceder ➔
            </Link>
          </div>

          {/* 4. Reportes */}
          <div className="service-card">
            <div className="icon-wrapper">
              <FileBarChart size={40} />
            </div>
            <h3>Reportes Ambientales</h3>
            <p>Genera informes detallados en PDF listos para auditorías y certificaciones.</p>
            <Link to="/reportes" className="btn-access">
              Acceder ➔
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;