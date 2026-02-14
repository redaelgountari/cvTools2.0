import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  provider: {
    type: String,
    enum: ['credentials', 'google', 'github'],
    default: 'credentials'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  },
  hasSeenTutorial: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });

const userShema = mongoose.models.User || mongoose.model('User', userSchema);

export default userShema;