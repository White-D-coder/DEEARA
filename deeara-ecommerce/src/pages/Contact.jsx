// import React from 'react'
// import { motion } from 'framer-motion'
// import { Mail, Instagram, Facebook } from 'lucide-react'

// const CONTACTS = [
//   {
//     label: 'Email',
//     href: 'mailto:deearafs@gmail.com',
//     icon: Mail,
//   },
//   {
//     label: 'Instagram',
//     href: 'https://www.instagram.com/deeara_fs/',
//     icon: Instagram,
//   },
//   {
//     label: 'Facebook',
//     href: 'https://facebook.com/deeara.official',
//     icon: Facebook,
//   },
// ]

// const Contact = () => {
//   return (
//     <div className="min-h-screen bg-soft-bg py-16 flex items-center justify-center">
//       <div className="max-w-2xl mx-auto px-4 bg-card-bg/60 p-12 rounded-glass shadow-soft text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           <h1 className="text-4xl font-bold mb-4 text-primary-dark" style={{ fontFamily: 'Optima, system-ui, serif' }}>
//             Contact Us
//           </h1>
//           <p className="text-lg text-card-bg mb-8">
//             We'd love to hear from you! Reach out to us via any of the channels below.
//           </p>
//           <div className="flex flex-col gap-8 items-center">
//             {CONTACTS.map(({ label, value, href, icon: Icon }) => (
//               <a
//                 key={label}
//                 href={href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-4 px-6 py-4 bg-white/80 rounded-xl shadow transition hover:bg-cta-green/20 hover:scale-105 text-primary-dark text-lg font-medium w-full max-w-md justify-center"
//               >
//                 <Icon className="h-7 w-7 text-cta-green" />
//                 <span className="font-bold">{label}:</span>
//                 <span className="truncate">{value}</span>
//               </a>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default Contact 

// test 2 ----

// import React from 'react'
// import { motion } from 'framer-motion'
// import { Mail, Instagram, Facebook } from 'lucide-react'

// // Font: Poiret One - For royalty and premium appeal
// // Add in your global CSS or head <link href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet">

// const CONTACTS = [
//   {
//     label: 'Email',
//     href: 'mailto:deearafs@gmail.com',
//     icon: Mail,
//   },
//   {
//     label: 'Instagram',
//     href: 'https://www.instagram.com/deeara_fs/',
//     icon: Instagram,
//   },
//   {
//     label: 'Facebook',
//     href: 'https://facebook.com/deeara.official',
//     icon: Facebook,
//   },
// ]

// const Contact = () => {
//   return (
//     <div className="min-h-screen bg-soft-bg flex items-center justify-center relative py-20">
//       {/* Decorative, soft blurred premium geometries */}
//       <div className="absolute inset-0 z-0 flex justify-between">
//         <div className="w-2/5 h-full bg-cta-green opacity-20 rounded-full blur-3xl" />
//         <div className="w-1/3 h-[65%] bg-[#d2c8b9] opacity-25 rounded-full blur-2xl mt-32 ml-32" />
//       </div>
//       {/* Main Content */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.9 }}
//         className="relative z-10 max-w-3xl w-full mx-auto px-10 py-14 bg-card-bg/60 rounded-3xl shadow-2xl border border-[#e0dbc8] border-opacity-80 backdrop-blur-xl flex flex-col items-center space-y-10"
//       >
//         <h1
//           className="text-5xl mb-2 text-primary-dark tracking-wider"
//           style={{ fontFamily: "'Poiret One', Optima, system-ui, serif", letterSpacing: '0.15em' }}
//         >
//           Contact Us
//         </h1>
//         <p className="mb-12 mt-2 text-xl text-cta-green/80 italic" style={{ maxWidth: '500px' }}>
//           We’d love to connect. Reach out via your preferred channel and experience our world of premium service.
//         </p>
//         <div className="w-full flex flex-row justify-center gap-12">
//           {CONTACTS.map(({ label, href, icon: Icon }) => (
//             <a
//               key={label}
//               href={href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group min-w-[220px] px-8 py-7 rounded-2xl bg-white/80 shadow-lg border border-[#c7bca1] flex flex-col items-center gap-4
//               hover:scale-105 hover:bg-gradient-to-tr hover:from-cta-green/20 hover:to-[#efe8d8]/40 transition
//               "
//               style={{
//                 boxShadow:
//                   '0 8px 40px 0 rgba(166, 148, 100, 0.18), 0 1.5px 6px 0 rgba(80, 65, 30, 0.08)',
//               }}
//             >
//               <Icon className="h-9 w-9 text-cta-green group-hover:text-primary-dark transition" />
//               <span
//                 className="uppercase tracking-widest font-bold text-lg text-primary-dark group-hover:text-cta-green"
//                 style={{ fontFamily: "'Poiret One', Optima, serif", letterSpacing: '0.19em' }}
//               >
//                 {label}
//               </span>
//             </a>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// export default Contact

// test 2 -----------

// import React from 'react'
// import { motion, useMotionValue, useTransform } from 'framer-motion'
// import { Mail, Instagram, Facebook } from 'lucide-react'

// // Add shadcn/ui card for stunning card animation
// // import { Card, CardContent } from '@/components/ui/card' // adjust the import to your structure

// // The 'Poiret One' font should be loaded in your global CSS or HTML head:
// // <link href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet">

// const CONTACTS = [
//   {
//     label: 'Email',
//     href: 'mailto:deearafs@gmail.com',
//     icon: Mail,
//   },
//   {
//     label: 'Instagram',
//     href: 'https://www.instagram.com/deeara_fs/',
//     icon: Instagram,
//   },
//   {
//     label: 'Facebook',
//     href: 'https://facebook.com/deeara.official',
//     icon: Facebook,
//   },
// ]

// // Background particles component (reactbits style)
// function FloatingParticles() {
//   return (
//     <div
//       className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
//       aria-hidden
//     >
//       {[...Array(14)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute rounded-full bg-gradient-to-tr from-[#e6dda5]/80 to-[#b5b188]/50 shadow-gold"
//           style={{
//             width: `${14 + Math.random() * 28}px`,
//             height: `${14 + Math.random() * 28}px`,
//             top: `${Math.random() * 95}%`,
//             left: `${Math.random() * 98}%`,
//             opacity: Math.random() * 0.18 + 0.12,
//             filter: 'blur(2.9px)',
//           }}
//           animate={{
//             y: [0, Math.random() * 55 - 25, 0],
//             x: [0, Math.random() * 40 - 20, 0],
//             transition: { duration: 10 + Math.random() * 10, repeat: Infinity, repeatType: 'mirror' }
//           }}
//         />
//       ))}
//       {/* Royal radial gradient glow */}
//       <div className="absolute inset-0 pointer-events-none"
//         style={{
//           background: 'radial-gradient(ellipse 90% 80% at 50% 10%, #d9ccab50 0%, #fcf6bc00 85%)',
//           zIndex: 1
//         }}
//       />
//     </div>
//   )
// }

// const cardVariants = {
//   hidden: { opacity: 0, y: 40, scale: 0.95 },
//   show: i => ({
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { delay: i * 0.21, duration: 0.75, type: 'spring', stiffness: 80 }
//   }),
// }

// const Contact = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-soft-bg relative">
//       <FloatingParticles />
//       <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#ede6d7]/70 via-[#f6f4ee]/30 to-[#ebe2cf]/90 backdrop-blur-xl" />
//       <motion.div
//         initial={{ opacity: 0, y: 60, scale: 0.98 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 1.1, type: 'spring', bounce: 0.22 }}
//         className="relative z-10 max-w-3xl w-full mx-auto px-4 sm:px-8 md:px-10 py-8 sm:py-12 md:py-14 rounded-[2.7rem] shadow-2xl border border-[#dad0b6] border-opacity-70 bg-card-bg/70 backdrop-blur-2xl flex flex-col items-center"
//       >
//         {/* ShadCN/Acertinity underlined heading with shimmer */}
//         <motion.h1
//           className="mb-3 text-3xl sm:text-4xl md:text-5xl text-primary-dark tracking-wider font-bold"
//           style={{
//             fontFamily: "'Poiret One', Optima, system-ui, serif",
//             letterSpacing: '0.15em',
//             position: 'relative',
//           }}
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.15, duration: 0.8 }}
//         >
//           Contact Us
//           <span className="block h-[3.5px] w-16 bg-gradient-to-r from-cta-green to-[#ead798] rounded-full mx-auto mt-2 shimmer" />
//         </motion.h1>

//         <motion.p
//           className="mb-8 sm:mb-12 mt-2 text-base sm:text-lg md:text-xl text-[#b6a875] italic font-medium"
//           style={{ maxWidth: 500 }}
//           initial={{ opacity: 0, x: -25 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3, duration: 0.7 }}
//         >
//           Connect with us for a premium service experience.
//         </motion.p>

//         <div className="w-full flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-10">
//           {CONTACTS.map(({ label, href, icon: Icon }, i) => (
//             <motion.div
//               custom={i}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true }}
//               variants={cardVariants}
//               key={label}
//               className="w-full sm:w-[250px]"
//             >
//               <div
//                 className="rounded-2xl bg-white/70 border border-[#daced1]/70 shadow-xl hover:shadow-gold/60 hover:scale-105 transition group w-full sm:w-[250px]"
//               >
//                 <div className="flex flex-col items-center gap-4 sm:gap-5 py-6 sm:py-10">
//                   <motion.span
//                     whileHover={{ scale: 1.15, rotate: [0, 10, -10, 0] }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Icon className="h-8 w-8 sm:h-11 sm:w-11 text-cta-green group-hover:text-primary-dark transition duration-300" />
//                   </motion.span>
//                   <span
//                     className="uppercase tracking-wide text-base sm:text-lg font-bold text-primary-dark transition group-hover:text-cta-green"
//                     style={{ fontFamily: "'Poiret One', Optima, serif", letterSpacing: '0.17em' }}
//                   >
//                     {label}
//                   </span>
//                   <a
//                     href={href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-[#a39168] underline decoration-cta-green/60 underline-offset-4 font-mono text-sm sm:text-base opacity-90 break-all text-center"
//                   >
//                     {label === 'Email' ? 'deearafs@gmail.com' : `@${href.split('/').pop()}`}
//                   </a>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Subtle shimmer animation for heading underline */}
//       <style>
//         {`
//           .shimmer {
//             animation: shimmer-move 2.5s infinite linear;
//             background: linear-gradient(90deg, #e2dab2 0%, #f9f1c5 50%, #d6c499 100%);
//             background-size: 160% 100%;
//           }
//           @keyframes shimmer-move {
//             from { background-position: 160% 0; }
//             to { background-position: -40% 0; }
//           }
//         `}
//       </style>
//     </div>
//   )
// }

// export default Contact

// test 3 --------

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, Facebook } from 'lucide-react'

const CONTACTS = [
  {
    label: 'Email',
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

function MinimalParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Just a few subtle blurred dots for depth */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-tr from-[#f6ecd3]/40 to-[#e9e0ca]/20"
          style={{
            width: `${36 + Math.random() * 32}px`,
            height: `${36 + Math.random() * 32}px`,
            top: `${10 + Math.random() * 60}%`,
            left: `${5 + Math.random() * 85}%`,
            opacity: 0.12 + Math.random() * 0.07,
            filter: 'blur(5px)',
          }}
          animate={{
            y: [0, Math.random() * 25 - 12, 0],
            transition: { duration: 10 + Math.random() * 8, repeat: Infinity, repeatType: 'mirror' }
          }}
        />
      ))}
    </div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: i => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.17, duration: 0.6, type: 'spring', stiffness: 75 }
  }),
}

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-[#f8f6ef] via-[#fffbe8] to-[#efe9d0]">
      <MinimalParticles />
      {/* THE CENTRAL CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, type: 'spring', bounce: 0.22 }}
        className="relative z-10 max-w-2xl w-full mx-auto px-4 sm:px-10 py-8 sm:py-14 rounded-3xl shadow-xl border border-[#ede4c1] bg-white/70 backdrop-blur-xl flex flex-col items-center"
      >
        <motion.h1
          className="mb-2 text-4xl sm:text-5xl text-[#9b8647] font-bold tracking-wider"
          style={{
            fontFamily: "'Poiret One', Optima, system-ui, serif",
            letterSpacing: '0.14em',
            textShadow: '0 2px 10px #e5dec3cc'
          }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.13, duration: 0.8 }}
        >
          Contact Us
        </motion.h1>

        <motion.p
          className="mb-10 mt-2 text-lg sm:text-xl text-[#b5a366] italic font-medium"
          style={{ maxWidth: 460 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          Experience our premium service. Reach out confidentially.
        </motion.p>

        <div className="w-full flex flex-col sm:flex-row gap-7 justify-center items-center">
          {CONTACTS.map(({ label, href, icon: Icon }, i) => (
            <motion.div
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={cardVariants}
              key={label}
              className="w-full sm:w-[220px]"
            >
              <div className="rounded-xl bg-white/60 border border-[#e2dab5]/50 shadow hover:shadow-lg transition hover:scale-105 group flex flex-col items-center px-7 py-7 min-h-[140px]">
                <motion.span
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="h-8 w-8 text-[#ae9c5c] opacity-90 group-hover:text-[#806533] transition" />
                </motion.span>
                <span className="mt-2 uppercase text-[#94825a] tracking-wide text-base font-semibold"
                  style={{ fontFamily: "'Poiret One', Optima, serif", letterSpacing: '0.15em' }}
                >
                  {label}
                </span>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-[#ab9860] underline underline-offset-2 decoration-[#e2cc7d]/60 font-mono text-sm break-all text-center"
                >
                  {label === 'Email' ? 'deearafs@gmail.com' : `@${href.split('/').pop()}`}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Contact
