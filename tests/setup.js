// tests/setup.js
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  // Connect to a test database
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/healthcare-test';
  await mongoose.connect(MONGODB_URI);
});

afterAll(async () => {
  // Cleanup and close database connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

// Clear all test data after each test
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});
