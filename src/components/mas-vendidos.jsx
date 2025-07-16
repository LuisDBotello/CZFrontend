import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/tienda.css';
import { agregarAlCarrito } from '../utils/carrito';

const MasVendidos = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const gridRef = useRef(null);

  useEffect(() => {
    axios.get('http://192.168.100.53:8080/api/productos/mas-vendidos')
      .then(res => setArticulos(res.data))
      .catch(err => console.error("Error al cargar productos más vendidos:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/producto/${id}`);
  };

  const handleAgregar = (item) => {
    agregarAlCarrito({
      artId: item.artId,
      artNom: item.artNom,
      artPrecio: item.artPrecio,
      artFoto: item.artFoto
    });
  };

  if (loading) return <p>Cargando productos más vendidos...</p>;

  return (
    <section className="seccion-productos">
      <h2 className='linea-h2'>Más Vendidos</h2>

      <div ref={gridRef} className="grid-productos">
        {articulos.map((item) => (
          <div
            key={item.artId}
            className="producto-card"
            onClick={() => handleCardClick(item.artId)}
          >
            <img
              src={item.artFoto ? `http://192.168.100.53:8080/${item.artFoto}` : '/img/default.jpg'}
              alt={item.artNom}
            />
            <div className='producto-info'>
              <h3>{item.artNom}</h3>
              <p>${item.artPrecio.toFixed(2)}</p>
            </div>
            <button
              className="button-add"
              onClick={(e) => {
                e.stopPropagation(); // evita que el clic en el botón dispare el clic de la tarjeta
                handleAgregar(item);
              }}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MasVendidos;
