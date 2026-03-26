import { CalendarDays, Clock4, Umbrella } from 'lucide-react'
import { DataTable, MetricCard, PageHeader, SectionCard } from '../components/page-primitives'

export default function Leaves() {
  const leaveRows = [
    ['Rose Nyambura', 'Annual Leave', 'Mar 29 - Apr 03', 'Approved'],
    ['Brian Oduor', 'Sick Leave', 'Mar 26 - Mar 27', 'Pending'],
    ['Diana Njeri', 'Comp Off', 'Apr 01', 'Approved'],
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Management"
        subtitle="Approve requests quickly while keeping staffing coverage balanced."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard icon={<CalendarDays size={20} />} label="Requests This Month" value="27" trend="8 awaiting action" />
        <MetricCard icon={<Clock4 size={20} />} label="Avg Approval Time" value="17h" trend="Improved by 6h" />
        <MetricCard icon={<Umbrella size={20} />} label="Coverage Risk" value="Low" trend="Housekeeping fully staffed" />
      </div>

      <SectionCard title="Open & Recent Requests" description="Current leave queue and decision status.">
        <DataTable columns={['Employee', 'Type', 'Period', 'Status']} rows={leaveRows} />
      </SectionCard>
    </div>
  )
}
