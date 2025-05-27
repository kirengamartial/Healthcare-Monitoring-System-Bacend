const mongoose = require('mongoose');
const Patient = require('../../src/models/patient.model');

describe('Patient Model Unit Tests', () => {
  describe('Validation', () => {
    it('should be valid with all required fields', () => {
      const validPatient = new Patient({
        name: 'John Doe',
        age: 30,
        gender: 'Male',
        contact: '+1234567890',
        email: 'john.doe@example.com',
        status: 'Stable',
        createdBy: new mongoose.Types.ObjectId(),
      });

      const validationError = validPatient.validateSync();
      expect(validationError).toBeUndefined();
    });

    it('should be invalid if required fields are missing', () => {
      const invalidPatient = new Patient({});
      const validationError = invalidPatient.validateSync();
      
      expect(validationError.errors.name).toBeDefined();
      expect(validationError.errors.age).toBeDefined();
      expect(validationError.errors.gender).toBeDefined();
      expect(validationError.errors.contact).toBeDefined();
      expect(validationError.errors.email).toBeDefined();
      expect(validationError.errors.createdBy).toBeDefined();
    });

    it('should validate status enum values', () => {
      const invalidPatient = new Patient({
        name: 'John Doe',
        age: 30,
        gender: 'Male',
        contact: '+1234567890',
        email: 'john.doe@example.com',
        status: 'Invalid',
        createdBy: new mongoose.Types.ObjectId(),
      });

      const validationError = invalidPatient.validateSync();
      expect(validationError.errors.status).toBeDefined();
    });

    it('should set default status to Stable', () => {
      const patient = new Patient({
        name: 'John Doe',
        age: 30,
        gender: 'Male',
        contact: '+1234567890',
        email: 'john.doe@example.com',
        createdBy: new mongoose.Types.ObjectId(),
      });

      expect(patient.status).toBe('Stable');
    });

    it('should set default lastVisit to current date', () => {
      const patient = new Patient({
        name: 'John Doe',
        age: 30,
        gender: 'Male',
        contact: '+1234567890',
        email: 'john.doe@example.com',
        createdBy: new mongoose.Types.ObjectId(),
      });

      expect(patient.lastVisit).toBeDefined();
      expect(patient.lastVisit instanceof Date).toBeTruthy();
    });

  
  });
});
