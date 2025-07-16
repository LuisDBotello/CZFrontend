import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import PaginaProducto from './components/PaginaProducto';
import Carrito from './components/Carrito';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<PaginaProducto />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </Router>
  );
};

export default App;
