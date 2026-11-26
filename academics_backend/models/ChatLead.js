const mongoose = require('mongoose');

const chatLeadSchema = new mongoose.Schema({
  leadType: {
    type: String,
    enum: ['chat', 'callback'],
    required: true
  },
  name: { type: String, default: '', trim: true },
  countryCode: { type: String, default: '+91', trim: true },
  phone: { type: String, required: true, trim: true },
  topic: { type: String, default: '', trim: true },
  choice: { type: String, default: '', trim: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatLead', chatLeadSchema);