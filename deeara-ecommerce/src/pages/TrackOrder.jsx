import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  User,
  Calendar,
  DollarSign,
  CreditCard,
  Shield,
  ArrowRight
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useOrder } from '../contexts/OrderContext'
import { useCurrency } from '../contexts/CurrencyContext'
import toast from 'react-hot-toast'

const TrackOrder = () => {
  const { user } = useAuth()
  const { getOrderByTrackingId, getOrderStatusInfo, getPaymentStatusInfo, loading } = useOrder()
  const { symbol, rate } = useCurrency()
  
  const [trackingId, setTrackingId] = useState('')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)
  const [searchPerformed, setSearchPerformed] = useState(false)

  const handleTrack = async (e) => {
    e.preventDefault()
    setError(null)
    setOrder(null)
    
    if (!user) {
      toast.error('Please sign in to track orders')
      return
    }

    if (!trackingId.trim()) {
      setError('Please enter a valid tracking ID.')
      return
    }

    setSearchPerformed(true)
    const orderData = await getOrderByTrackingId(trackingId.trim())
    
    if (orderData) {
      setOrder(orderData)
    } else {
      setError('Order not found. Please check your tracking ID and try again.')
    }
  }

  const getStatusStep = (status) => {
    const statusSteps = {
      'pending': 1,
      'confirmed': 2,
      'packed': 3,
      'shipped': 4,
      'delivered': 5,
      'cancelled': 0
    }
    return statusSteps[status] || 1
  }

  const getStatusIcon = (status, currentStep) => {
    if (status === 'cancelled') {
      return <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
        <span className="text-white text-sm font-bold">✕</span>
      </div>
    }

    if (currentStep <= getStatusStep(status)) {
      return <CheckCircle className="w-8 h-8 text-green-500" />
    } else {
      return <Clock className="w-8 h-8 text-gray-400" />
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatAddress = (address) => {
    if (!address) return 'N/A'
    return `${address.address}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`
  }

  return (
    <div className="min-h-screen bg-sugar py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-serif font-bold text-mocha mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-wheat font-sans max-w-2xl mx-auto">
            Enter your tracking ID to see the real-time status of your order. 
            You can only track orders associated with your account.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          className="max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="text"
              placeholder="Enter Tracking ID (e.g., DEE123ABC456)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1 px-5 py-3 rounded-glass border border-card-bg/40 bg-white/80 text-primary-dark placeholder-card-bg focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans shadow transition"
              aria-label="Tracking ID"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-glass font-semibold bg-cta-green text-primary-dark shadow-soft hover:bg-card-bg hover:text-cta-green transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </form>
        </motion.div>

        {/* Error Display */}
        {error && searchPerformed && (
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-red-50 border border-red-200 p-6 rounded-glass text-center">
              <p className="text-red-600 font-sans font-semibold">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Order Details */}
        {order && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Order Summary Card */}
            <div className="bg-bisque/60 p-8 rounded-glass shadow-soft">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-mocha mb-6 flex items-center">
                    <Package className="h-6 w-6 mr-2" />
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-wheat">Order ID:</span>
                      <span className="font-mono text-mocha">{order.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-wheat">Tracking ID:</span>
                      <span className="font-mono text-pistachio font-bold">{order.tracking_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-wheat">Order Date:</span>
                      <span className="text-mocha">{formatDate(order.created_at)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-wheat">Total Amount:</span>
                      <span className="font-bold text-mocha">{symbol}{(order.total_amount * rate).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-wheat">Delivery Partner:</span>
                      <span className="text-mocha">{order.delivery_partner || 'TBD'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-mocha mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Status Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white/40 p-4 rounded-glass">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-wheat">Order Status</span>
                        <span className={`font-semibold ${getOrderStatusInfo(order.status).color}`}>
                          {getOrderStatusInfo(order.status).label}
                        </span>
                      </div>
                      <p className="text-sm text-wheat">
                        {getOrderStatusInfo(order.status).description}
                      </p>
                    </div>

                    <div className="bg-white/40 p-4 rounded-glass">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-wheat">Payment Status</span>
                        <span className={`font-semibold ${getPaymentStatusInfo(order.payment_status).color}`}>
                          {getPaymentStatusInfo(order.payment_status).label}
                        </span>
                      </div>
                      <p className="text-sm text-wheat">
                        {getPaymentStatusInfo(order.payment_status).description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Progress Timeline */}
            <div className="bg-bisque/60 p-8 rounded-glass shadow-soft">
              <h3 className="text-2xl font-serif font-bold text-mocha mb-8 flex items-center">
                <Truck className="h-6 w-6 mr-2" />
                Order Progress
              </h3>

              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                {/* Timeline Steps */}
                <div className="space-y-8">
                  {[
                    { status: 'pending', label: 'Order Placed', description: 'Your order has been received' },
                    { status: 'confirmed', label: 'Payment Confirmed', description: 'Payment has been processed' },
                    { status: 'packed', label: 'Order Packed', description: 'Your order is being prepared for shipping' },
                    { status: 'shipped', label: 'Order Shipped', description: 'Your order is on its way' },
                    { status: 'delivered', label: 'Order Delivered', description: 'Your order has been delivered' }
                  ].map((step, index) => {
                    const currentStep = getStatusStep(order.status)
                    const isCompleted = currentStep >= index + 1
                    const isCurrent = currentStep === index + 1

                    return (
                      <div key={step.status} className="relative flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          {getStatusIcon(order.status, index + 1)}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-serif font-semibold text-lg ${
                            isCompleted ? 'text-mocha' : 'text-gray-400'
                          }`}>
                            {step.label}
                          </h4>
                          <p className={`text-sm ${
                            isCompleted ? 'text-wheat' : 'text-gray-400'
                          }`}>
                            {step.description}
                          </p>
                          {isCurrent && (
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pistachio text-espresso">
                                Current Status
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-bisque/60 p-8 rounded-glass shadow-soft">
              <h3 className="text-2xl font-serif font-bold text-mocha mb-6 flex items-center">
                <Package className="h-6 w-6 mr-2" />
                Order Items
              </h3>

              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/40 rounded-glass">
                    <div className="w-16 h-16 bg-white/80 rounded-glass flex items-center justify-center">
                      <Package className="h-8 w-8 text-pistachio" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif font-semibold text-mocha">{item.product_name}</h4>
                      <p className="text-sm text-wheat">
                        Size: {item.size} • Color: {item.color} • Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif font-semibold text-mocha">
                        {symbol}{(item.price * item.quantity * rate).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Billing Information */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Shipping Address */}
              <div className="bg-bisque/60 p-8 rounded-glass shadow-soft">
                <h3 className="text-xl font-serif font-bold text-mocha mb-6 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Shipping Address
                </h3>
                <div className="space-y-2 text-wheat">
                  <p className="font-semibold text-mocha">
                    {order.shipping_address?.firstName} {order.shipping_address?.lastName}
                  </p>
                  <p>{order.shipping_address?.address}</p>
                  <p>
                    {order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.zipCode}
                  </p>
                  <p>{order.shipping_address?.country}</p>
                  <p className="mt-4">
                    <span className="font-semibold">Phone:</span> {order.shipping_address?.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {order.shipping_address?.email}
                  </p>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-bisque/60 p-8 rounded-glass shadow-soft">
                <h3 className="text-xl font-serif font-bold text-mocha mb-6 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Billing Address
                </h3>
                <div className="space-y-2 text-wheat">
                  <p className="font-semibold text-mocha">
                    {order.billing_address?.firstName} {order.billing_address?.lastName}
                  </p>
                  <p>{order.billing_address?.address}</p>
                  <p>
                    {order.billing_address?.city}, {order.billing_address?.state} {order.billing_address?.zipCode}
                  </p>
                  <p>{order.billing_address?.country}</p>
                  <p className="mt-4">
                    <span className="font-semibold">Phone:</span> {order.billing_address?.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {order.billing_address?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-pistachio text-espresso px-8 py-3 rounded-glass font-serif text-lg shadow-soft hover:bg-wheat hover:text-espresso transition flex items-center justify-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Track Another Order
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-card-bg text-cta-green px-8 py-3 rounded-glass font-serif text-lg shadow-soft hover:bg-cta-green hover:text-card-bg transition flex items-center justify-center gap-2"
                >
                  Continue Shopping
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        {!order && !error && (
          <motion.div
            className="max-w-2xl mx-auto mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="bg-bisque/60 p-8 rounded-glass shadow-soft text-center">
              <h3 className="text-xl font-serif font-bold text-mocha mb-4">
                Need Help?
              </h3>
              <p className="text-wheat mb-6">
                Your tracking ID was sent to your email when your order was placed. 
                If you can't find it, please check your spam folder or contact our support team.
              </p>
              <div className="space-y-2 text-sm text-wheat">
                <p>• Tracking IDs start with "DEE" followed by alphanumeric characters</p>
                <p>• You can only track orders associated with your account</p>
                <p>• For immediate assistance, contact us at support@deeara.com</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default TrackOrder
