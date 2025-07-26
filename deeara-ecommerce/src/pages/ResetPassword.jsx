import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const ResetPassword = () => {
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Get the access token and refresh token from the URL
    if (typeof window !== 'undefined') {
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      setAccessToken(hashParams.get('access_token') || '')
      setRefreshToken(hashParams.get('refresh_token') || '')
    }
  }, [])

  useEffect(() => {
    // Authenticate the user using the access token and refresh token
    const getSessionWithTokens = async () => {
      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        if (error) {
          setMsg(`Error signing in: ${error.message}`)
        }
      }
    }
    if (accessToken && refreshToken) {
      getSessionWithTokens()
    }
  }, [accessToken, refreshToken])

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })
      if (error) {
        setMsg(`Error updating password: ${error.message}`)
      } else {
        setMsg('Password has been updated successfully! Redirecting to login...')
        setTimeout(() => navigate('/login'), 2000)
      }
    } catch (error) {
      setMsg(`Error updating password: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-bg">
      <div className="max-w-md w-full mx-auto p-8 rounded-xl shadow-lg bg-white/90">
        <h2 className="text-2xl font-bold mb-4 text-primary-dark">Reset Your Password</h2>
        <div className="mb-4 text-xs text-gray-500">
          <div><b>Debug info:</b></div>
          <div>access_token: <span className="break-all">{accessToken || <i>none</i>}</span></div>
          <div>refresh_token: <span className="break-all">{refreshToken || <i>none</i>}</span></div>
        </div>
        <form onSubmit={handlePasswordUpdate} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-base font-medium text-card-bg mb-2">
              New Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-card-bg/40 rounded-xl bg-soft-bg text-primary-dark placeholder-card-bg focus:outline-none focus:ring-2 focus:ring-cta-green focus:border-cta-green font-sans"
              placeholder="Enter your new password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cta-green text-primary-dark py-3 rounded-xl font-semibold hover:bg-card-bg hover:text-cta-green transition"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
        {msg && <div className="mt-4 text-center text-cta-green font-medium">{msg}</div>}
      </div>
    </div>
  )
}

export default ResetPassword 