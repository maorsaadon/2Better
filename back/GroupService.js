import { auth, db } from "./firebase";
import { UserService } from "./UserService";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const GroupService = {
  async getGroup(groupName) {
    try {
      const snapshot = await db.collection("Groups").doc(groupName).get();

      if (snapshot.exists) {
        const groupData = snapshot.data();
        console.log("Group Data: ", groupData);
        return {
          groupName: groupData.GroupNameT, // Ensure the property names match your database fields
          leaderEmail: groupData.LeaderEmail,
          totalCapacity: groupData.otalCapacity,
          city: groupData.City,
          sportType: groupData.SportType,
        };
      } else {
        console.log("Group not found.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching Group: ", error);
    }
  },

  // Update group details
  async updateGroupDetails(groupName, city, sportType, totalCapacity) {
    try {
      console.log("City", city);
      const groupRef = db.collection("Groups").doc(groupName);

      // Update the group document
      await groupRef.update({
        TotalCapacity: parseInt(totalCapacity),
        City: city,
        SportType: sportType,
      });

      console.log("Group details updated successfully");
    } catch (error) {
      console.error("Error updating group details: ", error);
    }
  },

  async handleAddNewGroup(groupName, city, sportType, totalCapacity) {
    // Check if the user is logged in
    const userEmail = auth.currentUser.email;
    const docRef = db
      .collection("Groups") // The collection name
      .doc(groupName) // The document name
      .set({
        GroupName: groupName,
        LeaderEmail: userEmail,
        TotalCapacity: totalCapacity,
        City: city,
        SportType: sportType,
        MeetingsGroup: [],
        Members: [],
      })
      .catch((error) => {
        console.error("Error creating group: ", error);
        alert(error.message);
      });

    UserService.addUserGroup(groupName);
  },

  async handleDeleteGroup(groupName) {
    const groupRef = db.collection("Groups").doc(groupName);

    try {
      UserService.removeUserGroup(groupName);

      // Step 1: Retrieve the group document to get the array of meeting IDs
      const groupDoc = await groupRef.get();

      if (!groupDoc.exists) {
        console.log(`No group found with ID: ${groupName}`);
        return;
      }

      const groupData = groupDoc.data();
      const meetingsArray = groupData.MeetingsGroup || [];

      // Step 2: Delete all meetings from the 'Meetings' collection
      for (const meetingId of meetingsArray) {
        await db.collection("Meetings").doc(meetingId).delete();
        console.log(`Deleted meeting with ID: ${meetingId}`);
      }

      // Step 3: Delete the group document itself
      await groupRef.delete();
      console.log(`Deleted group with ID: ${groupName}`);
    } catch (error) {
      console.error(
        `Error deleting group with ID: ${groupName} and its meetings`,
        error
      );
      throw error; // or handle the error as needed
    }
  },

  async addGroupMeeting(meetingId, groupName) {
    try {
      const groupRef = db.collection("Groups").doc(groupName);

      // Atomically add a new group ID to the 'MyGroups' array field

      await groupRef.update({
        MeetingsGroup: firebase.firestore.FieldValue.arrayUnion(meetingId),
      });

      console.log("Group ID added to user profile successfully");
    } catch (error) {
      console.error("Error adding meeting ID to group collection: ", error);
    }
  },

  async removeGroupMeeting(meetingId, groupName) {
    try {
      const groupRef = db.collection("Groups").doc(groupName);

      // Atomically remove the meeting ID from the 'MeetingsGroup' array field
      await groupRef.update({
        MeetingsGroup: firebase.firestore.FieldValue.arrayRemove(meetingId),
      });

      console.log(
        `Meeting ID: ${meetingId} has been removed from group ID: ${groupName}`
      );
    } catch (error) {
      console.error(
        `Error removing meeting ID: ${meetingId} from group ID: ${groupName}`,
        error
      );
      // Handle the error accordingly
    }
  },

  async getGroupsBySort(sportType, city) {
    try {
      const groupsRef = db
        .collection("Groups")
        .where("SportType", "==", sportType)
        .where("City", "==", city);

      const snapshot = await groupsRef.get();

      if (snapshot.empty) {
        console.log("No matching groups found.");
        return [];
      }

      const groups = [];

      snapshot.forEach((groupDoc) => {
        const groupData = groupDoc.data();
        const groupName = groupData.GroupName || "Unknown"; // Provide a default if groupName is missing

        groups.push({
          GroupName: groupName,
          LeaderEmail: groupData.LeaderEmail || "Unknown", // Provide a default if userEmail is missing
          TotalCapacity: groupData.TotalCapacity || 10, // Provide an empty array if participants are missing
          City: groupData.City || "Unknown", // Provide a default if city is missing
          SportType: groupData.SportType || "Unknown", // Provide a default if sportType is missing
          Members: groupData.Members?.length || 0 
        });
      });

      return groups;
    } catch (error) {
      console.error("Error getting groups by sport:", error);
      throw error;
    }
  },
};

export default GroupService;
