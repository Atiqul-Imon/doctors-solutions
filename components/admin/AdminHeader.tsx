'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, User, LogOut, Menu } from 'lucide-react';
import GlobalSearch from '@/components/common/GlobalSearch';

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
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 shadow-sm will-change-transform">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Menu toggle for mobile */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {onMenuToggle && (
              <button
                onClick={onMenuToggle}
                className="lg:hidden text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors flex-shrink-0"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            )}
            
            {/* Global Search Bar */}
            <div className="hidden md:block flex-1 min-w-0">
              <GlobalSearch />
            </div>
          </div>

          {/* Right: User actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
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
              
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
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
        
        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <GlobalSearch />
        </div>
      </div>
    </header>
  );
}

