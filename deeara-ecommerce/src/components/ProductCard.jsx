import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import { useCurrency } from '../contexts/CurrencyContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const { symbol, rate } = useCurrency()

  const handleAddToCart = async (e) => {
    e.preventDefault() // Prevent navigation when clicking Add to Cart
    e.stopPropagation() // Stop event bubbling
    if (!user) {
      toast.error('Please sign in to add items to cart')
      return
    }
    // Use default size and color for quick add to cart
    const defaultSize = product.sizes[0] || 'M'
    const defaultColor = product.colors[0] || 'Black'
    await addToCart(product, 1, defaultSize, defaultColor)
  }

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="relative bg-bisque/60 rounded-3xl shadow-soft group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.025] min-h-[420px] cursor-pointer">
        {/* Full Cover Product Image */}
        <img
          src={product.images[0] || 'https://via.placeholder.com/400x500'}
          alt={product.name}
          className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 group-hover:scale-105"
          style={{ background: '#FCF8F0' }}
        />

        {/* Limited Edition Badge */}
        {product.is_limited_edition && (
          <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest shadow z-10">
            Limited Edition
          </div>
        )}

        {/* Stock Badge */}
        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow z-10">
            Only {product.stock_quantity} left
          </div>
        )}

        {/* Bottom Overlay with Sugar Background */}
        <div className="absolute bottom-0 left-0 right-0 bg-sugar/95 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <div className="space-y-4">
            {/* Product Title */}
            <h3 className="text-xl font-bold text-mocha" style={{ fontFamily: 'Optima, system-ui, serif' }}>
              {product.name}
            </h3>
            
            {/* Product Description */}
            <p className="text-wheat text-sm line-clamp-2" style={{ fontFamily: 'Optima, system-ui, serif' }}>
              {product.description}
            </p>
            
            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="text-pistachio font-bold text-2xl" style={{ fontFamily: 'Optima, system-ui, serif' }}>
                {symbol}{(product.price * rate).toFixed(2)}
              </div>
              <div className="flex items-center space-x-3">
                <button
                  className="p-2 bg-white/80 rounded-full shadow hover:bg-pistachio hover:text-white transition-colors"
                >
                  <Heart className="h-4 w-4" />
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold bg-pistachio text-espresso shadow-soft hover:bg-wheat hover:text-espresso transition-all duration-300"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard 