'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from 'next-themes';
import { Moon, Sun, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: '',
    department: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  if (!mounted) return null;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-6 bg-background min-h-screen">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
              <p className="text-muted-foreground">Manage your account and system preferences</p>
            </div>

            {/* Profile Section */}
            <div className="bg-card border border-border rounded-lg p-8 mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Profile Information</h2>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-2xl font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{user?.username}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="your.email@ubuntu.local"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    value={profileData.department}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        department: e.target.value,
                      }))
                    }
                    placeholder="Your department"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  type="button"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>

            {/* Appearance Section */}
            <div className="bg-card border border-border rounded-lg p-8 mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Appearance</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Theme</p>
                    <p className="text-sm text-muted-foreground">
                      Choose between light and dark mode
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        theme === 'light'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-foreground hover:bg-secondary/90'
                      }`}
                    >
                      <Sun size={18} />
                      Light
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-foreground hover:bg-secondary/90'
                      }`}
                    >
                      <Moon size={18} />
                      Dark
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-card border border-border rounded-lg p-8 mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Security</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Change Password
                  </label>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current password"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="password"
                      placeholder="New password"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Section */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Session</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Logout</p>
                  <p className="text-sm text-muted-foreground">
                    Sign out of your Ubuntu HRMS account
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-2 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
