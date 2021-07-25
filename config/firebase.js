import firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeSRYN-s176md-DtwcBzu06u7ZLih7Pdo",
  authDomain: "careself-19.firebaseapp.com",
  projectId: "careself-19",
  storageBucket: "careself-19.appspot.com",
  messagingSenderId: "408443794683",
  appId: "1:408443794683:web:ea71be6733a6ae58e12c5e",
  measurementId: "G-2RY36NCKFC",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
