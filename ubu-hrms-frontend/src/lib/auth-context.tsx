import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  token: string | null
  username: string | null
  role: string | null
  isLoading: boolean
  setToken: (token: string | null) => void
  setUsername: (username: string | null) => void
  setRole: (role: string | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null)
  const [username, setUsernameState] = useState<string | null>(null)
  const [role, setRoleState] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken')
    const savedUsername = localStorage.getItem('username')
    const savedRole = localStorage.getItem('role')

    if (savedToken) {
      setTokenState(savedToken)
      setUsernameState(savedUsername)
      setRoleState(savedRole)
    }
    setIsLoading(false)
  }, [])

  const logout = () => {
    setTokenState(null)
    setUsernameState(null)
    setRoleState(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
  }

  const handleSetToken = (newToken: string | null) => {
    setTokenState(newToken)
    if (newToken) {
      localStorage.setItem('authToken', newToken)
    } else {
      localStorage.removeItem('authToken')
    }
  }

  const handleSetUsername = (newUsername: string | null) => {
    setUsernameState(newUsername)
    if (newUsername) {
      localStorage.setItem('username', newUsername)
    } else {
      localStorage.removeItem('username')
    }
  }

  const handleSetRole = (newRole: string | null) => {
    setRoleState(newRole)
    if (newRole) {
      localStorage.setItem('role', newRole)
    } else {
      localStorage.removeItem('role')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        role,
        isLoading,
        setToken: handleSetToken,
        setUsername: handleSetUsername,
        setRole: handleSetRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
