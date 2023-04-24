

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFGby33tMw1xN-9NzWIhjgr3laO_EPF_Y",
    authDomain: "quizmasters-4c3bc.firebaseapp.com",
    databaseURL: "https://quizmasters-4c3bc-default-rtdb.firebaseio.com",
    projectId: "quizmasters-4c3bc",
    storageBucket: "quizmasters-4c3bc.appspot.com",
    messagingSenderId: "1032617126963",
    appId: "1:1032617126963:web:0391659417d2d6cf878746"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const database = getDatabase(app);
export{ signInWithEmailAndPassword };