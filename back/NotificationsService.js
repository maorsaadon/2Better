// src/services/NotificationService.js
import { db, auth } from "./firebase";


export const notificationService = {
  // Fetch notifications for a specific user
  async getUserNotifications() {
    try {
      const userEmail = auth.currentUser.email;
      const notificationRef = db
        .collection("Notifications")
        .where("Addressee", "==", userEmail);

      const snapshot = await notificationRef.get();

      if (snapshot.empty) {
        console.log("No matching notifications found.");
        return [];
      }

      const notifications = [];

      snapshot.forEach((notificationDoc) => {
        const notificationData = notificationDoc.data();

        notifications.push({
          Addressee: notificationData.Addressee || "Unknown",
          Content: notificationData.Content || "Unknown",
          Type: notificationData.Type || "Unknown",
        });
      });

      return notifications;
    } catch (error) {
      console.error("Error getting notifications:", error);
      throw error;
    }

  },

  async handleAddNewNotification(addressee, content, type){
    const NotificationRef = db.collection("Notifications").doc();
    NotificationRef.set({
      Addressee: addressee,
      Content: content,
      Type: type,
    }).catch((error) => {
      console.error("Error creating Notification: ", error);
      alert(error.message);
    });
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
      console.error("Error sending notification:", error);
      throw error;
    }
  },

  // ... other notification related methods
};

export default notificationService;
