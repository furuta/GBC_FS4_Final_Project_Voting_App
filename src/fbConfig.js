import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDG6oNiQ7-PHETuFZz_SBMFBeDnv4ng7W0",
  authDomain: "gbc-fs4-final-project.firebaseapp.com",
  databaseURL: "https://gbc-fs4-final-project.firebaseio.com",
  projectId: "gbc-fs4-final-project",
  storageBucket: "gbc-fs4-final-project.appspot.com",
  messagingSenderId: "16990493699",
  appId: "1:16990493699:web:0bb3b8c35d81d7f6790236"
};
// Initialize Firebase
export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
