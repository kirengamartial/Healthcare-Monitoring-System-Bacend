const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const authMiddleware = require('../middleware/authentication.middleware')
const nurseMiddleware = require('../middleware/nurse.middleware');

router.post('/',authMiddleware, patientController.createPatient);
router.get('/', authMiddleware, patientController.getPatientsByDoctor);
router.get('/all', nurseMiddleware, patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);

module.exports = router;