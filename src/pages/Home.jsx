import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home(){
  return (
    <main className="max-w-7xl mx-auto px-6 mt-10">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">Custom logos, printing & product mockups</h1>
            <p className="mt-4 text-gray-300">I design brand identities, print-ready art, and realistic mockups for cups, caps, key holders and more. Order design-only, or request a full print + mockup pack.</p>
            <div className="mt-5 space-x-3">
              <Link to="/services" className="px-5 py-2.5 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition">See services</Link>
              <Link to="/shop" className="px-5 py-2.5 border border-pink-400 text-pink-400 rounded-lg hover:bg-pink-600 hover:text-white transition">Shop mockups</Link>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-6 shadow-xl">
          <h3 className="font-semibold text-yellow-400">Featured Offers</h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li>✨ Logo design — from $40</li>
            <li>☕ Branded mug mockups — from $12</li>
            <li>🧢 Caps & textiles mockups — from $15</li>
            <li>📦 Bulk printing quotes available</li>
          </ul>
        </motion.div>
      </section>

      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-14">
        <h2 className="text-3xl font-semibold text-center text-pink-500">Why Choose Me?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {title: 'Professional Files', desc: 'Print-ready vector files and high-res mockups included.'},
            {title: 'Fast Turnaround', desc: 'Quick design drafts and mockups for approvals.'},
            {title: 'Physical Mockups', desc: 'Realistic digital mockups for cups, caps, and more.'},
          ].map((f, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-5 bg-gray-900 text-gray-300 rounded-xl border border-pink-500/40 hover:border-yellow-400 transition">
              <h4 className="font-bold text-pink-400">{f.title}</h4>
              <p className="text-sm mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
