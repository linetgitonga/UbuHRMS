import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle: string
  action?: ReactNode
}

interface MetricCardProps {
  label: string
  value: string
  trend?: string
  icon: ReactNode
}

interface SectionCardProps {
  title: string
  description?: string
  children: ReactNode
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <section className="rounded-2xl border border-border/70 bg-gradient-to-r from-card via-card to-secondary/10 p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">{subtitle}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </section>
  )
}

export function MetricCard({ label, value, trend, icon }: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-border/70 bg-card/95 p-5 shadow-sm transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
          {trend ? <p className="mt-2 text-xs text-primary">{trend}</p> : null}
        </div>
        <div className="rounded-xl bg-primary/10 p-3 text-primary">{icon}</div>
      </div>
    </article>
  )
}

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card/95 p-5 shadow-sm md:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}

export function DataTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: Array<string[]>
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/70">
      <table className="min-w-full divide-y divide-border/70">
        <thead className="bg-muted/40">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70 bg-card">
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`} className="hover:bg-muted/35">
              {row.map((cell, cellIndex) => (
                <td key={`${cellIndex}-${cell}`} className="px-4 py-3 text-sm text-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function TimelineItem({ title, detail, time }: { title: string; detail: string; time: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-4">
      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{detail}</p>
        <p className="mt-1 text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}
