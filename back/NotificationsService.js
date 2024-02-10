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
        
        const counterRef = db
          .collection("Notifications").doc("notificationCount");

        const doc = await counterRef.get();
        if (doc.exists) {
          ctr = doc.data().counter; // This will print the counter value
        } else {
          console.log("No such document!");
        }

        try {
          await counterRef.update({
            counter: 0 // Set this to the new value you want for the counter
          });
          console.log(`Counter updated to: 0`);
        } catch (error) {
          console.error("Error updating counter: ", error);
        }

      const snapshot = await notificationRef.get();

      if (snapshot.empty) {
        console.log("No matching notifications found.");
        return [];
      }

      const notifications = [];
      
      snapshot.forEach((notificationDoc) => {
        const notificationData = notificationDoc.data();
        const timeStamp = notificationData.TimeStamp.toDate();
        
        notifications.push({
          Addressee: notificationData.Addressee || "Unknown",
          GroupName: notificationData.groupName || "Unknown",
          Content: notificationData.Content || "Unknown",
          Type: notificationData.Type || "Unknown",
          TimeStamp: timeStamp || "Unknown",
        });
        console.log(timeStamp + " " + notificationData.Addressee);
      });
      
      notifications.sort((a, b) => {
        // Convert dates to timestamps for comparison
        const timeA = a.TimeStamp.getTime();
        const timeB = b.TimeStamp.getTime();
        
        // For descending order, from most recent to oldest
        return timeA - timeB;
      });
      
      return notifications;
      
      
      
    } catch (error) {
      console.error("Error getting notifications:", error);
      throw error;
    }
    
  },
  
  async handleAddNewNotification(addressee, groupName, content, type, timeStamp){
    
    var ctr = 0;
    const NotificationRef = db.collection("Notifications").doc();
    
    NotificationRef.set({
      Addressee: addressee,
      GroupName: groupName,
      Content: content,
      Type: type,
      TimeStamp: timeStamp,
    }).catch((error) => {
      console.error("Error creating Notification: ", error);
      alert(error.message);
    });

    const counterRef = db
    .collection("Notifications").doc("notificationCount");

    const doc = await counterRef.get();
    if (doc.exists) {
      ctr = doc.data().counter; 
    } else {
      console.log("No such document!");
    }

    try {
      await counterRef.update({
        counter: ctr+1 // Set this to the new value you want for the counter
      });
      console.log(`Counter updated to: 0`);
    } catch (error) {
      console.error("Error updating counter: ", error);
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
      console.error("Error sending notification:", error);
      throw error;
    }
  },

};

export default notificationService;
