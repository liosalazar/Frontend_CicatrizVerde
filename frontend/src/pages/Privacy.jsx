import React from 'react';
import '../styles/LegalPage.css'; // Asegúrate de crear este CSS en el paso 3

const Privacy = () => {
  return (
    <div className="legal-page-container">
      <div className="legal-content-wrapper">
        <h1>Política de Privacidad</h1>
        <p><strong>Última actualización:</strong> 12 de mayo de 2025</p>
        
        <p>Su privacidad es importante para nosotros. Es política de <strong>Cicatriz Verde</strong> respetar su privacidad y cumplir con cualquier ley y regulación aplicable con respecto a cualquier información personal que podamos recopilar sobre usted.</p>
        
        <h3>1. Información que recopilamos</h3>
        <p>La información que recopilamos incluye tanto la información que nos proporciona consciente y activamente cuando utiliza o participa en cualquiera de nuestros servicios, como cualquier información enviada automáticamente por sus dispositivos.</p>
        
        <h3>2. Datos de registro</h3>
        <p>Cuando visita nuestro sitio web, nuestros servidores pueden registrar automáticamente los datos estándar proporcionados por su navegador web (Dirección IP, tipo de navegador, páginas visitadas, etc.).</p>
        
        <h3>3. Información personal</h3>
        <p>Podemos solicitar información personal que puede incluir: Nombre, Documento de identidad, Correo electrónico, Teléfono, País y Organización.</p>

        <h3>4. Uso de la información</h3>
        <p>Solo recopilamos y usamos su información personal cuando tenemos una razón legítima para hacerlo. Utilizamos sus datos para brindarle nuestros servicios, enviarle novedades (si lo autorizó) y mejorar nuestra plataforma.</p>

        <h3>5. Seguridad</h3>
        <p>Protegemos sus datos dentro de medios comercialmente aceptables para evitar pérdidas, robos y accesos no autorizados.</p>

        <br />
        <p><em>Si tienes más dudas, contáctanos a info@cicatrizverde.com</em></p>
      </div>
    </div>
  );
};

export default Privacy;