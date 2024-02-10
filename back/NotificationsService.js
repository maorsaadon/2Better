import { db, auth } from "./firebase";
import GroupService from "../back/GroupService";
import UserService from "../back/UserService";


export const notificationService = {
  // Fetch notifications for a specific user
  async getUserNotifications() {
    try {
      const userEmail = auth.currentUser.email;
      const notificationRef = db
        .collection("Notifications")
        .where("Addressee", "==", userEmail);
        
      UserService.updateUserNotificationCounter();

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
  
  async handleAddNewNotification(groupName, content, type, timeStamp) {
    const groupLeaderEmail = await GroupService.getLeaderEmail(groupName);
    const groupMembers = await GroupService.getMembers(groupName);

    console.log("Group Leader Email = " + groupLeaderEmail);
    
    try {
      // Create a new document reference for the leader notification
      const leaderNotifRef = db.collection("Notifications").doc();
      await leaderNotifRef.set({
        Addressee: groupLeaderEmail,
        GroupName: groupName,
        Content: content,
        Type: type,
        TimeStamp: timeStamp,
      });
      // Assuming updateUserNotificationCounter is related to the leader, adjust as necessary
      await UserService.updateUserNotificationCounter(await UserService.getUserNotificationCounter() + 1);
    } catch (error) {
        console.error("Error creating Notification for leader: ", error);
        alert(error.message);
    }
    
    for (const member of groupMembers) {
      console.log("Group Member Email = " + member);
      
      try {
          // Create a new document reference for each member notification
          const memberNotifRef = db.collection("Notifications").doc();
          await memberNotifRef.set({
            Addressee: member,
            GroupName: groupName,
            Content: content,
            Type: type,
            TimeStamp: timeStamp,
          });
          // Update notification counter for each member
          await UserService.updateUserNotificationCounter(await UserService.getUserNotificationCounter(member) + 1, member);
      } catch (error) {
          console.error("Error creating Notification for member: ", error);
          alert(error.message);
      }
    }
  },
};

export default notificationService;
