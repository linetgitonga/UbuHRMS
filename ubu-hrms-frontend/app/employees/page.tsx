'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { DataTable } from '@/components/data-table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data || []);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    try {
      await api.delete(`/employees/${id}`);
      setEmployees(employees.filter((e) => e.id !== id));
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  if (!mounted) return null;

  const columns = [
    { header: 'Name', accessor: 'firstName' as const, render: (val: string, row: Employee) => `${row.firstName} ${row.lastName}` },
    { header: 'Email', accessor: 'email' as const },
    { header: 'Department', accessor: 'department' as const },
    { header: 'Position', accessor: 'position' as const },
    {
      header: 'Status',
      accessor: 'status' as const,
      render: (val: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            val === 'active'
              ? 'bg-primary/10 text-primary'
              : 'bg-destructive/10 text-destructive'
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Employees</h1>
                <p className="text-muted-foreground">Manage all employees in the system</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={20} />
                Add Employee
              </button>
            </div>

            {/* Form */}
            {showForm && <EmployeeForm onClose={() => setShowForm(false)} onSuccess={fetchEmployees} />}

            {/* Table */}
            <div className="bg-card border border-border rounded-lg p-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-muted-foreground">Loading employees...</div>
                </div>
              ) : employees.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-muted-foreground">No employees found</div>
                </div>
              ) : (
                <DataTable columns={columns} data={employees} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function EmployeeForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    status: 'active',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/employees', formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to add employee:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="col-span-2 px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
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
            {loading ? 'Adding...' : 'Add Employee'}
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
