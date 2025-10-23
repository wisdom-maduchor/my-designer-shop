import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AddToCartBtn from './AddToCartBtn.jsx';

export default function ProductCard({ product }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="border border-[color:var(--border)] rounded-xl overflow-hidden bg-[var(--surface)] shadow-lg transition">
      <div className="h-44 bg-[var(--muted)] flex items-center justify-center text-gray-400 text-center text-sm p-3">
        {product.img ? (
          <img src={product.img} alt={product.title} className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
        ) : (
          product.title
        )}
      </div>
      <div className="p-4 pt-3.5">
        <h3 className="font-semibold text-white">{product.title}</h3>
        <p className="mt-1 text-sm text-pink-400">${product.price.toFixed(2)}</p>
        <div className="mt-3 flex justify-between items-center">
          <Link to={`/product/${product.id}`} className="text-xs underline text-gray-300 hover:text-yellow-400">View</Link>
          <AddToCartBtn product={product} />
        </div>
      </div>
    </motion.div>
  );
}
