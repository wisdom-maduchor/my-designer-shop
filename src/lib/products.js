import { useEffect, useState } from 'react';
import { storageKey } from './cart-context.jsx';

export const SAMPLE_PRODUCTS = [
  { id: 'p1', title: 'Branded Mug Mockup (White)', price: 12.0, category: 'mugs', img: 'src/assets/novet.jpg', inventory: 120, tags: ['mug','mockup'] },
  { id: 'p2', title: 'Classic Cap Mockup', price: 15.0, category: 'caps', img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg', inventory: 60, tags: ['cap','mockup'] },
  { id: 'p3', title: 'Key Holder Mockup (Wood)', price: 8.5, category: 'keyholders', img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg', inventory: 200, tags: ['key','mockup'] },
  { id: 'p4', title: 'Logo Design - Starter', price: 40.0, category: 'services', img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg', inventory: 9999, tags: ['logo','service'] },
  { id: 'p5', title: 'Flyer Design - A5', price: 25.0, category: 'printing', img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg', inventory: 9999, tags: ['print','flyer'] },
];

function useProducts() {
  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey('products'));
      if (raw) return JSON.parse(raw);
      localStorage.setItem(storageKey('products'), JSON.stringify(SAMPLE_PRODUCTS));
      return SAMPLE_PRODUCTS;
    } catch {
      return SAMPLE_PRODUCTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey('products'), JSON.stringify(products));
  }, [products]);

  const addProduct = (p) => setProducts(prev => [p, ...prev]);
  const updateProduct = (id, patch) => setProducts(prev => prev.map(x => (x.id === id ? { ...x, ...patch } : x)));
  const removeProduct = (id) => setProducts(prev => prev.filter(x => x.id !== id));

  return { products, addProduct, updateProduct, removeProduct };
}

let _sharedProductsState = null;
export function useProductsHook() {
  if (!_sharedProductsState) _sharedProductsState = useProducts();
  return _sharedProductsState;
}
