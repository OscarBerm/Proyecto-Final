import { useNavigate } from "react-router-dom";
import '../styles/Categorias.css';

const categorias = [
	{
		nombre: "Café en grano",
		tipo: "Grano",
		imagen: "public/img/Categoria_Cafe_en_Grano.png",
		link: "#cafe-grano"
	},
	{
		nombre: "Café molido",
		tipo: "Molido",
		imagen: "public/img/Categoria_Cafe_Molido.png",
		link: "#cafe-molido"
	},
	{
		nombre: "Café en cápsulas",
		tipo: "Capsulas",
		imagen: "public/img/Categoria_Cafe_en_Capsulas.png",
		link: "#capsulas"
	},
	{
		nombre: "Café Instantáneo",
		tipo: "Instantaneo",
		imagen: "public/img/Categoria_Cafe_Instantaneo.png",
		link: "#instantaneo"
	},
	{
		nombre: "Café en Sobres",
		tipo: "Sobres",
		imagen: "public/img/Categoria_Cafe_en_Sobres.png",
		link: "#sobres"
	}
];

const Categorias = ({ onSelectCategoria, categoriaActiva }) => {
	const navigate = useNavigate();
	
	return (
		<section className="categorias-section">
			<h2 className="categorias-title">Categorías</h2>
			<div className="categorias-list">
				{categorias.map((cat, idx) => (
					<button
						className={`categoria-item ${categoriaActiva === cat.tipo ? 'active' : ''}`}
						key={idx} 
						onClick={() => onSelectCategoria(cat.tipo)}>
						<img src={cat.imagen} alt={cat.nombre} className="categoria-img" />
						<span className="categoria-nombre">{cat.nombre}</span>
					</button>
				))}
			</div>
		</section>
	);
};

export default Categorias;
