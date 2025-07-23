import React from 'react';
import '../styles/cover.css';
import Cover1 from '../assets/cover1.jpg';
import { Link } from 'react-router-dom';

const Cover = () => {
  const scrollToContacto = () => {
    const contacto = document.getElementById('contactanos');
    if (contacto) {
      const yOffset = -100; // Ajusta este valor según lo que necesites
      const y = contacto.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="cover-container">
      <div className="cover-img">
        <div className="overlay-content">
          <h2 className='cover-text'>Soluciones profesionales en limpieza</h2>
          <div className='cover-buttons'>
            <Link to="/tienda">
              <button className='tienda-button'>Tienda</button>
            </Link>
            <button className='contact-button' onClick={scrollToContacto}>
              Contáctanos
            </button>
          </div>
        </div>
        <img src={Cover1} alt="Limpieza profesional" className="img" />
      </div>
    </div>
  );
};

export default Cover;
