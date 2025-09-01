import React from 'react';
import { motion } from 'framer-motion';

function Header() {
  return (
    <header className="text-center mb-12">
      {/* Optional Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-block px-4 py-1 mb-3 text-sm font-medium rounded-full 
                   bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30"
      >
        💰 Your Personal Finance Buddy
      </motion.div>

      {/* App Title */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent 
                   bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500"
      >
        SpendWise
        {/* Gradient underline */}
        <span className="absolute left-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transform -translate-x-1/2"></span>
      </motion.h1>

      {/* Tagline */}
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 text-gray-400 text-lg"
      >
        Smartly track, plan & grow your money 🚀
      </motion.p>
    </header>
  );
}

export default Header;
