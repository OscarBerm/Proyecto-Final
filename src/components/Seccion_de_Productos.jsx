import React from "react";
import '../styles/Seccion_de_Productos.css';
import { products } from '../data/constants.sj';
import { Link } from "react-router-dom";



const Seccion_de_Productos = ({ cant, mostrarVerMas = false, categoriaSeleccionada }) => {
	const productos = products;
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
			<div className="productos-list">
				{productosFiltrados.slice(0, cant).map((prod, idx) => (
					<div className="producto-card" key={idx}>
						<img src={prod.imagen} alt={prod.nombre} className="producto-img" />
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
		</section>
	);
};

export default Seccion_de_Productos;
