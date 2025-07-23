import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import PaginaProducto from './components/PaginaProducto';
import Carrito from './components/Carrito';
import Layout from './components/Layout';
import TiendaPage from './components/tiendaPage';
import { CarritoProvider } from './context/carritoContext';

const App = () => {
  return (
    <CarritoProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:id" element={<PaginaProducto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/tienda" element={<TiendaPage />} />
          </Routes>
        </Layout>
      </Router>
    </CarritoProvider>
  );
};

export default App;
