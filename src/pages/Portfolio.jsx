import React from 'react';
import { motion } from 'framer-motion';

export default function Portfolio(){
  return (
    <motion.main initial={{opacity:0}} animate={{opacity:1}} className="max-w-7xl mx-auto px-6 mt-12 text-gray-200">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent mb-8">Portfolio</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {['Logo pack','Mug mockup','Cap mockup','Flyer design','Brand guide','Packaging'].map((item,i)=> (
          <motion.div key={i} whileHover={{scale:1.05}} className="h-48 bg-gray-900 flex justify-center items-center rounded-xl border border-pink-500/30 shadow hover:shadow-pink-500/20 transition">
            <p className="text-gray-300 font-semibold">{item}</p>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
