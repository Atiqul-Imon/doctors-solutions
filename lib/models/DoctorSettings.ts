import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDoctorSettings extends Document {
  // Doctor Information
  doctorName: string; // ডা: মো: তোজাম্মেল হক
  doctorNameEnglish?: string; // Dr. Md. Tozammel Haque
  qualifications: string[]; // ["এম.বি.বি.এস", "বিসিএস (স্বাস্থ্য)"]
  specialization: string; // "এফসিপিএস (গ্যাস্ট্রোএন্টারোলজী) থিসিস"
  specialties: string[]; // ["মেডিসিন", "গ্যাস্ট্রিক", "লিভার পরিপাকতন্ত্র ও অগ্নাশয় চিকিৎসক"]
  
  // Hospital/Clinic Information
  hospitalName: string; // "জামালপুর পপুলার হাসপাতাল (প্রাঃ)"
  hospitalNameEnglish?: string; // "Jamalpur Popular Hospital (Pvt.)"
  hospitalAddress: string; // Full address
  hospitalAffiliation?: string; // "শেখ রাসেল গ্যাস্ট্রো-লিভার ইনস্টিটিউট ও হাসপাতাল, মহাখালী, ঢাকা।"
  
  // Chamber/Clinic Details
  chamberName: string; // "জামালপুর পপুলার হাসপাতাল (প্রা:)"
  chamberAddress: string; // Detailed chamber address
  chamberPhone: string[]; // ["০১৭৮৮-৯৯০৮৪৪", "০১৬১১-১৯০৮৪৪"]
  chamberPhoneEnglish?: string[]; // ["01788-990844", "01611-190844"]
  
  // Consultation Hours
  consultationHours: string; // "রোগী দেখার সময়: প্রতি শুক্রবার সকাল ১১টা থেকে সন্ধ্যা ৭টা পর্যন্ত।"
  
  // Logo and Branding
  logoText?: string; // "JPH" or hospital initials
  tagline?: string; // "সেবাই পরম ধর্ম"
  
  // Prescription Settings
  showWatermark: boolean;
  watermarkText?: string;
  prescriptionFooter?: string; // Custom footer text
  
  // Follow-up Instructions
  followUpInstructions?: string; // "দিন/সপ্তাহ/মাস পর আসবেন।"
  nextVisitInstructions?: string; // "পরবর্তী সাক্ষাতের সময়- ব্যবস্থাপত্র ও রিপোর্ট সাথে আনবেন।"
  
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSettingsSchema: Schema = new Schema(
  {
    doctorName: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },
    doctorNameEnglish: {
      type: String,
      trim: true,
    },
    qualifications: [{
      type: String,
      trim: true,
    }],
    specialization: {
      type: String,
      trim: true,
    },
    specialties: [{
      type: String,
      trim: true,
    }],
    hospitalName: {
      type: String,
      required: [true, 'Hospital name is required'],
      trim: true,
    },
    hospitalNameEnglish: {
      type: String,
      trim: true,
    },
    hospitalAddress: {
      type: String,
      trim: true,
    },
    hospitalAffiliation: {
      type: String,
      trim: true,
    },
    chamberName: {
      type: String,
      required: [true, 'Chamber name is required'],
      trim: true,
    },
    chamberAddress: {
      type: String,
      required: [true, 'Chamber address is required'],
      trim: true,
    },
    chamberPhone: [{
      type: String,
      trim: true,
    }],
    chamberPhoneEnglish: [{
      type: String,
      trim: true,
    }],
    consultationHours: {
      type: String,
      trim: true,
    },
    logoText: {
      type: String,
      trim: true,
    },
    tagline: {
      type: String,
      trim: true,
    },
    showWatermark: {
      type: Boolean,
      default: true,
    },
    watermarkText: {
      type: String,
      trim: true,
    },
    prescriptionFooter: {
      type: String,
      trim: true,
    },
    followUpInstructions: {
      type: String,
      trim: true,
    },
    nextVisitInstructions: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one settings document exists
DoctorSettingsSchema.index({}, { unique: true });

const DoctorSettings: Model<IDoctorSettings> =
  mongoose.models.DoctorSettings ||
  mongoose.model<IDoctorSettings>('DoctorSettings', DoctorSettingsSchema);

export default DoctorSettings;

