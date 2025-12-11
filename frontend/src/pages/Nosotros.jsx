import React, { useState } from "react";
import "../styles/Nosotros.css"; 

const Personas = [
  {
    nombre: "Gabriel Matias Vargas Galvez",
    cargo: "CEO & Fundador",
    descripcion: "Ingeniero Ambiental por la UPN. Lidera la visión estratégica y el compromiso de Cicatriz Verde hacia un futuro sostenible.",
    imagen: "/equipo/Matias_Vargas.png", 
    link: "https://www.linkedin.com/in/gamavaga"
  },
  {
    nombre: "Cristhian Pacheco Rincón",
    cargo: "Co-Founder & COO",
    descripcion: "Estudiante de Ingeniería Ambiental especializado en Gestión, Monitoreo Ambiental y SSOMA. Encargado de las operaciones.",
    imagen: "/equipo/Cristhian_Pacheco.png", 
    link: "https://www.linkedin.com/in/cristhian-pacheco-rincón-"
  }
];

const TabNosotros = () => (
  <div className="contenido-tab fade-in intro-box">
    <h3>¿Quiénes somos?</h3>
    <p>Somos Cicatriz Verde, una organización dedicada a sanar los ecosistemas...</p>
  </div>
);

const TabProposito = () => (
  <div className="contenido-tab fade-in">
    <h3>Nuestro Propósito</h3>
    <p>Nuestra misión es transformar la huella humana en un impacto positivo...</p>
    <div className="proposito-box">
      <div className="proposito-item">
          <h4>Misión</h4>
          <p>Restaurar, educar y conservar.</p>
      </div>
      <div className="proposito-item">
          <h4>Visión</h4>
          <p>Ser referentes en sostenibilidad en Latinoamérica.</p>
      </div>
    </div>
  </div>
);

const TabImpacto = () => (
  <div className="contenido-tab fade-in">
    <h3>Nuestro Impacto</h3>
    <div className="stats-grid">
      <div className="stat-card">
        <h2>+500</h2>
        <p>Árboles plantados</p>
      </div>
      <div className="stat-card">
        <h2>+20</h2>
        <p>Proyectos Ejecutados</p>
      </div>
      <div className="stat-card">
        <h2>100%</h2>
        <p>Compromiso</p>
      </div>
    </div>
  </div>
);

const TabEquipo = () => (
  <div className="contenido-tab fade-in">
    <div className="personas-container">
      {Personas.map((persona, index) => (
        <div className="persona-card" key={index}>
          <div className="img-wrapper">
            <img 
              src={persona.imagen} 
              alt={persona.nombre} 
              className="persona-img"
              onError={(e) => {e.target.src = `https://ui-avatars.com/api/?name=${persona.nombre}&background=random`}} 
            />
          </div>
          <div className="card-content">
            <h3>{persona.nombre}</h3>
            <span className="cargo">{persona.cargo}</span>
            <p className="descripcion">{persona.descripcion}</p>
            <a href={persona.link} target="_blank" rel="noopener noreferrer" className="linkedin-btn">
              Ver LinkedIn ↗
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Nosotros = () => {
  const [seccionActiva, setSeccionActiva] = useState("nosotros");

  const SECCIONES = {
    nosotros: <TabNosotros />,
    proposito: <TabProposito />,
    equipo: <TabEquipo />,
    impacto: <TabImpacto />
  };

  return (
    <section className="nosotros-section">
      <div className="nosotros-tabs"
      style={{ marginBottom: "2rem" }}>
        <button 
            className={seccionActiva === "nosotros" ? "active" : ""} 
            onClick={() => setSeccionActiva("nosotros")}>
            Nosotros
        </button>
        <button 
            className={seccionActiva === "proposito" ? "active" : ""} 
            onClick={() => setSeccionActiva("proposito")}>
            Nuestro Propósito
        </button>
        <button 
            className={seccionActiva === "equipo" ? "active" : ""} 
            onClick={() => setSeccionActiva("equipo")}>
            Nuestro Equipo
        </button>
        <button 
            className={seccionActiva === "impacto" ? "active" : ""} 
            onClick={() => setSeccionActiva("impacto")}>
            Nuestro Impacto
        </button>
      </div>

      <div className="nosotros-body">
        {SECCIONES[seccionActiva]}
      </div>
    </section>
  );
};

export default Nosotros;
