const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['Stable', 'Critical', 'Recovery'],
    default: 'Stable'
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  lastVisit: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);