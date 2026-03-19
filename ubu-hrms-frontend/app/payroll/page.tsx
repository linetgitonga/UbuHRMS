'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { DataTable } from '@/components/data-table';
import { Plus, Download } from 'lucide-react';
import { api } from '@/lib/api';

interface PaymentRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: string;
  period: string;
  status: 'pending' | 'processed' | 'disbursed';
  date: string;
}

export default function PayrollPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get('/payroll/payments');
      setPayments(response.data || []);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const columns = [
    { header: 'Employee', accessor: 'employeeName' as const },
    { header: 'Amount', accessor: 'amount' as const, render: (val: string) => `Ksh ${val}` },
    { header: 'Period', accessor: 'period' as const },
    { header: 'Date', accessor: 'date' as const },
    {
      header: 'Status',
      accessor: 'status' as const,
      render: (val: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            val === 'disbursed'
              ? 'bg-primary/10 text-primary'
              : val === 'processed'
              ? 'bg-accent/10 text-accent'
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Payroll</h1>
                <p className="text-muted-foreground">Manage employee payments and disbursements</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-foreground px-4 py-2 rounded-lg transition-colors">
                  <Download size={20} />
                  Export
                </button>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus size={20} />
                  Process Payment
                </button>
              </div>
            </div>

            {/* Form */}
            {showForm && <PaymentForm onClose={() => setShowForm(false)} onSuccess={fetchPayments} />}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Disbursed</p>
                <p className="text-3xl font-bold text-foreground">Ksh 2.5M</p>
                <p className="text-xs text-primary mt-2">This month</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">Pending Payments</p>
                <p className="text-3xl font-bold text-foreground">Ksh 450K</p>
                <p className="text-xs text-accent mt-2">3 batches pending</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Employees</p>
                <p className="text-3xl font-bold text-foreground">156</p>
                <p className="text-xs text-muted-foreground mt-2">All departments</p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-lg p-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-muted-foreground">Loading payment records...</div>
                </div>
              ) : payments.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-muted-foreground">No payment records found</div>
                </div>
              ) : (
                <DataTable columns={columns} data={payments} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function PaymentForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    amount: '',
    period: '',
    method: 'mpesa',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/payroll/disburse', formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to process payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Process Payment</h2>
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
          type="number"
          name="amount"
          placeholder="Amount (Ksh)"
          value={formData.amount}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="month"
          name="period"
          value={formData.period}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <select
          name="method"
          value={formData.method}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="mpesa">M-Pesa</option>
          <option value="bank">Bank Transfer</option>
          <option value="cash">Cash</option>
        </select>
        <div className="col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Process Payment'}
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
