import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductosRelacionados = ({ nombreProducto, lineaId, actualId }) => {
  const [relacionados, setRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerRelacionados = async () => {
      try {
        const palabrasClave = nombreProducto
          .toLowerCase()
          .split(' ')
          .filter(p => p.length > 3); // palabras útiles

        const palabra1 = palabrasClave[0] || '';
        const palabra2 = palabrasClave[1] || '';

        const res = await axios.get('http://localhost:8080/api/productos/productos-relacionados', {
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

  if (loading) return <p>Cargando productos relacionados...</p>;
  if (relacionados.length === 0) return <p>No hay productos relacionados.</p>;

  return (
    <section className="seccion-productos">
      <h2 className="linea-h2">Productos Relacionados</h2>
      <div className="grid-productos">
        {relacionados.map(prod => (
          <div
            key={prod.artId}
            className="producto-card"
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
            <button className="button-add" onClick={(e) => {
              e.stopPropagation(); // evitar que se dispare el click del card
              // aquí iría lógica para agregar al carrito
              alert(`Agregado: ${prod.artNom}`);
            }}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductosRelacionados;
