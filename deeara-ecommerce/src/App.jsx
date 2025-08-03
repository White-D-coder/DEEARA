import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { CurrencyProvider } from './contexts/CurrencyContext'
import { NavbarProvider, useNavbar } from './contexts/NavbarContext'
import { OrderProvider } from './contexts/OrderContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import TrackOrder from './pages/TrackOrder'
import MyOrders from './pages/MyOrders'
import Contact from './pages/Contact'
import Feedback from './pages/Feedback'
import Payment from './pages/Payment'
import ResetPassword from './pages/ResetPassword'
import CookieConsentBar from './components/CookieConsentBar'
import './App.css'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'
import ReturnsExchanges from './pages/ReturnsExchanges'

function AppContent() {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navbarOpacity, setNavbarOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      
      // Navbar transition logic
      const navbarTransitionStart = 200
      const navbarTransitionEnd = 300
      const iconColorThreshold = 250
      
      if (currentScrollY >= iconColorThreshold) {
        setIsScrolled(true)
        setNavbarOpacity(1)
      } else if (currentScrollY >= navbarTransitionStart) {
        const opacity = Math.max(0, Math.min(1, (currentScrollY - navbarTransitionStart) / (navbarTransitionEnd - navbarTransitionStart)))
        setIsScrolled(false)
        setNavbarOpacity(opacity)
      } else {
        setIsScrolled(false)
        setNavbarOpacity(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div className="min-h-screen bg-ivory">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            border: '1px solid #D4AF37',
          },
          success: {
            iconTheme: {
              primary: '#D4AF37',
              secondary: '#fff',
            },
          },
        }}
      />
      <Navbar isScrolled={isScrolled} navbarOpacity={navbarOpacity} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <CurrencyProvider>
            <OrderProvider>
              <NavbarProvider>
                <AppContent />
                <CookieConsentBar />
              </NavbarProvider>
            </OrderProvider>
          </CurrencyProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
