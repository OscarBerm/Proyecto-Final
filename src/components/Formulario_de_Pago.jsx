import React, { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../styles/Formulario_de_Pago.css';
import Navbar from "./Navbar";

// El carrito ahora se carga desde el backend

const FormularioDePago = () => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    direccion: '',
    ciudad: '',
    tarjeta: '',
    vencimiento: '',
    cvv: ''
  });
  const navigate = useNavigate();
  const [enviado, setEnviado] = useState(false);

  const { user } = useContext(UserContext);
  // Cargar carrito desde backend al montar
  React.useEffect(() => {
    if (!user?.usuario_id) return;
    fetch(`https://proyecto-final-pv5g.onrender.com/carrito?usuario_id=${user.usuario_id}`)
      .then(res => res.json())
      .then(data => setProductosCarrito(data));
  }, [user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Validación básica de campos vacíos
    if (
      !form.nombre.trim() ||
      !form.correo.trim() ||
      !form.direccion.trim() ||
      !form.ciudad.trim() ||
      !form.tarjeta.trim() ||
      !form.vencimiento.trim() ||
      !form.cvv.trim()
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos para continuar.'
      });
      return;
    }
    // Validación de formato de correo
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo inválido',
        text: 'Por favor, ingresa un correo electrónico válido.'
      });
      return;
    }
    // Validación de tarjeta (16 dígitos)
    if (!/^\d{16}$/.test(form.tarjeta)) {
      Swal.fire({
        icon: 'error',
        title: 'Tarjeta inválida',
        text: 'El número de tarjeta debe tener 16 dígitos.'
      });
      return;
    }
    // Validación de vencimiento (MM/AA)
    if (!/^\d{2}\/\d{2}$/.test(form.vencimiento)) {
      Swal.fire({
        icon: 'error',
        title: 'Vencimiento inválido',
        text: 'El formato de vencimiento debe ser MM/AA.'
      });
      return;
    }
    // Validación de CVV (3 o 4 dígitos)
    if (!/^\d{3,4}$/.test(form.cvv)) {
      Swal.fire({
        icon: 'error',
        title: 'CVV inválido',
        text: 'El CVV debe tener 3 o 4 dígitos.'
      });
      return;
    }
    // Animación de procesando pago
    Swal.fire({
      title: 'Procesando pago...',
      text: 'Por favor espera un momento',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    setTimeout(() => {
      // Vaciar carrito en backend
      fetch(`https://proyecto-final-pv5g.onrender.com/carrito`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: user.usuario_id })
      })
        .then(() => {
          Swal.close();
          navigate('/gracias');
        });
    }, 3000);
  };

  const total = productosCarrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  return (
    <>
      <Navbar />
      <section className="pago-cafe">
        <h2 className="pago-titulo">Formulario de Pago</h2>
  {/* Animación de procesando pago ahora con SweetAlert2 */}
  <div className="pago-detalle">
          <h3>Detalle de la compra</h3>
          <ul style={{padding: 0, margin: 0}}>
          {productosCarrito.map((prod, idx) => (
            <li key={idx} style={{display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.2rem', background: '#f7ede0', borderRadius: '0.7rem', padding: '0.7rem 1rem'}}>
              <img src={prod.imagen} alt={prod.nombre} style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '0.5rem', border: '1px solid #e0c9a6'}} />
              <div style={{flex: 1}}>
                <strong style={{fontSize: '1.08em'}}>{prod.nombre}</strong> x{prod.cantidad} <br />
                <span style={{fontSize: '0.95em', color: '#A9855C'}}>{prod.descripcion}</span>
              </div>
              <span style={{fontWeight: '600', color: '#6c4f37', fontSize: '1.08em'}}>${ (prod.precio * prod.cantidad).toLocaleString('es-CL') }</span>
            </li>
          ))}
        </ul>
        <div className="pago-total" style={{marginTop: '1.5rem', textAlign: 'right'}}>
          <span>Total a pagar:</span>
          <span className="pago-total-precio" style={{fontWeight: '700', fontSize: '1.2em', marginLeft: '0.7rem'}}>${ total.toLocaleString('es-CL') }</span>
        </div>
      </div>
      <form className="pago-form" onSubmit={handleSubmit}>
        <div className="pago-grupo">
          <label>Nombre completo</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="pago-grupo">
          <label>Correo electrónico</label>
          <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
        </div>
        <div className="pago-grupo">
          <label>Dirección</label>
          <input type="text" name="direccion" value={form.direccion} onChange={handleChange} required />
        </div>
        <div className="pago-grupo">
          <label>Ciudad</label>
          <input type="text" name="ciudad" value={form.ciudad} onChange={handleChange} required />
        </div>
        <div className="pago-grupo">
          <label>Número de tarjeta</label>
          <input type="text" name="tarjeta" value={form.tarjeta} onChange={handleChange} required maxLength={16} />
        </div>
        <div className="pago-grupo-flex">
          <div>
            <label>Vencimiento</label>
            <input type="text" name="vencimiento" value={form.vencimiento} onChange={handleChange} required placeholder="MM/AA" maxLength={5} />
          </div>
          <div>
            <label>CVV</label>
            <input type="text" name="cvv" value={form.cvv} onChange={handleChange} required maxLength={4} />
          </div>
        </div>
        <button className="pago-btn" type="submit">Pagar</button>
        {enviado && <p className="pago-exito">¡Pago realizado con éxito!</p>}
      </form>
    </section>
    </>
  );
};

export default FormularioDePago;
