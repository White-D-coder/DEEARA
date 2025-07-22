import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, Facebook } from 'lucide-react'

const CONTACTS = [
  {
    label: 'Email',
    value: 'contact deeara',
    href: 'mailto:deearafs@gmail.com',
    icon: Mail,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/deeara_fs/',
    icon: Instagram,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/deeara.official',
    icon: Facebook,
  },
]

const Contact = () => {
  return (
    <div className="min-h-screen bg-soft-bg py-16 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 bg-card-bg/60 p-12 rounded-glass shadow-soft text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-primary-dark" style={{ fontFamily: 'Optima, system-ui, serif' }}>
            Contact Us
          </h1>
          <p className="text-lg text-card-bg mb-8">
            We'd love to hear from you! Reach out to us via any of the channels below.
          </p>
          <div className="flex flex-col gap-8 items-center">
            {CONTACTS.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-6 py-4 bg-white/80 rounded-xl shadow transition hover:bg-cta-green/20 hover:scale-105 text-primary-dark text-lg font-medium w-full max-w-md justify-center"
              >
                <Icon className="h-7 w-7 text-cta-green" />
                <span className="font-bold">{label}:</span>
                <span className="truncate">{value}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact 