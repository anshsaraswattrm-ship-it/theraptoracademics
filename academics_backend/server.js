const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'https://theraptoracademics.com',
  'https://www.theraptoracademics.com',
  'https://theraptoracademics.pages.dev',
  'http://localhost:5173',
  'http://localhost:3000'
];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, service: 'The Raptor Academics API' });
});

// Routes
const formRoutes = require('./routes/formRoutes');
app.use('/api', formRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});