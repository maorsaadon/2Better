import { auth, db } from "../back/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


var userFirstName = "";
var userLastName = "";
var userCity = "";
var userNotificationCounter = 0;
var userImageUpload = 0;

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
        userCity = userData.City;
        userNotificationCounter = userData.NotificationCounter;

      } else {
        // Handle the case where the document does not exist
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching User: ", error);
    }
  },
  
  async getUserNotificationCounter(userEmail = auth.currentUser.email){
    try {
      const snapshot = await db.collection("Users").doc(userEmail).get();

      if (snapshot.exists) {
        const userData = snapshot.data();
        return userData.NotificationCounter;

      } else {
        // Handle the case where the document does not exist
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching User: ", error);
    }
  },
  async updateUserImage()
  {
    const userEmail = auth.currentUser.email
    try {
      const userRef = db.collection("Users").doc(userEmail);
      userImageUpload = 1;
      // Update the user document
      await userRef.update({
        ImageUpload : userImageUpload
      });

      console.log("User userImageUpload updated successfully");
    } catch (error) {
      console.error("Error updating user NotificationCounter: ", error);
    }

  }
  ,
  async updateUserNotificationCounter(counter = 0, userEmail = auth.currentUser.email){
    try {
      const userRef = db.collection("Users").doc(userEmail);

      // Update the user document
      await userRef.update({
        NotificationCounter: counter
      });

      console.log("User NotificationCounter updated successfully");
    } catch (error) {
      console.error("Error updating user NotificationCounter: ", error);
    }
  },

  // Update user details
  async updateUserDetails(firstName, lastName, city) {
    try {
      const userEmail = auth.currentUser.email;
      const userRef = db.collection("Users").doc(userEmail);

      // Update the user document
      await userRef.update({
        FirstName: firstName,
        LastName: lastName,
        City: city,
      });

      console.log("User details updated successfully");
    } catch (error) {
      console.error("Error updating user details: ", error);
    }
  },

  async deleteUserAccount() {
    try {

      const userEmail = auth.currentUser.email;
      const userRef = db.collection("Users").doc(userEmail);

      // Delete the user document from the "Users" collection in Firestore
      await firebase.firestore().collection("Users").doc(userEmail).delete();

      // Delete the user account in Firebase Authentication
      await auth.currentUser.delete();

      console.log("User details deleted successfully");
    } catch (error) {
      console.error("Error deleting user details:", error);
      throw error; // Rethrow the error to be caught by the calling function
      // Handle the error accordingly
    }
  },

};

export { userFirstName, userLastName, userCity, userNotificationCounter , userImageUpload};

export default UserService;
