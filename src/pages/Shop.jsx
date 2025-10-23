import React from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { useProductsHook } from '../lib/products.js';

export default function Shop(){
  const { products } = useProductsHook();
  return (
    <main className="max-w-7xl mx-auto px-6 mt-8">
      <h2 className="text-2xl font-semibold">Shop Mockups & Printables</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {products.filter(p => p.category !== 'services').map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
