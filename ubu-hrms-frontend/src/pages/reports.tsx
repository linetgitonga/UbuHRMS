import { BarChart3, Download, FileSpreadsheet } from 'lucide-react'
import { DataTable, MetricCard, PageHeader, SectionCard } from '../components/page-primitives'

export default function Reports() {
  const reportRows = [
    ['Attendance Summary', 'Daily', 'Mar 26, 10:01', 'Ready'],
    ['Payroll Reconciliation', 'Monthly', 'Mar 25, 17:22', 'Ready'],
    ['Leave Utilization', 'Weekly', 'Mar 24, 08:42', 'Scheduled'],
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Generate operational reports for leadership, finance, and compliance audits."
        action={
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Download size={16} />
            Download Pack
          </button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard icon={<BarChart3 size={20} />} label="Reports Generated" value="214" trend="19 this week" />
        <MetricCard icon={<FileSpreadsheet size={20} />} label="Scheduled Exports" value="7" trend="Next run: 6:00 PM" />
        <MetricCard icon={<Download size={20} />} label="Downloads Today" value="43" trend="Most requested: Payroll" />
      </div>

      <SectionCard title="Report Queue" description="Latest generated files and scheduled deliverables.">
        <DataTable columns={['Report', 'Frequency', 'Last Run', 'Status']} rows={reportRows} />
      </SectionCard>
    </div>
  )
}
