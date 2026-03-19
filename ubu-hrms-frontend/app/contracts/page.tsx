'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { DataTable } from '@/components/data-table';
import { Plus, Edit, Trash2, Download } from 'lucide-react';
import { api } from '@/lib/api';

interface Contract {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  terms: string;
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const response = await api.get('/contracts');
      setContracts(response.data || []);
    } catch (error) {
      console.error('Failed to fetch contracts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contract?')) return;
    try {
      await api.delete(`/contracts/${id}`);
      setContracts(contracts.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Failed to delete contract:', error);
    }
  };

  if (!mounted) return null;

  const columns = [
    { header: 'Employee', accessor: 'employeeName' as const },
    { header: 'Contract Type', accessor: 'type' as const },
    { header: 'Start Date', accessor: 'startDate' as const },
    { header: 'End Date', accessor: 'endDate' as const },
    {
      header: 'Status',
      accessor: 'status' as const,
      render: (val: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            val === 'active'
              ? 'bg-primary/10 text-primary'
              : val === 'expired'
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
      render: (val: string) => (
        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-secondary rounded text-primary">
            <Download size={16} />
          </button>
          <button className="p-1.5 hover:bg-secondary rounded text-primary">
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(val)}
            className="p-1.5 hover:bg-secondary rounded text-destructive"
          >
            <Trash2 size={16} />
          </button>
        </div>
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Contracts</h1>
                <p className="text-muted-foreground">Manage employee contracts and agreements</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={20} />
                Add Contract
              </button>
            </div>

            {/* Form */}
            {showForm && <ContractForm onClose={() => setShowForm(false)} onSuccess={fetchContracts} />}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Contracts', value: '156', color: 'primary' },
                { label: 'Active', value: '148', color: 'primary' },
                { label: 'Expiring Soon', value: '6', color: 'yellow-500' },
                { label: 'Expired', value: '2', color: 'destructive' },
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
                  <div className="text-muted-foreground">Loading contracts...</div>
                </div>
              ) : contracts.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-muted-foreground">No contracts found</div>
                </div>
              ) : (
                <DataTable columns={columns} data={contracts} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ContractForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    type: 'permanent',
    startDate: '',
    endDate: '',
    terms: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contracts', formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to add contract:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Add New Contract</h2>
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
          <option value="permanent">Permanent</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
          <option value="temporary">Temporary</option>
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
        />
        <textarea
          name="terms"
          placeholder="Terms and conditions"
          value={formData.terms}
          onChange={handleChange}
          className="col-span-2 px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows={3}
        />
        <div className="col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Contract'}
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
