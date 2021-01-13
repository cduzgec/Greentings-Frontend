import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyC1Ux6OEUOthWd9yliBQe50wUNnuYN7A3E",
    authDomain: "fir-cloud-messaging-7ef08.firebaseapp.com",
    projectId: "fir-cloud-messaging-7ef08",
    storageBucket: "fir-cloud-messaging-7ef08.appspot.com",
    messagingSenderId: "257226880603",
    appId: "1:257226880603:web:4aaefa616bda73628df17e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase