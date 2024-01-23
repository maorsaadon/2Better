// src/services/UserService.js
import { auth, db } from '../back/firebase'


var userFirstName = ""
var userLastName = ""
var UserCity = ""
// const userEmail = auth.currentUser.email;
// const userEmail = "aviya1@test.com";

export const UserService = {
  // Fetch user details by UID
  async getUserDetails() {
    try {
      const userEmail = auth.currentUser.email;
      const snapshot = db.collection('Users').doc(userEmail);
            snapshot.get()
            .then( docSnapshot => {
              if (docSnapshot.exists) {
                const userData = docSnapshot.data(); 
                userFirstName = userData.FirstName;
                userLastName = userData.LastName;
                UserCity = userData.City;
              } else {
                // Handle the case where the document does not exist
                console.log('No such document!');
              }
            })
            //     )(doc => ({
            //     city: doc.data().city,
            //     Email: doc.data().Email,
            //     FirstName: doc.data().FirstName,
            //     LastName: doc.data().LastName,
            //     MyGroups: doc.data().MyGroups
            // }));            
            // return groups;
        } catch (error) {
            console.error("Error fetching User: ", error);
            throw error;
        }
  },

};


export { userFirstName, userLastName, UserCity};

export default UserService;
