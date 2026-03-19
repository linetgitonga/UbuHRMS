'use client';

import { useAuth } from '@/lib/auth-context';
import { Bell, User, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export function Header() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useState(() => setMounted(true), []);

  return (
    <header className="hidden md:flex md:ml-64 sticky top-0 z-40 bg-background border-b border-border h-16 items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Welcome, {user?.username || 'User'}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <Bell size={20} className="text-foreground" />
        </button>

        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-foreground" />
            ) : (
              <Moon size={20} className="text-foreground" />
            )}
          </button>
        )}

        <button className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg transition-colors">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User size={16} className="text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground">{user?.username || 'Profile'}</span>
        </button>
      </div>
    </header>
  );
}
