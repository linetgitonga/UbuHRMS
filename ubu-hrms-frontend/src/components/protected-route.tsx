import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../lib/auth-context'

export default function ProtectedRoute() {
  const { token, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-gradient-to-b from-background to-muted/20 px-4 pb-6 pt-16 md:ml-64 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

// Import these from your existing components
import Sidebar from './sidebar'
import Header from './header'
