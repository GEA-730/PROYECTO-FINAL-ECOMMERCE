import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './paginas/HomePage';
import ProductDetailPage from './paginas/ProductDetailPage';
import CartPage from './paginas/CartPage';
import OrderPage from './paginas/OrderPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        
      
      </Routes>
    </Router>
  );
}

export default App;