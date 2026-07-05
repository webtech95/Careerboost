import { useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiGlobe,
  HiCheckCircle,
  HiChevronDown,
} from 'react-icons/hi'
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa'

// ---------- Animation Variants ----------
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

// 3D tilting card component (fixed with useAnimation)
const TiltCard = ({ children, className }) => {
  const controls = useAnimation()
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = (y / rect.height) * -20
    const rotateY = (x / rect.width) * 20
    controls.start({
      rotateX,
      rotateY,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    })
  }

  const handleMouseLeave = () => {
    controls.start({
      rotateX: 0,
      rotateY: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    })
  }

  return (
    <motion.div
      ref={ref}
      animate={controls}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '600px' }}
      className={className}
    >
      <motion.div style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </motion.div>
  )
}

// Floating shapes background
const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <motion.div
      animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      className="absolute top-10 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"
    />
    <motion.div
      animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"
    />
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ repeat: Infinity, duration: 4 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl"
    />
  </div>
)

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', message: '' })
    }, 3000)
  }

  const faqs = [
    { q: 'How quickly can I expect a response?', a: 'We reply within 24 hours on business days.' },
    { q: 'Do you offer free consultations?', a: 'Yes, a 30‑minute discovery call is completely free.' },
    { q: 'Can I get a custom career plan?', a: 'Absolutely! Our services are tailored to your goals.' },
    { q: 'Is my information kept private?', a: 'We never share your data without consent.' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 relative">
      <FloatingShapes />

      {/* ===== Section 1: Hero ===== */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="text-center mb-24"
      >
        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold text-white mb-6">
          Get in <span className="text-indigo-400">Touch</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-xl text-gray-400 max-w-3xl mx-auto">
          Have a project, question, or just want to say hello? I'd love to hear from you.
        </motion.p>
      </motion.section>

      {/* ===== Section 2: Contact Cards (3D Tilt) ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-24 grid sm:grid-cols-3 gap-6"
      >
        {[
          {
            icon: HiMail,
            title: 'Email',
            info: 'hello@careerboost.com',
            action: 'mailto:hello@careerboost.com',
          },
          {
            icon: HiPhone,
            title: 'Phone',
            info: '+1 (555) 123‑4567',
            action: 'tel:+15551234567',
          },
          {
            icon: HiLocationMarker,
            title: 'Location',
            info: 'San Francisco, CA',
            action: '#',
          },
        ].map((item, i) => (
          <TiltCard key={i}>
            <motion.a
              href={item.action}
              variants={scaleIn}
              className="block bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-indigo-500/50 transition-colors text-center group"
            >
              <item.icon className="w-10 h-10 text-indigo-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.info}</p>
            </motion.a>
          </TiltCard>
        ))}
      </motion.section>

      {/* ===== Section 3: Form & Map Side by Side ===== */}
      <div className="grid lg:grid-cols-2 gap-12 mb-24">
        {/* Animated Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Send a Message</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-8 rounded-2xl border border-gray-800 space-y-6 relative overflow-hidden"
          >
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-gray-900/95 flex flex-col items-center justify-center z-10 rounded-2xl"
              >
                <HiCheckCircle className="w-16 h-16 text-green-400 mb-4" />
                <p className="text-2xl font-bold text-white">Message Sent!</p>
                <p className="text-gray-400 mt-2">We'll get back to you soon.</p>
              </motion.div>
            )}

            <div>
              <label className="text-sm text-gray-300 mb-1 block">Name</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text" required
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 text-white transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Email</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email" required
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 text-white transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Message</label>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                rows="5" required
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 text-white transition-colors"
                placeholder="How can I help you?"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition shadow-lg shadow-indigo-500/25"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Office Map / Globe */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Our Office</h2>
          <div className="flex-1 bg-gray-800 rounded-2xl border border-gray-700 flex items-center justify-center relative overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="absolute"
            >
              <HiGlobe className="w-24 h-24 text-indigo-400/30" />
            </motion.div>
            <div className="text-center relative z-10 p-8">
              <p className="text-2xl font-bold text-white mb-2">San Francisco</p>
              <p className="text-gray-400">
                123 Career Lane, Suite 100<br />
                San Francisco, CA 94105
              </p>
              <p className="text-indigo-400 mt-4 font-medium">Mon‑Fri 9am‑6pm PST</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===== Section 4: Social Media Links ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-24 text-center"
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white mb-8">
          Follow Us
        </motion.h2>
        <div className="flex justify-center gap-6 flex-wrap">
          {[
            { icon: FaTwitter, label: 'Twitter', color: 'hover:text-blue-400' },
            { icon: FaLinkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
            { icon: FaInstagram, label: 'Instagram', color: 'hover:text-pink-400' },
            { icon: FaGithub, label: 'GitHub', color: 'hover:text-gray-300' },
          ].map((social, i) => (
            <motion.a
              key={i}
              variants={scaleIn}
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="#"
              className={`text-gray-400 ${social.color} transition-colors text-4xl`}
              aria-label={social.label}
            >
              <social.icon />
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* ===== Section 5: FAQ (Animated Accordion) ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-24 max-w-3xl mx-auto"
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white mb-10 text-center">
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.details
              key={i}
              variants={fadeUp}
              className="group bg-gray-900 rounded-xl border border-gray-800 overflow-hidden"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none text-white font-medium">
                {faq.q}
                <HiChevronDown className="w-5 h-5 transition-transform group-open:rotate-180 text-indigo-400" />
              </summary>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-5 pb-5 text-gray-400"
              >
                {faq.a}
              </motion.div>
            </motion.details>
          ))}
        </div>
      </motion.section>

      {/* ===== Section 6: Newsletter CTA ===== */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center bg-gradient-to-r from-indigo-900/30 to-gray-900 p-10 rounded-3xl border border-indigo-500/20"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay in the Loop
        </h2>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
          Join our newsletter for career tips, exclusive resources, and updates.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 text-white"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition shadow-lg"
          >
            Subscribe
          </motion.button>
        </form>
      </motion.section>
    </div>
  )
}