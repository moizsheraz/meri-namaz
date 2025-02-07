const mongoose = require('mongoose');

const prayerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  prayers: {
    fajr: {
      performed: {
        type: Boolean,
        default: false,
      },
      qaza: {
        type: Boolean,
        default: false,
      },
    },
    dhuhr: {
      performed: {
        type: Boolean,
        default: false,
      },
      qaza: {
        type: Boolean,
        default: false,
      },
    },
    asr: {
      performed: {
        type: Boolean,
        default: false,
      },
      qaza: {
        type: Boolean,
        default: false,
      },
    },
    maghrib: {
      performed: {
        type: Boolean,
        default: false,
      },
      qaza: {
        type: Boolean,
        default: false,
      },
    },
    isha: {
      performed: {
        type: Boolean,
        default: false,
      },
      qaza: {
        type: Boolean,
        default: false,
      },
    },
  },
});

prayerSchema.pre('save', function (next) {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  if (now >= endOfDay) {
    const prayers = this.prayers;
    for (const prayer in prayers) {
      if (!prayers[prayer].performed) {
        prayers[prayer].qaza = true;
      }
    }
  }
  next();
});

export default mongoose.models.Prayer || mongoose.model('Prayer', prayerSchema);
