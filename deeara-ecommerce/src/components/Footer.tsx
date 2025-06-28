import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-champagne">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-cinzel font-bold text-gradient">
                DEEARA
              </h3>
              <p className="text-gray-600 mt-2 font-inter">
                Oversized Royalty. Crafted Exclusively.
              </p>
            </motion.div>
            
            <div className="flex space-x-4">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-champagne text-white rounded-full hover:bg-gold transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-champagne text-white rounded-full hover:bg-gold transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-champagne text-white rounded-full hover:bg-gold transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-playfair font-semibold text-deep-mauve">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gold transition-colors font-inter">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-gold transition-colors font-inter">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-600 hover:text-gold transition-colors font-inter">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-gold transition-colors font-inter">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h4 className="text-lg font-playfair font-semibold text-deep-mauve">
              Help
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/feedback" className="text-gray-600 hover:text-gold transition-colors font-inter">
                  Feedback
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gold transition-colors font-inter">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gold transition-colors font-inter">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gold transition-colors font-inter">
                  Returns & Exchanges
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-playfair font-semibold text-deep-mauve">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold" />
                <span className="text-gray-600 font-inter">hello@deeara.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gold" />
                <span className="text-gray-600 font-inter">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gold mt-1" />
                <span className="text-gray-600 font-inter">
                  123 Luxury Avenue<br />
                  Fashion District, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-champagne mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 font-inter text-sm">
              © 2025 DEEARA. A Luxury Label. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gold transition-colors font-inter">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-gold transition-colors font-inter">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-gold transition-colors font-inter">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 