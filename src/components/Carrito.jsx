
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { UserContext } from '../context/UserContext';
import '../styles/Carrito.css';

// El carrito ahora se carga desde el backend


const Carrito = () => {
	const [productosCarrito, setProductosCarrito] = useState([]);
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	// Cargar carrito desde backend al montar
	useEffect(() => {
		if (!user?.usuario_id) return;
		fetch(`https://proyecto-final-pv5g.onrender.com/carrito?usuario_id=${user.usuario_id}`)
			.then(res => res.json())
			.then(data => setProductosCarrito(data));
	}, [user]);

	// Aumentar cantidad
	const aumentarCantidad = (id) => {
		const prod = productosCarrito.find(p => p.id === id);
		if (prod) {
			fetch(`https://proyecto-final-pv5g.onrender.com/carrito/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ usuario_id: user.usuario_id, cantidad: prod.cantidad + 1 })
			})
				.then(res => res.json())
				.then(data => setProductosCarrito(data));
		}
	};

	// Disminuir cantidad
	const disminuirCantidad = (id) => {
		const prod = productosCarrito.find(p => p.id === id);
		if (prod && prod.cantidad > 1) {
			fetch(`https://proyecto-final-pv5g.onrender.com/carrito/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ usuario_id: user.usuario_id, cantidad: prod.cantidad - 1 })
			})
				.then(res => res.json())
				.then(data => setProductosCarrito(data));
		}
	};

	// Eliminar producto
	const eliminarProducto = (id) => {
		fetch(`https://proyecto-final-pv5g.onrender.com/carrito/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ usuario_id: user.usuario_id })
		})
			.then(res => res.json())
			.then(data => setProductosCarrito(data));
	};

	const total = Array.isArray(productosCarrito)
	  ? productosCarrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
	  : 0;

	return (
		<>
			<Navbar />
			<aside className="carrito-cafe">
				<h2 className="carrito-titulo"><i className="bi bi-cart4"></i> Mi Carrito</h2>
							<ul className="carrito-lista">
								{Array.isArray(productosCarrito) && productosCarrito.map((prod) => (
									<li className="carrito-item" key={prod.id}>
							<img src={prod.imagen} alt={prod.nombre} className="carrito-img" />
							<div className="carrito-info">
								<span className="carrito-nombre">{prod.nombre}</span>
								<span className="carrito-descripcion">{prod.descripcion}</span>
								<div className="carrito-cantidad-controles">
									<button className="carrito-btn-cantidad" onClick={() => disminuirCantidad(prod.id)}>-</button>
									<span className="carrito-cantidad">{prod.cantidad}</span>
									<button className="carrito-btn-cantidad" onClick={() => aumentarCantidad(prod.id)}>+</button>
								</div>
								<span className="carrito-precio">${(prod.precio * prod.cantidad).toLocaleString('es-CL')}</span>
							</div>
							<button className="carrito-btn-eliminar" onClick={() => eliminarProducto(prod.id)}><i className="bi bi-x-lg"></i></button>
						</li>
					))}
				</ul>
				<div className="carrito-total">
					<span>Total:</span>
					<span className="carrito-total-precio">${total.toLocaleString('es-CL')}</span>
				</div>
				<button className="carrito-btn-comprar" onClick={() => navigate('/checkout')}>Finalizar compra</button>
			</aside>
		</>
	);
};

export default Carrito;
