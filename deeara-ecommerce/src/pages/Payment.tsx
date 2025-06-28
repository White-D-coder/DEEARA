import React from 'react'
import { motion } from 'framer-motion'

const Payment: React.FC = () => {
  return (
    <div className="min-h-screen bg-ivory py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-cinzel font-bold text-deep-mauve mb-4">
            Payment
          </h1>
          <p className="text-xl text-gray-600 font-inter">
            Payment gateway integration coming soon...
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Payment 