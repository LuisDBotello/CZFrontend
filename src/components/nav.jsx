import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import Logo from '../assets/LogoIni.png'; // ajusta si tu logo está en otro lugar

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-container">
        <img src={Logo} alt="Logo" className="logo-ini" />
        <div className="nav-logo"></div>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/tienda">Tienda</Link></li>
          <li><Link to="/sobre">Sobre nosotros</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
