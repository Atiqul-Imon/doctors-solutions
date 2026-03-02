'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Calendar from '@/components/appointment/Calendar';
import TimeSlotGrid, { TimeSlot } from '@/components/appointment/TimeSlotGrid';
import { Calendar as CalendarIcon, Clock, User, CheckCircle2, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

export default function BookAppointment() {
  const [currentStep, setCurrentStep] = useState(1);
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
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [monthAvailability, setMonthAvailability] = useState<Record<string, { available: boolean; count: number }>>({});
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Fetch month availability for calendar
  useEffect(() => {
    const fetchMonthAvailability = async () => {
      const date = selectedDate || new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      setLoadingMonth(true);
      try {
        const response = await fetch(`/api/appointments/availability/month?year=${year}&month=${month}`);
        const data = await response.json();

        if (data.success) {
          setMonthAvailability(data.data.availability || {});
        }
      } catch (error) {
        console.error('Failed to fetch month availability:', error);
      } finally {
        setLoadingMonth(false);
      }
    };

    fetchMonthAvailability();
  }, [selectedDate]);

  // Fetch available slots for selected date
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!formData.date) {
        setAvailableSlots([]);
        return;
      }

      setLoadingSlots(true);
      try {
        const response = await fetch(`/api/appointments/available-slots?date=${formData.date}`);
        const data = await response.json();

        if (data.success && data.data.slots) {
          setAvailableSlots(data.data.slots);
        } else {
          setAvailableSlots([]);
        }
      } catch (error) {
        console.error('Failed to fetch available slots:', error);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailableSlots();
  }, [formData.date]);

  const steps = [
    { number: 1, title: 'Patient Info', icon: User },
    { number: 2, title: 'Date & Time', icon: CalendarIcon },
    { number: 3, title: 'Review', icon: CheckCircle2 },
  ];

  const canProceedToStep2 = formData.name && formData.phone;
  const canProceedToStep3 = formData.date && formData.time && formData.reason;

  const nextStep = () => {
    if (currentStep === 1 && canProceedToStep2) {
      setCurrentStep(2);
    } else if (currentStep === 2 && canProceedToStep3) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

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
        setCurrentStep(1);
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
  const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 90 days from now

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC0yNHYyaC0ydi0yaDJ6bTI0IDI0djJoLTJ2LTJoMnptMC0yNHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 animate-pulse-slow"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">Book Appointment</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">Book an Appointment</h1>
            <p className="text-lg md:text-xl text-primary-50 leading-relaxed max-w-3xl mx-auto">
              Schedule your visit with ease. Follow the simple steps below to book your appointment.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 -mt-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12 pt-8 animate-fade-in-up">{/* Added pt-8 for top padding */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isCompleted
                            ? 'bg-primary-600 border-primary-600 text-white'
                            : isActive
                            ? 'bg-primary-600 border-primary-600 text-white scale-110'
                            : 'bg-white border-gray-300 text-gray-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <span
                        className={`mt-2 text-sm font-semibold ${
                          isActive ? 'text-primary-600' : isCompleted ? 'text-primary-600' : 'text-gray-400'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                          isCompleted ? 'bg-primary-600' : 'bg-gray-300'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <Card variant="elevated" className="p-8 lg:p-12 animate-scale-in">
            {/* Important Notice */}
            {currentStep === 1 && (
              <div className="mb-8 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-lg animate-fade-in">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-bold text-blue-900 mb-1">Patient Registration Required</h3>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      You must be registered as a patient before booking an appointment. 
                      Please contact the clinic to register first, or use the email and name 
                      associated with your patient record.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Patient Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-900">Patient Information</h2>
                    <p className="text-gray-600 text-sm md:text-base">
                      Enter the exact information associated with your patient record.
                    </p>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        minLength={1}
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 hover:border-gray-300"
                        placeholder="Full name as registered in patient record"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 hover:border-gray-300"
                          placeholder="Optional - Email used for registration"
                        />
                        <p className="text-xs text-gray-500 mt-1">Optional - If registered with email</p>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 hover:border-gray-300"
                          placeholder="Contact phone number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time - Visual Selection */}
              {currentStep === 2 && (
                <div className="space-y-8 animate-fade-in-up">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-900">Select Date & Time</h2>
                    <p className="text-gray-600 text-sm md:text-base">
                      Choose your preferred appointment date and available time slot.
                    </p>
                  </div>

                  {/* Visual Calendar */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <CalendarIcon className="w-5 h-5 inline mr-2" />
                      Select Appointment Date *
                    </label>
                    
                    {loadingMonth && (
                      <div className="text-center py-4 text-sm text-gray-600">
                        Loading calendar availability...
                      </div>
                    )}
                    
                    <Calendar
                      selectedDate={selectedDate}
                      onDateSelect={(date) => {
                        setSelectedDate(date);
                        const dateStr = date.toISOString().split('T')[0];
                        setFormData({
                          ...formData,
                          date: dateStr,
                          time: '', // Reset time when date changes
                        });
                      }}
                      minDate={new Date()}
                      maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}
                      highlightedDates={Object.entries(monthAvailability)
                        .filter(([_, data]) => data.available && data.count > 0)
                        .map(([dateStr, data]) => ({
                          date: new Date(dateStr),
                          count: data.count,
                        }))}
                    />
                  </div>

                  {/* Visual Time Slots */}
                  {formData.date && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <Clock className="w-5 h-5 inline mr-2" />
                        Select Time Slot *
                      </label>
                      <TimeSlotGrid
                        slots={availableSlots}
                        selectedSlot={formData.time}
                        onSlotSelect={(time) => setFormData({ ...formData, time })}
                        loading={loadingSlots}
                      />
                    </div>
                  )}

                  {!formData.date && (
                    <div className="text-center py-8 bg-blue-50 rounded-lg border-2 border-dashed border-blue-300">
                      <CalendarIcon className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                      <p className="text-blue-900 font-medium">Please select a date from the calendar above</p>
                      <p className="text-sm text-blue-700 mt-1">Days with available slots are highlighted</p>
                    </div>
                  )}

                  {/* Reason for Visit */}
                  <div>
                    <label htmlFor="reason" className="block text-sm font-semibold text-gray-700 mb-2">
                      Reason for Visit *
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      required
                      rows={5}
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="Please describe the reason for your appointment..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 hover:border-gray-300 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-900">Review Your Appointment</h2>
                    <p className="text-gray-600 text-sm md:text-base">
                      Please review your appointment details before confirming.
                    </p>
                  </div>

                  <Card variant="outlined" className="p-6 bg-gray-50">
                    <div className="space-y-4">
                      <div className="pb-4 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Patient Information</h3>
                        <p className="text-gray-900 font-medium">{formData.name}</p>
                        {formData.email && <p className="text-gray-700 text-sm">{formData.email}</p>}
                        <p className="text-gray-700 text-sm">{formData.phone}</p>
                      </div>
                      <div className="pb-4 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Appointment Details</h3>
                        <p className="text-gray-900 font-medium">
                          <CalendarIcon className="w-4 h-4 inline mr-2" />
                          {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-gray-900 font-medium mt-1">
                          <Clock className="w-4 h-4 inline mr-2" />
                          {formData.time}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Reason for Visit</h3>
                        <p className="text-gray-900">{formData.reason}</p>
                      </div>
                    </div>
                  </Card>

                  {submitMessage && (
                    <div className={`p-4 rounded-lg border-2 ${
                      submitMessage.includes('successfully') 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-red-50 border-red-200 text-red-800'
                    } animate-fade-in-up`}>
                      {submitMessage}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !canProceedToStep2) ||
                      (currentStep === 2 && !canProceedToStep3)
                    }
                    className="flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    className="flex items-center gap-2"
                    size="lg"
                  >
                    {isSubmitting ? 'Booking Appointment...' : 'Confirm Appointment'}
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

