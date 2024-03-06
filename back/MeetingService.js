import { auth, db } from "./firebase";
import { GroupService } from "./GroupService";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import {
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export const MeetingService = {
  // Update meeting details
  async updateMeetingDetails(
    MeetingID,
    date,
    time,
    location,
    timestamp,
    totalCapacity
  ) {
    try {
      const meetingRef = db.collection("Meetings").doc(MeetingID);

      const snapshot = await meetingRef.get();

      if (snapshot.exists) {
        // If the document exists, update the meeting details
        await meetingRef.update({
          Date: date,
          Time: time,
          Location: location,
          Timestamp: timestamp,
          TotalCapacity: totalCapacity,
        });

        console.log("Meeting details updated successfully");
      } else {
        console.log("Meeting document does not exist");
        // Handle the case where the document doesn't exist, if needed
      }
    } catch (error) {
      console.error("Error updating Meeting details: ", error);
    }
  },

  async handleAddNewMeeting(
    groupName,
    location,
    date,
    time,
    timestamp,
    totalCapacity
  ) {
    const MeetingRef = db.collection("Meetings").doc(); // The document name
    MeetingRef.set({
      GroupName: groupName,
      Location: location,
      Date: date,
      Time: time,
      Timestamp: timestamp,
      TotalCapacity: totalCapacity,
      Members: [],
    }).catch((error) => {
      console.error("Error creating Meeting: ", error);
      alert(error.message);
    });
    GroupService.addGroupMeeting(MeetingRef, groupName);
  },

  async handleDeleteMeeting(meetingId) {
    try {
      const chatCollectionRef = collection(db, "Meetings", meetingId, "chat");

      // Get all documents in the 'chat' subcollection
      const chatQuerySnapshot = await getDocs(chatCollectionRef);

      // Iterate through each document and delete it
      chatQuerySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log(`Document with ID ${doc.id} deleted successfully.`);
      });

      await db.collection("Meetings").doc(meetingId).delete();
      console.log(`Meeting with ID: ${meetingId} has been deleted.`);
    } catch (error) {
      console.error(`Error deleting meeting with ID: ${meetingId}`, error);
      // Handle the error accordingly
    }
  },

  // Aviya Added functions:
  async fetchUpcomingMeetings() {
    let upcomingMeetings = [];
    let groupNames = [];
    const userEmail = auth.currentUser.email;

    try {
      const groupsSnapshot = await db.collection("Groups").get();
      var isLeader2 = 0;
      groupsSnapshot.forEach((doc) => {
        const group = doc.data();
        if (
          group.Members.includes(userEmail) ||
          group.LeaderEmail == userEmail
        ) {
          groupNames.push({
            groupName: group.GroupName,
            sportType: group.SportType,
            isLeader: isLeader2,
          });
        }
      });

      for (const group of groupNames) {
        const meetingsSnapshot = await db
          .collection("Meetings")
          .where("GroupName", "==", group.groupName)
          .where("Members", "array-contains", userEmail)
          .get();
        meetingsSnapshot.forEach((doc) => {
          const meetingData = doc.data();
          upcomingMeetings.push({
            ...meetingData,
            SportType: group.sportType,
            // Members: group.Members,
            IsLeader: group.isLeader,
            id: doc.id,
          });
        });
      }
      upcomingMeetings.sort(
        (a, b) => a.Timestamp.toDate() - b.Timestamp.toDate()
      );
    } catch (error) {
      console.error("Error fetching meetings by user role: ", error);
    }

    return { upcomingMeetings };
  },

  async fetchMeetingsBygroup(group) {
    let managerMeetings = [];
    try {
      const meetingsSnapshot = await db
        .collection("Meetings")
        .where("GroupName", "==", group.GroupName)
        .get();

      meetingsSnapshot.forEach((doc) => {
        const meetingData = doc.data();
        managerMeetings.push({
          ...meetingData,
          SportType: group.SportType,
          // Members: group.Members,
          id: doc.id,
        });
      });

      managerMeetings.sort(
        (a, b) => a.Timestamp.toDate() - b.Timestamp.toDate()
      );
    } catch (error) {
      console.error("Error fetching meetings by user role: ", error);
    }

    return { managerMeetings };
  },

  async isInTheMeeting(meetingId, memberEmail) {
    try {
      // Assuming 'Meetings' is the name of the collection where meetings are stored
      const meetingRef = await db.collection("Meetings").doc(meetingId);
      const snapshot = await meetingRef.get();
      if (snapshot.exists) {
        const meeting = snapshot.data();
        if (meeting.Members.includes(memberEmail)) {
          // console.log(`THE ANS IS --> ${meeting.GroupName}, ${true} `);
          return true;
        } else {
          // console.log(`THE ANS IS --> ${meeting.GroupNsame}, ${false} `);
          return false;
        }
      }
    } catch (error) {
      console.error(`Error find meetings members!`, error);
    }
  },

  async addUserToMeeting(meetingId, memberEmail) {
    try {
      // Assuming 'Meetings' is the name of the collection where meetings are stored
      const meetingRef = db.collection("Meetings").doc(meetingId);
      const snapshot = await meetingRef.get();
      var currNum = 0;
      if (snapshot.exists) {
        const meeting = snapshot.data();
        currNum = meeting.NumberOfMembers;

        if (!meeting.Members.includes(memberEmail)) {
          // Update the Members array using arrayUnion to add userEmail without duplicates
          await meetingRef.update({
            Members: firebase.firestore.FieldValue.arrayUnion(memberEmail),
            NumberOfMembers: firebase.firestore.FieldValue.increment(1),
          });

          console.log("User email added to meeting members successfully.");
        }
      }
    } catch (error) {
      console.error(`Error add user to the meeting!`, error);
    }
  },

  async removeUserFromMeeting(meetingId, memberEmail) {
    try {
      const meetingRef = db.collection("Meetings").doc(meetingId);
      const snapshot = await meetingRef.get();

      if (snapshot.exists) {
        const meeting = snapshot.data();

        if (meeting.Members && meeting.Members.includes(memberEmail)) {
          // Remove the userEmail from the Members array and decrement NumberOfMembers atomically
          await meetingRef.update({
            Members: firebase.firestore.FieldValue.arrayRemove(memberEmail),
            NumberOfMembers: firebase.firestore.FieldValue.increment(-1),
          });

          console.log("User email removed from meeting members successfully.");
        } else {
          console.log("User email not found in the meeting members.");
        }
      } else {
        console.log("Meeting does not exist.");
      }
    } catch (error) {
      console.error(`Error removing user from the meeting!`, error);
    }
  },

  async functionToHomeScreen() {
    let homeMeetings = [];
    let leaderGroupNames = [];
    const userEmail = auth.currentUser.email;

    try {
      // Fetch all groups to determine user's role
      const groupsSnapshot = await db.collection("Groups").get();
      var isLeader2 = 0;
      groupsSnapshot.forEach((doc) => {
        const group = doc.data();
        if (
          group.LeaderEmail == userEmail ||
          group.Members.includes(userEmail)
        ) {
          // User is a member but not the leader
          isLeader2 = 0;
          leaderGroupNames.push({
            groupName: group.GroupName,
          });
        }
      });

      // Fetch meetings for groups where user is the leader
      for (const group of leaderGroupNames) {
        const meetingsSnapshot = await db
          .collection("Meetings")
          .where("GroupName", "==", group.groupName)
          .get();
        meetingsSnapshot.forEach((doc) => {
          const meetingData = doc.data();
          if (!meetingData.Members.includes(auth.currentUser.email)) {
            homeMeetings.push({
              ...meetingData,
              id: doc.id,
            });
          }
        });
      }
      // Sort homeMeetings by Timestamp
      homeMeetings.sort((a, b) => a.Timestamp.toDate() - b.Timestamp.toDate());
    } catch (error) {
      console.error("Error fetching meetings by user role: ", error);
    }

    return { homeMeetings };
  },
  async getSeuggestions() {
    let homeMeetingsSuggestions = [];
    let leaderGroupNames = [];
    const userEmail = auth.currentUser.email;

    try {
      // Fetch all groups to determine user's role
      const groupsSnapshot = await db.collection("Groups").get();
      var isLeader2 = 0;
      groupsSnapshot.forEach((doc) => {
        const group = doc.data();
        if (
          group.LeaderEmail !== userEmail &&
          !group.Members.includes(userEmail)
        ) {
          // User is a member but not the leader
          isLeader2 = 0;
          leaderGroupNames.push({
            groupName: group.GroupName,
          });
        }
      });

      // Fetch meetings for groups where user is the leader
      for (const group of leaderGroupNames) {
        const meetingsSnapshot = await db
          .collection("Meetings")
          .where("GroupName", "==", group.groupName)
          .get();
        meetingsSnapshot.forEach((doc) => {
          const meetingData = doc.data();
          if (!meetingData.Members.includes(auth.currentUser.email)) {
            homeMeetingsSuggestions.push({
              ...meetingData,
              id: doc.id,
            });
          }
        });
      }
      // Sort homeMeetings by Timestamp
      homeMeetingsSuggestions.sort(
        (a, b) => a.Timestamp.toDate() - b.Timestamp.toDate()
      );
    } catch (error) {
      console.error("Error fetching meetings by user role: ", error);
    }
    return { homeMeetingsSuggestions };
  },
  async getMembers(MeetingID) {
    const groupRef = db.collection("Meetings").doc(MeetingID);
    try {
      const doc = await groupRef.get();
      if (doc.exists) {
        const groupData = doc.data();
        return groupData.Members || []; // Returns an empty array if no Members field exists
      } else {
        console.log("No such group!");
        return []; // Returns an empty array if the group does not exist
      }
    } catch (error) {
      console.error("Error getting group members: ", error);
      throw error; // Rethrow or handle error as needed
    }
  },

  async getMemberDetails(email) {
    try {
      const snapshot = await db.collection("Users").doc(email).get();
      if (snapshot.exists) {
        const userData = snapshot.data();
        return userData; // Return the member details
      } else {
        console.log("No such document!");
        return null; // Return null if the document does not exist
      }
    } catch (error) {
      console.error("Error fetching user details: ", error);
      throw error; // Throw the error to be caught in the calling function
    }
  },

  // Function to return the date alone
  async getDateFromTimestamp(timestamp) {
    const date = timestamp.toLocaleDateString("he-IL").replace(/\./g, "/");
    // const date = timestamp.toISOString().split('T')[0].split("-");
    // const correctDate = date[2] + "/" + date[1] + "/" + date[0];
    return date;
  },

  // Function to return the time alone
  async getTimeFromTimestamp(timestamp) {
    const time = timestamp.toLocaleTimeString("he-IL", {
      minute: "2-digit",
      hour: "2-digit",
    });
    // const time = timestamp.toTimeString().split(' ')[0].split(':');
    // const correctTime = time[0] + ":" + time[1];
    return time;
  },
};

export default MeetingService;
