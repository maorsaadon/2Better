
import { auth, db } from './firebase';


var GroupName = ""
var LeaderEmail = ""
var Participants = ""
var City = ""
var SportType = ""

export const GroupService = {
    async handleAddNewGroup(groupName, city, sportType, participants){
        // Check if the user is logged in
        const userEmail = auth.currentUser;
 
        db.collection('Groups') // The collection name
        .doc(userEmail) // The document name
        .add({
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

   },
  async getGroup() {
    try {
      const userEmail = auth.currentUser.email;
      const snapshot = await db.collection('Groups').doc(userEmail).get();

      if (snapshot.exists) {
        const groupData = snapshot.data(); 
        GroupName = groupData.GroupName;
        LeaderEmail = groupData.LeaderEmail;
        Participants = groupData.Participants;
        City = groupData.City;
        SportType = groupData.SportType;
        
      } 
        
    } catch (error) {
      console.error("Error fetching Group: ", error);
    }
  },

  // Update user details
  async updateGroupDetails(groupName, city, sportType, participants) {
    try {
      const userEmail = auth.currentUser.email;
      const groupRef = db.collection('Groups').doc(userEmail);

      // Update the user document
      await userRef.update({
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
};

export { GroupName, LeaderEmail, Participants, City, SportType};

export default GroupService;




