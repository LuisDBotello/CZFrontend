import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/producto.css';
import ProductosRelacionados from './ProductoRelacionados';
import { useCarrito } from '../context/carritoContext';

const PaginaProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();

  const handleBackClick = () => {
    navigate(-1);
  };

const [agregadoIds, setAgregadoIds] = useState([]);

  const handleAgregarCarrito = (e, producto) => {
    e.stopPropagation();
    agregarAlCarrito(producto);

    setAgregadoIds(prev => [...prev, producto.artId]);

    const evento = new Event('carrito-actualizado');
    window.dispatchEvent(evento);

    setTimeout(() => {
      setAgregadoIds(prev => prev.filter(id => id !== producto.artId));
    }, 2000);
  };

  useEffect(() => {
    axios.get(`http://192.168.100.53:8080/api/productos/${id}`)
      .then(res => setProducto(res.data))
      .catch(() => setError('No se pudo cargar el producto'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <>
      <button className='back-btn' onClick={handleBackClick}>&#8249;</button>
      
      <div className="producto-detalle">
        <img
          src={producto.artFoto ? `http://192.168.100.53:8080/${producto.artFoto}` : '/img/default.jpg'}
          alt={producto.artNom}
          className="producto-imagen"
        />
        <div className="producto-info-detalle">
          <h1>{producto.artNom}</h1>
          <p className="producto-precio">${producto.artPrecio.toFixed(2)}</p>
          <p>{producto.artDescrip}</p>
            <button
              className="button-add"
              onClick={(e) => handleAgregarCarrito(e, producto)}
            >
              {agregadoIds.includes(producto.artId) ? '✔️' : 'Agregar al carrito'}
            </button>
        </div>
      </div>

      <section className="productos-relacionados">
        <ProductosRelacionados
          nombreProducto={producto.artNom}
          lineaId={producto.linea?.lineId}
          actualId={producto.artId}
        />
      </section>
    </>
  );
};

export default PaginaProducto;
