'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Calendar, Clock } from 'lucide-react';

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!formData.date) {
        setAvailableSlots([]);
        return;
      }

      try {
        const response = await fetch(`/api/appointments/available-slots?date=${formData.date}`);
        const data = await response.json();

        if (data.success) {
          setAvailableSlots(data.data.slots || []);
        } else {
          setAvailableSlots([]);
        }
      } catch (error) {
        console.error('Failed to fetch available slots:', error);
        setAvailableSlots([]);
      }
    };

    fetchAvailableSlots();
  }, [formData.date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage('Appointment booked successfully! We will confirm your appointment shortly.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          reason: '',
        });
      } else {
        setSubmitMessage(data.error || 'Failed to book appointment. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 font-display">Book an Appointment</h1>
          <p className="text-gray-600 text-lg">
            Fill out the form below to schedule your appointment. We&apos;ll confirm your booking shortly.
          </p>
        </div>

        <Card>
          {/* Important Notice */}
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Patient Registration Required</h3>
                <p className="mt-1 text-sm text-blue-700">
                  You must be registered as a patient before booking an appointment. 
                  Please contact the clinic to register first, or use the email and name 
                  associated with your patient record.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-bold mb-4 font-display">Patient Information</h2>
              <p className="text-sm text-gray-600 mb-4">
                Enter the exact information associated with your patient record.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    minLength={1}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Full name as registered in patient record"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Optional - Email used for patient registration"
                />
                <p className="text-xs text-gray-500 mt-1">Optional - If registered with email, provide it here</p>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Contact phone number"
                />
              </div>
            </div>

            {/* Appointment Details */}
            <div>
              <h2 className="text-xl font-bold mb-4 font-display">Appointment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    min={minDate}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Time *
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    disabled={!formData.date}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Select a time</option>
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Visit *
              </label>
              <textarea
                id="reason"
                name="reason"
                required
                rows={4}
                value={formData.reason}
                onChange={handleChange}
                placeholder="Please describe the reason for your appointment..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {submitMessage && (
              <div className={`p-4 rounded-lg ${
                submitMessage.includes('successfully') 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {submitMessage}
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
              {isSubmitting ? 'Booking Appointment...' : 'Book Appointment'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

