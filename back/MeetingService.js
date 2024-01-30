
import { auth, db } from './firebase';
import {GroupService} from './GroupService'

var _groupName = ""
var _location = ""
var _date   = ""


export const MeetingService = {
  async getMeeting(MeetingId) {
    try {
      const snapshot = await db.collection('Meetings').doc(MeetingId).get();

      if (snapshot.exists) {
        const meetingData = snapshot.data(); 
        console.log('Meeting Data: ', meetingData);
        return {
          groupName: meetingData.GroupName, // Ensure the property names match your database fields
          location: meetingData.Location,
          date: meetingData.Date,
        };
      }  
      else { console.log('Meeting not found.');
      return null;
     }
           
    } catch (error) {
      console.error("Error fetching Meeting: ", error);
    }
  },

  // Update user details
  async updateGroupDetails(groupName, date, location) {
    try {
      const groupRef = db.collection('Groups').doc(groupName);

      // Update the user document
      await groupRef.update({
        Date : date,
        Location : location,
      });

      console.log('Meeting details updated successfully');
    } catch (error) {
      console.error("Error updating Meeting details: ", error);
    }
  },

  async handleAddNewMeeting(groupName, location, date){
      const MeetingRef = db.collection('Meetings').doc() // The document name
      MeetingRef.set({
          GroupName: groupName,
          Location: location,
          Date:date,
         
      })
      .catch(error => {
          console.error('Error creating Meeting: ', error);
          alert(error.message);
      });
      GroupService.addGroupMeeting(MeetingRef, groupName);

  }
};

export { _groupName, _location, _date};

export default MeetingService;