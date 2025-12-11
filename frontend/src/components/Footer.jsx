import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

// Importamos íconos de redes sociales
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaLeaf, FaTiktok, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* COLUMNA 1: MARCA Y DESCRIPCIÓN */}
        <div className="footer-section about">
          <h2 className="footer-logo">
            <FaLeaf className="footer-icon" /> Cicatriz Verde
          </h2>
          <p>
            Ayudamos a personas y empresas a medir, reducir y compensar su huella de carbono. 
            Juntos por un futuro más sostenible.
          </p>
          <div className="socials">
            <a href="https://wa.me/51936143559" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
            <a href="https://www.tiktok.com/@cicatrizverde.pe" target="_blank" rel="noreferrer"><FaTiktok /></a>
            <a href="https://www.instagram.com/cicatrizverde.pe" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com/company/cicatriz-verde/" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* COLUMNA 2: ENLACES RÁPIDOS */}
        <div className="footer-section links">
          <h3>Explorar</h3>
          <ul>
            <li><Link to="/servicios">Nuestros Servicios</Link></li>
            <li><Link to="/proyectos">Proyectos</Link></li>
            <li><Link to="/noticias">Noticias Ambientales</Link></li>
            <li><Link to="/nosotros">Quiénes Somos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* COLUMNA 3: LEGAL Y CUENTA */}
        <div className="footer-section links">
          <h3>Ayuda & Cuenta</h3>
          <ul>
            <li><Link to="/login">Iniciar Sesión</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
            <li><Link to="/privacy">Política de Privacidad</Link></li>
            <li><Link to="/terms">Términos y Condiciones</Link></li>
          </ul>
        </div>

        {/* COLUMNA 4: BOLETÍN */}
        <div className="footer-section newsletter">
          <h3>Únete al cambio</h3>
          <p>Recibe consejos para reducir tu huella semanalmente.</p>
          <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Tu correo electrónico..." required />
            <button type="submit">Suscribirse</button>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Copyright Cicatriz Verde. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;