import { Users, Clock, DollarSign, Target } from 'lucide-react'

const StatCard = ({ icon, label, value, change }: any) => (
  <div className="bg-card border border-border rounded-lg p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-foreground">{value}</h3>
      </div>
      <div className="p-3 bg-primary/10 rounded-lg">
        {icon}
      </div>
    </div>
    {change && (
      <p className="text-xs text-muted-foreground mt-4">
        <span className="text-primary">{change}</span> from last month
      </p>
    )}
  </div>
)

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your HR overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="text-primary" size={24} />}
          label="Total Employees"
          value="156"
          change="+2"
        />
        <StatCard
          icon={<Clock className="text-primary" size={24} />}
          label="Present Today"
          value="142"
          change="+5"
        />
        <StatCard
          icon={<DollarSign className="text-primary" size={24} />}
          label="Pending Payroll"
          value="KES 2.5M"
          change="+150K"
        />
        <StatCard
          icon={<Target className="text-primary" size={24} />}
          label="KPI Completion"
          value="78%"
          change="+3%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Employee Check-in</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="pb-4 border-b border-border last:border-0 last:pb-0">
                <p className="text-sm font-medium text-foreground">Team Meeting</p>
                <p className="text-xs text-muted-foreground">Today at 2:00 PM</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
