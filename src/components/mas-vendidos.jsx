import React, { useEffect, useState } from 'react';
import '../styles/tienda.css'

const MasVendidos = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const dataFake = [
      { id: 1, nombre: 'Limpiador Multiusos', precio: 89.14, imagen: '/img/limpiador.jpg' },
      { id: 2, nombre: 'Desinfectante Pro', precio: 75.51, imagen: '/img/desinfectante.jpg' },
      { id: 3, nombre: 'Toallas Antibacteriales', precio: 49.92, imagen: '/img/toallas.jpg' },
      { id: 4, nombre: 'Cloro Cleanzone 5L', precio: 37.63, imagen: '/img/cloro5.jpg' },
      { id: 5, nombre: 'Jabón para manos', precio: 79.93, imagen: '/img/JabonManos5.jpg' },

    ];
    setTimeout(() => setArticulos(dataFake), 500);
  }, []);

  return (
    <section className="seccion-productos">
      <h2>Más Vendidos</h2>
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

export default MasVendidos;
