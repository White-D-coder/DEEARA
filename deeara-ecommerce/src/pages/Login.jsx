import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Crown } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  })
  const [loading, setLoading] = useState(false)
  const { signIn, signUp, signInWithGoogle, sendPasswordResetEmail, signInWithOtp } = useAuth()
  const navigate = useNavigate()

  // Forgot password/OTP state
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotMsg, setForgotMsg] = useState('')
  const [otp, setOtp] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpMsg, setOtpMsg] = useState('')

  useEffect(() => {
    // If user lands on /reset-password with access_token in URL, redirect to ResetPassword page
    if (window.location.pathname === '/reset-password') {
      // Optionally, you can handle this in your router
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isSignUp) {
        const { error } = await signUp(formData.email, formData.password, formData.fullName)
        if (error) throw error
        toast.success('Account created successfully! Please check your email to verify.')
      } else {
        const { error } = await signIn(formData.email, formData.password)
        if (error) throw error
        toast.success('Welcome back!')
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signInWithGoogle()
      if (error) throw error
    } catch (error) {
      toast.error(error.message || 'Google sign-in failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-bg">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-lg w-full mx-auto p-12 rounded-glass shadow-soft space-y-10 bg-card-bg/60"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto h-20 w-20 bg-cta-green text-primary-dark rounded-full flex items-center justify-center mb-8 shadow-soft"
          >
            <Crown className="h-10 w-10" />
          </motion.div>
          <h2 className="text-4xl font-serif font-bold text-primary-dark mb-2">
            {isSignUp ? 'Join the Royalty' : 'Welcome Back'}
          </h2>
          <p className="mt-2 text-card-bg font-sans text-lg">
            {isSignUp ? 'Create your exclusive account' : 'Sign in to your account'}
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            {isSignUp && (
              <div>
                <label htmlFor="fullName" className="block text-base font-medium text-card-bg mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required={isSignUp}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 border border-card-bg/40 rounded-glass bg-soft-bg text-primary-dark placeholder-card-bg focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-base font-medium text-card-bg mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 h-5 w-5 text-cta-green" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-card-bg/40 rounded-glass bg-soft-bg text-primary-dark placeholder-card-bg focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-base font-medium text-card-bg mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-cta-green" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 border border-card-bg/40 rounded-glass bg-soft-bg text-primary-dark placeholder-card-bg focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-card-bg hover:text-cta-green"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {/* Forgot password link */}
              {!isSignUp && (
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    className="text-sm text-cta-green hover:underline font-semibold"
                    onClick={() => setShowForgot(true)}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-cta-green text-primary-dark py-4 text-lg font-semibold rounded-glass shadow-soft hover:bg-card-bg hover:text-cta-green transition font-serif"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </motion.button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <hr className="w-full border-t border-card-bg opacity-30" />
            </div>
            <div className="relative flex justify-center text-base">
              <span className="px-4 bg-card-bg/60 text-card-bg rounded-xl">
                Or continue with
              </span>
            </div>
          </div>
          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center px-4 py-4 border-2 border-cta-green text-cta-green rounded-glass text-lg font-semibold hover:bg-cta-green hover:text-primary-dark transition font-serif"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </motion.button>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-card-bg hover:text-cta-green transition-colors font-semibold mt-4"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default Login 