import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import { obtenerCantidadCarrito } from '../utils/carrito';
import Logo from '../assets/LogoIni.png'; // ajusta si tu logo está en otro lugar
import Carrito from '../assets/carrito.png'

const Nav = () => {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const iconRef = useRef(null);

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    setCantidadCarrito(carrito.length);
  }, []);

  // Escuchar cambios en el storage desde otros componentes
  useEffect(() => {
    const handleStorageChange = () => {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      setCantidadCarrito(carrito.length);

      // Activar animación CSS
      if (iconRef.current) {
        iconRef.current.classList.remove('saltar');
        void iconRef.current.offsetWidth; // fuerza reflujo para reiniciar la animación
        iconRef.current.classList.add('saltar');
      }
    };

    window.addEventListener('carrito-actualizado', handleStorageChange);
    return () => {
      window.removeEventListener('carrito-actualizado', handleStorageChange);
    };
  }, []);

  return (
    <nav className="nav">
      <div className="nav-container">
        <img src={Logo} className="logo-ini" alt="Logo" />

        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/tienda">Tienda</a></li>
            <li><a href="/contacto">Contacto</a></li>
            <li><a href="/nosotros">Nosotros</a></li>

          </ul>
          <Link to="/carrito" className="carrito-icono">
            <img ref={iconRef} src={Carrito} alt="Carrito" className="icono-img" />
            {cantidadCarrito > 0 && (
              <span className="carrito-badge">{cantidadCarrito}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
