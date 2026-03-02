'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Clock, 
  Settings, 
  LogOut,
  Menu,
  X,
  FileCheck,
  Keyboard
} from 'lucide-react';
import AdminHeader from './AdminHeader';
import ShortcutHelper from '@/components/common/ShortcutHelper';
import { useGlobalShortcuts } from '@/lib/hooks/useKeyboardShortcuts';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showShortcutHelper, setShowShortcutHelper] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Global keyboard shortcuts
  useGlobalShortcuts({
    onSearchOpen: () => {
      // Trigger the search in header
      const searchInput = document.querySelector('[data-search-trigger]') as HTMLElement;
      if (searchInput) {
        searchInput.click();
      }
    },
    onNewPrescription: () => {
      // This would typically open a prescription modal
      // For now, navigate to prescription templates
      router.push('/dashboard/prescription-templates');
    },
    onNewPatient: () => {
      router.push('/dashboard/patients/new');
    },
    onTodayAppointments: () => {
      router.push('/dashboard/appointments');
    },
    onDashboard: () => {
      router.push('/dashboard');
    },
    onHelp: () => {
      setShowShortcutHelper(true);
    },
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    if (userData.role !== 'admin') {
      router.push('/');
      return;
    }

    setUser(userData);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/appointments', label: 'Appointments', icon: Calendar },
    { href: '/dashboard/patients', label: 'Patients', icon: Users },
    { href: '/dashboard/prescription-templates', label: 'Prescription Templates', icon: FileCheck },
    { href: '/dashboard/schedule', label: 'Schedule', icon: Clock },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-40 transition-transform ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 w-64`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="bg-primary-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">D</span>
            </div>
            <div>
              <h1 className="text-lg font-bold font-display">Admin Panel</h1>
              <p className="text-xs text-gray-400">Medical Practice</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          {/* Keyboard Shortcuts Button */}
          <button
            onClick={() => setShowShortcutHelper(true)}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors mb-2"
          >
            <Keyboard size={20} />
            <span className="font-medium">Shortcuts</span>
            <kbd className="ml-auto px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-xs">
              ?
            </kbd>
          </button>

          <div className="px-4 py-2 mb-2">
            <div className="text-xs text-gray-400">Logged in as</div>
            <div className="text-sm text-white font-medium truncate">
              {user?.email || 'Admin'}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="lg:ml-64">
        {/* Admin Header */}
        <AdminHeader onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />

        {/* Page content */}
        <main className="p-4 lg:p-6 min-h-screen">{children}</main>
      </div>

      {/* Keyboard Shortcuts Helper */}
      <ShortcutHelper
        isOpen={showShortcutHelper}
        onClose={() => setShowShortcutHelper(false)}
      />
    </div>
  );
}

