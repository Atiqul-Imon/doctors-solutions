'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Search, User, LogOut, Menu, X } from 'lucide-react';

export default function AdminHeader({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Menu toggle for mobile */}
          <div className="flex items-center gap-4">
            {onMenuToggle && (
              <button
                onClick={onMenuToggle}
                className="lg:hidden text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            )}
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 min-w-[300px]">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments, patients..."
                className="bg-transparent border-none outline-none text-sm flex-1 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right: User actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User dropdown */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {user?.email?.split('@')[0] || 'Admin'}
                </div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
              
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                {user?.email?.[0]?.toUpperCase() || 'A'}
              </div>
              
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

