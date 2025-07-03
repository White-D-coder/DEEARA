import React from 'react'
import { motion } from 'framer-motion'

const Payment = () => {
  return (
    <div className="min-h-screen bg-sugar py-16 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 bg-bisque/60 p-12 rounded-glass shadow-soft text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-serif font-bold text-mocha mb-4">
            Payment
          </h1>
          <p className="text-xl text-wheat font-sans">
            Payment gateway integration coming soon...
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Payment 