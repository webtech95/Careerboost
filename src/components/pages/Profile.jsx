import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { motion } from 'framer-motion';
import { HiSave, HiLogout } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user, updateProfile, logout } = useAuth()
    const navigate = useNavigate()
    const [bio, setBio] = useState(user?.bio || '')
    const [skills, setSkills] = useState(user?.skills?.join(', ') || '')
    const [saved, setSaved] = useState(false)

    const handleSave = (e) => {
        e.preventDefault()
        updateProfile({ bio, skills: skills.split(',').map(s => s.trim()) })
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    if (!user) return null

    return (
        <div className="max-w-4xl mx-auto px-4 py-20">
            {/* Section 1: Welcome */}
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                <h1 className="text-4xl font-bold text-white">Welcome, {user.name} 👋</h1>
                <p className="text-gray-400 mt-2">{user.email}</p>
            </motion.section>

            {/* Section 2: Profile Form */}
            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-gray-900 p-8 rounded-2xl border border-gray-800 mb-10">
                <h2 className="text-2xl font-semibold text-white mb-6">Your Profile</h2>
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Bio</label>
                        <textarea
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 text-white"
                            placeholder="Tell us about yourself..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Skills (comma separated)</label>
                        <input
                            type="text"
                            value={skills}
                            onChange={e => setSkills(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 text-white"
                            placeholder="React, Node.js, Python"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition shadow-lg">
                            <HiSave className="w-5 h-5" /> Save Changes
                        </button>
                        {saved && <span className="text-green-400 text-sm">Profile updated!</span>}
                    </div>
                </form>
            </motion.section>

            {/* Section 3: Skills preview */}
            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-10">
                <h3 className="text-xl font-semibold text-white mb-4">Your Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {user.skills?.map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-gray-800 rounded-full text-sm border border-gray-700 text-gray-300">{skill}</span>
                    ))}
                    {!user.skills?.length && <p className="text-gray-500">No skills added yet.</p>}
                </div>
            </motion.section>

            {/* Section 4: Account actions */}
            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-right">
                <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg border border-red-500/30 transition"
                >
                    <HiLogout className="w-4 h-4" /> Logout
                </button>
            </motion.section>
        </div>
    )
}