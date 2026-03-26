import { ClipboardCheck, FileText, ShieldCheck } from 'lucide-react'
import { DataTable, MetricCard, PageHeader, SectionCard } from '../components/page-primitives'

export default function Contracts() {
  const contractRows = [
    ['John Kariuki', 'Permanent', 'Dec 31, 2026', 'Active'],
    ['Mercy Akinyi', 'Fixed Term', 'Jun 30, 2026', 'Renewal Due'],
    ['Peter Muli', 'Probation', 'Apr 10, 2026', 'Review Pending'],
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contract Management"
        subtitle="Track contract validity, renewal windows, and compliance checkpoints."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard icon={<FileText size={20} />} label="Active Contracts" value="151" trend="5 set to expire this quarter" />
        <MetricCard icon={<ClipboardCheck size={20} />} label="Renewals Pending" value="12" trend="Action needed in 14 days" />
        <MetricCard icon={<ShieldCheck size={20} />} label="Compliance Signed" value="96%" trend="Policy forms up to date" />
      </div>

      <SectionCard title="Contract Lifecycle" description="Monitor agreement terms and renewal priorities.">
        <DataTable columns={['Employee', 'Type', 'End Date', 'State']} rows={contractRows} />
      </SectionCard>
    </div>
  )
}
