import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import Logo from '../assets/LogoIni.png';
import Carrito from '../assets/carrito.png';

const Nav = () => {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const iconRef = useRef(null);

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    window.dispatchEvent(new Event('carrito-actualizado'));
    setCantidadCarrito(carrito.length);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      setCantidadCarrito(carrito.length);

      if (iconRef.current) {
        iconRef.current.classList.remove('saltar');
        void iconRef.current.offsetWidth;
        iconRef.current.classList.add('saltar');
      }
    };

    window.addEventListener('carrito-actualizado', handleStorageChange);
    return () => {
      window.removeEventListener('carrito-actualizado', handleStorageChange);
    };
  }, []);

  const toggleMenu = () => setMenuAbierto(prev => !prev);

  // Cerrar menú al hacer click en un link (opcional)
  const handleLinkClick = () => {
    if (menuAbierto) setMenuAbierto(false);
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" onClick={handleLinkClick}>
          <img src={Logo} className="logo-ini" alt="Logo" />
        </Link>

        <div>
          
        </div>

        <div className={`nav-right ${menuAbierto ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" onClick={handleLinkClick}>Inicio</Link></li>
            <li><Link to="/tienda" onClick={handleLinkClick}>Tienda</Link></li>
            <li><Link to="/contacto" onClick={handleLinkClick}>Contacto</Link></li>
            <li><Link to="/nosotros" onClick={handleLinkClick}>Nosotros</Link></li>
          </ul>
        </div>
        <div className="nav-icons">
          <Link to="/carrito" className="carrito-icono" onClick={handleLinkClick}>
            <img src={Carrito} alt="Carrito" className="icono-img" ref={iconRef} />
            {cantidadCarrito > 0 && (
              <span className="carrito-badge">{cantidadCarrito}</span>
            )}
          </Link>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menú">
            ☰
          </button>
        </div>
      </div>


    </nav>

  );
};

export default Nav;
