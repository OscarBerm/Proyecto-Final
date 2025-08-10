import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Register from './pages/Register';
import Login from'./pages/Login';
import UserContextProvider from './context/UserContext';

function App() {

  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* 
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} /> */}
      </Routes>
    </UserContextProvider>
  </BrowserRouter>
  )
}

export default App
