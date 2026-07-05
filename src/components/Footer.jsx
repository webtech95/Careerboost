import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa'
import { HiArrowUp } from 'react-icons/hi'

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const socialLinks = [
  { icon: FaTwitter, label: 'Twitter', href: '#' },
  { icon: FaLinkedin, label: 'LinkedIn', href: '#' },
  { icon: FaInstagram, label: 'Instagram', href: '#' },
  { icon: FaGithub, label: 'GitHub', href: '#' },
]

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Me', path: '/about-me' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
  { name: 'Resources', path: '/resources' },
]

const accountLinks = [
  { name: 'Login', path: '/login' },
  { name: 'Sign Up', path: '/signup' },
  { name: 'Profile', path: '/profile' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gray-900 border-t border-gray-800 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <motion.div variants={fadeUpItem}>
            <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold text-indigo-400 mb-4 group">
              <motion.svg
                whileHover={{ rotate: 10 }}
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
              >
                <rect width="32" height="32" rx="8" fill="#4F46E5" />
                <path d="M8 22L16 10L24 22H8Z" fill="white" />
              </motion.svg>
              CareerBoost
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Empowering your career journey with AI‑driven guidance and opportunities.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.2, rotate: 5 }}
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-xl"
                  aria-label={social.label}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={fadeUpItem}>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm relative group inline-block"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Account Column */}
          <motion.div variants={fadeUpItem}>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Account
            </h4>
            <ul className="space-y-2.5">
              {accountLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm relative group inline-block"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-indigo-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div variants={fadeUpItem}>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Stay Inspired
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Get weekly career tips and resources straight to your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 px-3 py-2.5 bg-gray-800 rounded-lg text-sm border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-500 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-semibold transition shadow-lg shadow-indigo-500/20 whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} CareerBoost. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-indigo-400 transition-colors"
              aria-label="Scroll to top"
            >
              Back to top <HiArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}