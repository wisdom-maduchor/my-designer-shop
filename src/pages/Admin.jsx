import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProductsHook } from '../lib/products.js';

export default function Admin(){
  const { products, addProduct } = useProductsHook();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('mugs');

  function create(){
    const p = { id: 'p'+Date.now(), title, price: Number(price), category, inventory: 100, img: '', tags: [] };
    addProduct(p);
    setTitle(''); setPrice('');
  }

  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} className="max-w-5xl mx-auto px-6 mt-12 text-gray-200">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">Admin Dashboard</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-gray-900 border border-pink-500/30 rounded-xl">
          <h4 className="font-semibold text-yellow-400 mb-3">Add Product</h4>
          <label className="block mt-2">Title</label>
          <input className="w-full bg-gray-800 p-2 rounded border border-gray-600 focus:border-pink-400" value={title} onChange={e=>setTitle(e.target.value)} />
          <label className="block mt-3">Price</label>
          <input className="w-full bg-gray-800 p-2 rounded border border-gray-600 focus:border-pink-400" value={price} onChange={e=>setPrice(e.target.value)} />
          <label className="block mt-3">Category</label>
          <select className="w-full bg-gray-800 p-2 rounded border border-gray-600 focus:border-pink-400" value={category} onChange={e=>setCategory(e.target.value)}>
            <option value="mugs">Mugs</option>
            <option value="caps">Caps</option>
            <option value="keyholders">Key Holders</option>
            <option value="printing">Printing</option>
          </select>
          <motion.button whileTap={{scale:0.95}} onClick={create} className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-pink-600 to-yellow-400 text-white font-semibold rounded-lg">Add Product</motion.button>
        </div>

        <div className="p-6 bg-gray-900 border border-pink-500/30 rounded-xl">
          <h4 className="font-semibold text-yellow-400">Product List</h4>
          <ul className="mt-3 space-y-2 max-h-64 overflow-auto">
            {products.map(p=> (
              <li key={p.id} className="border border-gray-700 p-2 rounded-lg text-sm flex justify-between">
                <span>{p.title}</span>
                <span className="text-pink-400">${p.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.main>
  );
}
