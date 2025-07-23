import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import '../styles/contacto.css';


const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [status, setStatus] = useState(null); // para mensajes de éxito/error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setStatus({ error: true, msg: "Por favor completa todos los campos." });
      return;
    }

    emailjs
      .send(
        "service_pqs8w5n",   // Reemplaza con tu Service ID de EmailJS
        "template_605nyea",  // Reemplaza con tu Template ID de EmailJS
        {
          name: formData.nombre,
          time: new Date().toLocaleString(),
          message: formData.mensaje,
          email: formData.email, // si quieres usarlo en el template también
        },
        "nbC6rRIayPWbLc48s" // Reemplaza con tu User ID o Public Key de EmailJS
      )
      .then(() => {
        setStatus({ error: false, msg: "Mensaje enviado con éxito." });
        setFormData({ nombre: "", email: "", mensaje: "" });
      })
      .catch(() => {
        setStatus({ error: true, msg: "Error al enviar el mensaje." });
      });
  };

  return (
    <section className='contact-form'>
      
        <div className="contacto-left-div" id="contactanos">
            <h2 className="contact-title">Contáctanos</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <textarea
                name="mensaje"
                placeholder="Mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows={5}
                required
            />
            <button className="contacto-enviar" type="submit">Enviar</button>
            </form>
            {status && (
            <p className="contacto-p" style={{ color: status.error ? "red" : "green" }}>{status.msg}</p>
            )}
        </div>
        <div className="contacto-right-div">
            <h4>imagínate una imagen bien perrona de la partner</h4>
        </div>
    </section>

  );
};

export default Contacto;
