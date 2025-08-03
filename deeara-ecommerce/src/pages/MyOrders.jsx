import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc,
  Eye,
  Calendar,
  DollarSign,
  Truck,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useOrder } from '../contexts/OrderContext'
import { useCurrency } from '../contexts/CurrencyContext'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const MyOrders = () => {
  const { user } = useAuth()
  const { orders, loading, getOrderStatusInfo, getPaymentStatusInfo } = useOrder()
  const { symbol, rate } = useCurrency()
  
  const [filteredOrders, setFilteredOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to view your orders')
      return
    }
  }, [user])

  useEffect(() => {
    let filtered = [...orders]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.tracking_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items?.some(item => 
          item.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(b.created_at) - new Date(a.created_at)
          break
        case 'amount':
          comparison = b.total_amount - a.total_amount
          break
        case 'status':
          comparison = a.status.localeCompare(b.status)
          break
        default:
          comparison = 0
      }
      
      return sortOrder === 'desc' ? comparison : -comparison
    })

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter, sortBy, sortOrder])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />
      case 'packed':
        return <Package className="w-5 h-5 text-purple-500" />
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'cancelled':
        return <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold">✕</span>
        </div>
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getItemCount = (items) => {
    if (!items) return 0
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-sugar flex items-center justify-center">
        <div className="text-center bg-bisque/60 p-12 rounded-glass shadow-soft">
          <h2 className="text-3xl font-serif font-bold text-mocha mb-6">
            Please Sign In
          </h2>
          <p className="text-wheat mb-6">You need to be signed in to view your orders.</p>
          <Link 
            to="/login"
            className="bg-pistachio text-espresso px-8 py-3 rounded-glass font-serif text-lg shadow-soft hover:bg-wheat hover:text-espresso transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sugar py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-serif font-bold text-mocha mb-4">
            My Orders
          </h1>
          <p className="text-lg text-wheat font-sans">
            Track and manage all your orders in one place
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="bg-bisque/60 p-6 rounded-glass shadow-soft mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wheat" />
                <input
                  type="text"
                  placeholder="Search by tracking ID, order ID, or product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-glass border border-card-bg/40 bg-white/80 text-primary-dark placeholder-card-bg focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 rounded-glass border border-card-bg/40 bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="packed">Packed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-2 rounded-glass border border-card-bg/40 bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="status">Status</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                className="px-3 py-2 rounded-glass border border-card-bg/40 bg-white/80 text-primary-dark hover:bg-card-bg/20 transition"
              >
                {sortOrder === 'desc' ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pistachio mx-auto"></div>
              <p className="text-wheat mt-4">Loading your orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-bisque/60 rounded-glass shadow-soft">
              <Package className="h-16 w-16 text-wheat mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-mocha mb-2">
                {orders.length === 0 ? 'No Orders Yet' : 'No Orders Found'}
              </h3>
              <p className="text-wheat mb-6">
                {orders.length === 0 
                  ? "You haven't placed any orders yet. Start shopping to see your orders here."
                  : "No orders match your current filters. Try adjusting your search criteria."
                }
              </p>
              <Link
                to="/products"
                className="bg-pistachio text-espresso px-8 py-3 rounded-glass font-serif text-lg shadow-soft hover:bg-wheat hover:text-espresso transition"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                className="bg-bisque/60 p-6 rounded-glass shadow-soft hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  {/* Order Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-serif font-bold text-mocha text-lg mb-1">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-sm text-wheat mb-2">
                          Placed on {formatDate(order.created_at)}
                        </p>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <span className={`font-semibold ${getOrderStatusInfo(order.status).color}`}>
                            {getOrderStatusInfo(order.status).label}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-serif font-bold text-mocha text-lg">
                          {symbol}{(order.total_amount * rate).toFixed(2)}
                        </p>
                        <p className="text-sm text-wheat">
                          {getItemCount(order.items)} item{getItemCount(order.items) !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="space-y-2">
                      {order.items?.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 bg-white/80 rounded-glass flex items-center justify-center">
                            <Package className="h-4 w-4 text-pistachio" />
                          </div>
                          <span className="text-mocha font-medium">{item.product_name}</span>
                          <span className="text-wheat">
                            {item.size} • {item.color} • Qty: {item.quantity}
                          </span>
                        </div>
                      ))}
                      {order.items?.length > 2 && (
                        <p className="text-sm text-wheat italic">
                          +{order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tracking Info */}
                  <div className="text-center">
                    <div className="bg-white/40 p-4 rounded-glass">
                      <p className="text-sm text-wheat mb-1">Tracking ID</p>
                      <p className="font-mono text-pistachio font-bold text-sm">
                        {order.tracking_id || 'N/A'}
                      </p>
                      {order.delivery_partner && (
                        <p className="text-xs text-wheat mt-1">
                          {order.delivery_partner}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="text-center">
                    <Link
                      to={`/track-order?tracking=${order.tracking_id}`}
                      className="inline-flex items-center gap-2 bg-pistachio text-espresso px-4 py-2 rounded-glass font-serif text-sm shadow-soft hover:bg-wheat hover:text-espresso transition"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-wheat">Payment:</span>
                      <span className={`text-sm font-semibold ${getPaymentStatusInfo(order.payment_status).color}`}>
                        {getPaymentStatusInfo(order.payment_status).label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-wheat">
                      <Calendar className="h-4 w-4" />
                      <span>Updated: {formatDate(order.updated_at)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Summary Stats */}
        {orders.length > 0 && (
          <motion.div
            className="mt-12 bg-bisque/60 p-6 rounded-glass shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3 className="text-xl font-serif font-bold text-mocha mb-4">Order Summary</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-mocha">{orders.length}</p>
                <p className="text-sm text-wheat">Total Orders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
                <p className="text-sm text-wheat">Delivered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {orders.filter(o => ['shipped', 'packed'].includes(o.status)).length}
                </p>
                <p className="text-sm text-wheat">In Transit</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pistachio">
                  {symbol}{orders.reduce((total, order) => total + (order.total_amount * rate), 0).toFixed(2)}
                </p>
                <p className="text-sm text-wheat">Total Spent</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MyOrders 