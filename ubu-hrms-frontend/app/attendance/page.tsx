'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { DataTable } from '@/components/data-table';
import { Plus, Edit } from 'lucide-react';
import { api } from '@/lib/api';

interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'leave';
}

export default function AttendancePage() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      const response = await api.get('/attendance');
      setAttendances(response.data || []);
    } catch (error) {
      console.error('Failed to fetch attendances:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const columns = [
    { header: 'Employee', accessor: 'employeeName' as const },
    { header: 'Date', accessor: 'date' as const },
    { header: 'Check In', accessor: 'checkIn' as const },
    { header: 'Check Out', accessor: 'checkOut' as const },
    {
      header: 'Status',
      accessor: 'status' as const,
      render: (val: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            val === 'present'
              ? 'bg-primary/10 text-primary'
              : val === 'absent'
              ? 'bg-destructive/10 text-destructive'
              : val === 'late'
              ? 'bg-yellow-500/10 text-yellow-700'
              : 'bg-secondary/10 text-secondary'
          }`}
        >
          {val.charAt(0).toUpperCase() + val.slice(1)}
        </span>
      ),
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-6 bg-background min-h-screen">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Attendance</h1>
                <p className="text-muted-foreground">Track and manage employee attendance</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={20} />
                Record Attendance
              </button>
            </div>

            {/* Form */}
            {showForm && <AttendanceForm onClose={() => setShowForm(false)} onSuccess={fetchAttendances} />}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Present Today', value: '142', color: 'primary' },
                { label: 'Absent', value: '8', color: 'destructive' },
                { label: 'Late', value: '6', color: 'yellow-500' },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-lg p-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-muted-foreground">Loading attendance records...</div>
                </div>
              ) : attendances.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-muted-foreground">No attendance records found</div>
                </div>
              ) : (
                <DataTable columns={columns} data={attendances} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function AttendanceForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    date: '',
    checkIn: '',
    checkOut: '',
    status: 'present',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/attendance', formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to record attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Record Attendance</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="time"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="time"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Recording...' : 'Record Attendance'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-secondary hover:bg-secondary/90 text-foreground py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
