export const obtenerCarrito = () => {
  return JSON.parse(localStorage.getItem('carrito')) || [];
};

export const agregarAlCarrito = (producto) => {
  const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
  carritoActual.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carritoActual));

  const evento = new Event('carrito-actualizado');
  window.dispatchEvent(evento);
};

export const eliminarDelCarrito = (artId) => {
  const carrito = obtenerCarrito().filter(p => p.artId !== artId);
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

export const limpiarCarrito = () => {
  localStorage.removeItem('carrito');
};

export const obtenerCantidadCarrito = () => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  return carrito.reduce((acc, item) => acc + item.cantidad, 0);
};

export const actualizarCantidad = (id, nuevaCantidad) => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const actualizado = carrito.map(item =>
    item.artId === id
      ? { ...item, cantidad: Math.max(1, nuevaCantidad) } // no permite menos de 1
      : item
  );
  localStorage.setItem('carrito', JSON.stringify(actualizado));
};