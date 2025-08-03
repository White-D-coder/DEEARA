import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const ReturnsExchanges = () => {
  const { user } = useAuth()
  const [orderId, setOrderId] = useState('')
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (!user) {
      setMessage('You must be logged in to submit a return request.')
      return
    }
    if (!orderId.trim() || !reason.trim()) {
      setMessage('Please provide your Order ID and a reason for return.')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.from('returns').insert({
        user_id: user.id,
        order_id: orderId.trim(),
        reason: reason.trim(),
        status: 'pending',
      })
      if (error) throw error
      setMessage('Your return request has been submitted successfully!')
      setOrderId('')
      setReason('')
    } catch (err) {
      setMessage('Failed to submit return request. Please check your Order ID or try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-sugar py-16 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-bisque/60 p-10 rounded-glass shadow-soft">
        <h1 className="text-4xl font-serif font-bold text-mocha mb-6">Returns & Exchanges</h1>
        <p className="text-wheat mb-6 font-sans">
          If you are not satisfied with your purchase, you can request a return or exchange within 14 days of delivery. Please enter your Order ID and reason for return below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-wheat font-sans mb-2">Order ID</label>
            <input
              type="text"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
              placeholder="Enter your Order ID"
              required
            />
          </div>
          <div>
            <label className="block text-wheat font-sans mb-2">Reason for Return</label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-white/80 text-primary-dark focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
              placeholder="Describe the reason for your return or exchange"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cta-green text-primary-dark font-semibold px-6 py-3 rounded-glass shadow-soft hover:bg-card-bg hover:text-cta-green transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? 'Submitting...' : 'Submit Return Request'}
          </button>
        </form>
        {message && (
          <div className={`mt-6 text-center font-sans ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>
        )}
      </div>
    </div>
  )
}

export default ReturnsExchanges 