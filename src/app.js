const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patient.routes');
const errorHandler = require('./middleware/error.middleware');
const userRoutes = require('./routes/authentication.routes')
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: ['*','http://localhost:5173','https://healthmonitorsystem.netlify.app'
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/patients', patientRoutes);
app.use('/api/auth', userRoutes);

app.use(errorHandler);

module.exports = app;