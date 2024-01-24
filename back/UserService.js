import { auth, db } from '../back/firebase'

var userFirstName = ""
var userLastName = ""
var UserCity = ""
var userMyGroups = []  // Added variable to store user's groups

export const UserService = {
  // Fetch user details by UID
  async getUserDetails() {
    try {
      const userEmail = auth.currentUser.email;
      const snapshot = await db.collection('Users').doc(userEmail).get();

      if (snapshot.exists) {
        const userData = snapshot.data(); 
        userFirstName = userData.FirstName;
        userLastName = userData.LastName;
        UserCity = userData.City;
        userMyGroups = userData.MyGroups || []; // Assign MyGroups if it exists, else default to an empty array

        // Log the user's groups to the console
        console.log('User Groups:', userMyGroups[0]);
      } else {
        // Handle the case where the document does not exist
        console.log('No such document!');
      }
    } catch (error) {
      console.error("Error fetching User: ", error);
    }
  },
};

export { userFirstName, userLastName, UserCity, userMyGroups };

export default UserService;
