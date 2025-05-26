const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

describe('Healthcare System E2E Tests', () => {
  let authToken;
  let patientId;

  const testUser = {
    name: 'Test Nurse E2E',
    email: 'nurse.e2e.login@example.com', // Unique email for this test run
    password: 'Password123!',
    role: 'nurse'
  };

  const testPatient = {
    name: 'Jane Smith E2E',
    age: 30,
    gender: 'Female',
    contact: '+1987654321',
    email: 'jane.smith.e2e.login@example.com', // Unique email for this test run
    status: 'Stable'
  };

  describe('Complete Patient Management Flow', () => {
    it('should complete full patient management cycle', async () => {
      // 1. Register nurse
      await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(201);

      // 1.1 Login to get token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200);

      expect(loginResponse.body).toHaveProperty('token');
      authToken = loginResponse.body.token;

      // 2. Create new patient
      const createPatientResponse = await request(app)
        .post('/api/patients')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testPatient)
        .expect(201);

      patientId = createPatientResponse.body._id;
      expect(createPatientResponse.body.email).toBe(testPatient.email);

      // 3. Get patient details
      const getPatientResponse = await request(app)
        .get(`/api/patients/${patientId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(getPatientResponse.body._id).toBe(patientId);

      // 4. Update patient information
      const updateData = { 
        status: 'Critical' // Changed to update 'status'
      };

      const updateResponse = await request(app)
        .patch(`/api/patients/${patientId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(updateResponse.body.status).toBe('Critical'); // Verify updated status

      // 5. Create patient notification
      const notificationData = { // Renamed to avoid conflict with response variable
        relatedTo: { model: 'Patient', id: patientId }, // Changed patientId to relatedTo
        type: 'patient_updated', // Changed to a valid enum value
        title: 'Patient Record Updated', // Added title
        message: `Patient ${testPatient.name} record was updated.`,
        // priority is not in the schema, removed
      };

      const notificationResponse = await request(app)
        .post('/api/notifications')
        .set('Authorization', `Bearer ${authToken}`)
        .send(notificationData) // Use renamed variable
        .expect(201);

      expect(notificationResponse.body.relatedTo.id).toBe(patientId); // Adjusted assertion
      expect(notificationResponse.body.message).toBe(notificationData.message);
    });
  });
});
