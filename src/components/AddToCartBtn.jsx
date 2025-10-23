import React from 'react';
import Button from './Button.jsx';
import { useCart } from '../lib/cart-context.jsx';

export default function AddToCartBtn({ product, className = '' }) {
  const { add } = useCart();
  return (
    <Button onClick={() => add(product, 1)} className={`px-3 py-1 border border-pink-200 text-pink-200 hover:bg-pink-600 hover:text-white ${className}`}>
      Add
    </Button>
  );
}
