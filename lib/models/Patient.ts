import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  email?: string;
  phone: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  address?: {
    zilla?: string;
    upazilla?: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  medicalHistory?: Array<{
    condition: string;
    diagnosedDate?: Date;
    status: 'active' | 'resolved' | 'chronic';
    notes?: string;
    doctor?: string;
  }>;
  allergies?: Array<{
    allergen: string;
    reaction: string;
    severity: 'mild' | 'moderate' | 'severe';
    notes?: string;
  }>;
  medications?: Array<{
    name: string;
    dosage: string;
    frequency: string;
    startDate?: Date;
    endDate?: Date;
    prescribedBy?: string;
    notes?: string;
  }>;
  vitalSigns?: Array<{
    date: Date;
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    weight?: number;
    height?: number;
    bmi?: number;
    notes?: string;
  }>;
  labResults?: Array<{
    testName: string;
    testDate: Date;
    results: string;
    normalRange?: string;
    status: 'normal' | 'abnormal' | 'critical';
    notes?: string;
    fileUrl?: string;
  }>;
  visitNotes?: Array<{
    visitDate: Date;
    chiefComplaint: string;
    diagnosis: string;
    treatment: string;
    notes: string;
    doctor: string;
    followUpDate?: Date;
  }>;
  familyHistory?: Array<{
    condition: string;
    relation: string;
    ageOfOnset?: number;
    notes?: string;
  }>;
  insurance?: {
    provider?: string;
    policyNumber?: string;
    groupNumber?: string;
    expiryDate?: Date;
  };
  notes?: string;
  registeredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [1, 'Name must be at least 1 character'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      sparse: true, // Allow multiple null values but enforce uniqueness for non-null values
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    address: {
      zilla: String,
      upazilla: String,
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
      email: String,
    },
    medicalHistory: [{
      condition: {
        type: String,
        required: true,
      },
      diagnosedDate: Date,
      status: {
        type: String,
        enum: ['active', 'resolved', 'chronic'],
        default: 'active',
      },
      notes: String,
      doctor: String,
    }],
    allergies: [{
      allergen: {
        type: String,
        required: true,
      },
      reaction: String,
      severity: {
        type: String,
        enum: ['mild', 'moderate', 'severe'],
        default: 'mild',
      },
      notes: String,
    }],
    medications: [{
      name: {
        type: String,
        required: true,
      },
      dosage: String,
      frequency: String,
      startDate: Date,
      endDate: Date,
      prescribedBy: String,
      notes: String,
    }],
    vitalSigns: [{
      date: {
        type: Date,
        required: true,
      },
      bloodPressure: String,
      heartRate: Number,
      temperature: Number,
      weight: Number,
      height: Number,
      bmi: Number,
      notes: String,
    }],
    labResults: [{
      testName: {
        type: String,
        required: true,
      },
      testDate: {
        type: Date,
        required: true,
      },
      results: String,
      normalRange: String,
      status: {
        type: String,
        enum: ['normal', 'abnormal', 'critical'],
        default: 'normal',
      },
      notes: String,
      fileUrl: String,
    }],
    visitNotes: [{
      visitDate: {
        type: Date,
        required: true,
      },
      chiefComplaint: String,
      diagnosis: String,
      treatment: String,
      notes: String,
      doctor: String,
      followUpDate: Date,
    }],
    familyHistory: [{
      condition: {
        type: String,
        required: true,
      },
      relation: String,
      ageOfOnset: Number,
      notes: String,
    }],
    insurance: {
      provider: String,
      policyNumber: String,
      groupNumber: String,
      expiryDate: Date,
    },
    notes: String,
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

PatientSchema.index({ email: 1 }, { sparse: true }); // Sparse index since email is optional
PatientSchema.index({ phone: 1 });
PatientSchema.index({ name: 1 });

const Patient: Model<IPatient> = mongoose.models.Patient || mongoose.model<IPatient>('Patient', PatientSchema);

export default Patient;

