import { Link2, RefreshCw, Smartphone } from 'lucide-react'
import { DataTable, MetricCard, PageHeader, SectionCard } from '../components/page-primitives'

export default function Devices() {
  const deviceRows = [
    ['Main Gate - ZK-Lite', 'Online', '03 min ago', 'Firmware v4.1'],
    ['Kitchen Entry - ZK-20', 'Online', '07 min ago', 'Firmware v4.1'],
    ['Service Gate - BioPro', 'Offline', '48 min ago', 'Check power'],
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Device Operations"
        subtitle="Monitor biometric hardware uptime, sync quality, and integration health."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard icon={<Smartphone size={20} />} label="Connected Devices" value="11" trend="1 device needs attention" />
        <MetricCard icon={<RefreshCw size={20} />} label="Sync Success" value="97%" trend="Last sync at 11:16 AM" />
        <MetricCard icon={<Link2 size={20} />} label="API Bridge" value="Healthy" trend="Latency: 132 ms" />
      </div>

      <SectionCard title="Biometric Inventory" description="Real-time status of all registered attendance devices.">
        <DataTable columns={['Device', 'Status', 'Last Sync', 'Note']} rows={deviceRows} />
      </SectionCard>
    </div>
  )
}
