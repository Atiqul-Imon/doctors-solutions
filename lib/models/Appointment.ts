import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  reason: string;
  notes?: string;
  createdAt: Date;
  confirmedAt?: Date;
  cancelledAt?: Date;
}

const AppointmentSchema: Schema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient ID is required'],
    },
    date: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    time: {
      type: String,
      required: [true, 'Appointment time is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      default: 30,
      min: 15,
      max: 120,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
      required: true,
    },
    reason: {
      type: String,
      required: [true, 'Appointment reason is required'],
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    confirmedAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

AppointmentSchema.index({ patientId: 1 });
AppointmentSchema.index({ date: 1 });
AppointmentSchema.index({ status: 1 });
AppointmentSchema.index({ date: 1, time: 1 });
// Composite index for common query pattern: finding appointments by date, time, and status
AppointmentSchema.index({ date: 1, time: 1, status: 1 });
// Index for date range queries with status filter
AppointmentSchema.index({ date: 1, status: 1 });

const Appointment: Model<IAppointment> = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;

