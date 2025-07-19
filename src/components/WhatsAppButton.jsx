import React from 'react';
import waIcon from '../assets/waicon.png'; // esta vez solo es una imagen

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5215555555555"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <img src={waIcon} alt="WhatsApp" />
    </a>
  );
};

export default WhatsAppButton;