import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  Truck, 
  Package, 
  User, 
  MapPin,
  ArrowLeft,
  Shield
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useOrder } from '../contexts/OrderContext'
import { useCurrency } from '../contexts/CurrencyContext'
import toast from 'react-hot-toast'

const BANKS = [
  'HDFC Bank',
  'ICICI Bank',
  'State Bank of India',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'IDFC FIRST Bank',
  'Yes Bank',
  'IndusInd Bank',
]

const Payment = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { createOrder, processPayment, currentOrder, loading } = useOrder()
  const { symbol, rate } = useCurrency()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Billing Information (same as shipping by default)
    billingSameAsShipping: true,
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: ''
  })

  const [orderComplete, setOrderComplete] = useState(false)
  const [trackingId, setTrackingId] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [upiVpa, setUpiVpa] = useState('')
  const [upiStatus, setUpiStatus] = useState('idle')
  const [netbankingBank, setNetbankingBank] = useState('')
  const [netbankingStatus, setNetbankingStatus] = useState('idle')

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to proceed with checkout')
      navigate('/login')
      return
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      navigate('/cart')
      return
    }

    // Pre-fill form with user data
    if (user.user_metadata?.full_name) {
      const [firstName, ...lastNameParts] = user.user_metadata.full_name.split(' ')
      setFormData(prev => ({
        ...prev,
        firstName: firstName || '',
        lastName: lastNameParts.join(' ') || '',
        email: user.email || ''
      }))
    }
  }, [user, cartItems, navigate])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Auto-fill billing address if same as shipping
    if (name === 'billingSameAsShipping' && checked) {
      setFormData(prev => ({
        ...prev,
        billingFirstName: prev.firstName,
        billingLastName: prev.lastName,
        billingAddress: prev.address,
        billingCity: prev.city,
        billingState: prev.state,
        billingZipCode: prev.zipCode,
        billingCountry: prev.country
      }))
    }
  }

  const validateForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'address', 
      'city', 'state', 'zipCode', 'country'
    ]

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
        return false
      }
    }

    if (step === 2) {
      const paymentFields = ['cardNumber', 'cardName', 'expiryDate', 'cvv']
      for (const field of paymentFields) {
        if (!formData[field]) {
          toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
          return false
        }
      }
    }

    return true
  }

  const handleNextStep = () => {
    if (!validateForm()) return
    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }

  const handlePlaceOrder = async () => {
    if (!validateForm()) return

    // UPI simulation
    if (paymentMethod === 'upi') {
      if (!upiVpa.trim()) {
        toast.error('Please enter your UPI VPA')
        return
      }
      setUpiStatus('processing')
      await new Promise(res => setTimeout(res, 1800))
      setUpiStatus('success')
      toast.success('UPI payment successful!')
    }

    // Netbanking simulation
    if (paymentMethod === 'netbanking') {
      if (!netbankingBank) {
        toast.error('Please select your bank')
        return
      }
      setNetbankingStatus('processing')
      await new Promise(res => setTimeout(res, 1800))
      setNetbankingStatus('success')
      toast.success('Netbanking payment successful!')
    }

    try {
      // Create order
      const orderData = {
        totalAmount: getCartTotal() * 1.08, // Including tax
        currency: 'USD',
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        billingAddress: formData.billingSameAsShipping ? {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        } : {
          firstName: formData.billingFirstName,
          lastName: formData.billingLastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.billingAddress,
          city: formData.billingCity,
          state: formData.billingState,
          zipCode: formData.billingZipCode,
          country: formData.billingCountry
        },
        items: cartItems.map(item => ({
          product_id: item.product_id,
          product_name: item.product.name,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.product.price
        }))
      }

      const order = await createOrder(orderData)
      if (!order) return

      // Process payment
      const paymentData = {
        paymentIntentId: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        cardNumber: formData.cardNumber.slice(-4),
        amount: orderData.totalAmount
      }

      const paymentSuccess = await processPayment(order.id, paymentData)
      if (paymentSuccess) {
        setTrackingId(order.tracking_id)
        setOrderComplete(true)
        setStep(3)
      }
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order. Please try again.')
    }
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-sugar flex items-center justify-center">
        <div className="text-center bg-bisque/60 p-12 rounded-glass shadow-soft">
          <h2 className="text-3xl font-serif font-bold text-mocha mb-6">
            Please Sign In
          </h2>
          <p className="text-wheat mb-6">You need to be signed in to proceed with checkout.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-pistachio text-espresso px-8 py-3 rounded-glass font-serif text-lg shadow-soft hover:bg-wheat hover:text-espresso transition"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-sugar flex items-center justify-center">
        <div className="text-center bg-bisque/60 p-12 rounded-glass shadow-soft">
          <h2 className="text-3xl font-serif font-bold text-mocha mb-6">
            Your Cart is Empty
          </h2>
          <p className="text-wheat mb-6">Add some products to your cart before checkout.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-pistachio text-espresso px-8 py-3 rounded-glass font-serif text-lg shadow-soft hover:bg-wheat hover:text-espresso transition"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-sugar py-16 flex items-center justify-center px-4">
        <motion.div
          className="max-w-2xl w-full bg-bisque/60 p-14 rounded-glass shadow-soft text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto h-20 w-20 bg-green-500 text-white rounded-full flex items-center justify-center mb-8"
          >
            <CheckCircle className="h-10 w-10" />
          </motion.div>

          <h1 className="text-4xl font-serif font-bold text-mocha mb-6">
            Order Confirmed!
          </h1>
          
          <div className="bg-white/80 p-6 rounded-glass mb-8">
            <h3 className="text-xl font-serif font-bold text-mocha mb-4">
              Your Tracking ID
            </h3>
            <div className="bg-pistachio/20 p-4 rounded-glass border-2 border-pistachio">
              <p className="text-2xl font-mono font-bold text-pistachio tracking-wider">
                {trackingId}
              </p>
            </div>
            <p className="text-sm text-wheat mt-2">
              Save this tracking ID to monitor your order status
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <p className="text-primary-dark font-serif text-lg">
              Thank you for your order! We've sent a confirmation email with all the details.
            </p>
            <p className="text-wheat">
              Your order is being prepared and will be shipped soon.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/track-order')}
              className="bg-pistachio text-espresso px-8 py-3 rounded-glass font-serif text-lg shadow-soft hover:bg-wheat hover:text-espresso transition"
            >
              Track Order
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-card-bg text-cta-green px-8 py-3 rounded-glass font-serif text-lg shadow-soft hover:bg-cta-green hover:text-card-bg transition"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sugar py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-mocha mb-4">
            Secure Checkout
          </h1>
          <div className="flex items-center justify-center gap-4 text-wheat">
            <Shield className="h-5 w-5" />
            <span className="font-sans">256-bit SSL encryption</span>
            <Lock className="h-5 w-5" />
            <span className="font-sans">Secure payment processing</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-bisque/60 p-8 rounded-glass shadow-soft">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                <div className={`flex items-center ${step >= 1 ? 'text-pistachio' : 'text-wheat'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-pistachio bg-pistachio text-white' : 'border-wheat'}`}>
                    1
                  </div>
                  <span className="ml-2 font-sans">Shipping</span>
                </div>
                <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-pistachio' : 'bg-wheat/30'}`}></div>
                <div className={`flex items-center ${step >= 2 ? 'text-pistachio' : 'text-wheat'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-pistachio bg-pistachio text-white' : 'border-wheat'}`}>
                    2
                  </div>
                  <span className="ml-2 font-sans">Payment</span>
                </div>
              </div>

              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-serif font-bold text-mocha mb-6 flex items-center">
                    <MapPin className="h-6 w-6 mr-2" />
                    Shipping Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-wheat mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-wheat mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-wheat mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-wheat mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-wheat mb-2">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-wheat mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-wheat mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-wheat mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-wheat mb-2">Country *</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleNextStep}
                      className="bg-pistachio text-espresso px-8 py-3 rounded-glass font-serif text-lg shadow-soft hover:bg-wheat hover:text-espresso transition"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment Information */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-serif font-bold text-mocha mb-6 flex items-center">
                    <CreditCard className="h-6 w-6 mr-2" />
                    Payment Information
                  </h2>

                  <div className="mb-6">
                    <label className="block text-wheat font-sans mb-2">Select Payment Method</label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-glass font-semibold border transition-all duration-200 ${paymentMethod === 'card' ? 'bg-cta-green text-primary-dark border-cta-green' : 'bg-white/80 text-mocha border-card-bg/40'}`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        Card
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-glass font-semibold border transition-all duration-200 ${paymentMethod === 'upi' ? 'bg-cta-green text-primary-dark border-cta-green' : 'bg-white/80 text-mocha border-card-bg/40'}`}
                        onClick={() => setPaymentMethod('upi')}
                      >
                        UPI
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-glass font-semibold border transition-all duration-200 ${paymentMethod === 'netbanking' ? 'bg-cta-green text-primary-dark border-cta-green' : 'bg-white/80 text-mocha border-card-bg/40'}`}
                        onClick={() => setPaymentMethod('netbanking')}
                      >
                        Netbanking
                      </button>
                    </div>
                  </div>

                  {/* UPI Option */}
                  {paymentMethod === 'upi' && (
                    <div className="mb-6">
                      <label className="block text-wheat font-sans mb-2">UPI VPA (e.g. name@bank)</label>
                      <input
                        type="text"
                        name="upiVpa"
                        value={upiVpa}
                        onChange={e => setUpiVpa(e.target.value)}
                        className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                        placeholder="yourname@bank"
                        required
                      />
                      {upiStatus === 'processing' && <p className="text-wheat mt-2">Processing UPI payment...</p>}
                      {upiStatus === 'success' && <p className="text-green-600 mt-2">UPI payment successful!</p>}
                    </div>
                  )}

                  {/* Netbanking Option */}
                  {paymentMethod === 'netbanking' && (
                    <div className="mb-6">
                      <label className="block text-wheat font-sans mb-2">Select Your Bank</label>
                      <select
                        value={netbankingBank}
                        onChange={e => setNetbankingBank(e.target.value)}
                        className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                        required
                      >
                        <option value="">-- Select Bank --</option>
                        {BANKS.map(bank => (
                          <option key={bank} value={bank}>{bank}</option>
                        ))}
                      </select>
                      {netbankingStatus === 'processing' && <p className="text-wheat mt-2">Redirecting to {netbankingBank}...</p>}
                      {netbankingStatus === 'success' && <p className="text-green-600 mt-2">Netbanking payment successful!</p>}
                    </div>
                  )}

                  {/* Card Option (default) */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-wheat mb-2">Card Number *</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-wheat mb-2">Cardholder Name *</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-wheat mb-2">Expiry Date *</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: formatExpiryDate(e.target.value) }))}
                            placeholder="MM/YY"
                            maxLength="5"
                            className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-wheat mb-2">CVV *</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength="4"
                            className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                            required
                          />
                        </div>
                      </div>

                      {/* Billing Address */}
                      <div className="mt-8">
                        <div className="flex items-center mb-4">
                          <input
                            type="checkbox"
                            name="billingSameAsShipping"
                            checked={formData.billingSameAsShipping}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <label className="text-wheat font-sans">Billing address same as shipping</label>
                        </div>

                        {!formData.billingSameAsShipping && (
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-wheat mb-2">Billing First Name *</label>
                              <input
                                type="text"
                                name="billingFirstName"
                                value={formData.billingFirstName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-wheat mb-2">Billing Last Name *</label>
                              <input
                                type="text"
                                name="billingLastName"
                                value={formData.billingLastName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                                required
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-wheat mb-2">Billing Address *</label>
                              <input
                                type="text"
                                name="billingAddress"
                                value={formData.billingAddress}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-wheat mb-2">Billing City *</label>
                              <input
                                type="text"
                                name="billingCity"
                                value={formData.billingCity}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-wheat mb-2">Billing State *</label>
                              <input
                                type="text"
                                name="billingState"
                                value={formData.billingState}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-wheat mb-2">Billing ZIP Code *</label>
                              <input
                                type="text"
                                name="billingZipCode"
                                value={formData.billingZipCode}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-wheat mb-2">Billing Country *</label>
                              <input
                                type="text"
                                name="billingCountry"
                                value={formData.billingCountry}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                                required
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={handlePreviousStep}
                      className="flex items-center text-wheat hover:text-pistachio transition"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Shipping
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className="bg-pistachio text-espresso px-8 py-3 rounded-glass font-serif text-lg shadow-soft hover:bg-wheat hover:text-espresso transition disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-bisque/60 p-8 rounded-glass sticky top-24 shadow-soft">
              <h2 className="text-2xl font-serif font-bold text-mocha mb-8">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/80 rounded-glass flex items-center justify-center">
                      <Package className="h-8 w-8 text-pistachio" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-semibold text-mocha">{item.product.name}</h3>
                      <p className="text-sm text-wheat">
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif font-semibold text-mocha">
                        {symbol}{(item.product.price * item.quantity * rate).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-wheat">Subtotal</span>
                  <span className="font-medium">{symbol}{(getCartTotal() * rate).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-wheat">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-wheat">Tax</span>
                  <span className="font-medium">{symbol}{((getCartTotal() * 0.08) * rate).toFixed(2)}</span>
                </div>
                <hr className="border-t border-wheat opacity-30 my-2" />
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-mocha">Total</span>
                  <span className="text-lg font-bold text-pistachio">
                    {symbol}{((getCartTotal() * 1.08) * rate).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="bg-white/40 p-4 rounded-glass">
                <div className="flex items-center gap-2 text-sm text-wheat mb-2">
                  <Shield className="h-4 w-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-wheat mb-2">
                  <Truck className="h-4 w-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-wheat">
                  <CheckCircle className="h-4 w-4" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment 