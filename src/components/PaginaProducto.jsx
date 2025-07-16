import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/producto.css';
import Nav from './nav';
import ProductosRelacionados from './ProductoRelacionados';

const PaginaProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // ✅ Aquí estaba faltando

  const handleBackClick = () => {
    navigate(`/`);
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
      <Nav />
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
          <button className="button-add">Agregar al carrito</button>
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
