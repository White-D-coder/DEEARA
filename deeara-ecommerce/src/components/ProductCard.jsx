import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import { useCurrency } from '../contexts/CurrencyContext'

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M')
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Black')
  const { addToCart } = useCart()
  const { user } = useAuth()
  const { symbol, rate } = useCurrency()

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please sign in to add items to cart')
      return
    }
    await addToCart(product, 1, selectedSize, selectedColor)
  }

  return (
    <motion.div
      className="card-luxury overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.images[0] || 'https://via.placeholder.com/400x500'}
          alt={product.name}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/20 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-gold hover:text-white transition-colors"
            >
              <Heart className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-gold hover:text-white transition-colors"
            >
              <Eye className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Limited Edition Badge */}
        {product.is_limited_edition && (
          <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-medium">
            Limited Edition
          </div>
        )}

        {/* Stock Badge */}
        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
            Only {product.stock_quantity} left
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-m font-playfair font-semibold text-deep-mauve mb-2 hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Size and Color Selection */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-700">Size:</span>
            <div className="flex space-x-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 py-1 text-xs rounded border ${
                    selectedSize === size
                      ? 'border-gold bg-gold text-white'
                      : 'border-gray-300 text-gray-600 hover:border-gold'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Color:</span>
            <div className="flex space-x-1">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-2 py-1 text-xs rounded border ${
                    selectedColor === color
                      ? 'border-gold bg-gold text-white'
                      : 'border-gray-300 text-gray-600 hover:border-gold'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="text-gold font-bold text-xl">
            {symbol}{(product.price * rate).toFixed(2)}
          </div>
          <motion.button
            onClick={handleAddToCart}
            className="btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard 