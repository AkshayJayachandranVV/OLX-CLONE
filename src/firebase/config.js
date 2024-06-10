// import firebase from 'firebase'
import { initializeApp } from 'firebase/app';
import 'firebase/storage'
import 'firebase/auth' 
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyB9dyya5rPw5ynV6wvWRfBTDSxkjurXgew",
    authDomain: "olx-clone-21c36.firebaseapp.com",
    projectId: "olx-clone-21c36",
    storageBucket: "olx-clone-21c36.appspot.com",
    messagingSenderId: "175477649911",
    appId: "1:175477649911:web:0bbfa3e3ee1f0a39637ef2",
    measurementId: "G-1HFYBHMFQJ"
  };

  export default initializeApp(firebaseConfig)