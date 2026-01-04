import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  isVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  organization?: string;
  role?: string;
  purpose?: string;
  createdAt: Date;
  updatedAt: Date;
  projects: {
    id: string;
    name: string;
    data: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      minlength: 6,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    organization: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['Designer', 'Marketing Manager', 'Brand Manager', 'Developer', 'Other'],
    },
    purpose: {
      type: String,
      enum: ['Create Retail Ads', 'Brand Campaigns', 'Product Promotions', 'Learning/Exploration', 'Other'],
    },
    projects: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        data: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in development
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
