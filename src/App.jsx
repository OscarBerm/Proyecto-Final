import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import GalleryProducts from './pages/GalleryProducts';
import ProductRegister from './pages/ProductRegister'
import NotFound from './pages/NotFound'
import Profile from './components/Profile';

function App() {
	return (
		<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<GalleryProducts />} />
        <Route path="/productRegister" element={<ProductRegister />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} /> */}
        {/* <Route path='/Profile' element={<Profile />} />  */}
        <Route path='*' element={<NotFound />} /> 
      </Routes>
		</BrowserRouter>
	);
} 

export default App;