'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { DataTable } from '@/components/data-table';
import { Plus, RefreshCw } from 'lucide-react';
import { api } from '@/lib/api';

interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'online' | 'offline';
  lastSync: string;
  employeeCount: number;
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await api.get('/devices');
      setDevices(response.data || []);
    } catch (error) {
      console.error('Failed to fetch devices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async (deviceId: string) => {
    try {
      await api.post(`/devices/${deviceId}/sync`);
      fetchDevices();
    } catch (error) {
      console.error('Failed to sync device:', error);
    }
  };

  if (!mounted) return null;

  const columns = [
    { header: 'Device Name', accessor: 'name' as const },
    { header: 'Type', accessor: 'type' as const },
    { header: 'Location', accessor: 'location' as const },
    {
      header: 'Status',
      accessor: 'status' as const,
      render: (val: string) => (
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              val === 'online' ? 'bg-primary' : 'bg-destructive'
            }`}
          />
          <span className="text-sm">
            {val === 'online' ? 'Online' : 'Offline'}
          </span>
        </div>
      ),
    },
    { header: 'Last Sync', accessor: 'lastSync' as const },
    { header: 'Employees Synced', accessor: 'employeeCount' as const },
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
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Biometric Devices
                </h1>
                <p className="text-muted-foreground">Monitor and manage all biometric devices</p>
              </div>
              <button
                onClick={fetchDevices}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw size={20} />
                Refresh
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Devices</p>
                <p className="text-3xl font-bold text-foreground">12</p>
                <p className="text-xs text-primary mt-2">All departments</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">Online</p>
                <p className="text-3xl font-bold text-foreground">11</p>
                <p className="text-xs text-primary mt-2">Ready to use</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">Offline</p>
                <p className="text-3xl font-bold text-foreground">1</p>
                <p className="text-xs text-destructive mt-2">Requires attention</p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-lg p-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-muted-foreground">Loading devices...</div>
                </div>
              ) : devices.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-muted-foreground">No devices found</div>
                </div>
              ) : (
                <DataTable columns={columns} data={devices} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
