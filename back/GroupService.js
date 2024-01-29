
import { auth, db } from './firebase';
import {UserService} from './UserService'

var GroupName = ""
var LeaderEmail = ""
var Participants = ""
var City = ""
var SportType = ""

export const GroupService = {
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

   },
  async getGroup(groupId) {
    try {
      const snapshot = await db.collection('Groups').doc(groupId).get();

      if (snapshot.exists) {
        const groupData = snapshot.data(); 
        GroupName = groupData.GroupName;
        LeaderEmail = groupData.LeaderEmail;
        Participants = groupData.Participants;
        City = groupData.City;
        SportType = groupData.SportType
        
      }  
      else { console.log('Group not found.'); }
           
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
  }
};

export { GroupName, LeaderEmail, Participants, City, SportType};

export default GroupService;