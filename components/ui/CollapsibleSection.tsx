'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CollapsibleSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  storageKey?: string; // For remembering state
  badge?: string | number;
  className?: string;
}

export default function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = false,
  storageKey,
  badge,
  className,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Load saved state from localStorage
  useEffect(() => {
    if (storageKey && typeof window !== 'undefined') {
      const saved = localStorage.getItem(`collapse-${storageKey}`);
      if (saved !== null) {
        setIsOpen(saved === 'true');
      }
    }
  }, [storageKey]);

  // Save state to localStorage
  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    
    if (storageKey && typeof window !== 'undefined') {
      localStorage.setItem(`collapse-${storageKey}`, String(newState));
    }
  };

  return (
    <div className={cn('border border-gray-200 rounded-lg overflow-hidden bg-white', className)}>
      {/* Header */}
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left touch-manipulation min-h-[56px]"
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary-600 flex-shrink-0">{icon}</div>}
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          {badge !== undefined && (
            <span className="px-2.5 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              {badge}
            </span>
          )}
        </div>
        <div className="flex-shrink-0 ml-2">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>

      {/* Content */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="p-4 pt-0 border-t border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}

// Collapsible Group - for multiple sections
interface CollapsibleGroupProps {
  children: React.ReactNode;
  allowMultipleOpen?: boolean;
  className?: string;
}

export function CollapsibleGroup({
  children,
  allowMultipleOpen = true,
  className,
}: CollapsibleGroupProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  );
}
