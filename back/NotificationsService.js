import { db, auth } from "./firebase";
import GroupService from "../back/GroupService";
import UserService from "../back/UserService";


export const NotificationService = {
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

      let notifications = [];
      
      snapshot.forEach((notificationDoc) => {
        const notificationData = notificationDoc.data();
        const timeStamp = notificationData.TimeStamp.toDate();
        
        notifications.push({
          Addressee: notificationData.Addressee || "Unknown",
          GroupName: notificationData.GroupName || "Unknown",
          Content: notificationData.Content || "Unknown",
          Type: notificationData.Type || "Unknown",
          TimeStamp: timeStamp || "Unknown",
          From: notificationData.From || "Unknown",
          id: notificationDoc.id
        });
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
  
  async handleAddNewNotification(groupName, content, type, timeStamp, from = "default mail", addressee = auth.currentUser.email) {
    const groupLeaderEmail = await GroupService.getLeaderEmail(groupName);
    if( type === "New Meeting"){
      const groupMembers = await GroupService.getMembers(groupName);

      try {
        const leaderNotifRef = db.collection("Notifications").doc();
        await leaderNotifRef.set({
          Addressee: groupLeaderEmail,
          GroupName: groupName,
          Content: content,
          Type: type,
          TimeStamp: timeStamp,
        });
        await UserService.updateUserNotificationCounter(await UserService.getUserNotificationCounter(addressee) + 1, addressee);
      } catch (error) {
          console.error("Error creating Notification for leader: ", error);
          alert(error.message);
      }
    
      for (const member of groupMembers) {
        try {
          const memberNotifRef = db.collection("Notifications").doc();
          await memberNotifRef.set({
            Addressee: member,
            GroupName: groupName,
            Content: content,
            Type: type,
            TimeStamp: timeStamp,
          });
          await UserService.updateUserNotificationCounter(await UserService.getUserNotificationCounter(member) + 1, member);
        } catch (error) {
            console.error("Error creating Notification for member: ", error);
            alert(error.message);
        }
        console.log(`${member} : ${await UserService.getUserNotificationCounter(member)}`);
      }
    }else if( type === "Group Join request"){
      try {
        const NotificationRef = db.collection("Notifications").doc();
        await NotificationRef.set({
          Addressee: groupLeaderEmail,
          GroupName: groupName,
          Content: content,
          Type: type,
          TimeStamp: timeStamp,
          From: from,
          Handled: false,
          RequestAnswer: "did not Answer yet"
        });
        await UserService.updateUserNotificationCounter(await UserService.getUserNotificationCounter(addressee) + 1, addressee);
      } catch (error) {
          console.error("Error creating Notification for leader: ", error);
          alert(error.message);
      }
    }else if (type === "Meeting Join request"){
      try {
        const NotificationRef = db.collection("Notifications").doc();
        await NotificationRef.set({
          Addressee: groupLeaderEmail,
          GroupName: groupName,
          Content: content,
          Type: type,
          TimeStamp: timeStamp,
          From: from,
          Handled: false,
          RequestAnswer: "did not Answer yet"
        });
        await UserService.updateUserNotificationCounter(await UserService.getUserNotificationCounter(addressee) + 1, addressee);
      } catch (error) {
          console.error("Error creating Notification for leader: ", error);
          alert(error.message);
      }
    }else if( type === "Meeting Updated"){
      const groupMembers = await GroupService.getMembers(groupName);
      try {
        const leaderNotifRef = db.collection("Notifications").doc();
        await leaderNotifRef.set({
          Addressee: groupLeaderEmail,
          GroupName: groupName,
          Content: content,
          Type: type,
          TimeStamp: timeStamp,
        });
        await UserService.updateUserNotificationCounter(await UserService.getUserNotificationCounter(addressee) + 1, addressee);
      } catch (error) {
          console.error("Error creating Notification for leader: ", error);
          alert(error.message);
      }

      for (const member of groupMembers) {
        try {
          const memberNotifRef = db.collection("Notifications").doc();
          await memberNotifRef.set({
            Addressee: member,
            GroupName: groupName,
            Content: content,
            Type: type,
            TimeStamp: timeStamp,
          });
          await UserService.updateUserNotificationCounter(await UserService.getUserNotificationCounter(member) + 1, member);
        } catch (error) {
            console.error("Error creating Notification for member: ", error);
            alert(error.message);
        }
        console.log(`${member} : ${await UserService.getUserNotificationCounter(member)}`);
      }
    }else{
      try {
        const NotificationRef = db.collection("Notifications").doc();
        await NotificationRef.set({
          Addressee: addressee,
          GroupName: groupName,
          Content: content,
          Type: type,
          TimeStamp: timeStamp,
          From: from,
        });
        await UserService.updateUserNotificationCounter(await UserService.getUserNotificationCounter(addressee) + 1, addressee);
      } catch (error) {
          console.error("Error creating Notification for leader: ", error);
          alert(error.message);
      }
    }
  },

  async updateHandledField(from, groupName, handled = true){
    try {
      const querySnapshot = await db.collection("Notifications")
                                     .where('From', '==', from)
                                     .where('GroupName', '==', groupName)
                                     .where("Type", "in", ["Group Join request", "Meeting Join request"])
                                     .get();
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const docRef = doc.ref; // Get the DocumentReference
          docRef.update({ // Update the document
            Handled: handled
          }).catch((error) => {
            console.error(`Error updating Notification ${doc.id} 'Handled' field: `, error);
          });
        });
      } else {
        console.log('No matching documents found');
      }
    } catch (error) {
      console.error("Error updating Notification 'Handled' field: ", error);
    }
  },

  async updateRequestAnswerField(from, groupName, requestAnswer){
    try {
      const querySnapshot = await db.collection("Notifications")
                                     .where('From', '==', from)
                                     .where('GroupName', '==', groupName)
                                     .where("Type", "in", ["Group Join request", "Meeting Join request"])
                                     .get();
  
      // Check if the querySnapshot is not empty
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const docRef = doc.ref; // Get the DocumentReference
          docRef.update({ // Update the document
            RequestAnswer: requestAnswer
          }).catch((error) => {
            console.error(`Error updating Notification ${doc.id} 'RequestAnswer' field: `, error);
          });
        });
      } else {
        console.log('No matching documents found');
      }
    } catch (error) {
      console.error("Error updating Notification 'RequestAnswer' field: ", error);
    }
  },

  async isHandled(notificationId) {
    try {
      const notificationsRef = await db.collection("Notifications").doc(notificationId);
      const snapshot = await notificationsRef.get();
      if(snapshot.exists) {
        const notification = snapshot.data();      
        if (notification.Handled)
        {
          return true;
        } else {
          return false;
        }
    }
    } catch (error) {
      console.error(`Error find meetings members!`, error);
    }
  },

  async requestAnswer(notificationId) {
    try {
      const notificationsRef = await db.collection("Notifications").doc(notificationId);
      const snapshot = await notificationsRef.get();
      if(snapshot.exists) {
        const notification = snapshot.data();      
        return notification.RequestAnswer;
    }
    } catch (error) {
      console.error(`Error find meetings members!`, error);
    }
  },

};

export default NotificationService;
