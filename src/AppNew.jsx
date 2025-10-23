import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';
import { CartProvider } from './lib/cart-context.jsx';

// Pages
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import CartPage from './pages/CartPage.jsx';
import Checkout from './pages/Checkout.jsx';
import Services from './pages/Services.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Admin from './pages/Admin.jsx';

export default function App(){
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<RootLayout />}> 
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<div className="p-6">Not found — <a href="/" className="underline">Home</a></div>} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}
