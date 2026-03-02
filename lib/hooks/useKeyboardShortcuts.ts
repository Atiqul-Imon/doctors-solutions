import { useEffect, useCallback } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  description: string;
  action: () => void;
  category?: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled = true) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Don't trigger shortcuts when typing in inputs, textareas, or contenteditable
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Exception: Allow Escape key
        if (event.key !== 'Escape') {
          return;
        }
      }

      for (const shortcut of shortcuts) {
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatches = shortcut.ctrlKey ? event.ctrlKey : !event.ctrlKey;
        const shiftMatches = shortcut.shiftKey ? event.shiftKey : !event.shiftKey;
        const altMatches = shortcut.altKey ? event.altKey : !event.altKey;
        const metaMatches = shortcut.metaKey ? event.metaKey : !event.metaKey;

        if (keyMatches && ctrlMatches && shiftMatches && altMatches && metaMatches) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, enabled]);
}

// Global shortcuts hook with common actions
export function useGlobalShortcuts({
  onSearchOpen,
  onNewPrescription,
  onNewPatient,
  onTodayAppointments,
  onDashboard,
  onHelp,
}: {
  onSearchOpen?: () => void;
  onNewPrescription?: () => void;
  onNewPatient?: () => void;
  onTodayAppointments?: () => void;
  onDashboard?: () => void;
  onHelp?: () => void;
}) {
  const shortcuts: KeyboardShortcut[] = [
    // Search
    {
      key: 'k',
      ctrlKey: true,
      description: 'Open global search',
      action: () => onSearchOpen?.(),
      category: 'Navigation',
    },
    {
      key: 'k',
      metaKey: true,
      description: 'Open global search (Mac)',
      action: () => onSearchOpen?.(),
      category: 'Navigation',
    },
    // New Prescription
    {
      key: 'n',
      ctrlKey: true,
      description: 'New prescription',
      action: () => onNewPrescription?.(),
      category: 'Actions',
    },
    {
      key: 'n',
      metaKey: true,
      description: 'New prescription (Mac)',
      action: () => onNewPrescription?.(),
      category: 'Actions',
    },
    // New Patient
    {
      key: 'p',
      ctrlKey: true,
      description: 'New patient',
      action: () => onNewPatient?.(),
      category: 'Actions',
    },
    {
      key: 'p',
      metaKey: true,
      description: 'New patient (Mac)',
      action: () => onNewPatient?.(),
      category: 'Actions',
    },
    // Today's Appointments
    {
      key: 't',
      ctrlKey: true,
      description: "Go to today's appointments",
      action: () => onTodayAppointments?.(),
      category: 'Navigation',
    },
    {
      key: 't',
      metaKey: true,
      description: "Go to today's appointments (Mac)",
      action: () => onTodayAppointments?.(),
      category: 'Navigation',
    },
    // Dashboard
    {
      key: 'd',
      ctrlKey: true,
      description: 'Go to dashboard',
      action: () => onDashboard?.(),
      category: 'Navigation',
    },
    {
      key: 'd',
      metaKey: true,
      description: 'Go to dashboard (Mac)',
      action: () => onDashboard?.(),
      category: 'Navigation',
    },
    // Help
    {
      key: '?',
      description: 'Show keyboard shortcuts',
      action: () => onHelp?.(),
      category: 'Help',
    },
  ];

  useKeyboardShortcuts(shortcuts);
}

// Utility to format shortcut for display
export function formatShortcut(shortcut: KeyboardShortcut): string {
  const keys: string[] = [];
  
  // Check if Mac or Windows/Linux
  const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  
  if (shortcut.ctrlKey) keys.push(isMac ? '⌘' : 'Ctrl');
  if (shortcut.metaKey) keys.push('⌘');
  if (shortcut.shiftKey) keys.push('Shift');
  if (shortcut.altKey) keys.push(isMac ? '⌥' : 'Alt');
  
  keys.push(shortcut.key.toUpperCase());
  
  return keys.join(isMac ? '' : '+');
}
