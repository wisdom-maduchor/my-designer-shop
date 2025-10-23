import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../lib/cart-context.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function Header(){
  const { cart } = useCart();
  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-400 shadow-md sticky top-0 z-30 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-wide">Novet<span className="text-yellow-300">Digitals</span></Link>
        <nav className="space-x-4 flex items-center">
          <Link to="/shop" className="hover:text-yellow-300 transition-colors">Shop</Link>
          <Link to="/services" className="hover:text-yellow-300 transition-colors">Services</Link>
          <Link to="/portfolio" className="hover:text-yellow-300 transition-colors">Portfolio</Link>
          <Link to="/admin" className="hover:text-yellow-300 transition-colors">Admin</Link>
          <Link to="/cart" className="ml-3 inline-block bg-white text-purple-700 px-3 py-1 rounded-full font-semibold hover:bg-yellow-200 transition">Cart ({cart.length})</Link>
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
