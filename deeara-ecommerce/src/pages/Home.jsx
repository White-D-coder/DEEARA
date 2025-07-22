import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Crown, Shield, Truck, Heart } from 'lucide-react'
import { getFeaturedProducts } from '../lib/database'
import ProductCard from '../components/ProductCard'
import Silk from '../components/Backgrounds/Silk/Silk'
import FlowingMenu from '../components/Components/FlowingMenu/FlowingMenu'
import Masonry from '../components/Masonry/Masonry'
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
                className="text-xl text-sugar md:text-7xl font-bold mb-6"
                style={{ fontFamily: "'Poiret One', cursive", fontWeight: 700, letterSpacing: '0.1em' }}
              >
 
                  DEEARA

              </h1>
              <p className="text-xl md:text-xl text-sugar mb-8 font-bonheur-royale" style={{ fontFamily: 'Bonheur Royale, cursive', wordSpacing: '0.15em', letterSpacing: '0.08em' }}>
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
                  <StarBorder color='#ffffff' speed="5s" thickness={2} className="mx-auto text-center mt-4">
                    Join the Royalty
                  </StarBorder>
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
            <h2 className="text-4xl font-cinzel font-bold text-primary-dark mb-4" style={{ letterSpacing: '0.08em' }}>
              Why DEEARA?
            </h2>
            <p className="text-xl text-card-bg font-inter max-w-3xl mx-auto" style={{ fontFamily: 'Poiret One, cursive' }}>
              Every piece is meticulously crafted with premium materials and attention to detail, ensuring you experience luxury in every stitch.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 font-inter" style={{ fontFamily: 'Poiret One, cursive' }}>
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cta-green/90 text-primary-dark rounded-full mb-6 shadow">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-cinzel font-bold text-primary-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-primary-dark text-base" style={{ fontFamily: 'Poiret One, cursive' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20 bg-soft-bg mb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-cinzel font-bold text-primary-dark mb-4" style={{ letterSpacing: '0.08em' }}>
                Featured Collection
              </h2>
              <p className="text-xl text-card-bg font-inter max-w-4xl mx-auto" style={{ fontFamily: 'Poiret One, cursive' }}>
                Discover our most coveted pieces, each crafted with unparalleled attention to detail.
              </p>
            </motion.div>
            {/* Masonry Layout */}
            <div className="w-full min-h-[850px] relative">
              <Masonry
                items={[
                  {
                    id: 1,
                    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
                    url: '/products/1',
                    height: 600,
                  },
                  {
                    id: 2,
                    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
                    url: '/products/2',
                    height: 270,
                  },
                  {
                    id: 3,
                    img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80',
                    url: '/products/3',
                    height: 400,
                  },
                  {
                    id: 4,
                    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
                    url: '/products/4',
                    height: 520,
                  },
                  {
                    id: 5,
                    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                    url: '/products/5',
                    height: 250,
                  },
                  {
                    id: 6,
                    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
                    url: '/products/6',
                    height: 570,
                  },
                  {
                    id: 7,
                    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
                    url: '/products/7',
                    height: 320,
                  },
                  {
                    id: 8,
                    img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
                    url: '/products/8',
                    height: 600,
                  },
                  {
                    id: 9,
                    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
                    url: '/products/9',
                    height: 260,
                  },
                  {
                    id: 10,
                    img: 'https://images.unsplash.com/photo-1465101053361-763ab02bced9?auto=format&fit=crop&w=800&q=80',
                    url: '/products/10',
                    height: 500,
                  },
                  {
                    id: 11,
                    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
                    url: '/products/11',
                    height: 350,
                  },
                  {
                    id: 12,
                    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                    url: '/products/12',
                    height: 600,
                  },
                  {
                    id: 13,
                    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
                    url: '/products/13',
                    height: 270,
                  },
                  {
                    id: 14,
                    img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
                    url: '/products/14',
                    height: 420,
                  },
                  {
                    id: 15,
                    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
                    url: '/products/15',
                    height: 600,
                  },
                ]}
                animateFrom="bottom"
                blurToFocus={true}
                scaleOnHover={true}
                colorShiftOnHover={true}
              />
            </div>
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
        
        {/* Flowing Menu Section */}
        <section className="py-1 bg-emerald-900 mt-0">
          <FlowingMenu 
              items={[
                {
                  link: "/products",
                  text: "Collection",
                  image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                },
                {
                  link: "/products?category=limited-edition",
                  text: "Limited Edition",
                  image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                },
                {
                  link: "/products?category=new-arrivals",
                  text: "New Arrivals",
                  image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                },
                {
                  link: "/contact",
                  text: "Contact",
                  image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                }
              ]} 
            />
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
              <p className="text-xl text-center text-sugar font-inter mb-6">
                Be the first to know about new collections and exclusive offers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-glass border border-card-bg/40 bg-white/80 text-primary-dark placeholder-card-bg focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans shadow"
                />
                <button className="px-6 py-3 rounded-glass font-semibold bg-cta-green text-primary-dark shadow-soft hover:bg-card-bg hover:text-cta-green transition-all duration-300">
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