import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from './context/UserContext'; 
import Home from "./pages/Home";
import GalleryProducts from "./pages/GalleryProducts";
import ProductRegister from "./pages/ProductRegister";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./components/Profile";
import Carrito from "./components/Carrito";
import FormularioDePago from "./components/Formulario_de_Pago";
import GraciasPorTuCompra from "./pages/GraciasPorTuCompra";
import EditProduct from "./pages/EditProduct";


function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<GalleryProducts />} />
          <Route path="/productRegister" element={<ProductRegister />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Carrito />} />
          <Route path="/checkout" element={<FormularioDePago />} />
          <Route path="/gracias" element={<GraciasPorTuCompra />} />
          <Route path='/Profile' element={<Profile />} /> 
          <Route path="/products/:id" element={<EditProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
