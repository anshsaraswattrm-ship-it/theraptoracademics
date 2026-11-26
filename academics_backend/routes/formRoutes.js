const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const Counselling = require('../models/Counselling');
const InstitutionApplication = require('../models/InstitutionApplication');
const ChatLead = require('../models/ChatLead');

// POST: Submit Contact Us Form
router.post('/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ success: true, message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit contact form.', error: error.message });
  }
});

// POST: Submit Free Counselling Form
router.post('/counselling', async (req, res) => {
  try {
    const newCounselling = new Counselling(req.body);
    await newCounselling.save();
    res.status(201).json({ success: true, message: 'Counselling form submitted successfully!' });
  } catch (error) {
    console.error('Counselling Form Error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit counselling form.', error: error.message });
  }
});

// POST: Submit Institution "Apply Now" Quick Profile Assessment
router.post('/applications', async (req, res) => {
  try {
    const newApplication = new InstitutionApplication(req.body);
    await newApplication.save();
    res.status(201).json({
      success: true,
      message: 'Application request submitted successfully!',
      data: newApplication
    });
  } catch (error) {
    console.error('Institution Application Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application request.',
      error: error.message
    });
  }
});

// POST: Submit Chat Widget Lead or Callback Modal Request
router.post('/chat-leads', async (req, res) => {
  try {
    const newLead = new ChatLead(req.body);
    await newLead.save();
    res.status(201).json({
      success: true,
      message: 'Lead saved successfully!',
      data: newLead
    });
  } catch (error) {
    console.error('Chat Lead Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save lead.',
      error: error.message
    });
  }
});

// GET: Fetch Recent Leads Summary (Optional quick check)
router.get('/leads', async (req, res) => {
  try {
    const [contacts, counsellings, applications, chatLeads] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).limit(50),
      Counselling.find().sort({ createdAt: -1 }).limit(50),
      InstitutionApplication.find().sort({ createdAt: -1 }).limit(50),
      ChatLead.find().sort({ createdAt: -1 }).limit(50)
    ]);

    res.json({
      success: true,
      counts: {
        contacts: contacts.length,
        counsellings: counsellings.length,
        applications: applications.length,
        chatLeads: chatLeads.length
      },
      data: { contacts, counsellings, applications, chatLeads }
    });
  } catch (error) {
    console.error('Fetch Leads Error:', error);
    res.status(500).json({ success: false, message: 'Failed to load leads.', error: error.message });
  }
});

module.exports = router;