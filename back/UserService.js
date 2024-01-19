// src/services/UserService.js
import { firebase } from './firebase'; // Ensure you have firebaseConfig set up properly

export const userService = {
  // Fetch user details by UID
  async getUserDetails(uid) {
    try {
      const userDoc = await firebase.firestore().collection('users').doc(uid).get();
      if (userDoc.exists) {
        return { uid, ...userDoc.data() };
      } else {
        throw new Error('User not found.');
      }
    } catch (error) {
      console.error('Error getting user details:', error);
      throw error;
    }
  },

  // Update user profile information
  async updateUserProfile(uid, profileData) {
    try {
      await firebase.firestore().collection('users').doc(uid).update(profileData);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Sign in user (could be expanded with sign-up, sign-out, password reset, etc.)
  async signIn(email, password) {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  // ... other user related methods
};

export default userService;
