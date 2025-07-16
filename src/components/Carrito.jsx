import React, { useEffect, useState } from 'react';
import { obtenerCarrito, eliminarDelCarrito, limpiarCarrito } from '../utils/carrito';
import { useNavigate } from 'react-router-dom';
import '../styles/carrito.css';
import Nav from './nav'

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCarrito(obtenerCarrito());
  }, []);

  const handleEliminar = (id) => {
    eliminarDelCarrito(id);
    setCarrito(obtenerCarrito());
  };

  const handleLimpiar = () => {
    limpiarCarrito();
    setCarrito([]);
  };

  const total = carrito.reduce((acc, item) => acc + item.artPrecio * (item.cantidad || 1), 0);

  return (
    <div className="carrito-container">
      <Nav />
      <h1>Tu Carrito</h1>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="carrito-lista">
            {carrito.map(item => (
              <li key={item.artId} className="carrito-item">
                <img
                  src={item.artFoto ? `http://192.168.100.53:8080/${item.artFoto}` : '/img/default.jpg'}
                  alt={item.artNom}
                  className="carrito-img"
                />
                <div className="carrito-detalles">
                  <h3>{item.artNom}</h3>
                  <p>${item.artPrecio.toFixed(2)}</p>
                  <p>Cantidad: {item.cantidad || 1}</p>
                  <button onClick={() => handleEliminar(item.artId)} className="carrito-btn-eliminar">
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="carrito-resumen">
            <h2>Total: ${total.toFixed(2)}</h2>
            <button onClick={handleLimpiar} className="carrito-btn-limpiar">Vaciar carrito</button>
            <button onClick={() => navigate('/checkout')} className="carrito-btn-comprar">Proceder al pago</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
