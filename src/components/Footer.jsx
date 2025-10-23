import React from 'react';
import { motion } from 'framer-motion';

export default function Footer(){
  return (
    <footer className="bg-gray-950 mt-12 py-4 border-t border-gray-800">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-400" style={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} MyDesignerShop. All rights reserved
      </motion.p>
    </footer>
  );
}
