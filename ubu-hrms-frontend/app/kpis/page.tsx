'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { DataTable } from '@/components/data-table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';

interface KPI {
  id: string;
  employeeId: string;
  employeeName: string;
  metric: string;
  target: number;
  actual: number;
  weight: number;
  status: 'on-track' | 'at-risk' | 'off-track';
}

export default function KPIsPage() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchKPIs();
  }, []);

  const fetchKPIs = async () => {
    try {
      const response = await api.get('/kpis');
      setKpis(response.data || []);
    } catch (error) {
      console.error('Failed to fetch KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this KPI?')) return;
    try {
      await api.delete(`/kpis/${id}`);
      setKpis(kpis.filter((k) => k.id !== id));
    } catch (error) {
      console.error('Failed to delete KPI:', error);
    }
  };

  if (!mounted) return null;

  const columns = [
    { header: 'Employee', accessor: 'employeeName' as const },
    { header: 'Metric', accessor: 'metric' as const },
    { header: 'Target', accessor: 'target' as const },
    { header: 'Actual', accessor: 'actual' as const },
    { header: 'Weight (%)', accessor: 'weight' as const },
    {
      header: 'Achievement',
      accessor: 'actual' as const,
      render: (val: number, row: KPI) => {
        const percentage = (row.actual / row.target) * 100;
        return (
          <div className="flex items-center gap-2">
            <div className="w-full bg-secondary/30 rounded-full h-2 max-w-xs">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            <span className="text-xs font-medium text-foreground">{Math.round(percentage)}%</span>
          </div>
        );
      },
    },
    {
      header: 'Status',
      accessor: 'status' as const,
      render: (val: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            val === 'on-track'
              ? 'bg-primary/10 text-primary'
              : val === 'at-risk'
              ? 'bg-yellow-500/10 text-yellow-700'
              : 'bg-destructive/10 text-destructive'
          }`}
        >
          {val.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'id' as const,
      render: (val: string) => (
        <div className="flex gap-2">
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
                <h1 className="text-3xl font-bold text-foreground mb-2">KPIs</h1>
                <p className="text-muted-foreground">Manage Key Performance Indicators</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={20} />
                Add KPI
              </button>
            </div>

            {/* Form */}
            {showForm && <KPIForm onClose={() => setShowForm(false)} onSuccess={fetchKPIs} />}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total KPIs', value: '89', color: 'primary' },
                { label: 'On Track', value: '76', color: 'primary' },
                { label: 'At Risk', value: '8', color: 'yellow-500' },
                { label: 'Off Track', value: '5', color: 'destructive' },
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
                  <div className="text-muted-foreground">Loading KPIs...</div>
                </div>
              ) : kpis.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-muted-foreground">No KPIs found</div>
                </div>
              ) : (
                <DataTable columns={columns} data={kpis} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function KPIForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    metric: '',
    target: '',
    weight: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/kpis', formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to add KPI:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Add New KPI</h2>
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
          type="text"
          name="metric"
          placeholder="Metric (e.g., Sales Revenue)"
          value={formData.metric}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="number"
          name="target"
          placeholder="Target Value"
          value={formData.target}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (%)"
          value={formData.weight}
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
            {loading ? 'Adding...' : 'Add KPI'}
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
