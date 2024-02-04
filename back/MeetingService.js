import { auth, db } from "./firebase";
import { GroupService } from "./GroupService";

export const MeetingService = {

  async fetchMeetingsData () {
    try {
      const meetingsCollection = await db.collection('Meetings').get();
      const meetingsData = meetingsCollection.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          GroupName: data.GroupName,
          Date: data.Date,
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
        console.log("Meeting Data: ", meetingData);
        return {
          groupName: meetingData.GroupName, // Ensure the property names match your database fields
          location: meetingData.Location,
          date: meetingData.Date,
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
  async updateGroupDetails(groupName, date, location) {
    try {
      const groupRef = db.collection("Groups").doc(groupName);

      // Update the user document
      await groupRef.update({
        Date: date,
        Location: location,
      });

      console.log("Meeting details updated successfully");
    } catch (error) {
      console.error("Error updating Meeting details: ", error);
    }
  },

  async handleAddNewMeeting(groupName, location, date) {
    const MeetingRef = db.collection("Meetings").doc(); // The document name
    MeetingRef.set({
      GroupName: groupName,
      Location: location,
      Date: date,
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
};

export default MeetingService;
