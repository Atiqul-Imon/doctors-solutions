'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import BottomSheet from '@/components/ui/BottomSheet';
import { useDevice } from '@/lib/hooks/useDevice';
import { X, Plus, Save, Printer, FileCheck, Loader2, Trash2 } from 'lucide-react';

interface QuickPrescriptionPanelProps {
  patientId: string;
  patientName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function QuickPrescriptionPanel({
  patientId,
  patientName,
  onClose,
  onSuccess,
}: QuickPrescriptionPanelProps) {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [recentPrescriptions, setRecentPrescriptions] = useState<any[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const { isMobile, isTablet } = useDevice();

  const [formData, setFormData] = useState({
    prescribedBy: '',
    prescriptionDate: new Date().toISOString().split('T')[0],
    medications: [] as any[],
    additionalInstructions: '',
    refillable: false,
    expiryDate: '',
    notes: '',
  });

  useEffect(() => {
    fetchData();
  }, [patientId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      // Fetch favorite templates and recent prescriptions in parallel
      const [templatesRes, prescriptionsRes] = await Promise.all([
        fetch('/api/prescription-templates/favorites', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`/api/prescriptions?patientId=${patientId}&limit=3`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (templatesRes.ok) {
        const data = await templatesRes.json();
        if (data.success) {
          setTemplates(data.data || []);
        }
      }

      if (prescriptionsRes.ok) {
        const data = await prescriptionsRes.json();
        if (data.success) {
          setRecentPrescriptions(data.data.prescriptions || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplateId(template._id);
    setFormData({
      ...formData,
      medications: template.medications || [],
      additionalInstructions: template.defaultInstructions || '',
    });
  };

  const handleCopyPrescription = (prescription: any) => {
    setFormData({
      ...formData,
      medications: prescription.medications || [],
      additionalInstructions: prescription.additionalInstructions || '',
      refillable: prescription.refillable || false,
    });
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        {
          name: '',
          dosage: '',
          frequency: '',
          duration: '',
          mealTiming: 'after',
          instructions: '',
        },
      ],
    });
  };

  const removeMedication = (index: number) => {
    setFormData({
      ...formData,
      medications: formData.medications.filter((_, i) => i !== index),
    });
  };

  const updateMedication = (index: number, field: string, value: string) => {
    const newMeds = [...formData.medications];
    newMeds[index] = { ...newMeds[index], [field]: value };
    setFormData({ ...formData, medications: newMeds });
  };

  const handleSubmit = async (printImmediately = false) => {
    if (formData.medications.length === 0) {
      alert('Please add at least one medication');
      return;
    }

    if (!formData.prescribedBy) {
      alert('Please enter prescribing doctor name');
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId,
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // If print immediately, trigger print
        if (printImmediately && data.data._id) {
          await handlePrint(data.data._id);
        }

        alert('Prescription created successfully!');
        onSuccess?.();
        onClose();
      } else {
        alert(data.error || 'Failed to create prescription');
      }
    } catch (error) {
      console.error('Failed to create prescription:', error);
      alert('Failed to create prescription. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = async (prescriptionId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch(`/api/prescriptions/${prescriptionId}/print`, {
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
      console.error('Failed to print:', error);
    }
  };

  return (
    <BottomSheet
      isOpen={true}
      onClose={onClose}
      title="Quick Prescription"
      maxHeight="90vh"
      fullScreen={isMobile}
    >
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-600">For: {patientName}</p>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        ) : (
          <>
            {/* Quick Select */}
            <div className="grid grid-cols-2 gap-3">
                {/* Templates */}
                {templates.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      📋 Templates
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                      value={selectedTemplateId}
                      onChange={(e) => {
                        const template = templates.find((t) => t._id === e.target.value);
                        if (template) handleTemplateSelect(template);
                      }}
                    >
                      <option value="">Select template...</option>
                      {templates.map((t) => (
                        <option key={t._id} value={t._id}>
                          {t.name} ({t.usageCount || 0} uses)
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Recent */}
                {recentPrescriptions.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      🕐 Recent
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                      onChange={(e) => {
                        const presc = recentPrescriptions.find((p) => p._id === e.target.value);
                        if (presc) handleCopyPrescription(presc);
                      }}
                    >
                      <option value="">Copy from recent...</option>
                      {recentPrescriptions.map((p) => (
                        <option key={p._id} value={p._id}>
                          {new Date(p.prescriptionDate).toLocaleDateString()} ({p.medications?.length} meds)
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Prescribed By *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.prescribedBy}
                    onChange={(e) => setFormData({ ...formData, prescribedBy: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Dr. Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.prescriptionDate}
                    onChange={(e) => setFormData({ ...formData, prescriptionDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Medications */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">
                    💊 Medications * ({formData.medications.length})
                  </label>
                  <Button size="sm" variant="primary" onClick={addMedication}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>

                {formData.medications.length === 0 ? (
              <p className="text-sm text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                No medications added. Click &quot;Add&quot; or select a template.
              </p>
                ) : (
                  <div className="space-y-3">
                    {formData.medications.map((med, index) => (
                      <div key={index} className="border border-gray-300 rounded-lg p-3 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold">#{index + 1}</span>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => removeMedication(index)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Medicine name *"
                            value={med.name}
                            onChange={(e) => updateMedication(index, 'name', e.target.value)}
                            className="col-span-2 px-2 py-1.5 border border-gray-300 rounded text-sm"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Dosage *"
                            value={med.dosage}
                            onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                            className="px-2 py-1.5 border border-gray-300 rounded text-sm"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Frequency *"
                            value={med.frequency}
                            onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                            className="px-2 py-1.5 border border-gray-300 rounded text-sm"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Duration *"
                            value={med.duration}
                            onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                            className="px-2 py-1.5 border border-gray-300 rounded text-sm"
                            required
                          />
                          <select
                            value={med.mealTiming}
                            onChange={(e) => updateMedication(index, 'mealTiming', e.target.value)}
                            className="px-2 py-1.5 border border-gray-300 rounded text-sm"
                          >
                            <option value="before">Before meal</option>
                            <option value="after">After meal</option>
                            <option value="during">During meal</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Additional Instructions
                </label>
                <textarea
                  value={formData.additionalInstructions}
                  onChange={(e) => setFormData({ ...formData, additionalInstructions: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                  placeholder="General instructions for all medications..."
                />
              </div>

              {/* Options */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.refillable}
                    onChange={(e) => setFormData({ ...formData, refillable: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Refillable</span>
                </label>
              </div>
            </>
          )}
      </div>

      {/* Footer Actions */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-2">
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={submitting}
          className="flex-1 min-h-[48px]"
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSubmit(false)}
          disabled={submitting || formData.medications.length === 0}
          className="flex-1 min-h-[48px]"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button
          variant="primary"
          onClick={() => handleSubmit(true)}
          disabled={submitting || formData.medications.length === 0}
          className="flex-1 min-h-[48px]"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Printer className="w-4 h-4 mr-2" />
          )}
          {isMobile ? 'Print' : 'Save & Print'}
        </Button>
      </div>
    </BottomSheet>
  );
}
