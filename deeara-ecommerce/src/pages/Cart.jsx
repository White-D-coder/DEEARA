import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { useCurrency } from '../contexts/CurrencyContext'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const { symbol, rate } = useCurrency()

  if (!user) {
    return (
      <div className="min-h-screen bg-sugar flex items-center justify-center">
        <div className="text-center bg-bisque/60 p-12 rounded-glass shadow-soft">
          <h2 className="text-3xl font-serif font-bold text-mocha mb-6">
            Sign in to view your cart
          </h2>
          <Link to="/login" className="bg-pistachio text-espresso px-8 py-3 rounded-glass font-serif text-lg shadow-soft hover:bg-wheat hover:text-espresso transition">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-sugar py-16 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center bg-bisque/60 p-12 rounded-glass shadow-soft">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl font-serif font-bold text-mocha mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-xl text-wheat font-sans mb-8">
              Discover our exclusive collection and add some luxury to your wardrobe
            </p>
            <Link to="/products" className="bg-pistachio text-espresso px-8 py-3 rounded-glass font-serif text-lg shadow-soft hover:bg-wheat hover:text-espresso transition">
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sugar py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-serif font-bold text-mocha mb-10">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="bg-bisque/60 p-8 rounded-glass flex items-center gap-8 shadow-soft"
                >
                    {/* Product Image */}
                    <img
                      src={item.product.images[0] || 'https://via.placeholder.com/100x100'}
                      alt={item.product.name}
                    className="w-28 h-28 object-cover rounded-xl border-2 border-pistachio"
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                    <h3 className="text-xl font-serif font-semibold text-mocha mb-2">
                        {item.product.name}
                      </h3>
                    <p className="text-wheat text-base mb-2">
                        Size: {item.size} | Color: {item.color}
                      </p>
                    <p className="text-pistachio font-bold text-lg">
                      {symbol}{(item.product.price * rate).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 bg-sugar border border-wheat/40 rounded-full text-mocha hover:bg-pistachio hover:text-espresso transition"
                      >
                      <Minus className="h-5 w-5" />
                      </button>
                    <span className="w-8 text-center font-medium text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 bg-sugar border border-wheat/40 rounded-full text-mocha hover:bg-pistachio hover:text-espresso transition"
                      >
                      <Plus className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                    className="p-2 bg-sugar border border-wheat/40 rounded-full text-red-500 hover:bg-wheat hover:text-espresso ml-2 transition"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                </motion.div>
              ))}

              {/* Clear Cart Button */}
              <div className="text-right">
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-espresso font-semibold transition-colors underline underline-offset-4"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-bisque/60 p-8 rounded-glass sticky top-24 shadow-soft">
                <h2 className="text-2xl font-serif font-bold text-mocha mb-8">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-wheat">Subtotal</span>
                    <span className="font-medium">{symbol}{(getCartTotal() * rate).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-wheat">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-wheat">Tax</span>
                    <span className="font-medium">{symbol}{((getCartTotal() * 0.08) * rate).toFixed(2)}</span>
                  </div>
                  <hr className="border-t border-wheat opacity-30 my-2" />
                    <div className="flex justify-between">
                    <span className="text-lg font-bold text-mocha">Total</span>
                    <span className="text-lg font-bold text-pistachio">
                      {symbol}{((getCartTotal() * 1.08) * rate).toFixed(2)}
                      </span>
                  </div>
                </div>

                <Link
                  to="/payment"
                  className="w-full bg-pistachio text-espresso flex items-center justify-center gap-2 py-4 text-lg font-semibold rounded-glass shadow-soft hover:bg-wheat hover:text-espresso transition"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <div className="mt-6 text-center">
                  <Link to="/products" className="text-wheat hover:text-pistachio transition-colors underline underline-offset-4">
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