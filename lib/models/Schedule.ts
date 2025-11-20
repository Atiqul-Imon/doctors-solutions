import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISchedule extends Document {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  isAvailable: boolean;
  timeSlots: number[]; // Duration in minutes (e.g., [15, 30, 45, 60])
  dateSpecific?: Date; // For holidays or specific date overrides
  isRecurring: boolean; // true for weekly recurring, false for specific date
  createdAt: Date;
  updatedAt: Date;
}

const ScheduleSchema: Schema = new Schema(
  {
    dayOfWeek: {
      type: Number,
      required: function(this: ISchedule) {
        return this.isRecurring;
      },
      min: 0,
      max: 6,
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide time in HH:mm format'],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide time in HH:mm format'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
      required: true,
    },
    timeSlots: [{
      type: Number,
      min: 15,
      max: 120,
    }],
    dateSpecific: {
      type: Date,
      required: function(this: ISchedule) {
        return !this.isRecurring;
      },
    },
    isRecurring: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ScheduleSchema.index({ dayOfWeek: 1, isRecurring: 1 });
ScheduleSchema.index({ dateSpecific: 1, isRecurring: 1 });

const Schedule: Model<ISchedule> = mongoose.models.Schedule || mongoose.model<ISchedule>('Schedule', ScheduleSchema);

export default Schedule;

