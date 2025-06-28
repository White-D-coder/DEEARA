import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-cinzel font-bold text-deep-mauve mb-4">
            Sign in to view your cart
          </h2>
          <Link to="/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-ivory py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-cinzel font-bold text-deep-mauve mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-xl text-gray-600 font-inter mb-8">
              Discover our exclusive collection and add some luxury to your wardrobe
            </p>
            <Link to="/products" className="btn-primary">
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-cinzel font-bold text-deep-mauve mb-8">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-luxury p-6"
                >
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <img
                      src={item.product.images[0] || 'https://via.placeholder.com/100x100'}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-playfair font-semibold text-deep-mauve mb-2">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="text-gold font-bold text-lg">
                        ${item.product.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gold hover:text-white transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gold hover:text-white transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Clear Cart Button */}
              <div className="text-right">
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card-luxury p-6 sticky top-24">
                <h2 className="text-2xl font-cinzel font-bold text-deep-mauve mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${(getCartTotal() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-champagne pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-deep-mauve">Total</span>
                      <span className="text-lg font-bold text-gold">
                        ${(getCartTotal() * 1.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/payment"
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-4"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <div className="mt-4 text-center">
                  <Link to="/products" className="text-gold hover:text-deep-mauve transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Cart 