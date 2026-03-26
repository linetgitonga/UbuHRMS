import { useEffect, useMemo, useState } from 'react'
import { Clock3, Fingerprint, RefreshCw, TimerReset, Users } from 'lucide-react'
import api from '../lib/api'
import { DataTable, MetricCard, PageHeader, SectionCard } from '../components/page-primitives'

interface Employee {
  _id: string
  firstName: string
  lastName: string
  department?: string
}

interface AttendanceRecord {
  _id: string
  attendanceDate: string
  status: 'Present' | 'Absent' | 'Leave'
  shift?: 'Morning' | 'Afternoon'
  checkIn?: string
  breakOut?: string
  breakIn?: string
  checkOut?: string
  totalHoursWorked?: number
}

const dateFormatter = new Intl.DateTimeFormat('en-KE', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('en-KE', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

function formatDate(value?: string) {
  if (!value) {
    return '--'
  }

  return dateFormatter.format(new Date(value))
}

function formatTime(value?: string) {
  if (!value) {
    return '--'
  }

  return timeFormatter.format(new Date(value))
}

export default function Attendance() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [loadingEmployees, setLoadingEmployees] = useState(true)
  const [loadingAttendance, setLoadingAttendance] = useState(false)
  const [error, setError] = useState('')

  const selectedEmployee = useMemo(
    () => employees.find((employee) => employee._id === selectedEmployeeId) || null,
    [employees, selectedEmployeeId],
  )

  const summary = useMemo(() => {
    const total = attendanceRecords.length
    const present = attendanceRecords.filter((record) => record.status === 'Present').length
    const missingPunches = attendanceRecords.filter((record) => !record.checkIn || !record.checkOut).length
    const totalHours = attendanceRecords.reduce(
      (sum, record) => sum + (record.totalHoursWorked || 0),
      0,
    )
    const averageHours = total > 0 ? (totalHours / total).toFixed(1) : '0.0'

    return {
      total,
      present,
      missingPunches,
      averageHours,
    }
  }, [attendanceRecords])

  const shiftSummaryRows = useMemo(() => {
    const shiftMap = new Map<string, { entries: number; checkIns: number; hours: number; present: number }>()

    attendanceRecords.forEach((record) => {
      const shiftName = record.shift || 'Unassigned'
      const previous = shiftMap.get(shiftName) || { entries: 0, checkIns: 0, hours: 0, present: 0 }

      shiftMap.set(shiftName, {
        entries: previous.entries + 1,
        checkIns: previous.checkIns + (record.checkIn ? 1 : 0),
        hours: previous.hours + (record.totalHoursWorked || 0),
        present: previous.present + (record.status === 'Present' ? 1 : 0),
      })
    })

    return Array.from(shiftMap.entries()).map(([shift, values]) => {
      const compliance = values.entries > 0 ? Math.round((values.present / values.entries) * 100) : 0
      const avgCheckInCoverage = values.entries > 0 ? Math.round((values.checkIns / values.entries) * 100) : 0
      const avgHours = values.entries > 0 ? (values.hours / values.entries).toFixed(1) : '0.0'

      return [
        `${shift} Shift`,
        `${values.entries}`,
        `${avgCheckInCoverage}% check-in`,
        `${avgHours} hrs avg`,
        `${compliance}% present`,
      ]
    })
  }, [attendanceRecords])

  const fetchAttendance = async (employeeId: string) => {
    if (!employeeId) {
      setAttendanceRecords([])
      return
    }

    setLoadingAttendance(true)
    setError('')

    try {
      const response = await api.get<AttendanceRecord[]>(`/attendance/${employeeId}`)
      const sortedRecords = [...(response.data || [])].sort((a, b) => {
        return new Date(b.attendanceDate).getTime() - new Date(a.attendanceDate).getTime()
      })
      setAttendanceRecords(sortedRecords)
    } catch (err: any) {
      setAttendanceRecords([])
      setError(err.response?.data?.msg || 'Failed to load attendance records.')
    } finally {
      setLoadingAttendance(false)
    }
  }

  useEffect(() => {
    const loadEmployees = async () => {
      setLoadingEmployees(true)
      setError('')

      try {
        const response = await api.get<Employee[]>('/employees')
        const employeeList = response.data || []
        setEmployees(employeeList)

        if (employeeList.length > 0) {
          setSelectedEmployeeId((currentId) => currentId || employeeList[0]._id)
        }
      } catch (err: any) {
        setError(err.response?.data?.msg || 'Failed to load employees.')
      } finally {
        setLoadingEmployees(false)
      }
    }

    loadEmployees()
  }, [])

  useEffect(() => {
    fetchAttendance(selectedEmployeeId)
  }, [selectedEmployeeId])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance & Biometric"
        subtitle="Review attendance logs by employee, monitor shift consistency, and quickly spot missing punches."
        action={
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              value={selectedEmployeeId}
              onChange={(event) => setSelectedEmployeeId(event.target.value)}
              disabled={loadingEmployees || employees.length === 0}
              className="h-10 min-w-[220px] rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
            >
              {employees.length === 0 ? (
                <option value="">No employees found</option>
              ) : (
                employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))
              )}
            </select>

            <button
              onClick={() => fetchAttendance(selectedEmployeeId)}
              disabled={loadingAttendance || !selectedEmployeeId}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw size={16} className={loadingAttendance ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          icon={<Users size={20} />}
          label="Selected Employee"
          value={selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}` : 'N/A'}
          trend={selectedEmployee?.department ? `Dept: ${selectedEmployee.department}` : 'No department info'}
        />
        <MetricCard
          icon={<Clock3 size={20} />}
          label="Average Hours"
          value={`${summary.averageHours} hrs`}
          trend={`${summary.present}/${summary.total} marked present`}
        />
        <MetricCard
          icon={<TimerReset size={20} />}
          label="Missing Punches"
          value={`${summary.missingPunches}`}
          trend="Records missing check-in or check-out"
        />
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <SectionCard
        title="Attendance Log"
        description="Daily biometric events, statuses, and computed hours for the selected employee."
      >
        {loadingAttendance ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : attendanceRecords.length === 0 ? (
          <p className="rounded-xl border border-border/70 bg-muted/20 p-5 text-sm text-muted-foreground">
            No attendance records found for the selected employee.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border/70">
            <table className="min-w-full divide-y divide-border/70">
              <thead className="bg-muted/40">
                <tr>
                  {['Date', 'Shift', 'Status', 'Check In', 'Break Out', 'Break In', 'Check Out', 'Hours'].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70 bg-card">
                {attendanceRecords.map((record) => (
                  <tr key={record._id} className="hover:bg-muted/35">
                    <td className="px-4 py-3 text-sm text-foreground">{formatDate(record.attendanceDate)}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{record.shift || '--'}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          record.status === 'Present'
                            ? 'bg-primary/15 text-primary'
                            : record.status === 'Absent'
                              ? 'bg-destructive/15 text-destructive'
                              : 'bg-amber-500/15 text-amber-700'
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">{formatTime(record.checkIn)}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{formatTime(record.breakOut)}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{formatTime(record.breakIn)}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{formatTime(record.checkOut)}</td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {typeof record.totalHoursWorked === 'number' ? `${record.totalHoursWorked.toFixed(1)} hrs` : '--'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Shift Performance" description="Shift-level summary derived from fetched attendance records.">
        <DataTable
          columns={['Shift', 'Entries', 'Check-in Rate', 'Average Hours', 'Presence Rate']}
          rows={shiftSummaryRows.length > 0 ? shiftSummaryRows : [['--', '0', '0%', '0.0 hrs', '0%']]}
        />
      </SectionCard>

      <SectionCard title="Biometric Integrity" description="Quick operational checks for the selected employee.">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Sync Health</p>
            <p className="mt-2 text-sm text-foreground">
              {summary.total > 0 ? 'Attendance stream available and records loaded.' : 'No records yet for selected employee.'}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Consistency Flag</p>
            <p className="mt-2 text-sm text-foreground">
              {summary.missingPunches === 0
                ? 'No missing punch events detected.'
                : `${summary.missingPunches} record(s) need punch correction.`}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 text-xs text-primary">
              <Fingerprint size={14} />
              Device events verified through attendance endpoint.
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
