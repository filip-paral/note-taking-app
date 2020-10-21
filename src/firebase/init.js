import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBUle7K4juK7YCPPVX0FfPD2Fm8E0xmJkw",
  authDomain: "keep-646f1.firebaseapp.com",
  databaseURL: "https://keep-646f1.firebaseio.com",
  projectId: "keep-646f1",
  storageBucket: "keep-646f1.appspot.com",
  messagingSenderId: "185094579178",
  appId: "1:185094579178:web:a563b10afe0e634991c893",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firestore database
export default firebaseApp.firestore();
