import { useState } from 'react';
import Navbar from "../components/Navbar";
import Categorias from "../components/Categorias";
import Seccion_de_Productos from "../components/Seccion_de_Productos";
import Footer from "../components/Footer";

const GalleryProducts = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  
  const toggleCategoria = (categoriaId) => {
  if (categoriaSeleccionada === categoriaId) {
    setCategoriaSeleccionada(null);
  } else {
    setCategoriaSeleccionada(categoriaId);
  }
};

	return (
		<div>
			<Navbar />
      <Categorias 
        onSelectCategoria={toggleCategoria} 
        categoriaActiva={categoriaSeleccionada}
      />      
      <Seccion_de_Productos 
        cant={15} 
        mostrarVerMas={false} 
        categoriaSeleccionada={categoriaSeleccionada}/>
			<Footer />
		</div>
	);
};

export default GalleryProducts;