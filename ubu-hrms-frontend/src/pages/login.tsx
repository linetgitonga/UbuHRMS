import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../lib/auth-context'
import api from '../lib/api'
import { Mail, Lock } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { setToken, setUsername, setRole } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ username: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/auth/login', formData)
      const { token, username, role } = response.data

      setToken(token)
      setUsername(username)
      setRole(role)

      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/10 p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">U</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground text-center">
                Ubuntu HRMS
              </h1>
              <p className="text-sm text-muted-foreground text-center">
                Human Resource Management System
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-foreground">
                Username
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-primary/90 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
