import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../lib/cart-context.jsx';

export default function Checkout(){
  const { cart, total, clear } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState(null);

  function placeOrder(){
    const order = { id: 'ORD'+Date.now(), name, email, address, cart, total, date: new Date().toISOString() };
    localStorage.setItem('designer_shop_last_order', JSON.stringify(order));
    clear();
    setMessage('Order placed! ID: ' + order.id);
  }

  return (
    <motion.main initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-7xl mx-auto px-6 mt-12 text-gray-200">
      <h2 className="text-3xl font-extrabold text-pink-400">Checkout</h2>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl border border-pink-500/30 shadow-lg">
          <label className="block">Full name</label>
          <input className="w-full bg-gray-800 p-2 rounded border border-gray-600 focus:border-pink-400 outline-none transition" value={name} onChange={e=>setName(e.target.value)} />

          <label className="block mt-3">Email</label>
          <input className="w-full bg-gray-800 p-2 rounded border border-gray-600 focus:border-pink-400 outline-none" value={email} onChange={e=>setEmail(e.target.value)} />

          <label className="block mt-3">Address</label>
          <textarea className="w-full bg-gray-800 p-2 rounded border border-gray-600 focus:border-pink-400 outline-none" value={address} onChange={e=>setAddress(e.target.value)} />

          <motion.button whileTap={{ scale: 0.95 }} onClick={placeOrder} className="mt-5 px-5 py-2 bg-gradient-to-r from-pink-600 to-yellow-400 rounded-lg text-white font-semibold">
            Place Order (${total.toFixed(2)})
          </motion.button>
          {message && <p className="mt-3 text-green-500">{message}</p>}
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-pink-500/30 shadow-lg">
          <h3 className="font-semibold text-yellow-400">Order Summary</h3>
          {cart.map(i=> (
            <div key={i.id} className="flex justify-between text-sm mt-2">
              <span>{i.title} x{i.qty}</span>
              <span>${(i.price*i.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-4 font-bold text-yellow-400">Total: ${total.toFixed(2)}</div>
        </div>
      </div>
    </motion.main>
  );
}
