const mongoose = require('mongoose');

// Helper schema for the education table rows
const educationRowSchema = new mongoose.Schema({
  subjectStream: { type: String },
  score: { type: String }, // % or CGPA
  startDate: { type: String },
  endDate: { type: String },
  universityBoard: { type: String }
});

const counsellingSchema = new mongoose.Schema({
  // Basic Details
  visa: { type: String },
  intake: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: String },
  contactNo: { type: String, required: true },
  emailId: { type: String, required: true },
  address: { type: String },
  
  // Preferences
  countryPreferred: { type: String },
  coursePreferred: { type: String },
  workExperience: { type: String },
  educationBudget: { type: String },

  // Education Details Table
  education: {
    tenth: educationRowSchema,
    twelfth: educationRowSchema,
    graduation: educationRowSchema,
    other: educationRowSchema
  },

  // Language Score (IELTS)
  ielts: {
    overall: { type: String },
    reading: { type: String },
    writing: { type: String },
    speaking: { type: String },
    listening: { type: String }
  },

  // Consent
  optInScholarshipNews: { type: Boolean, default: false },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Counselling', counsellingSchema);