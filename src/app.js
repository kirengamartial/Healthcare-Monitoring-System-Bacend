const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patient.routes');
const errorHandler = require('./middleware/error.middleware');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/patients', patientRoutes);

app.use(errorHandler);

module.exports = app;
