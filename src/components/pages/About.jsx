import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  HiHeart,
  HiLightBulb,
  HiBadgeCheck,
  HiAcademicCap,
  HiBriefcase,
  HiCode,
  HiUsers,
  HiGlobe,
} from 'react-icons/hi'

// ----- Animation Variants -----
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

// 3D tilting card component
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
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function AboutMe() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 overflow-hidden">
      {/* ===== Section 1: Hero with animated gradient ===== */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="text-center mb-24 relative"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6"
        >
          About <span className="text-indigo-400">Me</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-xl text-gray-400 max-w-3xl mx-auto"
        >
          Career strategist, AI enthusiast, and your partner in professional
          growth.
        </motion.p>
      </motion.section>

      {/* ===== Section 2: My Story (Timeline) ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="mb-24"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          My Story
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp}>
            <div className="space-y-8 relative before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-indigo-400/30">
              {[
                {
                  year: '2014',
                  title: 'HR Career Begins',
                  desc: 'Started in talent acquisition for a Fortune 500 company.',
                },
                {
                  year: '2018',
                  title: 'Career Coaching',
                  desc: 'Became a certified career coach, helping hundreds of professionals.',
                },
                {
                  year: '2022',
                  title: 'Founded CareerBoost',
                  desc: 'Combined AI and empathy to build a platform that changes lives.',
                },
                {
                  year: '2025',
                  title: 'Global Impact',
                  desc: 'Over 10k users across 50+ countries trust CareerBoost.',
                },
              ].map((event, i) => (
                <div key={i} className="flex items-start gap-6 pl-8">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full mt-1.5 shadow-lg shadow-indigo-400/50" />
                  </div>
                  <div>
                    <span className="text-indigo-400 font-semibold text-sm">
                      {event.year}
                    </span>
                    <h3 className="text-white font-bold text-lg">
                      {event.title}
                    </h3>
                    <p className="text-gray-400">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="bg-gray-800 h-80 rounded-2xl flex items-center justify-center border border-gray-700 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20" />
            <span className="text-gray-400 relative z-10">
              [Your Photo / Illustration]
            </span>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== Section 3: Skills & Expertise (3D tilting cards) ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-24"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Core Skills
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: HiUsers, label: 'Career Coaching', value: 95 },
            { icon: HiLightBulb, label: 'AI & Automation', value: 88 },
            { icon: HiBadgeCheck, label: 'Resume Strategy', value: 92 },
            { icon: HiAcademicCap, label: 'Interview Training', value: 90 },
            { icon: HiBriefcase, label: 'Job Market Analytics', value: 85 },
            { icon: HiCode, label: 'Web Development', value: 78 },
          ].map((skill, i) => (
            <TiltCard key={i}>
              <motion.div
                variants={scaleIn}
                className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-indigo-500/50 transition-colors h-full"
              >
                <skill.icon className="w-10 h-10 text-indigo-400 mb-4" />
                <h3 className="text-white font-semibold text-lg mb-3">
                  {skill.label}
                </h3>
                <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 * i }}
                  />
                </div>
                <span className="text-indigo-400 text-sm font-medium">
                  {skill.value}%
                </span>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </motion.section>

      {/* ===== Section 4: Work Experience ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-24 bg-gray-900/50 p-8 md:p-12 rounded-2xl border border-gray-800"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Work Experience
        </motion.h2>
        <div className="space-y-8">
          {[
            {
              role: 'Senior HR Specialist',
              company: 'TechGlobal Inc.',
              period: '2019 - 2022',
              desc: 'Led talent acquisition for a 500+ employee tech firm, reducing time‑to‑hire by 30%.',
            },
            {
              role: 'Career Coach',
              company: 'Self‑Employed',
              period: '2017 - 2019',
              desc: 'Coached 200+ clients on resume building, interview prep, and career transitions.',
            },
            {
              role: 'Junior Recruiter',
              company: 'StartupHub',
              period: '2014 - 2017',
              desc: 'Screened and matched candidates for early‑stage startups, gaining a deep understanding of hiring needs.',
            },
          ].map((job, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors border border-gray-700"
            >
              <div>
                <h3 className="text-white font-bold text-xl">{job.role}</h3>
                <p className="text-indigo-400 font-medium">{job.company}</p>
                <p className="text-gray-400 text-sm mt-2">{job.desc}</p>
              </div>
              <span className="text-gray-500 text-sm mt-3 md:mt-0">
                {job.period}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== Section 5: Testimonials ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-24"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          What People Say
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote:
                'Working with [Your Name] transformed my career. I landed my dream job in just two months!',
              author: 'Sarah L., Product Manager',
            },
            {
              quote:
                'The resume makeover was incredible. I started getting callbacks immediately.',
              author: 'James K., Software Engineer',
            },
            {
              quote:
                'Her AI‑powered approach gave me insights I never would have found on my own.',
              author: 'Priya M., Data Scientist',
            },
            {
              quote:
                'Best career investment I’ve ever made. The mock interviews were a game‑changer.',
              author: 'Carlos R., Marketing Lead',
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="bg-gray-900 p-8 rounded-2xl border border-gray-800 relative"
            >
              <HiHeart className="text-indigo-400 w-8 h-8 mb-4" />
              <p className="text-gray-300 italic mb-6">“{t.quote}”</p>
              <div className="border-t border-gray-700 pt-4">
                <p className="text-white font-semibold">{t.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== Section 6: Personal Interests ===== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-24"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Beyond Work
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: '🌍', label: 'Travel' },
            { emoji: '📚', label: 'Reading' },
            { emoji: '🧘', label: 'Yoga' },
            { emoji: '🎨', label: 'Digital Art' },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700 hover:border-indigo-400/50 transition-colors cursor-default"
            >
              <span className="text-4xl block mb-2">{item.emoji}</span>
              <span className="text-gray-300 font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== Section 7: CTA ===== */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 blur-3xl -z-10" />
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Let’s Build Your Future
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Ready to take the next step in your career? I’d love to help.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-lg shadow-xl shadow-indigo-500/25 transition-all hover:scale-105"
        >
          Get in Touch <HiGlobe className="w-5 h-5" />
        </Link>
      </motion.section>
    </div>
  )
}