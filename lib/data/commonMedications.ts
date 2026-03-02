// Common medications database for autocomplete and dosage suggestions
export interface MedicationData {
  name: string;
  genericName?: string;
  category: string;
  commonDosages: string[];
  frequencies: string[];
  forms: string[]; // tablet, capsule, syrup, injection, etc.
  commonDurations: string[];
  ageRestrictions?: string;
  weightBasedDosing?: boolean;
  contraindications?: string[];
  sideEffects?: string[];
}

export const commonMedications: MedicationData[] = [
  // Pain & Fever
  {
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    category: 'Analgesic/Antipyretic',
    commonDosages: ['500mg', '650mg', '1000mg', '120mg/5ml (syrup)'],
    frequencies: ['Every 6 hours', 'Every 8 hours', '3 times daily', 'As needed'],
    forms: ['Tablet', 'Capsule', 'Syrup'],
    commonDurations: ['3 days', '5 days', '7 days', 'As needed'],
    contraindications: ['Severe liver disease'],
    sideEffects: ['Rare - liver damage with overdose'],
  },
  {
    name: 'Ibuprofen',
    category: 'NSAID',
    commonDosages: ['200mg', '400mg', '600mg', '800mg'],
    frequencies: ['Every 6-8 hours', '3 times daily', 'As needed'],
    forms: ['Tablet', 'Capsule', 'Syrup'],
    commonDurations: ['3-5 days', '7 days', 'As needed'],
    contraindications: ['Peptic ulcer', 'Bleeding disorders', 'Pregnancy (3rd trimester)'],
    sideEffects: ['GI upset', 'Bleeding risk'],
  },

  // Antibiotics
  {
    name: 'Amoxicillin',
    category: 'Antibiotic (Penicillin)',
    commonDosages: ['250mg', '500mg', '875mg', '125mg/5ml (syrup)'],
    frequencies: ['3 times daily', 'Twice daily (for 875mg)'],
    forms: ['Capsule', 'Tablet', 'Syrup'],
    commonDurations: ['5 days', '7 days', '10 days'],
    contraindications: ['Penicillin allergy'],
    sideEffects: ['Diarrhea', 'Rash', 'Nausea'],
  },
  {
    name: 'Azithromycin',
    category: 'Antibiotic (Macrolide)',
    commonDosages: ['250mg', '500mg', '200mg/5ml (syrup)'],
    frequencies: ['Once daily'],
    forms: ['Tablet', 'Capsule', 'Syrup'],
    commonDurations: ['3 days', '5 days'],
    sideEffects: ['Diarrhea', 'Nausea', 'Abdominal pain'],
  },
  {
    name: 'Ciprofloxacin',
    category: 'Antibiotic (Fluoroquinolone)',
    commonDosages: ['250mg', '500mg', '750mg'],
    frequencies: ['Twice daily'],
    forms: ['Tablet'],
    commonDurations: ['5-7 days', '10 days', '14 days'],
    ageRestrictions: 'Not recommended for children',
    contraindications: ['Pregnancy', 'Tendon problems'],
    sideEffects: ['Tendon rupture risk', 'GI upset'],
  },

  // Antihistamines
  {
    name: 'Cetirizine',
    category: 'Antihistamine',
    commonDosages: ['5mg', '10mg', '5mg/5ml (syrup)'],
    frequencies: ['Once daily (evening)', 'Twice daily'],
    forms: ['Tablet', 'Syrup'],
    commonDurations: ['7 days', '14 days', 'As needed'],
    sideEffects: ['Drowsiness (mild)', 'Dry mouth'],
  },
  {
    name: 'Loratadine',
    category: 'Antihistamine',
    commonDosages: ['10mg', '5mg (for children)'],
    frequencies: ['Once daily'],
    forms: ['Tablet', 'Syrup'],
    commonDurations: ['7 days', '14 days', 'As needed'],
    sideEffects: ['Non-drowsy', 'Headache'],
  },

  // Antacids/GI
  {
    name: 'Omeprazole',
    category: 'Proton Pump Inhibitor',
    commonDosages: ['20mg', '40mg'],
    frequencies: ['Once daily (morning, before meal)'],
    forms: ['Capsule'],
    commonDurations: ['14 days', '28 days', '2 months'],
    sideEffects: ['Headache', 'Diarrhea', 'Abdominal pain'],
  },
  {
    name: 'Ranitidine',
    category: 'H2 Blocker',
    commonDosages: ['150mg', '300mg'],
    frequencies: ['Twice daily', 'Once daily at bedtime'],
    forms: ['Tablet'],
    commonDurations: ['14 days', '28 days'],
    sideEffects: ['Headache', 'Constipation'],
  },

  // Antidiabetics
  {
    name: 'Metformin',
    category: 'Antidiabetic',
    commonDosages: ['500mg', '850mg', '1000mg', '500mg XR', '750mg XR'],
    frequencies: ['Twice daily (with meals)', 'Once daily (XR)'],
    forms: ['Tablet', 'Extended Release'],
    commonDurations: ['Long-term', 'Ongoing'],
    contraindications: ['Renal impairment', 'Liver disease'],
    sideEffects: ['GI upset', 'Diarrhea', 'Lactic acidosis (rare)'],
  },

  // Antihypertensives
  {
    name: 'Amlodipine',
    category: 'Calcium Channel Blocker',
    commonDosages: ['2.5mg', '5mg', '10mg'],
    frequencies: ['Once daily'],
    forms: ['Tablet'],
    commonDurations: ['Long-term', 'Ongoing'],
    sideEffects: ['Ankle swelling', 'Flushing', 'Headache'],
  },
  {
    name: 'Losartan',
    category: 'ARB (Angiotensin Receptor Blocker)',
    commonDosages: ['25mg', '50mg', '100mg'],
    frequencies: ['Once daily'],
    forms: ['Tablet'],
    commonDurations: ['Long-term', 'Ongoing'],
    contraindications: ['Pregnancy'],
    sideEffects: ['Dizziness', 'Hyperkalemia'],
  },

  // Cough & Cold
  {
    name: 'Dextromethorphan',
    category: 'Cough Suppressant',
    commonDosages: ['10mg', '15mg', '30mg', '10mg/5ml (syrup)'],
    frequencies: ['Every 6-8 hours', 'As needed'],
    forms: ['Tablet', 'Syrup'],
    commonDurations: ['3-5 days', 'As needed'],
    sideEffects: ['Drowsiness', 'Dizziness'],
  },

  // Vitamins
  {
    name: 'Vitamin D3',
    category: 'Vitamin Supplement',
    commonDosages: ['1000 IU', '2000 IU', '5000 IU', '60,000 IU (weekly)'],
    frequencies: ['Once daily', 'Once weekly (high dose)'],
    forms: ['Tablet', 'Capsule', 'Syrup'],
    commonDurations: ['1 month', '3 months', 'Long-term'],
    sideEffects: ['Rare - hypercalcemia with overdose'],
  },
];

// Search medications by name
export function searchMedications(query: string): MedicationData[] {
  const lowerQuery = query.toLowerCase();
  return commonMedications.filter(
    (med) =>
      med.name.toLowerCase().includes(lowerQuery) ||
      med.genericName?.toLowerCase().includes(lowerQuery)
  );
}

// Get medication by exact name
export function getMedication(name: string): MedicationData | undefined {
  return commonMedications.find(
    (med) => med.name.toLowerCase() === name.toLowerCase()
  );
}

// Get dosage suggestions based on age and weight
export function getDosageSuggestion(
  medicationName: string,
  ageYears?: number,
  weightKg?: number
): string | null {
  const med = getMedication(medicationName);
  if (!med) return null;

  // Simple rules for common medications (pediatric dosing)
  if (medicationName.toLowerCase() === 'paracetamol' && ageYears && ageYears < 12) {
    // Pediatric paracetamol: 10-15 mg/kg/dose
    if (weightKg) {
      const dose = Math.round(weightKg * 12); // 12 mg/kg
      return `${dose}mg (approximately ${Math.round(dose / 250) * 250}mg)`;
    }
    return '10-15 mg/kg per dose';
  }

  // Default to most common dosage
  return med.commonDosages.length > 0 ? med.commonDosages[0] : null;
}

// Check for basic contraindications
export function checkContraindications(
  medicationName: string,
  patientAllergies: string[]
): string[] {
  const warnings: string[] = [];
  const med = getMedication(medicationName);
  
  if (!med) return warnings;

  // Check allergies
  if (med.category.includes('Penicillin')) {
    if (patientAllergies.some((a) => a.toLowerCase().includes('penicillin'))) {
      warnings.push('⚠️ CRITICAL: Patient has penicillin allergy!');
    }
  }

  // Add contraindication warnings
  if (med.contraindications) {
    warnings.push(...med.contraindications.map((c) => `Contraindication: ${c}`));
  }

  return warnings;
}
