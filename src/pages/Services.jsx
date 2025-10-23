import React from 'react';
import { motion } from 'framer-motion';

export default function Services(){
  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} className="max-w-7xl mx-auto px-6 mt-12 text-gray-200">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent mb-8">Design Services</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {title:'Logo Design',desc:'Brand marks, logotypes, and brand guidelines.'},
          {title:'Printing & Layout',desc:'Flyers, business cards, and banners.'},
          {title:'Mockups & Product Shots',desc:'Realistic visuals for your products.'},
        ].map((s,i)=> (
          <motion.div key={i} whileHover={{scale:1.05}} className="p-6 bg-gray-900 rounded-xl border border-pink-500/40 shadow-lg hover:shadow-pink-500/30 transition">
            <h4 className="text-xl font-semibold text-pink-400">{s.title}</h4>
            <p className="mt-2 text-sm text-gray-400">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
