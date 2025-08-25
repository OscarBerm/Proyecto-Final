import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_BASE } from '../data/constants';
import '../styles/Categorias.css';
import Loading from "./Loading";


const Categorias = ({ onSelectCategoria, categoriaActiva }) => {
	const [categorias, setCategorias] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const API_URL = `${URL_BASE}/category`;

	useEffect(() => {
		const fetchCategorias = async () => {
			try {
				const response = await fetch(API_URL);
				const data = await response.json();
				setCategorias(data);
			} catch (error) {
				console.error("Error al cargar las categorías'", error);
			} finally {
			setLoading(false);
			}
		};


		fetchCategorias();
	}, []);

	return (
		<section className="categorias-section">
			<h2 className="categorias-title">Categorías</h2>
			{loading ? (
			<Loading />
				) : (
			<div className="categorias-list">
				{categorias.map((cat, idx) => (
					<button
						className={`categoria-item ${categoriaActiva === cat.id ? 'active' : ''}`}
						key={idx}
						onClick={() => onSelectCategoria(cat.id, cat.nombre)}
					>
						<img src={cat.img_path} alt={cat.nombre} className="categoria-img" />
						<span className="categoria-nombre">{cat.nombre}</span>
					</button>
				))}
			</div>
				)}
		</section>
	);
};

export default Categorias;
