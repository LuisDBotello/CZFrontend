import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/carrito.css';
import MasVendidos from './mas-vendidos';
import { useCarrito } from '../context/carritoContext';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, limpiarCarrito, actualizarCantidad } = useCarrito();
  const navigate = useNavigate();

  const [codigoDescuento, setCodigoDescuento] = useState('');
  const [porcentajeDescuento, setPorcentajeDescuento] = useState(0);

  // Subtotal
  const subtotal = carrito.reduce((acc, item) => acc + item.artPrecio * (item.cantidad || 1), 0);

  // Envío gratis si el subtotal es mayor a 400
  const envio = subtotal > 400 ? 0 : 50;

  // Descuentos disponibles
  const codigosValidos = {
    'PROMO10': 10,
    'SALE20': 20,
    'DESCUENTO30': 30,
  };

  // Aplica descuento
  const aplicarDescuento = () => {
    const porcentaje = codigosValidos[codigoDescuento.toUpperCase()];
    setPorcentajeDescuento(porcentaje || 0);
  };

  // Calcular descuento y total
  const descuento = (subtotal * porcentajeDescuento) / 100;
  const total = subtotal - descuento + envio;

  return (
    <div className="carrito-container">
      <h1>Tu carrito</h1>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="carrito-contenido">
          <ul className="carrito-lista">
            {carrito.map(item => (
              <li key={item.artId} className="carrito-item"
>
                <img
                  src={item.artFoto ? `http://192.168.100.53:8080/${item.artFoto}` : '/img/default.jpg'}
                  alt={item.artNom}
                  className="carrito-img"
                  onClick={() => navigate(`/producto/${item.artId}`)}
                />
                <div className="carrito-detalles">
                  <h3>{item.artNom}</h3>
                  <p>${item.artPrecio.toFixed(2)}</p>
                  <div className="cantidad-control">
                  <button onClick={(e) => {
                    e.stopPropagation();
                    actualizarCantidad(item.artId, (item.cantidad || 1) - 1);
                  }}>-</button>
                  <span>{item.cantidad || 1}</span>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    actualizarCantidad(item.artId, (item.cantidad || 1) + 1);
                  }}>+</button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // ← Esto evita que se dispare el onClick del <li>
                        eliminarDelCarrito(item.artId);
                      }}
                      className="carrito-btn-eliminar"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="carrito-resumen">
            <div className='desglose'>
              <h2>Subtotal:</h2> 
              <h2>${subtotal.toFixed(2)}</h2>
            </div>

            <div className='desglose'>
              <h2>Envío:</h2> 
              <h2>{envio === 0 ? 'Gratis' : `$${envio.toFixed(2)}`}</h2>
            </div>

            <div className="descuento-section">
              <input 
                type="text" 
                placeholder="Código de descuento" 
                value={codigoDescuento} 
                onChange={(e) => setCodigoDescuento(e.target.value)} 
                className="descuento-input"
              />
              <button onClick={aplicarDescuento} className="descuento-boton">
                Aplicar
              </button>
            </div>

            {porcentajeDescuento > 0 && (
              <div className='desglose'>
                <h2>Descuento ({porcentajeDescuento}%):</h2>
                <h2>- ${descuento.toFixed(2)}</h2>
              </div>
            )}

            <hr className="linea-separadora" />

            <div className='desglose total-final'>
              <h2>Total:</h2> 
              <h2>${total.toFixed(2)}</h2>
            </div>

            <button onClick={limpiarCarrito} className="carrito-btn-limpiar">Vaciar carrito</button>
            <button onClick={() => navigate('/checkout')} className="carrito-btn-comprar">Proceder al pago</button>
          </div>      
          <MasVendidos />

        </div>
      )}

    </div>
  );
};

export default Carrito;
