import mongoose from 'mongoose';

const prayerSchema = new mongoose.Schema({
  prayer: { type: String, required: true },  
  date: { type: Date, required: true, unique: true }, 
  status: { 
    type: String, 
    enum: ['done', 'pending', 'qaza'], 
    default: 'pending'
  },
}, { timestamps: true });

export default mongoose.models.Prayer || mongoose.model('Prayer', prayerSchema);
