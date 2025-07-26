// import React, { useState, useEffect, useCallback } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { Search, Grid, List } from 'lucide-react'
// import { getProducts, searchProducts } from '../lib/database'
// import ProductCard from '../components/ProductCard'

// // Debounce hook
// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);
//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedValue(value), delay);
//     return () => clearTimeout(handler);
//   }, [value, delay]);
//   return debouncedValue;
// }

// const Products = () => {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filters, setFilters] = useState({
//     search: searchParams.get('search') || '',
//     category: '',
//     priceRange: '',
//     size: '',
//     color: '',
//   })
//   const [viewMode, setViewMode] = useState('grid')
//   const [page, setPage] = useState(1)
//   const perPage = 9

//   // Debounced search/filter
//   const debouncedFilters = useDebounce(filters, 400)

//   useEffect(() => {
//     loadProducts()
//   }, [debouncedFilters])

//   const loadProducts = async () => {
//     setLoading(true)
//     try {
//       let productsData = []
//       if (debouncedFilters.search) {
//         productsData = await searchProducts(debouncedFilters.search)
//       } else {
//         productsData = await getProducts()
//       }
//       // Apply additional filters
//       let filteredData = productsData
//       if (debouncedFilters.category) {
//         filteredData = filteredData.filter(product => product.category === debouncedFilters.category)
//       }
//       if (debouncedFilters.priceRange) {
//         const [min, max] = debouncedFilters.priceRange.split('-').map(Number)
//         if (max) {
//           filteredData = filteredData.filter(product => product.price >= min && product.price <= max)
//         } else {
//           filteredData = filteredData.filter(product => product.price >= min)
//         }
//       }
//       if (debouncedFilters.size) {
//         filteredData = filteredData.filter(product => product.sizes.includes(debouncedFilters.size))
//       }
//       if (debouncedFilters.color) {
//         filteredData = filteredData.filter(product => product.colors.includes(debouncedFilters.color))
//       }
//       setProducts(filteredData)
//       setPage(1) // Reset to first page on filter change
//     } catch (error) {
//       console.error('Error loading products:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleFilterChange = (key, value) => {
//     const newFilters = { ...filters, [key]: value }
//     setFilters(newFilters)
//     // Update URL params
//     const params = new URLSearchParams()
//     Object.entries(newFilters).forEach(([k, v]) => {
//       if (v) params.set(k, v)
//     })
//     setSearchParams(params)
//   }

//   // Pagination logic
//   const totalPages = Math.ceil(products.length / perPage)
//   const paginatedProducts = products.slice((page - 1) * perPage, page * perPage)

//   // Memoized ProductCard for performance
//   const MemoProductCard = React.memo(ProductCard)

//   return (
//     <div className="min-h-screen bg-soft-bg section-spacious">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, ease: 'easeOut' }}
//         className="max-w-5xl mx-auto text-center mb-10 sm:mb-16 px-2 sm:px-0"
//       >
//         <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-3 sm:mb-4 tracking-wide" style={{ fontFamily: 'Optima, system-ui, serif' }}>
//           Our Collection
//         </h1>
//         <p className="text-base sm:text-lg text-card-bg mb-2" style={{ fontFamily: 'Optima, system-ui, serif' }}>
//           Discover exclusive oversized pieces crafted for royalty
//         </p>
//         <div className="h-1 w-12 sm:w-16 bg-cta-green mx-auto rounded-full mb-4 sm:mb-6" />
//       </motion.div>

//       {/* Filters and Search */}
//       <div className="max-w-5xl mx-auto mb-8 sm:mb-16 flex flex-col gap-4 sm:gap-8 px-2 sm:px-4">
//         <form className="flex-1 flex items-center bg-card-bg/60 rounded-full shadow-soft px-4 sm:px-6 py-2 sm:py-3">
//           <Search className="h-5 w-5 text-cta-green mr-2 sm:mr-3" />
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={filters.search}
//             onChange={(e) => handleFilterChange('search', e.target.value)}
//             className="flex-1 bg-transparent outline-none text-primary-dark placeholder-card-bg text-base sm:text-lg font-medium"
//           />
//         </form>
//         <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center">
//           <select
//             value={filters.category}
//             onChange={(e) => handleFilterChange('category', e.target.value)}
//             className="bg-card-bg/60 border border-card-bg/40 rounded-full px-3 sm:px-4 py-2 text-primary-dark focus:ring-cta-green focus:border-cta-green transition text-sm sm:text-base"
//           >
//             <option value="">All Categories</option>
//             <option value="oversized-tshirts">Oversized T-Shirts</option>
//             <option value="limited-edition">Limited Edition</option>
//             <option value="new-arrivals">New Arrivals</option>
//           </select>
//           <select
//             value={filters.priceRange}
//             onChange={(e) => handleFilterChange('priceRange', e.target.value)}
//             className="bg-card-bg/60 border border-card-bg/40 rounded-full px-3 sm:px-4 py-2 text-primary-dark focus:ring-cta-green focus:border-cta-green transition text-sm sm:text-base"
//           >
//             <option value="">All Prices</option>
//             <option value="0-50">Under $50</option>
//             <option value="50-100">$50 - $100</option>
//             <option value="100-200">$100 - $200</option>
//             <option value="200-">$200+</option>
//           </select>
//           <select
//             value={filters.size}
//             onChange={(e) => handleFilterChange('size', e.target.value)}
//             className="bg-card-bg/60 border border-card-bg/40 rounded-full px-3 sm:px-4 py-2 text-primary-dark focus:ring-cta-green focus:border-cta-green transition text-sm sm:text-base"
//           >
//             <option value="">All Sizes</option>
//             <option value="S">Small</option>
//             <option value="M">Medium</option>
//             <option value="L">Large</option>
//             <option value="XL">X-Large</option>
//             <option value="XXL">XX-Large</option>
//           </select>
//           <select
//             value={filters.color}
//             onChange={(e) => handleFilterChange('color', e.target.value)}
//             className="bg-card-bg/60 border border-card-bg/40 rounded-full px-3 sm:px-4 py-2 text-primary-dark focus:ring-cta-green focus:border-cta-green transition text-sm sm:text-base"
//           >
//             <option value="">All Colors</option>
//             <option value="Black">Black</option>
//             <option value="White">White</option>
//             <option value="Navy">Navy</option>
//             <option value="Gray">Gray</option>
//             <option value="Beige">Beige</option>
//             <option value="Champagne">Champagne</option>
//             <option value="Ivory">Ivory</option>
//             <option value="Cream">Cream</option>
//             <option value="Royal Blue">Royal Blue</option>
//             <option value="Deep Mauve">Deep Mauve</option>
//             <option value="Burgundy">Burgundy</option>
//             <option value="Mint">Mint</option>
//           </select>
//         </div>
//         <div className="flex flex-wrap items-center gap-2 sm:gap-2 ml-0 sm:ml-2 justify-center">
//           <button
//             onClick={() => setViewMode('grid')}
//             className={`p-2 rounded-full transition-all duration-200 border ${viewMode === 'grid' ? 'bg-cta-green text-white border-cta-green shadow' : 'bg-white text-cta-green border-wheat/40'}`}
//             aria-label="Grid view"
//             type="button"
//           >
//             <Grid className="h-5 w-5" />
//           </button>
//           <button
//             onClick={() => setViewMode('list')}
//             className={`p-2 rounded-full transition-all duration-200 border ${viewMode === 'list' ? 'bg-cta-green text-white border-cta-green shadow' : 'bg-white text-cta-green border-wheat/40'}`}
//             aria-label="List view"
//             type="button"
//           >
//             <List className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* Products Grid/List */}
//       <div className={`max-w-7xl mx-auto ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12' : 'flex flex-col gap-6 sm:gap-8'} px-2 sm:px-4 pb-16 sm:pb-24`}>
//         {loading ? (
//           [...Array(6)].map((_, index) => (
//             <div key={index} className="card-luxury p-4 sm:p-6 animate-pulse min-h-[300px] sm:min-h-[400px] rounded-3xl" />
//           ))
//         ) : paginatedProducts.length === 0 ? (
//           <div className="col-span-full text-center text-card-bg text-lg sm:text-xl py-16 sm:py-24 font-medium">
//             No products found.
//           </div>
//         ) : (
//           paginatedProducts.map((product, index) => (
//             <motion.div
//               key={product.id}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: index * 0.05 }}
//             >
//               <MemoProductCard product={product} lazy />
//             </motion.div>
//           ))
//         )}
//       </div>
//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-2 pb-12">
//           <button
//             onClick={() => setPage(page - 1)}
//             disabled={page === 1}
//             className="px-4 py-2 rounded bg-card-bg text-primary-dark disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <span className="px-2">Page {page} of {totalPages}</span>
//           <button
//             onClick={() => setPage(page + 1)}
//             disabled={page === totalPages}
//             className="px-4 py-2 rounded bg-card-bg text-primary-dark disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Products 

// import React, { useState, useEffect, useMemo } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Search, Grid, List } from 'lucide-react'
// import { getProducts, searchProducts } from '../lib/database'
// import ProductCard from '../components/ProductCard'

// // Debounce hook
// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = React.useState(value)
//   React.useEffect(() => {
//     const handler = setTimeout(() => setDebouncedValue(value), delay)
//     return () => clearTimeout(handler)
//   }, [value, delay])
//   return debouncedValue
// }

// const FEATURED_IMAGE = '/your-featured-image-path.jpg' // Replace with your hero image path

// const Products = () => {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filters, setFilters] = useState({
//     search: searchParams.get('search') || '',
//     category: '',
//     priceRange: '',
//     size: '',
//     color: '',
//   })
//   const [viewMode, setViewMode] = useState('grid')
//   const [page, setPage] = useState(1)
//   const perPage = 8
//   const debouncedFilters = useDebounce(filters, 400)

//   useEffect(() => {
//     loadProducts()
//     // eslint-disable-next-line
//   }, [debouncedFilters])

//   async function loadProducts() {
//     setLoading(true)
//     try {
//       let fetchedProducts = []
//       if (debouncedFilters.search && debouncedFilters.search.trim().length > 0) {
//         fetchedProducts = await searchProducts(debouncedFilters.search)
//       } else {
//         fetchedProducts = await getProducts()
//       }

//       let filtered = fetchedProducts
//       if (debouncedFilters.category) {
//         filtered = filtered.filter((p) => p.category === debouncedFilters.category)
//       }
//       if (debouncedFilters.priceRange) {
//         const [min, max] = debouncedFilters.priceRange.split('-').map(Number)
//         if (!isNaN(min)) {
//           if (!isNaN(max)) {
//             filtered = filtered.filter((p) => p.price >= min && p.price <= max)
//           } else {
//             filtered = filtered.filter((p) => p.price >= min)
//           }
//         }
//       }
//       if (debouncedFilters.size) {
//         filtered = filtered.filter((p) => p.sizes.includes(debouncedFilters.size))
//       }
//       if (debouncedFilters.color) {
//         filtered = filtered.filter((p) => p.colors.includes(debouncedFilters.color))
//       }
//       setProducts(filtered)
//       setPage(1)
//     } catch (e) {
//       console.error('Error loading products:', e)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleFilterChange = (key, value) => {
//     const newFilters = { ...filters, [key]: value }
//     setFilters(newFilters)
//     const params = new URLSearchParams()
//     Object.entries(newFilters).forEach(([k, v]) => {
//       if (v) params.set(k, v)
//     })
//     setSearchParams(params)
//   }

//   const totalPages = Math.ceil(products.length / perPage)
//   const paginatedProducts = useMemo(
//     () => products.slice((page - 1) * perPage, page * perPage),
//     [products, page, perPage]
//   )
//   const MemoProductCard = React.memo(ProductCard)

//   return (
//     <div className="min-h-screen bg-soft-bg section-spacious px-2 sm:px-4">
//       {/* Title Area */}
//       <motion.div
//         initial={{ opacity: 0, y: 32 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="max-w-4xl mx-auto text-center mb-10 sm:mb-14"
//       >
//         <h1
//           className="text-4xl sm:text-5xl font-bold text-primary-dark mb-4 tracking-[0.08em]"
//           style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
//         >
//           Our Collection
//         </h1>
//         <p
//           className="text-lg sm:text-xl text-card-bg italic mb-6 max-w-xl mx-auto"
//           style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
//         >
//           Discover exclusive oversized pieces crafted for royalty
//         </p>
//         <div className="h-1 w-20 sm:w-24 bg-cta-green mx-auto rounded-full" />
//       </motion.div>

//       {/* Search Bar */}
//       <motion.form
//         onSubmit={(e) => e.preventDefault()}
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, delay: 0.08 }}
//         className="flex items-center bg-card-bg/50 backdrop-blur-md rounded-full shadow-md px-7 py-3 mb-8 max-w-2xl mx-auto w-full focus-within:ring-2 focus-within:ring-cta-green"
//         role="search"
//         aria-label="Search products"
//       >
//         <Search className="h-6 w-6 text-cta-green mr-3 flex-shrink-0" />
//         <input
//           type="search"
//           placeholder="Search products..."
//           value={filters.search}
//           onChange={(e) => handleFilterChange('search', e.target.value)}
//           className="w-full bg-transparent text-primary-dark placeholder-card-bg font-medium text-lg tracking-wide outline-none"
//           autoComplete="off"
//           style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
//           aria-label="Search products"
//         />
//       </motion.form>

//       {/* Filters */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.55, delay: 0.20 }}
//         className="flex flex-wrap gap-3 sm:gap-5 items-center justify-center mb-8"
//       >
//         <FilterSelect
//           label="Category"
//           value={filters.category}
//           options={[
//             { value: '', label: 'All Categories' },
//             { value: 'oversized-tshirts', label: 'Oversized T-Shirts' },
//             { value: 'limited-edition', label: 'Limited Edition' },
//             { value: 'new-arrivals', label: 'New Arrivals' },
//           ]}
//           onChange={(val) => handleFilterChange('category', val)}
//         />
//         <FilterSelect
//           label="Price"
//           value={filters.priceRange}
//           options={[
//             { value: '', label: 'All Prices' },
//             { value: '0-50', label: 'Under $50' },
//             { value: '50-100', label: '$50 - $100' },
//             { value: '100-200', label: '$100 - $200' },
//             { value: '200-', label: '$200+' },
//           ]}
//           onChange={(val) => handleFilterChange('priceRange', val)}
//         />
//         <FilterSelect
//           label="Size"
//           value={filters.size}
//           options={[
//             { value: '', label: 'All Sizes' },
//             { value: 'S', label: 'Small' },
//             { value: 'M', label: 'Medium' },
//             { value: 'L', label: 'Large' },
//             { value: 'XL', label: 'X-Large' },
//             { value: 'XXL', label: 'XX-Large' },
//           ]}
//           onChange={(val) => handleFilterChange('size', val)}
//         />
//         <FilterSelect
//           label="Color"
//           value={filters.color}
//           options={[
//             { value: '', label: 'All Colors' },
//             { value: 'Black', label: 'Black' },
//             { value: 'White', label: 'White' },
//             { value: 'Navy', label: 'Navy' },
//             { value: 'Gray', label: 'Gray' },
//             { value: 'Beige', label: 'Beige' },
//             { value: 'Champagne', label: 'Champagne' },
//             { value: 'Ivory', label: 'Ivory' },
//             { value: 'Cream', label: 'Cream' },
//             { value: 'Royal Blue', label: 'Royal Blue' },
//             { value: 'Deep Mauve', label: 'Deep Mauve' },
//             { value: 'Burgundy', label: 'Burgundy' },
//             { value: 'Mint', label: 'Mint' },
//           ]}
//           onChange={(val) => handleFilterChange('color', val)}
//         />
//       </motion.div>
      
//       {/* View Toggle Buttons */}
//       <ViewToggleButtons viewMode={viewMode} setViewMode={setViewMode} />

//       {/* Products Display */}
//       <AnimatePresence mode="wait">
//         {viewMode === 'grid' ? (
//           <motion.div
//             key="gridview"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.7 }}
//             className="max-w-7xl mx-auto px-2 sm:px-6 pb-24"
//           >
//             {loading ? (
//               <LoadingGrid />
//             ) : paginatedProducts.length === 0 ? (
//               <EmptyState />
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-stretch">
//                 {/* Left Columns (2 products per col) */}
//                 <div className="flex flex-col gap-10">
//                   {[paginatedProducts[0], paginatedProducts[1]].map(
//                     (product, i) =>
//                       product && (
//                         <MemoProductCardWrapper key={product.id} product={product} />
//                       )
//                   )}
//                 </div>
//                 <div className="flex flex-col gap-10">
//                   {[paginatedProducts[2], paginatedProducts[3]].map(
//                     (product, i) =>
//                       product && (
//                         <MemoProductCardWrapper key={product.id} product={product} />
//                       )
//                   )}
//                 </div>
//                 {/* Featured Image */}
//                 <motion.div
//                   className="row-span-2 col-span-1 flex justify-center items-stretch"
//                   initial={{ opacity: 0, y: 40 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 1 }}
//                 >
//                   <div className="relative w-full h-full flex rounded-3xl shadow-xl overflow-hidden">
//                     <img
//                       src={FEATURED_IMAGE}
//                       alt="Featured"
//                       className="object-cover w-full h-full"
//                       style={{ aspectRatio: '3 / 4', backgroundColor: '#ededed' }}
//                       loading="lazy"
//                     />
//                   </div>
//                 </motion.div>
//                 {/* Right Columns */}
//                 <div className="flex flex-col gap-10">
//                   {[paginatedProducts[4], paginatedProducts[5]].map(
//                     (product) =>
//                       product && (
//                         <MemoProductCardWrapper key={product.id} product={product} />
//                       )
//                   )}
//                 </div>
//                 <div className="flex flex-col gap-10">
//                   {[paginatedProducts[6], paginatedProducts[7]].map(
//                     (product) =>
//                       product && (
//                         <MemoProductCardWrapper key={product.id} product={product} />
//                       )
//                   )}
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         ) : (
//           // List View
//           <motion.div
//             key="listview"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.7 }}
//             className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12 px-2 sm:px-6 pb-24"
//           >
//             {loading ? (
//               <LoadingList />
//             ) : paginatedProducts.length === 0 ? (
//               <EmptyState />
//             ) : (
//               paginatedProducts.map((product) => (
//                 <MemoProductCardWrapper key={product.id} product={product} />
//               ))
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//       {/* Pagination */}
//       {totalPages > 1 && (
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.06 }}
//           className="flex justify-center items-center gap-5 pb-16"
//         >
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page === 1}
//             className="px-6 py-3 rounded-full bg-card-bg text-primary-dark disabled:opacity-50 font-semibold hover:bg-cta-green hover:text-white transition"
//             style={{ fontFamily: "'Poiret One', Optima, system-ui, serif", letterSpacing: '0.06em' }}
//           >
//             Prev
//           </button>
//           <span className="min-w-[120px] text-lg font-medium text-primary-dark select-none"
//             style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
//           >
//             Page {page} of {totalPages}
//           </span>
//           <button
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             disabled={page === totalPages}
//             className="px-6 py-3 rounded-full bg-card-bg text-primary-dark disabled:opacity-50 font-semibold hover:bg-cta-green hover:text-white transition"
//             style={{ fontFamily: "'Poiret One', Optima, system-ui, serif", letterSpacing: '0.06em' }}
//           >
//             Next
//           </button>
//         </motion.div>
//       )}
//     </div>
//   )
// }

// // Filter Select Component
// const FilterSelect = ({ label, value, options, onChange }) => (
//   <select
//     aria-label={label}
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     className="bg-card-bg/60 border border-card-bg/40 rounded-full px-5 py-2 text-primary-dark focus:ring-cta-green focus:border-cta-green transition text-base font-medium tracking-wide"
//     style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
//   >
//     {options.map((opt) => (
//       <option key={opt.value} value={opt.value}>
//         {opt.label}
//       </option>
   
//  ))}
//   </select>
// )

// // View Toggle Buttons
// const ViewToggleButtons = ({ viewMode, setViewMode }) => (
//   <div className="flex justify-center items-center gap-5 mb-12">
//     <button
//       type="button"
//       aria-label="Grid view"
//       onClick={() => setViewMode('grid')}
//       className={`p-4 rounded-full border shadow-md text-lg transition-all focus:outline-none focus:ring-2 focus:ring-cta-green focus:ring-offset-1 ${
//         viewMode === 'grid'
//           ? 'bg-cta-green text-white border-cta-green shadow-lg scale-105'
//           : 'bg-white text-cta-green border-wheat/40 hover:bg-cta-green hover:text-white'
//       }`}
//       style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
//     >
//       <Grid className="h-6 w-6" />
//     </button>
//     <button
//       type="button"
//       aria-label="List view"
//       onClick={() => setViewMode('list')}
//       className={`p-4 rounded-full border shadow-md text-lg transition-all focus:outline-none focus:ring-2 focus:ring-cta-green focus:ring-offset-1 ${
//         viewMode === 'list'
//           ? 'bg-cta-green text-white border-cta-green shadow-lg scale-105'
//           : 'bg-white text-cta-green border-wheat/40 hover:bg-cta-green hover:text-white'
//       }`}
//       style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
//     >
//       <List className="h-6 w-6" />
//     </button>
//   </div>
// )

// // Loading skeleton grid placeholder
// const LoadingGrid = () => (
//   <div className="grid md:grid-cols-4 gap-10">
//     {[...Array(8)].map((_, i) => (
//       <div
//         key={i}
//         className="card-luxury p-8 rounded-3xl animate-pulse min-h-[320px] sm:min-h-[420px] bg-card-bg/70"
//       />
//     ))}
//   </div>
// )
// const LoadingList = () => (
//   <div className="flex flex-col gap-10">
//     {[...Array(5)].map((_, i) => (
//       <div
//         key={i}
//         className="card-luxury p-6 rounded-3xl animate-pulse min-h-[180px] sm:min-h-[220px] bg-card-bg/70"
//       />
//     ))}
//   </div>
// )
// const EmptyState = () => (
//   <div className="text-center text-card-bg text-xl py-20 font-medium select-none" style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}>
//     No products found.
//   </div>
// )

// // Wrapper with hover animation and memo
// const MemoProductCardWrapper = React.memo(({ product }) => (
//   <motion.div
//     whileHover={{ scale: 1.035, boxShadow: '0 20px 40px rgba(0,0,0,0.10)' }}
//     transition={{ type: 'spring', stiffness: 300, damping: 23 }}
//     className="rounded-3xl overflow-hidden bg-white/85 shadow-md transition"
//     style={{ minHeight: '320px' }}
//   >
//     <ProductCard product={product} lazy />
//   </motion.div>
// ))

// export default Products

import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Grid, List } from 'lucide-react'
import { getProducts, searchProducts } from '../lib/database'
import ProductCard from '../components/ProductCard'

// Debounce hook for filters input
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

// Replace with your featured image path
const FEATURED_IMAGE = '/your-featured-image-path.jpg'

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
  const perPage = 8
  const debouncedFilters = useDebounce(filters, 400)

  // Load products on debounced filters change
  useEffect(() => {
    loadProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilters])

  async function loadProducts() {
    setLoading(true)
    try {
      let fetchedProducts = []

      if (debouncedFilters.search?.trim()) {
        fetchedProducts = await searchProducts(debouncedFilters.search)
      } else {
        fetchedProducts = await getProducts()
      }

      let filtered = fetchedProducts

      // Filter by Category
      if (debouncedFilters.category) {
        filtered = filtered.filter((p) => p.category === debouncedFilters.category)
      }

      // Filter by Price Range
      if (debouncedFilters.priceRange) {
        const [min, max] = debouncedFilters.priceRange.split('-').map(Number)
        if (!isNaN(min)) {
          filtered = isNaN(max)
            ? filtered.filter((p) => p.price >= min)
            : filtered.filter((p) => p.price >= min && p.price <= max)
        }
      }

      // Filter by Size
      if (debouncedFilters.size) {
        filtered = filtered.filter((p) => p.sizes.includes(debouncedFilters.size))
      }

      // Filter by Color
      if (debouncedFilters.color) {
        filtered = filtered.filter((p) => p.colors.includes(debouncedFilters.color))
      }

      setProducts(filtered)
      setPage(1)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handler to change filters and URL search params
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    setSearchParams(params)
  }

  // Pagination calculation
  const totalPages = Math.ceil(products.length / perPage)
  const paginatedProducts = useMemo(
    () => products.slice((page - 1) * perPage, page * perPage),
    [products, page, perPage]
  )

  const MemoProductCardWrapper = React.memo(({ product }) => (
    <motion.div
      whileHover={{ scale: 1.035, boxShadow: '0 20px 40px rgba(0,0,0,0.10)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 23 }}
      className="rounded-3xl overflow-hidden bg-white/85 shadow-md transition"
      style={{ minHeight: '320px' }}
    >
      <ProductCard product={product} lazy />
    </motion.div>
  ))

  return (
    <div className="min-h-screen bg-soft-bg section-spacious px-2 sm:px-4">
      {/* Title Area */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-10 sm:mb-14"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-4xl sm:text-5xl font-bold text-primary-dark mb-4 tracking-[0.08em]"
          style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
        >
          Our Collection
        </h1>
        <p
          className="text-lg sm:text-xl text-card-bg italic mb-6 max-w-xl mx-auto"
          style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
        >
          Discover exclusive oversized pieces crafted for royalty
        </p>
        <div className="h-1 w-20 sm:w-24 bg-cta-green mx-auto rounded-full" />
      </motion.div>

      {/* Search Bar */}
      <motion.form
        onSubmit={(e) => e.preventDefault()}
        role="search"
        aria-label="Search products"
        className="flex items-center bg-card-bg/50 backdrop-blur-md rounded-full shadow-md px-7 py-3 mb-8 max-w-2xl mx-auto w-full focus-within:ring-2 focus-within:ring-cta-green"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.08 }}
      >
        <Search className="h-6 w-6 text-cta-green mr-3 flex-shrink-0" />
        <input
          type="search"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full bg-transparent text-primary-dark placeholder-card-bg font-medium text-lg tracking-wide outline-none"
          autoComplete="off"
          aria-label="Search products"
          style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
        />
      </motion.form>

      {/* Filters */}
      <motion.div
        className="flex flex-wrap gap-3 sm:gap-5 items-center justify-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.20 }}
      >
        <FilterSelect
          label="Category"
          value={filters.category}
          options={[
            { value: '', label: 'All Categories' },
            { value: 'oversized-tshirts', label: 'Oversized T-Shirts' },
            { value: 'limited-edition', label: 'Limited Edition' },
            { value: 'new-arrivals', label: 'New Arrivals' },
          ]}
          onChange={(val) => handleFilterChange('category', val)}
        />
        <FilterSelect
          label="Price"
          value={filters.priceRange}
          options={[
            { value: '', label: 'All Prices' },
            { value: '0-50', label: 'Under $50' },
            { value: '50-100', label: '$50 - $100' },
            { value: '100-200', label: '$100 - $200' },
            { value: '200-', label: '$200+' },
          ]}
          onChange={(val) => handleFilterChange('priceRange', val)}
        />
        <FilterSelect
          label="Size"
          value={filters.size}
          options={[
            { value: '', label: 'All Sizes' },
            { value: 'S', label: 'Small' },
            { value: 'M', label: 'Medium' },
            { value: 'L', label: 'Large' },
            { value: 'XL', label: 'X-Large' },
            { value: 'XXL', label: 'XX-Large' },
          ]}
          onChange={(val) => handleFilterChange('size', val)}
        />
        <FilterSelect
          label="Color"
          value={filters.color}
          options={[
            { value: '', label: 'All Colors' },
            { value: 'Black', label: 'Black' },
            { value: 'White', label: 'White' },
            { value: 'Navy', label: 'Navy' },
            { value: 'Gray', label: 'Gray' },
            { value: 'Beige', label: 'Beige' },
            { value: 'Champagne', label: 'Champagne' },
            { value: 'Ivory', label: 'Ivory' },
            { value: 'Cream', label: 'Cream' },
            { value: 'Royal Blue', label: 'Royal Blue' },
            { value: 'Deep Mauve', label: 'Deep Mauve' },
            { value: 'Burgundy', label: 'Burgundy' },
            { value: 'Mint', label: 'Mint' },
          ]}
          onChange={(val) => handleFilterChange('color', val)}
        />
      </motion.div>

      {/* View Mode Toggle Buttons */}
      <ViewToggleButtons viewMode={viewMode} setViewMode={setViewMode} />

      {/* Products Grid/List */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="gridview"
            className="max-w-7xl mx-auto px-2 sm:px-6 pb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {loading ? (
              <LoadingGrid />
            ) : paginatedProducts.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-stretch">
                {/* Left Columns */}
                <div className="flex flex-col gap-10">
                  {[paginatedProducts[0], paginatedProducts[1]].map(
                    (product) => product && <MemoProductCardWrapper key={product.id} product={product} />
                  )}
                </div>
                <div className="flex flex-col gap-10">
                  {[paginatedProducts[2], paginatedProducts[3]].map(
                    (product) => product && <MemoProductCardWrapper key={product.id} product={product} />
                  )}
                </div>

                {/* Featured Image */}
                <motion.div
                  className="row-span-2 col-span-1 flex justify-center items-stretch"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div className="relative w-full h-full flex rounded-3xl shadow-xl overflow-hidden">
                    <img
                      src={FEATURED_IMAGE}
                      alt="Featured"
                      className="object-cover w-full h-full"
                      style={{ aspectRatio: '3 / 4', backgroundColor: '#ededed' }}
                      loading="lazy"
                    />
                  </div>
                </motion.div>

                {/* Right Columns */}
                <div className="flex flex-col gap-10">
                  {[paginatedProducts[4], paginatedProducts[5]].map(
                    (product) => product && <MemoProductCardWrapper key={product.id} product={product} />
                  )}
                </div>
                <div className="flex flex-col gap-10">
                  {[paginatedProducts[6], paginatedProducts[7]].map(
                    (product) => product && <MemoProductCardWrapper key={product.id} product={product} />
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          // List View
          <motion.div
            key="listview"
            className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12 px-2 sm:px-6 pb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {loading ? (
              <LoadingList />
            ) : paginatedProducts.length === 0 ? (
              <EmptyState />
            ) : (
              paginatedProducts.map((product) => (
                <MemoProductCardWrapper key={product.id} product={product} />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          className="flex justify-center items-center gap-5 pb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.06 }}
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-6 py-3 rounded-full bg-card-bg text-primary-dark disabled:opacity-50 font-semibold hover:bg-cta-green hover:text-white transition"
            style={{ fontFamily: "'Poiret One', Optima, system-ui, serif", letterSpacing: '0.06em' }}
          >
            Prev
          </button>
          <span
            className="min-w-[120px] text-lg font-medium text-primary-dark select-none"
            style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
          >
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-6 py-3 rounded-full bg-card-bg text-primary-dark disabled:opacity-50 font-semibold hover:bg-cta-green hover:text-white transition"
            style={{ fontFamily: "'Poiret One', Optima, system-ui, serif", letterSpacing: '0.06em' }}
          >
            Next
          </button>
        </motion.div>
      )}
    </div>
  )
}

// Filter Select Component
const FilterSelect = ({ label, value, options, onChange }) => (
  <select
    aria-label={label}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-card-bg/60 border border-card-bg/40 rounded-full px-5 py-2 text-primary-dark focus:ring-cta-green focus:border-cta-green transition text-base font-medium tracking-wide"
    style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
)

// View Toggle Buttons Component
const ViewToggleButtons = ({ viewMode, setViewMode }) => (
  <div className="flex justify-center items-center gap-5 mb-12">
    <button
      type="button"
      aria-label="Grid view"
      onClick={() => setViewMode('grid')}
      className={`p-4 rounded-full border shadow-md text-lg transition-all focus:outline-none focus:ring-2 focus:ring-cta-green focus:ring-offset-1 ${
        viewMode === 'grid'
          ? 'bg-cta-green text-white border-cta-green shadow-lg scale-105'
          : 'bg-white text-cta-green border-wheat/40 hover:bg-cta-green hover:text-white'
      }`}
      style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
    >
      <Grid className="h-6 w-6" />
    </button>
    <button
      type="button"
      aria-label="List view"
      onClick={() => setViewMode('list')}
      className={`p-4 rounded-full border shadow-md text-lg transition-all focus:outline-none focus:ring-2 focus:ring-cta-green focus:ring-offset-1 ${
        viewMode === 'list'
          ? 'bg-cta-green text-white border-cta-green shadow-lg scale-105'
          : 'bg-white text-cta-green border-wheat/40 hover:bg-cta-green hover:text-white'
      }`}
      style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
    >
      <List className="h-6 w-6" />
    </button>
  </div>
)

// Loading skeleton grid placeholder
const LoadingGrid = () => (
  <div className="grid md:grid-cols-4 gap-10">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="card-luxury p-8 rounded-3xl animate-pulse min-h-[320px] sm:min-h-[420px] bg-card-bg/70"
      />
    ))}
  </div>
)

// Loading skeleton list placeholder
const LoadingList = () => (
  <div className="flex flex-col gap-10">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="card-luxury p-6 rounded-3xl animate-pulse min-h-[180px] sm:min-h-[220px] bg-card-bg/70"
      />
    ))}
  </div>
)

// Empty state when no products found
const EmptyState = () => (
  <div
    className="text-center text-card-bg text-xl py-20 font-medium select-none"
    style={{ fontFamily: "'Poiret One', Optima, system-ui, serif" }}
  >
    No products found.
  </div>
)

export default Products
