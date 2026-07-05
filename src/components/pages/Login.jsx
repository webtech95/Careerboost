import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = login(email, password)
    if (!success) setError('Please fill all fields')
    else navigate('/profile')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl grid md:grid-cols-2 bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
        {/* Section 1: Visual/Benefits side */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-indigo-600/30 to-gray-900">
          <h2 className="text-3xl font-bold text-white mb-6">Welcome Back!</h2>
          <ul className="space-y-4 text-gray-300">
            <li>✓ AI‑powered job matches</li>
            <li>✓ Track applications in one place</li>
            <li>✓ Exclusive career resources</li>
          </ul>
          <p className="mt-8 text-sm text-gray-400">Don't have an account? <Link to="/signup" className="text-indigo-400 underline">Sign up</Link></p>
        </div>

        {/* Section 2: Form */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-2">Login</h2>
          <p className="text-gray-400 mb-8">Enter your credentials to continue.</p>
          {error && <p className="text-red-400 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 text-white" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 text-white" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition shadow-lg shadow-indigo-500/25">Sign In</button>
          </form>
          <div className="mt-6 text-center md:hidden">
            <p className="text-sm text-gray-400">Don't have an account? <Link to="/signup" className="text-indigo-400">Sign up</Link></p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}