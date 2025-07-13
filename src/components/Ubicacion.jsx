import React from 'react';
import '../styles/ubicacion.css'
import Fachada1 from "../assets/fachada-cz1.webp"
import Interior from "../assets/interior-cz.webp"

const Ubicacion = () => {
  return (
    <section className="map-section">
      <h2 className="map-title">Ubicación</h2>
      <div className="ubicacion-grid">
        <div className="ubicacion-contacto">
          <div>
            <h3 className='contacto-medio'>Teléfono</h3>
            <p>(667) 285-19-80</p>
          </div>
          <div>
            <h3 className='contacto-medio'>WhatsApp</h3>
            <p>6672851980</p>
          </div>
          <div>
            <h3 className='contacto-medio'>Pídenos una cotización por correo</h3>
            <a href="mailto:grubosaventas@gmail.com">grubosaventas@gmail.com</a>
          </div>
        </div>
        <div className="ubicacion-mapa">
          <iframe className='iframe'
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14489.342125192868!2d-107.43850556044919!3d24.783961700000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86bcd1775a2baf3f%3A0xe10e7d3267b5b836!2sClean%20Zone%20M%C3%A9xico!5e0!3m2!1ses-419!2smx!4v1752179638610!5m2!1ses-419!2smx" 
              >
          </iframe>          
        </div>
        <div className="ubicacion-fotos">
          <img src={Fachada1} alt="Fachada" className="foto-exterior" />
          <img src={Interior} alt="Interior" className="foto-interior" />
        </div>
      </div>
      <div className="map-container">

      </div>
    </section>
  );
};

export default Ubicacion;
