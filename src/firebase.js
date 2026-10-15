import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAdlaVQI7n5bpu4OAj5Iz-dIbrkAbTJRM0",
  authDomain: "study-path-d56a5.firebaseapp.com",
  databaseURL: "https://study-path-d56a5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "study-path-d56a5",
  storageBucket: "study-path-d56a5.firebasestorage.app",
  messagingSenderId: "420631524004",
  appId: "1:420631524004:web:3fc6bbe8e5632bbe9c2c31"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
