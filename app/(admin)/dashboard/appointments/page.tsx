'use client';

import { useState, useEffect, useCallback } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Calendar, Clock, Search } from 'lucide-react';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'today' | 'tomorrow' | 'week' | 'all'>('today');
  const [filters, setFilters] = useState({
    status: '',
    date: new Date().toISOString().split('T')[0], // Auto-set to today
  });

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.date) params.append('date', filters.date);

      const response = await fetch(`/api/appointments?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAppointments(data.data.appointments || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchAppointments();
      }
    } catch (error) {
      console.error('Failed to update appointment:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleQuickFilter = (filter: 'today' | 'tomorrow' | 'week' | 'all') => {
    setActiveFilter(filter);
    const today = new Date();
    let newDate = '';

    switch (filter) {
      case 'today':
        newDate = today.toISOString().split('T')[0];
        break;
      case 'tomorrow':
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        newDate = tomorrow.toISOString().split('T')[0];
        break;
      case 'week':
        // For week, we'll clear the date filter to show all in range
        newDate = '';
        break;
      case 'all':
        newDate = '';
        break;
    }

    setFilters({ ...filters, date: newDate });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display">Appointments</h1>
        <p className="text-gray-600 mt-2">Manage all appointments</p>
      </div>

      {/* Quick Date Filters */}
      <Card className="mb-6 p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={activeFilter === 'today' ? 'primary' : 'outline'}
            onClick={() => handleQuickFilter('today')}
            size="sm"
            className="font-semibold"
          >
            TODAY
          </Button>
          <Button
            variant={activeFilter === 'tomorrow' ? 'primary' : 'outline'}
            onClick={() => handleQuickFilter('tomorrow')}
            size="sm"
          >
            TOMORROW
          </Button>
          <Button
            variant={activeFilter === 'week' ? 'primary' : 'outline'}
            onClick={() => handleQuickFilter('week')}
            size="sm"
          >
            THIS WEEK
          </Button>
          <Button
            variant={activeFilter === 'all' ? 'primary' : 'outline'}
            onClick={() => handleQuickFilter('all')}
            size="sm"
          >
            ALL
          </Button>
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specific Date
            </label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => {
                setFilters({ ...filters, date: e.target.value });
                setActiveFilter('all');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={fetchAppointments}
              variant="outline"
              className="w-full"
            >
              <Search className="w-4 h-4 inline mr-2" />
              Search
            </Button>
          </div>
        </div>
      </Card>

      {/* Appointments Table */}
      <Card>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No appointments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Patient
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Reason
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {appointments.map((appointment) => (
                  <tr key={appointment._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">
                          {appointment.patientId?.firstName} {appointment.patientId?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{appointment.patientId?.email}</div>
                        <div className="text-sm text-gray-500">{appointment.patientId?.phone}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(appointment.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{appointment.time}</td>
                    <td className="px-4 py-3 text-sm">{appointment.reason}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {appointment.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => updateAppointmentStatus(appointment._id, 'confirmed')}
                            >
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => updateAppointmentStatus(appointment._id, 'cancelled')}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {appointment.status === 'confirmed' && (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => updateAppointmentStatus(appointment._id, 'completed')}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

