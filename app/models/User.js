import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  prayerProgress: { type: Number, default: 0 }, // Simulating prayer progress
  missedPrayers: { type: Number, default: 0 },
  tasbeehCount: { type: Number, default: 0 }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
