import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/tienda.css';
import { agregarAlCarrito } from '../utils/carrito';

const LineaResidencial = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://192.168.100.53:8080/api/productos/linea/2')
      .then(res => {
        const Residencial = res.data.filter(
          articulo =>
            articulo.linea &&
            articulo.linea.lineNom.toLowerCase().includes('residencial')
        );
        setArticulos(Residencial);
      })
      .catch(err => {
        console.error("Error al cargar artículos:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const scrollDistance = 282;

  const handleScrollLeft = () => {
    gridRef.current?.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    gridRef.current?.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  };

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

  if (loading) return <p>Cargando productos de línea Residencial...</p>;

  return (
    <section className="seccion-productos">
      <h2 className='linea-h2'>Línea Residencial</h2>

      <button className="btn-scroll btn-scroll-left" onClick={handleScrollLeft} aria-label="Desplazar a la izquierda">
        &#8249;
      </button>

      <div ref={gridRef} className="grid-productos">
        {articulos.length === 0 && <p>No hay productos disponibles para esta línea.</p>}
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
            <div className="producto-info">
              <h3>{item.artNom}</h3>
              <p>${item.artPrecio.toFixed(2)}</p>
            </div>
            <button
              className="button-add"
              onClick={(e) => {
                e.stopPropagation(); // Evita navegar al hacer clic en el botón
                handleAgregar(item); // Pasa el item al handler
              }}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      <button className="btn-scroll btn-scroll-right" onClick={handleScrollRight} aria-label="Desplazar a la derecha">
        &#8250;
      </button>
    </section>
  );
};

export default LineaResidencial;
