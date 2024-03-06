import { auth, db } from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const GroupService = {
  async handleAddNewGroup(groupName, city, sportType) {
    const userEmail = auth.currentUser.email;
    const docRef = db
      .collection("Groups")
      .doc(groupName)
      .set({
        GroupName: groupName,
        LeaderEmail: userEmail,
        City: city,
        SportType: sportType,
        Members: [],
      })
      .catch((error) => {
        console.error("Error creating group: ", error);
        alert(error.message);
      });
  },

  async handleDeleteGroup(groupName) {
    const groupRef = db.collection("Groups").doc(groupName);
    try {
      const meetingSnapshot = await db
        .collection("Meetings")
        .where("GroupName", "==", groupName)
        .get();

      if (!meetingSnapshot.empty) {
        for (const doc of meetingSnapshot.docs) {
          await doc.ref.delete();
        }
      }

      const groupDoc = await groupRef.get();

      if (!groupDoc.exists) {
        console.log(`No group found with ID: ${groupName}`);
        return;
      }

      await groupRef.delete();
      console.log(`Deleted group with ID: ${groupName}`);
    } catch (error) {
      console.error(
        `Error deleting group with ID: ${groupName} and its meetings`,
        error
      );
      throw error;
    }
  },

  async addGroupMeeting(meetingId, groupName) {
    try {
      const groupRef = db.collection("Groups").doc(groupName);

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

      const groupSnapshot = await groupRef.get();
      const currentMeetingsGroup = groupSnapshot.data().MeetingsGroup || [];

      const updatedMeetingsGroup = currentMeetingsGroup.filter(
        (s) => s.id !== meetingId
      );

      await groupRef.update({ MeetingsGroup: updatedMeetingsGroup });
      console.log(
        `Meeting ID: ${meetingId} has been removed from group ID: ${groupName}`
      );
    } catch (error) {
      console.error(
        `Error removing meeting ID: ${meetingId} from group ID: ${groupName}`,
        error
      );
    }
  },

  async getLeaderEmail(groupName) {
    const groupRef = db.collection("Groups").doc(groupName);
    try {
      const doc = await groupRef.get();
      if (doc.exists) {
        const groupData = doc.data();
        return groupData.LeaderEmail || "Email not found";
      } else {
        console.log("No such Email!");
        return "Email not found";
      }
    } catch (error) {
      console.error("Error getting group leader email: ", error);
      throw error;
    }
  },

  async getMembers(groupName) {
    const groupRef = db.collection("Groups").doc(groupName);
    try {
      const doc = await groupRef.get();
      if (doc.exists) {
        const groupData = doc.data();
        return groupData.Members || [];
      } else {
        console.log("No such group!");
        return [];
      }
    } catch (error) {
      console.error("Error getting group members: ", error);
      throw error;
    }
  },

  async getMemberGroups() {
    const groups = [];
    try {
      const userEmail = auth.currentUser.email;

      let groupsRef = db
        .collection("Groups")
        .where("LeaderEmail", "!=", userEmail);

      const snapshot = await groupsRef.get();

      if (snapshot.empty) {
        console.log("No matching groups found.");
        return [];
      }

      snapshot.forEach((doc) => {
        const group = doc.data();
        if (group.Members.includes(userEmail)) {
          groups.push({
            GroupName: group.GroupName || "Unknown",
            LeaderEmail: group.LeaderEmail || "Unknown",
            City: group.City || "Unknown",
            SportType: group.SportType || "Unknown",
            Members: group.Members?.length || 0,
          });
        }
      });
    } catch (error) {
      console.error("Error fetching meetings by user role: ", error);
    }
    return groups;
  },

  async getManagerGroups() {
    const groups = [];
    try {
      const userEmail = auth.currentUser.email;
      const groupsRef = db
        .collection("Groups")
        .where("LeaderEmail", "==", userEmail);

      const snapshot = await groupsRef.get();

      if (snapshot.empty) {
        console.log("No matching groups found.");
        return [];
      }

      snapshot.forEach((groupDoc) => {
        const groupData = groupDoc.data();
        const groupName = groupData.GroupName || "Unknown";

        groups.push({
          GroupName: groupName,
          LeaderEmail: groupData.LeaderEmail || "Unknown",
          City: groupData.City || "Unknown",
          SportType: groupData.SportType || "Unknown",
          Members: groupData.Members?.length || 0,
        });
      });

      return groups;
    } catch (error) {
      console.error("Error getting groups by sport:", error);
      throw error;
    }
  },

  async getGroupByName(groupName) {
    try {
      const snapshot = await db.collection("Groups").doc(groupName).get(); 

      if (snapshot.exists) {
        const groupData = snapshot.data(); 

        return {
          GroupName: groupData.GroupName || "Unknown",
          LeaderEmail: groupData.LeaderEmail || "Unknown",
          City: groupData.City || "Unknown",
          SportType: groupData.SportType || "Unknown",
          Members: groupData.Members?.length || 0,
        };
      } else {
        console.log("Group not found.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching group: ", error);
    }
  },

  async getGroupsBySort(sportType, city) {
    try {
      if (!auth.currentUser) {
        console.error("No user is currently logged in.");
        return [];
      }
      const userEmail = auth.currentUser.email;
      const groupsRef = db
        .collection("Groups")
        .where("LeaderEmail", "!=", userEmail);

      const snapshot = await groupsRef.get();

      if (snapshot.empty) {
        console.log("No matching groups found.");
        return [];
      }

      const groups = [];

      snapshot.forEach((doc) => {
        const group = doc.data();
        const matchesSportType =
          sportType === "All" || group.SportType === sportType;
        const matchesCity = city === "All" || group.City === city;
        if (matchesSportType && matchesCity) {
          groups.push({
            GroupName: group.GroupName || "Unknown",
            LeaderEmail: group.LeaderEmail || "Unknown",
            City: group.City || "Unknown",
            SportType: group.SportType || "Unknown",
            Members: group.Members?.length || 0,
          });
        }
      });

      return groups;
    } catch (error) {
      console.error("Error getting groups by sort:", error);
      throw error;
    }
  },

  async updateGroupDetails(groupName, city, sportType) {
    try {
      console.log("City", city);
      const groupRef = db.collection("Groups").doc(groupName);

      await groupRef.update({
        City: city,
        SportType: sportType,
      });

      console.log("Group details updated successfully");
    } catch (error) {
      console.error("Error updating group details: ", error);
    }
  },

  async handleJoinGroup(
    isSubscribe,
    groupName,
    userEmail = auth.currentUser.email
  ) {
    try {
      const groupRef = db.collection("Groups").doc(groupName);
      const groupSnapshot = await groupRef.get();

      if (groupSnapshot.exists) {
        const group = groupSnapshot.data();
        if (group.LeaderEmail !== userEmail) {
          if (isSubscribe) {
            await groupRef.update({
              Members: firebase.firestore.FieldValue.arrayRemove(userEmail),
            });
          } else {
            await groupRef.update({
              Members: firebase.firestore.FieldValue.arrayUnion(userEmail),
            });
          }
        }
      } else {
        console.log("Group does not exist.");
      }
    } catch (error) {
      console.error("Error subscribing or unsubscribing", error);
    }
  },

  async removeUserFromGroup(groupName, memberEmail) {
    try {
      const groupRef = db.collection("Groups").doc(groupName);
      const snapshot = await groupRef.get();

      if (snapshot.exists) {
        const group = snapshot.data();

        if (group.Members && group.Members.includes(memberEmail)) {
          await groupRef.update({
            Members: firebase.firestore.FieldValue.arrayRemove(memberEmail),
          });

          console.log("User email removed from meeting members successfully.");
        } else {
          console.log("User email not found in the meeting members.");
        }
      } else {
        console.log("Meeting does not exist.");
      }
    } catch (error) {
      console.error(`Error removing user from the group!`, error);
    }
  },

  async isInTheGroup(groupName) {
    try {
      const memGroups = await this.getMemberGroups();
      const menGroups = await this.getManagerGroups();
      const groupExists =
        memGroups.some((group) => group.GroupName === groupName) ||
        menGroups.some((group) => group.GroupName === groupName);

      return groupExists;
    } catch (error) {
      console.error(`Error finding groups!`, error);
      return false;
    }
  },
};

export default GroupService;
