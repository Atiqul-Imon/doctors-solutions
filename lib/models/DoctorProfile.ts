import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDoctorProfile extends Document {
  name: string;
  qualifications: string[];
  specializations: string[];
  bio: string;
  experience: number;
  education: Array<{
    degree: string;
    institution: string;
    year: number;
  }>;
  achievements: Array<{
    title: string;
    description: string;
    year?: number;
  }>;
  contactInfo: {
    email: string;
    phone: string;
    emergency?: string;
  };
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  profileImage?: string;
  clinicAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const DoctorProfileSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },
    qualifications: [{
      type: String,
      trim: true,
    }],
    specializations: [{
      type: String,
      trim: true,
    }],
    bio: {
      type: String,
      required: [true, 'Bio is required'],
    },
    experience: {
      type: Number,
      required: [true, 'Experience is required'],
      min: 0,
    },
    education: [{
      degree: {
        type: String,
        required: true,
      },
      institution: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
    }],
    achievements: [{
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      year: {
        type: Number,
      },
    }],
    contactInfo: {
      email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      },
      phone: {
        type: String,
        required: [true, 'Phone is required'],
      },
      emergency: {
        type: String,
      },
    },
    socialLinks: {
      facebook: String,
      linkedin: String,
      twitter: String,
      website: String,
    },
    profileImage: String,
    clinicAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
        default: 'Bangladesh',
      },
    },
  },
  {
    timestamps: true,
  }
);

const DoctorProfile: Model<IDoctorProfile> = mongoose.models.DoctorProfile || mongoose.model<IDoctorProfile>('DoctorProfile', DoctorProfileSchema);

export default DoctorProfile;

