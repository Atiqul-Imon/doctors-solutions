'use client';

import { cn } from '@/lib/utils/cn';
import { Clock, Users } from 'lucide-react';

export interface TimeSlot {
  time: string;
  available: boolean;
  booked: number;
  capacity: number;
}

interface TimeSlotGridProps {
  slots: TimeSlot[];
  selectedSlot?: string | null;
  onSlotSelect: (time: string) => void;
  loading?: boolean;
  className?: string;
}

export default function TimeSlotGrid({
  slots,
  selectedSlot,
  onSlotSelect,
  loading = false,
  className,
}: TimeSlotGridProps) {
  const groupSlotsByPeriod = (slots: TimeSlot[]) => {
    const morning: TimeSlot[] = [];
    const afternoon: TimeSlot[] = [];
    const evening: TimeSlot[] = [];

    slots.forEach(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      const isPM = slot.time.toLowerCase().includes('pm');
      const hour24 = isPM && hour !== 12 ? hour + 12 : hour;

      if (hour24 < 12) {
        morning.push(slot);
      } else if (hour24 < 17) {
        afternoon.push(slot);
      } else {
        evening.push(slot);
      }
    });

    return { morning, afternoon, evening };
  };

  const { morning, afternoon, evening } = groupSlotsByPeriod(slots);

  const getSlotStatus = (slot: TimeSlot) => {
    if (!slot.available) return 'full';
    const remaining = slot.capacity - slot.booked;
    if (remaining === slot.capacity) return 'open';
    if (remaining <= 2) return 'limited';
    return 'open';
  };

  const getSlotColor = (slot: TimeSlot, isSelected: boolean) => {
    if (isSelected) {
      return 'bg-primary-600 text-white border-primary-600 hover:bg-primary-700';
    }

    const status = getSlotStatus(slot);
    switch (status) {
      case 'full':
        return 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed';
      case 'limited':
        return 'bg-yellow-50 text-yellow-900 border-yellow-300 hover:bg-yellow-100';
      case 'open':
      default:
        return 'bg-white text-gray-900 border-gray-300 hover:bg-primary-50 hover:border-primary-500';
    }
  };

  const SlotButton = ({ slot }: { slot: TimeSlot }) => {
    const isSelected = selectedSlot === slot.time;
    const status = getSlotStatus(slot);
    const remaining = slot.capacity - slot.booked;

    return (
      <button
        type="button"
        onClick={() => slot.available && onSlotSelect(slot.time)}
        disabled={!slot.available}
        className={cn(
          'relative p-4 rounded-lg border-2 transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
          'min-h-[80px] flex flex-col items-center justify-center gap-2',
          getSlotColor(slot, isSelected)
        )}
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className="font-bold">{slot.time}</span>
        </div>

        {slot.available ? (
          <div className="flex items-center gap-1 text-xs">
            {status === 'limited' ? (
              <>
                <Users className="w-3 h-3" />
                <span className="font-semibold">{remaining} left</span>
              </>
            ) : (
              <span className="font-medium text-green-600">✓ Available</span>
            )}
          </div>
        ) : (
          <span className="text-xs font-medium">✗ Full</span>
        )}

        {isSelected && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
            ✓
          </div>
        )}
      </button>
    );
  };

  const PeriodSection = ({ title, slots, icon }: { title: string; slots: TimeSlot[]; icon: string }) => {
    if (slots.length === 0) return null;

    return (
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <span>{icon}</span>
          <span>{title}</span>
          <span className="text-xs font-normal text-gray-500">
            ({slots.filter(s => s.available).length} available)
          </span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {slots.map(slot => (
            <SlotButton key={slot.time} slot={slot} />
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={cn('space-y-6', className)}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading available slots...</p>
          </div>
        </div>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className={cn('text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300', className)}>
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 font-medium mb-1">No available time slots</p>
        <p className="text-sm text-gray-500">Please select a different date</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Tip:</span> Click on any available time slot to select. 
          Green means fully available, yellow means limited slots remaining.
        </p>
      </div>

      <PeriodSection title="Morning Slots" slots={morning} icon="🌅" />
      <PeriodSection title="Afternoon Slots" slots={afternoon} icon="☀️" />
      <PeriodSection title="Evening Slots" slots={evening} icon="🌙" />

      {/* Summary */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-white border-2 border-gray-300"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-50 border-2 border-yellow-300"></div>
            <span>Limited slots</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-200"></div>
            <span>Fully booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary-600 border-2 border-primary-600"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
