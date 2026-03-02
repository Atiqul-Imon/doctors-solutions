'use client';

import { Calendar, Pill, FileText, Activity, Stethoscope, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface TimelineEvent {
  id: string;
  date: string;
  type: 'visit' | 'prescription' | 'lab' | 'vital' | 'diagnosis' | 'other';
  title: string;
  description?: string;
  details?: any;
}

interface TimelineViewProps {
  events: TimelineEvent[];
  className?: string;
}

export default function TimelineView({ events, className }: TimelineViewProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return <Stethoscope className="w-5 h-5" />;
      case 'prescription':
        return <Pill className="w-5 h-5" />;
      case 'lab':
        return <FileText className="w-5 h-5" />;
      case 'vital':
        return <Activity className="w-5 h-5" />;
      case 'diagnosis':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'visit':
        return 'bg-blue-100 text-blue-600 border-blue-300';
      case 'prescription':
        return 'bg-green-100 text-green-600 border-green-300';
      case 'lab':
        return 'bg-purple-100 text-purple-600 border-purple-300';
      case 'vital':
        return 'bg-orange-100 text-orange-600 border-orange-300';
      case 'diagnosis':
        return 'bg-red-100 text-red-600 border-red-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No timeline events yet</p>
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

      {/* Timeline Events */}
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="relative pl-20">
            {/* Icon */}
            <div
              className={cn(
                'absolute left-0 w-16 h-16 rounded-full border-4 flex items-center justify-center',
                getColor(event.type)
              )}
            >
              {getIcon(event.type)}
            </div>

            {/* Content */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(event.date)} • {formatFullDate(event.date)}
                  </p>
                </div>
                <span
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-semibold capitalize',
                    getColor(event.type).replace('border-', 'bg-').split(' ')[0],
                    getColor(event.type).split(' ')[1]
                  )}
                >
                  {event.type}
                </span>
              </div>

              {event.description && (
                <p className="text-gray-700 text-sm mb-3">{event.description}</p>
              )}

              {event.details && (
                <div className="bg-gray-50 rounded p-3 text-sm">
                  {event.type === 'visit' && event.details.diagnosis && (
                    <div className="space-y-1">
                      <p><strong>Diagnosis:</strong> {event.details.diagnosis}</p>
                      {event.details.treatment && (
                        <p><strong>Treatment:</strong> {event.details.treatment}</p>
                      )}
                    </div>
                  )}

                  {event.type === 'prescription' && event.details.medications && (
                    <div>
                      <p className="font-semibold mb-2">Medications:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {event.details.medications.map((med: any, i: number) => (
                          <li key={i}>
                            {med.name} - {med.dosage} ({med.frequency})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {event.type === 'vital' && event.details.vitals && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {event.details.vitals.bloodPressure && (
                        <div>
                          <p className="text-xs text-gray-600">BP</p>
                          <p className="font-semibold">{event.details.vitals.bloodPressure}</p>
                        </div>
                      )}
                      {event.details.vitals.heartRate && (
                        <div>
                          <p className="text-xs text-gray-600">HR</p>
                          <p className="font-semibold">{event.details.vitals.heartRate} bpm</p>
                        </div>
                      )}
                      {event.details.vitals.temperature && (
                        <div>
                          <p className="text-xs text-gray-600">Temp</p>
                          <p className="font-semibold">{event.details.vitals.temperature}°F</p>
                        </div>
                      )}
                      {event.details.vitals.weight && (
                        <div>
                          <p className="text-xs text-gray-600">Weight</p>
                          <p className="font-semibold">{event.details.vitals.weight} kg</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to convert patient data to timeline events
export function patientDataToTimeline(patient: any): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  // Visit notes
  if (patient.visitNotes) {
    patient.visitNotes.forEach((visit: any) => {
      events.push({
        id: `visit-${visit._id}`,
        date: visit.visitDate,
        type: 'visit',
        title: visit.chiefComplaint || 'Medical Consultation',
        description: visit.diagnosis,
        details: {
          diagnosis: visit.diagnosis,
          treatment: visit.treatment,
        },
      });
    });
  }

  // Prescriptions
  if (patient.prescriptions) {
    patient.prescriptions.forEach((presc: any) => {
      events.push({
        id: `presc-${presc._id}`,
        date: presc.prescriptionDate,
        type: 'prescription',
        title: 'Prescription Issued',
        description: `${presc.medications?.length || 0} medications prescribed`,
        details: {
          medications: presc.medications,
        },
      });
    });
  }

  // Vital signs
  if (patient.vitalSigns) {
    patient.vitalSigns.forEach((vital: any) => {
      events.push({
        id: `vital-${vital._id}`,
        date: vital.date,
        type: 'vital',
        title: 'Vital Signs Recorded',
        description: 'Health parameters measured',
        details: {
          vitals: vital,
        },
      });
    });
  }

  // Lab results
  if (patient.labResults) {
    patient.labResults.forEach((lab: any) => {
      events.push({
        id: `lab-${lab._id}`,
        date: lab.date,
        type: 'lab',
        title: lab.testName || 'Lab Test',
        description: lab.result,
        details: lab,
      });
    });
  }

  // Sort by date (newest first)
  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
