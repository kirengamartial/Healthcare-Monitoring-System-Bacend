const Notification = require('../models/notification.model');

/**
 * Create a new notification
 * @param {Object} data - Notification data
 * @returns {Promise<Object>} Created notification
 */
exports.createNotification = async (data) => {
  try {
    const notification = new Notification(data);
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

/**
 * Create a patient creation notification
 * @param {Object} patient - The created patient
 * @param {String} userId - ID of the user who should receive the notification
 * @returns {Promise<Object>} Created notification
 */
exports.createPatientNotification = async (patient, userId) => {
  try {
    return await exports.createNotification({
      recipient: userId,
      type: 'patient_created',
      title: 'New Patient Added',
      message: `Patient ${patient.name} has been successfully added to your list.`,
      relatedTo: {
        model: 'Patient',
        id: patient._id
      },
      actionLink: `/patients/${patient._id}`
    });
  } catch (error) {
    console.error('Error creating patient notification:', error);
    throw error;
  }
};