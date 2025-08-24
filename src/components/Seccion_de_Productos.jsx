import React, { useEffect, useState } from "react";
import '../styles/Seccion_de_Productos.css';
import { URL_BASE } from '../data/constants';
import { Link } from "react-router-dom";

const Seccion_de_Productos = ({ cant, mostrarVerMas = false, categoriaSeleccionada }) => {
	const [productos, setProductos] = useState([]);
	const [loading, setLoading] = useState(true);

	const API_URL = `${URL_BASE}/products`;

useEffect(() => {
	const fetchProductos = async () => {
		try {
		const response = await fetch(API_URL);
		const data = await response.json();
		setProductos(data.product); // <-- acá está la solución
		} catch (error) {
		console.error("Error al cargar los productos:", error);
		} finally {
		setLoading(false);
		}
	};

	fetchProductos();
}, []);

	const productosFiltrados = categoriaSeleccionada
		? productos.filter(prod => prod.categoria === categoriaSeleccionada)
		: productos;

	return (
		<section className="productos-section">
		<h2 className="productos-title">
			{categoriaSeleccionada
			? `Productos: ${categoriaSeleccionada}`
			: "Todos los productos"}
		</h2>

		{loading ? (
			<p>Cargando productos...</p>
		) : (
			<>
			<div className="productos-list">
				{productosFiltrados.slice(0, cant).map((prod, idx) => (
				<div className="producto-card" key={idx}>
					<img src={prod.imagen_url} alt={prod.nombre} className="producto-img" />
					<h3 className="producto-nombre">{prod.nombre}</h3>
					<p className="producto-desc">{prod.descripcion}</p>
					<span className="producto-precio">{prod.precio}</span>
					<button className="btn btn-success producto-btn">Añadir</button>
				</div>
				))}
			</div>

			{mostrarVerMas && (
				<div className="productos-vermas">
				<Link className="btn btn-primary btn-lg" to="/products">
					Ver más productos
				</Link>
				</div>
			)}
			</>
		)}
		</section>
	);
};

export default Seccion_de_Productos;