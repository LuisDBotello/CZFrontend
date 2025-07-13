import React, { useEffect, useState } from 'react';
import '../styles/tienda.css'

const LineaResidencial = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const dataFake = [
      { id: 1, nombre: 'Limpiador de pisos', precio: 59.0, imagen: '/img/pisos.jpg' },
      { id: 2, nombre: 'Suavizante de telas', precio: 34.5, imagen: '/img/suavizante.jpg' },
      { id: 3, nombre: 'Jabón para trastes', precio: 25.0, imagen: '/img/jabon-trastes.jpg' },
    ];
    setTimeout(() => setArticulos(dataFake), 500);
  }, []);

  return (
    <section className="seccion-productos">
      <h2>Línea Residencial</h2>
      <div className="grid-productos">
        {articulos.map((item) => (
          <div key={item.id} className="producto-card">
            <img src={item.imagen} alt={item.nombre} />
            <h3>{item.nombre}</h3>
            <p>${item.precio.toFixed(2)}</p>
            <button className='button-add'>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LineaResidencial;
