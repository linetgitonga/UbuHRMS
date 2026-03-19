'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { DataTable } from '@/components/data-table';
import { Plus, CheckCircle, XCircle } from 'lucide-react';
import { api } from '@/lib/api';

interface Leave {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
}

export default function LeavesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await api.get('/leaves');
      setLeaves(response.data || []);
    } catch (error) {
      console.error('Failed to fetch leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await api.put(`/leaves/${id}`, { status: 'approved' });
      fetchLeaves();
    } catch (error) {
      console.error('Failed to approve leave:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await api.put(`/leaves/${id}`, { status: 'rejected' });
      fetchLeaves();
    } catch (error) {
      console.error('Failed to reject leave:', error);
    }
  };

  if (!mounted) return null;

  const columns = [
    { header: 'Employee', accessor: 'employeeName' as const },
    { header: 'Type', accessor: 'type' as const },
    { header: 'Start Date', accessor: 'startDate' as const },
    { header: 'End Date', accessor: 'endDate' as const },
    { header: 'Days', accessor: 'days' as const },
    {
      header: 'Status',
      accessor: 'status' as const,
      render: (val: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            val === 'approved'
              ? 'bg-primary/10 text-primary'
              : val === 'rejected'
              ? 'bg-destructive/10 text-destructive'
              : 'bg-secondary/10 text-secondary'
          }`}
        >
          {val.charAt(0).toUpperCase() + val.slice(1)}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'id' as const,
      render: (val: string, row: Leave) => (
        row.status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={() => handleApprove(val)}
              className="p-1.5 hover:bg-primary/10 rounded text-primary"
            >
              <CheckCircle size={16} />
            </button>
            <button
              onClick={() => handleReject(val)}
              className="p-1.5 hover:bg-destructive/10 rounded text-destructive"
            >
              <XCircle size={16} />
            </button>
          </div>
        )
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Leave Management</h1>
                <p className="text-muted-foreground">Manage employee leave requests</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={20} />
                Request Leave
              </button>
            </div>

            {/* Form */}
            {showForm && <LeaveForm onClose={() => setShowForm(false)} onSuccess={fetchLeaves} />}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Pending', value: '8', color: 'secondary' },
                { label: 'Approved', value: '142', color: 'primary' },
                { label: 'Rejected', value: '3', color: 'destructive' },
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
                  <div className="text-muted-foreground">Loading leave records...</div>
                </div>
              ) : leaves.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-muted-foreground">No leave records found</div>
                </div>
              ) : (
                <DataTable columns={columns} data={leaves} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function LeaveForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    type: 'annual',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/leaves', formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to request leave:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Request Leave</h2>
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
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="annual">Annual Leave</option>
          <option value="sick">Sick Leave</option>
          <option value="personal">Personal Leave</option>
          <option value="maternity">Maternity Leave</option>
        </select>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <div className="col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Request Leave'}
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
