'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Users, Search, Mail, Phone, Calendar, Plus, X, Save } from 'lucide-react';

export default function PatientsPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
    bloodGroup: '',
    zilla: '',
    upazilla: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
  });

  // Debounce search term to reduce API calls (300ms delay)
  // This prevents API call on every keystroke - reduces calls by ~90%
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const params = new URLSearchParams();
      if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);

      const response = await fetch(`/api/patients?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPatients(data.data.patients || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm]); // Use debounced search term

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger immediate search by setting debounced term
    setDebouncedSearchTerm(searchTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const patientData = {
        name: formData.name,
        email: formData.email || undefined,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup || undefined,
        address: {
          zilla: formData.zilla || undefined,
          upazilla: formData.upazilla || undefined,
        },
        emergencyContact: formData.emergencyName ? {
          name: formData.emergencyName,
          relationship: formData.emergencyRelationship || undefined,
          phone: formData.emergencyPhone,
        } : undefined,
      };

      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Patient added successfully!');
        setShowAddModal(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          gender: 'male',
          bloodGroup: '',
          zilla: '',
          upazilla: '',
          emergencyName: '',
          emergencyRelationship: '',
          emergencyPhone: '',
        });
        fetchPatients();
        // Navigate to the new patient's detail page
        router.push(`/dashboard/patients/${data.data._id}`);
      } else {
        alert(data.error || 'Failed to add patient');
      }
    } catch (error) {
      console.error('Failed to add patient:', error);
      alert('Failed to add patient. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display">Patients</h1>
          <p className="text-gray-600 mt-2">Manage all patients</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Patient
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <Button type="submit" variant="primary">
            Search
          </Button>
        </form>
      </Card>

      {/* Patients List */}
      <Card>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading patients...</p>
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No patients found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Date of Birth
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Gender
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Registered
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {patients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium">
                        {patient.name}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        {patient.email && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="w-4 h-4" />
                            {patient.email}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                          <Phone className="w-4 h-4" />
                          {patient.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {patient.dateOfBirth
                        ? new Date(patient.dateOfBirth).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-3 capitalize">{patient.gender || 'N/A'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(patient.registeredAt || patient.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => router.push(`/dashboard/patients/${patient._id}`)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-display">Add New Patient</h2>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    dateOfBirth: '',
                    gender: 'male',
                    bloodGroup: '',
                    zilla: '',
                    upazilla: '',
                    emergencyName: '',
                    emergencyRelationship: '',
                    emergencyPhone: '',
                  });
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      minLength={1}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium mb-1">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bloodGroup" className="block text-sm font-medium mb-1">
                      Blood Group
                    </label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Address (Bangladesh)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zilla" className="block text-sm font-medium mb-1">
                      Zilla (District)
                    </label>
                    <input
                      type="text"
                      id="zilla"
                      name="zilla"
                      value={formData.zilla}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Dhaka, Chittagong"
                    />
                  </div>
                  <div>
                    <label htmlFor="upazilla" className="block text-sm font-medium mb-1">
                      Upazilla (Sub-district)
                    </label>
                    <input
                      type="text"
                      id="upazilla"
                      name="upazilla"
                      value={formData.upazilla}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Gulshan, Dhanmondi"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Emergency Contact (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="emergencyName" className="block text-sm font-medium mb-1">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      id="emergencyName"
                      name="emergencyName"
                      value={formData.emergencyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="emergencyRelationship" className="block text-sm font-medium mb-1">
                      Relationship
                    </label>
                    <input
                      type="text"
                      id="emergencyRelationship"
                      name="emergencyRelationship"
                      value={formData.emergencyRelationship}
                      onChange={handleInputChange}
                      placeholder="e.g., Spouse, Parent, Sibling"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="emergencyPhone" className="block text-sm font-medium mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      id="emergencyPhone"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      dateOfBirth: '',
                      gender: 'male',
                      bloodGroup: '',
                      zilla: '',
                      upazilla: '',
                      emergencyName: '',
                      emergencyRelationship: '',
                      emergencyPhone: '',
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    'Adding Patient...'
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Add Patient
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

