
import { auth, db } from './firebase';
import {UserService} from './UserService'

var _groupName = ""
var _leaderEmail = ""
var _participants = ""
var _city = ""
var _sportType = ""

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
          
      })
      .catch(error => {
          console.error('Error creating group: ', error);
          alert(error.message);
      });
      
      UserService.addUserGroup(groupName);

  }
};

export { _groupName, _leaderEmail, _participants, _city, _sportType};

export default GroupService;