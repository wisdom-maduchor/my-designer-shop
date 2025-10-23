import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProductsHook } from '../lib/products.js';
import { useCart } from '../lib/cart-context.jsx';

export default function ProductDetail(){
  const { id } = useParams();
  const { products } = useProductsHook();
  const { add } = useCart();
  const [customText, setCustomText] = useState('');
  const [previewFile, setPreviewFile] = useState(null);

  const product = products.find(p => p.id === id);
  if (!product) return <div className="p-6">Product not found</div>;

  function handleUpload(e){
    const f = e.target.files[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = ()=> setPreviewFile(reader.result);
    reader.readAsDataURL(f);
  }

  const imgSrc = previewFile
    ? previewFile
    : product.img?.startsWith('http')
    ? product.img
    : product.img?.startsWith('/')
    ? product.img
    : `/${product.img}`;

  return (
    <motion.main initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto px-6 mt-12 text-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-900 p-8 rounded-2xl shadow-lg border border-pink-500/30">
        <motion.div whileHover={{ scale: 1.03 }} className="flex justify-center items-center bg-gradient-to-br from-gray-800 to-gray-950 rounded-xl overflow-hidden">
          <img src={imgSrc} alt={product.title} className="max-h-96 rounded-lg object-contain"/>
        </motion.div>

        <div>
          <h2 className="text-3xl font-extrabold text-pink-400">{product.title}</h2>
          <p className="mt-3 text-yellow-400 text-xl font-semibold">${product.price.toFixed(2)}</p>

          <div className="mt-6 space-y-4">
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="text-sm font-semibold text-gray-300">Upload Artwork</label>
              <input type="file" accept="image/*" onChange={handleUpload} className="mt-2 w-full bg-gray-800 text-gray-200 border border-gray-600 rounded p-2"/>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="text-sm font-semibold text-gray-300">Custom Text</label>
              <input value={customText} onChange={(e)=>setCustomText(e.target.value)} placeholder="e.g. brand name" className="mt-2 w-full bg-gray-800 text-gray-200 border border-gray-600 rounded p-2"/>
            </motion.div>

            <div className="flex gap-3 mt-6">
              <motion.button whileTap={{ scale: 0.95 }} onClick={()=> add(product, 1, { customText, previewFile })} className="px-5 py-2 bg-gradient-to-r from-pink-600 to-yellow-400 text-white font-semibold rounded-lg shadow-md hover:shadow-pink-500/30">Add to Cart</motion.button>
              <Link to="/checkout" className="px-5 py-2 border border-pink-400 text-pink-300 rounded-lg hover:bg-pink-500 hover:text-white transition">Buy Now</Link>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
