// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdd8O_W66GWzdEvyrQkAJuGxAGnGCLj1U",
  authDomain: "clonestore-1a38b.firebaseapp.com",
  databaseURL: "https://clonestore-1a38b-default-rtdb.firebaseio.com",
  projectId: "clonestore-1a38b",
  storageBucket: "clonestore-1a38b.appspot.com",
  messagingSenderId: "383744247097",
  appId: "1:383744247097:web:b45fcf1b6b99c78fe594e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);






// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);