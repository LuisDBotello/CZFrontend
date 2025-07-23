import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/tienda.css';
import { useCarrito } from '../context/carritoContext'; // ✅ usa el contexto
import Logo from '../assets/logo.png';

const MasVendidos = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const { agregarAlCarrito } = useCarrito(); // ✅ del contexto

  useEffect(() => {
    axios.get('http://192.168.100.53:8080/api/productos/mas-vendidos')
      .then(res => setArticulos(res.data))
      .catch(err => console.error("Error al cargar productos más vendidos:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/producto/${id}`);
  };
  const [agregadoIds, setAgregadoIds] = useState([]);

  const handleAgregarCarrito = (e, item) => {
    e.stopPropagation();
    agregarAlCarrito(item);

    setAgregadoIds(prev => [...prev, item.artId]);

    const evento = new Event('carrito-actualizado');
    window.dispatchEvent(evento);

    setTimeout(() => {
      setAgregadoIds(prev => prev.filter(id => id !== item.artId));
    }, 2000);
  };

  if (loading) return <p>Cargando productos más vendidos...</p>;

  return (
    <section className="seccion-productos">
      <h2 className='linea-h2'>Más Vendidos</h2>
      <hr className='linea-hr'/>

      <div ref={gridRef} className="grid-productos">
        {articulos.length === 0 && <p>No hay productos disponibles para esta línea.</p>}
        {articulos.map((item) => (
          <div key={item.artId} className="producto-carta" onClick={() => handleCardClick(item.artId)}>
            {item.artCZ && (
              <img
                src={Logo}
                alt="Producto CZ"
                className="cz-icon"
              />
            )}
            <img
              src={item.artFoto ? `http://192.168.100.53:8080/${item.artFoto}` : '/img/default.jpg'}
              alt={item.artNom}
            />
            <div className="producto-info">
              <h3>{item.artNom}</h3>
              <p>${item.artPrecio.toFixed(2)}</p>
            </div>
            <button
              className="button-add"
              onClick={(e) => handleAgregarCarrito(e, item)}
            >
              {agregadoIds.includes(item.artId) ? '✔️' : 'Agregar al carrito'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MasVendidos;
