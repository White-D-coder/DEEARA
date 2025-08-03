import React from 'react'

const TermsOfService = () => (
  <div className="min-h-screen bg-sugar py-16 px-4 flex items-center justify-center">
    <div className="max-w-3xl w-full bg-bisque/60 p-10 rounded-glass shadow-soft">
      <h1 className="text-4xl font-serif font-bold text-mocha mb-6">Terms of Service</h1>
      <p className="text-wheat mb-4 font-sans">
        By using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
      </p>
      <h2 className="text-2xl font-serif font-bold text-mocha mt-8 mb-2">Use of Site</h2>
      <ul className="list-disc pl-6 text-wheat font-sans mb-4">
        <li>You must be at least 18 years old or have parental consent to use this site.</li>
        <li>Do not misuse our services or attempt to disrupt our website.</li>
        <li>All content is for personal, non-commercial use unless otherwise stated.</li>
      </ul>
      <h2 className="text-2xl font-serif font-bold text-mocha mt-8 mb-2">Orders & Payments</h2>
      <ul className="list-disc pl-6 text-wheat font-sans mb-4">
        <li>All orders are subject to acceptance and availability.</li>
        <li>We reserve the right to refuse or cancel any order.</li>
        <li>Prices and availability are subject to change without notice.</li>
      </ul>
      <h2 className="text-2xl font-serif font-bold text-mocha mt-8 mb-2">Limitation of Liability</h2>
      <p className="text-wheat font-sans mb-4">
        We are not liable for any indirect, incidental, or consequential damages arising from your use of the site.
      </p>
      <p className="text-wheat mt-8 font-sans">
        For questions, contact us at <a href="mailto:support@deeara.com" className="text-cta-green underline">support@deeara.com</a>.
      </p>
    </div>
  </div>
)

export default TermsOfService 