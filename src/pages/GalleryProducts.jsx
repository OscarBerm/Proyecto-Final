import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Categorias from "../components/Categorias";
import Seccion_de_Productos from "../components/Seccion_de_Productos";
import Footer from "../components/Footer";

const GalleryProducts = () => {
  const location = useLocation();

  const categoriaLocation = location.state?.categoriaId || null;
  const nombreLocation = location.state?.categoriaNombre || '';

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaLocation);
  const [nombreCategoriaSeleccionada, setNombreCategoriaSeleccionada] = useState(nombreLocation);

  const toggleCategoria = (categoriaId, categoriaNombre) => {
    if (categoriaSeleccionada === categoriaId) {
      setCategoriaSeleccionada(null);
      setNombreCategoriaSeleccionada('');
    } else {
      setCategoriaSeleccionada(categoriaId);
      setNombreCategoriaSeleccionada(categoriaNombre);
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
        categoriaSeleccionada={categoriaSeleccionada}
        nombreCategoriaSeleccionada={nombreCategoriaSeleccionada}
      />
      <Footer />
    </div>
  );
};

export default GalleryProducts;
