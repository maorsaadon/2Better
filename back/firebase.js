// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import * as firebase from "firebase/compat";
import "firebase/compat/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKqbRe4Tot_t7pZu8mWKEjcX0FzoYvQIw",
  authDomain: "tobetteraviya.firebaseapp.com",
  projectId: "tobetteraviya",
  storageBucket: "tobetteraviya.appspot.com",
  messagingSenderId: "345292233880",
  appId: "1:345292233880:web:b8139d9d7d78b9913b44ed",
  measurementId: "G-Z7TTFXR7XY",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth };
export { db };
