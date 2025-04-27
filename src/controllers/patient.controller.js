const Patient = require('../models/patient.model');
const { createPatientSchema } = require('../validators/patient.validator');
const notificationService = require('../services/notification-service');

exports.createPatient = async (req, res) => {
  try {
    const { error } = createPatientSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const patient = new Patient({
      ...req.body,
      createdBy: req.user.id
    });
    
    await patient.save();

    await notificationService.createPatientNotification(patient, req.user.id);
    
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPatientsByDoctor = async (req, res) => {
  try {
    const { search } = req.query;
    let query = { createdBy: req.user.id };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const patients = await Patient.find(query);
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const patients = await Patient.find(query)
      .skip(skip)
      .limit(Number(limit));

    const total = await Patient.countDocuments(query);

    res.json({
      patients,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


