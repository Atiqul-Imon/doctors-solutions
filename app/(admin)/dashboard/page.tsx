'use client';

import { useState, useEffect, useCallback } from 'react';
import Card from '@/components/ui/Card';
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    totalPatients: 0,
    todayAppointments: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStats((prevStats) => data.data.stats || prevStats);
          setRecentAppointments(data.data.recentAppointments || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const statCards = [
    {
      title: 'Total Appointments',
      value: stats.totalAppointments,
      icon: <Calendar className="w-8 h-8 text-primary-600" />,
      color: 'bg-blue-50',
    },
    {
      title: 'Pending',
      value: stats.pendingAppointments,
      icon: <Clock className="w-8 h-8 text-yellow-600" />,
      color: 'bg-yellow-50',
    },
    {
      title: 'Confirmed',
      value: stats.confirmedAppointments,
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50',
    },
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: <Users className="w-8 h-8 text-purple-600" />,
      color: 'bg-purple-50',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your practice</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <Card key={index} className={`${stat.color} border-0`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div>{stat.icon}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Recent Appointments */}
          <Card>
            <h2 className="text-2xl font-bold mb-6 font-display">Recent Appointments</h2>
            {recentAppointments.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No recent appointments</p>
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
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentAppointments.map((appointment) => (
                      <tr key={appointment._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          {appointment.patientId?.firstName} {appointment.patientId?.lastName}
                        </td>
                        <td className="px-4 py-3">
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">{appointment.time}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              appointment.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : appointment.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : appointment.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

