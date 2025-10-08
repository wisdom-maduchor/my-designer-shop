import React, { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// -----------------------
// Sample Data & Utilities
// -----------------------
const SAMPLE_PRODUCTS = [
  { id: 'p1', title: 'Branded Mug Mockup (White)', price: 12.0, category: 'mugs', img: 'src/assets/novet.jpg', inventory: 120, tags: ['mug','mockup'] },
  { id: 'p2', title: 'Classic Cap Mockup', price: 15.0, category: 'caps', img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg', inventory: 60, tags: ['cap','mockup'] },
  { id: 'p3', title: 'Key Holder Mockup (Wood)', price: 8.5, category: 'keyholders', img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg', inventory: 200, tags: ['key','mockup'] },
  { id: 'p4', title: 'Logo Design - Starter', price: 40.0, category: 'services', img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg', inventory: 9999, tags: ['logo','service'] },
  { id: 'p5', title: 'Flyer Design - A5', price: 25.0, category: 'printing', img: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg', inventory: 9999, tags: ['print','flyer'] },
];

const storageKey = (k) => `designer_shop_${k}`;

// -----------------------
// Cart Context
// -----------------------
const CartContext = createContext();
function useCart(){ return useContext(CartContext); }

function CartProvider({children}){
  const [cart, setCart] = useState(() => {
    try{ const raw = localStorage.getItem(storageKey('cart')); return raw? JSON.parse(raw): []; }catch(e){ return []; }
  });

  useEffect(()=>{ localStorage.setItem(storageKey('cart'), JSON.stringify(cart)); }, [cart]);

  const add = (product, qty=1, meta=null) => {
    setCart(prev => {
      const found = prev.find(p=>p.id===product.id && JSON.stringify(p.meta)===JSON.stringify(meta));
      if(found){ return prev.map(p=> p===found? {...p, qty: p.qty+qty}: p); }
      return [...prev, { ...product, qty, meta }];
    });
  };

  const remove = (id) => setCart(prev => prev.filter(p=>p.id!==id));
  const updateQty = (id, qty) => setCart(prev=> prev.map(p=> p.id===id? {...p, qty}: p));
  const clear = ()=> setCart([]);

  const total = cart.reduce((s,p)=> s + p.price * p.qty, 0);

  return <CartContext.Provider value={{cart, add, remove, updateQty, clear, total}}>{children}</CartContext.Provider>
}

// -----------------------
// Local 'Database' hook
// -----------------------
function useProducts(){
  const [products, setProducts] = useState(()=>{
    try{ 
      const raw = localStorage.getItem(storageKey('products')); 
      if(raw) return JSON.parse(raw); 
        localStorage.setItem(storageKey('products'), 
        JSON.stringify(SAMPLE_PRODUCTS)); 
        return SAMPLE_PRODUCTS; 
    }catch(e){ 
      return SAMPLE_PRODUCTS; 
    }
  });

  useEffect(()=>{ localStorage.setItem(storageKey('products'), JSON.stringify(products)); }, [products]);

  const addProduct = (p) => setProducts(prev => [p, ...prev]);
  const updateProduct = (id, patch) => setProducts(prev => prev.map(x=> x.id===id? {...x,...patch}: x));
  const removeProduct = (id) => setProducts(prev => prev.filter(x=>x.id!==id));

  return {products, addProduct, updateProduct, removeProduct};
}

// -----------------------
// UI Components
// -----------------------
function Header(){
  const {cart} = useCart();
  return (
    <motion.header 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-400 shadow-md sticky top-0 z-30 text-white"
    >
    {/* <header className="bg-white shadow-sm sticky top-0 z-30"> */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* <Link to="/" className="text-2xl font-bold">DesignerShop</Link> */}
        
        <Link to="/" className="text-2xl font-extrabold tracking-wide">Novet<span className="text-yellow-300">Digitals</span></Link>
        <nav className="space-x-4">
          <Link to="/shop" className="hover:text-yellow-300 transition-colors">Shop</Link>
          <Link to="/services" className="hover:text-yellow-300 transition-colors">Services</Link>
          <Link to="/portfolio" className="hover:text-yellow-300 transition-colors">Portfolio</Link>
          <Link to="/admin" className="hover:text-yellow-300 transition-colors">Admin</Link>
          <Link to="/cart" className="ml-3 inline-block bg-white text-purple-700 px-3 py-1 rounded-full font-semibold hover:bg-yellow-200 transition">Cart ({cart.length})</Link>
        </nav>
      </div>
    {/* </header> */}
    </motion.header>
  );
}

function Footer(){
  return (
    <footer className="bg-gray-950 mt-12 py-4 border-t border-gray-800">
      {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400"
        >
      <div className="max-w-6xl mx-auto px-4 text-sm text-gray-400">
        <div className="flex justify-between">
          <div>© {new Date().getFullYear()} DesignerShop • Built for a graphic designer</div>
          <div>Contact: <a href="mailto:hello@designer.shop" className="underline">hello@designer.shop</a></div>
        </div>
      </div>
      </motion.p> */}

       <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400"
          style={{ textAlign: 'center' }} 
        >
          © {new Date().getFullYear()} MyDesignerShop. All rights reserved 
        </motion.p>
    </footer>
  );
}

// -----------------------
// Pages
// -----------------------
function Home(){
  return (
    <main className="max-w-6xl mx-auto px-4 mt-8">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
        <div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">Custom logos, printing & product mockups</h1>
          <p className="mt-4 text-gray-700">I design brand identities, print-ready art, and realistic mockups for cups, caps, key holders and more. Order design-only, or request a full print + mockup pack.</p>
          <div className="mt-5 space-x-3">
            <Link to="/services" className="px-5 py-2.5 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition">See services</Link>
            <Link to="/shop" className="px-5 py-2.5 border border-pink-400 text-pink-400 rounded-lg hover:bg-pink-600 hover:text-white transition">Shop mockups</Link>
          </div>
        </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-6 shadow-xl"
        >
        {/* <div className="bg-gray-100 rounded p-6"> */}
          <h3 className="font-semibold text-yellow-400">Featured Offers</h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li>✨ Logo design — from $40</li>
            <li>☕ Branded mug mockups — from $12</li>
            <li>🧢 Caps & textiles mockups — from $15</li>
            <li>📦 Bulk printing quotes available</li>
          </ul>
        {/* </div> */}
        </motion.div>
      </section>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-14"
      >
      {/* <section className="mt-10"> */}
        {/* <h2 className="text-3xl font-semibold text-center text-pink-500">Why choose me?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-4 border rounded">
            <h4 className="font-semibold">Professional files</h4>
            <p className="text-sm text-gray-600">Print-ready vector files and high-res mockups included.</p>
          </div>
          <div className="p-4 border rounded">
            <h4 className="font-semibold">Fast turnaround</h4>
            <p className="text-sm text-gray-600">Quick design drafts and mockups for approvals.</p>
          </div>
          <div className="p-4 border rounded">
            <h4 className="font-semibold">Physical mockups</h4>
            <p className="text-sm text-gray-600">Realistic digital mockups for cups, caps, key-holders, etc.</p>
          </div>
        </div> */}
      {/* </section> */}

       <h2 className="text-3xl font-semibold text-center text-pink-500">Why Choose Me?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {title: "Professional Files", desc: "Print-ready vector files and high-res mockups included."},
            {title: "Fast Turnaround", desc: "Quick design drafts and mockups for approvals."},
            {title: "Physical Mockups", desc: "Realistic digital mockups for cups, caps, and more."},
          ].map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-5 bg-gray-900 text-gray-300 rounded-xl border border-pink-500/40 hover:border-yellow-400 transition"
            >
              <h4 className="font-bold text-pink-400">{f.title}</h4>
              <p className="text-sm mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}

function Shop(){
  const { products } = useProductsHook();
  return (
    <main className="max-w-8xl mx-auto px-4 mt-8">
      <h2 className="text-2xl font-semibold">Shop Mockups & Printables</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {products.filter(p=>p.category!=='services').map(p=> (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}

function ProductCard({product}){
  return (
    // <div className="border rounded overflow-hidden shadow-sm">
    //   <div className="h-44 bg-gray-100 flex items-center justify-center">{product.title}</div>
    //   <div className="p-4">
    //     <h3 className="font-semibold">{product.title}</h3>
    //     <p className="mt-2 text-sm text-gray-600">${product.price.toFixed(2)}</p>
    //     <div className="mt-3 flex items-center justify-between">
    //       <Link to={`/product/${product.id}`} className="text-sm underline">View</Link>
    //       <AddToCartBtn product={product} />
    //     </div>
    //   </div>
    // </div>

    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="border border-gray-700 rounded-xl overflow-hidden bg-gray-900 shadow-lg hover:shadow-pink-500/30 transition"
    >
      <div className="h-44 bg-gray-800 flex items-center justify-center text-gray-400 text-center text-sm p-3">
        {product.img ? <img src={product.img} alt={product.title} className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"/> : product.title}
      </div>
      <div className="p-4 pt-35">
        <h3 className="font-semibold text-white">{product.title}</h3>
        <p className="mt-1 text-sm text-pink-400">${product.price.toFixed(2)}</p>
        <div className="mt-3 flex justify-between items-center">
          <Link to={`/product/${product.id}`} className="text-xs underline text-gray-300 hover:text-yellow-400">
            View
          </Link>
          <AddToCartBtn product={product} />
        </div>
      </div>
    </motion.div>
  );
}

function AddToCartBtn({product}){
  const { add } = useCart();
  return <button onClick={()=> add(product, 1)} className="px-3 py-1 border border-pink-200 text-pink-200 rounded-lg hover:bg-pink-600 hover:text-white transition ">Add</button>
}

function ProductDetail(){
  const { id } = useParams();
  const { products } = useProductsHook();
  const product = products.find(p=>p.id===id);
  const { add } = useCart();
  const [customText, setCustomText] = useState('');
  const [previewFile, setPreviewFile] = useState(null);

  if(!product) return <div className="p-6">Product not found</div>;

  function handleUpload(e){
    const f = e.target.files[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = ()=> setPreviewFile(reader.result);
    reader.readAsDataURL(f);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-80 bg-gray-100 flex items-center justify-center">{previewFile ? <img src={product.img} alt="preview" className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"/> : product.img}</div>
        <div>
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <p className="mt-2 text-gray-700">${product.price.toFixed(2)}</p>
          <div className="mt-4">
            <label className="block text-sm">Upload artwork (optional)</label>
            <input type="file" accept="image/*" onChange={handleUpload} className="mt-2" />
            <label className="block text-sm mt-3">Custom text for mockup</label>
            <input value={customText} onChange={e=>setCustomText(e.target.value)} placeholder="e.g. brand name" className="mt-2 border rounded px-2 py-1 w-full" />
          </div>
          <div className="mt-4 space-x-2">
            <button onClick={()=> add(product,1, {customText, previewFile})} className="px-4 py-2 bg-black text-white rounded">Add to cart</button>
            <Link to="/checkout" className="px-4 py-2 border rounded">Buy now</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function CartPage(){
  const { cart, remove, updateQty, total, clear } = useCart();
  const nav = useNavigate();

  return (
    <main className="max-w-4xl mx-auto px-4 mt-8">
      <h2 className="text-2xl font-semibold">Your Cart</h2>
      {!cart.length && <div className="mt-6 text-gray-600">Cart empty. <Link to="/shop" className="underline">Shop now</Link></div>}
      <div className="mt-4 space-y-4">
        {cart.map(item=> (
          <div key={item.id+JSON.stringify(item.meta)} className="p-4 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{item.title}</div>
              {item.meta?.customText && <div className="text-sm text-gray-600">Custom: {item.meta.customText}</div>}
            </div>
            <div className="flex items-center gap-3">
              <input type="number" min={1} value={item.qty} onChange={(e)=> updateQty(item.id, Number(e.target.value))} className="w-16 border rounded px-2 py-1" />
              <div>${(item.price*item.qty).toFixed(2)}</div>
              <button onClick={()=> remove(item.id)} className="px-3 py-1 border rounded">Remove</button>
            </div>
          </div>
        ))}
      </div>
      {cart.length>0 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
          <div>
            <button onClick={()=> nav('/checkout')} className="px-4 py-2 bg-black text-white rounded">Checkout</button>
            <button onClick={clear} className="ml-2 px-4 py-2 border rounded">Clear</button>
          </div>
        </div>
      )}
    </main>
  );
}

function Checkout(){
  const { cart, total, clear } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState(null);
  const nav = useNavigate();

  function placeOrder(){
    // In real app, send to backend. Here we simulate success.
    const order = { id: 'ORD'+Date.now(), name, email, address, cart, total, date: new Date().toISOString() };
    localStorage.setItem(storageKey('last_order'), JSON.stringify(order));
    clear();
    setMessage('Order placed! ID: ' + order.id);
    setTimeout(()=> nav('/'), 2000);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 mt-8">
      <h2 className="text-2xl font-semibold">Checkout</h2>
      {!cart.length && <div className="mt-6">Your cart is empty — <Link to="/shop" className="underline">shop</Link></div>}
      {cart.length>0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block">Full name</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded px-2 py-1" />
            <label className="block mt-3">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded px-2 py-1" />
            <label className="block mt-3">Shipping address</label>
            <textarea value={address} onChange={e=>setAddress(e.target.value)} className="w-full border rounded px-2 py-1" />
            <button onClick={placeOrder} className="mt-4 px-4 py-2 bg-black text-white rounded">Place order (${total.toFixed(2)})</button>
            {message && <div className="mt-3 text-green-600">{message}</div>}
          </div>
          <div>
            <h4 className="font-semibold">Order summary</h4>
            <ul className="mt-3 space-y-2">
              {cart.map(i=> <li key={i.id+JSON.stringify(i.meta)} className="flex justify-between"><span>{i.title} x{i.qty}</span><span>${(i.price*i.qty).toFixed(2)}</span></li>)}
            </ul>
            <div className="mt-4 font-semibold">Total: ${total.toFixed(2)}</div>
          </div>
        </div>
      )}
    </main>
  );
}

function Services(){
  return (
    <main className="max-w-6xl mx-auto px-4 mt-8">
      <h2 className="text-2xl font-semibold">Design Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-4 border rounded">
          <h4 className="font-semibold">Logo Design</h4>
          <p className="text-sm text-gray-600 mt-2">Brand marks, logotypes, and brand guidelines. Revisions included.</p>
        </div>
        <div className="p-4 border rounded">
          <h4 className="font-semibold">Printing & Layout</h4>
          <p className="text-sm text-gray-600 mt-2">Flyers, business cards, banners, and print setup for any press.</p>
        </div>
        <div className="p-4 border rounded">
          <h4 className="font-semibold">Mockups & Product Shots</h4>
          <p className="text-sm text-gray-600 mt-2">Realistic mockups for cups, caps, bottles, and more.</p>
        </div>
      </div>
    </main>
  );
}

function Portfolio(){
  return (
    <main className="max-w-6xl mx-auto px-4 mt-8">
      <h2 className="text-2xl font-semibold">Portfolio</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="h-40 bg-gray-100 rounded flex items-center justify-center">Logo pack</div>
        <div className="h-40 bg-gray-100 rounded flex items-center justify-center">Mug mockup</div>
        <div className="h-40 bg-gray-100 rounded flex items-center justify-center">Cap mockup</div>
      </div>
    </main>
  );
}

// Simple admin UI that writes into localStorage
function Admin(){
  const { products, addProduct } = useProductsHook();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('mugs');

  function create(){
    const p = { id: 'p'+Date.now(), title, price: Number(price), category, inventory: 100, img: '', tags: [] };
    addProduct(p);
    setTitle(''); 
    setPrice('');
  }

  return (
    <main className="max-w-4xl mx-auto px-4 mt-8">
      <h2 className="text-2xl font-semibold">Admin</h2>
      <div className="mt-4 p-4 border rounded grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border rounded px-2 py-1" />
          <label className="block mt-2">Price</label>
          <input value={price} onChange={e=>setPrice(e.target.value)} className="w-full border rounded px-2 py-1" />
          <label className="block mt-2">Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full border rounded px-2 py-1">
            <option value="mugs">Mugs</option>
            <option value="caps">Caps</option>
            <option value="keyholders">Key Holders</option>
            <option value="printing">Printing</option>
          </select>
          <button onClick={create} className="mt-4 px-4 py-2 bg-black text-white rounded">Create Product</button>
        </div>
        <div>
          <h4 className="font-semibold">Existing products</h4>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            {products.map(p=> <li key={p.id} className="border p-2 rounded">{p.title} — ${p.price}</li>)}
          </ul>
        </div>
      </div>
    </main>
  );
}

// -----------------------
// Helper hook to share products store
// -----------------------
let _sharedProductsState = null; // small hack so useProductsHook can be used in multiple places in this single-file demo
function useProductsHook(){
  if(!_sharedProductsState) _sharedProductsState = useProducts();
  return _sharedProductsState;
}

// -----------------------
// App (routes)
// -----------------------
export default function App(){
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col justify-between">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<div className="p-6">Not found — <Link to="/">Home</Link></div>} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

/*
---- END OF COMPONENT ----

Suggestions & Next steps (for real project):
- Split components into files under src/components and pages.
- Add an express / Laravel / Supabase backend to handle orders, file storage, and authentication.
- Integrate Stripe (or Paystack/Flutterwave in Nigeria) for payments.
- Use cloud storage (S3, Supabase Storage) for uploaded images and generate real mockups server-side or with WebGL.
- Add user accounts, order history, and admin authentication.

If you'd like, I can now:
- Split this into a multi-file repo scaffold (package.json, src/, tailwind config) and provide each file in the canvas, OR
- Add Stripe checkout integration and show the backend API stubs, OR
- Convert to Next.js with file-based routing and API routes.

Tell me which next step you want and I'll update the canvas.
*/
