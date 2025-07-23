import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/carritoContext'; // 👈 usa tu contexto
import '../styles/tienda.css'

const ProductosRelacionados = ({ nombreProducto, lineaId, actualId }) => {
  const [relacionados, setRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito(); // ✅ usar del contexto

  useEffect(() => {
    const obtenerRelacionados = async () => {
      try {
        const palabrasClave = nombreProducto
          .toLowerCase()
          .split(' ')
          .filter(p => p.length > 3);

        const palabra1 = palabrasClave[0] || '';
        const palabra2 = palabrasClave[1] || '';

        const res = await axios.get('http://192.168.100.53:8080/api/productos/productos-relacionados', {
          params: {
            lineaId,
            palabra1,
            palabra2,
            articuloActual: actualId
          }
        });

        const todos = res.data;

        const porPalabras = todos.filter(p => {
          if (p.artId === actualId) return false;
          const nombre = p.artNom.toLowerCase();
          return palabrasClave.some(palabra => nombre.includes(palabra));
        });

        const porLinea = todos.filter(p =>
          p.artId !== actualId &&
          p.linea?.lineId === lineaId &&
          !porPalabras.some(pp => pp.artId === p.artId)
        );

        const combinados = [...porPalabras, ...porLinea].slice(0, 8);
        setRelacionados(combinados);
      } catch (err) {
        console.error('Error al obtener productos relacionados:', err);
      } finally {
        setLoading(false);
      }
    };

    obtenerRelacionados();
  }, [nombreProducto, lineaId, actualId]);
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
  if (loading) return <p>Cargando productos relacionados...</p>;
  if (relacionados.length === 0) return <p>No hay productos relacionados.</p>;

  return (
    <section className="seccion-productos">
      <h2 className="linea-h2">Podría interesarte</h2>
      <hr className='linea-hr'/>

      <div className="grid-productos">
        {relacionados.map(prod => (
          <div
            key={prod.artId}
            className="producto-carta"
            onClick={() => navigate(`/producto/${prod.artId}`)}
          >
            <img
              src={prod.artFoto ? `http://192.168.100.53:8080/${prod.artFoto}` : '/img/default.jpg'}
              alt={prod.artNom}
            />
            <div className="producto-info">
              <h3>{prod.artNom}</h3>
              <p>${prod.artPrecio.toFixed(2)}</p>
            </div>
            <button
              className="button-add"
              onClick={(e) => {
                e.stopPropagation();
                handleAgregarCarrito(e, prod)
                window.dispatchEvent(new Event('carrito-actualizado'));
              }}
            >
              {agregadoIds.includes(prod.artId) ? '✔️' : 'Agregar al carrito'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductosRelacionados;
