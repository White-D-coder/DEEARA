import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Filter, Search, Grid, List } from 'lucide-react'
import { Product } from '../lib/supabase'
import { getProducts, searchProducts } from '../lib/database'
import ProductCard from '../components/ProductCard'

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: '',
    priceRange: '',
    size: '',
    color: '',
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    loadProducts()
  }, [filters])

  const loadProducts = async () => {
    setLoading(true)
    try {
      let productsData: Product[] = []

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

  const handleFilterChange = (key: string, value: string) => {
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
    <div className="min-h-screen bg-ivory py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-cinzel font-bold text-deep-mauve mb-4">
            Our Collection
          </h1>
          <p className="text-xl text-gray-600 font-inter">
            Discover exclusive oversized pieces crafted for royalty
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
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
                className="w-full px-3 py-2 border border-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
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
                className="w-full px-3 py-2 border border-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
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
                className="w-full px-3 py-2 border border-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
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
              </select>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 font-inter">
            {products.length} products found
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid' ? 'bg-gold text-white' : 'bg-white text-gray-600'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' ? 'bg-gold text-white' : 'bg-white text-gray-600'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card-luxury p-6 animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        {/* No Products Found */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg font-inter">
              No products found matching your criteria.
            </p>
            <button
              onClick={() => {
                setFilters({
                  search: '',
                  category: '',
                  priceRange: '',
                  size: '',
                  color: '',
                })
              }}
              className="mt-4 btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products 