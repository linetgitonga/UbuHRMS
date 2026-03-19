import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../lib/auth-context'
import { Spinner } from '../../components/ui/spinner'

export default function ProtectedRoute() {
  const { token, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

// Import these from your existing components
import Sidebar from './sidebar'
import Header from './header'
