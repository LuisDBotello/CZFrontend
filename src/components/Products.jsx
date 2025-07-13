import React from 'react';
import '../styles/products.css';
import AutoLogo from "../assets/automotriz-img.jpg"
import LimpLogo from "../assets/residencial-img.jpg"

const Products = () => {
  return (
    <div className='products-container'>
      <h2 className='products-h2'>Productos</h2>
        <div className="product-cards">
        <div className="product-card" onClick={() => console.log('Producto 1')}>
        <img src={LimpLogo} alt="Residencial" className="product-img" />
        <h3 className="product-title">Producto 1</h3>
        </div>

        <div className="product-card" onClick={() => console.log('Producto 2')}>
        <img src={AutoLogo} alt="Automotriz" className="product-img" />
        <h3 className="product-title">Producto 2</h3>
        </div>
        </div>
    </div>
  );
};

export default Products;
