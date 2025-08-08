import React from "react";
import '../styles/Seccion_de_Productos.css';

const productos = [
	{
		nombre: "Café Colombia",
		descripcion: "Cafe en grano con Aroma intenso y sabor suave.",
		imagen: "public/img/Card-Cafe-en-Grano.png",
		precio: "$6.990"
	},
	{
		nombre: "Café Brasil",
		descripcion: "Cafe Molido con notas achocolatadas y cuerpo medio.",
		imagen: "public/img/Card-Cafe-Molido.png",
		precio: "$7.490"
	},
	{
		nombre: "Café Etiopía",
		descripcion: "Cafe en capsulas con sabor frutal y floral, muy aromático.",
		imagen: "public/img/Card-Cafe-en-Capsulas.png",
		precio: "$8.990"
	},
	{
		nombre: "Café Perú",
		descripcion: " Cafe instantaneo, Dulce y equilibrado, ideal para espresso.",
		imagen: "public/img/Card-Cafe-Instantaneo.png",
		precio: "$7.990"
	},
	{
		nombre: "Café Guatemala",
		descripcion: "Cafe en sobres con sabor intenso, notas a cacao y frutos secos.",
		imagen: "public/img/Card-Cafe-en-Sobres.png",
		precio: "$8.490"
	}
];

const Seccion_de_Productos = () => {
	return (
		<section className="productos-section">
			<h2 className="productos-title">Sección de Productos</h2>
			<div className="productos-list">
				{productos.map((prod, idx) => (
					<div className="producto-card" key={idx}>
						<img src={prod.imagen} alt={prod.nombre} className="producto-img" />
						<h3 className="producto-nombre">{prod.nombre}</h3>
						<p className="producto-desc">{prod.descripcion}</p>
						<span className="producto-precio">{prod.precio}</span>
						<button className="btn btn-success producto-btn">Añadir</button>
					</div>
				))}
			</div>
			<div className="productos-vermas">
				<button className="btn btn-primary btn-lg">Ver más productos</button>
			</div>
		</section>
	);
};

export default Seccion_de_Productos;
