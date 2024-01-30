import { auth, db} from './firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// var userFirstName = ""
// var userLastName = ""
// var UserCity = ""
// var userMyGroups = []  // Added variable to store user's groups

// all GroupsMeetings = []
// for currGroup in User.Groups:
//     if currGroup in Meeting:
//          GroupsMeetings.add(currGroupName, meetingDate, meetingTime, meetingLocation)
// return GroupsMeetings

export const UpcomingMeetingsService = {
  // Fetch user details by UID
  async getMeet() {
    try {
      const userEmail = auth.currentUser.email;
      const querySnapshot  = await db.collection('Groups').doc("Basketball").collection("Example").get();
      
      querySnapshot.forEach(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('City:', documentSnapshot.data().City);
        }
      });
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
    //   if (snapshot.exists) {
    //     const userData = snapshot.data(); 
    //     userFirstName = userData.FirstName;
    //     userLastName = userData.LastName;
    //     UserCity = userData.City;
    //     userMyGroups = userData.MyGroups || []; // Assign MyGroups if it exists, else default to an empty array

    //     // Log the user's groups to the console
    //     console.log('User Groups:', userMyGroups);
    //   } else {
    //     // Handle the case where the document does not exist
    //     console.log('No such document!');
    //   }
    // } catch (error) {
    //   console.error("Error fetching User: ", error);
    // }
  },

//   // Update user details
//   async updateUserDetails(firstName, lastName, city, myGroups) {
//     try {
//       const userEmail = auth.currentUser.email;
//       const userRef = db.collection('Users').doc(userEmail);

//       // Update the user document
//       await userRef.update({
//         FirstName: firstName,
//         LastName: lastName,
//         City: city,
//         MyGroups: myGroups
//       });

//       console.log('User details updated successfully');
//     } catch (error) {
//       console.error("Error updating user details: ", error);
//     }
//   },

//   async addUserGroup(groupName) {
//     try {
//       const userEmail = auth.currentUser.email;
//       const userRef = db.collection('Users').doc(userEmail);
  
//       // Atomically add a new group ID to the 'MyGroups' array field
//       await userRef.update({
//         MyGroups:  firebase.firestore.FieldValue.arrayUnion(groupName)
//       });
  
//       // Optional: You might want to update the local 'userMyGroups' variable
//       userMyGroups.push(groupName);
//       console.log('Group ID added to user profile successfully');
//     } catch (error) {
//       console.error("Error adding group ID to user profile: ", error);
//     }
//   }
};

// export { userFirstName, userLastName, UserCity, userMyGroups };

export default UpcomingMeetingsService;
