import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/carrito.css';
import MasVendidos from './mas-vendidos';
import { useCarrito } from '../context/carritoContext';
import { Trash2 } from "lucide-react";

const Carrito = () => {
  const [resumen, setResumen] = useState({ subtotal: 0, envio: 0 });
  const { carrito, eliminarDelCarrito, limpiarCarrito, actualizarCantidad } = useCarrito();

  useEffect(() => {
    if (carrito.length === 0) return;
    const payload = carrito.map(item => ({
      artId: item.artId,
      cantidad: item.cantidad || 1
    }));
    fetch('http://192.168.100.53:8080/api/carrito/calcsub', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(r => r.json())
      .then(data => setResumen(data))
      .catch(err => console.error(err));
  }, [carrito]);

  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [porcentajeDescuento, setPorcentajeDescuento] = useState(0);
  const navigate = useNavigate();

  const descuento = resumen.subtotal * (porcentajeDescuento / 100);
  const total = resumen.subtotal - descuento + resumen.envio;
  const aplicarDescuento = () => {
    if (codigoDescuento === "PROMO10") {
      setPorcentajeDescuento(10);
    } else {
      setPorcentajeDescuento(0);
    }
  };
  useEffect(() => {
    if (carrito.length === 0) return;

    const datosParaBackend = carrito.map(item => ({
      artId: item.artId,
      cantidad: item.cantidad || 1
    }));

    const enviarCarrito = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/carrito/calcsub', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datosParaBackend)
        });

        if (!response.ok) {
          console.error('Error al enviar carrito');
        } else {
          const res = await response.json();
          console.log('Carrito enviado automáticamente:', res);
        }
      } catch (error) {
        console.error('Error de red al enviar carrito:', error);
      }
    };

    enviarCarrito();
  }, [carrito]); // Se ejecuta cada vez que cambia el carrito

  return (
    <div className="carrito-container">
      <h1>Carrito</h1>
      <hr className='linea-hr'/>

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
                  <button className="cantidad-control-button" onClick={(e) => {
                    e.stopPropagation();
                    actualizarCantidad(item.artId, (item.cantidad || 1) - 1);
                  }}>-</button>
                  <span>{item.cantidad || 1}</span>
                  <button className="cantidad-control-button" onClick={(e) => {
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
                    <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="carrito-resumen">
            <div className="desglose">
              <h2>Subtotal:</h2>
              <h2>${(resumen.subtotal ?? 0).toFixed(2)}</h2>
            </div>
            <div className="desglose">
              <h2>Envío:</h2>
              <h2>{(resumen.envio ?? 0) === 0 ? 'Gratis' : `$${(resumen.envio ?? 0).toFixed(2)}`}</h2>
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
