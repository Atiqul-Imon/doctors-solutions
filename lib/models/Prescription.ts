import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPrescription extends Document {
  prescriptionNumber: string; // Auto-generated: PRS-YYYY-MM-XXXXX
  patientId: mongoose.Types.ObjectId;
  visitNoteId?: mongoose.Types.ObjectId; // Optional reference to visit note
  prescribedBy: string; // Doctor name
  prescriptionDate: Date;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string; // e.g., "7 days", "2 weeks", "1 month"
    instructions?: string; // Additional instructions for this medication
    _id?: mongoose.Types.ObjectId;
  }>;
  additionalInstructions?: string; // General instructions for all medications
  status: 'active' | 'completed' | 'cancelled';
  renewalCount: number; // Number of times prescription has been renewed
  refillable: boolean; // Whether prescription can be refilled
  expiryDate?: Date; // When prescription expires
  notes?: string; // Doctor's notes about the prescription
  createdAt: Date;
  updatedAt: Date;
}

const PrescriptionSchema: Schema = new Schema(
  {
    prescriptionNumber: {
      type: String,
      unique: true,
      sparse: true, // Allow multiple null values but enforce uniqueness for non-null values
      trim: true,
      uppercase: true,
      required: [true, 'Prescription number is required'], // Required but auto-generated before validation
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient ID is required'],
    },
    visitNoteId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      // Reference to visit note within patient document
    },
    prescribedBy: {
      type: String,
      required: [true, 'Prescribing doctor name is required'],
      trim: true,
    },
    prescriptionDate: {
      type: Date,
      required: [true, 'Prescription date is required'],
      default: Date.now,
    },
    medications: [
      {
        name: {
          type: String,
          required: [true, 'Medication name is required'],
          trim: true,
        },
        dosage: {
          type: String,
          required: [true, 'Dosage is required'],
          trim: true,
        },
        frequency: {
          type: String,
          required: [true, 'Frequency is required'],
          trim: true,
        },
        duration: {
          type: String,
          required: [true, 'Duration is required'],
          trim: true,
        },
        instructions: {
          type: String,
          trim: true,
        },
      },
    ],
    additionalInstructions: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
      required: true,
    },
    renewalCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    refillable: {
      type: Boolean,
      default: false,
    },
    expiryDate: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
PrescriptionSchema.index({ patientId: 1 });
PrescriptionSchema.index({ prescriptionNumber: 1 });
PrescriptionSchema.index({ prescriptionDate: 1 });
PrescriptionSchema.index({ status: 1 });
PrescriptionSchema.index({ patientId: 1, prescriptionDate: -1 });
// Composite index for common query pattern: patient prescriptions filtered by status
PrescriptionSchema.index({ patientId: 1, status: 1, prescriptionDate: -1 });
// Index for date range queries with status filter
PrescriptionSchema.index({ prescriptionDate: -1, status: 1 });

// Auto-generate prescription number before validation
PrescriptionSchema.pre('validate', async function (next) {
  // Only generate if it's a new document and prescriptionNumber is not already set
  if (!this.isNew || this.prescriptionNumber) {
    return next();
  }

  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    
    // Find the last prescription number for this month
    const lastPrescription = await mongoose
      .model<IPrescription>('Prescription')
      .findOne({
        prescriptionNumber: new RegExp(`^PRS-${year}-${month}-`),
      })
      .sort({ prescriptionNumber: -1 })
      .lean();

    let sequence = 1;
    if (lastPrescription && lastPrescription.prescriptionNumber) {
      const parts = lastPrescription.prescriptionNumber.split('-');
      if (parts.length >= 3) {
        const lastSequence = parseInt(parts[parts.length - 1] || '0');
        if (!isNaN(lastSequence)) {
          sequence = lastSequence + 1;
        }
      }
    }

    this.prescriptionNumber = `PRS-${year}-${month}-${String(sequence).padStart(5, '0')}`;
    next();
  } catch (error: any) {
    console.error('Error generating prescription number:', error);
    next(error);
  }
});

const Prescription: Model<IPrescription> =
  mongoose.models.Prescription || mongoose.model<IPrescription>('Prescription', PrescriptionSchema);

export default Prescription;

