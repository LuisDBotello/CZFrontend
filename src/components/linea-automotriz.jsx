import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/tienda.css'
import Logo from '../assets/logo.png';
import { useCarrito } from '../context/carritoContext'; // 👈 importa contexto

const LineaAutomotriz = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);
  const navigate = useNavigate();

  const { agregarAlCarrito } = useCarrito(); // 👈 usa contexto para agregar

  useEffect(() => {
    axios.get('http://192.168.100.53:8080/api/productos/linea/2')
      .then(res => {
        const Automotriz = res.data.filter(
          articulo =>
            articulo.linea &&
            articulo.linea.lineNom.toLowerCase().includes('automotriz')
        );
        setArticulos(Automotriz);
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

  if (loading) return <p>Cargando productos de línea Automotriz...</p>;

  return (
    <section className="seccion-productos">
      <h2 className='linea-h2'>Línea Automotriz</h2>
      <hr className='linea-hr'/>

      <button className="btn-scroll btn-scroll-left" onClick={handleScrollLeft} aria-label="Desplazar a la izquierda">
        &#8249;
      </button>

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
              <p className='art-precio'>${item.artPrecio.toFixed(2)}</p>
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

      <button className="btn-scroll btn-scroll-right" onClick={handleScrollRight} aria-label="Desplazar a la derecha">
        &#8250;
      </button>
    </section>
  );
};

export default LineaAutomotriz;
