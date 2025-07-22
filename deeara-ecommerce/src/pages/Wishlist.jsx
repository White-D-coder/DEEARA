import React from 'react'
import { motion } from 'framer-motion'

const Wishlist = () => {
  return (
    <div className="min-h-screen bg-soft-bg py-16 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 bg-card-bg/60 p-12 rounded-glass shadow-soft text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-serif font-bold text-primary-dark mb-4">
            Wishlist
          </h1>
          <p className="text-xl text-card-bg font-sans">
            Wishlist functionality coming soon...
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Wishlist 