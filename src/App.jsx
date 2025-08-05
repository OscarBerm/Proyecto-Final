import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductRegister from './pages/ProductRegister/ProductRegister';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/ProductRegister" element={<ProductRegister/>} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
