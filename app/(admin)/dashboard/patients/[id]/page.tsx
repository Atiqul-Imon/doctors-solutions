'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  ArrowLeft, 
  User, 
  Heart, 
  Pill, 
  Activity, 
  FileText, 
  Calendar,
  AlertCircle,
  Stethoscope,
  Users,
  CreditCard,
  Edit,
  Save,
  X,
  Plus,
  FileCheck,
  Printer,
  RotateCcw
} from 'lucide-react';

type TabType = 'overview' | 'medical' | 'allergies' | 'medications' | 'vitals' | 'labs' | 'visits' | 'family' | 'insurance' | 'prescriptions';

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string;

  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemData, setNewItemData] = useState<any>({});
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showPrescriptionDetail, setShowPrescriptionDetail] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [prescriptionFormData, setPrescriptionFormData] = useState<any>({
    prescribedBy: '',
    prescriptionDate: new Date().toISOString().split('T')[0],
    medications: [],
    additionalInstructions: '',
    refillable: false,
    expiryDate: '',
    notes: '',
  });
  const [prescriptionTemplates, setPrescriptionTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isSubmittingPrescription, setIsSubmittingPrescription] = useState(false);

  // Only fetch prescriptions when tab becomes active and data hasn't been loaded
  // Cache templates globally since they don't change often
  const [prescriptionsLoaded, setPrescriptionsLoaded] = useState(false);
  const [templatesLoaded, setTemplatesLoaded] = useState(false);

  const fetchPrescriptions = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch(`/api/prescriptions?patientId=${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPrescriptions(data.data.prescriptions || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch prescriptions:', error);
    }
  }, [patientId]);

  const fetchPrescriptionTemplates = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch('/api/prescription-templates', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPrescriptionTemplates(data.data || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch prescription templates:', error);
    }
  }, []);

  useEffect(() => {
    fetchPatient();
  }, [patientId]);

  useEffect(() => {
    if (activeTab === 'prescriptions' && patientId && !prescriptionsLoaded) {
      fetchPrescriptions();
      setPrescriptionsLoaded(true);
    }
  }, [activeTab, patientId, prescriptionsLoaded, fetchPrescriptions]);

  useEffect(() => {
    // Load templates once globally (they're shared across all patients)
    if (!templatesLoaded) {
      fetchPrescriptionTemplates();
      setTemplatesLoaded(true);
    }
  }, [templatesLoaded, fetchPrescriptionTemplates]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch(`/api/patients/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPatient(data.data);
          setEditData(data.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch patient:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch(`/api/patients/${patientId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPatient(data.data);
          setIsEditing(false);
          alert('Patient information updated successfully!');
        }
      }
    } catch (error) {
      console.error('Failed to update patient:', error);
      alert('Failed to update patient information');
    }
  };

  const handleAddItem = async (field: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch(`/api/patients/${patientId}/add-item`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field,
          data: newItemData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPatient(data.data);
          setShowAddModal(false);
          setNewItemData({});
          alert('Item added successfully!');
        }
      }
    } catch (error) {
      console.error('Failed to add item:', error);
      alert('Failed to add item');
    }
  };

  const handleCreatePrescription = async (visitNoteId?: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      setIsSubmittingPrescription(true);

      // Get visitNoteId from window if it was set from visit notes
      const pendingVisitNoteId = (window as any).__pendingVisitNoteId;
      const finalVisitNoteId = visitNoteId || pendingVisitNoteId;

      const prescriptionData: any = {
        patientId,
        prescribedBy: prescriptionFormData.prescribedBy || 'Dr. Admin',
        prescriptionDate: prescriptionFormData.prescriptionDate || new Date().toISOString().split('T')[0],
        medications: prescriptionFormData.medications || [],
        additionalInstructions: prescriptionFormData.additionalInstructions || '',
        refillable: prescriptionFormData.refillable || false,
        notes: prescriptionFormData.notes || '',
      };

      if (finalVisitNoteId) {
        prescriptionData.visitNoteId = finalVisitNoteId;
      }

      if (prescriptionFormData.expiryDate) {
        prescriptionData.expiryDate = prescriptionFormData.expiryDate;
      }

      if (prescriptionData.medications.length === 0) {
        alert('Please add at least one medication to the prescription');
        setIsSubmittingPrescription(false);
        return;
      }

      const response = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prescriptionData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Prescription created successfully!');
        setShowPrescriptionModal(false);
        setPrescriptionFormData({
          prescribedBy: '',
          prescriptionDate: new Date().toISOString().split('T')[0],
          medications: [],
          additionalInstructions: '',
          refillable: false,
          expiryDate: '',
          notes: '',
        });
        setSelectedTemplate('');
        (window as any).__pendingVisitNoteId = undefined;
        if (prescriptionsLoaded) {
          fetchPrescriptions(); // Only refetch if already loaded
        }
        fetchPatient(); // Refresh patient to update medications array
      } else {
        alert(data.error || 'Failed to create prescription');
      }
    } catch (error) {
      console.error('Failed to create prescription:', error);
      alert('Failed to create prescription. Please try again.');
    } finally {
      setIsSubmittingPrescription(false);
    }
  };

  const handlePrintPrescription = async (prescriptionId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch(`/api/prescriptions/${prescriptionId}/print`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/pdf')) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          
          // Open PDF in new window and trigger print dialog
          const printWindow = window.open(url, '_blank');
          
          if (printWindow) {
            // Wait for PDF to load, then trigger print
            printWindow.onload = () => {
              // Small delay to ensure PDF is fully loaded
              setTimeout(() => {
                printWindow.print();
                // Clean up the object URL after printing
                window.URL.revokeObjectURL(url);
              }, 500);
            };
            
            // Fallback: if onload doesn't fire, try print after a delay
            setTimeout(() => {
              if (printWindow && !printWindow.closed) {
                printWindow.print();
                window.URL.revokeObjectURL(url);
              }
            }, 1000);
          } else {
            // If popup blocked, fall back to download
            const a = document.createElement('a');
            a.href = url;
            a.download = `prescription-${prescriptionId}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            alert('Popup blocked. PDF downloaded instead. Please open and print manually.');
          }
        } else {
          // Response is not PDF, try to parse as JSON error
          const errorData = await response.json();
          alert(errorData.error || 'Failed to generate prescription PDF');
        }
      } else {
        // Try to get error message from response
        let errorMessage = 'Failed to generate prescription PDF';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        alert(errorMessage);
      }
    } catch (error: any) {
      console.error('Failed to print prescription:', error);
      alert(error.message || 'Failed to print prescription. Please try again.');
    }
  };

  const handleRenewPrescription = async (prescriptionId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const expiryDate = prompt('Enter new expiry date (YYYY-MM-DD) or leave empty:');
      
      const response = await fetch(`/api/prescriptions/${prescriptionId}/renew`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expiryDate: expiryDate || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Prescription renewed successfully!');
        fetchPrescriptions();
      } else {
        alert(data.error || 'Failed to renew prescription');
      }
    } catch (error) {
      console.error('Failed to renew prescription:', error);
      alert('Failed to renew prescription');
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = prescriptionTemplates.find((t: any) => t._id === templateId);
    if (template) {
      setPrescriptionFormData({
        ...prescriptionFormData,
        medications: template.medications || [],
        additionalInstructions: template.defaultInstructions || '',
      });
      setSelectedTemplate(templateId);
    }
  };

  const addMedicationToPrescription = () => {
    setPrescriptionFormData({
      ...prescriptionFormData,
      medications: [
        ...prescriptionFormData.medications,
        { name: '', dosage: '', frequency: '', duration: '', instructions: '' },
      ],
    });
  };

  const removeMedicationFromPrescription = (index: number) => {
    const newMedications = prescriptionFormData.medications.filter((_: any, i: number) => i !== index);
    setPrescriptionFormData({
      ...prescriptionFormData,
      medications: newMedications,
    });
  };

  const updateMedicationInPrescription = (index: number, field: string, value: string) => {
    const newMedications = [...prescriptionFormData.medications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    setPrescriptionFormData({
      ...prescriptionFormData,
      medications: newMedications,
    });
  };

  const getAddModalContent = () => {
    switch (activeTab) {
      case 'medical':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Condition *</label>
              <input
                type="text"
                value={newItemData.condition || ''}
                onChange={(e) => setNewItemData({ ...newItemData, condition: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={newItemData.status || 'active'}
                onChange={(e) => setNewItemData({ ...newItemData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
                <option value="chronic">Chronic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Diagnosed Date</label>
              <input
                type="date"
                value={newItemData.diagnosedDate ? new Date(newItemData.diagnosedDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setNewItemData({ ...newItemData, diagnosedDate: e.target.value ? new Date(e.target.value) : undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                value={newItemData.notes || ''}
                onChange={(e) => setNewItemData({ ...newItemData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        );
      case 'allergies':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Allergen *</label>
              <input
                type="text"
                value={newItemData.allergen || ''}
                onChange={(e) => setNewItemData({ ...newItemData, allergen: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Reaction *</label>
              <input
                type="text"
                value={newItemData.reaction || ''}
                onChange={(e) => setNewItemData({ ...newItemData, reaction: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Severity</label>
              <select
                value={newItemData.severity || 'mild'}
                onChange={(e) => setNewItemData({ ...newItemData, severity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                value={newItemData.notes || ''}
                onChange={(e) => setNewItemData({ ...newItemData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        );
      case 'medications':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Medication Name *</label>
              <input
                type="text"
                value={newItemData.name || ''}
                onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Dosage *</label>
                <input
                  type="text"
                  value={newItemData.dosage || ''}
                  onChange={(e) => setNewItemData({ ...newItemData, dosage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Frequency *</label>
                <input
                  type="text"
                  value={newItemData.frequency || ''}
                  onChange={(e) => setNewItemData({ ...newItemData, frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Twice daily"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  value={newItemData.startDate ? new Date(newItemData.startDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setNewItemData({ ...newItemData, startDate: e.target.value ? new Date(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  value={newItemData.endDate ? new Date(newItemData.endDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setNewItemData({ ...newItemData, endDate: e.target.value ? new Date(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Prescribed By</label>
              <input
                type="text"
                value={newItemData.prescribedBy || ''}
                onChange={(e) => setNewItemData({ ...newItemData, prescribedBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                value={newItemData.notes || ''}
                onChange={(e) => setNewItemData({ ...newItemData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        );
      case 'vitals':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date *</label>
              <input
                type="date"
                value={newItemData.date ? new Date(newItemData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                onChange={(e) => setNewItemData({ ...newItemData, date: new Date(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Blood Pressure</label>
                <input
                  type="text"
                  value={newItemData.bloodPressure || ''}
                  onChange={(e) => setNewItemData({ ...newItemData, bloodPressure: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., 120/80"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Heart Rate (bpm)</label>
                <input
                  type="number"
                  value={newItemData.heartRate || ''}
                  onChange={(e) => setNewItemData({ ...newItemData, heartRate: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Temperature (°F)</label>
                <input
                  type="number"
                  value={newItemData.temperature || ''}
                  onChange={(e) => setNewItemData({ ...newItemData, temperature: e.target.value ? parseFloat(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={newItemData.weight || ''}
                  onChange={(e) => setNewItemData({ ...newItemData, weight: e.target.value ? parseFloat(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={newItemData.height || ''}
                  onChange={(e) => {
                    const height = e.target.value ? parseFloat(e.target.value) : undefined;
                    const weight = newItemData.weight;
                    let bmi = undefined;
                    if (height && weight) {
                      const heightInMeters = height / 100;
                      bmi = weight / (heightInMeters * heightInMeters);
                    }
                    setNewItemData({ ...newItemData, height, bmi });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                value={newItemData.notes || ''}
                onChange={(e) => setNewItemData({ ...newItemData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        );
      case 'labs':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Test Name *</label>
              <input
                type="text"
                value={newItemData.testName || ''}
                onChange={(e) => setNewItemData({ ...newItemData, testName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Test Date *</label>
              <input
                type="date"
                value={newItemData.testDate ? new Date(newItemData.testDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                onChange={(e) => setNewItemData({ ...newItemData, testDate: new Date(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Results *</label>
              <textarea
                value={newItemData.results || ''}
                onChange={(e) => setNewItemData({ ...newItemData, results: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Normal Range</label>
                <input
                  type="text"
                  value={newItemData.normalRange || ''}
                  onChange={(e) => setNewItemData({ ...newItemData, normalRange: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={newItemData.status || 'normal'}
                  onChange={(e) => setNewItemData({ ...newItemData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="normal">Normal</option>
                  <option value="abnormal">Abnormal</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                value={newItemData.notes || ''}
                onChange={(e) => setNewItemData({ ...newItemData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        );
      case 'visits':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Visit Date *</label>
              <input
                type="date"
                value={newItemData.visitDate ? new Date(newItemData.visitDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                onChange={(e) => setNewItemData({ ...newItemData, visitDate: new Date(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Chief Complaint *</label>
              <input
                type="text"
                value={newItemData.chiefComplaint || ''}
                onChange={(e) => setNewItemData({ ...newItemData, chiefComplaint: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Diagnosis *</label>
              <input
                type="text"
                value={newItemData.diagnosis || ''}
                onChange={(e) => setNewItemData({ ...newItemData, diagnosis: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Treatment *</label>
              <textarea
                value={newItemData.treatment || ''}
                onChange={(e) => setNewItemData({ ...newItemData, treatment: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                value={newItemData.notes || ''}
                onChange={(e) => setNewItemData({ ...newItemData, notes: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Doctor</label>
                <input
                  type="text"
                  value={newItemData.doctor || ''}
                  onChange={(e) => setNewItemData({ ...newItemData, doctor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Follow-up Date</label>
                <input
                  type="date"
                  value={newItemData.followUpDate ? new Date(newItemData.followUpDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setNewItemData({ ...newItemData, followUpDate: e.target.value ? new Date(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        );
      case 'family':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Condition *</label>
              <input
                type="text"
                value={newItemData.condition || ''}
                onChange={(e) => setNewItemData({ ...newItemData, condition: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Relation *</label>
              <input
                type="text"
                value={newItemData.relation || ''}
                onChange={(e) => setNewItemData({ ...newItemData, relation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Father, Mother, Grandfather"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age of Onset</label>
              <input
                type="number"
                value={newItemData.ageOfOnset || ''}
                onChange={(e) => setNewItemData({ ...newItemData, ageOfOnset: e.target.value ? parseInt(e.target.value) : undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Age in years"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                value={newItemData.notes || ''}
                onChange={(e) => setNewItemData({ ...newItemData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: User },
    { id: 'medical' as TabType, label: 'Medical History', icon: Stethoscope },
    { id: 'allergies' as TabType, label: 'Allergies', icon: AlertCircle },
    { id: 'medications' as TabType, label: 'Medications', icon: Pill },
    { id: 'vitals' as TabType, label: 'Vital Signs', icon: Activity },
    { id: 'labs' as TabType, label: 'Lab Results', icon: FileText },
    { id: 'visits' as TabType, label: 'Visit Notes', icon: Calendar },
    { id: 'prescriptions' as TabType, label: 'Prescriptions', icon: FileCheck },
    { id: 'family' as TabType, label: 'Family History', icon: Users },
    { id: 'insurance' as TabType, label: 'Insurance', icon: CreditCard },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading patient information...</p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Patient not found</p>
        <Button onClick={() => router.push('/dashboard/patients')}>
          Back to Patients
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard/patients')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-display">
              {patient.name}
            </h1>
            <p className="text-gray-600">Patient ID: {patient._id.slice(-8)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={() => { setIsEditing(false); setEditData(patient); }}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Patient
            </Button>
          )}
        </div>
      </div>

      {/* Patient Info Card */}
      <Card className="mb-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Email</p>
            <p className="font-semibold">{patient.email || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Phone</p>
            <p className="font-semibold">{patient.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
            <p className="font-semibold">
              {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Blood Group</p>
            <p className="font-semibold">{patient.bloodGroup || 'Not recorded'}</p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 font-semibold'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name || ''}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                      minLength={1}
                      required
                    />
                  ) : (
                    <p className="font-medium">{patient.name}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email || ''}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                    />
                  ) : (
                    <p className="font-medium">{patient.email || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone || ''}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                      required
                    />
                  ) : (
                    <p className="font-medium">{patient.phone}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  {isEditing ? (
                    <select
                      value={editData.gender || ''}
                      onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="font-medium capitalize">{patient.gender}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Blood Group</p>
                  {isEditing ? (
                    <select
                      value={editData.bloodGroup || ''}
                      onChange={(e) => setEditData({ ...editData, bloodGroup: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
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
                  ) : (
                    <p className="font-medium">{patient.bloodGroup || 'Not recorded'}</p>
                  )}
                </div>
                {patient.address && (patient.address.zilla || patient.address.upazilla) && (
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-4 mt-1">
                        <div>
                          <input
                            type="text"
                            placeholder="Zilla (District)"
                            value={editData.address?.zilla || ''}
                            onChange={(e) => setEditData({
                              ...editData,
                              address: { ...editData.address, zilla: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Upazilla (Sub-district)"
                            value={editData.address?.upazilla || ''}
                            onChange={(e) => setEditData({
                              ...editData,
                              address: { ...editData.address, upazilla: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="font-medium">
                        {patient.address.upazilla && patient.address.zilla 
                          ? `${patient.address.upazilla}, ${patient.address.zilla}`
                          : patient.address.zilla || patient.address.upazilla || 'Not provided'}
                      </p>
                    )}
                  </div>
                )}
                {patient.emergencyContact && (
                  <div>
                    <p className="text-sm text-gray-600">Emergency Contact</p>
                    <p className="font-medium">
                      {patient.emergencyContact.name} ({patient.emergencyContact.relationship})
                    </p>
                    <p className="text-sm text-gray-600">{patient.emergencyContact.phone}</p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-600">Medical Conditions</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {patient.medicalHistory?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="text-gray-600">Allergies</span>
                  <span className="text-2xl font-bold text-red-600">
                    {patient.allergies?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-600">Active Medications</span>
                  <span className="text-2xl font-bold text-green-600">
                    {patient.medications?.filter((m: any) => !m.endDate || new Date(m.endDate) > new Date()).length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="text-gray-600">Total Visits</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {patient.visitNotes?.length || 0}
                  </span>
                </div>
              </div>
            </Card>

            {patient.notes && (
              <Card className="p-6 lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">General Notes</h3>
                {isEditing ? (
                  <textarea
                    value={editData.notes || ''}
                    onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Add general notes about the patient..."
                  />
                ) : (
                  <p className="text-gray-700 whitespace-pre-wrap">{patient.notes || 'No notes available'}</p>
                )}
              </Card>
            )}
          </div>
        )}

        {activeTab === 'medical' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Medical History</h3>
              {isEditing && (
                <Button 
                  size="sm" 
                  variant="primary"
                  onClick={() => {
                    setNewItemData({});
                    setShowAddModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Condition
                </Button>
              )}
            </div>
            {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
              <div className="space-y-4">
                {patient.medicalHistory.map((condition: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{condition.condition}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        condition.status === 'active' ? 'bg-red-100 text-red-800' :
                        condition.status === 'chronic' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {condition.status}
                      </span>
                    </div>
                    {condition.diagnosedDate && (
                      <p className="text-sm text-gray-600 mb-2">
                        Diagnosed: {new Date(condition.diagnosedDate).toLocaleDateString()}
                      </p>
                    )}
                    {condition.notes && (
                      <p className="text-gray-700">{condition.notes}</p>
                    )}
                    {condition.doctor && (
                      <p className="text-sm text-gray-500 mt-2">Doctor: {condition.doctor}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No medical history recorded</p>
            )}
          </Card>
        )}

        {activeTab === 'allergies' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Allergies</h3>
              {isEditing && (
                <Button 
                  size="sm" 
                  variant="primary"
                  onClick={() => {
                    setNewItemData({});
                    setShowAddModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Allergy
                </Button>
              )}
            </div>
            {patient.allergies && patient.allergies.length > 0 ? (
              <div className="space-y-4">
                {patient.allergies.map((allergy: any, index: number) => (
                  <div key={index} className="border-l-4 border-red-500 bg-red-50 rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{allergy.allergen}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        allergy.severity === 'severe' ? 'bg-red-200 text-red-900' :
                        allergy.severity === 'moderate' ? 'bg-yellow-200 text-yellow-900' :
                        'bg-green-200 text-green-900'
                      }`}>
                        {allergy.severity}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-1"><strong>Reaction:</strong> {allergy.reaction}</p>
                    {allergy.notes && (
                      <p className="text-gray-600 text-sm">{allergy.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No allergies recorded</p>
            )}
          </Card>
        )}

        {activeTab === 'medications' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Current Medications</h3>
              {isEditing && (
                <Button 
                  size="sm" 
                  variant="primary"
                  onClick={() => {
                    setNewItemData({});
                    setShowAddModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Medication
                </Button>
              )}
            </div>
            {patient.medications && patient.medications.length > 0 ? (
              <div className="space-y-4">
                {patient.medications
                  .filter((med: any) => !med.endDate || new Date(med.endDate) > new Date())
                  .map((medication: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">{medication.name}</h4>
                        {medication.endDate && new Date(medication.endDate) > new Date() && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Dosage:</span> {medication.dosage}
                        </div>
                        <div>
                          <span className="text-gray-600">Frequency:</span> {medication.frequency}
                        </div>
                        {medication.startDate && (
                          <div>
                            <span className="text-gray-600">Start Date:</span>{' '}
                            {new Date(medication.startDate).toLocaleDateString()}
                          </div>
                        )}
                        {medication.prescribedBy && (
                          <div>
                            <span className="text-gray-600">Prescribed By:</span> {medication.prescribedBy}
                          </div>
                        )}
                      </div>
                      {medication.notes && (
                        <p className="text-gray-700 mt-2 text-sm">{medication.notes}</p>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No active medications</p>
            )}
          </Card>
        )}

        {activeTab === 'vitals' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Vital Signs History</h3>
              {isEditing && (
                <Button 
                  size="sm" 
                  variant="primary"
                  onClick={() => {
                    setNewItemData({});
                    setShowAddModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Vital Signs
                </Button>
              )}
            </div>
            {patient.vitalSigns && patient.vitalSigns.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">BP</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Heart Rate</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Temp</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Weight</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">BMI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {patient.vitalSigns
                      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((vital: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            {new Date(vital.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">{vital.bloodPressure || 'N/A'}</td>
                          <td className="px-4 py-3">{vital.heartRate || 'N/A'}</td>
                          <td className="px-4 py-3">{vital.temperature ? `${vital.temperature}°F` : 'N/A'}</td>
                          <td className="px-4 py-3">{vital.weight ? `${vital.weight} kg` : 'N/A'}</td>
                          <td className="px-4 py-3">{vital.bmi ? vital.bmi.toFixed(1) : 'N/A'}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No vital signs recorded</p>
            )}
          </Card>
        )}

        {activeTab === 'labs' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Lab Results</h3>
              {isEditing && (
                <Button 
                  size="sm" 
                  variant="primary"
                  onClick={() => {
                    setNewItemData({});
                    setShowAddModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Lab Result
                </Button>
              )}
            </div>
            {patient.labResults && patient.labResults.length > 0 ? (
              <div className="space-y-4">
                {patient.labResults
                  .sort((a: any, b: any) => new Date(b.testDate).getTime() - new Date(a.testDate).getTime())
                  .map((lab: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">{lab.testName}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          lab.status === 'critical' ? 'bg-red-200 text-red-900' :
                          lab.status === 'abnormal' ? 'bg-yellow-200 text-yellow-900' :
                          'bg-green-200 text-green-900'
                        }`}>
                          {lab.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Date: {new Date(lab.testDate).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700 mb-1"><strong>Results:</strong> {lab.results}</p>
                      {lab.normalRange && (
                        <p className="text-sm text-gray-600">Normal Range: {lab.normalRange}</p>
                      )}
                      {lab.notes && (
                        <p className="text-gray-600 text-sm mt-2">{lab.notes}</p>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No lab results recorded</p>
            )}
          </Card>
        )}

        {activeTab === 'visits' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Visit Notes</h3>
              {isEditing && (
                <Button 
                  size="sm" 
                  variant="primary"
                  onClick={() => {
                    setNewItemData({});
                    setShowAddModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Visit Note
                </Button>
              )}
            </div>
            {patient.visitNotes && patient.visitNotes.length > 0 ? (
              <div className="space-y-4">
                {patient.visitNotes
                  .sort((a: any, b: any) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime())
                  .map((visit: any, index: number) => (
                    <div key={index} className="border-l-4 border-primary-500 bg-primary-50 rounded p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">
                          {new Date(visit.visitDate).toLocaleDateString()}
                        </h4>
                        <div className="flex gap-2">
                          {visit.doctor && (
                            <span className="text-sm text-gray-600">Dr. {visit.doctor}</span>
                          )}
                          {isEditing && (
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => {
                                // Create prescription linked to this visit note
                                const visitNoteId = visit._id || (patient.visitNotes && patient.visitNotes[index]?._id);
                                setPrescriptionFormData({
                                  prescribedBy: visit.doctor || '',
                                  prescriptionDate: new Date(visit.visitDate).toISOString().split('T')[0],
                                  medications: [],
                                  additionalInstructions: '',
                                  refillable: false,
                                  expiryDate: '',
                                  notes: visit.notes || '',
                                });
                                // We'll store the visitNoteId when creating the prescription
                                (window as any).__pendingVisitNoteId = visitNoteId;
                                setShowPrescriptionModal(true);
                              }}
                            >
                              <FileCheck className="w-4 h-4 mr-2" />
                              Create Prescription
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><strong>Chief Complaint:</strong> {visit.chiefComplaint}</p>
                        <p><strong>Diagnosis:</strong> {visit.diagnosis}</p>
                        <p><strong>Treatment:</strong> {visit.treatment}</p>
                        {visit.notes && (
                          <p className="text-gray-700 mt-2">{visit.notes}</p>
                        )}
                        {visit.followUpDate && (
                          <p className="text-primary-600 font-medium mt-2">
                            Follow-up: {new Date(visit.followUpDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No visit notes recorded</p>
            )}
          </Card>
        )}

        {activeTab === 'prescriptions' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Prescriptions</h3>
              <Button 
                size="sm" 
                variant="primary"
                onClick={() => {
                  setPrescriptionFormData({
                    prescribedBy: '',
                    prescriptionDate: new Date().toISOString().split('T')[0],
                    medications: [],
                    additionalInstructions: '',
                    refillable: false,
                    expiryDate: '',
                    notes: '',
                  });
                  setSelectedTemplate('');
                  (window as any).__pendingVisitNoteId = undefined;
                  setShowPrescriptionModal(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Prescription
              </Button>
            </div>
            {prescriptions.length > 0 ? (
              <div className="space-y-4">
                {prescriptions.map((prescription: any) => (
                  <div key={prescription._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">#{prescription.prescriptionNumber}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(prescription.prescriptionDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          prescription.status === 'active' ? 'bg-green-100 text-green-800' :
                          prescription.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {prescription.status.toUpperCase()}
                        </span>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setSelectedPrescription(prescription);
                            setShowPrescriptionDetail(true);
                          }}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handlePrintPrescription(prescription._id)}
                          title="Print Prescription"
                        >
                          <Printer className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Prescribed By:</span>{' '}
                        <span className="font-medium">{prescription.prescribedBy}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Medications:</span>{' '}
                        <span className="font-medium">{prescription.medications?.length || 0}</span>
                      </div>
                      {prescription.refillable && (
                        <div>
                          <span className="text-gray-600">Refillable:</span>{' '}
                          <span className="font-medium text-green-600">Yes</span>
                        </div>
                      )}
                      {prescription.renewalCount > 0 && (
                        <div>
                          <span className="text-gray-600">Renewals:</span>{' '}
                          <span className="font-medium">{prescription.renewalCount}</span>
                        </div>
                      )}
                    </div>
                    {prescription.additionalInstructions && (
                      <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                        {prescription.additionalInstructions}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No prescriptions found</p>
            )}
          </Card>
        )}

        {activeTab === 'family' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Family History</h3>
              {isEditing && (
                <Button 
                  size="sm" 
                  variant="primary"
                  onClick={() => {
                    setNewItemData({});
                    setShowAddModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Family History
                </Button>
              )}
            </div>
            {patient.familyHistory && patient.familyHistory.length > 0 ? (
              <div className="space-y-4">
                {patient.familyHistory.map((history: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-2">{history.condition}</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Relation:</strong> {history.relation}</p>
                      {history.ageOfOnset && (
                        <p><strong>Age of Onset:</strong> {history.ageOfOnset} years</p>
                      )}
                      {history.notes && (
                        <p className="text-gray-700 mt-2">{history.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No family history recorded</p>
            )}
          </Card>
        )}

        {activeTab === 'insurance' && (
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Insurance Information</h3>
            {patient.insurance ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Provider</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.insurance?.provider || ''}
                        onChange={(e) => setEditData({
                          ...editData,
                          insurance: { ...editData.insurance, provider: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                      />
                    ) : (
                      <p className="font-medium">{patient.insurance.provider || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Policy Number</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.insurance?.policyNumber || ''}
                        onChange={(e) => setEditData({
                          ...editData,
                          insurance: { ...editData.insurance, policyNumber: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                      />
                    ) : (
                      <p className="font-medium">{patient.insurance.policyNumber || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Group Number</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.insurance?.groupNumber || ''}
                        onChange={(e) => setEditData({
                          ...editData,
                          insurance: { ...editData.insurance, groupNumber: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                      />
                    ) : (
                      <p className="font-medium">{patient.insurance.groupNumber || 'N/A'}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expiry Date</p>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.insurance?.expiryDate ? new Date(editData.insurance.expiryDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setEditData({
                          ...editData,
                          insurance: { ...editData.insurance, expiryDate: e.target.value ? new Date(e.target.value) : undefined }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                      />
                    ) : (
                      <p className="font-medium">
                        {patient.insurance.expiryDate 
                          ? new Date(patient.insurance.expiryDate).toLocaleDateString() 
                          : 'N/A'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No insurance information recorded</p>
            )}
          </Card>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-display">
                Add {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowAddModal(false);
                  setNewItemData({});
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fieldMap: Record<TabType, string> = {
                  overview: '',
                  medical: 'medicalHistory',
                  allergies: 'allergies',
                  medications: 'medications',
                  vitals: 'vitalSigns',
                  labs: 'labResults',
                  visits: 'visitNotes',
                  prescriptions: '',
                  family: 'familyHistory',
                  insurance: '',
                };
                const field = fieldMap[activeTab];
                if (field) {
                  handleAddItem(field);
                }
              }}
            >
              {getAddModalContent()}
              
              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewItemData({});
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Create Prescription Modal */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-display">Create Prescription</h2>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowPrescriptionModal(false);
                  setPrescriptionFormData({
                    prescribedBy: '',
                    prescriptionDate: new Date().toISOString().split('T')[0],
                    medications: [],
                    additionalInstructions: '',
                    refillable: false,
                    expiryDate: '',
                    notes: '',
                  });
                  setSelectedTemplate('');
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const visitNoteId = (window as any).__pendingVisitNoteId;
                handleCreatePrescription(visitNoteId);
              }}
              className="space-y-6"
            >
              {/* Template Selector */}
              {prescriptionTemplates.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2">Use Template (Optional)</label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select a template...</option>
                    {prescriptionTemplates.map((template: any) => (
                      <option key={template._id} value={template._id}>
                        {template.name} ({template.category})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Prescription Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Prescribed By *</label>
                  <input
                    type="text"
                    value={prescriptionFormData.prescribedBy}
                    onChange={(e) =>
                      setPrescriptionFormData({
                        ...prescriptionFormData,
                        prescribedBy: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                    placeholder="Dr. Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Prescription Date *</label>
                  <input
                    type="date"
                    value={prescriptionFormData.prescriptionDate}
                    onChange={(e) =>
                      setPrescriptionFormData({
                        ...prescriptionFormData,
                        prescriptionDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              {/* Medications */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium">Medications *</label>
                  <Button
                    type="button"
                    size="sm"
                    variant="primary"
                    onClick={addMedicationToPrescription}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Medication
                  </Button>
                </div>
                {prescriptionFormData.medications.length === 0 ? (
                  <p className="text-gray-500 text-sm py-4 text-center">
                    No medications added. Click &quot;Add Medication&quot; to add one.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {prescriptionFormData.medications.map((med: any, index: number) => (
                      <div
                        key={index}
                        className="border border-gray-300 rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">Medication {index + 1}</h4>
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => removeMedicationFromPrescription(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Medication Name *
                            </label>
                            <input
                              type="text"
                              value={med.name || ''}
                              onChange={(e) =>
                                updateMedicationInPrescription(index, 'name', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Dosage *</label>
                            <input
                              type="text"
                              value={med.dosage || ''}
                              onChange={(e) =>
                                updateMedicationInPrescription(index, 'dosage', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder="e.g., 500mg"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Frequency *</label>
                            <input
                              type="text"
                              value={med.frequency || ''}
                              onChange={(e) =>
                                updateMedicationInPrescription(index, 'frequency', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder="e.g., Twice daily"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Duration *</label>
                            <input
                              type="text"
                              value={med.duration || ''}
                              onChange={(e) =>
                                updateMedicationInPrescription(index, 'duration', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              placeholder="e.g., 7 days, 2 weeks"
                              required
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">
                              Instructions
                            </label>
                            <textarea
                              value={med.instructions || ''}
                              onChange={(e) =>
                                updateMedicationInPrescription(index, 'instructions', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              rows={2}
                              placeholder="Additional instructions for this medication"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Additional Instructions */}
              <div>
                <label className="block text-sm font-medium mb-2">Additional Instructions</label>
                <textarea
                  value={prescriptionFormData.additionalInstructions}
                  onChange={(e) =>
                    setPrescriptionFormData({
                      ...prescriptionFormData,
                      additionalInstructions: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="General instructions for all medications"
                />
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="refillable"
                    checked={prescriptionFormData.refillable}
                    onChange={(e) =>
                      setPrescriptionFormData({
                        ...prescriptionFormData,
                        refillable: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="refillable" className="ml-2 text-sm font-medium">
                    Refillable
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <input
                    type="date"
                    value={prescriptionFormData.expiryDate}
                    onChange={(e) =>
                      setPrescriptionFormData({
                        ...prescriptionFormData,
                        expiryDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                <textarea
                  value={prescriptionFormData.notes}
                  onChange={(e) =>
                    setPrescriptionFormData({
                      ...prescriptionFormData,
                      notes: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="Doctor&apos;s notes about this prescription"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowPrescriptionModal(false);
                    setPrescriptionFormData({
                      prescribedBy: '',
                      prescriptionDate: new Date().toISOString().split('T')[0],
                      medications: [],
                      additionalInstructions: '',
                      refillable: false,
                      expiryDate: '',
                      notes: '',
                    });
                    setSelectedTemplate('');
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmittingPrescription || prescriptionFormData.medications.length === 0}
                  className="flex-1"
                >
                  {isSubmittingPrescription ? (
                    'Creating Prescription...'
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Create Prescription
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Prescription Detail Modal */}
      {showPrescriptionDetail && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold font-display">
                  Prescription #{selectedPrescription.prescriptionNumber}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Date: {new Date(selectedPrescription.prescriptionDate).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowPrescriptionDetail(false);
                  setSelectedPrescription(null);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Prescription Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Prescribed By</p>
                  <p className="font-medium">{selectedPrescription.prescribedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    selectedPrescription.status === 'active' ? 'bg-green-100 text-green-800' :
                    selectedPrescription.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedPrescription.status.toUpperCase()}
                  </span>
                </div>
                {selectedPrescription.refillable && (
                  <div>
                    <p className="text-sm text-gray-600">Refillable</p>
                    <p className="font-medium text-green-600">Yes</p>
                  </div>
                )}
                {selectedPrescription.renewalCount > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">Renewals</p>
                    <p className="font-medium">{selectedPrescription.renewalCount}</p>
                  </div>
                )}
                {selectedPrescription.expiryDate && (
                  <div>
                    <p className="text-sm text-gray-600">Expiry Date</p>
                    <p className="font-medium">
                      {new Date(selectedPrescription.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Medications */}
              <div>
                <h3 className="text-lg font-bold mb-4">Medications</h3>
                <div className="space-y-3">
                  {selectedPrescription.medications?.map((med: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Medication</p>
                          <p className="font-medium">{med.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Dosage</p>
                          <p className="font-medium">{med.dosage}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Frequency</p>
                          <p className="font-medium">{med.frequency}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-medium">{med.duration}</p>
                        </div>
                        {med.instructions && (
                          <div className="col-span-2">
                            <p className="text-sm text-gray-600">Instructions</p>
                            <p className="font-medium">{med.instructions}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Instructions */}
              {selectedPrescription.additionalInstructions && (
                <div>
                  <h3 className="text-lg font-bold mb-2">Additional Instructions</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedPrescription.additionalInstructions}
                  </p>
                </div>
              )}

              {/* Notes */}
              {selectedPrescription.notes && (
                <div>
                  <h3 className="text-lg font-bold mb-2">Notes</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedPrescription.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                {selectedPrescription.status === 'active' && selectedPrescription.refillable && (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      if (confirm('Renew this prescription?')) {
                        handleRenewPrescription(selectedPrescription._id);
                        setShowPrescriptionDetail(false);
                        setSelectedPrescription(null);
                      }
                    }}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Renew
                  </Button>
                )}
                <Button
                  variant="primary"
                  onClick={() => handlePrintPrescription(selectedPrescription._id)}
                  className="flex-1"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Prescription
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

