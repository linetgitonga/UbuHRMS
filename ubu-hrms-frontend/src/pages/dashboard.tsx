import { ArrowUpRight, Clock, DollarSign, Target, Users } from 'lucide-react'
import { DataTable, MetricCard, PageHeader, SectionCard, TimelineItem } from '../components/page-primitives'

export default function Dashboard() {
  const onboardingRows = [
    ['Mary Atieno', 'Housekeeping', 'Today', 'Docs Pending'],
    ['Brian Oduor', 'Kitchen', 'Mar 28', 'Orientation'],
    ['Diana Njeri', 'Front Desk', 'Apr 01', 'Ready'],
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operations Dashboard"
        subtitle="Track workforce health, payroll readiness, and service-delivery staffing in one place."
        action={
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Export Snapshot
            <ArrowUpRight size={16} />
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<Users className="text-primary" size={24} />}
          label="Total Employees"
          value="156"
          trend="+2 this week"
        />
        <MetricCard
          icon={<Clock className="text-primary" size={24} />}
          label="Present Today"
          value="142"
          trend="91% attendance"
        />
        <MetricCard
          icon={<DollarSign className="text-primary" size={24} />}
          label="Pending Payroll"
          value="KES 2.5M"
          trend="Cutoff in 3 days"
        />
        <MetricCard
          icon={<Target className="text-primary" size={24} />}
          label="KPI Completion"
          value="78%"
          trend="+3% month-over-month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard
          title="New Joiners Pipeline"
          description="Verify documentation and induction progress for incoming staff."
        >
          <DataTable columns={['Name', 'Department', 'Start Date', 'Status']} rows={onboardingRows} />
        </SectionCard>

        <SectionCard title="Live Activity" description="Latest workforce and system events.">
          <div className="space-y-3">
            <TimelineItem title="Biometric Sync Complete" detail="4 devices uploaded 311 logs." time="11 minutes ago" />
            <TimelineItem title="Leave Request Approved" detail="Mercy Akinyi approved by HR." time="28 minutes ago" />
            <TimelineItem title="Payroll Batch Validated" detail="No high-risk anomalies detected." time="1 hour ago" />
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
