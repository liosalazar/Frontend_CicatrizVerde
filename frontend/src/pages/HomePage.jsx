import React from "react";
import { useUser } from "../context/UserContext";
import "../styles/HomePage.css";

const HomePage = () => {
  const { user } = useUser();

  const renderGuest = () => (
    <div className="home-container">
      <h1>Bienvenido a Cicatriz Verde</h1>
      <p>
        Este proyecto nace con la idea de sanar lo que el mundo ha ido perdiendo,
        sembrando tecnología, conciencia y acción real.
      </p>
      <p>
        Para continuar, inicia sesión o crea una cuenta y únete al cambio.
      </p>
    </div>
  );

  const renderUser = () => (
    <div className="home-container">
      <h1>Bienvenido, {user.name}</h1>
      <p>
        Gracias por sumarte a Cicatriz Verde.
        Cada acción que realizas aquí aporta un granito de esperanza (verde, por
        supuesto) al planeta.
      </p>
      <p>
        Explora tus proyectos, revisa tu impacto y sigue dejando huella… pero
        una huella que se borra sola, como debe ser.
      </p>
    </div>
  );

  // ENVUELVE EL RESULTADO EN UNA SECCIÓN
  return (
    <section className="home-section">
      {user ? renderUser() : renderGuest()}
    </section>
  );
};

export default HomePage;