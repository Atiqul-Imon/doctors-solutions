import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPrescriptionTemplate extends Document {
  name: string;
  description?: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    mealTiming?: 'before' | 'during' | 'after'; // খাওয়ার আগে/মধ্যে/পরে
    instructions?: string;
    _id?: mongoose.Types.ObjectId;
  }>;
  defaultInstructions?: string;
  category: 'general' | 'fever' | 'cold' | 'infection' | 'pain' | 'allergy' | 'chronic' | 'other';
  createdBy: string; // Doctor/admin name
  usageCount: number; // How many times this template has been used
  createdAt: Date;
  updatedAt: Date;
}

const PrescriptionTemplateSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Template name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
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
        mealTiming: {
          type: String,
          enum: ['before', 'during', 'after'],
          trim: true,
        },
        instructions: {
          type: String,
          trim: true,
        },
      },
    ],
    defaultInstructions: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ['general', 'fever', 'cold', 'infection', 'pain', 'allergy', 'chronic', 'other'],
      default: 'general',
      required: true,
    },
    createdBy: {
      type: String,
      required: [true, 'Created by field is required'],
      trim: true,
    },
    usageCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

PrescriptionTemplateSchema.index({ category: 1 });
PrescriptionTemplateSchema.index({ name: 1 });
PrescriptionTemplateSchema.index({ createdBy: 1 });

const PrescriptionTemplate: Model<IPrescriptionTemplate> =
  mongoose.models.PrescriptionTemplate ||
  mongoose.model<IPrescriptionTemplate>('PrescriptionTemplate', PrescriptionTemplateSchema);

export default PrescriptionTemplate;

