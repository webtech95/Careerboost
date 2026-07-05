import { useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  HiLightningBolt,
  HiDocumentText,
  HiUserGroup,
  HiChartBar,
  HiShieldCheck,
  HiStar,
  HiArrowRight,
  HiCheckCircle,
  HiClock,
} from 'react-icons/hi'

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

// 3D tilting card component (reused)
const TiltCard = ({ children, className }) => {
  const controls = useAnimation()
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = (y / rect.height) * -15
    const rotateY = (x / rect.width) * 15
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

// Floating background shapes
const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <motion.div
      animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
      transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
      className="absolute top-20 left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl"
    />
    <motion.div
      animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
      className="absolute bottom-10 right-10 w-56 h-56 bg-purple-500/10 rounded-full blur-2xl"
    />
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ repeat: Infinity, duration: 5 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl"
    />
  </div>
)

export default function Services() {
  const services = [
    {
      icon: HiDocumentText,
      title: 'Resume Makeover',
      desc: 'ATS‑optimized resumes that get you noticed. We rewrite, redesign, and target your resume for specific roles.',
      features: ['Keyword optimization', 'Professional formatting', '2 revisions included'],
    },
    {
      icon: HiUserGroup,
      title: 'Mock Interviews',
      desc: 'Practice with real‑world scenarios and get actionable feedback from industry experts.',
      features: ['Behavioral & technical rounds', 'Recorded sessions', 'Detailed scorecard'],
    },
    {
      icon: HiLightningBolt,
      title: 'Career Coaching',
      desc: 'One‑on‑one strategy sessions to define your path, overcome obstacles, and accelerate your growth.',
      features: ['Goal setting & action plan', 'Personal brand building', 'Salary negotiation tips'],
    },
    {
      icon: HiChartBar,
      title: 'Skill Analytics',
      desc: 'AI‑powered gap analysis that identifies exactly what you need to learn to land your dream job.',
      features: ['Personalized learning paths', 'Market demand insights', 'Progress tracking'],
    },
  ]

  const packages = [
    {
      name: 'Starter',
      price: '$49',
      desc: 'Perfect for quick wins',
      perks: ['Resume review', '1 mock interview', 'Email support'],
    },
    {
      name: 'Professional',
      price: '$149',
      desc: 'Most popular choice',
      perks: ['Full resume rewrite', '3 mock interviews', 'Career coaching session', 'Skill assessment'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$299',
      desc: 'Complete career transformation',
      perks: ['Everything in Professional', 'LinkedIn optimization', 'Personal branding kit', '6 months of follow‑up'],
    },
  ]

  const testimonials = [
    { text: 'My resume went from zero callbacks to 5 interview invites in two weeks!', author: 'Michael R.' },
    { text: 'The mock interviews were incredibly realistic. I felt so prepared for the real thing.', author: 'Emily S.' },
    { text: 'Skill Analytics showed me exactly what to learn. I landed a job with a 40% salary increase.', author: 'David K.' },
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
          Services <span className="text-indigo-400">That Deliver</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-xl text-gray-400 max-w-3xl mx-auto">
          Tailored career solutions to accelerate your professional growth. Every service is designed to get you results.
        </motion.p>
      </motion.section>

      {/* ===== Section 2: Core Services (3D tilt cards) ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-24"
      >
        <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white mb-12 text-center">
          Core Services
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <TiltCard key={i}>
              <motion.div
                variants={scaleIn}
                className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-indigo-500/50 transition-colors h-full"
              >
                <s.icon className="w-12 h-12 text-indigo-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">{s.title}</h3>
                <p className="text-gray-400 mb-6">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                      <HiCheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </motion.section>

      {/* ===== Section 3: Process ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-24 bg-gray-900/50 p-10 rounded-2xl border border-gray-800"
      >
        <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white mb-12 text-center">
          How We Work
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-400 to-indigo-500/0" />
          {[
            { step: '01', title: 'Discovery', desc: 'We learn about your goals, strengths, and target roles.' },
            { step: '02', title: 'Custom Plan', desc: 'A personalized action plan is built around your needs.' },
            { step: '03', title: 'Execute & Win', desc: 'You implement with our guidance until you land the offer.' },
          ].map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center relative"
            >
              <motion.div
                className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/25 relative z-10"
                whileHover={{ scale: 1.1 }}
              >
                {p.step}
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-gray-400">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== Section 4: Packages / Pricing ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-24"
      >
        <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white mb-12 text-center">
          Choose Your Plan
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              className={`relative bg-gray-900 p-8 rounded-2xl border ${
                pkg.popular ? 'border-indigo-500 shadow-xl shadow-indigo-500/10' : 'border-gray-800'
              } flex flex-col`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{pkg.desc}</p>
              <div className="text-4xl font-extrabold text-indigo-400 mb-6">
                {pkg.price}
                <span className="text-lg font-normal text-gray-400"> /package</span>
              </div>
              <ul className="space-y-3 flex-grow">
                {pkg.perks.map((perk, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300">
                    <HiCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" /> {perk}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={`mt-8 w-full py-3 text-center rounded-lg font-semibold transition ${
                  pkg.popular
                    ? 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/25'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== Section 5: Guarantee ===== */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-24 bg-gray-900/50 p-10 rounded-2xl border border-gray-800 flex flex-col md:flex-row items-center gap-8"
      >
        <HiShieldCheck className="w-20 h-20 text-indigo-400 flex-shrink-0" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">100% Satisfaction Guarantee</h2>
          <p className="text-gray-400">
            If you’re not satisfied with any service, we’ll revise it until you are—or your money back.
            No questions asked.
          </p>
        </div>
      </motion.section>

      {/* ===== Section 6: Testimonials ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-24"
      >
        <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white mb-12 text-center">
          Client Success Stories
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="bg-gray-900 p-8 rounded-2xl border border-gray-800"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, j) => (
                  <HiStar key={j} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-6">“{t.text}”</p>
              <p className="text-white font-semibold">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== Section 7: CTA ===== */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center bg-gradient-to-r from-indigo-900/30 to-gray-900 p-10 rounded-3xl border border-indigo-500/20"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Invest in Your Future?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Join hundreds of professionals who transformed their careers with our
          services.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-lg shadow-xl shadow-indigo-500/25 transition-all hover:scale-105"
        >
          Book a Free Call <HiArrowRight className="w-5 h-5" />
        </Link>
      </motion.section>
    </div>
  )
}