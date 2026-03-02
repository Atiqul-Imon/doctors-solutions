'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { QueueSkeleton } from '@/components/ui/Skeleton';
import {
  Users,
  UserCheck,
  Stethoscope,
  CheckCircle,
  Clock,
  ArrowRight,
  SkipForward,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

interface QueueData {
  waiting: any[];
  arrived: any[];
  inConsultation: any[];
  completed: any[];
  pending: any[];
}

export default function PatientQueue() {
  const router = useRouter();
  const [queue, setQueue] = useState<QueueData>({
    waiting: [],
    arrived: [],
    inConsultation: [],
    completed: [],
    pending: [],
  });
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchQueue();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchQueue();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchQueue = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch('/api/appointments/queue', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setQueue(data.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch queue:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, action: string) => {
    try {
      setUpdatingId(appointmentId);
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch('/api/appointments/queue', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appointmentId, action }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Refresh queue
          await fetchQueue();
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCallNext = () => {
    // Get the first patient in arrived queue
    if (queue.arrived.length > 0) {
      const nextPatient = queue.arrived[0];
      updateAppointmentStatus(nextPatient._id, 'start_consultation');
    }
  };

  const handleSkip = (appointmentId: string) => {
    if (confirm('Skip this patient? They will be moved to the end of the queue.')) {
      updateAppointmentStatus(appointmentId, 'skip');
    }
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return null;
    const age = Math.floor(
      (Date.now() - new Date(dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    );
    return age;
  };

  if (loading) {
    return <QueueSkeleton />;
  }

  const totalInQueue = queue.waiting.length + queue.arrived.length + queue.inConsultation.length;

  return (
    <div className="space-y-4">
      {/* Header & Stats */}
      <Card className="bg-gradient-to-r from-primary-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-6 h-6 text-primary-600" />
              Waiting Room
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {totalInQueue} patients in queue today
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{queue.arrived.length}</p>
              <p className="text-xs text-gray-600">Waiting</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{queue.inConsultation.length}</p>
              <p className="text-xs text-gray-600">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">{queue.completed.length}</p>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={fetchQueue}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </Card>

      {/* Call Next Button */}
      {queue.arrived.length > 0 && queue.inConsultation.length === 0 && (
        <Card className="bg-green-50 border-2 border-green-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">Next patient is ready!</p>
                <p className="text-sm text-green-700">
                  {queue.arrived[0].patientId?.name} has been waiting for{' '}
                  {queue.arrived[0].waitTime} minutes
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleCallNext}
              disabled={updatingId !== null}
              className="bg-green-600 hover:bg-green-700"
            >
              <UserCheck className="w-5 h-5 mr-2" />
              Call Next Patient
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Arrived & Waiting */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <UserCheck className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-lg">
              Arrived & Waiting ({queue.arrived.length})
            </h3>
          </div>
          {queue.arrived.length === 0 ? (
            <p className="text-gray-500 text-center py-8 text-sm">
              No patients waiting
            </p>
          ) : (
            <div className="space-y-3">
              {queue.arrived.map((appointment: any, index: number) => (
                <div
                  key={appointment._id}
                  className="border-2 border-blue-200 bg-blue-50 rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded">
                          #{index + 1}
                        </span>
                        <h4 className="font-bold text-gray-900">
                          {appointment.patientId?.name}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {calculateAge(appointment.patientId?.dateOfBirth)}Y
                        {appointment.patientId?.bloodGroup && 
                          ` • ${appointment.patientId.bloodGroup}`
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-orange-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        {appointment.waitTime}m
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 mb-3">
                    <p>Scheduled: {formatTime(appointment.appointmentTime)}</p>
                    <p className="line-clamp-1">Reason: {appointment.reason}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => updateAppointmentStatus(appointment._id, 'start_consultation')}
                      disabled={updatingId === appointment._id}
                      className="flex-1"
                    >
                      <Stethoscope className="w-3.5 h-3.5 mr-1" />
                      Start
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSkip(appointment._id)}
                      disabled={updatingId === appointment._id}
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`/dashboard/patients/${appointment.patientId._id}?mode=quick`)}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* In Consultation */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="w-5 h-5 text-green-600" />
            <h3 className="font-bold text-lg">
              In Consultation ({queue.inConsultation.length})
            </h3>
          </div>
          {queue.inConsultation.length === 0 ? (
            <p className="text-gray-500 text-center py-8 text-sm">
              No ongoing consultations
            </p>
          ) : (
            <div className="space-y-3">
              {queue.inConsultation.map((appointment: any) => (
                <div
                  key={appointment._id}
                  className="border-2 border-green-200 bg-green-50 rounded-lg p-3"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {appointment.patientId?.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {calculateAge(appointment.patientId?.dateOfBirth)}Y
                        {appointment.patientId?.bloodGroup && 
                          ` • ${appointment.patientId.bloodGroup}`
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        {appointment.consultationDuration}m
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 mb-3">
                    <p className="line-clamp-1">Reason: {appointment.reason}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => updateAppointmentStatus(appointment._id, 'end_consultation')}
                      disabled={updatingId === appointment._id}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-3.5 h-3.5 mr-1" />
                      Complete
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`/dashboard/patients/${appointment.patientId._id}?mode=quick`)}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Not Yet Arrived */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-lg">
              Not Yet Arrived ({queue.waiting.length + queue.pending.length})
            </h3>
          </div>
          {queue.waiting.length === 0 && queue.pending.length === 0 ? (
            <p className="text-gray-500 text-center py-8 text-sm">
              All patients have arrived
            </p>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {[...queue.waiting, ...queue.pending].map((appointment: any) => (
                <div
                  key={appointment._id}
                  className="border border-gray-300 bg-gray-50 rounded-lg p-3 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {appointment.patientId?.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {formatTime(appointment.appointmentTime)}
                        {appointment.status === 'pending' && (
                          <span className="ml-2 text-yellow-600 font-semibold">
                            (Pending)
                          </span>
                        )}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateAppointmentStatus(appointment._id, 'mark_arrived')}
                      disabled={updatingId === appointment._id}
                    >
                      <UserCheck className="w-3.5 h-3.5 mr-1" />
                      Mark Arrived
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-1">
                    {appointment.reason}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Completed Today */}
      {queue.completed.length > 0 && (
        <Card className="bg-gray-50">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold">
              Completed Today ({queue.completed.length})
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {queue.completed.slice(0, 12).map((appointment: any) => (
              <div
                key={appointment._id}
                className="text-sm p-2 bg-white border border-gray-200 rounded"
              >
                <p className="font-semibold text-gray-700 truncate">
                  {appointment.patientId?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatTime(appointment.appointmentTime)}
                </p>
              </div>
            ))}
          </div>
          {queue.completed.length > 12 && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              + {queue.completed.length - 12} more completed
            </p>
          )}
        </Card>
      )}
    </div>
  );
}
