import { createContext, useContext, useState, useEffect } from 'react'


const AuthContext = createContext()

// Mock JWT helpers (do NOT use in production)
const encodeToken = (payload) => {
  const header = { alg: 'HS256', typ: 'JWT' }
  const base64 = (obj) => btoa(JSON.stringify(obj))
  const signature = 'mock-signature'
  return `${base64(header)}.${base64(payload)}.${signature}`
}

const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = decodeToken(token)
      if (decoded) {
        // Retrieve stored profile data
        const storedUser = localStorage.getItem(`user_${decoded.id}`)
        setUser(storedUser ? JSON.parse(storedUser) : decoded)
      }
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Mock validation – accept any non‑empty email/password
    if (!email || !password) return false
    const id = Date.now().toString()
    const payload = { id, email, name: email.split('@')[0] }
    const token = encodeToken(payload)
    localStorage.setItem('token', token)
    const userData = { ...payload, bio: '', skills: [] }
    localStorage.setItem(`user_${id}`, JSON.stringify(userData))
    setUser(userData)
    return true
  }

  const signup = (name, email, password) => {
    if (!name || !email || !password) return false
    const id = Date.now().toString()
    const payload = { id, email, name }
    const token = encodeToken(payload)
    localStorage.setItem('token', token)
    const userData = { ...payload, bio: '', skills: [] }
    localStorage.setItem(`user_${id}`, JSON.stringify(userData))
    setUser(userData)
    return true
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const updateProfile = (data) => {
    if (!user) return
    const updated = { ...user, ...data }
    setUser(updated)
    localStorage.setItem(`user_${user.id}`, JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)