import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, Heart, User, Menu, X, Globe, DollarSign } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useCurrency } from '../contexts/CurrencyContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const { user, signOut } = useAuth()
  const { getCartCount } = useCart()
  const navigate = useNavigate()
  const { currency, symbol, setCurrency } = useCurrency()
  const [showCurrency, setShowCurrency] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
 

  const handleSearch = (e) => {
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
    <nav
      className={`border-b border-bisque/70 shadow-soft sticky top-0 z-50 bg-sugar`}
      onScrollCapture={() => {}} // dummy to avoid React warning
    >
      <div className="px-8">
        <div className="flex justify-between items-left h-24">
          {/* Menu Button (Desktop) */}
          <button
            className="hidden md:flex items-center justify-center p-2  text-mocha hover:text-pistachio transition-colors"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Open menu"
            type="button"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="ml-2  text-xl font-times text-mocha tracking-wide" style={{ fontFamily: 'Alumni Sans Pinstripe, sans-serif' }}>Menu</span>
          </button>
          {/* Logo - hide when menu open */}
          {!isMenuOpen && (
            <Link to="/" className="flex items-left space-x-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
              </motion.div>
            </Link>
          )}
          {/* Desktop Navigation Menu - hidden, handled by panel */}
          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Language & Currency */}
            <div className="hidden lg:flex items-center gap-2 relative">
              <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
                {!showSearch ? (
                  <button
                    type="button"
                    className="p-2 text-card-bg hover:text-primary-dark transition-colors"
                    onClick={() => setShowSearch(true)}
                    aria-label="Open search"
                  >
                    <Search className="h-6 w-6" />
                  </button>
                ) : (
                  <motion.form
                    onSubmit={handleSearch}
                    className="relative w-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search for exclusive pieces..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => setShowSearch(false)}
                      className="w-full pl-12 pr-4 py-3 bg-card-bg/60 border border-card-bg/40 rounded-glass font-sans text-primary-dark placeholder-card-bg focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green transition"
                    />
                    <Search className="absolute left-4 top-3 h-5 w-5 text-pistachio" />
                  </motion.form>
                )}
              </div>
                  
  
            </div>
            {/* Wishlist */}
            <Link to="/wishlist" className="p-2 text-card-bg hover:text-cta-green transition-colors relative">
              <Heart className="h-5 w-5" />
            </Link>
            {/* Cart */}
            <Link to="/cart" className="p-2 text-card-bg hover:text-cta-green transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-pistachio text-espresso text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-soft">
                  {getCartCount()}
                </span>
              )}
            </Link>
            {/* User Menu */}
            {user ? (
              <>
                <button className="p-2 text-card-bg hover:text-primary-dark transition-colors" onClick={() => setShowProfile(true)}>
                  <User className="h-5 w-5" />
                </button>
                <AnimatePresence>
                  {showProfile && (
                    <>
                      {/* Overlay */}
                      <motion.div
                        className="fixed inset-0 bg-black/40 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowProfile(false)}
                      />
                      {/* Profile Side Panel */}
                      <motion.div
                        className="fixed top-0 right-0 h-full w-80 bg-sugar z-50 shadow-2xl flex flex-col p-8 gap-8"
                        initial={{ x: 300 }}
                        animate={{ x: 0 }}
                        exit={{ x: 300 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      >
                        <button
                          className="self-end mb-8 p-2 text-mocha hover:text-pistachio"
                          onClick={() => setShowProfile(false)}
                          aria-label="Close profile menu"
                        >
                          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-full bg-pistachio flex items-center justify-center text-3xl text-espresso font-bold mb-2">
                            {user.user_metadata?.full_name?.[0] || user.email[0]}
                          </div>
                          <div className="text-xl font-times text-mocha ">
                            {user.user_metadata?.full_name || 'User'}
                          </div>
                          <div className="text-sm text-card-bg mb-4 style={{ fontFamily: 'Alumni Sans Pinstripe, sans-serif' }}">{user.email}</div>
                        </div>
                        <button className="block w-full text-left px-4 py-3 text-base text-pistachio hover:bg-bisque/40 hover:text-espresso transition-colors text-optima rounded-xl mt-8">My Orders
                        </button>
                        <button
                          onClick={() => { handleSignOut(); setShowProfile(false) }}
                          className="block w-full text-left px-4 py-3 text-base text-pistachio hover:bg-bisque/40 hover:text-espresso transition-colors rounded-xl font-bold mt-8"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link to="/login" className="p-2 text-card-bg hover:text-primary-dark transition-colors">
                <User className="h-5 w-5" />
              </Link>
            )}
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-card-bg hover:text-primary-dark transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {/* Desktop Side Panel Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 bg-black/40 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />
              {/* Side Panel */}
              <motion.div
                className="fixed top-0 left-0 h-full w-72 bg-sugar z-50 shadow-2xl flex flex-col p-8 gap-8"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <button
                  className="self-end mb-8 p-2 text-mocha hover:text-pistachio"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <Link to="/" className="text-mocha font-lancelot hover:text-pistachio transition text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/products" className="text-mocha font-lancelot hover:text-pistachio transition text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Products</Link>
                <Link to="/track-order" className="text-mocha font-lancelot hover:text-pistachio transition text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Track Order</Link>
                <Link to="/contact" className="text-mocha font-lancelot hover:text-pistachio transition text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                {/* Add more links if needed */}
              </motion.div>
            </>
          )}
        </AnimatePresence>
        {/* Mobile Search */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4"
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for exclusive pieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-card-bg/60 border border-card-bg/40 rounded-glass font-sans text-primary-dark placeholder-card-bg focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green transition"
                />
                <Search className="absolute left-4 top-3 h-5 w-5 text-pistachio" />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-bisque/60"
            >
              <div className="px-4 py-6 space-y-6">
                <Link
                  to="/"
                  className="block text-mocha font-sans hover:text-pistachio transition text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="block text-mocha font-sans hover:text-pistachio transition text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to="/track-order"
                  className="block text-mocha font-sans hover:text-pistachio transition text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Track Order
                </Link>
                <Link
                  to="/contact"
                  className="block text-mocha font-sans hover:text-pistachio transition text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex items-center gap-4 pt-4 border-t border-bisque/30">
                  <button className="p-2 text-card-bg hover:text-cta-green transition-colors">
                    <Globe className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-card-bg hover:text-cta-green transition-colors">
                    <DollarSign className="h-5 w-5" />
                  </button>
                  <Link to="/wishlist" className="p-2 text-card-bg hover:text-cta-green transition-colors">
                    <Heart className="h-5 w-5" />
                  </Link>
                  <Link to="/cart" className="p-2 text-card-bg hover:text-cta-green transition-colors">
                    <ShoppingBag className="h-5 w-5" />
                  </Link>
                  <Link to="/login" className="p-2 text-card-bg hover:text-primary-dark transition-colors">
                    <User className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar 