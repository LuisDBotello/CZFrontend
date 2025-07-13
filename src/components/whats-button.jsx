import React from 'react';
import WAIcon from '..//assets/WAppIcon.png';
import '..//styles/BotonWhatsApp.css'; 

const BotonWhatsApp = () => {
  return (
    <a
      href="https://wa.me/526672851980"
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contáctanos por WhatsApp"
    >
    <img src={WAIcon} alt="WhatsApp" className="whatsapp-icon" />
    </a>
  );
};

export default BotonWhatsApp;
