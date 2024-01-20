// src/services/NotificationService.js
import {db} from './firebase';

const notificationCollection = db.collection('notifications');

export const notificationService = {
  // Fetch notifications for a specific user
  async getUserNotifications(userId) {
    try {
      const snapshot = await notificationCollection.where('userId', '==', userId).get();
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Send a notification to a specific user
  async sendNotification(toUserId, message) {
    try {
      await notificationCollection.add({
        userId: toUserId,
        message: message,
        timestamp: new Date(),
        // ... other notification fields
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  },

  // ... other notification related methods
};

export default notificationService;
