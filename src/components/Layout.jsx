import React from 'react';
import Nav from './nav';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import '../styles/layout.css'; // Asegúrate de que esté cargado

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Nav />
      <main className="main-content">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
