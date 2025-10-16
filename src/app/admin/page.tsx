'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const AdminLogin = () => {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simple authentication - In production, use proper backend auth
      const username = credentials.username.trim()
      const password = credentials.password.trim()
      
      console.log('Login attempt:', { 
        username, 
        password, 
        usernameLength: username.length, 
        passwordLength: password.length,
        usernameMatch: username === 'twinstack',
        passwordMatch: password === '59269167'
      })
      
      if (username === 'twinstack' && password === '59269167') {
        localStorage.setItem('adminAuth', 'true')
        toast.success('Login successful!')
        setTimeout(() => {
          router.push('/admin/dashboard')
        }, 500)
      } else {
        toast.error('Invalid credentials')
        console.error('Login failed. Expected: twinstack / 59269167')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-poppins font-bold gradient-text mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            TwinStack Solutions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-light dark:glass p-8 rounded-2xl">
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full gradient-bg text-white font-semibold py-3 px-6 rounded-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 glow-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4 space-y-1">
            <p>Username: <span className="font-mono">twinstack</span></p>
            <p>Password: <span className="font-mono">59269167</span></p>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default AdminLogin
