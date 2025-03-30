const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['patient_created', 'patient_updated', 'appointment_scheduled', 'appointment_reminder', 'status_change', 'system'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  relatedTo: {
    model: {
      type: String,
      enum: ['Patient', 'Appointment', 'User'],
      required: true
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  read: {
    type: Boolean,
    default: false
  },
  actionLink: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index for faster queries on the recipient and read status
notificationSchema.index({ recipient: 1, read: 1 });
// Index for faster queries with sorting by creation date
notificationSchema.index({ recipient: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);