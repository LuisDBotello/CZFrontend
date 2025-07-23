import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import '../styles/tiendapage.css';
import Filtros from './Filtros';
import { useCarrito } from '../context/carritoContext';

const TiendaPage = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 12;
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  const [agregadoIds, setAgregadoIds] = useState([]);

  // Para guardar filtros y orden
  const [filtros, setFiltros] = useState({
    minPrecio: undefined,
    maxPrecio: undefined,
    categoria: '',
    orden: '',
  });

  // Función para obtener artículos, envuelta en useCallback para que no cambie su referencia
  const obtenerArticulos = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.100.53:8080/api/productos', {
        params,
      });
      setArticulos(response.data || []);
      setPaginaActual(1);
    } catch (error) {
      console.error("Error al obtener artículos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Ejecutar al montar y cada vez que filtros cambian
  useEffect(() => {
    obtenerArticulos(filtros);
  }, [filtros, obtenerArticulos]);

  const handleFiltrar = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

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

  const handleCardClick = (id) => {
    navigate(`/producto/${id}`);
  };

  const totalPaginas = Math.ceil(articulos.length / productosPorPagina);
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const productosVisibles = articulos.slice(indiceInicio, indiceInicio + productosPorPagina);

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <p className="tienda-cargando">Cargando productos...</p>;

  return (
    <section className="tienda-container">
      <div className="tienda-layout">
        <Filtros onFiltrar={handleFiltrar} />
        <div className="tienda-contenido">
          <div className="tienda-grid">
            {productosVisibles.length === 0 && (
              <p className="tienda-mensaje-vacio">No hay productos disponibles.</p>
            )}
            {productosVisibles.map((item) => (
              <div
                key={item.artId}
                className="tienda-producto"
                onClick={() => handleCardClick(item.artId)}
              >
                {item.artCZ && (
                  <img
                    src={Logo}
                    alt="Producto CZ"
                    className="tienda-logo-cz"
                  />
                )}
                <img
                  src={
                    item.artFoto
                      ? `http://192.168.100.53:8080/${item.artFoto}`
                      : '/img/default.jpg'
                  }
                  alt={item.artNom}
                  className="tienda-imagen"
                />
                <div className="tienda-info">
                  <h3 className="tienda-nombre">{item.artNom}</h3>
                  <p className="tienda-precio">${item.artPrecio.toFixed(2)}</p>
                </div>
                <button
                  className="tienda-btn-agregar"
                  onClick={(e) => handleAgregarCarrito(e, item)}
                >
                  {agregadoIds.includes(item.artId) ? '✔️' : 'Agregar'}
                </button>
              </div>
            ))}
          </div>

          {totalPaginas > 1 && (
            <div className="paginacion">
              {Array.from({ length: totalPaginas }, (_, i) => (
                <button
                  key={i}
                  onClick={() => cambiarPagina(i + 1)}
                  className={`paginacion-btn ${paginaActual === i + 1 ? 'activo' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TiendaPage;
