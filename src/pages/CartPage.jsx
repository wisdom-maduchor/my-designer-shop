import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../lib/cart-context.jsx';

export default function CartPage(){
  const { cart, remove, updateQty, total, clear } = useCart();
  const nav = useNavigate();

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 mt-12 text-gray-200">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="mt-6 text-gray-400">Your cart is empty. <Link to="/shop" className="underline text-pink-400">Shop now</Link></p>
      ) : (
        <motion.div layout className="mt-6 space-y-4">
          {cart.map(item => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-gray-900 border border-pink-500/30 rounded-xl shadow-lg flex justify-between items-center hover:shadow-pink-500/20 transition">
              <div>
                <h3 className="font-semibold text-pink-400">{item.title}</h3>
                {item.meta?.customText && <p className="text-sm text-gray-400">Custom: {item.meta.customText}</p>}
              </div>
              <div className="flex items-center gap-3">
                <input type="number" min={1} value={item.qty} onChange={(e)=>updateQty(item.id, +e.target.value)} className="w-16 bg-gray-800 text-center border border-gray-600 rounded" />
                <div className="text-yellow-400 font-semibold">${(item.price * item.qty).toFixed(2)}</div>
                <button onClick={()=>remove(item.id)} className="text-sm px-3 py-1 border border-pink-400 text-pink-400 rounded-lg hover:bg-pink-600 hover:text-white transition">Remove</button>
              </div>
            </motion.div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <div className="text-lg font-bold text-yellow-400">Total: ${total.toFixed(2)}</div>
            <div className="space-x-3">
              <button onClick={()=>nav('/checkout')} className="px-5 py-2 bg-gradient-to-r from-pink-600 to-yellow-400 text-white rounded-lg font-semibold">Checkout</button>
              <button onClick={clear} className="px-5 py-2 border border-gray-600 rounded-lg text-gray-300 hover:border-pink-500 transition">Clear</button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.main>
  );
}
