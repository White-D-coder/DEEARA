import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ShoppingBag, Heart, User, Menu, X, Globe, DollarSign } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const { user, signOut } = useAuth()
  const { getCartCount } = useCart()
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setShowSearch(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-champagne sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl font-cinzel font-bold text-gradient">
                DEEARA
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-deep-mauve hover:text-gold transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-deep-mauve hover:text-gold transition-colors font-medium">
              Products
            </Link>
            <Link to="/track-order" className="text-deep-mauve hover:text-gold transition-colors font-medium">
              Track Order
            </Link>
            <Link to="/contact" className="text-deep-mauve hover:text-gold transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search for exclusive pieces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-white/80"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Language & Currency */}
            <div className="hidden lg:flex items-center space-x-2">
              <button className="p-2 text-deep-mauve hover:text-gold transition-colors">
                <Globe className="h-5 w-5" />
              </button>
              <button className="p-2 text-deep-mauve hover:text-gold transition-colors">
                <DollarSign className="h-5 w-5" />
              </button>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="p-2 text-deep-mauve hover:text-gold transition-colors relative">
              <Heart className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="p-2 text-deep-mauve hover:text-gold transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button className="p-2 text-deep-mauve hover:text-gold transition-colors">
                  <User className="h-5 w-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-champagne py-2">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-champagne">
                    {user.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-deep-mauve hover:bg-champagne hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="p-2 text-deep-mauve hover:text-gold transition-colors">
                <User className="h-5 w-5" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-deep-mauve hover:text-gold transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden py-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for exclusive pieces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-white/80"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-champagne"
          >
            <div className="px-4 py-4 space-y-4">
              <Link
                to="/"
                className="block text-deep-mauve hover:text-gold transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block text-deep-mauve hover:text-gold transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/track-order"
                className="block text-deep-mauve hover:text-gold transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Track Order
              </Link>
              <Link
                to="/contact"
                className="block text-deep-mauve hover:text-gold transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex items-center space-x-4 pt-4 border-t border-champagne">
                <button className="p-2 text-deep-mauve hover:text-gold transition-colors">
                  <Globe className="h-5 w-5" />
                </button>
                <button className="p-2 text-deep-mauve hover:text-gold transition-colors">
                  <DollarSign className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="p-2 text-deep-mauve hover:text-gold transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 