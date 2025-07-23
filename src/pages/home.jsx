import React from 'react';
import Nav from '../components/nav';
import Cover from '../components/cover';
import Ubicacion from '../components/Ubicacion';
import Tienda from '../components/tienda-home';
import EContact from '../components/contactanos';
import '../styles/home.css'; // Asegúrate de importar el CSS

const Home = () => {
  return (
    <main className="home-main">
      <div className="gradient-container">
        <div className="gradient-background" />
        <div className="gradient-content">
          <Nav />
          <Cover />
          <Tienda />
          <EContact />
          <Ubicacion />
        </div>
      </div>
    </main>
  );
};

export default Home;
