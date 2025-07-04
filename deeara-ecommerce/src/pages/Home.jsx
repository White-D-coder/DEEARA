import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Crown, Shield, Truck, Heart } from 'lucide-react'
import { getFeaturedProducts } from '../lib/database'
import ProductCard from '../components/ProductCard'
import Silk from '../components/Backgrounds/Silk/Silk'
import TextTrail from '../components/TextAnimations/TextTrail/TextTrail'
import StarBorder from '../components/Animations/StarBorder/StarBorder'



const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  const loadFeaturedProducts = async () => {
    setLoading(true)
    const products = await getFeaturedProducts()
    setFeaturedProducts(products)
    setLoading(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Silk Background */}
      <div className="absolute inset-0 z-0">
        <Silk color="#7b7481" speed={3} scale={1.2} noiseIntensity={1.2} rotation={0.2} />
      </div>
      {/* Main Content (z-10) */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1
                className="text-xl text-white md:text-7xl font-bold mb-6"
                style={{ fontFamily: "'Poiret One', cursive", fontWeight: 700, letterSpacing: '0.1em' }}
              >
 
                  DEEARA
              </h1>
              <p className="text-xl md:text-2xl font-gothic text-white mb-8">
                Crafted Exclusively for the Discerning
              </p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link
                  to="/products"
                >

                  <button className="px-4 py-2 backdrop-blur-sm border bg-green-300/10 border-green-500/20 text-white mx-auto text-center rounded-full relative mt-4">
                  Join the Royalty
                  </button>
                </Link>
              </motion.div>
            </motion.div>
      </div>

          {/* Floating Elements */}
 
        </section>

        {/* Why DEEARA Section */}
        <section className="py-24 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-cinzel font-bold text-mocha mb-4" style={{ letterSpacing: '0.08em' }}>
              Why DEEARA?
            </h2>
            <p className="text-xl text-wheat font-inter max-w-2xl mx-auto">
              Every piece is meticulously crafted with premium materials and attention to detail, ensuring you experience luxury in every stitch.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
            {[
              {
                icon: Crown,
                title: 'Premium Quality',
                description: 'Only the finest materials and craftsmanship make it into our collection.',
              },
              {
                icon: Shield,
                title: 'Exclusive Design',
                description: 'Each piece is uniquely designed and limited in production.',
              },
              {
                icon: Truck,
                title: 'Luxury Experience',
                description: 'From ordering to delivery, we ensure a premium experience.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center p-8 bg-white/80 rounded-2xl shadow-soft flex flex-col items-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pistachio/90 text-espresso rounded-full mb-6 shadow">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-cinzel font-bold text-mocha mb-3">
                  {feature.title}
                </h3>
                <p className="text-mocha font-inter text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-cinzel font-bold text-deep-mauve mb-4">
                Featured Collection
              </h2>
              <p className="text-xl text-gray-600 font-inter">
                Discover our most coveted oversized pieces
              </p>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="card-luxury p-6 animate-pulse">
                    <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mt-12"
            >
              <Link
                to="/products"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <span>View All Products</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-bisque/60">
  
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-cinzel font-bold text-center text-sugar mb-4" style={{ letterSpacing: '0.08em' }}>
                Join the Royalty
              </h2>
              <p className="text-xl text-center text-emerald font-inter mb-6">
                Be the first to know about new collections and exclusive offers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-glass border border-wheat/40 bg-white/80 text-mocha placeholder-wheat focus:outline-none focus:ring-2 focus:ring-pistachio focus:border-pistachio font-sans shadow"
                />
                <button className="px-6 py-3 rounded-glass font-semibold bg-pistachio text-espresso shadow-soft hover:bg-wheat hover:text-espresso transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </motion.div>

        </section>
      </div>
    </div>
  )
}

export default Home 