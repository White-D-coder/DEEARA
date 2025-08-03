import React from 'react'

const CookiePolicy = () => (
  <div className="min-h-screen bg-sugar py-16 px-4 flex items-center justify-center">
    <div className="max-w-3xl w-full bg-bisque/60 p-10 rounded-glass shadow-soft">
      <h1 className="text-4xl font-serif font-bold text-mocha mb-6">Cookie Policy</h1>
      <p className="text-wheat mb-4 font-sans">
        This Cookie Policy explains how we use cookies and similar technologies on our website. By using our site, you consent to our use of cookies in accordance with this policy.
      </p>
      <h2 className="text-2xl font-serif font-bold text-mocha mt-8 mb-2">What Are Cookies?</h2>
      <p className="text-wheat font-sans mb-4">
        Cookies are small text files stored on your device to help us improve your experience and analyze site usage.
      </p>
      <h2 className="text-2xl font-serif font-bold text-mocha mt-8 mb-2">How We Use Cookies</h2>
      <ul className="list-disc pl-6 text-wheat font-sans mb-4">
        <li>To remember your preferences and settings</li>
        <li>To analyze site traffic and usage</li>
        <li>For authentication and security purposes</li>
      </ul>
      <h2 className="text-2xl font-serif font-bold text-mocha mt-8 mb-2">Managing Cookies</h2>
      <p className="text-wheat font-sans mb-4">
        You can control and delete cookies through your browser settings. However, disabling cookies may affect your experience on our site.
      </p>
      <p className="text-wheat mt-8 font-sans">
        For more information, contact us at <a href="mailto:support@deeara.com" className="text-cta-green underline">support@deeara.com</a>.
      </p>
    </div>
  </div>
)

export default CookiePolicy 