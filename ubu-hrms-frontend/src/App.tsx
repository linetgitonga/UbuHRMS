import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './lib/auth-context'
import ProtectedRoute from './components/protected-route'

// Pages
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import Employees from './pages/employees'
import Attendance from './pages/attendance'
import Payroll from './pages/payroll'
import Devices from './pages/devices'
import Leaves from './pages/leaves'
import KPIs from './pages/kpis'
import Contracts from './pages/contracts'
import Reports from './pages/reports'
import Settings from './pages/settings'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/kpis" element={<KPIs />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
