import { Banknote, CircleDollarSign, WalletCards } from 'lucide-react'
import { DataTable, MetricCard, PageHeader, SectionCard } from '../components/page-primitives'

export default function Payroll() {
  const payrollRows = [
    ['March Payroll', '156 Staff', 'KES 2.5M', 'Validating'],
    ['Night Allowance', '31 Staff', 'KES 212K', 'Approved'],
    ['Overtime Supplement', '18 Staff', 'KES 96K', 'Pending'],
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll Center"
        subtitle="Validate monthly payouts, monitor M-Pesa processing, and handle exceptions quickly."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard icon={<Banknote size={20} />} label="Current Payroll" value="KES 2.5M" trend="Cycle closes in 3 days" />
        <MetricCard icon={<CircleDollarSign size={20} />} label="Processed Today" value="KES 380K" trend="37 successful transfers" />
        <MetricCard icon={<WalletCards size={20} />} label="Failed Transfers" value="4" trend="Requires mobile number fix" />
      </div>

      <SectionCard title="Payment Batches" description="Track each payroll run from validation to disbursement.">
        <DataTable columns={['Batch', 'Population', 'Amount', 'Status']} rows={payrollRows} />
      </SectionCard>
    </div>
  )
}
