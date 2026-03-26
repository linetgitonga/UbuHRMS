import { Activity, Gauge, Trophy } from 'lucide-react'
import { DataTable, MetricCard, PageHeader, SectionCard } from '../components/page-primitives'

export default function KPIs() {
  const kpiRows = [
    ['Front Desk Response Time', '92%', '95%', 'On Track'],
    ['Housekeeping Quality', '88%', '90%', 'At Risk'],
    ['Kitchen Service Delivery', '94%', '92%', 'Exceeded'],
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance KPIs"
        subtitle="Measure team outcomes against service standards and monthly goals."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard icon={<Gauge size={20} />} label="Overall KPI Score" value="78%" trend="+3% this month" />
        <MetricCard icon={<Activity size={20} />} label="Active Scorecards" value="39" trend="4 pending review" />
        <MetricCard icon={<Trophy size={20} />} label="Top Performing Team" value="Kitchen" trend="96% target hit" />
      </div>

      <SectionCard title="Department KPI Matrix" description="Performance trend by unit and target tracking.">
        <DataTable columns={['KPI', 'Current', 'Target', 'Status']} rows={kpiRows} />
      </SectionCard>
    </div>
  )
}
