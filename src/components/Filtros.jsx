import React, { useState, useEffect } from 'react';
import '../styles/filtro.css';

const Filtros = ({ onFiltrar, filtrosIniciales }) => {
  const [minPrecio, setMinPrecio] = useState(0);
  const [maxPrecio, setMaxPrecio] = useState(1000);
  const [categoria, setCategoria] = useState('');
  const [orden, setOrden] = useState('');

  // Si necesitas cargar filtros guardados al montar el componente
  useEffect(() => {
    if (filtrosIniciales) {
      setMinPrecio(filtrosIniciales.minPrecio ?? 0);
      setMaxPrecio(filtrosIniciales.maxPrecio ?? 1000);
      setCategoria(filtrosIniciales.categoria ?? '');
      setOrden(filtrosIniciales.orden ?? '');
    }
  }, [filtrosIniciales]);

  const aplicarFiltros = () => {
    onFiltrar({ minPrecio, maxPrecio, categoria, orden });
  };

  const handleMinChange = (e) => {
    const nuevoMin = Number(e.target.value);
    if (nuevoMin <= maxPrecio) setMinPrecio(nuevoMin);
  };

  const handleMaxChange = (e) => {
    const nuevoMax = Number(e.target.value);
    if (nuevoMax >= minPrecio) setMaxPrecio(nuevoMax);
  };

  return (
    <aside className="tienda-filtros">
      <h3 className="filtros-titulo">Filtrar por</h3>

      <div className="filtro-item">
        <label htmlFor="categoria" className="label">Categoría</label>
        <select
          id="categoria"
          name="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="2">Automotriz</option>
          <option value="1">Residencial</option>
          <option value="3">Comercial</option>
        </select>
      </div>

      <div className="filtro-item">
        <label className="label">Rango de precio</label>
        <div className="rango-precio-labels">
          <span>${minPrecio.toFixed(2)}</span>
          <span>${maxPrecio.toFixed(2)}</span>
        </div>
        <div className="rango-precio-slider">
          <input
            type="range"
            min="0"
            max="2000"
            step="10"
            value={minPrecio}
            onChange={handleMinChange}
          />
          <input
            type="range"
            min="0"
            max="2000"
            step="10"
            value={maxPrecio}
            onChange={handleMaxChange}
          />
        </div>
      </div>

      <div className="filtro-item">
        <label htmlFor="orden" className="label">Ordenar por</label>
        <select
          id="orden"
          name="orden"
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
        >
          <option value="">Sin orden</option>
          <option value="nombre-asc">Nombre A-Z</option>
          <option value="nombre-desc">Nombre Z-A</option>
          <option value="precio-asc">Precio (menor a mayor)</option>
          <option value="precio-desc">Precio (mayor a menor)</option>
        </select>
      </div>

      <div className="filtro-item">
        <button className="filtro-aplicar" onClick={aplicarFiltros} type="button">
          Aplicar Filtros
        </button>
      </div>
    </aside>
  );
};

export default Filtros;
