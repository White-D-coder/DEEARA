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
      className="bg-bisque/60 rounded-3xl shadow-soft group overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.025] min-h-[480px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <img
          src={product.images[0] || 'https://via.placeholder.com/400x500'}
          alt={product.name}
          className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ background: '#FCF8F0' }}
        />
        {/* Limited Edition Badge */}
        {product.is_limited_edition && (
          <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest shadow">
            Limited Edition
          </div>
        )}
        {/* Stock Badge */}
        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow">
            Only {product.stock_quantity} left
          </div>
        )}
        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/90 rounded-full shadow hover:bg-pistachio hover:text-white transition-colors"
            >
              <Heart className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/90 rounded-full shadow hover:bg-pistachio hover:text-white transition-colors"
            >
              <Eye className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between p-6">
        <div>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-bold text-mocha mb-2 hover:text-pistachio transition-colors" style={{ fontFamily: 'Optima, system-ui, serif' }}>
              {product.name}
            </h3>
          </Link>
          <p className="text-wheat text-sm mb-4 line-clamp-2" style={{ fontFamily: 'Optima, system-ui, serif' }}>
            {product.description}
          </p>
        </div>
        {/* Size and Color Selection */}
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-mocha">Size:</span>
            <div className="flex gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 py-1 text-xs rounded-full border transition-all duration-200 ${
                    selectedSize === size
                      ? 'border-pistachio bg-pistachio text-white'
                      : 'border-wheat text-mocha hover:border-pistachio'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-mocha">Color:</span>
            <div className="flex gap-1">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-2 py-1 text-xs rounded-full border transition-all duration-200 ${
                    selectedColor === color
                      ? 'border-pistachio bg-pistachio text-white'
                      : 'border-wheat text-mocha hover:border-pistachio'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-2">
          <div className="text-pistachio font-bold text-xl" style={{ fontFamily: 'Optima, system-ui, serif' }}>
            {symbol}{(product.price * rate).toFixed(2)}
          </div>
          <motion.button
            onClick={handleAddToCart}
            className="flex items-center space-x-2 px-6 py-3 rounded-full text-base font-semibold bg-pistachio text-espresso shadow-soft hover:bg-wheat hover:text-espresso transition-all duration-300"
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