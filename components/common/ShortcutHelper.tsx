'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import { X, Keyboard, Search, FileText, UserPlus, Calendar, Home } from 'lucide-react';

interface ShortcutItem {
  icon: React.ReactNode;
  keys: string;
  description: string;
  category: string;
}

interface ShortcutHelperProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShortcutHelper({ isOpen, onClose }: ShortcutHelperProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Detect operating system
  const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const modKey = isMac ? '⌘' : 'Ctrl';

  const shortcuts: ShortcutItem[] = [
    // Navigation
    {
      icon: <Search className="w-5 h-5" />,
      keys: `${modKey}+K`,
      description: 'Open global search',
      category: 'Navigation',
    },
    {
      icon: <Home className="w-5 h-5" />,
      keys: `${modKey}+D`,
      description: 'Go to dashboard',
      category: 'Navigation',
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      keys: `${modKey}+T`,
      description: "Go to today's appointments",
      category: 'Navigation',
    },

    // Actions
    {
      icon: <FileText className="w-5 h-5" />,
      keys: `${modKey}+N`,
      description: 'New prescription',
      category: 'Actions',
    },
    {
      icon: <UserPlus className="w-5 h-5" />,
      keys: `${modKey}+P`,
      description: 'New patient',
      category: 'Actions',
    },

    // General
    {
      icon: <X className="w-5 h-5" />,
      keys: 'Esc',
      description: 'Close modal/panel',
      category: 'General',
    },
    {
      icon: <Keyboard className="w-5 h-5" />,
      keys: '?',
      description: 'Show this help',
      category: 'General',
    },
  ];

  const categories = Array.from(new Set(shortcuts.map((s) => s.category)));

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Keyboard className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">Keyboard Shortcuts</h2>
                  <p className="text-sm text-primary-100 mt-1">
                    Work faster with keyboard shortcuts
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
            {categories.map((category) => (
              <div key={category} className="mb-6 last:mb-0">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {category}
                </h3>
                <div className="space-y-2">
                  {shortcuts
                    .filter((s) => s.category === category)
                    .map((shortcut, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-primary-600">{shortcut.icon}</div>
                          <span className="text-gray-700">{shortcut.description}</span>
                        </div>
                        <kbd className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded-md font-mono text-sm font-semibold text-gray-800 shadow-sm">
                          {shortcut.keys}
                        </kbd>
                      </div>
                    ))}
                </div>
              </div>
            ))}

            {/* Tips Section */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2">💡 Pro Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Shortcuts work from any page except when typing in input fields</li>
                <li>• Press <kbd className="px-2 py-0.5 bg-white rounded text-xs font-mono">?</kbd> anytime to see this help</li>
                <li>• Use <kbd className="px-2 py-0.5 bg-white rounded text-xs font-mono">Esc</kbd> to close modals and panels quickly</li>
                <li>• {isMac ? '⌘ (Command)' : 'Ctrl'} shortcuts save you time during busy chamber hours</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono">Esc</kbd> to close
              </p>
              <Button variant="primary" onClick={onClose}>
                Got it!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
