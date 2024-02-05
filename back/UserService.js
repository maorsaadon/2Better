import { auth, db } from "../back/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Alert } from 'react-native';

var userFirstName = "";
var userLastName = "";
var UserCity = "";
var userMyGroups = []; // Added variable to store user's groups

export const UserService = {
  // Fetch user details by UID
  async getUserDetails() {
    try {
      const userEmail = auth.currentUser.email;
      const snapshot = await db.collection("Users").doc(userEmail).get();

      if (snapshot.exists) {
        const userData = snapshot.data();
        userFirstName = userData.FirstName;
        userLastName = userData.LastName;
        UserCity = userData.City;
        userMyGroups = userData.MyGroups || []; // Assign MyGroups if it exists, else default to an empty array

        // Log the user's groups to the console
        console.log("User Groups:", userMyGroups);
      } else {
        // Handle the case where the document does not exist
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching User: ", error);
    }
  },

  // Update user details
  async updateUserDetails(firstName, lastName, city, myGroups) {
    try {
      const userEmail = auth.currentUser.email;
      const userRef = db.collection("Users").doc(userEmail);

      // Update the user document
      await userRef.update({
        FirstName: firstName,
        LastName: lastName,
        City: city,
        MyGroups: myGroups,
      });

      console.log("User details updated successfully");
    } catch (error) {
      console.error("Error updating user details: ", error);
    }
  },

  async deleteUserAccount() {
    try {

      // Ask for user confirmation using Alert
      const confirmed = await new Promise(resolve => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to delete your account? This action is irreversible.",
            [
                { text: "Cancel", onPress: () => resolve(false), style: "cancel" },
                { text: "OK", onPress: () => resolve(true) }
            ],
            { cancelable: false }
          );
      });

      if (!confirmed) {
          console.log("User canceled account deletion");
          return;
      }


      const userEmail = auth.currentUser.email;
      const userRef = db.collection("Users").doc(userEmail);

      // Delete the user document from the "Users" collection in Firestore
      await firebase.firestore().collection("Users").doc(userEmail).delete();

      console.log("User details deleted successfully");
    } catch (error) {
      console.error("Error deleting user details:", error);
      throw error; // Rethrow the error to be caught by the calling function
      // Handle the error accordingly
    }
  },

  async addUserGroup(groupName) {
    try {
      const userEmail = auth.currentUser.email;
      const userRef = db.collection("Users").doc(userEmail);

      // Atomically add a new group ID to the 'MyGroups' array field
      await userRef.update({
        MyGroups: firebase.firestore.FieldValue.arrayUnion(groupName),
      });

      // Optional: You might want to update the local 'userMyGroups' variable
      userMyGroups.push(groupName);
      console.log("Group ID added to user profile successfully");
    } catch (error) {
      console.error("Error adding group ID to user profile: ", error);
    }
  },

  async removeUserGroup(groupName) {
    try {
      const userEmail = auth.currentUser.email;
      const userRef = db.collection("Users").doc(userEmail);

      // Atomically remove the meeting ID from the 'MeetingsGroup' array field
      await userRef.update({
        MyGroups: firebase.firestore.FieldValue.arrayRemove(groupName),
      });

      console.log(
        `Group ID: ${groupName} has been removed from User ID: ${userEmail}`
      );
    } catch (error) {
      console.error(
        `Error removing Group ID: ${groupName} from User ID: ${userEmail}`,
        error
      );
      // Handle the error accordingly
    }
  },
};

export { userFirstName, userLastName, UserCity, userMyGroups };

export default UserService;
