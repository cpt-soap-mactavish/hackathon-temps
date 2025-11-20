import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    maxlength: [100, 'Email cannot be more than 100 characters'],
  },
  image: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpiry: Date,
  resetToken: String,
  resetTokenExpiry: Date,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
