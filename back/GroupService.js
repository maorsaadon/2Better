
import { auth, db } from './firebase';
import {UserService} from './UserService'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


var _groupName = ""
var _leaderEmail = ""
var _participants = ""
var _city = ""
var _sportType = ""
var _myGroupsMeetings = [] 

export const GroupService = {
  async getGroup(groupName) {
    try {
      const snapshot = await db.collection('Groups').doc(groupName).get();

      if (snapshot.exists) {
        const groupData = snapshot.data(); 
        console.log('Group Data: ', groupData);
        return {
          groupName: groupData.GroupName, // Ensure the property names match your database fields
          leaderEmail: groupData.LeaderEmail,
          participants: groupData.Participants,
          city: groupData.City,
          sportType: groupData.SportType,
        };
      }  
      else { console.log('Group not found.');
      return null;
     }
           
    } catch (error) {
      console.error("Error fetching Group: ", error);
    }
  },

  // Update user details
  async updateGroupDetails(groupName, city, sportType, participants) {
    try {
      const groupRef = db.collection('Groups').doc(groupName);

      // Update the user document
      await groupRef.update({
        GroupName : groupName,
        Participants : participants,
        City : city,
        SportType : sportType,
      });

      console.log('Group details updated successfully');
    } catch (error) {
      console.error("Error updating group details: ", error);
    }
  },

  async handleAddNewGroup(groupName, city, sportType, participants){
    // Check if the user is logged in
      const userEmail = auth.currentUser.email;
      const docRef = db.collection('Groups') // The collection name
      .doc(groupName) // The document name
      .set({
          GroupName: groupName,
          LeaderEmail: userEmail,
          Participants:participants,
          City:city,
          SportType:sportType,
          MeetingsGroup: [],
          
      })
      .catch(error => {
          console.error('Error creating group: ', error);
          alert(error.message);
      });
      
      UserService.addUserGroup(groupName);

  },

  async addGroupMeeting(MeetingId, groupName) {
    try {
      console.log('meetReg', MeetingId);
      const groupRef = db.collection('Groups').doc(groupName);
     
      // Atomically add a new group ID to the 'MyGroups' array field
      
      await groupRef.update({
        MeetingsGroup: firebase.firestore.FieldValue.arrayUnion(MeetingId)
      });
  
      // Optional: You might want to update the local 'userMyGroups' variable
      _myGroupsMeetings.push();
      console.log('Group ID added to user profile successfully');
    } catch (error) {
      console.error("Error adding meeting ID to group collection: ", error);
    }
  }
};

export { _groupName, _leaderEmail, _participants, _city, _sportType, _myGroupsMeetings};

export default GroupService;