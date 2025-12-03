'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Settings as SettingsIcon, Save, User, Building2, Phone, Clock, FileText } from 'lucide-react';

interface DoctorSettings {
  doctorName: string;
  doctorNameEnglish?: string;
  qualifications: string[];
  specialization: string;
  specialties: string[];
  hospitalName: string;
  hospitalNameEnglish?: string;
  hospitalAddress: string;
  hospitalAffiliation?: string;
  chamberName: string;
  chamberAddress: string;
  chamberPhone: string[];
  chamberPhoneEnglish?: string[];
  consultationHours: string;
  logoText?: string;
  tagline?: string;
  showWatermark: boolean;
  watermarkText?: string;
  followUpInstructions?: string;
  nextVisitInstructions?: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [settings, setSettings] = useState<DoctorSettings>({
    doctorName: '',
    qualifications: [],
    specialization: '',
    specialties: [],
    hospitalName: '',
    hospitalAddress: '',
    chamberName: '',
    chamberAddress: '',
    chamberPhone: [],
    consultationHours: '',
    showWatermark: true,
    tagline: 'সেবাই পরম ধর্ম',
    followUpInstructions: 'দিন/সপ্তাহ/মাস পর আসবেন।',
    nextVisitInstructions: 'পরবর্তী সাক্ষাতের সময়- ব্যবস্থাপত্র ও রিপোর্ট সাথে আনবেন।',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch('/api/doctor-settings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Ensure arrays are initialized
          const settingsData = data.data;
          setSettings({
            ...settingsData,
            qualifications: settingsData.qualifications || [],
            specialties: settingsData.specialties || [],
            chamberPhone: settingsData.chamberPhone || [],
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage('');

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setSaveMessage('Authentication required');
        return;
      }

      const response = await fetch('/api/doctor-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (data.success) {
        setSaveMessage('Settings saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage(data.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSaveMessage('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof DoctorSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const addQualification = () => {
    setSettings((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, ''],
    }));
  };

  const updateQualification = (index: number, value: string) => {
    setSettings((prev) => {
      const newQuals = [...prev.qualifications];
      newQuals[index] = value;
      return { ...prev, qualifications: newQuals };
    });
  };

  const removeQualification = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index),
    }));
  };

  const addSpecialty = () => {
    setSettings((prev) => ({
      ...prev,
      specialties: [...prev.specialties, ''],
    }));
  };

  const updateSpecialty = (index: number, value: string) => {
    setSettings((prev) => {
      const newSpecs = [...prev.specialties];
      newSpecs[index] = value;
      return { ...prev, specialties: newSpecs };
    });
  };

  const removeSpecialty = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index),
    }));
  };

  const addPhone = () => {
    setSettings((prev) => ({
      ...prev,
      chamberPhone: [...prev.chamberPhone, ''],
    }));
  };

  const updatePhone = (index: number, value: string) => {
    setSettings((prev) => {
      const newPhones = [...prev.chamberPhone];
      newPhones[index] = value;
      return { ...prev, chamberPhone: newPhones };
    });
  };

  const removePhone = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      chamberPhone: prev.chamberPhone.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display">Prescription Settings</h1>
        <p className="text-gray-600 mt-2">Configure your prescription pad design and information</p>
      </div>

      {saveMessage && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            saveMessage.includes('success')
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {saveMessage}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-6"
      >
        {/* Doctor Information */}
        <Card variant="elevated" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold font-display">Doctor Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Doctor Name (Bengali) *
              </label>
              <input
                type="text"
                value={settings.doctorName}
                onChange={(e) => updateField('doctorName', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="ডা: মো: তোজাম্মেল হক"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Doctor Name (English)
              </label>
              <input
                type="text"
                value={settings.doctorNameEnglish || ''}
                onChange={(e) => updateField('doctorNameEnglish', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Dr. Md. Tozammel Haque"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Qualifications *
              </label>
              {settings.qualifications.map((qual, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={qual}
                    onChange={(e) => updateQualification(index, e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="এম.বি.বি.এস"
                    required
                  />
                  {settings.qualifications.length > 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => removeQualification(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addQualification}>
                + Add Qualification
              </Button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Specialization
              </label>
              <input
                type="text"
                value={settings.specialization}
                onChange={(e) => updateField('specialization', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="এফসিপিএস (গ্যাস্ট্রোএন্টারোলজী) থিসিস"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Specialties *
              </label>
              {settings.specialties.map((spec, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={spec}
                    onChange={(e) => updateSpecialty(index, e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="মেডিসিন"
                    required
                  />
                  {settings.specialties.length > 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => removeSpecialty(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addSpecialty}>
                + Add Specialty
              </Button>
            </div>
          </div>
        </Card>

        {/* Hospital/Clinic Information */}
        <Card variant="elevated" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold font-display">Hospital/Clinic Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hospital Name (Bengali) *
              </label>
              <input
                type="text"
                value={settings.hospitalName}
                onChange={(e) => updateField('hospitalName', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="জামালপুর পপুলার হাসপাতাল (প্রাঃ)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hospital Name (English)
              </label>
              <input
                type="text"
                value={settings.hospitalNameEnglish || ''}
                onChange={(e) => updateField('hospitalNameEnglish', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Jamalpur Popular Hospital (Pvt.)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hospital Address
              </label>
              <textarea
                value={settings.hospitalAddress}
                onChange={(e) => updateField('hospitalAddress', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={2}
                placeholder="Hospital address"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hospital Affiliation
              </label>
              <input
                type="text"
                value={settings.hospitalAffiliation || ''}
                onChange={(e) => updateField('hospitalAffiliation', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="শেখ রাসেল গ্যাস্ট্রো-লিভার ইনস্টিটিউট ও হাসপাতাল, মহাখালী, ঢাকা।"
              />
            </div>
          </div>
        </Card>

        {/* Chamber Details */}
        <Card variant="elevated" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Phone className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold font-display">Chamber Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Chamber Name *
              </label>
              <input
                type="text"
                value={settings.chamberName}
                onChange={(e) => updateField('chamberName', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="জামালপুর পপুলার হাসপাতাল (প্রা:)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Chamber Address *
              </label>
              <textarea
                value={settings.chamberAddress}
                onChange={(e) => updateField('chamberAddress', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={3}
                placeholder="পাঁচ রাস্তার মোড় রেলক্রসিং থেকে ২০০ গজ পশ্চিম পার্শ্বে, ৯ তলা ভবন, শেখের ভিটা, জামালপুর।"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Chamber Phone Numbers (Bengali) *
              </label>
              {settings.chamberPhone.map((phone, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => updatePhone(index, e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="০১৭৮৮-৯৯০৮৪৪"
                    required
                  />
                  {settings.chamberPhone.length > 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => removePhone(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addPhone}>
                + Add Phone Number
              </Button>
            </div>
          </div>
        </Card>

        {/* Consultation Hours */}
        <Card variant="elevated" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold font-display">Consultation Hours</h2>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Consultation Hours
            </label>
            <input
              type="text"
              value={settings.consultationHours}
              onChange={(e) => updateField('consultationHours', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="রোগী দেখার সময়: প্রতি শুক্রবার সকাল ১১টা থেকে সন্ধ্যা ৭টা পর্যন্ত।"
            />
          </div>
        </Card>

        {/* Branding */}
        <Card variant="elevated" className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold font-display">Branding & Logo</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Logo Text (Initials)
              </label>
              <input
                type="text"
                value={settings.logoText || ''}
                onChange={(e) => updateField('logoText', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="JPH"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={settings.tagline || ''}
                onChange={(e) => updateField('tagline', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="সেবাই পরম ধর্ম"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="showWatermark"
                checked={settings.showWatermark}
                onChange={(e) => updateField('showWatermark', e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <label htmlFor="showWatermark" className="text-sm font-semibold text-gray-700">
                Show Watermark on Prescription
              </label>
            </div>

            {settings.showWatermark && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Watermark Text
                </label>
                <input
                  type="text"
                  value={settings.watermarkText || settings.logoText || ''}
                  onChange={(e) => updateField('watermarkText', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="JPH"
                />
              </div>
            )}
          </div>
        </Card>

        {/* Follow-up Instructions */}
        <Card variant="elevated" className="p-6">
          <h2 className="text-xl font-bold font-display mb-4">Follow-up Instructions</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Follow-up Instructions
              </label>
              <input
                type="text"
                value={settings.followUpInstructions || ''}
                onChange={(e) => updateField('followUpInstructions', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="দিন/সপ্তাহ/মাস পর আসবেন।"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Next Visit Instructions
              </label>
              <textarea
                value={settings.nextVisitInstructions || ''}
                onChange={(e) => updateField('nextVisitInstructions', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={2}
                placeholder="পরবর্তী সাক্ষাতের সময়- ব্যবস্থাপত্র ও রিপোর্ট সাথে আনবেন।"
              />
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={saving}
            isLoading={saving}
            className="flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}
