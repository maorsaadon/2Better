import { auth, db } from "./firebase";
import { GroupService } from "./GroupService";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";



export const MeetingService = {

  async fetchMeetingsData () {
    try {
      const meetingsCollection = await db.collection('Meetings').get();
      // const meetingsCollection = await db.collection('Meetings').where('GroupName', '==', 'Maor test 1').get();
      const meetingsData = meetingsCollection.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          GroupName: data.GroupName,
          Date: data.Date,
          Time: data.Time,
          Location: data.Location,
        };
      });
      return meetingsData; // Return the array of meeting objects
    } catch (error) {
      console.error("Error fetching meetings data: ", error);
      return []; // Return an empty array in case of error
    }
  },

  async getMeeting(MeetingId) {
    try {
      const snapshot = await db.collection("Meetings").doc(MeetingId).get();

      if (snapshot.exists) {
        const meetingData = snapshot.data();
        return {
          groupName: meetingData.GroupName, // Ensure the property names match your database fields
          location: meetingData.Location,
          date: meetingData.Date,
          time: meetingData.Time,
        };
      } else {
        console.log("Meeting not found.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching Meeting: ", error);
    }
  },

  // Update user details
  async updateGroupDetails(groupName, date, time, location) {
    try {
      const groupRef = db.collection("Groups").doc(groupName);

      // Update the user document
      await groupRef.update({
        Date: date,
        Time: time,
        Location: location,
      });

      console.log("Meeting details updated successfully");
    } catch (error) {
      console.error("Error updating Meeting details: ", error);
    }
  },

  async handleAddNewMeeting(groupName, location, date, time) {
    const MeetingRef = db.collection("Meetings").doc(); // The document name
    MeetingRef.set({
      GroupName: groupName,
      Location: location,
      Date: date,
      Time: time,
    }).catch((error) => {
      console.error("Error creating Meeting: ", error);
      alert(error.message);
    });
    GroupService.addGroupMeeting(MeetingRef, groupName);
  },

  async handleDeleteMeeting(meetingId) {
    try {
      // Assuming 'Meetings' is the name of the collection where meetings are stored
      await db.collection("Meetings").doc(meetingId).delete();
      console.log(`Meeting with ID: ${meetingId} has been deleted.`);
    } catch (error) {
      console.error(`Error deleting meeting with ID: ${meetingId}`, error);
      // Handle the error accordingly
    }
  },


  // Aviya Added functions:
  async fetchMeetingsByUserRole() {
    let leaderMeetings = [];
    let leaderGroupNames = [];
    const userEmail = auth.currentUser.email;


    try {
      // Fetch all groups to determine user's role
      const groupsSnapshot = await db.collection('Groups').get();
      var isLeader2 = 0;
      groupsSnapshot.forEach(doc => {
        const group = doc.data();
        if (group.Members.includes(userEmail) && group.LeaderEmail !== userEmail) {
          // User is a member but not the leader
          isLeader2 = 0;
          leaderGroupNames.push({ groupName: group.GroupName, sportType: group.SportType, totalCapacity: group.TotalCapacity, isLeader: isLeader2 });
        } else if (group.LeaderEmail === userEmail) {
          // User is the leader
          isLeader2 = 1;
          leaderGroupNames.push({ groupName: group.GroupName, sportType: group.SportType, totalCapacity: group.TotalCapacity, isLeader: isLeader2 });
        }
      });

            // Fetch meetings for groups where user is the leader
      for (const group of leaderGroupNames) {
        const meetingsSnapshot = await db.collection('Meetings')
                                          .where('GroupName', '==', group.groupName)
                                          .get();
        meetingsSnapshot.forEach(doc => {
          const meetingData = doc.data();
          leaderMeetings.push({ ...meetingData, SportType: group.sportType, TotalCapacity: group.totalCapacity, IsLeader: group.isLeader,   id: doc.id });
        });
      }

      // Sort leaderMeetings by Timestamp
      // leaderMeetings.sort((a, b) => a.Timestamp.toDate() - b.Timestamp.toDate());


    } catch (error) {
      console.error("Error fetching meetings by user role: ", error);
    }
    
    return { leaderMeetings };
    
  },

  async isInTheMeeting(meetingId, memberEmail) {
    try {
      // Assuming 'Meetings' is the name of the collection where meetings are stored
      const meetingRef = await db.collection("Meetings").doc(meetingId);
      const meeting = meetingRef.get();
      if (meeting.Members.includes(memberEmail))
      {
        return true;
      }
      else { return false ;}
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
      if(snapshot.exists) {
        const meeting = snapshot.data();
        currNum = meeting.NumberOfMembers;
      
        if (!meeting.Members.includes(memberEmail))
        {
          // Update the Members array using arrayUnion to add userEmail without duplicates
          await meetingRef.update({
            Members: firebase.firestore.FieldValue.arrayUnion(memberEmail),
            // NumberOfMembers: currNum + 1
            NumberOfMembers: firebase.firestore.FieldValue.increment(1)
          });

          console.log('User email added to meeting members successfully.');
        }
    }
    } catch (error) {
      console.error(`Error add user to the meeting!`, error);
    }
  },

  async removeUserFromMeetingMembers(meetingId, userEmail){
    try {
      // Reference to the specific Meeting document by its ID
      const meetingRef = await db.collection('Meetings').doc(meetingId);
  
      // Update the Members array using arrayRemove to remove userEmail
      await meetingRef.update({
        // Members: firestore.FieldValue.arrayRemove(userEmail),
        // NumberOfMembers: NumberOfMembers > 0 ? NumberOfMembers - 1 : 0
      });
  
      console.log('User email removed from meeting members successfully.');
    } catch (error) {
      console.error('Error removing user from meeting members:', error);
    }
  },

};

export default MeetingService;
