'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  email?: string;
  phone: string;
  age: number | null;
  gender: string;
}

interface TodayAppointment {
  _id: string;
  time: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  reason: string;
  patient: Patient | null;
}

export default function TodaySchedule() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<TodayAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTodayAppointments = useCallback(async (showRefreshing = false) => {
    try {
      if (showRefreshing) setRefreshing(true);
      else setLoading(true);

      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch('/api/appointments/today', {
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
      console.error('Failed to fetch today&apos;s appointments:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTodayAppointments();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchTodayAppointments(true);
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchTodayAppointments]);

  const handleViewPatient = (patientId: string) => {
    router.push(`/dashboard/patients/${patientId}`);
  };

  const handleStartConsultation = (patientId: string) => {
    router.push(`/dashboard/patients/${patientId}?mode=quick`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (time: string) => {
    try {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-display">Today&apos;s Schedule</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-primary-600" />
          <div>
            <h2 className="text-xl font-bold font-display">Today&apos;s Schedule</h2>
            <p className="text-sm text-gray-600">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">
            {appointments.length} {appointments.length === 1 ? 'appointment' : 'appointments'}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => fetchTodayAppointments(true)}
            disabled={refreshing}
            className="!p-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">No appointments scheduled for today</p>
          <p className="text-sm text-gray-500">Enjoy your day off!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Time and Status */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary-600" />
                      <span className="font-bold text-lg">
                        {formatTime(appointment.time)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(appointment.status)}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Patient Info */}
                  {appointment.patient && (
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="font-semibold text-gray-900">
                          {appointment.patient.name}
                        </span>
                        {appointment.patient.age && (
                          <span className="text-sm text-gray-600">
                            ({appointment.patient.age}
                            {appointment.patient.gender && 
                              `, ${appointment.patient.gender.charAt(0).toUpperCase()}`
                            })
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{appointment.patient.phone}</span>
                      </div>
                    </div>
                  )}

                  {/* Reason */}
                  <div className="bg-gray-50 rounded-md p-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Reason:</span> {appointment.reason}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                {appointment.patient && appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleStartConsultation(appointment.patient!.id)}
                      className="whitespace-nowrap"
                    >
                      Start
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewPatient(appointment.patient!.id)}
                      className="whitespace-nowrap"
                    >
                      View History
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      {appointments.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {appointments.filter((a) => a.status === 'pending').length}
              </div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {appointments.filter((a) => a.status === 'confirmed').length}
              </div>
              <div className="text-xs text-gray-600">Confirmed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {appointments.filter((a) => a.status === 'completed').length}
              </div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {appointments.filter((a) => a.status === 'cancelled').length}
              </div>
              <div className="text-xs text-gray-600">Cancelled</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
