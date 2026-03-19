'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { month: 'January', present: 3120, absent: 240, late: 180 },
  { month: 'February', present: 2880, absent: 280, late: 200 },
  { month: 'March', present: 3240, absent: 120, late: 160 },
  { month: 'April', present: 3060, absent: 240, late: 140 },
  { month: 'May', present: 3360, absent: 80, late: 120 },
  { month: 'June', present: 3480, absent: 60, late: 100 },
];

const departmentData = [
  { name: 'HR', value: 12 },
  { name: 'IT', value: 24 },
  { name: 'Finance', value: 18 },
  { name: 'Operations', value: 45 },
  { name: 'Sales', value: 57 },
];

const COLORS = ['#00C9A7', '#0084FF', '#5765F2', '#FAA61A', '#FF5500'];

export default function ReportsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-6 bg-background min-h-screen">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
              <p className="text-muted-foreground">View insights and analytics for your HR data</p>
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Attendance', value: '98.2%', change: '+2.1% from last month' },
                { label: 'Avg Employees', value: '156', change: '+5 this month' },
                { label: 'Payroll Cost', value: 'Ksh 2.5M', change: 'Current month' },
                { label: 'KPI Achievement', value: '87.5%', change: '+3.2% from last month' },
              ].map((metric, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg p-6">
                  <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className="text-xs text-primary mt-2">{metric.change}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Attendance Trend */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Attendance Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                    <Legend />
                    <Bar dataKey="present" stackId="a" fill="var(--color-primary)" />
                    <Bar dataKey="absent" stackId="a" fill="var(--color-destructive)" />
                    <Bar dataKey="late" stackId="a" fill="var(--color-accent)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Department Distribution */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Department Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} (${value})`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Additional Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Leave Summary */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Leave Summary</h2>
                <div className="space-y-3">
                  {[
                    { type: 'Annual Leave', used: 45, total: 120, color: 'primary' },
                    { type: 'Sick Leave', used: 12, total: 50, color: 'accent' },
                    { type: 'Personal Leave', used: 8, total: 30, color: 'secondary' },
                  ].map((leave, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{leave.type}</span>
                        <span className="text-sm text-muted-foreground">{leave.used}/{leave.total}</span>
                      </div>
                      <div className="w-full bg-secondary/30 rounded-full h-2">
                        <div
                          className={`bg-${leave.color} h-2 rounded-full`}
                          style={{
                            width: `${(leave.used / leave.total) * 100}%`,
                            backgroundColor: `var(--color-${leave.color})`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payroll Summary */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Payroll Summary</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Total Salaries', value: 'Ksh 2.5M', status: 'Processed' },
                    { label: 'Allowances', value: 'Ksh 450K', status: 'Processed' },
                    { label: 'Deductions', value: 'Ksh 180K', status: 'Processed' },
                    { label: 'Net Payroll', value: 'Ksh 2.77M', status: 'Disbursed' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-3 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.status}</p>
                      </div>
                      <p className="text-sm font-semibold text-primary">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
