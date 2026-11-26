const mongoose = require('mongoose');

const institutionApplicationSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  country: { type: String, default: 'India', trim: true },
  address: { type: String, required: true, trim: true },
  institute: { type: String, required: true, trim: true },
  program: { type: String, required: true, trim: true },
  branch: { type: String, default: 'Jaipur Head Office (Mansarovar)', trim: true },
  has10th: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
  has12th: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
  hasGraduation: { type: String, enum: ['Yes', 'No'], default: 'No' },
  hasPassport: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
  notes: { type: String, default: '' },
  consent: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InstitutionApplication', institutionApplicationSchema);