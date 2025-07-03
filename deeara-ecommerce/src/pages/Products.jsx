import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Filter, Search, Grid, List } from 'lucide-react'
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
        filteredData = filteredData.filter(product => 
          product.category === filters.category
        )
      }
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number)
        if (max) {
          filteredData = filteredData.filter(product => 
            product.price >= min && product.price <= max
          )
        } else {
          filteredData = filteredData.filter(product => 
            product.price >= min
          )
        }
      }
      if (filters.size) {
        filteredData = filteredData.filter(product => 
          product.sizes.includes(filters.size)
        )
      }
      if (filters.color) {
        filteredData = filteredData.filter(product => 
          product.colors.includes(filters.color)
        )
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
    <div className="min-h-screen bg-gradient-to-br from-mint via-white to-mint-glass section-spacious">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="mint-glass-strong p-10 md:p-16 rounded-glass shadow-mint-glass text-center max-w-4xl mx-auto mb-20"
      >
        <h1 className="text-4xl font-cinzel font-bold text-obsidian mb-6 tracking-wide">
          Our Collection
        </h1>
        <p className="text-xl text-mint-dark font-inter">
          Discover exclusive oversized pieces crafted for royalty
        </p>
      </motion.div>

      <div className="divider-minimal" />

      {/* Filters and Search */}
      <div className="mint-glass p-8 rounded-glass shadow-mint-glass mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-mint-dark" />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="input-mint w-full pl-10 pr-4"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="input-mint w-full"
            >
              <option value="">All Categories</option>
              <option value="oversized-tshirts">Oversized T-Shirts</option>
              <option value="limited-edition">Limited Edition</option>
              <option value="new-arrivals">New Arrivals</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="input-mint w-full"
            >
              <option value="">All Prices</option>
              <option value="0-50">Under $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200-">$200+</option>
            </select>
          </div>

          {/* Size */}
          <div>
            <select
              value={filters.size}
              onChange={(e) => handleFilterChange('size', e.target.value)}
              className="input-mint w-full"
            >
              <option value="">All Sizes</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">X-Large</option>
              <option value="XXL">XX-Large</option>
            </select>
          </div>

          {/* Color */}
          <div>
            <select
              value={filters.color}
              onChange={(e) => handleFilterChange('color', e.target.value)}
              className="input-mint w-full"
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
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-between items-center mb-10">
        <p className="text-mint-dark font-inter">
          {products.length} products found
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl transition-all duration-200 ${viewMode === 'grid' ? 'bg-mint text-obsidian shadow-mint' : 'bg-white text-mint-dark'}`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-xl transition-all duration-200 ${viewMode === 'list' ? 'bg-mint text-obsidian shadow-mint' : 'bg-white text-mint-dark'}`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Products Grid/List */}
      {loading ? (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12' : 'grid-cols-1 gap-8'}`}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card-spacious animate-pulse">
              <div className="bg-mint-glass h-64 rounded-2xl mb-4" />
              <div className="bg-mint-glass h-4 rounded mb-2" />
              <div className="bg-mint-glass h-4 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12' : 'grid-cols-1 gap-8'}`}>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ProductCard product={product} className="card-spacious" viewMode={viewMode} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products 