const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const Counselling = require('../models/Counselling');

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

module.exports = router;