'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Clock, Calendar, Plus, Save, X } from 'lucide-react';

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '17:00',
    isAvailable: true,
    timeSlots: [30],
    isRecurring: true,
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch('/api/schedule?isRecurring=true', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSchedules(data.data || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (day: number) => {
    const schedule = schedules.find((s) => s.dayOfWeek === day);
    if (schedule) {
      setFormData({
        dayOfWeek: schedule.dayOfWeek,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        isAvailable: schedule.isAvailable,
        timeSlots: schedule.timeSlots || [30],
        isRecurring: true,
      });
    } else {
      setFormData({
        dayOfWeek: day,
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true,
        timeSlots: [30],
        isRecurring: true,
      });
    }
    setSelectedDay(day);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setIsEditing(false);
          setSelectedDay(null);
          fetchSchedules();
        }
      }
    } catch (error) {
      console.error('Failed to save schedule:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedDay(null);
  };

  const getScheduleForDay = (day: number) => {
    return schedules.find((s) => s.dayOfWeek === day);
  };

  const getTimeSlotLabel = (slot: number) => {
    return `${slot} min`;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display">Schedule Management</h1>
        <p className="text-gray-600 mt-2">Manage your weekly appointment schedule</p>
      </div>

      {/* Weekly Schedule */}
      <Card>
        <div className="space-y-4">
          {DAYS_OF_WEEK.map((day) => {
            const schedule = getScheduleForDay(day.value);
            const isSelected = selectedDay === day.value && isEditing;

            return (
              <div
                key={day.value}
                className={`border rounded-lg p-4 ${
                  isSelected ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold font-display">{day.label}</h3>
                  {!isEditing && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(day.value)}
                    >
                      <Clock className="w-4 h-4 inline mr-1" />
                      {schedule ? 'Edit' : 'Add Schedule'}
                    </Button>
                  )}
                </div>

                {isSelected ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={formData.startTime}
                          onChange={(e) =>
                            setFormData({ ...formData, startTime: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={formData.endTime}
                          onChange={(e) =>
                            setFormData({ ...formData, endTime: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.isAvailable}
                          onChange={(e) =>
                            setFormData({ ...formData, isAvailable: e.target.checked })
                          }
                          className="mr-2"
                        />
                        Available on this day
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} variant="primary">
                        <Save className="w-4 h-4 inline mr-1" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} variant="secondary">
                        <X className="w-4 h-4 inline mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : schedule ? (
                  <div className="text-gray-600">
                    {schedule.isAvailable ? (
                      <div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-primary-600" />
                          <span>
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        </div>
                        {schedule.timeSlots && schedule.timeSlots.length > 0 && (
                          <div className="mt-2 text-sm">
                            Slot Duration: {schedule.timeSlots.join(', ')} minutes
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-red-600">Not available</span>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-400 italic">No schedule set</div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading schedule...</p>
        </div>
      )}
    </div>
  );
}

