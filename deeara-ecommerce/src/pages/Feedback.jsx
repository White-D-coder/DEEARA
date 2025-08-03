import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { submitFeedback } from '../lib/database'

const Feedback = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', rating: 5 })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    const { name, email, message, rating } = form
    const res = await submitFeedback(name, email, message, Number(rating))
    if (res) {
      setMsg('Thank you for your feedback!')
      setForm({ name: '', email: '', message: '', rating: 5 })
    } else {
      setMsg('Failed to submit feedback. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-sugar py-16 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 bg-bisque/60 p-12 rounded-glass shadow-soft text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-serif font-bold text-mocha mb-4">
            Feedback
          </h1>
          <p className="text-xl text-wheat font-sans mb-8">
            We value your thoughts! Please share your experience below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="flex-1 px-4 py-3 rounded-xl border border-mocha/20 bg-white/80 text-mocha placeholder:text-mocha/40 focus:ring-2 focus:ring-mocha focus:outline-none"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="flex-1 px-4 py-3 rounded-xl border border-mocha/20 bg-white/80 text-mocha placeholder:text-mocha/40 focus:ring-2 focus:ring-mocha focus:outline-none"
                placeholder="Your Email"
                required
              />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-mocha/20 bg-white/80 text-mocha placeholder:text-mocha/40 focus:ring-2 focus:ring-mocha focus:outline-none"
              placeholder="Your Feedback"
              rows={4}
              required
            />
            <div className="flex items-center justify-center gap-4">
              <span className="text-mocha font-medium">Rating:</span>
              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="rounded-xl border border-mocha/20 bg-white/80 text-mocha px-3 py-2 focus:ring-2 focus:ring-mocha focus:outline-none"
              >
                {[5,4,3,2,1].map((r) => (
                  <option key={r} value={r}>{r} {r === 1 ? 'Star' : 'Stars'}</option>
                ))}
              </select>
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-mocha text-white py-3 rounded-xl font-semibold shadow-soft hover:bg-wheat hover:text-mocha transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </motion.button>
          </form>
          {msg && <div className="mt-6 text-lg font-semibold text-mocha">{msg}</div>}
        </motion.div>
      </div>
    </div>
  )
}

export default Feedback 