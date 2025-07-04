import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Grid, List } from 'lucide-react'
import { getProducts, searchProducts } from '../lib/database'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: '',
    priceRange: '',
    size: '',
    color: '',
  })
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    loadProducts()
  }, [filters])

  const loadProducts = async () => {
    setLoading(true)
    try {
      let productsData = []
      if (filters.search) {
        productsData = await searchProducts(filters.search)
      } else {
        productsData = await getProducts()
      }
      // Apply additional filters
      let filteredData = productsData
      if (filters.category) {
        filteredData = filteredData.filter(product => product.category === filters.category)
      }
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number)
        if (max) {
          filteredData = filteredData.filter(product => product.price >= min && product.price <= max)
        } else {
          filteredData = filteredData.filter(product => product.price >= min)
        }
      }
      if (filters.size) {
        filteredData = filteredData.filter(product => product.sizes.includes(filters.size))
      }
      if (filters.color) {
        filteredData = filteredData.filter(product => product.colors.includes(filters.color))
      }
      setProducts(filteredData)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    // Update URL params
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    setSearchParams(params)
  }

  return (
    <div className="min-h-screen bg-sugar section-spacious">
        <motion.div
        initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-5xl mx-auto text-center mb-20"
        >
        <h1 className="text-4xl font-bold text-mocha mb-4 tracking-wide" style={{ fontFamily: 'Optima, system-ui, serif' }}>
            Our Collection
          </h1>
        <p className="text-lg text-wheat mb-2" style={{ fontFamily: 'Optima, system-ui, serif' }}>
            Discover exclusive oversized pieces crafted for royalty
          </p>
        <div className="h-1 w-16 bg-pistachio mx-auto rounded-full mb-6" />
        </motion.div>

        {/* Filters and Search */}
      <div className="max-w-5xl mx-auto mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 px-4">
        <form className="flex-1 flex items-center bg-bisque/60 rounded-full shadow-soft px-6 py-3">
          <Search className="h-5 w-5 text-pistachio mr-3" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
            className="flex-1 bg-transparent outline-none text-mocha placeholder-wheat text-lg font-medium"
                />
        </form>
        <div className="flex flex-wrap gap-4 items-center justify-center">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
            className="bg-bisque/60 border border-wheat/40 rounded-full px-4 py-2 text-mocha focus:ring-pistachio focus:border-pistachio transition"
              >
                <option value="">All Categories</option>
                <option value="oversized-tshirts">Oversized T-Shirts</option>
                <option value="limited-edition">Limited Edition</option>
                <option value="new-arrivals">New Arrivals</option>
              </select>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="bg-bisque/60 border border-wheat/40 rounded-full px-4 py-2 text-mocha focus:ring-pistachio focus:border-pistachio transition"
              >
                <option value="">All Prices</option>
                <option value="0-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-200">$100 - $200</option>
                <option value="200-">$200+</option>
              </select>
              <select
                value={filters.size}
                onChange={(e) => handleFilterChange('size', e.target.value)}
            className="bg-bisque/60 border border-wheat/40 rounded-full px-4 py-2 text-mocha focus:ring-pistachio focus:border-pistachio transition"
              >
                <option value="">All Sizes</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">X-Large</option>
                <option value="XXL">XX-Large</option>
              </select>
              <select
                value={filters.color}
                onChange={(e) => handleFilterChange('color', e.target.value)}
            className="bg-bisque/60 border border-wheat/40 rounded-full px-4 py-2 text-mocha focus:ring-pistachio focus:border-pistachio transition"
              >
                <option value="">All Colors</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Navy">Navy</option>
                <option value="Gray">Gray</option>
                <option value="Beige">Beige</option>
                <option value="Champagne">Champagne</option>
                <option value="Ivory">Ivory</option>
                <option value="Cream">Cream</option>
                <option value="Royal Blue">Royal Blue</option>
                <option value="Deep Mauve">Deep Mauve</option>
                <option value="Burgundy">Burgundy</option>
            <option value="Mint">Mint</option>
              </select>
        </div>
        <div className="flex items-center gap-2 ml-2">
            <button
              onClick={() => setViewMode('grid')}
            className={`p-2 rounded-full transition-all duration-200 border ${viewMode === 'grid' ? 'bg-pistachio text-white border-pistachio shadow' : 'bg-white text-pistachio border-wheat/40'}`}
            aria-label="Grid view"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
            className={`p-2 rounded-full transition-all duration-200 border ${viewMode === 'list' ? 'bg-pistachio text-white border-pistachio shadow' : 'bg-white text-pistachio border-wheat/40'}`}
            aria-label="List view"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

      {/* Products Grid/List */}
      <div className={`max-w-7xl mx-auto ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12' : 'flex flex-col gap-8'} px-4 pb-24`}>
        {loading ? (
          [...Array(6)].map((_, index) => (
            <div key={index} className="card-luxury p-6 animate-pulse min-h-[400px] rounded-3xl" />
          ))
        ) : products.length === 0 ? (
          <div className="col-span-full text-center text-wheat text-xl py-24 font-medium">
            No products found.
          </div>
        ) : (
          products.map((product, index) => (
              <motion.div
                key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default Products 