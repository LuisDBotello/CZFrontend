import React, { useEffect, useState } from 'react';
import '../styles/tienda.css'

const LineaAutomotriz = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const dataFake = [
      { id: 1, nombre: 'Shampoo para auto', precio: 99.9, imagen: '/img/shampoo-auto.jpg' },
      { id: 2, nombre: 'Cera líquida', precio: 129.0, imagen: '/img/cera.jpg' },
      { id: 3, nombre: 'Limpiador de interiores', precio: 79.0, imagen: '/img/interior.jpg' },
    ];
    setTimeout(() => setArticulos(dataFake), 500);
  }, []);

  return (
    <section className="seccion-productos">
      <h2>Línea Automotriz</h2>
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

export default LineaAutomotriz;
