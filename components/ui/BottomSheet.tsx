'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useDevice } from '@/lib/hooks/useDevice';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  maxHeight?: string;
  fullScreen?: boolean;
}

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  maxHeight = '90vh',
  fullScreen = false,
}: BottomSheetProps) {
  const { isMobile, isTablet } = useDevice();
  const sheetRef = useRef<HTMLDivElement>(null);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Use bottom sheet only on mobile/tablet, regular modal on desktop
  const useBottomSheet = isMobile || isTablet;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle swipe down to close
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!useBottomSheet) return;
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!useBottomSheet || !isDragging) return;
    const currentTouchY = e.touches[0].clientY;
    const diff = currentTouchY - startY;
    
    // Only allow dragging down
    if (diff > 0) {
      setCurrentY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (!useBottomSheet) return;
    setIsDragging(false);
    
    // If dragged more than 100px, close
    if (currentY > 100) {
      onClose();
    }
    
    setCurrentY(0);
  };

  if (!isOpen) return null;

  // Desktop modal style
  if (!useBottomSheet) {
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                {title && <h2 className="text-xl font-bold">{title}</h2>}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto" style={{ maxHeight: maxHeight }}>
              {children}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Mobile/Tablet bottom sheet style
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-50 transition-opacity ${
          isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white transform transition-transform duration-300 ${
          fullScreen ? 'top-0 rounded-none' : 'rounded-t-3xl'
        } ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        style={{
          transform: isDragging ? `translateY(${currentY}px)` : undefined,
          maxHeight: fullScreen ? '100vh' : maxHeight,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <div className="flex justify-center py-3 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-200">
            {title && <h2 className="text-xl font-bold">{title}</h2>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div
          className="overflow-y-auto overscroll-contain"
          style={{
            maxHeight: fullScreen
              ? 'calc(100vh - 100px)'
              : `calc(${maxHeight} - 100px)`,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
