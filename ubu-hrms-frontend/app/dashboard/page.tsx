'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { Users, Clock, DollarSign, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Jan', attendance: 92, payroll: 8, kpis: 85 },
  { month: 'Feb', attendance: 88, payroll: 7, kpis: 88 },
  { month: 'Mar', attendance: 95, payroll: 9, kpis: 90 },
  { month: 'Apr', attendance: 90, payroll: 8, kpis: 87 },
  { month: 'May', attendance: 93, payroll: 8, kpis: 92 },
  { month: 'Jun', attendance: 96, payroll: 9, kpis: 94 },
];

const StatCard = ({
  icon: Icon,
  title,
  value,
  change,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
}) => (
  <div className="bg-card border border-border rounded-lg p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-2">{title}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-primary mt-2">{change}</p>
      </div>
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
        {Icon}
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome to Ubuntu HRMS. Here's your overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={<Users size={24} />}
                title="Total Employees"
                value="156"
                change="+5 this month"
              />
              <StatCard
                icon={<Clock size={24} />}
                title="Attendance Rate"
                value="94%"
                change="+2% from last month"
              />
              <StatCard
                icon={<DollarSign size={24} />}
                title="Pending Payroll"
                value="Ksh 450K"
                change="3 pending batches"
              />
              <StatCard
                icon={<Target size={24} />}
                title="Active KPIs"
                value="89"
                change="On track: 76"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Monthly Trends</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="var(--color-primary)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="kpis"
                      stroke="var(--color-accent)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activities</h2>
                <div className="space-y-3">
                  {[
                    { title: 'New employee added', time: '2 hours ago' },
                    { title: 'Payroll batch processed', time: '5 hours ago' },
                    { title: 'Leave request approved', time: '1 day ago' },
                    { title: 'KPI updated', time: '2 days ago' },
                  ].map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 pb-3 border-b border-border last:border-0"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Add Employee', href: '/employees' },
                  { label: 'Record Attendance', href: '/attendance' },
                  { label: 'Process Payroll', href: '/payroll' },
                  { label: 'View Reports', href: '/reports' },
                ].map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className="px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors text-center"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
