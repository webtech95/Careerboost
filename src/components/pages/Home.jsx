import { useRef, useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Link } from 'react-router-dom'
import ThreeDCube from '../../components/ThreeDCube.jsx'
import {
    HiLightningBolt,
    HiGlobe,
    HiChartBar,
    HiUserGroup,
    HiStar,
    HiArrowRight,
    HiCheckCircle,
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

// Animated counter for stats
const AnimatedCounter = ({ value, label, suffix = '' }) => {
    const [count, setCount] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const numeric = parseInt(value.replace(/\D/g, ''))
                    let start = 0
                    const increment = numeric / 40
                    const timer = setInterval(() => {
                        start += increment
                        if (start >= numeric) {
                            setCount(numeric)
                            clearInterval(timer)
                        } else {
                            setCount(Math.floor(start))
                        }
                    }, 30)
                    observer.disconnect()
                }
            },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [value])

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-indigo-400">
                {count}{suffix}
            </div>
            <div className="text-gray-400 mt-1">{label}</div>
        </div>
    )
}

// Floating shapes for hero
const FloatingShapes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="absolute top-20 left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"
        />
        <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"
        />
    </div>
)

export default function Home() {
    return (
        <div>
            {/* ===== Section 1: Hero ===== */}
            <section className="relative min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029')] bg-cover bg-center overflow-hidden">
                <div className="absolute inset-0 bg-gray-950/80"></div>
                <ThreeDCube />
                <FloatingShapes />
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
                    >
                        Accelerate Your <span className="text-indigo-400">Career</span> Today
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
                    >
                        AI‑powered job matching, skill assessments, and career coaching. Land your dream role faster than ever.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <Link
                            to="/signup"
                            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-lg shadow-2xl shadow-indigo-500/25 transition transform hover:-translate-y-1"
                        >
                            Get Started Free
                        </Link>
                        <a
                            href="#features"
                            className="px-8 py-4 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 rounded-xl font-medium text-lg transition border border-gray-600"
                        >
                            Learn More
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ===== Section 2: Features (3D tilting cards) ===== */}
            <section id="features" className="py-20 px-4 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Why CareerBoost?
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl mx-auto">
                        Everything you need to find, apply, and succeed in your next role.
                    </motion.p>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: HiLightningBolt,
                            title: 'Instant Matching',
                            desc: 'AI matches you with jobs that fit your skills and goals.',
                        },
                        {
                            icon: HiGlobe,
                            title: 'Global Reach',
                            desc: 'Access opportunities from top companies worldwide.',
                        },
                        {
                            icon: HiChartBar,
                            title: 'Skill Insights',
                            desc: 'Detailed analytics to identify and close skill gaps.',
                        },
                    ].map((feat, i) => (
                        <TiltCard key={i}>
                            <motion.div
                                variants={scaleIn}
                                className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-indigo-500/50 transition-colors h-full"
                            >
                                <feat.icon className="w-12 h-12 text-indigo-400 mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">{feat.title}</h3>
                                <p className="text-gray-400">{feat.desc}</p>
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>
            </section>

            {/* ===== Section 3: How It Works (animated steps) ===== */}
            <section className="py-20 bg-gray-900/50 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
                    >
                        How It Works
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting line (desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-400 to-indigo-500/0" />
                        {[
                            {
                                step: '01',
                                title: 'Create Profile',
                                desc: 'Sign up and tell us about your experience and aspirations.',
                            },
                            {
                                step: '02',
                                title: 'Get Matched',
                                desc: 'Our AI finds roles that align with your unique profile.',
                            },
                            {
                                step: '03',
                                title: 'Land the Job',
                                desc: 'Apply with one click and track your progress.',
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.5 }}
                                className="text-center relative"
                            >
                                <motion.div
                                    className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/25 relative z-10"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {item.step}
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Section 4: Services (3D tilt hover) ===== */}
            <section id="services" className="py-20 px-4 max-w-7xl mx-auto">
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
                >
                    Our Services
                </motion.h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        'Resume Builder',
                        'Mock Interviews',
                        'Career Coaching',
                        'Job Alerts',
                    ].map((s, i) => (
                        <TiltCard key={i}>
                            <motion.div
                                variants={scaleIn}
                                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-indigo-400/50 transition-colors cursor-pointer h-full"
                            >
                                <HiCheckCircle className="w-8 h-8 text-indigo-400 mb-3" />
                                <h3 className="text-lg font-semibold text-white mb-2">{s}</h3>
                                <p className="text-sm text-gray-400">Tailored to accelerate your growth.</p>
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>
            </section>

            {/* ===== Section 5: Testimonials (diverse quotes) ===== */}
            <section id="testimonials" className="py-20 bg-gray-900/50 px-4">
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
                >
                    Success Stories
                </motion.h2>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            quote:
                                'CareerBoost helped me land a job at a top tech company within 3 weeks. The AI matching is spot on!',
                            author: 'Alex Johnson',
                        },
                        {
                            quote:
                                'I was stuck in a career rut. The coaching and skill insights gave me the clarity I needed.',
                            author: 'Maria Gomez',
                        },
                        {
                            quote:
                                'The resume makeover doubled my interview requests. I can’t recommend CareerBoost enough.',
                            author: 'Liam Chen',
                        },
                    ].map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                        >
                            <div className="flex items-center gap-1 text-yellow-400 mb-3">
                                {[...Array(5)].map((_, j) => (
                                    <HiStar key={j} className="w-5 h-5" />
                                ))}
                            </div>
                            <p className="text-gray-300 mb-4">“{testimonial.quote}”</p>
                            <p className="text-white font-medium">— {testimonial.author}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ===== Section 6: Stats (animated counter) ===== */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { value: '10K', suffix: '+', label: 'Active Users' },
                        { value: '500', suffix: '+', label: 'Partner Companies' },
                        { value: '95', suffix: '%', label: 'Satisfaction Rate' },
                        { value: '24/7', suffix: '', label: 'Support' },
                    ].map((stat, i) => (
                        <AnimatedCounter key={i} value={stat.value} suffix={stat.suffix} label={stat.label} />
                    ))}
                </div>
            </section>

            {/* ===== Section 7: CTA ===== */}
            <section
                id="cta"
                className="py-20 px-4 bg-gradient-to-br from-indigo-900/40 to-gray-950"
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-3xl mx-auto text-center"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Ready to Transform Your Career?
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-gray-300 text-lg mb-8">
                        Join thousands of professionals who have already accelerated their
                        growth.
                    </motion.p>
                    <motion.div variants={scaleIn}>
                        <Link
                            to="/signup"
                            className="inline-flex items-center gap-2 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-lg shadow-xl transition hover:scale-105"
                        >
                            Start Now <HiArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    )
}