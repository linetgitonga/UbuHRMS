'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  Clock,
  DollarSign,
  Smartphone,
  BarChart3,
  Target,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
  { href: '/employees', label: 'Employees', icon: <Users size={20} /> },
  { href: '/attendance', label: 'Attendance', icon: <Clock size={20} /> },
  { href: '/payroll', label: 'Payroll', icon: <DollarSign size={20} /> },
  { href: '/devices', label: 'Devices', icon: <Smartphone size={20} /> },
  { href: '/reports', label: 'Reports', icon: <BarChart3 size={20} /> },
  { href: '/kpis', label: 'KPIs', icon: <Target size={20} /> },
  { href: '/leaves', label: 'Leaves', icon: <Calendar size={20} /> },
  { href: '/contracts', label: 'Contracts', icon: <FileText size={20} /> },
  { href: '/settings', label: 'Settings', icon: <Settings size={20} /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => pathname.startsWith(href);

  const NavContent = () => (
    <>
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">U</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-sidebar-foreground">Ubuntu HRMS</h1>
            <p className="text-xs text-sidebar-foreground/60">HR Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors">
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-primary text-primary-foreground rounded-lg"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border h-screen fixed left-0 top-0">
        <NavContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50">
          <div className="flex flex-col w-64 bg-sidebar h-screen border-r border-sidebar-border">
            <NavContent />
          </div>
        </div>
      )}
    </>
  );
}
