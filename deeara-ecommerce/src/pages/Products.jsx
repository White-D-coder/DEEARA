import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Grid, List } from 'lucide-react'
import { getProducts, searchProducts } from '../lib/database'
import ProductCard from '../components/ProductCard'

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

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
  const [page, setPage] = useState(1)
  const perPage = 9

  // Debounced search/filter
  const debouncedFilters = useDebounce(filters, 400)

  useEffect(() => {
    loadProducts()
  }, [debouncedFilters])

  const loadProducts = async () => {
    setLoading(true)
    try {
      let productsData = []
      if (debouncedFilters.search) {
        productsData = await searchProducts(debouncedFilters.search)
      } else {
        productsData = await getProducts()
      }
      // Apply additional filters
      let filteredData = productsData
      if (debouncedFilters.category) {
        filteredData = filteredData.filter(product => product.category === debouncedFilters.category)
      }
      if (debouncedFilters.priceRange) {
        const [min, max] = debouncedFilters.priceRange.split('-').map(Number)
        if (max) {
          filteredData = filteredData.filter(product => product.price >= min && product.price <= max)
        } else {
          filteredData = filteredData.filter(product => product.price >= min)
        }
      }
      if (debouncedFilters.size) {
        filteredData = filteredData.filter(product => product.sizes.includes(debouncedFilters.size))
      }
      if (debouncedFilters.color) {
        filteredData = filteredData.filter(product => product.colors.includes(debouncedFilters.color))
      }
      setProducts(filteredData)
      setPage(1) // Reset to first page on filter change
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

  // Pagination logic
  const totalPages = Math.ceil(products.length / perPage)
  const paginatedProducts = products.slice((page - 1) * perPage, page * perPage)

  // Memoized ProductCard for performance
  const MemoProductCard = React.memo(ProductCard)

  return (
    <div className="min-h-screen bg-soft-bg section-spacious">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-5xl mx-auto text-center mb-10 sm:mb-16 px-2 sm:px-0"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-3 sm:mb-4 tracking-wide" style={{ fontFamily: 'Optima, system-ui, serif' }}>
          Our Collection
        </h1>
        <p className="text-base sm:text-lg text-card-bg mb-2" style={{ fontFamily: 'Optima, system-ui, serif' }}>
          Discover exclusive oversized pieces crafted for royalty
        </p>
        <div className="h-1 w-12 sm:w-16 bg-cta-green mx-auto rounded-full mb-4 sm:mb-6" />
      </motion.div>

      {/* Filters and Search */}
      <div className="max-w-5xl mx-auto mb-8 sm:mb-16 flex flex-col gap-4 sm:gap-8 px-2 sm:px-4">
        <form className="flex-1 flex items-center bg-card-bg/60 rounded-full shadow-soft px-4 sm:px-6 py-2 sm:py-3">
          <Search className="h-5 w-5 text-cta-green mr-2 sm:mr-3" />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="flex-1 bg-transparent outline-none text-primary-dark placeholder-card-bg text-base sm:text-lg font-medium"
          />
        </form>
        <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center">
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="bg-card-bg/60 border border-card-bg/40 rounded-full px-3 sm:px-4 py-2 text-primary-dark focus:ring-cta-green focus:border-cta-green transition text-sm sm:text-base"
          >
            <option value="">All Categories</option>
            <option value="oversized-tshirts">Oversized T-Shirts</option>
            <option value="limited-edition">Limited Edition</option>
            <option value="new-arrivals">New Arrivals</option>
          </select>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="bg-card-bg/60 border border-card-bg/40 rounded-full px-3 sm:px-4 py-2 text-primary-dark focus:ring-cta-green focus:border-cta-green transition text-sm sm:text-base"
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
            className="bg-card-bg/60 border border-card-bg/40 rounded-full px-3 sm:px-4 py-2 text-primary-dark focus:ring-cta-green focus:border-cta-green transition text-sm sm:text-base"
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
            className="bg-card-bg/60 border border-card-bg/40 rounded-full px-3 sm:px-4 py-2 text-primary-dark focus:ring-cta-green focus:border-cta-green transition text-sm sm:text-base"
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
        <div className="flex flex-wrap items-center gap-2 sm:gap-2 ml-0 sm:ml-2 justify-center">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-full transition-all duration-200 border ${viewMode === 'grid' ? 'bg-cta-green text-white border-cta-green shadow' : 'bg-white text-cta-green border-wheat/40'}`}
            aria-label="Grid view"
            type="button"
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-full transition-all duration-200 border ${viewMode === 'list' ? 'bg-cta-green text-white border-cta-green shadow' : 'bg-white text-cta-green border-wheat/40'}`}
            aria-label="List view"
            type="button"
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={`max-w-7xl mx-auto ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12' : 'flex flex-col gap-6 sm:gap-8'} px-2 sm:px-4 pb-16 sm:pb-24`}>
        {loading ? (
          [...Array(6)].map((_, index) => (
            <div key={index} className="card-luxury p-4 sm:p-6 animate-pulse min-h-[300px] sm:min-h-[400px] rounded-3xl" />
          ))
        ) : paginatedProducts.length === 0 ? (
          <div className="col-span-full text-center text-card-bg text-lg sm:text-xl py-16 sm:py-24 font-medium">
            No products found.
          </div>
        ) : (
          paginatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
            >
              <MemoProductCard product={product} lazy />
            </motion.div>
          ))
        )}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pb-12">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-card-bg text-primary-dark disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded bg-card-bg text-primary-dark disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Products 