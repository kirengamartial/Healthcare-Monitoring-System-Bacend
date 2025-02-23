const Joi = require('joi');

exports.createPatientSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required().min(0).max(150),
  gender: Joi.string().required().valid('Male', 'Female', 'Other'),
  contact: Joi.string().required(),
  email: Joi.string().email().required(),
  status: Joi.string().valid('Stable', 'Critical', 'Recovery').default('Stable'),
  doctor: Joi.string().required(),
  lastVisit: Joi.date().default(Date.now)
});