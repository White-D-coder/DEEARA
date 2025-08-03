import React from 'react'

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-sugar py-16 px-4 flex items-center justify-center">
    <div className="max-w-3xl w-full bg-bisque/60 p-10 rounded-glass shadow-soft">
      <h1 className="text-4xl font-serif font-bold text-mocha mb-6">Privacy Policy</h1>
      <p className="text-wheat mb-4 font-sans">
        This Privacy Policy explains how we collect, use, and protect your personal information when you use our website. We are committed to safeguarding your privacy and ensuring your data is secure.
      </p>
      <h2 className="text-2xl font-serif font-bold text-mocha mt-8 mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 text-wheat font-sans mb-4">
        <li>Personal identification information (Name, email address, phone number, etc.)</li>
        <li>Order and payment information</li>
        <li>Usage data and cookies</li>
      </ul>
      <h2 className="text-2xl font-serif font-bold text-mocha mt-8 mb-2">How We Use Your Information</h2>
      <ul className="list-disc pl-6 text-wheat font-sans mb-4">
        <li>To process orders and manage your account</li>
        <li>To improve our products and services</li>
        <li>To communicate with you about your orders and updates</li>
        <li>For marketing and analytics (with your consent)</li>
      </ul>
      <h2 className="text-2xl font-serif font-bold text-mocha mt-8 mb-2">Your Rights</h2>
      <ul className="list-disc pl-6 text-wheat font-sans mb-4">
        <li>Access, update, or delete your personal information</li>
        <li>Opt out of marketing communications</li>
        <li>Request data portability</li>
      </ul>
      <p className="text-wheat mt-8 font-sans">
        For more details or to exercise your rights, please contact us at <a href="mailto:support@deeara.com" className="text-cta-green underline">support@deeara.com</a>.
      </p>
    </div>
  </div>
)

export default PrivacyPolicy 