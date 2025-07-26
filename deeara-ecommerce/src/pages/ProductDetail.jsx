import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, ShoppingBag, Star, Truck, Shield, RotateCcw } from 'lucide-react'
import { getProductById } from '../lib/database'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { useCurrency } from '../contexts/CurrencyContext'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { user } = useAuth()
  const { symbol, rate } = useCurrency()

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    setLoading(true)
    try {
      const productData = await getProductById(id)
      if (productData) {
        setProduct(productData)
        setSelectedSize(productData.sizes[0] || '')
        setSelectedColor(productData.colors[0] || '')
      }
    } catch (error) {
      console.error('Error loading product:', error)
      toast.error('Failed to load product details')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please sign in to add items to cart')
      return
    }
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color')
      return
    }
    await addToCart(product, quantity, selectedSize, selectedColor)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-sugar py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-bisque/60 rounded-full w-32 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-96 bg-bisque/60 rounded-3xl" />
              <div className="space-y-6">
                <div className="h-8 bg-bisque/60 rounded-full w-3/4" />
                <div className="h-6 bg-bisque/60 rounded-full w-1/2" />
                <div className="h-4 bg-bisque/60 rounded-full w-full" />
                <div className="h-4 bg-bisque/60 rounded-full w-2/3" />
                <div className="h-12 bg-bisque/60 rounded-full w-1/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-sugar py-16 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 bg-bisque/60 p-12 rounded-glass shadow-soft text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl font-serif font-bold text-primary-dark mb-4">
              Product Not Found
            </h1>
            <p className="text-xl text-card-bg font-sans mb-8">
              The product you're looking for doesn't exist.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-cta-green text-primary-dark rounded-full font-semibold hover:bg-card-bg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Products</span>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sugar py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-card-bg hover:text-cta-green transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Products</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-soft">
              <img
                src={product.images[selectedImage] || product.images[0] || 'https://via.placeholder.com/600x700'}
                alt={product.name}
                className="w-full h-64 sm:h-96 lg:h-[600px] object-cover"
                style={{ background: '#FCF8F0' }}
              />
              {/* Badges */}
              {product.is_limited_edition && (
                <div className="absolute top-6 left-6 bg-gold text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest shadow">
                  Limited Edition
                </div>
              )}
              {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow">
                  Only {product.stock_quantity} left
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 sm:space-x-4 overflow-x-auto">
                {(window.innerWidth < 640 ? product.images.slice(0, 2) : product.images).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? 'border-cta-green shadow-lg'
                        : 'border-card-bg hover:border-cta-green'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Product Title and Price */}
            <div>
              <h1 className="text-4xl font-bold text-primary-dark mb-4 tracking-wide" style={{ fontFamily: 'Optima, system-ui, serif' }}>
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-3xl font-bold text-cta-green" style={{ fontFamily: 'Optima, system-ui, serif' }}>
                  {symbol}{(product.price * rate).toFixed(2)}
                </div>
                {product.original_price && product.original_price > product.price && (
                  <div className="text-xl text-card-bg line-through">
                    {symbol}{(product.original_price * rate).toFixed(2)}
                  </div>
                )}
              </div>
              <p className="text-lg text-card-bg leading-relaxed" style={{ fontFamily: 'Optima, system-ui, serif' }}>
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-primary-dark mb-4" style={{ fontFamily: 'Optima, system-ui, serif' }}>
                Select Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-full border-2 transition-all duration-200 font-medium ${
                      selectedSize === size
                        ? 'border-cta-green bg-cta-green text-white shadow-lg'
                        : 'border-card-bg text-primary-dark hover:border-cta-green hover:bg-cta-green/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-primary-dark mb-4" style={{ fontFamily: 'Optima, system-ui, serif' }}>
                Select Color
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 rounded-full border-2 transition-all duration-200 font-medium ${
                      selectedColor === color
                        ? 'border-cta-green bg-cta-green text-white shadow-lg'
                        : 'border-card-bg text-primary-dark hover:border-cta-green hover:bg-cta-green/10'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className="text-lg font-semibold text-primary-dark mb-4" style={{ fontFamily: 'Optima, system-ui, serif' }}>
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full border-2 border-card-bg text-primary-dark hover:border-cta-green hover:bg-cta-green/10 transition-colors flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-xl font-semibold text-primary-dark w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full border-2 border-card-bg text-primary-dark hover:border-cta-green hover:bg-cta-green/10 transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-cta-green text-primary-dark rounded-full font-semibold shadow-soft hover:bg-card-bg hover:text-cta-green transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Add to Cart</span>
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-card-bg text-primary-dark rounded-full font-semibold hover:border-cta-green hover:bg-cta-green/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Product Features */}
            <div className="bg-bisque/40 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-primary-dark mb-4" style={{ fontFamily: 'Optima, system-ui, serif' }}>
                Product Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-cta-green" />
                  <span className="text-card-bg">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-cta-green" />
                  <span className="text-card-bg">Secure Payment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-cta-green" />
                  <span className="text-card-bg">Easy Returns</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-cta-green" />
                  <span className="text-card-bg">Premium Quality</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            {product.material && (
              <div>
                <h3 className="text-lg font-semibold text-primary-dark mb-2" style={{ fontFamily: 'Optima, system-ui, serif' }}>
                  Material
                </h3>
                <p className="text-card-bg">{product.material}</p>
              </div>
            )}

            {product.care_instructions && (
              <div>
                <h3 className="text-lg font-semibold text-primary-dark mb-2" style={{ fontFamily: 'Optima, system-ui, serif' }}>
                  Care Instructions
                </h3>
                <p className="text-card-bg">{product.care_instructions}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 