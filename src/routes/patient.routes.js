const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const authMiddleware = require('../middleware/authentication.middleware')

router.post('/',authMiddleware, patientController.createPatient);
router.get('/', authMiddleware, patientController.getPatients);
router.get('/:id', patientController.getPatientById);

module.exports = router;