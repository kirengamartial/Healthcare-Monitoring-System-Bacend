const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patient.routes');
const errorHandler = require('./middleware/error.middleware');
require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://healthmonitorsystem.netlify.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (cookies, authorization headers, etc)
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  maxAge: 3600 // Maximum age (in seconds) of the preflight request cache
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/patients', patientRoutes);

app.use(errorHandler);

module.exports = app;