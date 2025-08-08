import React from "react";
import '../styles/Categorias.css';

const categorias = [
	{
		nombre: "Café en grano",
		imagen: "public/img/Categoria_Cafe_en_Grano.png",
		link: "#cafe-grano"
	},
	{
		nombre: "Café molido",
		imagen: "public/img/Categoria_Cafe_Molido.png",
		link: "#cafe-molido"
	},
	{
		nombre: "Café en cápsulas",
		imagen: "public/img/Categoria_Cafe_en_Capsulas.png",
		link: "#capsulas"
	},
	{
		nombre: "Café Instantáneo",
		imagen: "public/img/Categoria_Cafe_Instantaneo.png",
		link: "#instantaneo"
	},
	{
		nombre: "Café en Sobres",
		imagen: "public/img/Categoria_Cafe_en_Sobres.png",
		link: "#sobres"
	}
];

const Categorias = () => {
	return (
		<section className="categorias-section">
			<h2 className="categorias-title">Categorías</h2>
			<div className="categorias-list">
				{categorias.map((cat, idx) => (
					<a href={cat.link} className="categoria-item" key={idx}>
						<img src={cat.imagen} alt={cat.nombre} className="categoria-img" />
						<span className="categoria-nombre">{cat.nombre}</span>
					</a>
				))}
			</div>
		</section>
	);
};

export default Categorias;
