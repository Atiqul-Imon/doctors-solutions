'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CalendarProps {
  selectedDate?: Date | null;
  onDateSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  highlightedDates?: { date: Date; color?: string; count?: number }[];
  className?: string;
}

export default function Calendar({
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
  disabledDates = [],
  highlightedDates = [],
  className,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysArray = [];

    // Add empty cells for days before month starts
    const startingDayOfWeek = firstDay.getDay();
    for (let i = 0; i < startingDayOfWeek; i++) {
      daysArray.push(null);
    }

    // Add all days in month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      daysArray.push(new Date(year, month, day));
    }

    return daysArray;
  }, [currentMonth]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    
    // Check if before min date
    if (minDate && date < minDate) return true;
    
    // Check if after max date
    if (maxDate && date > maxDate) return true;
    
    // Check if in disabled dates
    const dateStr = date.toDateString();
    return disabledDates.some(d => d.toDateString() === dateStr);
  };

  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const getDateHighlight = (date: Date | null) => {
    if (!date) return null;
    const dateStr = date.toDateString();
    return highlightedDates.find(h => h.date.toDateString() === dateStr);
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (date: Date | null) => {
    if (!date || isDateDisabled(date)) return;
    onDateSelect(date);
  };

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-4', className)}>
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <h3 className="text-lg font-bold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          type="button"
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((date, index) => {
          const disabled = isDateDisabled(date);
          const selected = isDateSelected(date);
          const highlight = getDateHighlight(date);
          const today = isToday(date);

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleDateClick(date)}
              disabled={!date || disabled}
              className={cn(
                'relative aspect-square p-2 rounded-lg text-sm font-medium transition-all duration-200',
                'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500',
                {
                  'invisible': !date,
                  'text-gray-300 cursor-not-allowed hover:bg-transparent': disabled && date,
                  'bg-primary-600 text-white hover:bg-primary-700': selected,
                  'bg-blue-50 text-blue-700 font-bold': today && !selected,
                  'text-gray-900': date && !disabled && !selected && !today,
                }
              )}
            >
              {date && (
                <>
                  <span className="relative z-10">{date.getDate()}</span>
                  
                  {/* Highlight indicator (e.g., has appointments) */}
                  {highlight && !selected && (
                    <div className={cn(
                      'absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full',
                      highlight.color || 'bg-primary-600'
                    )}>
                      {highlight.count && highlight.count > 1 && (
                        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-primary-600">
                          {highlight.count}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Today indicator ring */}
                  {today && !selected && (
                    <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none"></div>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-50 border-2 border-blue-500"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-primary-600"></div>
          <span>Selected</span>
        </div>
        {highlightedDates.length > 0 && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gray-100 relative">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary-600"></div>
            </div>
            <span>Has appointments</span>
          </div>
        )}
      </div>
    </div>
  );
}
