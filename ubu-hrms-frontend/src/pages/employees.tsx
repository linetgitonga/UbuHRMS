import { BadgeCheck, Plus, UserPlus, Users } from 'lucide-react'
import { DataTable, MetricCard, PageHeader, SectionCard } from '../components/page-primitives'

export default function Employees() {
  const employeeRows = [
    ['Mercy Akinyi', 'Front Desk', 'Active', 'Mar 24'],
    ['David Kiptoo', 'Security', 'On Leave', 'Mar 23'],
    ['Rose Nyambura', 'Kitchen', 'Active', 'Mar 24'],
    ['James Otieno', 'Maintenance', 'Probation', 'Mar 22'],
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Directory"
        subtitle="Maintain staff records, monitor employment status, and track onboarding progress."
        action={
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Plus size={16} />
            Add Employee
          </button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard icon={<Users size={20} />} label="Active Staff" value="148" trend="94% retention" />
        <MetricCard icon={<UserPlus size={20} />} label="New This Month" value="9" trend="+3 vs last month" />
        <MetricCard icon={<BadgeCheck size={20} />} label="Profiles Verified" value="132" trend="89% completion" />
      </div>

      <SectionCard title="Current Workforce" description="Snapshot of employee records and latest activity.">
        <DataTable columns={['Name', 'Department', 'Status', 'Last Seen']} rows={employeeRows} />
      </SectionCard>
    </div>
  )
}
