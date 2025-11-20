'use client';

import { useState, useEffect, useCallback } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FileCheck, Plus, Edit, Trash2, Save, X, Search } from 'lucide-react';

export default function PrescriptionTemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    medications: [] as any[],
    defaultInstructions: '',
    category: 'general' as 'general' | 'fever' | 'cold' | 'infection' | 'pain' | 'allergy' | 'chronic' | 'other',
    createdBy: 'Dr. Admin',
  });

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/prescription-templates?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTemplates(data.data || []);
        }
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      if (formData.medications.length === 0) {
        alert('Please add at least one medication to the template');
        setIsSubmitting(false);
        return;
      }

      const url = editingTemplate
        ? `/api/prescription-templates/${editingTemplate._id}`
        : '/api/prescription-templates';
      const method = editingTemplate ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(editingTemplate ? 'Template updated successfully!' : 'Template created successfully!');
        setShowAddModal(false);
        setEditingTemplate(null);
        setFormData({
          name: '',
          description: '',
          medications: [],
          defaultInstructions: '',
          category: 'general',
          createdBy: 'Dr. Admin',
        });
        fetchTemplates();
      } else {
        alert(data.error || 'Failed to save template');
      }
    } catch (error) {
      console.error('Failed to save template:', error);
      alert('Failed to save template. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch(`/api/prescription-templates/${templateId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        alert('Template deleted successfully!');
        fetchTemplates();
      } else {
        alert(data.error || 'Failed to delete template');
      }
    } catch (error) {
      console.error('Failed to delete template:', error);
      alert('Failed to delete template');
    }
  };

  const handleEdit = (template: any) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      description: template.description || '',
      medications: template.medications || [],
      defaultInstructions: template.defaultInstructions || '',
      category: template.category || 'general',
      createdBy: template.createdBy || 'Dr. Admin',
    });
    setShowAddModal(true);
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        { name: '', dosage: '', frequency: '', duration: '', instructions: '' },
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
    const newMedications = [...formData.medications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    setFormData({ ...formData, medications: newMedications });
  };

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'general', label: 'General' },
    { value: 'fever', label: 'Fever' },
    { value: 'cold', label: 'Cold' },
    { value: 'infection', label: 'Infection' },
    { value: 'pain', label: 'Pain' },
    { value: 'allergy', label: 'Allergy' },
    { value: 'chronic', label: 'Chronic' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display">Prescription Templates</h1>
          <p className="text-gray-600 mt-2">Manage common prescription templates</p>
        </div>
        <Button variant="primary" onClick={() => {
          setEditingTemplate(null);
          setFormData({
            name: '',
            description: '',
            medications: [],
            defaultInstructions: '',
            category: 'general',
            createdBy: 'Dr. Admin',
          });
          setShowAddModal(true);
        }}>
          <Plus className="w-5 h-5 mr-2" />
          New Template
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Templates List */}
      <Card>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading templates...</p>
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-12">
            <FileCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No templates found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div key={template._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{template.name}</h3>
                    <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs font-medium mt-1">
                      {template.category}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(template)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDelete(template._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {template.description && (
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                )}
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Medications:</strong> {template.medications?.length || 0}
                </div>
                <div className="text-xs text-gray-500">
                  Used {template.usageCount || 0} times
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Add/Edit Template Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-display">
                {editingTemplate ? 'Edit Template' : 'Create Template'}
              </h2>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingTemplate(null);
                  setFormData({
                    name: '',
                    description: '',
                    medications: [],
                    defaultInstructions: '',
                    category: 'general',
                    createdBy: 'Dr. Admin',
                  });
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Template Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    {categories.filter(c => c.value).map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={2}
                  placeholder="Brief description of when to use this template"
                />
              </div>

              {/* Medications */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium">Medications *</label>
                  <Button type="button" size="sm" variant="primary" onClick={addMedication}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Medication
                  </Button>
                </div>
                {formData.medications.length === 0 ? (
                  <p className="text-gray-500 text-sm py-4 text-center">
                    No medications added. Click &quot;Add Medication&quot; to add one.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {formData.medications.map((med: any, index: number) => (
                      <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium">Medication {index + 1}</h4>
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => removeMedication(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Name *</label>
                            <input
                              type="text"
                              value={med.name || ''}
                              onChange={(e) => updateMedication(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Dosage *</label>
                            <input
                              type="text"
                              value={med.dosage || ''}
                              onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Frequency *</label>
                            <input
                              type="text"
                              value={med.frequency || ''}
                              onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Duration *</label>
                            <input
                              type="text"
                              value={med.duration || ''}
                              onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              required
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Instructions</label>
                            <textarea
                              value={med.instructions || ''}
                              onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Default Instructions</label>
                <textarea
                  value={formData.defaultInstructions}
                  onChange={(e) => setFormData({ ...formData, defaultInstructions: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="Default instructions for all medications in this template"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingTemplate(null);
                    setFormData({
                      name: '',
                      description: '',
                      medications: [],
                      defaultInstructions: '',
                      category: 'general',
                      createdBy: 'Dr. Admin',
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || formData.medications.length === 0}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    'Saving...'
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {editingTemplate ? 'Update Template' : 'Create Template'}
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

