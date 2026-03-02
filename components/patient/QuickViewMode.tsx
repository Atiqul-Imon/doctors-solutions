'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import TimelineView, { patientDataToTimeline } from '@/components/patient/TimelineView';
import QuickPrescriptionPanel from '@/components/prescription/QuickPrescriptionPanel';
import {
  ArrowLeft,
  AlertCircle,
  Pill,
  Activity,
  Calendar,
  Phone,
  Mail,
  User,
  FileText,
  Droplet,
  Clock,
  Stethoscope,
  Download,
  Printer,
  History,
} from 'lucide-react';

interface QuickViewProps {
  patient: any;
  onClose?: () => void;
  showActions?: boolean;
}

export default function QuickViewMode({ patient, onClose, showActions = true }: QuickViewProps) {
  const router = useRouter();
  const [showPrescriptionPanel, setShowPrescriptionPanel] = useState(false);
  const [viewMode, setViewMode] = useState<'summary' | 'timeline'>('summary');

  if (!patient) {
    return null;
  }

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return null;
    const age = Math.floor(
      (Date.now() - new Date(dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    );
    return age;
  };

  const age = patient.dateOfBirth ? calculateAge(patient.dateOfBirth) : null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get active medications (no end date or end date in future)
  const activeMedications = patient.medications?.filter(
    (med: any) => !med.endDate || new Date(med.endDate) > new Date()
  ) || [];

  // Get last visit
  const lastVisit = patient.visitNotes?.length > 0
    ? patient.visitNotes.sort((a: any, b: any) => 
        new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
      )[0]
    : null;

  // Get latest vitals
  const latestVitals = patient.vitalSigns?.length > 0
    ? patient.vitalSigns.sort((a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0]
    : null;

  // Generate timeline events
  const timelineEvents = patientDataToTimeline(patient);

  const handleQuickAction = (action: string) => {
    if (action === 'prescription') {
      setShowPrescriptionPanel(true);
    } else if (action === 'vitals') {
      // TODO: Open vitals form
      console.log('Add vitals');
    } else if (action === 'visit') {
      // TODO: Open visit note form
      console.log('New visit note');
    }
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch(`/api/patients/${patient._id}/export`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const printWindow = window.open(url, '_blank');
        
        if (printWindow) {
          printWindow.onload = () => {
            setTimeout(() => {
              printWindow.print();
              window.URL.revokeObjectURL(url);
            }, 500);
          };
        }
      }
    } catch (error) {
      console.error('Failed to export:', error);
      alert('Failed to export patient summary');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle & Actions */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={viewMode === 'summary' ? 'primary' : 'outline'}
            onClick={() => setViewMode('summary')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Summary
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'timeline' ? 'primary' : 'outline'}
            onClick={() => setViewMode('timeline')}
          >
            <History className="w-4 h-4 mr-2" />
            Timeline
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleExport}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handlePrint}
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <Card className="p-6">
          <TimelineView events={timelineEvents} />
        </Card>
      )}

      {/* Summary View */}
      {viewMode === 'summary' && (
        <>
          {/* Sticky Patient Header */}
          <div className="sticky top-0 z-10 bg-white shadow-md rounded-lg p-4 border-2 border-primary-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
              <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                {age && <span>{age}Y</span>}
                {patient.gender && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{patient.gender}</span>
                  </>
                )}
                {patient.bloodGroup && (
                  <>
                    <span>•</span>
                    <span className="font-semibold text-red-600">{patient.bloodGroup}</span>
                  </>
                )}
                {patient.phone && (
                  <>
                    <span>•</span>
                    <a href={`tel:${patient.phone}`} className="flex items-center gap-1 hover:text-primary-600">
                      <Phone className="w-3.5 h-3.5" />
                      {patient.phone}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
        </div>
      </div>

      {/* Allergies Alert Section */}
      {patient.allergies && patient.allergies.length > 0 && (
        <Card className="border-2 border-red-300 bg-red-50">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                <span>⚠️ ALLERGIES - CRITICAL</span>
              </h3>
              <div className="space-y-2">
                {patient.allergies.map((allergy: any, index: number) => (
                  <div
                    key={index}
                    className="bg-red-100 border-l-4 border-red-600 p-3 rounded"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-red-900">{allergy.allergen}</span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          allergy.severity === 'severe'
                            ? 'bg-red-200 text-red-900'
                            : allergy.severity === 'moderate'
                            ? 'bg-yellow-200 text-yellow-900'
                            : 'bg-green-200 text-green-900'
                        }`}
                      >
                        {allergy.severity?.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-red-800">
                      <strong>Reaction:</strong> {allergy.reaction}
                    </p>
                    {allergy.notes && (
                      <p className="text-xs text-red-700 mt-1">{allergy.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Current Medications Section */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Pill className="w-6 h-6 text-green-600" />
            Current Medications
            <span className="text-sm font-normal text-gray-600">
              ({activeMedications.length} active)
            </span>
          </h3>
        </div>
        {activeMedications.length === 0 ? (
          <p className="text-gray-600 text-center py-4">No active medications</p>
        ) : (
          <div className="space-y-3">
            {activeMedications.map((med: any, index: number) => (
              <div
                key={index}
                className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-lg text-gray-900">{med.name}</h4>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Dosage:</span>
                    <span className="font-semibold ml-2">{med.dosage}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-semibold ml-2">{med.frequency}</span>
                  </div>
                  {med.startDate && (
                    <div>
                      <span className="text-gray-600">Since:</span>
                      <span className="font-semibold ml-2">{formatDate(med.startDate)}</span>
                    </div>
                  )}
                  {med.prescribedBy && (
                    <div>
                      <span className="text-gray-600">Prescribed by:</span>
                      <span className="font-semibold ml-2">{med.prescribedBy}</span>
                    </div>
                  )}
                </div>
                {med.notes && (
                  <p className="text-sm text-gray-700 mt-2 italic">{med.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Last Visit Summary */}
      {lastVisit && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">Last Visit</h3>
                <span className="text-sm text-gray-600">
                  {formatDate(lastVisit.visitDate)}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Chief Complaint</p>
                  <p className="font-semibold text-gray-900">{lastVisit.chiefComplaint}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Diagnosis</p>
                  <p className="font-semibold text-gray-900">{lastVisit.diagnosis}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Treatment</p>
                  <p className="text-gray-900">{lastVisit.treatment}</p>
                </div>
                {lastVisit.followUpDate && (
                  <div className="bg-blue-100 border border-blue-300 rounded p-2">
                    <p className="text-sm font-semibold text-blue-900">
                      Follow-up: {formatDate(lastVisit.followUpDate)}
                    </p>
                  </div>
                )}
              </div>

              {/* Latest Vitals from Last Visit */}
              {latestVitals && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Latest Vitals:</p>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    {latestVitals.bloodPressure && (
                      <div className="bg-white rounded p-2">
                        <p className="text-gray-600 text-xs">BP</p>
                        <p className="font-bold">{latestVitals.bloodPressure}</p>
                      </div>
                    )}
                    {latestVitals.heartRate && (
                      <div className="bg-white rounded p-2">
                        <p className="text-gray-600 text-xs">HR</p>
                        <p className="font-bold">{latestVitals.heartRate} bpm</p>
                      </div>
                    )}
                    {latestVitals.temperature && (
                      <div className="bg-white rounded p-2">
                        <p className="text-gray-600 text-xs">Temp</p>
                        <p className="font-bold">{latestVitals.temperature}°F</p>
                      </div>
                    )}
                    {latestVitals.weight && (
                      <div className="bg-white rounded p-2">
                        <p className="text-gray-600 text-xs">Weight</p>
                        <p className="font-bold">{latestVitals.weight} kg</p>
                      </div>
                    )}
                    {latestVitals.bmi && (
                      <div className="bg-white rounded p-2">
                        <p className="text-gray-600 text-xs">BMI</p>
                        <p className="font-bold">{latestVitals.bmi.toFixed(1)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      {showActions && (
        <Card className="bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-300">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="primary"
              className="flex flex-col items-center py-4 h-auto"
              onClick={() => handleQuickAction('prescription')}
            >
              <FileText className="w-6 h-6 mb-2" />
              <span>Quick Prescription</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center py-4 h-auto"
              onClick={() => handleQuickAction('vitals')}
            >
              <Activity className="w-6 h-6 mb-2" />
              <span>Add Vitals</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center py-4 h-auto"
              onClick={() => handleQuickAction('visit')}
            >
              <Stethoscope className="w-6 h-6 mb-2" />
              <span>New Visit Note</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center py-4 h-auto"
              onClick={() => router.push(`/dashboard/patients/${patient._id}`)}
            >
              <FileText className="w-6 h-6 mb-2" />
              <span>Full Records</span>
            </Button>
          </div>
        </Card>
      )}

      {/* Recent Visit History (Collapsed) */}
      <Card>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          Recent Visit History
        </h3>
        {!patient.visitNotes || patient.visitNotes.length === 0 ? (
          <p className="text-gray-600 text-center py-4">No visit history</p>
        ) : (
          <div className="space-y-2">
            {patient.visitNotes
              .sort((a: any, b: any) => 
                new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
              )
              .slice(0, 5)
              .map((visit: any, index: number) => (
                <div
                  key={index}
                  className="border-l-2 border-gray-300 pl-4 py-2 hover:border-primary-500 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      {formatDate(visit.visitDate)}
                    </span>
                    <span className="text-sm text-gray-600">{visit.diagnosis}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{visit.chiefComplaint}</p>
                </div>
              ))}
            {patient.visitNotes.length > 5 && (
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => router.push(`/dashboard/patients/${patient._id}`)}
              >
                View All History ({patient.visitNotes.length} visits)
              </Button>
            )}
          </div>
        )}
      </Card>
        </>
      )}

      {/* Quick Prescription Panel */}
      {showPrescriptionPanel && (
        <QuickPrescriptionPanel
          patientId={patient._id}
          patientName={patient.name}
          onClose={() => setShowPrescriptionPanel(false)}
          onSuccess={() => {
            // Refresh patient data if needed
            console.log('Prescription created successfully');
          }}
        />
      )}
    </div>
  );
}
