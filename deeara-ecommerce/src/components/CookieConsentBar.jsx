import React, { useState, useEffect } from 'react'

const CookieConsentBar = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) setVisible(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center">
      <div className="max-w-2xl w-full bg-bisque/90 border border-card-bg/40 rounded-t-glass shadow-soft px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 m-2">
        <span className="text-wheat font-sans text-sm">
          We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. By continuing, you agree to our <a href="/cookie-policy" className="text-cta-green underline">Cookie Policy</a>.
        </span>
        <button
          onClick={handleAccept}
          className="bg-cta-green text-primary-dark font-semibold px-6 py-2 rounded-glass shadow-soft hover:bg-card-bg hover:text-cta-green transition-all duration-300"
        >
          Accept
        </button>
      </div>
    </div>
  )
}

export default CookieConsentBar 