// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAzSWpgVQwIAoE8r9K-x4MOfXfav_72pk",
  authDomain: "react-curso-b89c5.firebaseapp.com",
  projectId: "react-curso-b89c5",
  storageBucket: "react-curso-b89c5.appspot.com",
  messagingSenderId: "435559267290",
  appId: "1:435559267290:web:38320b35f83eaf09df1ee3"
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth( FireBaseApp );
export const FirebaseDB = getFirestore( FireBaseApp );
