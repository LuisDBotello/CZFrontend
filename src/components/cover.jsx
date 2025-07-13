import React from 'react';
import '../styles/cover.css';
import Cover1 from '../assets/cover1.jpg';

const Cover = () => {
  return (
    <div className="cover-container">
      <div className="cover-img">
        <div className="overlay-content">
          <h2 className='cover-text'>Soluciones profesionales en limpieza</h2>
          <div className='cover-buttons'>            
            <button className='tienda-button'>TIENDA</button>
            <button className='contact-button'>CONTÁCTANOS</button>
          </div>
        </div>
        <img src={Cover1} alt="Limpieza profesional" className="img" />
        
      </div>
    </div>
  );
};

export default Cover;
