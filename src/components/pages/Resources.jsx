import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Resources() {
  const articles = [
    { title: 'Top 10 Resume Mistakes in 2025', cat: 'Resume' },
    { title: 'How to Ace the Technical Interview', cat: 'Interview' },
    { title: 'Negotiating Your Salary: A Guide', cat: 'Career' },
    { title: 'Building a Personal Brand on LinkedIn', cat: 'Branding' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* Section 1: Hero */}
      <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Free Resources</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">Download templates, read guides, and watch tutorials to level up your career.</p>
      </motion.section>

      {/* Section 2: Articles */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-8">Latest Articles</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((a, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition cursor-pointer"
            >
              <span className="text-xs text-indigo-400 font-medium uppercase">{a.cat}</span>
              <h3 className="text-lg font-semibold text-white mt-2">{a.title}</h3>
              <p className="text-gray-400 text-sm mt-4">Read more →</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Section 3: Tools & Downloads */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20 bg-gray-900/50 p-10 rounded-2xl border border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-6">Tools & Downloads</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { name: 'Resume Template (Word)', desc: 'ATS‑optimized design' },
            { name: 'Cover Letter Builder', desc: 'Customizable and professional' },
            { name: 'Interview Checklist', desc: 'Don’t miss a single step' },
            { name: 'Salary Negotiation Script', desc: 'Exact phrases to use' },
          ].map((t, i) => (
            <div key={i} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
              <div>
                <h4 className="text-white font-medium">{t.name}</h4>
                <p className="text-sm text-gray-400">{t.desc}</p>
              </div>
              <button className="px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-md text-sm hover:bg-indigo-600/30 transition">Download</button>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Section 4: Newsletter */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-gray-400 mb-6">Get weekly career tips and new resources straight to your inbox.</p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input type="email" placeholder="you@example.com" className="flex-1 px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-indigo-500 text-white" />
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition">Subscribe</button>
        </form>
      </motion.section>
    </div>
  )
}