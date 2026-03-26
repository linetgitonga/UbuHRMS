import { useAuth } from '../lib/auth-context'
import { useNavigate } from 'react-router-dom'
import { Bell, LogOut, ShieldCheck, User } from 'lucide-react'
import { MetricCard, PageHeader, SectionCard } from '../components/page-primitives'

export default function Settings() {
  const { username, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Control your profile, security preferences, and account behavior."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard icon={<User size={20} />} label="Signed In As" value={username || 'N/A'} trend="Role-based access enabled" />
        <MetricCard icon={<ShieldCheck size={20} />} label="Security Status" value="Protected" trend="Session token active" />
        <MetricCard icon={<Bell size={20} />} label="Notifications" value="Enabled" trend="Email + in-app" />
      </div>

      <div className="max-w-3xl space-y-6">
        <SectionCard title="Profile Information" description="Basic details used across the HRMS workspace.">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Username</label>
              <p className="px-4 py-2 bg-muted rounded-lg text-foreground">{username || 'N/A'}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Account Management" description="Sign out from this device when you are done.">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors font-medium"
          >
            <LogOut size={18} /> Logout
          </button>
        </SectionCard>
      </div>
    </div>
  )
}
