import React from 'react';
import Nav from '../components/nav'; // Ajusta si tu ruta es diferente
import Cover from '../components/cover';

const Home = () => {
  return (
    <>
      <Nav />
      <Cover />
      <main className="home-main">
        <section className="home-hero">
          <h1>Bienvenido a MiApp</h1>
          <p>Esta es la página principal de tu sitio React.</p>
        </section>
      </main>
    </>
  );
};

export default Home;
