import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import GalleryProducts from "./pages/GalleryProducts";
import ProductRegister from "./pages/ProductRegister";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./components/Profile";
import UserContextProvider from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<GalleryProducts />} />
          <Route path="/productRegister" element={<ProductRegister />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/*
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} /> */}
          {/* <Route path='/Profile' element={<Profile />} />  */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
