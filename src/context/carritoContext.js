import { createContext, useContext, useEffect, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const almacenado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(almacenado);
  }, []);

  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

    const agregarAlCarrito = (producto) => {
    const existente = carrito.find(p => p.artId === producto.artId);
    let actualizado;

    if (existente) {
        actualizado = carrito.map(p =>
        p.artId === producto.artId
            ? { ...p, cantidad: (p.cantidad || 1) + 1 }
            : p
        );
    } else {
        actualizado = [...carrito, { ...producto, cantidad: 1 }];
    }

    guardarCarrito(actualizado); // ✅ actualiza estado + localStorage
    };

  const eliminarDelCarrito = (id) => {
    guardarCarrito(carrito.filter(p => p.artId !== id));
  };

  const limpiarCarrito = () => {
    guardarCarrito([]);
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    const actualizado = carrito.map(p =>
      p.artId === id ? { ...p, cantidad: nuevaCantidad } : p
    );
    guardarCarrito(actualizado);
  };

  return (
    <CarritoContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      limpiarCarrito,
      actualizarCantidad
    }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
