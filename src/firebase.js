import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCWVcist9eDsISGSlgSZ3FCuJMAfV42YAg",
  authDomain: "quiz-demo-96fc0.firebaseapp.com",
  databaseURL: "https://quiz-demo-96fc0-default-rtdb.firebaseio.com",
  projectId: "quiz-demo-96fc0",
  storageBucket: "quiz-demo-96fc0.appspot.com",
  messagingSenderId: "128317753008",
  appId: "1:128317753008:web:daff114b1de98a6cc55d75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const database = getDatabase(app);
export default app;
