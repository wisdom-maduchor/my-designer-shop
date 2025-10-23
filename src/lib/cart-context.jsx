import React, { createContext, useContext, useEffect, useState } from 'react';

const storageKey = (k) => `designer_shop_${k}`;
const CartContext = createContext();
export function useCart() { return useContext(CartContext); }

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey('cart'));
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey('cart'), JSON.stringify(cart));
  }, [cart]);

  const add = (product, qty = 1, meta = null) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id && JSON.stringify(p.meta) === JSON.stringify(meta));
      if (found) return prev.map(p => (p === found ? { ...p, qty: p.qty + qty } : p));
      return [...prev, { ...product, qty, meta }];
    });
  };

  const remove = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const updateQty = (id, qty) => setCart(prev => prev.map(p => (p.id === id ? { ...p, qty } : p)));
  const clear = () => setCart([]);

  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);

  return (
    <CartContext.Provider value={{ cart, add, remove, updateQty, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export { storageKey };
